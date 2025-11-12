import Article from '@/components/Pages/Article/Article';
import Blog from '@/components/Pages/Blog/page';
import Category from '@/components/Pages/Category/Category';
import { IMAGE_URL } from '@/lib/constants';
import {
  getArticle,
  getSiteMap,
  getStaticRoutes,
} from '@/services/network_requests';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';

interface ArticleData {
  page_type: 'article' | 'blog' | 'category';
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const data: ArticleData | null = await getArticle(slug);

  if (!data || !data.content || !data.page_type) {
    notFound();
  }

  const { page_type, content } = data;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': page_type === 'blog' ? 'Blog' : 'Article',
    datePublished: content.published_at,
    description: content.meta.meta_description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': content.title,
    },
    headline: content.meta.meta_title,
    ...(content.banner && {
      image: [`${IMAGE_URL}${content.banner.full_path}`],
    }),
    dateModified: content.updated_at,
    author: {
      '@type': 'Person',
      name:
        page_type === 'blog' && content.authors.length > 0
          ? content.authors[0].name
          : 'worldalpinetreks',
      url:
        page_type === 'blog' && content.authors.length > 0
          ? `${process.env.CANONICAL_BASE}author/${content.authors[0].urlinfo.url_slug}`
          : process.env.CANONICAL_BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'worldalpinetreks',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.CANONICAL_BASE}logo.svg`,
      },
    },
  };

  const PageComponent = {
    blog: Blog,
    category: Category,
    article: Article,
  }[page_type];

  return (
    <>
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <PageComponent data={data as any} />
    </>
  );
}
