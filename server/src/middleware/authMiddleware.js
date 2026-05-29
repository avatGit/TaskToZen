const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Token manquant. Veuillez vous connecter" });
    }

    const token = authHeader.subString(7);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "tokenExpireError") {
        res
          .status(401)
          .json({ message: "Token expiré. Veuillez vous connecter a nouveau" });
      }
      if (err.name === "jsonWebTokenError") {
        res.status(401).json({ message: "Token invalide" });
      }

      throw err;
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Utilisateur non trouve. Veuillez vous connecter" });
    }

    req.user = user;
    req.userId = user._id;
  } catch (err) {
    console.error("Erreur d'authentification: ", err);
    res
      .status(400)
      .json({ message: "Erreur Serveur lors de l'authentification" });
  }
};
