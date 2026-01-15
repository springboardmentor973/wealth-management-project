import React, { useState } from "react";
import { simulateInvestment } from "../services/simulation"; // make sure path is correct

function SimulationForm() {
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Call backend simulation API
      await simulateInvestment({ expectedReturn, duration, monthlyContribution });
      setMessage("✅ Simulation submitted successfully!");
      setExpectedReturn("");
      setDuration("");
      setMonthlyContribution("");
    } catch (error) {
      setMessage("❌ Failed to submit simulation. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Simulation Input Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Expected Return (%)"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Duration (months)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Monthly Contribution"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default SimulationForm;
