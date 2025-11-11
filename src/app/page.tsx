import Featurednews from '@/components/Featurednews/Featurednews';
import Herosection from '@/components/Herosection/Herosection';
import Letstalk from '@/components/Letstalk/Letstalk';
import Ourclients from '@/components/Ourclients/Ourclients';
import Ourprocess from '@/components/Ourprocess/Ourprocess';
import Ourservices from '@/components/Ourservices/Ourservices';
import Ownerwords from '@/components/Ownerwords/Ownerwords';
import Projectanalysis from '@/components/Projectanalysis/Projectanalysis';
import Testimonials from '@/components/Testimonials/Testimonials';

export default function Home() {
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

      <Featurednews />

      <section className="common-box pt-0 overflow-hidden">
        <div className="container">
          <Letstalk />
        </div>
      </section>
    </main>
  );
}
