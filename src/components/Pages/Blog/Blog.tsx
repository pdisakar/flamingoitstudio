'use client';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Image from 'next/image';
import { IMAGE_URL } from '@/lib/constants';
import { useMemo, useCallback } from 'react';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from 'html-react-parser';
import { BlogBySlugData, BlogPageData } from '@/types/types';
import Letstalk from '@/components/Letstalk/Letstalk';

interface TOCItem {
  id: string;
  text: string;
  index: number | string;
  children: TOCItem[];
}

interface BlogProps {
  data: BlogPageData | BlogBySlugData;
}

const getPlainTextFromChildren = (children: DOMNode[]): string => {
  return children
    .map(child => {
      const anyChild = child as any;
      if (anyChild.type === 'text' && typeof anyChild.data === 'string') {
        return anyChild.data;
      }
      if (Array.isArray(anyChild.children)) {
        return getPlainTextFromChildren(anyChild.children);
      }
      return '';
    })
    .join('');
};
const normalizeContent = (content: string): string => {
  return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
};

const Blog = ({ data }: BlogProps) => {
  const blogdata = data.content;

  const breadcrumbData = useMemo(
    () => [
      {
        title: blogdata.title,
        slug: blogdata.urlinfo.url_slug,
      },
    ],
    [blogdata.title, blogdata.urlinfo.url_slug]
  );

  const { parsedContent, toc } = useMemo(() => {
    if (!blogdata?.content) {
      return { parsedContent: null, toc: [] };
    }
    const normalizedContent = normalizeContent(blogdata.content);

    const tempToc: TOCItem[] = [];
    let h2Count = 0;

    const options: HTMLReactParserOptions = {
      replace: domNode => {
        if (domNode.type !== 'tag') return;

        const node = domNode as Element;

        if (node.name === 'h2') {
          h2Count++;
          const id = `h2-${h2Count}`;
          const text = getPlainTextFromChildren(node.children as DOMNode[]);

          tempToc.push({
            id,
            text,
            index: h2Count,
            children: [],
          });

          return (
            <h2 id={id}>{domToReact(node.children as DOMNode[], options)}</h2>
          );
        }

        if (node.name === 'h3') {
          const lastH2 = tempToc[tempToc.length - 1];
          if (lastH2) {
            const h3Index = lastH2.children.length + 1;
            const id = `h2-${h2Count}-h3-${h3Index}`;
            const text = getPlainTextFromChildren(node.children as DOMNode[]);

            lastH2.children.push({
              id,
              text,
              index: `${h2Count}.${h3Index}`,
              children: [],
            });

            return (
              <h3 id={id}>{domToReact(node.children as DOMNode[], options)}</h3>
            );
          }
        }
      },
    };

    const contentWithIds = parse(normalizedContent, options);

    return {
      parsedContent: contentWithIds,
      toc: tempToc,
    };
  }, [blogdata?.content]);

  const handleScrollToSection = useCallback((id: string) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };
  }, []);

  return (
    <div className="container common-box">
      <div className="title-section">
        <Breadcrumb items={breadcrumbData} />
        <div className="article-title mt-6">
          <h1 dangerouslySetInnerHTML={{ __html: blogdata.title }} />
        </div>
      </div>

      {blogdata.abstract && (
        <div className="blog-abstract mb-8">{blogdata.abstract}</div>
      )}

      {blogdata?.banner && (
        <div className="banner image-slot aspect-1920/750 rounded-lg mb-8">
          <Image
            src={`${IMAGE_URL}${blogdata.banner.full_path}`}
            alt={blogdata.title}
            height={750}
            width={1920}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <div className="main-article-container lg:grid lg:grid-cols-10 gap-6">
        {toc.length > 0 && (
          <nav
            className="lg:col-span-3 lg:sticky top-6 self-start overflow-y-auto"
            aria-label="Table-of-contents">
            <h2 className=" text-lg lg:text-2xl font-semibold mb-2 ">
              Table of Contents
            </h2>
            <ul>
              {toc.map(h2 => (
                <li
                  className="leading-normal"
                  key={h2.id}>
                  <a
                    href={`#${h2.id}`}
                    onClick={handleScrollToSection(h2.id)}
                    className="text-[17px] font-medium hover:text-primary">
                    {h2.index}. {h2.text}
                  </a>
                  {h2.children.length > 0 && (
                    <ul className="ml-4">
                      {h2.children.map(h3 => (
                        <li key={h3.id}>
                          <a
                            href={`#${h3.id}`}
                            onClick={handleScrollToSection(h3.id)}
                            className="text-[16px]  hover:text-primary">
                            {h3.index} {h3.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {parsedContent && (
          <article className="lg:col-span-7 [&>h2]:text-[clamp(28px,5vw,32px)] [&>h2]:leading-[1.3] [&>h2]:font-semibold [&>h2]:font-secondary [&>h2:not(:first-child)]:mt-6 [&>h3]:text-[clamp(20px,5vw,24px)] [&>h3]:font-semibold [&>h3]:font-secondary [&>h3:not(:first-child)]:mt-3 [&>p:not(:first-child)]:mt-2 [&>ul>li]:relative [&>ul>li]:pl-7 [&>ul>li]:before:h-4 [&>ul>li]:before:w-4 [&>ul>li]:before:top-2.5 [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:content-[''] [&>ul>li]:before:bg-point [&>ul>li]:before:bg-no-repeat [&>ul>li]:before:bg-cover [&>ul>li>p]:mb-3">
            {parsedContent as React.ReactNode}
          </article>
        )}
      </div>
      <div className="common-box pb-0">
        <Letstalk />
      </div>
    </div>
  );
};

export default Blog;
