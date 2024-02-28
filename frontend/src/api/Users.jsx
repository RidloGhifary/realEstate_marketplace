const API_URL = "http://localhost:5100";

export const GetCurrentUser = async () => {
  const response = await fetch(`${API_URL}/api/user/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Something went wrong");

  return await response.json();
};
