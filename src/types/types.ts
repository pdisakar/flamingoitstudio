export interface UrlInfo {
  url_slug: string;
  canonical?: string;
  url_index?: number;
  [key: string]: unknown;
}

export interface ImageAsset {
  full_path: string;
  alt_text?: string | null;
}

export interface BannerAsset extends ImageAsset {}

export interface BreadcrumbItem {
  title: string;
  slug: string;
}

export interface BlogAuthor {
  name: string;
  [key: string]: unknown;
}

export interface BlogCategory {
  id: number | string;
  title: string;
  slug: string;
  urlinfo?: UrlInfo;
  [key: string]: unknown;
}

export interface BlogPost {
  id?: number | string;
  title: string;
  abstract?: string;
  blog_date?: string;
  content?: string;
  banner?: BannerAsset;
  featured?: ImageAsset;
  urlinfo: UrlInfo;
  meta?: {
    meta_title: string;
    meta_description: string;
  };
  url_title?: string;
  authors?: BlogAuthor[];
  categories?: BlogCategory[];
  [key: string]: unknown;
}

export interface BlogContentWrapper {
  content: BlogPost;
}

export interface BlogPageData {
  content: BlogPost;
}

export interface BlogListingData {
  listcontent: BlogPost[];
  blog_categories: BlogCategory[];
  [key: string]: unknown;
}

export interface ArticleChild {
  id: number | string;
  urlinfo?: UrlInfo;
  url_title?: string;
  featured?: ImageAsset;
  [key: string]: unknown;
}

export interface ArticleContent {
  page_title?: string;
  page_description?: string;
  page_abstract?: string;
  title?: string;
  banner?: BannerAsset;
  meta?: {
    meta_title: string;
    meta_description: string;
  };
  urlinfo?: UrlInfo & {
    canonical?: string;
    url_index?: number;
  };
  children?: ArticleChild[];
  // Structured representation of `page_description` generated on the server
  // (see `getArticle` in `network_requests.ts`).
  page_description_structured?: { title: string; body: string }[];
  [key: string]: unknown;
}

export interface ArticlePageData {
  content: ArticleContent;
  breadcrumbs?: BreadcrumbItem[][];
  [key: string]: unknown;
}

export interface ArticleApiResponse extends ArticlePageData {
  page_type: string;
  next_blog?: BlogPost | null;
  previous_blog?: BlogPost | null;
}

export interface BlogBySlugData {
  next_blog?: BlogPost | null;
  previous_blog?: BlogPost | null;
  tocHtml: string;
  updatedHtml: string;
  content: BlogPost;
}

export interface OptionCheckbox {
  title: string;
  slug: string;
  checked: boolean;
}

