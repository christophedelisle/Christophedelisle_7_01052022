import React, { useState } from "react";
import Hall from "./Hall/Hall";
import Form from "./Formulaire/Formulaire";

const Authentification = () => {
  const [State, UpState] = useState({
    Login: "login",
    Register: null,
  });

  const UseLogin = () => {
    UpState({
      Login: "login",
      Register: null,
    });
  };

  const UseRegister = () => {
    UpState({
      Login: null,
      Register: "register",
    });
  };

  return (
    <div className="auth_ctn">
      <div className="reg-log_ctn">
        <Hall
          onClick={UseLogin}
          className={
            State.Login === "login" ? "use use-style use-style__login" : "use"
          }
        >
          Se connecter
        </Hall>
        <Hall
          onClick={UseRegister}
          className={
            State.Register === "register"
              ? "use use-style use-style__signup"
              : "use"
          }
        >
          Créer un compte
        </Hall>
      </div>
      {State.Register === "register" ? (
        <>
          <Form form="register" />
        </>
      ) : (
        <>
          <Form form="login" />
        </>
      )}
    </div>
  );
};

export default Authentification;
