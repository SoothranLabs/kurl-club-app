import React, { createContext, useContext, useState } from 'react';

interface MemberDetails {
  name: string;
  memberSince: string;
  gymNo: string;
  email: string;
  mobile: string;
  dob: string;
  amountPaid: number;
  package: string;
  bloodGroup: string;
  doj: string;
  address: string;
  pin: string;
}

interface MemberDetailsContextProps {
  memberDetails: MemberDetails;
  isEditing: boolean;
  setMemberDetails: React.Dispatch<React.SetStateAction<MemberDetails>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemberDetailsContext = createContext<
  MemberDetailsContextProps | undefined
>(undefined);

export const MemberDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [memberDetails, setMemberDetails] = useState<MemberDetails>({
    name: 'Prasoon Mohan',
    memberSince: '13/03/2024',
    gymNo: '290897',
    email: 'magikmike@gmail.com',
    mobile: '+91 1234 5678 90',
    dob: '13/03/2000',
    amountPaid: 3500,
    package: 'Quarterly',
    bloodGroup: 'O+ve',
    doj: '13/03/2025',
    address: '221B , Trump towers Broadway, New Jersey Newyork',
    pin: '673612',
  });

  return (
    <MemberDetailsContext.Provider
      value={{ memberDetails, setMemberDetails, isEditing, setIsEditing }}
    >
      {children}
    </MemberDetailsContext.Provider>
  );
};

export const useMemberDetails = () => {
  const context = useContext(MemberDetailsContext);
  if (!context) {
    throw new Error(
      'useMemberDetails must be used within a MemberDetailsProvider'
    );
  }
  return context;
};
