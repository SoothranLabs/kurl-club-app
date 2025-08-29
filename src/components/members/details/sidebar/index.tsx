'use client';

import { useState } from 'react';

import { MemberDetails } from '@/types/members';
import { Breadcrumb } from '@/components/breadcrumbs';
import { CollapsibleSection } from '@/components/layout/collapsible-section';
import { MemberHeader } from './member-header';
import { BasicDetailsSection } from './basic-details-section';
import { PersonalInfoSection } from './personal-info-section';

type SectionKey = 'basicDetails' | 'personalInfo';

export function Sidebar({
  isEditing,
  details,
  updateMemberDetail,
}: {
  memberId: string;
  isEditing: boolean;
  details: MemberDetails | null;
  updateMemberDetail: <K extends keyof MemberDetails>(
    key: K,
    value: MemberDetails[K]
  ) => void;
}) {
  const [sectionStates, setSectionStates] = useState<
    Record<SectionKey, boolean>
  >({
    basicDetails: true,
    personalInfo: true,
  });

  const sections = [
    {
      title: 'Membership & Fitness',
      key: 'basicDetails' as SectionKey,
      content: (
        <BasicDetailsSection
          isEditing={isEditing}
          details={details}
          onUpdate={updateMemberDetail}
        />
      ),
    },
    {
      title: 'Personal Info',
      key: 'personalInfo' as SectionKey,
      content: (
        <PersonalInfoSection
          isEditing={isEditing}
          details={details}
          onUpdate={updateMemberDetail}
        />
      ),
    },
  ];

  return (
    <div className="min-w-[336px] max-h-[calc(100vh-80px)] sticky left-0 top-[80px] max-w-[336px] h-auto pb-8 bg-primary-blue-500 text-white overflow-y-auto scrollbar-thin border-r border-secondary-blue-500">
      <div className="px-8 sticky top-0 bg-primary-blue-500 py-8 z-20">
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
          isEditing={isEditing}
          details={details}
          onUpdate={updateMemberDetail}
        />
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
