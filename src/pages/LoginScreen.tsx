import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginscreen.module.css";

interface Login {
  username: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please fill in all fields.");
      return;
    }

    const loginData: Login = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/products");
        localStorage.setItem("token", data.token);
        console.log("Login successful:", data);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles["login-screen"]}>
      <h2>Login</h2>
      <form>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className={styles["error-message"]}>{error}</div>}
        <div className={styles.buttons}>
          <button type="button" className={styles.button} onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
