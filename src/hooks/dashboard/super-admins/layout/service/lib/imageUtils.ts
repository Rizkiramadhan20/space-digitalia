import imagekitInstance from "@/utils/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

export const handleImageUpload = async (file: File) => {
  try {
    const compressedFile = await compressImage(file);
    const reader = new FileReader();

    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });

    const base64 = await base64Promise;
    const result = await imagekitInstance.upload({
      file: base64,
      fileName: `service${Date.now()}`,
      folder: "/service",
    });

    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
