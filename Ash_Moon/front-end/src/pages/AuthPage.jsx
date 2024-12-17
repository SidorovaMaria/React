import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/user/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { formatDate } from "../utils/helperFunctions";

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authWay, setAuthWay] = useState("register");
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    DOB: "",
    role: "client",
  });
  const [userLogIn, setUserLogIn] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function updateUserRegister(value) {
    return setUserRegister((prev) => {
      return { ...prev, ...value };
    });
  }

  function updateUserLogIn(value) {
    return setUserLogIn((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (userRegister.confirmPassword !== userRegister.password) {
      setError("Passwords do not match");
      return;
    }
    const { username, email, password, DOB, role } = userRegister;

    try {
      // 1. Register teh user in Firebase
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userFirebase = userCredentials.user;

      // Get the Firebase ID token
      const token = await userFirebase.getIdToken();

      // Send User Data to the backend

      const response = await fetch("http://localhost:5050/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userFirebase.uid,
          username,
          email: userFirebase.email,
          DOB,
          role,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed!");
      }

      dispatch(
        setUser({
          uid: userFirebase.uid,
          email: userFirebase.email,
          username,
          DOB,
          role,
          CreatedAt: formatDate(new Date()),
          profileImg:
            "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1734461978~exp=1734465578~hmac=200d19bcccd7b0ca87660f7d155becb92fe029b70ba34770ffb7f3df0a5c89e8&w=1380",
        })
      );
      alert("Registration successful! You can now log in.");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    // console.log(userLogIn);
    try {
      const { email, password } = userLogIn;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userCredential);
      const token = await userCredential.user.getIdToken();
      const response = await fetch("http://localhost:5050/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token, // Send Firebase token for validation
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      dispatch(
        setUser({
          ...data.user,
        })
      );
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 my-20 justify-center items-center">
        <div className="flex justify-center items-center font-AS-3D text-4xl gap-3 ">
          <h2
            className={`${authWay === "register" ? "font-AS" : "font-AS-3D"}`}
            onClick={() => setAuthWay("register")}
          >
            Register
          </h2>
          /
          <h2
            className={`${authWay === "login" ? "font-AS" : "font-AS-3D"}`}
            onClick={() => setAuthWay("login")}
          >
            LogIn
          </h2>{" "}
        </div>
        {/* Error */}
        {error && (
          <p className="font-AS-Bold tracking-wider text-xl text-accent underline underline-offset-1 p-0 m-0 ">
            {error}
          </p>
        )}

        <div>
          {authWay === "register" ? (
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              {/* Full Name */}
              <div className="flex gap-1 flex-col">
                <label htmlFor="username" className="font-AS text-xl pl-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Full name"
                  value={userRegister.username}
                  required
                  className="outline-accent p-2 rounded-xl px-4 text-main font-mitr font-semibold italic"
                  onChange={(e) =>
                    updateUserRegister({ username: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="flex gap-1 flex-col">
                <label htmlFor="email" className="font-AS text-xl pl-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={userRegister.email}
                  required
                  className="outline-accent p-2 rounded-xl px-4 text-main font-mitr font-semibold italic"
                  onChange={(e) =>
                    updateUserRegister({ email: e.target.value })
                  }
                />
              </div>

              {/* Password Fields */}
              <div className="flex gap-4 flex-col md:flex-row items-center">
                <div className="flex gap-1 flex-col">
                  <label htmlFor="password" className="font-AS text-xl pl-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={userRegister.password}
                    required
                    className="outline-accent p-2 rounded-xl px-4 text-main font-mitr font-semibold italic"
                    onChange={(e) =>
                      updateUserRegister({ password: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-1 flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="font-AS text-xl pl-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={userRegister.confirmPassword}
                    required
                    className="outline-accent p-2 rounded-xl px-4 text-main font-mitr font-semibold italic"
                    onChange={(e) =>
                      updateUserRegister({ confirmPassword: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* DOB Field */}
              <div className="flex gap-1 flex-col">
                <label htmlFor="DOB" className="font-AS text-xl pl-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="DOB"
                  value={userRegister.DOB}
                  required
                  className="outline-accent p-2 rounded-xl px-4 text-main font-mitr font-semibold italic"
                  onChange={(e) => updateUserRegister({ DOB: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <input
                type="submit"
                value="Register"
                className="whitespace-nowrap text-2xl pl-3 pr-4 py-1 font-AS-3D border-2 rounded-lg hover:bg-white hover:font-AS-3D-Bold hover:text-main disabled:opacity-50"
              />
            </form>
          ) : (
            <form
              className="flex flex-col gap-4 min-w-[20vw]"
              onSubmit={handleLogIn}
            >
              {/* Email */}
              <div className="flex gap-1 flex-col">
                <label htmlFor="emailLogin" className="font-AS text-xl pl-1">
                  Email
                </label>
                <input
                  type="email"
                  id="emailLogin"
                  placeholder="Email"
                  value={userLogIn.email}
                  required
                  className="outline-accent p-2 rounded-xl px-4 text-main font-mitr font-semibold italic"
                  onChange={(e) => updateUserLogIn({ email: e.target.value })}
                />
              </div>

              {/* Password */}
              <div className="flex gap-1 flex-col">
                <label htmlFor="passwordLogin" className="font-AS text-xl pl-1">
                  Password
                </label>
                <input
                  type="password"
                  id="passwordLogin"
                  placeholder="Password"
                  value={userLogIn.password}
                  required
                  className="outline-accent p-2 rounded-xl px-4 text-main font-mitr font-semibold italic"
                  onChange={(e) =>
                    updateUserLogIn({ password: e.target.value })
                  }
                />
              </div>

              <input
                type="submit"
                value="Log In"
                className="whitespace-nowrap text-2xl pl-3 pr-4 py-1 font-AS-3D border-2 rounded-lg hover:bg-white hover:font-AS-3D-Bold hover:text-main disabled:opacity-50"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
