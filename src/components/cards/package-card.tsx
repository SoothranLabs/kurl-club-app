import { EllipsisVertical } from 'lucide-react';
import React from 'react';

interface PackageCardProps {
  data: {
    package: string;
    price: string;
    benefits: string[];
  };
  key: number;
}

function PackageCard({ data, key }: PackageCardProps) {
  return (
    <div key={key} className="border-primary-blue-300 border rounded-lg">
      {/* header */}
      <div className="p-5 flex flex-col gap-4 rounded-tl-[8px] rounded-tr-[8px] bg-secondary-blue-500">
        <div className="flex items-center justify-between">
          <h5 className="text-white font-medium text-2xl leading-normal">
            {data.package}
          </h5>
          <button className="w-6 h-6">
            <EllipsisVertical className="h-5" />
          </button>
        </div>
        <h6 className="text-primary-green-200 font-medium text-[32px] leading-normal">
          ₹{new Intl.NumberFormat('en-IN').format(Number(data.price))}
        </h6>
      </div>
      {/* contents */}
      <div className="p-5 pt-6">
        <ul className="flex flex-col gap-5">
          {data.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="min-w-[10px] min-h-[10px] max-h-[10px] max-w-[10px] rounded-full border-2 border-primary-green-100 mt-[3px]" />
              <p className="text-white text-sm font-medium leading-[130%]">
                {benefit}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PackageCard;
