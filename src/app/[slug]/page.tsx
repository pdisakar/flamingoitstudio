import Article from '@/components/Pages/Article/Article';
import Blog from '@/components/Pages/Blog/page';
import { getArticle } from '@/services/network_requests';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const data = await getArticle(slug);

  const { page_type } = data;

  const PageComponent = {
    blog: Blog,
    article: Article,
  }[page_type];

  return (
    <>
      <PageComponent data={data as any} />
    </>
  );
}
