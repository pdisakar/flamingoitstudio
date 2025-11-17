import Link from 'next/link';
import Blogcard from '../Cards/Blogcard/Blogcard';

const Featurednews = ({ data }: { data: any[] }) => {
  return (
    <section className="common-box pt-0">
      <div className="container mx-auto px-4">
        <div className="home-title flex items-end justify-between ">
          <h2 className=" max-w-[895.59px]">News and Insights</h2>
          <Link
            href="#"
            className="group flex items-center gap-3 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-full pl-6 pr-2 py-2 text-base w-fit">
            Read Now
            <div className="action-btn h-10 w-10 bg-primary/20 flex items-center group-hover:bg-white/20 justify-center rounded-full">
              <svg
                width={16}
                height={16}
                className="transition duration-300 group-hover:-rotate-45"
                fill="currentColor">
                <use xlinkHref="/icons.svg#arrow45" />
              </svg>
            </div>
          </Link>
        </div>
        <div className="featured blog">
          <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <li key={index}>
                <Blogcard blogData={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Featurednews;
