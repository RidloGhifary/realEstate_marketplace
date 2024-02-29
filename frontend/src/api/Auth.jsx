const API_URL = "http://localhost:5100";

export const UseSignUp = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const UseSignIn = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const ValidateToken = async () => {
  const response = await fetch(`${API_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Invalid token");

  return await response.json();
};

export const UseGoogle = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/google`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const UseSignOut = async () => {
  const response = await fetch(`${API_URL}/api/auth/signout`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Invalid token");

  return await response.json();
};
