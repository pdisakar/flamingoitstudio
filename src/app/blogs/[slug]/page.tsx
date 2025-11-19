import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Blog from '@/components/Pages/Blog/Blog';
import getBlogBySlug from '@/services/network_requests';
import type { BlogBySlugData } from '@/types/types';
import { IMAGE_URL } from '@/lib/constants';

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

const isBlogBySlugData = (data: unknown): data is BlogBySlugData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'content' in data &&
    'updatedHtml' in data
  );
};

async function loadBlog(slug: string): Promise<BlogBySlugData> {
  const result = await getBlogBySlug(slug);
  if (!isBlogBySlugData(result)) {
    notFound();
  }
  return result;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await loadBlog(params.slug);

  const { meta, urlinfo, banner, title, abstract } = data.content;
  const canonicalUrl = urlinfo?.canonical
    ? `${process.env.CANONICAL_BASE}${urlinfo.canonical}`
    : `${process.env.CANONICAL_BASE}${urlinfo?.url_slug ?? params.slug}`;
  const metaTitle = meta?.meta_title ?? title ?? 'Flamingo IT Studio';
  const metaDescription =
    meta?.meta_description ??
    abstract ??
    'Explore Flamingo IT Studio blog content.';

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
      },
    },
    ...(urlinfo?.url_index === 0 && {
      robots: {
        index: false,
        googleBot: {
          index: false,
        },
      },
    }),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: process.env.COMPANY_NAME,
      type: 'website',
      ...(banner && {
        images: [
          {
            url: `${IMAGE_URL}${banner.full_path}`,
            width: 1920,
            height: 700,
          },
        ],
      }),
    },
  };
}

export default async function Page({ params }: BlogSlugPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await loadBlog(slug);

  return <Blog data={data} />;
}
