const API_URL = "http://localhost:5100";

export const UseCreateMarketplace = async (formData) => {
  if (formData.imageUrls.length < 1)
    throw new Error("Something required is missing");

  if (+formData.regularPrice < +formData.discountPrice)
    throw new Error("Regular price must be greater that discount price");

  const response = await fetch(`${API_URL}/api/estate/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData, userRef: formData.userRef }),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
  return responseBody;
};
