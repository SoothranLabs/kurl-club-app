'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMemberDetails } from '@/components/sidebar/MemberDetailsContext';
import { CollapsibleSection } from '@/components/Collapsible';
import { EditableField } from '@/components/Editable';
import { Badge } from '@/components/ui/badge';

export function MemberDetailsSidebar() {
  const { memberDetails, setMemberDetails, isEditing, setIsEditing } =
    useMemberDetails();
  const [isBasicDetailsOpen, setIsBasicDetailsOpen] = useState(true);
  const [isAddressDetailsOpen, setIsAddressDetailsOpen] = useState(true);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setMemberDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-[336] h-screen bg-primary-blue-500 text-white p-8 overflow-y-auto border-r-[1px]">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-2">
        <a
          href="/members"
          className="hover:underline cursor-pointer text-gray-400"
        >
          Members
        </a>
        &gt;
        <a
          href="/members-details"
          className="hover:underline cursor-pointer text-gray-400"
        >
          Member details
        </a>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-[400] font-figtree leading-[26.16px] mb-6">
        Member details
      </h2>

      {/* Profile Summary */}
      <div className="items-center mb-6">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-[400] font-figtree text-neutral-green-300  mr-4 mb-2">
          {memberDetails.name
            .split(' ')
            .map((part) => part[0])
            .join('')}
        </div>
        <div>
          <h2 className="text-xl font-[500] font-figtree text-Primary-White">
            {memberDetails.name}
          </h2>
          <p className="text-sm text-primary-blue-02-50 font-[400] font-figtree">
            Member since {memberDetails.memberSince}
          </p>
        </div>
      </div>

      {/* Gym Number */}
      <Badge className="bg-neutral-ochre-900 text-white rounded-full py-1 px-4  mb-6 inline-block border border-neutral-ochre-600">
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

      {/* Sections */}
      <div className="space-y-2">
        <CollapsibleSection
          title="Basic details"
          isOpen={isBasicDetailsOpen}
          setIsOpen={setIsBasicDetailsOpen}
        >
          <EditableField
            label="Email"
            name="email"
            value={memberDetails.email}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
          <EditableField
            label="Mobile"
            name="mobile"
            value={memberDetails.mobile}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
          <EditableField
            label="DOB"
            name="dob"
            value={memberDetails.dob}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
          <EditableField
            label="Amount Paid"
            name="amountPaid"
            value={memberDetails.amountPaid.toString()}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
          <EditableField
            label="Package"
            name="package"
            value={memberDetails.package}
            onChange={(e) => handleInputChange(e)}
            isEditing={isEditing}
            type="dropdown"
            options={['Monthly', 'Quarterly', 'Yearly']}
          />

          <EditableField
            label="Blood Group"
            name="bloodGroup"
            value={memberDetails.bloodGroup}
            onChange={(e) => handleInputChange(e)}
            isEditing={isEditing}
            type="dropdown"
            options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
          />
          <EditableField
            label="DOJ"
            name="doj"
            value={memberDetails.doj}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
        </CollapsibleSection>

        <CollapsibleSection
          title="Address details"
          isOpen={isAddressDetailsOpen}
          setIsOpen={setIsAddressDetailsOpen}
        >
          <EditableField
            label="Address"
            name="address"
            value={memberDetails.address}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
          <EditableField
            label="PIN"
            name="pin"
            value={memberDetails.pin}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
        </CollapsibleSection>
      </div>
    </div>
  );
}
