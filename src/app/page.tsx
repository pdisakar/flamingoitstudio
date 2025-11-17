import Featurednews from '@/components/Featurednews/Featurednews';
import Herosection from '@/components/Herosection/Herosection';
import Letstalk from '@/components/Letstalk/Letstalk';
import Ourclients from '@/components/Ourclients/Ourclients';
import Ourprocess from '@/components/Ourprocess/Ourprocess';
import Ourservices from '@/components/Ourservices/Ourservices';
import Ownerwords from '@/components/Ownerwords/Ownerwords';
import Projectanalysis from '@/components/Projectanalysis/Projectanalysis';
import Testimonials from '@/components/Testimonials/Testimonials';

import { getHomeData, getStaticRoutes } from '@/services/network_requests';
import type { BlogPost } from '@/types/types';

export async function generateStaticParams() {
  const data = await getStaticRoutes();

  if (!Array.isArray(data)) {
    return [];
  }

  const excludedSlugs = ['blog', 'contact-us', 'who-we-are'];

  return data
    .filter(({ slug }) => !excludedSlugs.includes(slug))
    .map(({ slug }) => ({ slug }));
}

export default async function Home() {
  const [homeData] = await Promise.all([getHomeData()]);

  const featuredblog: BlogPost[] =
    homeData && 'featured_blogs' in homeData ? homeData.featured_blogs : [];

  return (
    <main>
      <Herosection />
      <section className="common-box pt-0">
        <div className="container">
          <Ownerwords />
        </div>
      </section>
      <section className="common-box">
        <div className="container">
          <Ourclients />
        </div>
      </section>
      <section className="common-box pt-0">
        <div className="container">
          <Ourservices />
        </div>
      </section>
      <section className="common-box pt-0">
        <div className="container">
          <Projectanalysis />
        </div>
      </section>
      <section className="common-box pt-0 overflow-hidden">
        <div className="container">
          <Ourprocess />
        </div>
      </section>

      <section className="common-box pt-0 overflow-hidden">
        <div className="container">
          <Testimonials />
        </div>
      </section>
      <section className="common-box pt-0 overflow-hidden">
        <div className="container">
          <Featurednews data={featuredblog} />
        </div>
      </section>

      <section className="common-box pt-0 overflow-hidden">
        <div className="container">
          <Letstalk />
        </div>
      </section>
    </main>
  );
}
