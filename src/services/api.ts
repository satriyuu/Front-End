// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

export const getPengunjung = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-pengunjung`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pengunjung:', error);
    throw error;
  }
};

export const storePengunjung = async (pengunjung: { name: string, job: string, umur: number }) => {
  try {
    const response = await axios.post(`${API_URL}/store-pengunjung`, pengunjung);
    return response.data;
  } catch (error) {
    console.error('Error storing pengunjung:', error);
    throw error;
  }
};

export const getPengunjungById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/get-pengunjung-by-id`, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pengunjung by id:', error);
    throw error;
  }
};

export const updatePengunjung = async (pengunjung: { id: number, name: string, job: string }) => {
  try {
    const response = await axios.post(`${API_URL}/update-pengunjung`, pengunjung);
    return response.data;
  } catch (error) {
    console.error('Error updating pengunjung:', error);
    throw error;
  }
};

export const deletePengunjung = async (id: number) => {
  try {
    const response = await axios.post(`${API_URL}/delete-pengunjung`, { id });
    return response.data;
  } catch (error) {
    console.error('Error deleting pengunjung:', error);
    throw error;
  }
};
