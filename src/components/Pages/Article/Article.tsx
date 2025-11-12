'use client';
import Link from 'next/link';
import Statistics from '@/components/Statistics/Statistics';
import Letstalk from '@/components/Letstalk/Letstalk';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

const Article = ({ data }: any) => {
  const content = data?.content;
  const children = content?.children;
  const breadcrumbs = data?.breadcrumbs?.[0];

  if (children && children.length > 0) {
    return (
      <div className="container">
        <div className="common-box page-title">
          <h1 className="max-w-[1231px]">Web Development Case Study</h1>
          <article className="[&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-12 lg:mt-16">
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
            <p className="[&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-12 lg:mt-16">
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
          {children.map((child: any) => (
            <li key={child.id}>
              <h2 className="text-lg font-semibold">
                <Link href={`/${child.urlinfo?.url_slug || child.url_title}`}>
                  {child.url_title}
                </Link>
              </h2>
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
        <Breadcrumb items={breadcrumbs || []} />

        <h1>{content?.page_title}</h1>
        {content?.page_description && (
          <div dangerouslySetInnerHTML={{ __html: content.page_description }} />
        )}
      </div>
    </div>
  );
};

export default Article;
