// src/services/api.js

export const fetchTrends = async () => {
  try {
    const response = await fetch("/api/run-scraper");
    if (!response.ok) {
      throw new Error("Failed to fetch trends");
    }
    const data = await response.json();
    console.log("data after awaiting response", data);
    return data.record; // Adjust based on backend response
  } catch (error) {
    console.error("Error fetching trends:", error);
    throw error;
  }
};
