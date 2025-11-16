import Blog from '@/components/Pages/Blog/Blog';
import { getBlogBySlug } from '@/services/network_requests';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params: any = await props.params;
  const { slug }: any = params;

  const data: any = await getBlogBySlug(slug);

  return <Blog data={data as any} />;
}
