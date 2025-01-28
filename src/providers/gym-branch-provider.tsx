'use client';

import React, { createContext, useEffect, useState, useContext } from 'react';

const GymBranchContext = createContext<
  | {
      gymBranch: {
        gymId: number;
        gymName: string;
        gymLocation: string;
      } | null;
      setGymBranch: (gymBranch: {
        gymId: number;
        gymName: string;
        gymLocation: string;
      }) => void;
    }
  | undefined
>(undefined);

// Gym Branch Provider
export const GymBranchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gymBranch, setGymBranch] = useState<{
    gymId: number;
    gymName: string;
    gymLocation: string;
  } | null>(null);

  useEffect(() => {
    const storedGymBranch = localStorage.getItem('gymBranch');
    if (storedGymBranch) {
      setGymBranch(JSON.parse(storedGymBranch));
    }
  }, []);

  return (
    <GymBranchContext.Provider value={{ gymBranch, setGymBranch }}>
      {children}
    </GymBranchContext.Provider>
  );
};

// Custom hook to use the GymBranchContext
export const useGymBranch = () => {
  const context = useContext(GymBranchContext);
  if (!context) {
    throw new Error('useGymBranch must be used within a GymBranchProvider');
  }
  return context;
};
