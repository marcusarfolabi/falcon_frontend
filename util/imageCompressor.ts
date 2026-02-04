import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File) => {
  // Define supported image types
  const supportedTypes = [
    'image/jpeg', 
    'image/png', 
    'image/webp', 
    'image/jpg', 
    'image/heic', 
    'image/heif', 
    'image/avif'
  ];

  if (!supportedTypes.includes(file.type)) {
    return file; // If it's a PDF or Doc, just return as is
  }

  const options = {
    maxSizeMB: 1,            // Target size under 1MB
    maxWidthOrHeight: 1920, // Max resolution (HD)
    useWebWorker: true,
    initialQuality: 0.8,    // Start at 80% quality
  };

  try {
    const compressedFile = await imageCompression(file, options);
    // Maintain original name but update the file data
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Compression failed:", error);
    return file; // Fallback to original if compression fails
  }
};