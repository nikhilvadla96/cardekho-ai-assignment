import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [fuel, setFuel] = useState("Petrol");
  const [budget, setBudget] = useState(1200000);
  const [mileage, setMileage] = useState(15);
  const [safety, setSafety] = useState(3);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🌐 API BASE URL (change in production)
  const API = "http://localhost:8080";

  // 🚀 FETCH CARS (optimized + safe)
  const fetchCars = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API}/api/cars/shortlist?fuel=${encodeURIComponent(
          fuel
        )}&budget=${budget}&mileage=${mileage}&safety=${safety}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error(error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, [fuel, budget, mileage, safety]);

  // 🔥 AUTO FETCH WITH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCars();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchCars]);

  return (
    <div style={styles.page}>
      {/* LEFT PANEL */}
      <div style={styles.left}>
        <h1 style={styles.title}>🚗 Car Decision AI</h1>
        <p style={styles.sub}>Find your perfect car in seconds</p>

        {/* FUEL */}
        <div style={styles.card}>
          <label>Fuel Type</label>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            style={styles.input}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </div>

        {/* BUDGET */}
        <div style={styles.card}>
          <label>Budget: ₹{budget.toLocaleString()}</label>
          <input
            type="range"
            min="500000"
            max="3000000"
            step="50000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        {/* MILEAGE */}
        <div style={styles.card}>
          <label>Mileage: {mileage} km/l</label>
          <input
            type="range"
            min="10"
            max="30"
            step="1"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        {/* SAFETY */}
        <div style={styles.card}>
          <label>Safety: {safety} ⭐</label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={safety}
            onChange={(e) => setSafety(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        {/* BEST MATCH */}
        {cars.length > 0 && (
          <div style={styles.best}>
            🏆 Best Match: {cars[0].name}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.right}>
        <h2>Top Shortlist</h2>

        {/* RESULT COUNT */}
        {cars.length > 0 && (
          <p style={{ opacity: 0.7 }}>
            {cars.length} car{cars.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* LOADING */}
        {loading && (
          <div style={{ opacity: 0.7, marginTop: 10 }}>
            🔍 Finding best cars for you...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && cars.length === 0 && (
          <div style={styles.empty}>
            <h3>🚫 No matches found</h3>
            <p>
              Try increasing budget or relaxing safety/mileage filters.
            </p>
          </div>
        )}

        {/* CAR LIST */}
        {!loading &&
          cars.map((car, i) => (
            <div
              key={i}
              style={{
                ...styles.cardResult,
                border:
                  i === 0
                    ? "2px solid gold"
                    : "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <div style={styles.row}>
                <h3>🚗 {car.name}</h3>

                {i === 0 && <span style={styles.badge}>BEST</span>}
              </div>

              <div style={styles.meta}>
                💰 ₹{car.price.toLocaleString()} | ⛽ {car.mileage} km/l | 🛡{" "}
                {car.safety}/5
              </div>

              <div style={styles.score}>⭐ Score: {car.score}</div>

              <p style={styles.reason}>💡 {car.reason}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    background: "#0b1220",
    color: "#fff"
  },

  left: {
    width: "40%",
    padding: 30,
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)"
  },

  right: {
    width: "60%",
    padding: 30,
    overflowY: "auto"
  },

  title: {
    fontSize: 28,
    marginBottom: 5
  },

  sub: {
    opacity: 0.7,
    marginBottom: 20
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  input: {
    width: "100%",
    padding: 8,
    marginTop: 5
  },

  slider: {
    width: "100%",
    marginTop: 10
  },

  best: {
    marginTop: 20,
    padding: 15,
    background: "linear-gradient(90deg, #facc15, #f97316)",
    color: "#000",
    fontWeight: "bold",
    borderRadius: 10
  },

  cardResult: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    background: "rgba(255,255,255,0.04)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  badge: {
    background: "gold",
    color: "black",
    padding: "4px 8px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "bold"
  },

  meta: {
    opacity: 0.8,
    marginTop: 8
  },

  score: {
    marginTop: 10,
    fontWeight: "bold"
  },

  reason: {
    opacity: 0.7,
    marginTop: 5
  },

  empty: {
    padding: 20,
    border: "1px dashed gray",
    borderRadius: 10,
    textAlign: "center",
    opacity: 0.7,
    marginTop: 20
  }
};