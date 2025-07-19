"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Upload,
  X,
  Images,
  Loader2,
  Check,
  AlertCircle,
  FileImage,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

interface OptimizedUrls {
  original: string;
  thumbnail: string;
  medium: string;
  large: string;
  webp: string;
  avif: string;
}

interface UploadedImage {
  publicId: string;
  originalUrl: string;
  optimizedUrls: OptimizedUrls;
  metadata: {
    width: number;
    height: number;
    format: string;
    bytes: number;
    folder: string;
  };
}

interface BulkImageUploadProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  category?: "product" | "user" | "category" | "general";
  maxFiles?: number;
}

export default function BulkImageUpload({
  onImagesUploaded,
  category = "product",
  maxFiles = 10,
}: BulkImageUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBulkUpload = async (files: FileList) => {
    if (!user || user.role !== "ADMIN") {
      alert("Only admin users can upload images");
      return;
    }

    const fileArray = Array.from(files);
    if (fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} images allowed per upload`);
      return;
    }

    // Validate files
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    fileArray.forEach((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        newErrors.push(
          `${file.name}: Invalid format (use JPEG, PNG, WebP, or GIF)`
        );
        return;
      }

      if (file.size > maxSize) {
        newErrors.push(`${file.name}: File too large (max 5MB)`);
        return;
      }

      validFiles.push(file);
    });

    setErrors(newErrors);

    if (validFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Use bulk upload endpoint
      const formData = new FormData();
      validFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("category", category);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 5, 90));
      }, 200);

      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/images/bulk`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Bulk upload failed");
      }

      const result = await response.json();
      const newImages = result.data;

      setUploadedImages((prev) => [...prev, ...newImages]);
      onImagesUploaded([...uploadedImages, ...newImages]);

      // Clear progress after success
      setTimeout(() => {
        setUploadProgress(0);
        setCurrentFile("");
      }, 1000);
    } catch (error) {
      console.error("Bulk upload error:", error);
      setErrors((prev) => [
        ...prev,
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      ]);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleBulkUpload(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleBulkUpload(e.target.files);
    }
  };

  const removeImage = async (publicId: string) => {
    if (!user || user.role !== "ADMIN") return;

    // Check if this is a Cloudinary image or a direct URL
    const isCloudinaryImage = !publicId.startsWith("existing-");

    if (isCloudinaryImage) {
      // For Cloudinary images, delete from Cloudinary
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/upload/image/${encodeURIComponent(
            publicId
          )}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete image from Cloudinary");
        }
      } catch (error) {
        console.error("Delete error:", error);
        setErrors((prev) => [
          ...prev,
          "Failed to delete image from Cloudinary",
        ]);
        return;
      }
    }

    // For both Cloudinary and direct URL images, remove from local state
    const newImages = uploadedImages.filter((img) => img.publicId !== publicId);
    setUploadedImages(newImages);
    onImagesUploaded(newImages);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const clearAllImages = () => {
    setUploadedImages([]);
    onImagesUploaded([]);
  };

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center gap-2">
          <Images className="h-5 w-5" />
          Bulk Image Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="space-y-4">
            <div className="flex justify-center">
              {uploading ? (
                <Loader2 className="h-16 w-16 text-green-600 animate-spin" />
              ) : (
                <FileImage className="h-16 w-16 text-gray-400" />
              )}
            </div>

            <div>
              <p className="text-xl font-medium text-gray-700">
                {uploading
                  ? "Uploading images..."
                  : "Drop multiple images here"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Upload up to {maxFiles} images at once
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports JPEG, PNG, WebP, GIF up to 5MB each
              </p>
            </div>

            {!uploading && (
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Multiple Images
              </Button>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Upload Progress</Label>
              <span className="text-sm text-gray-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            {currentFile && (
              <p className="text-xs text-gray-500">Processing: {currentFile}</p>
            )}
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Upload Errors ({errors.length})
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearErrors}
                className="text-red-600 hover:bg-red-50"
              >
                Clear
              </Button>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-1">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-700">
                  • {error}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Images */}
        {uploadedImages.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Uploaded Images ({uploadedImages.length})
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllImages}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {uploadedImages.map((image, index) => (
                <Card key={image.publicId} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative group">
                      <Image
                        src={image.optimizedUrls.thumbnail}
                        alt={`Upload ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeImage(image.publicId)}
                          className="opacity-0 group-hover:opacity-100 text-white hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {image.metadata.format.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {Math.round(image.metadata.bytes / 1024)}KB
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
