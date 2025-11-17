import { getBlogPage } from '@/services/network_requests';
import { notFound } from 'next/navigation';

import { IMAGE_URL } from '@/lib/constants';
import BlogList from '@/components/Pages/Blog/blogListing';
import type { BlogListingData } from '@/types/types';

export default async function Blog() {
  const result = await getBlogPage();

  if (!result || 'error' in (result as { error?: string })) {
    return notFound();
  }

  const data = result as BlogListingData;

  return (
    <div className="common-box">
      <div className="container">
        <BlogList data={data} />
      </div>
    </div>
  );
}
