import Article from '@/components/Pages/Article/Article';
import { getArticle } from '@/services/network_requests';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params: any = await props.params;
  const { slug }: any = params;

  const data: any = await getArticle(slug);
  const { page_type }: any = data;

  const PageComponent: any = {
    article: Article,
  }[page_type];

  return <PageComponent data={data as any} />;
}
