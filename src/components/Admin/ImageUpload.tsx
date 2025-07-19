"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  Check,
  AlertCircle,
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

interface ImageUploadProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  category?: "product" | "user" | "category" | "general";
  maxFiles?: number;
  existingImages?: UploadedImage[];
}

export default function ImageUpload({
  onImagesUploaded,
  category = "product",
  maxFiles = 10,
  existingImages = [],
}: ImageUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] =
    useState<UploadedImage[]>(existingImages);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (!user || user.role !== "ADMIN") {
      alert("Only admin users can upload images");
      return;
    }

    const fileArray = Array.from(files);
    if (fileArray.length + uploadedImages.length > maxFiles) {
      alert(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Validate files
    const validFiles = fileArray.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert(`${file.name} is not a valid image format`);
        return false;
      }

      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        // Simulate progress for better UX
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: Math.min((prev[file.name] || 0) + 10, 90),
          }));
        }, 200);

        try {
          const token = localStorage.getItem("accessToken");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          clearInterval(progressInterval);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Upload failed");
          }

          const result = await response.json();

          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));

          return result.data;
        } catch (error) {
          clearInterval(progressInterval);
          setUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[file.name];
            return newProgress;
          });
          throw error;
        }
      });

      const results = await Promise.all(uploadPromises);
      const newImages = [...uploadedImages, ...results];
      setUploadedImages(newImages);
      onImagesUploaded(newImages);

      // Clear progress after a short delay
      setTimeout(() => {
        setUploadProgress({});
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
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
        alert("Failed to delete image from Cloudinary");
        return;
      }
    }

    // For both Cloudinary and direct URL images, remove from local state
    const newImages = uploadedImages.filter((img) => img.publicId !== publicId);
    setUploadedImages(newImages);
    onImagesUploaded(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
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
            <Upload className="h-12 w-12 text-gray-400" />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-700">
              Drop images here or click to upload
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports JPEG, PNG, WebP, GIF up to 5MB each
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Maximum {maxFiles} images ({uploadedImages.length}/{maxFiles}{" "}
              uploaded)
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || uploadedImages.length >= maxFiles}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Choose Images
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Uploading...</Label>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate">{fileName}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              {progress === 100 && <Check className="h-4 w-4 text-green-600" />}
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Uploaded Images ({uploadedImages.length})
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <Card key={image.publicId} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative group">
                    <Image
                      src={image.optimizedUrls.thumbnail}
                      alt={`Upload ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(image.publicId)}
                        className="opacity-0 group-hover:opacity-100 text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {image.metadata.format.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.round(image.metadata.bytes / 1024)}KB
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {image.metadata.width} × {image.metadata.height}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
