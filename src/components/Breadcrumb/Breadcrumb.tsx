import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  items: { title: string; slug: string }[];
}

const formatSlug = (slug: string) => {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const breadcrumbItems = [{ title: 'Home', slug: '/' }, ...(items || [])];

  

  return (
    <nav
      className="text-base mb-4"
      aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isHome = index === 0;

        return (
          <span key={index}>
            <Link
              href={item.slug}
              className="text-white hover:text-primary hover:underline">
              {isHome ? item.title : formatSlug(item.slug)}
            </Link>
            {index < breadcrumbItems.length - 1 && (
              <span className="mx-2">»</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
