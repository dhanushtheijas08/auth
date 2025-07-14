import type { LoginInput, RegisterInput } from "@auth/shared";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    return response.json();
  },
  register: async (data: RegisterInput) => {
    console.log({ API_URL });

    const response = await fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        username: data.username,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  },
};
