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
      <Ownerwords />
      <Ourclients />
      <Ourservices />
      <Projectanalysis />
      <Ourprocess />
      <Testimonials />
      <Featurednews />
      <Letstalk />
    </main>
  );
}

