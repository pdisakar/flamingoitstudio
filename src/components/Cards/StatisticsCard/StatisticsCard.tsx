interface StatisticsCardProps {
  title: string;
  body: string;
}

const StatisticsCard = ({ title, body }: StatisticsCardProps) => {
  return (
    <div className="bg-white/10 md:border-l border-white/15 p-10 lg:p-10 xl:p-20 h-full">
      <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
        {body}
      </span>
      <h3 className="mt-4 text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );
};

export default StatisticsCard;
