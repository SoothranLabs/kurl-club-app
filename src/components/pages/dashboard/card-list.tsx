import React from 'react';

import { IndianRupee, Users } from 'lucide-react';

import InfoCard from '../../shared/cards/info-card';
import { KDumbbell, KSkipper } from '../../shared/icons/index';

function CardList() {
  const cards = [
    {
      id: 1,
      icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
      color: 'primary-green-500',
      title: 'Active members',
      count: 190,
    },
    {
      id: 2,
      icon: <IndianRupee size={20} strokeWidth={1.75} color="#151821" />,
      color: 'secondary-pink-500',
      title: 'Outstanding payments',
      count: 30,
    },
    {
      id: 3,
      icon: <KSkipper />,
      color: 'secondary-yellow-150',
      title: 'Skippers',
      count: 12,
    },
    {
      id: 4,
      icon: <KDumbbell />,
      color: 'semantic-blue-500',
      title: 'New Signups',
      count: 0,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[74px] mt-8">
      {cards.map((item) => (
        <InfoCard item={item} key={item.id} />
      ))}
    </div>
  );
}

export default CardList;
