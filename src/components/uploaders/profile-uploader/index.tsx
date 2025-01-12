'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CropModal from './crop-modal';
import PreviewModal from './preview-modal';
import { CircleUser, Plus, User } from 'lucide-react';

interface ProfilePictureUploaderProps {
  files?: Uint8Array | null;
  onChange?: (byteArray: Uint8Array | null) => void;
  isSmall?: boolean;
}

export default function ProfilePictureUploader({
  files,
  onChange = () => {},
  isSmall,
}: ProfilePictureUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert Uint8Array back to a base64 image string if `files` is updated externally
  useEffect(() => {
    if (files && files.length > 0) {
      const blob = new Blob([files]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setImage(e.target.result as string);
      };
      reader.readAsDataURL(blob);
    } else {
      setImage(null);
    }
  }, [files]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempImage(e.target?.result as string);
        setImage(null); // Clear the existing image
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedImage: string) => {
    setImage(croppedImage);
    setCropModalOpen(false);

    // Convert base64 to Blob and then to Uint8Array
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const arrayBuffer = e.target.result as ArrayBuffer;
            const byteArray = new Uint8Array(arrayBuffer);
            onChange(byteArray);
          }
        };
        reader.readAsArrayBuffer(blob);
      });
  };

  const handleDelete = () => {
    setImage(null);
    setPreviewModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  const handleReupload = () => {
    setPreviewModalOpen(false);
    setImage(null);
    setTempImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      {image ? (
        <Avatar
          className={`${isSmall ? 'size-[64px]' : 'size-[92px]'} cursor-pointer`}
          onClick={() => setPreviewModalOpen(true)}
        >
          <AvatarImage src={image} alt="Profile picture" />
          <AvatarFallback>
            <User className="w-16 h-16" />
          </AvatarFallback>
        </Avatar>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className={`${isSmall ? 'size-[64px]' : 'size-[92px]'} bg-secondary-blue-400 rounded-[60px] hover:bg-secondary-blue-500 relative`}
          onClick={() => fileInputRef.current?.click()}
        >
          <CircleUser
            className={`${isSmall ? '!size-8' : '!size-11'} text-secondary-blue-100`}
          />
          <span
            className={`absolute bottom-0 right-0 ${isSmall ? 'size-5' : 'size-6'} p-1 bg-primary-green-500 flex justify-center items-center rounded-[60px]`}
          >
            <Plus
              className={` ${isSmall ? '!size-2' : '!size-3'} text-secondary-blue-500`}
            />
          </span>
        </Button>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <CropModal
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        src={tempImage}
        onCrop={handleCrop}
      />
      <PreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        src={image}
        onDelete={handleDelete}
        onReupload={handleReupload}
      />
    </div>
  );
}
