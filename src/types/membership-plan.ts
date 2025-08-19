export interface MembershipPlan {
  membershipPlanId: number;
  gymId: number;
  planName: string;
  details: string;
  fee: number;
  durationInDays: number;
  isActive: boolean;
}
