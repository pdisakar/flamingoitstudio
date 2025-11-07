import Accordion from '../Accordion/Accordion';
import TestimonialsCard from '../Cards/TestimonialsCard/TestimonialsCard';
import client1 from '../../../public/clients/client1.svg';
import client2 from '../../../public/clients/client2.svg';
import client3 from '../../../public/clients/client3.png';

const items = [
  {
    id: 1,
    author: 'Kakashi1',
    position: 'Founder',
    body: "They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I'd highly recommend working with her!",
    img: client1,
  },
  {
    id: 2,
    author: 'Naruto2',
    position: 'CEO',
    body: "They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I'd highly recommend working with her!",
    img: client2,
  },
  {
    id: 3,
    author: 'Sasuke3',
    position: 'CTO',
    body: "They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I'd highly recommend working with her!",
    img: client3,
  },
  {
    id: 4,
    author: 'Sakura4',
    position: 'Designer',
    body: "They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I'd highly recommend working with her!",
    img: client1,
  },
  {
    id: 5,
    author: 'Hinata5',
    position: 'Marketing',
    body: "They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I'd highly recommend working with her!",
    img: client2,
  },
  {
    id: 6,
    author: 'Rock Lee6',
    position: 'Engineer',
    body: "They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I'd highly recommend working with her!",
    img: client3,
  },
];

const Testimonials = () => {
  return (
    <section className="common-box pt-0">
      <div className="container mx-auto px-4">
        <div className="home-title max-w-[895.59px]">
          <h2>Partners in Success</h2>
        </div>
        <Accordion>
          {items.map(item => (
            <TestimonialsCard
              key={item.id}
              img={item.img}
              author={item.author}
              position={item.position}
              body={item.body}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Testimonials;
