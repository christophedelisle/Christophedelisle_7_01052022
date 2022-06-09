import React, { useState } from "react";
import Hall from "./Hall/Hall";
import Form from "./Formulaire/Formulaire";

// Login page authentication component

const Authentification = () => {
  // Different states with default state on "login"
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
      {/* If status on register, display account creation form, or else login form */}
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
