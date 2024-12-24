import React, { ReactNode } from 'react';

interface InfoCardItem {
  id: React.Key;
  icon: ReactNode;
  color?: string;
  title: string;
  count: number | string;
}

interface InfoCardProps {
  item: InfoCardItem;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ item, className }) => {
  const colorClasses: { [key: string]: string } = {
    'primary-green-500': 'bg-primary-green-500',
    'secondary-pink-500': 'bg-secondary-pink-500',
    'secondary-yellow-150': 'bg-secondary-yellow-150',
    'semantic-blue-500': 'bg-semantic-blue-500',
  };

  return (
    <div
      className={`w-full h-full bg-secondary-blue-500 rounded-lg flex gap-4 items-center py-[13px] px-3 ${className}`}
    >
      <span
        className={`rounded-[18px] w-[48px] h-[48px] flex items-center justify-center ${
          colorClasses[item.color || 'primary-green-500']
        }`}
      >
        {item.icon}
      </span>
      <div className="flex flex-col gap-1">
        <h6 className="text-white font-normal text-[15px] leading-normal">
          {item.title}
        </h6>
        <h4 className="text-white font-bold text-xl leading-normal">
          {item.count}
        </h4>
      </div>
    </div>
  );
};

export default InfoCard;
