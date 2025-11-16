'use client';

import { useEffect, useState, useMemo } from 'react';
import { PRODUCTION_SERVER, SITE_KEY } from '@/lib/constants';
import Blogcard from '@/components/Cards/Blogcard/Blogcard';

export default function BlogList({ data }: { data: any }) {
  const [posts, setPosts] = useState<any[]>(data.listcontent);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [checkboxes, setCheckboxes] = useState(
    data.blog_categories.map((cat: any) => ({
      slug: cat.urlinfo.url_slug,
      checked: false,
    }))
  );

  const categories = useMemo(
    () => checkboxes.filter((c: any) => c.checked).map((c: any) => c.slug),
    [checkboxes]   
  );

  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      const start = reset ? 0 : posts.length;
      const limit = reset ? 12 : 6;

      const res = await fetch(
        `${PRODUCTION_SERVER}/allblogs?_start=${start}&_limit=${limit}&_categories="${categories.join(
          ','
        )}"`,
        {
          headers: {
            'Content-Type': 'application/json',
            sitekey: SITE_KEY,
          },
        }
      );

      const json = await res.json();
      const newPosts = json.data.content || [];

      setPosts(reset ? newPosts : [...posts, ...newPosts]);
      setHasMore(newPosts.length > 0);
    } catch (err) {
      console.error('Error fetching posts:', err);
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
      <ul className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {posts.map((post: any, idx: number) => (
          <li key={idx}>
            <Blogcard blogData={post} />
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div className="mt-6 text-center">
          <button
            className="btn text-base font-bold rounded-lg px-5 py-2.5 btn-primary"
            onClick={() => fetchPosts(false)}
            disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      ) : (
        <div className="text-center py-4 text-headings">
          <p>No more posts to load.</p>
        </div>
      )}
    </div>
  );
}
