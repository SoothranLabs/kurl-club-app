import PackageCard from '@/components/cards/package-card';
import React from 'react';

function Contents() {
  const packageData = [
    {
      package: 'Monthly plan',
      price: '3000',
      benefits: [
        'Frequency: 3-4 times a week',
        'Classes: Access to group classes (e.g., Yoga, Pilates, Zumba)',
        'Personal Training: 1 personal training session included per month',
        'Facilities: Full access to gym equipment, cardio area, and locker rooms',
        'Customization: Basic workout plan tailored to fitness goals',
        'Add-Ons: Discounted rates for additional personal training sessions',
      ],
    },
    {
      package: 'Monthly plan',
      price: '3000',
      benefits: [
        'Frequency: 3-4 times a week',
        'Classes: Access to group classes (e.g., Yoga, Pilates, Zumba)',
        'Personal Training: 1 personal training session included per month',
        'Facilities: Full access to gym equipment, cardio area, and locker rooms',
        'Customization: Basic workout plan tailored to fitness goals',
        'Add-Ons: Discounted rates for additional personal training sessions',
      ],
    },
    {
      package: 'Monthly plan',
      price: '3000',
      benefits: [
        'Frequency: 3-4 times a week',
        'Classes: Access to group classes (e.g., Yoga, Pilates, Zumba)',
        'Personal Training: 1 personal training session included per month',
        'Facilities: Full access to gym equipment, cardio area, and locker rooms',
        'Customization: Basic workout plan tailored to fitness goals',
        'Add-Ons: Discounted rates for additional personal training sessions',
      ],
    },
  ];

  return (
    <div
      className="mt-8 grid gap-4"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(336px, 1fr))' }}
    >
      {packageData.map((data, index) => (
        <PackageCard key={index} data={data} />
      ))}
    </div>
  );
}

export default Contents;
