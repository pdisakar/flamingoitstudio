import Link from 'next/link';
import Statistics from '@/components/Statistics/Statistics';
import Letstalk from '@/components/Letstalk/Letstalk';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Image from 'next/image';
import { IMAGE_URL } from '@/lib/constants';
import Pagebanner from '@/components/Pagebanner/Pagebanner';

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
                    alt={child?.url_title ?? ''}
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
            <h1
              dangerouslySetInnerHTML={{ __html: content?.page_title ?? '' }}
            />
          </div>
        </div>

        {typeof content?.page_abstract === 'string' && (
          <article
            className="blog-abstract mb-8"
            dangerouslySetInnerHTML={{ __html: content.page_abstract }}
          />
        )}

        {content?.banner ? (
          <Pagebanner
            classes={'image-slot aspect-1920/750 rounded-lg mb-8'}
            imagelink={content.banner.full_path}
            alt={content.page_title ?? ''}
          />
        ) : null}

        {(
          (content?.page_description_structured ?? []) as {
            title: string;
            body: string;
          }[]
        ).map((section: { title: string; body: string }, index: number) => (
          <div
            className={`about-this-article [&>h2]:text-[clamp(28px,8vw,52px)] [&>h2]:font-secondary [&>h2]:leading-[1.2] [&>h2]:font-semibold [&>article>h3]:text-[clamp(22px,10vw,28px)] [&>article>h3]:leading-[1.2] [&>article>h3]:font-semibold [&>article>h3]:mt-4 [&>article>p:not(:first-child)]:mt-4 [&>article>p]:md:text-body/95 [&>p:not(:first-child)]:mt-2.5 lg:grid lg:grid-cols-3 lg:gap-4  [&>article>ul>li]:relative [&>article>ul>li]:pl-7 [&>article>ul>li]:before:h-4 [&>article>ul>li]:before:w-4 [&>article>ul>li]:before:top-2.5 [&>article>ul>li]:before:absolute [&>article>ul>li]:before:left-0 [&>article>ul>li]:before:content-[''] [&>article>ul>li]:before:bg-point [&>article>ul>li]:before:bg-no-repeat [&>article>ul>li]:before:bg-cover [&>article>ul>li>p]:mb-3 ${
              section.title && section.body
                ? 'mt-20 pt-20 border-t border-white/50'
                : ''
            }`}
            key={index}>
            {section.title && section.body ? (
              <>
                <h2
                  className="col-span-1 lg:sticky lg:top-4 lg:self-start"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
                <article
                  className="col-span-2"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </>
            ) : section.body ? (
              <article
                className="col-span-3"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
