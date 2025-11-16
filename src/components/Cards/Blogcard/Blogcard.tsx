import Link from 'next/link';
import { BLOG_BASE_URL, IMAGE_URL } from '@/lib/constants';
import Image from 'next/image';
import dayjs from 'dayjs';

const Blogcard = (blogData: any) => {
  const { title, featured, blog_date, urlinfo, categories, authors } =
    blogData.blogData;

  return (
    <div className="blog-item group">
      <figure className="relative">
        <Link
          href={`${BLOG_BASE_URL}${urlinfo?.url_slug}`}
          className="image-slot aspect-354/298">
          {featured && (
            <Image
              src={IMAGE_URL + featured.full_path}
              alt={featured.alt_text ? featured.alt_text : title}
              width={298}
              height={354}
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          )}
        </Link>
      </figure>

      <figcaption className="pt-4">
        <h2 className="text-[28px] font-medium group-hover:text-primary transition-transform duration-300 ease-in-out">
          <Link href={`${BLOG_BASE_URL}${urlinfo?.url_slug}`}>{title}</Link>
        </h2>
        <span className="blog-date text-base">
          {dayjs(blog_date).format('DD MMM YYYY')}
        </span>
        {/* 
        <div className="blog-meta">
          <span>{dayjs(blog_date).format('DD MMM YYYY')}</span>
          {authors && authors.length > 0 && <span>By {authors[0].name}</span>}
        </div> */}
      </figcaption>
    </div>
  );
};

export default Blogcard;
