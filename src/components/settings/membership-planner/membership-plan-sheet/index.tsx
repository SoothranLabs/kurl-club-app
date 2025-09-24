'use client';

import { useEffect, useState } from 'react';

import { ChevronLeft } from 'lucide-react';

import { KSheet } from '@/components/shared/form/k-sheet';
import { Button } from '@/components/ui/button';
import { useAppDialog } from '@/hooks/use-app-dialog';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { useGymMembers } from '@/services/member';
import { MembershipPlan } from '@/types/membership-plan';

import { MemberList } from './member-list';
import { Overview } from './overview';

interface PackageManageSheetProps {
  plan: MembershipPlan | null;
  isOpen: boolean;
  onUpdate: (plan: MembershipPlan) => void;
  onDelete: (planId: number) => void;
  onSaveNew: (plan: MembershipPlan) => void;
  closeSheet: () => void;
}

const DEFAULT_PLAN: MembershipPlan = {
  membershipPlanId: 0,
  gymId: 0,
  planName: '',
  details: '',
  fee: '',
  durationInDays: '',
  isActive: true,
};

export function MembershipPlanSheet({
  plan,
  isOpen,
  closeSheet,
  onUpdate,
  onDelete,
  onSaveNew,
}: PackageManageSheetProps) {
  const [editedPlan, setEditedPlan] = useState<MembershipPlan>(
    plan || DEFAULT_PLAN
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMemberListVisible, setIsMemberListVisible] = useState(false);

  const { showConfirm } = useAppDialog();

  const { gymBranch } = useGymBranch();
  // Only fetch members if sheet is open and a plan exists and gymId is present
  const { data: members = [] } = useGymMembers(
    isOpen && plan && gymBranch?.gymId ? gymBranch.gymId : 0
  );

  const planMembers = members.filter(
    (member) => member.workoutPlan === editedPlan.planName
  );

  useEffect(() => {
    if (isOpen) {
      setEditedPlan(plan || DEFAULT_PLAN);
      setIsEditMode(!plan);
      setSelectedDay(null);
      setIsMemberListVisible(false);
    }
  }, [plan, isOpen]);

  const handleSavePlan = () => {
    if (plan) {
      onUpdate(editedPlan);
    } else {
      onSaveNew(editedPlan);
    }
    setIsEditMode(false);
    closeSheet();
  };

  const handleDeletePlan = () => {
    showConfirm({
      title: `Are you absolutely sure?`,
      description: `This action cannot be undone. This will permanently delete your membership plan and remove it from our servers.`,
      variant: 'destructive',
      confirmLabel: 'Yes, delete plan',
      onConfirm: () => {
        if (plan) {
          onDelete(plan.membershipPlanId);
        }
        closeSheet();
      },
    });
  };

  const handleCancel = () => {
    if (!plan) {
      closeSheet();
    } else {
      setEditedPlan(plan);
      setIsEditMode(false);
    }
  };

  const handleImmediateUpdate = (updatedPlan: MembershipPlan) => {
    onUpdate(updatedPlan);
    setEditedPlan(updatedPlan);
  };

  const sheetTitle = (() => {
    if (isMemberListVisible) {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => setIsMemberListVisible(false)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          Members List
        </div>
      );
    }

    if (selectedDay) {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => {
              setEditedPlan(plan || DEFAULT_PLAN);
              setSelectedDay(null);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {selectedDay} Workout
        </div>
      );
    }

    return editedPlan.planName || 'New Membership Plan';
  })();

  const sheetFooter = (() => {
    if (isMemberListVisible) {
      return null;
    }

    if (selectedDay && isEditMode) {
      return (
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => {
              setEditedPlan(plan || DEFAULT_PLAN);
              setSelectedDay(null);
            }}
            variant="secondary"
            className="h-[46px] min-w-[90px]"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              setSelectedDay(null);
            }}
            className="h-[46px] min-w-[73px]"
          >
            Add
          </Button>
        </div>
      );
    }

    return (
      <div className="flex justify-end gap-3">
        {isEditMode ? (
          <>
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              className="h-[46px] min-w-[90px]"
            >
              Cancel
            </Button>
            <Button onClick={handleSavePlan} className="h-[46px] min-w-[73px]">
              Save Changes
            </Button>
          </>
        ) : (
          <Button variant="destructive" onClick={handleDeletePlan}>
            Delete plan
          </Button>
        )}
      </div>
    );
  })();

  return (
    <KSheet
      className="w-[585px]"
      isOpen={isOpen}
      onClose={closeSheet}
      title={sheetTitle}
      footer={sheetFooter}
    >
      {isMemberListVisible ? (
        <MemberList members={planMembers} />
      ) : (
        <div className="space-y-5">
          <Overview
            plan={editedPlan}
            planMembers={planMembers}
            isEditMode={isEditMode}
            isNewPlan={!plan}
            onUpdatePlan={setEditedPlan}
            onImmediateUpdate={handleImmediateUpdate}
            onDelete={handleDeletePlan}
            onEdit={() => setIsEditMode(!isEditMode)}
            onShowMembers={() => setIsMemberListVisible(true)}
          />
        </div>
      )}
    </KSheet>
  );
}
