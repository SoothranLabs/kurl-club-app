'use client';

import { Button } from '@/components/ui/button';
import { MemberHeader } from './member-header';
import { BasicDetailsSection } from './basic-details-section';
import { AddressDetailsSection } from './address-details-section';
import { useMemberDetails } from '@/hooks/use-member-details';
import { Breadcrumb } from '@/components/breadcrumbs';
import { CollapsibleSection } from '@/components/layout/collapsible-section';
import { useState } from 'react';

type SectionKey = 'basicDetails' | 'addressDetails';

export function Sidebar() {
  const { details, isEditing, updateMemberDetail, handleSave, toggleEdit } =
    useMemberDetails();

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
    <div className="w-[336px] h-screen pb-8 bg-primary-blue-500 text-white overflow-y-auto border-r-[1px] border-secondary-blue-500">
      <div className="px-8 sticky top-0 bg-primary-blue-500 pt-8 z-20">
        <Breadcrumb
          items={[
            { label: 'Members', href: '/members' },
            { label: 'Member details' },
          ]}
        />

        <h5 className="text-2xl mt-2 leading-normal font-normal mb-6">
          Member details
        </h5>

        <MemberHeader
          name={details.name}
          memberSince={details.memberSince}
          gymNo={details.gymNo}
        />

        <Button
          className="w-full mb-6"
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
