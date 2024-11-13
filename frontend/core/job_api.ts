import AxiosInstance from "./baseURL";

// Define types for API responses and request data
interface Job {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  applicants: string[];
  // Add additional job properties if needed
}

interface Business {
  _id: string;
  name: string;
  jobs: string[];
  // Add additional business properties if needed
}

interface ErrorResponse {
  message: string;
  error?: any;
}

// Create a Job
export const createJob = async (
  businessId: string,
  jobData: Partial<Job>,
  token: string
): Promise<Job | ErrorResponse> => {
  try {
    const response = await AxiosInstance.post<Job>(`/${businessId}`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating job", error);
    throw error;
  }
};

// Get All Jobs
export const getAllJobs = async (token: string): Promise<Job[] | ErrorResponse> => {
  try {
    const response = await AxiosInstance.get<Job[]>("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching jobs", error);
    throw error;
  }
};

// Get Job by ID
export const getJobById = async (
  id: string,
  token: string
): Promise<Job | ErrorResponse> => {
  try {
    const response = await AxiosInstance.get<Job>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching job", error);
    throw error;
  }
};

// Update Job by ID
export const updateJobById = async (
  id: string,
  jobData: Partial<Job>,
  token: string
): Promise<Job | ErrorResponse> => {
  try {
    const response = await AxiosInstance.put<Job>(`/${id}`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating job", error);
    throw error;
  }
};

// Delete Job by ID
export const deleteJobById = async (
  id: string,
  token: string
): Promise<{ message: string } | ErrorResponse> => {
  try {
    const response = await AxiosInstance.delete<{ message: string }>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error deleting job", error);
    throw error;
  }
};
