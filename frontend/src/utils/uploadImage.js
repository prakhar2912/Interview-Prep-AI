// src/utils/uploadImage.js

import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  // Append image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // File upload header
        },
      }
    );

    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error; // Rethrow for handling in component
  }
};

export default uploadImage;