const Trends = ({ trends, date, ip, data }) => {
  // Log the props to ensure they're coming correctly
  console.log("Trends props", { trends, date, ip, data });

  // Check if required data is available
  if (!trends || !date || !ip || !data) {
    return <p>Loading or missing data...</p>;
  }

  return (
    <div>
      <h3>
        These are the most happening topics as of{" "}
        {new Date(date).toLocaleString()}
      </h3>
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>- {trend}</li>
        ))}
      </ul>
      <p>The IP address used for this query was {ip}.</p>
      <p>Here’s a JSON extract of this record from the MongoDB:</p>
      <pre>
        {JSON.stringify(
          {
            _id: data._id, // Use the actual MongoDB ID from the data
            trends: trends.reduce((acc, trend, index) => {
              acc[`nameoftrend${index + 1}`] = trend;
              return acc;
            }, {}),
          },
          null,
          2
        )}
      </pre>
      <button onClick={() => window.location.reload()}>
        Run Scraper Again
      </button>
    </div>
  );
};

export default Trends;
