'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMemberDetails } from '@/components/members/sidebar/sidebar-context';
import { CollapsibleSection } from '@/components/Collapsible';
import { EditableField } from '@/components/Editable';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/breadcrumb';

export function Sidebar() {
  const { memberDetails, setMemberDetails, isEditing, setIsEditing } =
    useMemberDetails();
  const [isBasicDetailsOpen, setIsBasicDetailsOpen] = useState(true);
  const [isAddressDetailsOpen, setIsAddressDetailsOpen] = useState(true);

  const fields = [
    // Basic Details
    { section: 'Basic details', label: 'Email', name: 'email', type: 'text' },
    {
      section: 'Basic details',
      label: 'Mobile',
      name: 'mobile',
      type: 'phone',
    },
    { section: 'Basic details', label: 'DOB', name: 'dob', type: 'datePicker' },
    {
      section: 'Basic details',
      label: 'Height',
      name: 'height',
      type: 'text',
    },
    {
      section: 'Basic details',
      label: 'Weight',
      name: 'weight',
      type: 'text',
    },
    {
      section: 'Basic details',
      label: 'Workout plan',
      name: 'workOutPlan',
      type: 'dropdown',
      options: ['Weight loss', 'Weight gain'],
    },
    {
      section: 'Basic details',
      label: 'Assigned to',
      name: 'assignedTo',
      type: 'dropdown',
      options: ['Hafiz', 'Prasoon', 'Vicky'],
    },
    {
      section: 'Basic details',
      label: 'Blood Group',
      name: 'bloodGroup',
      type: 'dropdown',
      options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },

    // Address Details
    {
      section: 'Address details',
      label: 'Address',
      name: 'address',
      type: 'textArea',
    },
    { section: 'Address details', label: 'PIN', name: 'pin', type: 'text' },
  ];

  const groupedFields = fields.reduce(
    (acc, field) => {
      if (!acc[field.section]) {
        acc[field.section] = [];
      }
      acc[field.section].push(field);
      return acc;
    },
    {} as Record<string, typeof fields>
  );

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setMemberDetails((prev) => ({ ...prev, [name]: value }));
  };

  console.log(fields);

  return (
    <div className="w-[336px] h-screen py-8 bg-primary-blue-500 text-white overflow-y-auto border-r-[1px] border-secondary-blue-500">
      <div className="px-8">
        <Breadcrumb
          items={[
            { label: 'Members', href: '/members' },
            { label: 'Member details' },
          ]}
        />

        {/* Header */}
        <h5 className="text-2xl mt-2 leading-normal font-normal mb-6">
          Member details
        </h5>

        {/* Profile Summary */}
        <div className="items-center mb-4">
          <div className="w-16 h-16 bg-secondary-blue-500 rounded-full flex items-center justify-center text-xl font-normal text-neutral-green-300 mr-4 mb-3">
            {memberDetails.name
              .split(' ')
              .map((part) => part[0])
              .join('')}
          </div>
          <div>
            <h6 className="text-xl font-medium text-white">
              {memberDetails.name}
            </h6>
            <p className="text-sm text-primary-blue-50 mt-1">
              Member since {memberDetails.memberSince}
            </p>
          </div>
        </div>

        {/* Gym Number */}
        <Badge className="bg-neutral-ochre-500 flex items-center w-fit justify-center text-sm rounded-full h-[30px] py-[8.5px] px-4 mb-8 border border-neutral-ochre-800 bg-opacity-10">
          Gym no: #{memberDetails.gymNo}
        </Badge>

        {/* Edit Button */}
        <Button
          className="w-full mb-6"
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      {/* Collapse Sections */}
      {Object.entries(groupedFields).map(([sectionTitle, sectionFields]) => (
        <CollapsibleSection
          key={sectionTitle}
          title={sectionTitle}
          isOpen={
            sectionTitle === 'Basic details'
              ? isBasicDetailsOpen
              : isAddressDetailsOpen
          }
          setIsOpen={
            sectionTitle === 'Basic details'
              ? setIsBasicDetailsOpen
              : setIsAddressDetailsOpen
          }
          className={
            sectionTitle === 'Address details' && !isBasicDetailsOpen
              ? 'border-t-0'
              : ''
          }
        >
          {sectionFields.map((field) => (
            <EditableField
              key={field.name}
              label={field.label}
              name={field.name}
              value={memberDetails[field.name as keyof typeof memberDetails]}
              onChange={handleInputChange}
              isEditing={isEditing}
              className="py-3 flex flex-col gap-2"
              type={field.type}
              options={field.options}
            />
          ))}
        </CollapsibleSection>
      ))}
    </div>
  );
}
