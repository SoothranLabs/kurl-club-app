'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Member } from '@/types/attendance';

import { MemberTableView, createMemberColumns } from '../table';

const mockMembers: Member[] = [
  {
    id: 'M001',
    name: 'John Doe',
    memberIdentifier: 'GYM001',
    biometricId: 'BIO001',
    department: 'Premium',
    status: 'active',
  },
  {
    id: 'M002',
    name: 'Jane Smith',
    memberIdentifier: 'GYM002',
    biometricId: 'BIO002',
    department: 'Standard',
    status: 'active',
  },
  {
    id: 'M003',
    name: 'Mike Johnson',
    memberIdentifier: 'GYM003',
    biometricId: 'BIO003',
    department: 'Basic',
    status: 'inactive',
  },
];

export default function MemberAttendance() {
  const [members, setMembers] = useState(mockMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    memberIdentifier: '',
    biometricId: '',
    department: '',
  });

  const handleAddMember = () => {
    const member: Member = {
      id: `M${String(members.length + 1).padStart(3, '0')}`,
      ...newMember,
      status: 'active',
    };
    setMembers([...members, member]);
    setNewMember({
      name: '',
      memberIdentifier: '',
      biometricId: '',
      department: '',
    });
    setIsAddDialogOpen(false);
  };

  const handleEditMember = (member: Member) => {
    console.log('Edit member:', member);
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers(members.filter((m) => m.id !== memberId));
  };

  const columns = createMemberColumns(handleEditMember, handleDeleteMember);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-medium">Member Management</h3>
          <p className="text-gray-400 text-sm">
            Manage member profiles and biometric associations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-green-500 text-black hover:bg-primary-green-600">
              <Plus size={16} className="mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-secondary-blue-500 border-secondary-blue-600">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="memberName" className="text-white">
                  Member Name
                </Label>
                <Input
                  id="memberName"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="bg-secondary-blue-600 border-secondary-blue-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="memberIdentifier" className="text-white">
                  Member ID
                </Label>
                <Input
                  id="memberIdentifier"
                  value={newMember.memberIdentifier}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      memberIdentifier: e.target.value,
                    })
                  }
                  className="bg-secondary-blue-600 border-secondary-blue-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="biometricId" className="text-white">
                  Biometric ID
                </Label>
                <Input
                  id="biometricId"
                  value={newMember.biometricId}
                  onChange={(e) =>
                    setNewMember({ ...newMember, biometricId: e.target.value })
                  }
                  className="bg-secondary-blue-600 border-secondary-blue-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="department" className="text-white">
                  Department/Plan
                </Label>
                <Select
                  value={newMember.department}
                  onValueChange={(value) =>
                    setNewMember({ ...newMember, department: value })
                  }
                >
                  <SelectTrigger className="bg-secondary-blue-600 border-secondary-blue-700 text-white">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAddMember}
                className="w-full bg-primary-green-500 text-black"
              >
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <MemberTableView members={members} columns={columns} />
    </div>
  );
}
