"use client";
import { CldUploadWidget } from 'next-cloudinary';
import React from 'react';

function UploadImage() {
  return (
    <div>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          maxFiles: 1, // Limit to one file
          sources: ['local', 'url'], // Allow local and URL uploads
          cropping: true, // Enable cropping
          croppingAspectRatio: 1, // Set aspect ratio for cropping
          showPoweredBy: false, // Hide "Powered by Cloudinary"
        }}
        onSuccess={(result) => {
          console.log("Upload success:", result);
          
        }}
        onError={(error) => {
          console.error("Upload error:", error);
          alert("Failed to upload image. Please try again.");
        }}
      >
        {({ open }) => {
          return (
            <button
              onClick={() => open()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default UploadImage;