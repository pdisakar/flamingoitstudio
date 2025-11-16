import Link from 'next/link';
import { BLOG_BASE_URL } from '@/lib/constants';

const Blogcard = (blogData: any) => {
  console.log(blogData);

  const data = blogData.blogData;
  return (
    <div>
      <Link href={`${BLOG_BASE_URL}${data?.urlinfo?.url_slug || ''}`}>
        {data.title}
      </Link>
    </div>
  );
};

export default Blogcard;
