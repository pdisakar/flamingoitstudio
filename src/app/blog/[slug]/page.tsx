import Blog from '@/components/Pages/Blog/Blog';
import getBlogBySlug from '@/services/network_requests';
import { BlogBySlugData } from '@/types/types';

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: BlogSlugPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = (await getBlogBySlug(slug)) as BlogBySlugData;

  return <Blog data={data} />;
}
