import React, { useState } from "react";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  const addGoalHandler = (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([...goals, newGoal]);
    setNewGoal("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center" }}>
      <h1>My Goals</h1>
      <form onSubmit={addGoalHandler} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal..."
        />
        <button type="submit">Add Goal</button>
      </form>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>
    </div>
  );
}

export default Goal;
