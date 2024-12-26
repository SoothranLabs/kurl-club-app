'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CropModal from './crop-modal';
import PreviewModal from './preview-modal';
import { Upload, User } from 'lucide-react';

interface ProfilePictureUploaderProps {
  onImageChange: (byteArray: Uint8Array) => void;
}

export default function ProfilePictureUploader({
  onImageChange,
}: ProfilePictureUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            onImageChange(byteArray); // Pass Uint8Array to the parent
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
    onImageChange(new Uint8Array());
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
    <div className="flex flex-col items-center space-y-4">
      {image ? (
        <Avatar
          className="w-32 h-32 cursor-pointer"
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
          className="w-32 h-32"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-16 h-16" />
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
