import React, { useState } from "react";
import Trends from "./components/Trends";
import Button from "./components/Button";
import { fetchTrends } from "./scrap_service/scrap_service.js";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchTrends();
      console.log("result", result);
      setData(result);
    } catch (err) {
      setError("Failed to fetch trends. Please try again.", err);
    } finally {
      setLoading(false);
    }
    console.log("data", data);
  };

  return (
    <div className="App">
      <h1>Trending Topics</h1>
      <Button onClick={handleClick} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <Trends
          trends={data.trends}
          date={data.date}
          ip={data.ipAddress}
          data={data}
        />
      )}
    </div>
  );
}

export default App;
