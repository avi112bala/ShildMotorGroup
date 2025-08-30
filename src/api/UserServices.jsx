import axios from "axios";
// import jwtDecode from "jwt-decode";
// import { useRef } from "react";

import Swal from "sweetalert2";

// Base URL for your API
const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = 'http://localhost:5000/api';

// Configure Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Service functions for user-related APIs
const UserService = {
  getSetting:()=>axiosInstance.get(`api/setting`),


  // Example: Add more API calls for other user-related tasks
  getUserById: (userId) => axiosInstance.get(`/user/${userId}`),
  //for upload Image in s3 bucket
  uploadImage: (data, config) => axiosInstance.post(`/upload`, data, config),

  // updateContact: (userData) => axiosInstance.put(`/user/${userId}`, userData),
  updateContact: (userId, userData, config) =>
    axiosInstance.put(`/user/${userId}`, userData, config),

  updateImage: (imageData) => axiosInstance.post(`/upload`, imageData),

  // Contact us
  sendContactForm: (userData) =>
    axiosInstance.post("/user/contact-us", userData),

  forgotPassword: (userData) =>
    axiosInstance.post("/user/forgot-password", userData),

  // Create resetPassword
  resetPassword: (userData) =>
    axiosInstance.post("/user/reset-password", userData),

  // Create property
  createProperty: (propertyData) =>
    axiosInstance.post("/property", propertyData),

  // Get property by user ID
  getPropertyByUserId: (userId, page = 1) =>
    axiosInstance.get(`/property/myproperties/${userId}?page=${page}`),

  // Get all property
  getProperties: (page = "1") => axiosInstance.get(`/property?page=${page}`),

  // Get all property
  getLoggedoutProperties: (page = "1") =>
    axiosInstance.get(`/property?page=${page}&is_approve=0`),

  getallusers: (page = "1", config) =>
    axiosInstance.get(`/user?page=${page}`, config),

  // Get a single property by its ID
  getPropertyById: (propertyId) => axiosInstance.get(`/property/${propertyId}`),

  // Update property by ID
  updateProperty: (propertyId, propertyData, config) =>
    axiosInstance.put(`/property/${propertyId}`, propertyData, config),

  // Delete property by ID
  deleteProperty: (propertyId, config) =>
    axiosInstance.delete(`/property/${propertyId}`, config),

  showToast: (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      customClass: {
        title: "swal-custom-title",
        popup: "swal-custom-popup",
      },
    });
  },
  showToastError: (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "error",
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      customClass: {
        title: "swal-custom-title",
        popup: "swal-custom-popup",
      },
    });
  },
};

export default UserService;
