import { BASE_URL } from "../redux/constants";

/**
 * Converts relative image paths to full URLs for production
 * In development, returns the path as-is (Vite proxy handles it)
 * In production, prepends the backend URL
 * 
 * @param {string} imagePath - The image path from database (e.g., "/uploads/image-123.jpg")
 * @returns {string} - Full URL or relative path depending on environment
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  // If it's already a full URL (http/https), return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it starts with /uploads, prepend BASE_URL in production
  if (imagePath.startsWith("/uploads")) {
    return BASE_URL ? `${BASE_URL}${imagePath}` : imagePath;
  }

  // For any other relative path, return as-is
  return imagePath;
};

