'use client';
import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  items: { title: string; slug: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const breadcrumbItems = [{ title: 'Home', slug: '' }, ...(items || [])];

  return (
    <nav
      className=""
      aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <span key={index}>
          <Link
            href={`/${item.slug}`}
            className="hover:underline">
            {item.title}
          </Link>
          {index < breadcrumbItems.length - 1 && (
            <span className="mx-2">»</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
