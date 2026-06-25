const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Token Manquant" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expiré. Veuillez vous connecter a nouveau" });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token invalide" });
      }

      return res.status(401).json({message: "Echec de l'authentification du token'"})
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Utilisateur non trouve. Veuillez vous connecter" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Erreur d'authentification: ", err);
    res
      .status(500)
      .json({ message: "Erreur Serveur lors de l'authentification" });
  }
};
