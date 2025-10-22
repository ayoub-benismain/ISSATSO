const api_url = "http://localhost:5000/api/dashboard"; // your backend URL

// Fetch user profile
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${api_url}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
