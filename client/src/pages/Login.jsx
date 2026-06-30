import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import "./Login.css";
import Dashboard from "./dashboard/Dashboard";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");
  const {login} = useAuth()

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    }
  };

  const validateForm = async () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      setErrors({ ...errors, submit: "" });
      setSuccesMessage("Connecté avec succes");
      console.log('Authentifier login.jsx');
      navigate("/dashboard");
      console.log("rediriger vers:",location.pathname)
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrors((prev) => ({
        ...prev,
        submit:
          error.response?.data?.message || "Email ou mot de passse incorrect",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <Link to="/" className="logo">
          TaskToZen
        </Link>

        <div className="login-main">
          <div className="login-content">
            <div className="login-card">
              <div className="card-header">
                <h1 className="card-title">Connexion</h1>
              </div>

              <h2 className="form-title"> Acceder a votre compte</h2>
              <p className="form-subtitle">
                Connectez-vous pour gerer vos taches
              </p>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "input-error" : ""}`}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "input-error" : ""}`}
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner"></span>
                  ) : (
                    "Se Connecter"
                  )}
                </button>
                {(errors.submit || succesMessage) && (
                  <div
                    className={errors.submit ? "form-error" : "form-succes"}
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    {errors.submit || succesMessage}
                  </div>
                )}

                <p className="register-link">
                  <span>Pas encore de compte?</span>
                  <Link to="/register">S'inscrire</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
