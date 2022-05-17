// importation package HTTP de node
const http = require("http");

// importation de l'application
const app = require("./app");

// renvoie d'un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// port écouté par server.listen (selon disponibilité)
const port = normalizePort(process.env.PORT || "3000");

// choix du port à utilisé par express
app.set("port", port);

// géstion des erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création de server pour appeler la méthode "creatServer", qui à pour argument "app".
// Appel de la fonction pour chaque requete envoyée.
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});
// écoute des requetes de "port"
server.listen(port);
