import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPage } from '@/services/network_requests';
import { IMAGE_URL } from '@/lib/constants';
import BlogList from '@/components/Pages/Blog/blogListing';
import type {
  BannerAsset,
  BlogListingData,
  BlogPost,
  BlogCategory,
  UrlInfo,
} from '@/types/types';

type PageMetaContent = {
  meta: {
    meta_title: string;
    meta_description: string;
  };
  urlinfo: UrlInfo & {
    canonical?: string;
  };
  banner?: BannerAsset;
};

type BlogPagePayload = {
  pagecontent: PageMetaContent;
  listcontent: BlogPost[];
  blog_categories: BlogCategory[];
};

const isBlogPagePayload = (data: unknown): data is BlogPagePayload => {
  if (typeof data !== 'object' || data === null) return false;
  const candidate = data as Partial<BlogPagePayload>;
  return (
    Array.isArray(candidate.listcontent) &&
    Array.isArray(candidate.blog_categories) &&
    typeof candidate.pagecontent === 'object' &&
    candidate.pagecontent !== null &&
    candidate.pagecontent.meta !== undefined &&
    candidate.pagecontent.urlinfo !== undefined
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBlogPage();
  if (!isBlogPagePayload(data)) {
    return {};
  }
  const { pagecontent } = data;
  const canonicalUrl = `${process.env.CANONICAL_BASE}${pagecontent.urlinfo.url_slug}`;

  return {
    title: pagecontent.meta.meta_title,
    description: pagecontent.meta.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pagecontent.meta.meta_title,
      description: pagecontent.meta.meta_description,
      url: canonicalUrl,
      images: pagecontent.banner
        ? [
            {
              url: IMAGE_URL + pagecontent.banner.full_path,
              width: 1650,
              height: 600,
              alt: pagecontent.meta.meta_title,
            },
          ]
        : [],
    },
  };
}

export default async function Blog() {
  const result = await getBlogPage();

  if (!isBlogPagePayload(result)) {
    return notFound();
  }

  const data: BlogListingData = {
    listcontent: result.listcontent,
    blog_categories: result.blog_categories,
  };

  return (
    <div className="common-box">
      <div className="container">
        <BlogList data={data} />
      </div>
    </div>
  );
}
