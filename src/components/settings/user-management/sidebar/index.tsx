'use client';

import { Button } from '@/components/ui/button';
import { UserHeader } from './user-header';
import { BasicDetailsSection } from './basic-details-section';
import { AddressDetailsSection } from './address-details-section';
import { Breadcrumb } from '@/components/breadcrumbs';
import { CollapsibleSection } from '@/components/layout/collapsible-section';
import { useState } from 'react';
import { useUserDetails } from '@/hooks/use-user-details';

type SectionKey = 'basicDetails' | 'addressDetails';

export function Sidebar() {
  const { details, isEditing, updateMemberDetail, handleSave, toggleEdit } =
    useUserDetails();

  const [sectionStates, setSectionStates] = useState<
    Record<SectionKey, boolean>
  >({
    basicDetails: true,
    addressDetails: true,
  });

  const sections: {
    title: string;
    key: SectionKey;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Basic details',
      key: 'basicDetails',
      content: (
        <BasicDetailsSection
          isEditing={isEditing}
          details={details}
          onUpdate={updateMemberDetail}
        />
      ),
    },
    {
      title: 'Address details',
      key: 'addressDetails',
      content: (
        <AddressDetailsSection
          isEditing={isEditing}
          details={details}
          onUpdate={updateMemberDetail}
        />
      ),
    },
  ];

  return (
    <div className="min-w-[336px] max-h-[calc(100vh-80px)] sticky left-0 top-[80px] max-w-[336px] h-auto pb-8 bg-primary-blue-500 text-white overflow-y-auto scrollbar-thin border-r-[1px] border-secondary-blue-500">
      <div className="px-8 sticky top-0 bg-primary-blue-500 py-8 z-20">
        <Breadcrumb
          items={[
            { label: 'Settings', href: '/settings/user-management' },
            { label: 'User management' },
          ]}
        />

        <h5 className="text-2xl mt-2 leading-normal font-normal mb-6">
          User details
        </h5>

        <UserHeader
          role={details.role}
          trainerNo={details.trainerNo}
          isEditing={isEditing}
          details={details}
          onUpdate={updateMemberDetail}
        />

        <Button
          className="w-full mt-6"
          variant="outline"
          onClick={isEditing ? handleSave : toggleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      {sections.map(({ title, key, content }) => (
        <CollapsibleSection
          key={key}
          title={title}
          isOpen={sectionStates[key]}
          setIsOpen={(isOpen) =>
            setSectionStates((prev) => ({ ...prev, [key]: isOpen }))
          }
        >
          <div className="px-8">{content}</div>
        </CollapsibleSection>
      ))}
    </div>
  );
}
