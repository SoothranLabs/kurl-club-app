'use client';

import { useState } from 'react';

import { Plus, Wifi } from 'lucide-react';

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
import type { BiometricDevice } from '@/types/attendance';

import { DeviceTableView, createDeviceColumns } from '../table';

const mockDevices: BiometricDevice[] = [
  {
    id: 'DEV001',
    name: 'Main Entrance',
    ipAddress: '192.168.1.100',
    port: 4370,
    status: 'online',
    lastSeen: new Date().toISOString(),
    location: 'Reception Area',
  },
  {
    id: 'DEV002',
    name: 'Gym Floor',
    ipAddress: '192.168.1.101',
    port: 4370,
    status: 'offline',
    lastSeen: new Date(Date.now() - 300000).toISOString(),
    location: 'Main Gym Area',
  },
  {
    id: 'DEV003',
    name: 'Locker Room',
    ipAddress: '192.168.1.102',
    port: 4370,
    status: 'online',
    lastSeen: new Date(Date.now() - 60000).toISOString(),
    location: 'Changing Area',
  },
];

export default function DeviceManagement() {
  const [devices, setDevices] = useState(mockDevices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    ipAddress: '',
    port: 4370,
    location: '',
  });

  const handleAddDevice = () => {
    const device: BiometricDevice = {
      id: `DEV${String(devices.length + 1).padStart(3, '0')}`,
      ...newDevice,
      status: 'offline',
      lastSeen: new Date().toISOString(),
    };
    setDevices([...devices, device]);
    setNewDevice({ name: '', ipAddress: '', port: 4370, location: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditDevice = (device: BiometricDevice) => {
    console.log('Edit device:', device);
  };

  const handleDeleteDevice = (deviceId: string) => {
    setDevices(devices.filter((d) => d.id !== deviceId));
  };

  const columns = createDeviceColumns(handleEditDevice, handleDeleteDevice);

  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const offlineDevices = devices.filter((d) => d.status === 'offline').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-medium">Device Management</h3>
          <p className="text-gray-400 text-sm">
            Configure and monitor biometric devices
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-green-500 text-black hover:bg-primary-green-600">
              <Plus size={16} className="mr-2" />
              Add Device
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-secondary-blue-500 border-secondary-blue-600">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Device</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deviceName" className="text-white">
                  Device Name
                </Label>
                <Input
                  id="deviceName"
                  value={newDevice.name}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, name: e.target.value })
                  }
                  className="bg-secondary-blue-600 border-secondary-blue-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="ipAddress" className="text-white">
                  IP Address
                </Label>
                <Input
                  id="ipAddress"
                  value={newDevice.ipAddress}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, ipAddress: e.target.value })
                  }
                  className="bg-secondary-blue-600 border-secondary-blue-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="port" className="text-white">
                  Port
                </Label>
                <Input
                  id="port"
                  type="number"
                  value={newDevice.port}
                  onChange={(e) =>
                    setNewDevice({
                      ...newDevice,
                      port: parseInt(e.target.value),
                    })
                  }
                  className="bg-secondary-blue-600 border-secondary-blue-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-white">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newDevice.location}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, location: e.target.value })
                  }
                  className="bg-secondary-blue-600 border-secondary-blue-700 text-white"
                />
              </div>
              <Button
                onClick={handleAddDevice}
                className="w-full bg-primary-green-500 text-black"
              >
                Add Device
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4 h-[74px]">
        <div className="bg-secondary-blue-500 rounded-lg flex gap-4 items-center p-3">
          <span className="md:rounded-[18px] rounded-[12px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] md:min-w-[48px] md:min-h-[48px] md:max-w-[48px] md:max-h-[48px] flex items-center justify-center bg-semantic-blue-500">
            <Wifi size={20} strokeWidth={1.75} color="#151821" />
          </span>
          <div className="flex flex-col gap-1">
            <h6 className="text-white font-normal text-[15px] leading-normal">
              Total Devices
            </h6>
            <h4 className="text-white font-bold text-xl leading-normal">
              {devices.length}
            </h4>
          </div>
        </div>
        <div className="bg-secondary-blue-500 rounded-lg flex gap-4 items-center p-3">
          <span className="md:rounded-[18px] rounded-[12px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] md:min-w-[48px] md:min-h-[48px] md:max-w-[48px] md:max-h-[48px] flex items-center justify-center bg-primary-green-500">
            <Wifi size={20} strokeWidth={1.75} color="#151821" />
          </span>
          <div className="flex flex-col gap-1">
            <h6 className="text-white font-normal text-[15px] leading-normal">
              Online
            </h6>
            <h4 className="text-white font-bold text-xl leading-normal">
              {onlineDevices}
            </h4>
          </div>
        </div>
        <div className="bg-secondary-blue-500 rounded-lg flex gap-4 items-center p-3">
          <span className="md:rounded-[18px] rounded-[12px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] md:min-w-[48px] md:min-h-[48px] md:max-w-[48px] md:max-h-[48px] flex items-center justify-center bg-alert-red-400">
            <Wifi size={20} strokeWidth={1.75} color="#151821" />
          </span>
          <div className="flex flex-col gap-1">
            <h6 className="text-white font-normal text-[15px] leading-normal">
              Offline
            </h6>
            <h4 className="text-white font-bold text-xl leading-normal">
              {offlineDevices}
            </h4>
          </div>
        </div>
      </div>

      <DeviceTableView devices={devices} columns={columns} />
    </div>
  );
}
