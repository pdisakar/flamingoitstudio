import Link from 'next/link';
import Statistics from '@/components/Statistics/Statistics';
import Letstalk from '@/components/Letstalk/Letstalk';

const Article = ({ data }: any) => {
  const content = data?.content;
  const children = content?.children;

  console.log(data);

  // If the page has children
  if (children && children.length > 0) {
    return (
      <div className="container">
        <div className=" common-box page-title">
          <h1 className="max-w-[1231px]">Web Development Case Study</h1>
          <article className="text-xl [&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-12  lg:mt-16">
            <p>
              At Flamingo IT Studio, we’re proud to present a showcase of the
              web development solutions we’ve crafted for clients across
              industries. This portfolio highlights our commitment to building
              powerful, user-focused digital experiences—from dynamic websites
              and robust web applications to custom backend systems and
              responsive interfaces.
            </p>
            <p>
              Every project reflects a unique challenge we’ve tackled with
              strategy, creativity, and technical precision. Dive in to explore
              how we’ve helped businesses transform their online presence and
              achieve real, measurable results through smart development and
              scalable design.
            </p>
          </article>
        </div>
        <div className="common-box pt-0">
          <Statistics />
        </div>
        <div className="common-box pt-0">
          <div className=" page-title">
            <h1 className="max-w-[1231px]">Web Development Portfolio</h1>
            <p className="text-xl [&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-12  lg:mt-16">
              Step into the world of real results with Flamingo IT Studio’s Web
              Development Case Studies. These stories go beyond code—they reveal
              how strategic thinking, innovative technology, and a user-first
              mindset come together to solve complex business problems and
              deliver seamless digital experiences. From performance-driven
              websites to custom-built applications, each case study uncovers
              the challenges we faced, the smart solutions we engineered, and
              the tangible impact our development work has had on clients.
              Discover how our expertise transforms ideas into functional,
              future-ready web platforms.
            </p>
          </div>
        </div>
        <ul className="out-projects common-box pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child: any) => (
            <li
              key={child.id}
              className="">
              <h2 className="text-lg font-semibold">
                <Link href={`/${child.urlinfo?.url_slug || child.url_title}`}>
                  {child.url_title}
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="common-box">
      <div className="container">
        <h1>{content?.page_title}</h1>
        {content?.page_description && (
          <div dangerouslySetInnerHTML={{ __html: content.page_description }} />
        )}
      </div>
    </div>
  );
};

export default Article;
