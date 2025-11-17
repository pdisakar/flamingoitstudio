'use client';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Image from 'next/image';
import { IMAGE_URL } from '@/lib/constants';
import { useEffect, useState } from 'react';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from 'html-react-parser';
import { DOMNode } from 'htmlparser2';
import { BlogBySlugData, BlogPageData } from '@/types/types';

interface TOCItem {
  id: string;
  text: string;
  index: number | string;
  children: TOCItem[];
}

interface BlogProps {
  data: BlogPageData | BlogBySlugData;
}

const Blog = ({ data }: BlogProps) => {
  const blogdata = data.content;

  const Breadcrumbdata = [
    {
      title: blogdata.title,
      slug: `${blogdata.urlinfo.url_slug}`,
    },
  ];

  const [parsedContent, setParsedContent] = useState<DOMNode[] | string | null>(
    null
  );
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (!blogdata?.content) return;

    const tempToc: TOCItem[] = [];
    let h2Count = 0;

    const getPlainTextFromChildren = (children: DOMNode[]): string => {
      return children
        .map(child => {
          if ('type' in child && child.type === 'text') {
            return 'data' in child ? ((child as { data?: string }).data ?? '') : '';
          }
          if ('children' in child && child.children) {
            return getPlainTextFromChildren(child.children as DOMNode[]);
          }
          return '';
        })
        .join('');
    };

    const options: HTMLReactParserOptions = {
      replace: (domNode: DOMNode) => {
        if (domNode.type === 'tag') {
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
                <h3 id={id}>
                  {domToReact(node.children as DOMNode[], options)}
                </h3>
              );
            }
          }
        }
      },
    };

    const contentWithIds = parse(blogdata.content, options);
    setParsedContent(contentWithIds);
    setToc(tempToc);
  }, [blogdata?.content]);

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

      {/* Table of Contents */}
      {toc.length > 0 && (
        <nav>
          <h2>Table of Contents</h2>
          <ul>
            {toc.map(h2 => (
              <li key={h2.id}>
                <a
                  href={`#${h2.id}`}
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById(h2.id)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}>
                  {h2.index}. {h2.text}
                </a>
                {h2.children.length > 0 && (
                  <ul>
                    {h2.children.map(h3 => (
                      <li key={h3.id}>
                        <a
                          href={`#${h3.id}`}
                          onClick={e => {
                            e.preventDefault();
                            document.getElementById(h3.id)?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            });
                          }}>
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

      {/* Article content */}
      {parsedContent && (
        <article
          className="[&>h2]:text-[clamp(28px,5vw,32px)] [&>h2]:leading-[1.3] [&>h2]:font-semibold [&>h2]:font-secondary [&>h2:not(:first-child)]:mt-6 [&>h3]:text-[clamp(20px,5vw,24px)] [&>h3]:font-semibold [&>h3]:font-secondary [&>h3:not(:first-child)]:mt-3 [&>p:not(:first-child)]:mt-2
          [&>ul>li]:relative [&>ul>li]:pl-7 [&>ul>li]:before:h-4 [&>ul>li]:before:w-4 [&>ul>li]:before:top-2.5 [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:content-[''] [&>ul>li]:before:bg-point [&>ul>li]:before:bg-no-repeat [&>ul>li]:before:bg-cover [&>ul>li>p]:mb-3">
          {parsedContent}
        </article>
      )}
    </div>
  );
};

export default Blog;
