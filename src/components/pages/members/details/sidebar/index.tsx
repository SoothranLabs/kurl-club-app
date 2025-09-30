'use client';

// import { useEffect, useState } from 'react';
// import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
// import { Breadcrumb, CollapsibleSection } from '@/components/shared/layout';
// import { Button } from '@/components/ui/button';
import { FormOptionsResponse } from '@/hooks/use-gymform-options';
import { MemberDetails } from '@/types/members';

import { BasicDetailsSection } from './basic-details-section';
import { MemberHeader } from './member-header';
import { PersonalInfoSection } from './personal-info-section';

// type SectionKey = 'basicDetails' | 'personalInfo';

export function Sidebar({
  isEditing,
  details,
  updateMemberDetail,
  // handleSave,
  // toggleEdit,
  formOptions,
}: {
  memberId: string;
  isEditing: boolean;
  toggleEdit: () => void;
  details: MemberDetails | null;
  handleSave: () => void;
  updateMemberDetail: <K extends keyof MemberDetails>(
    key: K,
    value: MemberDetails[K]
  ) => void;
  formOptions?: FormOptionsResponse | null;
}) {
  // const [sectionStates, setSectionStates] = useState<
  //   Record<SectionKey, boolean>
  // >({
  //   basicDetails: true,
  //   personalInfo: true,
  // });
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // useEffect(() => {
  //   setSidebarOpen(isEditing);
  // }, [isEditing]);

  // const sections = [
  //   {
  //     title: 'Membership & Fitness',
  //     key: 'basicDetails' as SectionKey,
  //     content: (
  //       <BasicDetailsSection
  //         isEditing={isEditing}
  //         details={details}
  //         onUpdate={updateMemberDetail}
  //         formOptions={formOptions || undefined}
  //       />
  //     ),
  //   },
  //   {
  //     title: 'Personal Info',
  //     key: 'personalInfo' as SectionKey,
  //     content: (
  //       <PersonalInfoSection
  //         isEditing={isEditing}
  //         details={details}
  //         onUpdate={updateMemberDetail}
  //       />
  //     ),
  //   },
  // ];

  return (
    // <>
    //   <Button
    //     onClick={() => setSidebarOpen(true)}
    //     className="p-3 ml-2 mt-2 sticky top-[62px] md:hidden"
    //   >
    //     <PanelLeftOpen />
    //   </Button>
    <div className={`w-full bg-primary-blue-500 text-white`}>
      {/* <div className="bg-primary-blue-500 flex items-start justify-between"> */}
      {/* <div className=""> */}
      {/* <Breadcrumb
              items={[
                { label: 'Members', href: '/members' },
                { label: 'Member details' },
              ]}
            /> */}

      {/* <h5 className="text-2xl mt-2 leading-normal font-normal mb-6">
              Member details
            </h5> */}

      <MemberHeader
        isEditing={isEditing}
        details={details}
        onUpdate={updateMemberDetail}
      />
      {/* </div> */}
      {/* <div className="flex items-center gap-2 md:hidden">
            {isEditing ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <Button onClick={toggleEdit} className="h-10" variant="outline">
                Edit
              </Button>
            )}
            <Button onClick={() => setSidebarOpen(false)} className="p-3">
              <PanelRightOpen />
            </Button>
          </div> */}
      {/* </div> */}
      <div className="flex gap-4">
        <div className="bg-secondary-blue-500 rounded-lg mt-4 items-start w-full justify-between p-5">
          <span className="tracking-tight text-white text-base font-normal leading-normal mb-3 block">
            Membership & Fitness
          </span>
          <BasicDetailsSection
            isEditing={isEditing}
            details={details}
            onUpdate={updateMemberDetail}
            formOptions={formOptions || undefined}
          />
        </div>
        <div className="bg-secondary-blue-500 rounded-lg mt-4 w-full items-start justify-between p-5">
          <span className="tracking-tight text-white text-base font-normal leading-normal mb-3 block">
            Personal Info
          </span>
          <PersonalInfoSection
            isEditing={isEditing}
            details={details}
            onUpdate={updateMemberDetail}
          />
        </div>
        {/* {sections.map(({ title, key, content }) => (
          <CollapsibleSection
            key={key}
            title={title}
            isOpen={sectionStates[key]}
            setIsOpen={(isOpen) =>
              setSectionStates((prev) => ({ ...prev, [key]: isOpen }))
            }
          >
            <div>{content}</div>
          </CollapsibleSection>
        ))} */}
      </div>
    </div>
    // </>
  );
}
