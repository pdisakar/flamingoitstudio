'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from 'react';

// Hero section background animations
export const HeroLeftBackground = () => {
  return (
    <motion.div
      className="absolute h-[500px] w-[900px] left-0 bottom-[50px] bg-hero-bg-2 bg-no-repeat bg-contain -z-10"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 1 }}
    />
  );
};

export const HeroRightBackground = () => {
  return (
    <motion.div
      className="absolute h-[400px] w-[200px] -right-5 top-0 bg-hero-bg bg-no-repeat bg-contain -z-10"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 1 }}
    />
  );
};

// Hero section tech item with hover animation
interface HeroTechItemProps {
  name: string;
  icon: string;
}

export const HeroTechItem = ({ name, icon }: HeroTechItemProps) => {
  return (
    <motion.li
      key={name}
      className="tech-item relative w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-full border-2 border-white"
      whileHover="hover"
      initial="rest"
      variants={{ rest: {} }}>
      <motion.svg
        width={36}
        height={36}
        fill="currentColor"
        className="tech-icon"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1 },
        }}
        transition={{ duration: 0.3 }}>
        <use xlinkHref={`/icons.svg#${icon}`} />
      </motion.svg>

      <motion.span
        className="tech-name absolute whitespace-nowrap px-2 py-1 rounded-md"
        variants={{
          rest: { opacity: 0, y: 10, pointerEvents: 'none' },
          hover: { opacity: 1, y: 0, pointerEvents: 'auto' },
        }}
        transition={{ duration: 0.3 }}
        style={{ top: '100%' }}>
        {name}
      </motion.span>
    </motion.li>
  );
};

// Owner words line-by-line reveal animation
interface OwnerWordsLinesProps {
  lines: string[];
  className?: string;
}

const ownerWordLineVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  }),
};

export const OwnerWordsLines = ({ lines, className }: OwnerWordsLinesProps) => {
  return (
    <div className={className ?? ''}>
      {lines.map((text, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          variants={ownerWordLineVariants}
          whileInView={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          viewport={{ once: false, margin: '-15% 0px -15% 0px' }}
          className="opacity-40 will-change-auto">
          {text}
        </motion.div>
      ))}
    </div>
  );
};

// Our Clients animated rotator
interface ClientItem {
  id: number | string;
  img: any;
  alt: string;
}

interface ClientsRotatorProps {
  clients: ClientItem[];
}

export const ClientsRotator = ({ clients }: ClientsRotatorProps) => {
  const [displayed, setDisplayed] = useState<ClientItem[]>(clients.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % clients.length);

      setDisplayed(prev => {
        const updated = [...prev];
        const nextItemIndex = (currentIndex + 4) % clients.length;
        const replaceIndex = currentIndex % 4;
        updated[replaceIndex] = clients[nextItemIndex];
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [clients, currentIndex]);

  return (
    <ul className="flex items-center justify-between gap-10 min-w-max">
      {displayed.map((client, i) => (
        <li
          key={`${client.id}-${i}`}
          className="relative h-20 w-[210px] overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={client.id}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center">
              <Image
                src={client.img}
                alt={client.alt}
                fill
                className="object-contain"
                sizes="(max-width:768px) 140px, 210px"
              />
            </motion.div>
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

interface OurServiceImageItem {
  id: number;
  title: string;
}
interface OurServiceFaqItem {
  id: number;
  question: string;
  answer: string;
}

interface OurServicesClientProps {
  images: OurServiceImageItem[];
  faqs: OurServiceFaqItem[];
}

interface OurServicesContextValue {
  images: OurServiceImageItem[];
  faqs: OurServiceFaqItem[];
  activeId: number;
  setActiveId: (id: number) => void;
}

const OurServicesContext = createContext<OurServicesContextValue | null>(null);

interface OurServicesProviderProps extends OurServicesClientProps {
  children: ReactNode;
}

export const OurServicesProvider = ({
  images,
  faqs,
  children,
}: OurServicesProviderProps) => {
  const [activeId, setActiveId] = useState<number>(1);
  return (
    <OurServicesContext.Provider
      value={{ images, faqs, activeId, setActiveId }}>
      {children}
    </OurServicesContext.Provider>
  );
};

export const OurServicesImage = () => {
  const ctx = useContext(OurServicesContext);
  if (!ctx) return null;
  const { images, activeId } = ctx;
  const currentImage = images.find(img => img.id === activeId) || images[0];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentImage.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="w-80 h-80 md:w-[380px] md:h-[380px] hidden md:block">
        <svg
          width="100%"
          height="100%"
          fill="currentColor">
          <use xlinkHref={`/icons.svg#${currentImage.title}`} />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
};

export const OurServicesFaqs = () => {
  const ctx = useContext(OurServicesContext);
  if (!ctx) return null;
  const { faqs, activeId, setActiveId } = ctx;

  const toggle = (id: number) => setActiveId(id);

  return (
    <>
      {faqs.map(({ id, question, answer }) => (
        <div
          key={id}
          className="group cursor-pointer pb-8">
          <div
            className="flex justify-between items-center"
            onClick={() => toggle(id)}>
            <span
              className={`text-lg font-medium transition-colors text-[28px] lg:text-[56px] leading-[100%] ${
                activeId === id ? 'text-primary' : 'text-body/90'
              }`}>
              {question}
            </span>
          </div>

          <AnimatePresence>
            {activeId === id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden">
                <p className="mt-3 opacity-90 text-xl border-b border-white pb-4 leading-[1.6]">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

// Project Analysis animations
interface ProjectAnalysisImageProps {
  image: any;
  alt: string;
  keyValue: number | string;
  className?: string;
}

export const ProjectAnalysisDesktopImage = ({
  image,
  alt,
  keyValue,
  className,
}: ProjectAnalysisImageProps) => {
  return (
    <motion.div
      key={keyValue}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${className} relative`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
      />
    </motion.div>
  );
};

export const ProjectAnalysisMobileImage = ({
  image,
  alt,
  className,
}: Omit<ProjectAnalysisImageProps, 'keyValue'>) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={className}>
      <Image
        src={image}
        alt={alt}
        className="rounded-xl w-full object-cover mb-5"
        width={800}
        height={600}
        sizes="100vw"
      />
    </motion.div>
  );
};
