import { ClientsRotator } from '../Motionanimations/Motionanimations';

import client1 from '../../../public/clients/client1.svg';
import client2 from '../../../public/clients/client2.svg';
import client3 from '../../../public/clients/client3.png';
import client4 from '../../../public/clients/client4.svg';
import client5 from '../../../public/clients/client5.png';
import client6 from '../../../public/clients/client6.png';
import client7 from '../../../public/clients/client3.png';
import client8 from '../../../public/clients/client1.svg';

const clients = [
  { id: 1, img: client1, alt: 'Client 1' },
  { id: 2, img: client2, alt: 'Client 2' },
  { id: 3, img: client3, alt: 'Client 3' },
  { id: 4, img: client4, alt: 'Client 4' },
  { id: 5, img: client5, alt: 'Client 5' },
  { id: 6, img: client6, alt: 'Client 6' },
  { id: 7, img: client7, alt: 'Client 6' },
  { id: 8, img: client8, alt: 'Client 6' },
];

const OurClients = () => {
  return (
    <section className="common-box">
      <div className="container">
        <div className="overflow-x-auto custom-scroller-y">
          <ClientsRotator clients={clients} />
        </div>
      </div>
    </section>
  );
};

export default OurClients;
