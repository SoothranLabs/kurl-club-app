import React, { createContext, useContext, useState } from 'react';

interface MemberDetails {
  name: string;
  memberSince: string;
  gymNo: string;
  email: string;
  mobile: string;
  dob: string;
  height: string;
  weight: string;
  workOutPlan: string;
  assignedTo: string;
  bloodGroup: string;
  address: string;
  pin: string;
}

interface SidebarContextProps {
  memberDetails: MemberDetails;
  isEditing: boolean;
  setMemberDetails: React.Dispatch<React.SetStateAction<MemberDetails>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const MemberDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [memberDetails, setMemberDetails] = useState<MemberDetails>({
    name: 'Prasoon Mohan',
    memberSince: '14/03/2024',
    gymNo: '290897',
    email: 'magikmike@gmail.com',
    mobile: '+91 1234567891',
    dob: '13/03/2000',
    height: '157',
    weight: '80',
    workOutPlan: 'Weight loss',
    assignedTo: 'Hafiz',
    bloodGroup: 'O+',
    address: '221B , Trump towers Broadway, New Jersey Newyork',
    pin: '673612',
  });

  return (
    <SidebarContext.Provider
      value={{ memberDetails, setMemberDetails, isEditing, setIsEditing }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useMemberDetails = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useMemberDetails must be used within a MemberDetailsProvider'
    );
  }
  return context;
};
