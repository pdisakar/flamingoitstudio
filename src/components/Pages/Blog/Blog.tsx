'use client';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Image from 'next/image';
import { IMAGE_URL } from '@/lib/constants';

const Blog = (data: any) => {
  const blogdata = data.data.content;

  const Breadcrumbdata = [
    {
      title: blogdata.title,
      slug: `${blogdata.urlinfo.url_slug}`,
    },
  ];

  console.log(blogdata);

  return (
    <div className="container common-box">
      <div className="title-section">
        <Breadcrumb items={Breadcrumbdata || []} />
        <div className="article-title mt-6">
          <h1 dangerouslySetInnerHTML={{ __html: blogdata?.title }} />
        </div>
      </div>

      {blogdata.abstract && (
        <div className="blog-abstract mb-8">{blogdata.abstract}</div>
      )}

      {blogdata?.banner && (
        <div className="banner image-slot aspect-1920/750 rounded-lg mb-8">
          <Image
            src={`${IMAGE_URL}${blogdata?.banner?.full_path}`}
            alt="img"
            height={750}
            width={1920}
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {blogdata.content && (
        <article
          className="[&>h2]:text-[clamp(28px,5vw,32px)] [&>h2]:leading-[1.3] [&>h2]:font-semibold [&>h2]:font-secondary [&>h2:not(:first-child)]:mt-6 [&>h3]:text-[clamp(20px,5vw,24px)] [&>h3]:font-semibold [&>h3]:font-secondary [&>h3:not(:first-child)]:mt-3 [&>p:not(:first-child)]:mt-2"
          dangerouslySetInnerHTML={{ __html: blogdata?.content }}
        />
      )}
    </div>
  );
};

export default Blog;
