import { useState } from "react";
import "./App.css";

function App() {
  const [category, setCategory] = useState("f"); // Default to Fibonacci
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const apiUrls = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo", 
    e: "http://20.244.56.144/test/fibo", 
    r: "http://20.244.56.144/test/rand", 
  };


  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(apiUrls[category]);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      setData(result);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Average Calculator</h1>

      <label style={{ fontSize: "18px", marginRight: "10px" }}>
        Select Category:
      </label>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>

      <button
        onClick={fetchData}
        style={{
          marginLeft: "10px",
          padding: "5px 15px",
          backgroundColor: "green",
          color: "white",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Refresh
      </button>

      {loading && <p>Loading...</p>}

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Error fetching data. Try again.
        </p>
      )}

      {data && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          <p>Fetched Numbers: {JSON.stringify(data.numbers)}</p>
          <p>
            <strong>Average: {data.avg || "N/A"}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
