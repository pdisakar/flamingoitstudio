'use client';

import { useEffect, useState, useMemo } from 'react';
import { PRODUCTION_SERVER, SITE_KEY } from '@/lib/constants';
import Blogcard from '@/components/Cards/Blogcard/Blogcard';

export default function BlogList({ data }: { data: any }) {
  const [posts, setPosts] = useState<any[]>(data.listcontent);
  const [categoryLimit, setCategoryLimit] = useState<number>(9);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize checkboxes state
  const [checkboxes, setCheckboxes] = useState<any[]>(
    data.blog_categories.map((itm: any) => ({
      value: itm.urlinfo.url_slug,
      label: itm.title,
      id: itm.id,
      checked: false,
      slug: itm.urlinfo.url_slug,
    }))
  );

  // Derive selected categories from checkboxes
  const categories = useMemo(
    () => checkboxes.filter((itm: any) => itm.checked).map((a: any) => a.slug),
    [checkboxes]
  );

  const fetchPosts = async (reset: boolean = false) => {
    try {
      setLoading(true);
      const start = reset ? 0 : posts.length;
      const limit = reset ? 12 : 6;

      const response = await fetch(
        `${PRODUCTION_SERVER}/allblogs?_start=${start}&_limit=${limit}&_categories="${categories.join(
          ','
        )}"`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            sitekey: SITE_KEY,
          },
        }
      );
      const data = await response.json();
      const newPosts = data.data.content;
      setPosts(prevPosts => (reset ? newPosts : [...prevPosts, ...newPosts]));
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, [categories]);

  return (
    <div className="container common-box pt-0">
      <div className="blog-list">
        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {posts.map((itm: any, idx: number) => (
            <li
              className="col-lg-4 col-md-6"
              key={idx}>
              <Blogcard blogData={itm} />
            </li>
          ))}
        </ul>
        {hasMore && (
          <div className="load-more load-more-btn mt-6">
            <button
              type="button"
              className="btn text-base border-0 font-bold rounded-lg px-5 py-2.5 block btn-primary"
              onClick={() => fetchPosts(false)}
              disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-4 text-headings">
            <p>No more posts to load.</p>
          </div>
        )}
      </div>
    </div>
  );
}
