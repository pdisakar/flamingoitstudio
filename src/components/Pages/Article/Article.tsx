'use client';
import Link from 'next/link';
import Statistics from '@/components/Statistics/Statistics';
import Letstalk from '@/components/Letstalk/Letstalk';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Image from 'next/image';
import { IMAGE_URL } from '@/lib/constants';
import {
  ArticleApiResponse,
  ArticleChild,
  BreadcrumbItem,
} from '@/types/types';

interface ArticleProps {
  data: ArticleApiResponse;
}

const Article = ({ data }: ArticleProps) => {
  const content = data?.content;
  const children = content?.children ?? [];
  const breadcrumbs: BreadcrumbItem[] | undefined = data?.breadcrumbs?.[0];

  if (children.length > 0) {
    return (
      <div className="container">
        <div className="common-box page-title">
          <h1 className="max-w-[1231px]">Web Development Case Study</h1>
          <article className="[&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-10 lg:mt-12">
            <p>
              At Flamingo IT Studio, we’re proud to present a showcase of the
              web development solutions we’ve crafted for clients across
              industries. Our team combines creativity, technical expertise, and
              a user-focused mindset to deliver digital experiences that drive
              real business results. From dynamic websites and custom web
              applications to scalable backend solutions, each project
              highlights our ability to solve complex challenges while staying
              true to our clients’ vision and goals.
            </p>
            <p>
              Every project reflects a unique journey—transforming ideas into
              functional, visually appealing, and high-performing platforms. By
              leveraging the latest technologies, best practices, and a
              collaborative approach, we ensure that our solutions not only meet
              current demands but are also future-ready. Explore our portfolio
              to see how we’ve helped businesses strengthen their digital
              presence, optimize user experiences, and achieve measurable
              success in the online world.
            </p>
            <p>
              Every project reflects a unique challenge we’ve tackled with
              strategy, creativity, and technical precision. From building
              responsive, performance-optimized websites to designing complex
              web applications, our approach ensures that each solution is
              tailored to the client’s goals and audience. We combine innovative
              design, scalable architecture, and robust functionality to deliver
              digital products that not only look impressive but also drive
              meaningful results. By analyzing user needs, industry trends, and
              technical constraints, we transform complex problems into elegant,
              user-friendly solutions that stand the test of time.
            </p>
          </article>
        </div>
        <div className="common-box pt-0">
          <Statistics />
        </div>
        <div className="common-box pt-0">
          <div className="page-title">
            <h1 className="max-w-[1231px]">Web Development Portfolio</h1>
            <p className="[&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-10 lg:mt-12">
              Step into the world of real results with Flamingo IT Studio’s Web
              Development Case Studies. Each project highlights how strategic
              thinking, innovative technology, and a user-first approach come
              together to solve complex business challenges. From
              performance-driven websites to custom web applications, these case
              studies demonstrate our ability to deliver scalable, visually
              engaging, and highly functional digital solutions that drive
              measurable impact and help businesses thrive online.
            </p>
          </div>
        </div>
        <ul className="out-projects common-box pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child: ArticleChild) => (
            <li
              key={child.id}
              className="article-card group">
              <figure className=" image-slot aspect-600/505">
                <Link href={`/${child.urlinfo?.url_slug}`}>
                  <Image
                    src={`${IMAGE_URL}${child?.featured?.full_path}`}
                    alt={child?.url_title}
                    width={600}
                    height={505}
                    sizes="(min-width: 600px) 50vw, 600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    loading="lazy"
                  />
                </Link>
              </figure>

              <figcaption className="pt-4">
                <h2 className="text-[28px] font-medium group-hover:text-primary transition-transform duration-300 ease-in-out">
                  <Link href={`/${child.urlinfo?.url_slug}`}>
                    {' '}
                    {child.url_title}
                  </Link>
                </h2>
              </figcaption>
            </li>
          ))}
        </ul>
        <div className="common-box pt-0">
          <Letstalk />
        </div>
      </div>
    );
  }

  return (
    <div className="common-box">
      <div className="container">
        <div className="title-section">
          <Breadcrumb items={breadcrumbs || []} />
          <div className="article-title mt-6">
            <h1 dangerouslySetInnerHTML={{ __html: content?.page_title }} />
          </div>
        </div>
        {content?.page_description && (
          <div
            className={`md:grid md:grid-cols-[1fr_2fr] md:gap-8 *:md:grid-col-span-full [&>h3]:md:col-start-1 [&>h3]:md:col-end-2 [&>h3]:text-[clamp(28px,10vw,52px)] [&>h3]:font-secondary [&>h3]:leading-[1.2] [&>h3]:font-semibold  [&>h3]:mt-3.5 [&>h4]:mt-3 md:[&>h3]:mt-0 lg:[&>h4]:mt-0 md:[&>p:not(:first-child)]:mt-0 [&>p]:md:text-body/95 [&>p:not(:first-child)]:mt-2.5 [&>h3]:md:pr-6 [&>h3:md:self-start [&>h4]:text-[clamp(22px,10vw,28px)] [&>h4]:leading-[1.2] [&>h4]:font-semibold [&>h3]:md:!grid-column-auto [&>h3~*:not(h3)]:md:col-start-2 [&>h3~*:not(h3)]:md:col-end-3 [&>h3~*:not(h3)]:md:!grid-column-auto`}
            dangerouslySetInnerHTML={{ __html: content.page_description }}
          />
        )}
      </div>
    </div>
  );
};

export default Article;
