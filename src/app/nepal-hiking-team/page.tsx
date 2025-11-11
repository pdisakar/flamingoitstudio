import React from 'react';
import logo from '../../../public/clients/client1.svg';
import Image from 'next/image';

const data = [
  {
    project_meta: {
      title: 'From Redesign to Results How UX Improved SEO for Halmari Tea',
      logo: logo,
      body: '<p>At Design Studio, we thrive on transforming our clients’ digital experiences. Our work with Halmari Tea is a perfect example of how a thoughtful UI/UX overhaul can do wonders for a brand’s online visibility.</p> <p>Halmari Tea, a premium tea brand from India’s Assam region, came to us with a website that was not living up to its legacy. Over a brisk 3-month timeline, our lean team – one UX designer and one SEO specialist – set out to revamp their digital presence, boost user satisfaction, SEO rankings, and conversions.</p> <p>Here’s how we turned a dated website into a modern, user-friendly powerhouse.</p>',
    },
    about_company: {
      title: 'About Halmari Tea',
      body: '<p>For 100+ years, Halmari Tea has been synonymous with premium Assam tea, crafting blends that embody freshness and tradition. As a heritage brand with a global footprint, their offerings range from robust Earl Grey teas to delicate Jasmine and Chamomile varieties. </p> <p>They cater to both bulk exporters and retail buyers. </p> <p>Yet, despite their offline reputation, their digital presence was brewing trouble.</p>',
    },
    goal_of_project: {
      title: 'The Goal of the Redesign',
      body: '<p>Halmari approached us with a clear challenge: modernize their digital presence without losing their brand’s legacy charm.</p> <p> Their website, a cluttered relic of the early 2010s, was gradually becoming a bitter cup of over-steeped Darjeeling.</p> <h3>Our mission?</h3> <p>The main goal was to brew an irresistible website experience that mirrored their tea’s sophistication, while boosting their SEO rankings. We aimed to make navigation a breeze so tea lovers could glide from homepage to check out without a hitch. Engagement was key too; we wanted visitors to linger, explore, and soak in the brand’s story. Naturally, conversions were also on the table – more clicks turning into purchases was the dream.</p><p> And then there was SEO. By weaving UX improvements into the fabric of the redesign, we planned to cut bounce rates, extend session times, and signal to search engines that this site was worth high rankings.</p>',
    },
    the_challenge: {
      title: 'The Challenges',
      body: '<p>The old site was a museum of bad habits</p> <h3>Outdated User Experience</h3> <p>Pages took a considerable number of seconds to load (almost enough time to make a cup of Halmari’s finest, ironically), and the layout resembled a crowded spice market. Navigation was a guessing game. Finding key sections like the “The Halmari Tea Collection” was challenging for users.</p> <h3>Mobile Responsiveness Issue</h3> <p>The site’s lack of responsiveness was another glaring misstep. Mobile users – over 55% of the site’s traffic – were left pinching and zooming their screens, only to abandon ship when the experience did not deliver.</p>',
    },
  },
];

const Page = () => {
  return (
    <div className="container">
      {data.map((item, index) => (
        <div
          className="common-box"
          key={index}>
          <div className="article-title">
            <h1 dangerouslySetInnerHTML={{ __html: item.project_meta.title }} />
          </div>
          <Image
            src={item.project_meta.logo}
            alt="Logo"
          />
          <article
            dangerouslySetInnerHTML={{ __html: item.project_meta.body }}
          />

          <h2>{item.about_company.title}</h2>
          <article
            dangerouslySetInnerHTML={{ __html: item.about_company.body }}
          />

          <h2>{item.goal_of_project.title}</h2>
          <article
            dangerouslySetInnerHTML={{ __html: item.goal_of_project.body }}
          />

          <h2>{item.the_challenge.title}</h2>
          <article
            dangerouslySetInnerHTML={{ __html: item.the_challenge.body }}
          />
        </div>
      ))}
    </div>
  );
};

export default Page;
