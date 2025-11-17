import type { ComponentType } from 'react';
import Article from '@/components/Pages/Article/Article';
import { getArticle } from '@/services/network_requests';
import { ArticleApiResponse } from '@/types/types';

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

type ArticleComponent = ComponentType<{ data: ArticleApiResponse }>;

export default async function Page({ params }: SlugPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = (await getArticle(slug)) as ArticleApiResponse;
  const PageComponentMap: Record<string, ArticleComponent> = {
    article: Article,
  };

  const PageComponent = PageComponentMap[data.page_type] ?? Article;

  return <PageComponent data={data} />;
}
