import React, { useState } from "react";
import { createGoal } from "../services/goals";

function Goals() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createGoal({
        title,
        amount: Number(amount),
      });

      setMessage("✅ Goal created successfully!");
      setTitle("");
      setAmount("");
    } catch (error) {
      setMessage("❌ Failed to create goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Create Goal</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Goal"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Goals;
