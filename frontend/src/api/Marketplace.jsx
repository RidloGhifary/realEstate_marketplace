const API_URL = import.meta.env.API_URL;

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

export const UseGetMarketplaceByUserId = async (id) => {
  const response = await fetch(`${API_URL}/api/estate/user-listing/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Something error while fetching");

  return await response.json();
};

export const UseDeleteMarketplace = async (listId) => {
  const response = await fetch(`${API_URL}/api/estate/listing/${listId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Something error while fetching");

  return await response.json();
};

export const UseGetMarketplaceById = async (estateId) => {
  const response = await fetch(`${API_URL}/api/estate/listing/${estateId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Something error while fetching");

  return await response.json();
};

export const UseUpdateMarketplace = async (formData) => {
  const { estateId, ...data } = formData;
  const response = await fetch(`${API_URL}/api/estate/listing/${estateId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
  return responseBody;
};

export const UseSearchEstate = async (searchTerm) => {
  const response = await fetch(
    `${API_URL}/api/estate/allListings?${searchTerm}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) throw new Error("Something went wrong");

  return await response.json();
};

export const UseGetDataForHomePage = async (query) => {
  const response = await fetch(`${API_URL}/api/estate/allListings?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Something went wrong");

  return await response.json();
};
