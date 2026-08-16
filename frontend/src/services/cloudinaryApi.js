import imageCompression from "browser-image-compression";

const CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadStudentPhoto = async (file) => {
  if (!file) {
    throw new Error("No photo selected");
  }

  console.log("Original photo:", file.name);

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    fileType: "image/webp"
  };

  const compressedFile = await imageCompression(
    file,
    options
  );

  console.log(
    "Compressed photo:",
    compressedFile.name,
    compressedFile.size
  );

  const formData = new FormData();

  formData.append("file", compressedFile);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  console.log("Cloudinary response:", data);

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Failed to upload photo"
    );
  }

  return {
  url: data.secure_url,
  publicId: data.public_id
};
};