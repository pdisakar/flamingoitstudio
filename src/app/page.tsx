import Herosection from '@/components/Herosection/Herosection';
import Ourclients from '@/components/Ourclients/Ourclients';
import Ourservices from '@/components/Ourservices/Ourservices';
import Ownerwords from '@/components/Ownerwords/Ownerwords';

export default function Home() {
  return (
    <main>
      <Herosection />
      <Ownerwords />
      <Ourclients />
      <Ourservices />
    </main>
  );
}
