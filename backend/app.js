// importation du package express
const express = require("express");

const cookieParser = require("cookie-parser");

//Accés aux chemin de notre système de fichier
const path = require("path");

// appel de la methode express (création de l'application)
const app = express();

// déclaration des routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

// interception et mise à disposition du contenu (body) des requetes qui contienne du JSON (=bodyparser)
app.use(express.json());

require("dotenv").config();

// Gestion des problèmes de CORS (cas ou le front et le back sont hébergés sur des serveurs différents)
app.use((req, res, next) => {
  // accés à l'API depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Headers pris en charges
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // méthodes de requetes prisent en charge
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

//Routes

app.use(cookieParser());
//Route pour requéter les images dans le dossier "static" images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// exportation de app pour pouvoir l'utiliser dans d'autres fichiers
module.exports = app;
