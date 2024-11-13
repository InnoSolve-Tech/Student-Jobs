import AxiosInstance from "./baseURL";

interface Business {
  _id: string;
  name: string;
  email: string;
  jobs: string[];
  // Add additional business properties as needed
}

interface AuthResponse {
  token: string;
}

interface ErrorResponse {
  message: string;
  error?: any;
}

// Register Business
export const registerBusiness = async (
  businessData: Partial<Business>
): Promise<Business | ErrorResponse> => {
  try {
    const response = await AxiosInstance.post<Business>("/register", businessData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating business", error);
    throw error;
  }
};

// Business Login
export const loginBusiness = async (
  email: string,
  password: string
): Promise<AuthResponse | ErrorResponse> => {
  try {
    const response = await AxiosInstance.post<AuthResponse>("/login", { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Error logging in", error);
    throw error;
  }
};

// Get All Businesses
export const getAllBusinesses = async (token: string): Promise<Business[] | ErrorResponse> => {
  try {
    const response = await AxiosInstance.get<Business[]>("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching businesses", error);
    throw error;
  }
};

// Get Business by ID
export const getBusinessById = async (
  id: string,
  token: string
): Promise<Business | ErrorResponse> => {
  try {
    const response = await AxiosInstance.get<Business>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching business", error);
    throw error;
  }
};

// Update Business by ID
export const updateBusinessById = async (
  id: string,
  businessData: Partial<Business>,
  token: string
): Promise<Business | ErrorResponse> => {
  try {
    const response = await AxiosInstance.put<Business>(`/${id}`, businessData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating business", error);
    throw error;
  }
};

// Delete Business by ID
export const deleteBusinessById = async (
  id: string,
  token: string
): Promise<{ message: string } | ErrorResponse> => {
  try {
    const response = await AxiosInstance.delete<{ message: string }>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error deleting business", error);
    throw error;
  }
};
