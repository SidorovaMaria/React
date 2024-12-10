import React, { useState } from "react";

const RegisterPage = () => {
  const [user, setUsername] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = user;

    try {
      const response = await fetch("http://localhost:5050/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! You can now log in.");
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (err) {
      setError(err.message);
    }
  };
  function updateUser(value) {
    return setUsername((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-main">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => updateUser({ username: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => updateUser({ email: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => updateUser({ password: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
