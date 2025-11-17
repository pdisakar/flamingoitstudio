import { PRODUCTION_SERVER } from '../lib/constants';
import { parse, HTMLElement } from 'node-html-parser';
import { BlogPost } from '@/types/types';

type UnknownRecord = Record<string, unknown>;

type NodeWithChildren = UnknownRecord & {
  children?: NodeWithChildren[];
};

// Define API Headers for all requests

const API_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  sitekey: process.env.SITE_KEY as unknown as string,
};

// --- Helper Functions ---

const limitChildren = <T extends NodeWithChildren | NodeWithChildren[]>(
  data: T,
  limit: number
): T => {
  function traverseAndAdjust(node: NodeWithChildren | NodeWithChildren[]): void {
    if (Array.isArray(node)) {
      node.forEach(item => traverseAndAdjust(item));
    } else if (typeof node === 'object' && node !== null) {
      if (node.children) {
        if (node.children.length > limit) {
          node.children = node.children.slice(0, limit);
        }
        traverseAndAdjust(node.children);
      }
    }
  }

  traverseAndAdjust(data);
  return data;
};

const parseHTML = (htmlString: string): HTMLElement[] => {
  const root = parse(htmlString);
  return root.childNodes as HTMLElement[];
};

// --- Interfaces for FAQ Structure ---
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  id: number;
  faq: FAQItem[];
}

const buildFAQsFromElements = (elements: HTMLElement[]): FAQCategory[] => {
  const result: FAQCategory[] = [];
  let currentTitle = 'FAQs'; // Default title when no H3 tags are found
  let currentFaqs: FAQItem[] = [];
  let faqId = 0;
  let titleId = 999; // Starting ID for FAQ categories

  for (const el of elements) {
    if (!(el instanceof HTMLElement)) continue; // Ensure we are dealing with an HTMLElement

    switch (el.tagName.toUpperCase()) {
      case 'H3':
        // Push previous FAQ category if exists
        if (currentFaqs.length > 0) {
          result.push({
            title: currentTitle,
            id: titleId++,
            faq: currentFaqs,
          });
        }
        currentTitle = el.textContent.trim();
        currentFaqs = [];
        faqId = 0; // Reset FAQ item ID for new category
        break;
      case 'H4':
        currentFaqs.push({
          id: faqId++,
          question: el.textContent.trim(),
          answer: '',
        });
        break;
      case 'P':
      case 'UL':
      case 'OL':
        if (currentFaqs.length > 0) {
          const lastFaq = currentFaqs[currentFaqs.length - 1];
          if (
            el.tagName.toUpperCase() === 'UL' ||
            el.tagName.toUpperCase() === 'OL'
          ) {
            const listItems = Array.from(el.children)
              .filter(
                (child): child is HTMLElement =>
                  child instanceof HTMLElement &&
                  child.tagName.toUpperCase() === 'LI'
              )
              .map(li => li.outerHTML)
              .join('');
            lastFaq.answer += `<${el.tagName.toLowerCase()}>${listItems}</${el.tagName.toLowerCase()}>`;
          } else {
            lastFaq.answer += el.outerHTML;
          }
        }
        break;
      // Optionally handle other tags or ignore them
    }
  }

  // Push the last accumulated FAQ category
  if (currentFaqs.length > 0) {
    result.push({ id: titleId++, title: currentTitle, faq: currentFaqs });
  }

  return result;
};

type GoodToKnowBlock = {
  id: number;
  title: string;
  content: string;
};

const goodToKnowJSON = (elements: HTMLElement[]): GoodToKnowBlock[] => {
  const result: GoodToKnowBlock[] = [];
  let currentBlock: GoodToKnowBlock | null = null;
  let idCounter = 1;

  for (const node of elements) {
    if (node.tagName === 'H3') {
      if (currentBlock) {
        result.push(currentBlock);
      }
      currentBlock = {
        id: idCounter++,
        title: node.textContent?.trim() || '',
        content: '',
      };
    } else if (currentBlock && node.outerHTML?.trim()) {
      currentBlock.content += node.outerHTML.trim();
    }
  }

  if (currentBlock) {
    result.push(currentBlock);
  }

  return result;
};

// --- Interfaces for Table of Contents ---
interface TOCItem {
  level: 'h2' | 'h3';
  id: string;
  sectionIndex: string;
  text: string;
}

interface GenerateTOCResult {
  tocHtml: string;
  updatedHtml: string; // The HTML with IDs added to headings
}

const generateTableOfContents = (htmlString: string): GenerateTOCResult => {
  const root = parse(htmlString);
  const headings = root.querySelectorAll('h2, h3');
  const toc: TOCItem[] = [];
  let h2Count = 0;
  let h3Count = 0;

  headings.forEach(heading => {
    const level = heading.tagName.toLowerCase() as 'h2' | 'h3';
    const text = heading.textContent.trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric, keep spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with single hyphens
      .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens

    if (level === 'h2') {
      h2Count += 1;
      h3Count = 0;
    } else if (level === 'h3') {
      h3Count += 1;
    }

    const sectionIndex =
      level === 'h2' ? String(h2Count) : `${h2Count}.${h3Count}`;
    heading.setAttribute('id', id); // Add ID to the heading

    toc.push({ level, id, sectionIndex, text });
  });

  // Build the TOC HTML dynamically to ensure proper nesting
  let currentH2List: string[] = [];
  let currentH3List: string[] = [];
  let tocHtmlSegments: string[] = [];

  toc.forEach((item, index) => {
    const linkHtml = `<a href="#${item.id}"><span class="number">${item.sectionIndex}</span> ${item.text}</a>`;

    if (item.level === 'h2') {
      // Close previous H3 list if open
      if (currentH3List.length > 0) {
        currentH2List.push(`<ol>${currentH3List.join('')}</ol>`);
        currentH3List = [];
      }
      // Close previous H2 item
      if (currentH2List.length > 0 && index > 0) {
        tocHtmlSegments.push(
          `<li data-id="${toc[index - 1].id}">${currentH2List.join('')}</li>`
        );
        currentH2List = [];
      }
      currentH2List.push(`<li data-id="${item.id}">${linkHtml}`);
    } else if (item.level === 'h3') {
      currentH3List.push(`<li data-id="${item.id}">${linkHtml}</li>`);
    }
  });

  // Add the last accumulated items
  if (currentH3List.length > 0) {
    currentH2List.push(`<ol>${currentH3List.join('')}</ol>`);
  }
  if (currentH2List.length > 0) {
    tocHtmlSegments.push(`${currentH2List.join('')}</li>`);
  }

  return {
    tocHtml: `<ol>${tocHtmlSegments.join('')}</ol>`,
    updatedHtml: root.toString(),
  };
};

async function fetchApiData<T>(
  endpoint: string,
  tags: string[] = []
): Promise<{ data: T } | { error: string }> {
  const url = `${PRODUCTION_SERVER}${endpoint}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      cache: 'force-cache',
      headers: API_HEADERS,
      next: { tags: tags.length > 0 ? tags : undefined },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error for ${endpoint}: ${res.status} - ${errorText}`);
      return {
        error: `Failed to fetch data from ${endpoint}: ${res.status} ${errorText}`,
      };
    }

    const data: T = await res.json();
    return { data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`Error in fetchApiData for ${endpoint}:`, errorMessage);
    return { error: `Failed to fetch data from ${endpoint}: ${errorMessage}` };
  }
}

interface GlobalMenu {
  id?: number;
  title: string;
  slug?: string;
  children?: GlobalMenu[];
}

interface ApiResponse<T> {
  data: T;
}

interface GlobalData extends UnknownRecord {
  main_menu?: {
    menu: NodeWithChildren[];
  };
  footer_menu?: {
    menu: NodeWithChildren[];
  };
}

export async function getGlobalData(): Promise<GlobalData | { error: string }> {
  const result = await fetchApiData<ApiResponse<GlobalData>>('/global', [
    'global',
  ]);
  if ('error' in result) return result;

  const sourceData = result.data.data;
  const mainMenu = sourceData.main_menu?.menu
    ? limitChildren(sourceData.main_menu.menu, 11)
    : undefined;
  const footerMenu = sourceData.footer_menu?.menu
    ? limitChildren(sourceData.footer_menu.menu, 12)
    : undefined;

  const globalData: GlobalData = {
    ...sourceData,
    ...(sourceData.main_menu && mainMenu && {
      main_menu: { menu: mainMenu },
    }),
    ...(sourceData.footer_menu && footerMenu && {
      footer_menu: { menu: footerMenu },
    }),
  };
  return globalData;
}

interface OptionsDataResponse {
  data: UnknownRecord;
}

interface HomePageData extends UnknownRecord {
  featured_packages?: UnknownRecord[];
  featured_blogs: BlogPost[];
}

export async function getOptionsData(): Promise<
  UnknownRecord | { error: string }
> {
  const result = await fetchApiData<OptionsDataResponse>('/options', [
    'options',
  ]);
  if ('error' in result) return result;
  return result.data.data;
}

export async function getHomeData(): Promise<HomePageData | { error: string }> {
  const result = await fetchApiData<ApiResponse<HomePageData>>('/homepage', [
    'homepage',
  ]);
  if ('error' in result) return result;

  const sourceData = result.data.data;
  const featuredPackages = Array.isArray(sourceData.featured_packages)
    ? sourceData.featured_packages.slice(0, 5)
    : undefined;
  const featuredBlogs = Array.isArray(sourceData.featured_blogs)
    ? sourceData.featured_blogs.slice(0, 4)
    : [];
  const homeContent: HomePageData = {
    ...sourceData,
    ...(featuredPackages && { featured_packages: featuredPackages }),
    featured_blogs: featuredBlogs,
  };
  return homeContent;
}

interface ArticleContent {
  page_type: string;
  content: UnknownRecord;
  next_blog?: BlogPost | null;
  previous_blog?: BlogPost | null;
}

interface ArticleResponse {
  data: ArticleContent;
}

export async function getArticle(query: string) {
  const result = await fetchApiData<ArticleResponse>(`/content/${query}`);
  if ('error' in result) return result;
  console.log(result);

  const { page_type, content } = result.data.data;

  if (page_type === 'blog') {
    const { tocHtml, updatedHtml } = generateTableOfContents(content.content);
    return {
      ...result.data.data,
      featured_packages: null,
      featured_categories: null,
      content: { ...result.data.data.content, content: null },
      ...(result.data.data.next_blog &&
        result.data.data.next_blog !== '' && {
          next_blog: {
            title: result.data.data.next_blog.title,
            urlinfo: result.data.data.next_blog.urlinfo,
            authors: result.data.data.next_blog.authors,
            blog_date: result.data.data.next_blog.blog_date,
            featured: result.data.data.next_blog.featured,
          },
        }),
      ...(result.data.data.previous_blog &&
        result.data.data.previous_blog !== '' && {
          previous_blog: {
            title: result.data.data.previous_blog.title,
            urlinfo: result.data.data.previous_blog.urlinfo,
            authors: result.data.data.previous_blog.authors,
            blog_date: result.data.data.previous_blog.blog_date,
            featured: result.data.data.previous_blog.featured,
          },
        }),
      tocHtml,
      updatedHtml,
    };
  } else if (page_type === 'package') {
    const { package_extra_faqs, group_faqs, package_trip_info } = content;

    const elements = package_extra_faqs ? parseHTML(package_extra_faqs) : [];
    let extra_faqs = elements.length > 0 ? buildFAQsFromElements(elements) : [];

    const package_trip_info_elements = package_trip_info
      ? parseHTML(package_trip_info)
      : [];
    let good_to_know =
      package_trip_info_elements.length > 0
        ? goodToKnowJSON(package_trip_info_elements)
        : [];
    const groupFaqs = (
      Array.isArray(group_faqs)
        ? group_faqs
        : Object.values(group_faqs as Record<string, FAQCategory>)
    ) as FAQCategory[];

    if (extra_faqs.length > 0) {
      if (groupFaqs.length > 0) {
        groupFaqs.splice(Math.min(3, groupFaqs.length), 0, ...extra_faqs);
      } else {
        groupFaqs.push(...extra_faqs);
      }
    }

    return {
      ...result.data.data,
      content: {
        ...result.data.data.content,
        groupFaqs,
        package_extra_faqs: null,
        package_trip_inf: null,
        good_to_know,
      },
    };
  } else {
    return result.data.data;
  }
}

interface PackageContent {
  package_extra_faqs?: string | null;
  group_faqs: FAQCategory[] | Record<string, FAQCategory>;
  package_trip_info?: string | null;
  // Add other fields from content
}

interface PackageResponse {
  data: {
    content: PackageContent;
  };
}

// export async function getPackage(query: string) {
//   const result = await fetchApiData<PackageResponse>(
//     `/packagecontent/${query}`
//   );
//   if ('error' in result) return result;

//   const { package_extra_faqs, group_faqs, package_trip_info } =
//     result.data.data.content;

//   const elements = package_extra_faqs ? parseHTML(package_extra_faqs) : [];
//   let extra_faqs = elements.length > 0 ? buildFAQsFromElements(elements) : [];

//   const package_trip_info_elements = package_trip_info
//     ? parseHTML(package_trip_info)
//     : [];
//   let good_to_know =
//     package_trip_info_elements.length > 0
//       ? goodToKnowJSON(package_trip_info_elements)
//       : [];
//   const groupFaqs = (
//     Array.isArray(group_faqs)
//       ? group_faqs
//       : Object.values(group_faqs as Record<string, unknown>)
//   ) as FAQCategory[];

//   if (extra_faqs.length > 0) {
//     if (groupFaqs.length > 0) {
//       groupFaqs.splice(Math.min(3, groupFaqs.length), 0, ...extra_faqs);
//     } else {
//       groupFaqs.push(...extra_faqs);
//     }
//   }

//   return {
//     ...result.data.data,
//     content: {
//       ...result.data.data.content,
//       groupFaqs,
//       package_extra_faqs: null,
//       package_trip_inf: null,
//       good_to_know,
//     },
//   };
// }

// interface ItineraryResponse {
//   data: UnknownRecord;
// }

// export async function getItineraryByPackageId(id: string | number) {
//   const result = await fetchApiData<ItineraryResponse>(`/itinerarydata/${id}`);
//   if ('error' in result) return result;
//   return result.data.data;
// }

interface PageContentResponse {
  data: UnknownRecord;
}

export async function getContactPage() {
  const result = await fetchApiData<PageContentResponse>(
    `/pagecontent/contactpage`
  );
  if ('error' in result) return result;
  return result.data.data;
}

export async function getAboutPage() {
  const result = await fetchApiData<PageContentResponse>(
    `/pagecontent/aboutpage`
  );
  if ('error' in result) return result;
  const sourceData = result.data.data as UnknownRecord & {
    featured_members?: UnknownRecord[];
    featured_reviews?: UnknownRecord[];
  };
  const featuredMembers = Array.isArray(sourceData.featured_members)
    ? sourceData.featured_members.slice(0, 4)
    : undefined;
  const featuredReviews = Array.isArray(sourceData.featured_reviews)
    ? sourceData.featured_reviews.slice(0, 4)
    : undefined;
  return {
    ...sourceData,
    ...(featuredMembers && { featured_members: featuredMembers }),
    ...(featuredReviews && { featured_reviews: featuredReviews }),
  };
}

// export async function getCostomizePage() {
//   const result = await fetchApiData<PageContentResponse>(
//     `/content/customize-trip`
//   );
//   if ('error' in result) return result;
//   return result.data.data;
// }

export async function getFaqsPage() {
  const result = await fetchApiData<PageContentResponse>(`/content/faqs`);
  if ('error' in result) return result;
  return result.data.data;
}

// export async function getFaqsByCategory(query: string) {
//   const result = await fetchApiData<PageContentResponse>(
//     `/faqbycategory/${query}`
//   );
//   if ('error' in result) return result;
//   return result.data.data;
// }

export async function getTeamPage() {
  const result = await fetchApiData<PageContentResponse>(
    `/pagecontent/teampage`
  );
  if ('error' in result) return result;
  return result.data.data;
}

export async function getBlogPage() {
  const result = await fetchApiData<PageContentResponse>(
    `/pagecontent/blogpage`
  );
  if ('error' in result) return result;
  return result.data.data;
}

interface TeamMemberResponse {
  data: UnknownRecord;
}

export async function getTeamMember(query: string) {
  const result = await fetchApiData<TeamMemberResponse>(
    `/membercontent/${query}`
  );
  if ('error' in result) return result;
  return result.data.data;
}

interface PackageByCategoryResponse {
  content: PackageItem[];
}

// export async function getPackageByCategory(query: string) {
//   const result = await fetchApiData<PackageByCategoryResponse>(
//     `/packagebycategory/${query}`
//   );
//   if ('error' in result) return result;

//   const packageData = result.data.content.slice(0, 5).map(a => ({
//     package_title: a.package_title,
//     featured: a.featured,
//     package_discount: a.package_discount,
//     package_duration: a.package_duration,
//     package_duration_type: a.package_duration_type,
//     urlinfo: a.urlinfo,
//     testimonials: a.testimonials,
//     additional_field_1: a.additional_field_1,
//     group_default_price: a.group_default_price,
//     total_testimonials: a.total_testimonials,
//     id: a.id,
//   }));
//   return packageData;
// }

export async function getContentByKeyType(query: string) {
  const result = await fetchApiData<PageContentResponse>(
    `/pagecontent/${query}`
  );
  if ('error' in result) return result;
  return result.data.data;
}

export async function getIpAddress() {
  try {
    const res = await fetch('https://api.ipify.org/', {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch IP address: ${res.status}`);
    }

    return await res.text();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unknown error occurred';
    return { error: message };
  }
}

interface TestimonialResponse {
  data: UnknownRecord;
}

export async function getTestimonialBySlug(query: string) {
  const result = await fetchApiData<TestimonialResponse>(
    `/testimonialcontent/${query}`
  );
  if ('error' in result) return result;
  return result.data.data;
}

interface StoryPageContent {
  data: UnknownRecord;
}

interface StoryListContent {
  data: UnknownRecord[];
}

export async function getStoryPage() {
  const [pageResult, listResult] = await Promise.all([
    fetchApiData<StoryPageContent>(`/content/story`),
    fetchApiData<StoryListContent>(`/allstories?_start=0&_limit=6`),
  ]);

  if ('error' in pageResult) return pageResult;
  if ('error' in listResult) return listResult;

  const data = {
    storyList: listResult.data.data,
    storyPage: pageResult.data.data,
  };
  return data;
}

interface StoryBySlugResponse {
  data: UnknownRecord;
}

export async function getStoryBySlug(query: string) {
  const result = await fetchApiData<StoryBySlugResponse>(
    `/storycontent/${query}`
  );
  if ('error' in result) return result;
  return result.data.data;
}

interface AuthorBySlugResponse {
  data: UnknownRecord;
}

export async function getAuthorBySlug(query: string) {
  const result = await fetchApiData<AuthorBySlugResponse>(
    `/blogauthor/${query}`
  );
  if ('error' in result) return result;
  return result.data.data;
}

interface SiteMapResponse {
  data: UnknownRecord;
}

export async function getSiteMap() {
  const result = await fetchApiData<SiteMapResponse>(`/sitemap`);
  if ('error' in result) return result;

  return result.data.data;
}

export async function getImageSiteMap() {
  const result = await fetchApiData<SiteMapResponse>(`/imagecontent`);
  if ('error' in result) return result;
  return result.data.data;
}

interface BlogContent {
  next_blog: BlogPost | null;
  previous_blog: BlogPost | null;
  content: {
    content: string;
  };
}

interface BlogBySlugResponse {
  data: BlogContent;
}

export async function getBlogBySlug(query: string) {
  const result = await fetchApiData<BlogBySlugResponse>(
    `/blogcontent/${query}`
  );
  if ('error' in result) return result;

  const { tocHtml, updatedHtml } = generateTableOfContents(
    result.data.data.content.content
  );

  return {
    next_blog: result.data.data.next_blog,
    previous_blog: result.data.data.previous_blog,
    tocHtml,
    updatedHtml,
    content: result.data.data.content,
  };
}

interface Route {
  slug: string;
}

interface StaticRoutesResponse {
  data: Route[];
}

export async function getStaticRoutes() {
  const result = await fetchApiData<StaticRoutesResponse>(`/content`);
  if ('error' in result) return result;
  return result.data.data;
}

interface AllAuthorsResponse {
  data: UnknownRecord[];
}

export async function getAllBlogAuthor() {
  const result = await fetchApiData<AllAuthorsResponse>(`/allblogauthors`);
  if ('error' in result) return result;
  return result.data;
}

interface AllMembersResponse {
  data: UnknownRecord[];
}

export async function getAllMembers() {
  const result = await fetchApiData<AllMembersResponse>(`/allmembers`);
  if ('error' in result) return result;
  return result.data;
}

interface AllTestimonialsResponse {
  data: UnknownRecord[];
}

export async function getAllTestimonials() {
  const result = await fetchApiData<AllTestimonialsResponse>(
    `/alltestimonials`
  );
  if ('error' in result) return result;
  return result.data;
}

interface AllBlogsResponse {
  data: UnknownRecord[];
}

export async function getAllBlog() {
  const result = await fetchApiData<AllBlogsResponse>(`/allblogs`);
  if ('error' in result) return result;
  return result.data;
}

// Default export kept minimal to avoid changing existing named exports.
export default getBlogBySlug;
