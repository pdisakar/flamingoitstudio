import { getBlogPage } from '@/services/network_requests';
import { notFound } from 'next/navigation';

import { IMAGE_URL } from '@/lib/constants';
import BlogList from '@/components/Pages/Blog/blogListing';

export default async function Blog() {
  const data = await getBlogPage();
  if (!data) {
    return notFound();
  }

  return (
    <div className="common-box">
      <div className="container">
        <BlogList data={data} />
      </div>
    </div>
  );
}
