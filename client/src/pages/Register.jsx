import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * The handleChange function updates form data and clears any errors for the corresponding input
   * field.
   */
  const handleChange = (e) => {
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

  /**
   * The function `validateForm` checks form data for name, email, password, and confirmPassword
   * validity and sets errors accordingly.
   * @returns The `validateForm` function is returning a boolean value. It returns `true` if there
   * are no errors in the form data, meaning all fields are filled out correctly. It returns `false`
   * if there are errors in the form data, indicating that some fields are missing or do not meet the
   * required criteria.
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe dois contenir au moins 6 caracteres";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * The function `handleSubmit` is an asynchronous function that handles form submission, sends a POST
   * request to register a user, and handles any errors that may occur during the process.
   * @returns The `handleSubmit` function is returning either nothing (undefined) or a Promise if it is
   * called as an asynchronous function.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (error) {
      console.error("Echec de la creation de compte, objet: ", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request made but no response received: ".error.request);
      } else {
        console.error("Error setting up request: ", error.message);
      }
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? error.response.data.errors[0].message
          : "Une erreur s'est produite lors de l'inscription");

      setErrors((prevData) => ({
        ...prevData,
        submit: errorMessage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="register-sidebar">
          <Link to="/" className="logo">
            TaskToZen
          </Link>
        </div>
      </div>
      <div className="register-main">
        <div className="register-content">
          <div className="register-card">
            <div className="card-header">
              <h1 className="page-title">Inscription</h1>
            </div>

            <h2 className="form-title">Creer un nouveau Compte</h2>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className={`form-input ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && (
                  <span className="form-error">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Addresse Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                />
                {errors.password && (
                  <span className="form-error">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
                />
                {errors.confirmPassword && (
                  <span className="form-error">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  "Creer le compte"
                )}
              </button>
              {errors.submit && (
                <div
                  className="form-error"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  {errors.submit}
                </div>
              )}

              <p className="login-link">
                <span>Vous avez deja un compte?</span>
                <Link to="/login"> Connexion</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
