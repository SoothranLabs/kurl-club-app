'use client';

import { Clock, PenLine, User2 } from 'lucide-react';

import { MembershipPlan } from '@/types/membership-plan';
import { Member } from '@/types/members';
import { getInitials, getProfilePictureSrc } from '@/lib/utils';

import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

import { KInput } from '@/components/form/k-input';
import RichTextEditor from '@/components/rich-text-editor';

interface OverviewProps {
  plan: MembershipPlan;
  planMembers?: Member[];
  isEditMode: boolean;
  isNewPlan?: boolean;
  onUpdatePlan: (updatedPlan: MembershipPlan) => void;
  onImmediateUpdate: (updatedPlan: MembershipPlan) => void;
  onDelete: () => void;
  onEdit: () => void;
  onShowMembers: () => void;
}

export function Overview({
  plan,
  planMembers = [],
  isEditMode,
  isNewPlan = false,
  onUpdatePlan,
  onImmediateUpdate,
  onEdit,
  onShowMembers,
}: OverviewProps) {
  const handleDefaultChange = (checked: boolean) => {
    const updatedPlan = { ...plan, isActive: checked };

    if (isNewPlan) {
      onUpdatePlan(updatedPlan);
    } else {
      onImmediateUpdate(updatedPlan);
    }
  };

  const renderOverviewCard = (data: MembershipPlan) => (
    <Card className="w-full bg-secondary-blue-500 border-secondary-blue-600 text-white rounded-md">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl leading-tight font-medium">{data.planName}</h1>
          <button
            className="text-zinc-400 hover:text-primary-green-200 transition-colors"
            onClick={onEdit}
          >
            <PenLine className="w-5 h-5" />
          </button>
        </div>
        <div className="inline-flex px-4 bg-primary-blue-400 rounded-3xl w-auto max-w-max">
          <p className="text-lg text-white font-medium leading-relaxed">
            &#8377;{new Intl.NumberFormat('en-IN').format(Number(data.fee))}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3">
            <User2 className="w-6 h-6 text-primary-blue-200 shrink-0" />
            <div>
              <p className="text-primary-blue-50 text-sm">Total Members</p>
              <div
                className="flex items-center cursor-pointer"
                onClick={onShowMembers}
              >
                <div className="flex -space-x-2">
                  {planMembers.slice(0, 3).map((member) => (
                    <Avatar
                      key={member.id}
                      className="border border-neutral-300 w-5 h-5"
                    >
                      <AvatarFallback className="bg-primary-blue-400 text-[10px]">
                        {getInitials(member.name)}
                      </AvatarFallback>
                      <AvatarImage
                        src={getProfilePictureSrc(
                          member.profilePicture,
                          member.avatar
                        )}
                        alt={member.name}
                      />
                    </Avatar>
                  ))}
                </div>
                {planMembers.length > 3 && (
                  <span className="ml-1 text-sm text-semantic-blue-500 underline">
                    + {planMembers.length - 3} others
                  </span>
                )}
                {planMembers.length === 0 && (
                  <span className="text-sm text-gray-400">
                    No members assigned
                  </span>
                )}
              </div>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="h-12 hidden sm:block bg-primary-blue-400"
          />

          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-primary-blue-200 shrink-0" />
            <div>
              <p className="text-primary-blue-50 text-sm">Duration</p>
              <p className="text-sm text-white">{data.durationInDays} Days</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div
          className="prose prose-sm flex flex-col gap-2 prose-invert max-w-none
             prose-h1:text-2xl
             prose-p:text-white prose-p:leading-relaxed
             prose-ul:flex prose-ul:flex-col prose-ul:gap-4 prose-ul:list-none
             prose-li:list-none prose-li:text-white prose-li:font-medium prose-li:text-sm
             *:m-0 *:p-0 [&_li]:m-0 [&_li]:p-0
             [&_li]:relative [&_li]:pl-5
             [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-[4px]
             [&_li::before]:w-3 [&_li::before]:h-3 [&_li::before]:rounded-full
             [&_li::before]:border-[3px] [&_li::before]:border-primary-green-100
             [&_li::before]:bg-transparent [&_ul>li>p]:m-0 [&_ul>li>p]:p-0"
          dangerouslySetInnerHTML={{ __html: data.details }}
        />
      </CardFooter>
    </Card>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2>Membership details</h2>
        <div className="flex items-center gap-2">
          <span>Activate</span>
          <Switch
            checked={plan.isActive}
            onCheckedChange={handleDefaultChange}
            className="data-[state=checked]:bg-primary-green-500"
          />
        </div>
      </div>
      {isEditMode ? (
        <div className="space-y-4">
          <KInput
            label="Membership Plan Name"
            placeholder=" "
            value={plan.planName}
            onChange={(e) =>
              onUpdatePlan({ ...plan, planName: e.target.value })
            }
            disabled={!isEditMode}
            mandetory
          />
          <KInput
            label="Amount in (INR)"
            placeholder=" "
            value={plan.fee}
            onChange={(e) =>
              onUpdatePlan({ ...plan, fee: Number.parseInt(e.target.value) })
            }
            disabled={!isEditMode}
            mandetory
          />

          <RichTextEditor
            content={plan.details}
            onUpdate={(value: string) =>
              onUpdatePlan({ ...plan, details: value })
            }
          />

          <div className="flex flex-col md:flex-row gap-4">
            <KInput
              label="Duration (days)"
              type="number"
              placeholder={undefined}
              value={plan.durationInDays}
              onChange={(e) =>
                onUpdatePlan({
                  ...plan,
                  durationInDays: Number.parseInt(e.target.value),
                })
              }
              disabled={!isEditMode}
              mandetory
            />
          </div>
        </div>
      ) : (
        <>{renderOverviewCard(plan)}</>
      )}
    </>
  );
}
