'use client';

import Accordion from '../Accordion/Accordion';
import StatisticsCard from '../Cards/StatisticsCard/StatisticsCard';

const staticsdata = [
  {
    id: 1,
    title: 'Projects',
    body: '250+',
  },
  {
    id: 2,
    title: 'Team',
    body: '100+',
  },
  {
    id: 3,
    title: 'EXPERIENCE',
    body: '11+ YEARS',
  },
  {
    id: 4,
    title: 'Repeat Clients',
    body: '86%',
  },
  {
    id: 5,
    title: 'Uptime Guarante:',
    body: '86%',
  },
];

const Statistics = () => {
  return (
    <Accordion>
      {staticsdata.map(item => (
        <StatisticsCard
          key={item.id}
          title={item.title}
          body={item.body}
        />
      ))}
    </Accordion>
  );
};

export default Statistics;
