const API_URL = "http://localhost:5100";

export const GetCurrentUser = async () => {
  const response = await fetch(`${API_URL}/api/user/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Something went wrong");

  return await response.json();
};

export const UseUpdateUser = async (formData) => {
  const { _id, ...restOfDatas } = formData;
  const response = await fetch(`http://localhost:5100/api/user/update/${_id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restOfDatas),
  });

  if (!response.ok) throw new Error("Updating user error");
  return await response.json();
};
