'use client';

import React, { createContext, useEffect, useState, useContext } from 'react';

// Global ref to access clearGymBranch from auth provider
let globalClearGymBranch: (() => void) | null = null;

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
      clearGymBranch: () => void;
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

  const handleSetGymBranch = (gymBranch: {
    gymId: number;
    gymName: string;
    gymLocation: string;
  }) => {
    setGymBranch(gymBranch);
    localStorage.setItem('gymBranch', JSON.stringify(gymBranch));
  };

  const clearGymBranch = () => {
    setGymBranch(null);
    localStorage.removeItem('gymBranch');
  };

  // Expose clearGymBranch globally
  useEffect(() => {
    globalClearGymBranch = clearGymBranch;
    return () => {
      globalClearGymBranch = null;
    };
  }, []);

  useEffect(() => {
    const storedGymBranch = localStorage.getItem('gymBranch');
    if (storedGymBranch) {
      setGymBranch(JSON.parse(storedGymBranch));
    }
  }, []);

  return (
    <GymBranchContext.Provider
      value={{ gymBranch, setGymBranch: handleSetGymBranch, clearGymBranch }}
    >
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

// Export function to clear gym branch from outside the context
export const clearGymBranchGlobally = () => {
  if (globalClearGymBranch) {
    globalClearGymBranch();
  }
};
