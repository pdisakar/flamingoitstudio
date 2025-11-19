import type { ComponentType } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Article from '@/components/Pages/Article/Article';
import { getArticle, getStaticRoutes } from '@/services/network_requests';
import { ArticleApiResponse, UrlInfo } from '@/types/types';
import { IMAGE_URL } from '@/lib/constants';

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

type ArticleComponent = ComponentType<{ data: ArticleApiResponse }>;

const isArticleResponse = (data: unknown): data is ArticleApiResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'page_type' in data &&
    'content' in data
  );
};

async function loadArticle(slug: string): Promise<ArticleApiResponse> {
  const data = await getArticle(slug);
  if (!isArticleResponse(data)) {
    notFound();
  }
  return data;
}

export async function generateStaticParams() {
  const data = await getStaticRoutes();

  if (!Array.isArray(data)) {
    return [];
  }

  const excludedSlugs = [
    'blog',
    'booking',
    'trip-booking',
    'author',
    'contact-us',
    'checkout',
    'plan-your-trip',
    'about-us',
    'customize-trip',
    'nabil-payment-cancelled',
    'nabil-payment-complete',
    'nabil-payment-declined',
    'online-booking',
    'online-payment',
    'package',
    'review',
    'story',
    'team',
    'thank-you',
    'thank-you-inquiry',
    'sitemap',
    'reviews',
    'luxury-trekking',
    'travel-guide',
    'our-teams',
    'our-team',
    'authors',
  ];
  console.log(data);

  return data
    .filter(({ slug }) => !excludedSlugs.includes(slug))
    .slice(0, 5)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await loadArticle(params.slug);

  const { meta, urlinfo, banner, page_title, page_abstract } = data.content;
  const resolvedUrlInfo: UrlInfo & { canonical?: string; url_index?: number } =
    urlinfo ?? { url_slug: params.slug };

  const canonicalUrl = resolvedUrlInfo.canonical
    ? `${process.env.CANONICAL_BASE}${resolvedUrlInfo.canonical}`
    : `${process.env.CANONICAL_BASE}${resolvedUrlInfo.url_slug}`;
  const metaTitle =
    meta?.meta_title ??
    page_title ??
    data.content.title ??
    'Flamingo IT Studio';
  const metaDescription =
    meta?.meta_description ??
    page_abstract ??
    'Explore Flamingo IT Studio content.';

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
      },
    },
    ...(resolvedUrlInfo.url_index === 0 && {
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

export default async function Page({ params }: SlugPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await loadArticle(slug);
  const PageComponentMap: Record<string, ArticleComponent> = {
    article: Article,
  };

  const PageComponent = PageComponentMap[data.page_type] ?? Article;

  return <PageComponent data={data} />;
}
