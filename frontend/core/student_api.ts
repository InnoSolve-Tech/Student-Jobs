import AxiosInstance from "./baseURL";

// Define types for API responses and request data
interface Student {
  _id: string;
  name: string;
  email: string;
  appliedJobs: string[];
  // Add additional student properties as needed
}

interface AuthResponse {
  token: string;
}

interface ErrorResponse {
  message: string;
  error?: any;
}

// Student Functions

// Register Student
export const registerStudent = async (
  studentData: Partial<Student>
): Promise<Student | ErrorResponse> => {
  try {
    const response = await AxiosInstance.post<Student>("/register", studentData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating student", error);
    throw error;
  }
};

// Student Login
export const loginStudent = async (
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

// Get All Students
export const getAllStudents = async (token: string): Promise<Student[] | ErrorResponse> => {
  try {
    const response = await AxiosInstance.get<Student[]>("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching students", error);
    throw error;
  }
};

// Get Student by ID
export const getStudentById = async (
  id: string,
  token: string
): Promise<Student | ErrorResponse> => {
  try {
    const response = await AxiosInstance.get<Student>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching student", error);
    throw error;
  }
};

// Update Student by ID
export const updateStudentById = async (
  id: string,
  studentData: Partial<Student>,
  token: string
): Promise<Student | ErrorResponse> => {
  try {
    const response = await AxiosInstance.put<Student>(`/${id}`, studentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating student", error);
    throw error;
  }
};

// Delete Student by ID
export const deleteStudentById = async (
  id: string,
  token: string
): Promise<{ message: string } | ErrorResponse> => {
  try {
    const response = await AxiosInstance.delete<{ message: string }>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error deleting student", error);
    throw error;
  }
};