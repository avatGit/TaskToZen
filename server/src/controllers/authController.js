const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Register a new user
// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  console.log("BODY RECU: ", req.body);
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est deja utilise." });
    }

    /*     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); */

    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({ message: "Utilisateur inscrit avec succes.", user });
  } catch (err) {
    console.error("Error in register: ", err);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouve." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
    res
      .status(200)
      .json({ message: "Utilisateur identifie avec succes", token });
  } catch (err) {
    console.error("Error in login: ", err);
    res
      .status(500)
      .json({ message: "Erreur Serveur lors de l'identification" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res.status(200).json({ message: "No User found" });
    }

    res.status(200).json({ users });
    console.log("Users found");
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: "Erreur Serveur." });
  }
};
