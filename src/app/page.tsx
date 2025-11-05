import Herosection from '@/components/Herosection/Herosection';
import Ourclients from '@/components/Ourclients/Ourclients';
import Ourprocess from '@/components/Ourprocess/Ourprocess';
import Ourservices from '@/components/Ourservices/Ourservices';
import Ownerwords from '@/components/Ownerwords/Ownerwords';
import Projectanalysis from '@/components/Projectanalysis/Projectanalysis';

export default function Home() {
  return (
    <main>
      <Herosection />
      <Ownerwords />
      <Ourclients />
      <Ourservices />
      <Projectanalysis />
      <Ourprocess />
    </main>
  );
}
