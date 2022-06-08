import React, { useState, useRef } from "react";
import Button from "../Button/Button";
import axios from "axios";

// Envoi vers une autre page
import { useNavigate } from "react-router-dom";

// Mise en place de la zone d'inscription et de connexion ( props "form" vers composent Authentification)
const SetForm = ({ form }) => {
  // Déclaration des différents "états"

  const [Usignup, upSignup] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [Ulogin, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  const navigate = useNavigate();

  // Déclaration des références
  const useRefFirstName = useRef();
  const useRefEmail = useRef();
  const useRefPassword = useRef();

  const useRefLoginError = useRef();
  const useRefFirstNameError = useRef();
  const useRefLastNameError = useRef();
  const useRefEmailError = useRef();
  const useRefPasswordError = useRef();
  const useRefAccountCreated = useRef();

  const registerForRef = useRef();

  const { firstname, lastname } = Usignup;

  // Controle (regex) des informations utilisateur
  const checkFirstName = () => {
    if (firstname === "") {
      useRefFirstNameError.current.innerText = "";
    } else {
      const baseRegExp = new RegExp(
        /^[a-zA-Zàâäéèêëïîôöùûüç]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
      );
      const check = baseRegExp.test(String(firstname));
      useRefFirstNameError.current.innerText = `${
        check ? "" : "Prénom non valide"
      }`;
      if (check) return true;
    }
  };

  const checkLastName = () => {
    if (lastname === "") {
      useRefLastNameError.current.innerText = "";
    } else {
      const baseRegExp = new RegExp(
        /^[a-zA-Zàâäéèêëïîôöùûüç]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
      );
      const check = baseRegExp.test(String(lastname));
      useRefLastNameError.current.innerText = `${
        check ? "" : "Nom non valide"
      }`;
      if (check) return true;
    }
  };

  const checkEmail = (email) => {
    if (email === "") {
      useRefEmailError.current.innerText = "";
      return false;
    } else {
      const emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
      );
      const check = emailRegExp.test(String(email));
      useRefEmailError.current.innerText = `${check ? "" : "Email non valide"}`;
      if (check) return true;
    }
  };

  const checkPassword = (password) => {
    if (password === "") {
      useRefPasswordError.current.innerText = "";
    } else {
      const passwordRegExp = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      );
      const check = passwordRegExp.test(String(password));
      useRefPasswordError.current.innerText = `${
        check
          ? ""
          : "8 caractères minimum dont 1 majuscule, 1 minuscule et 1 chiffre"
      }`;
      if (check) return true;
    }
  };

  // Création d'un compte utilisateur
  const signup = async (e) => {
    try {
      e.preventDefault();
      if (
        checkFirstName() &&
        checkLastName() &&
        checkEmail(useRefEmail.current.value) &&
        checkPassword(useRefPassword.current.value)
      ) {
        console.log("testt");
        await axios
          .post("http://localhost:3001/api/auth/signup", Usignup)
          .then((response) => {
            if (response.status === 200) {
              useRefEmailError.current.innerText = response.data.message;
            }

            registerForRef.current.reset();
            if (response.status === 201) {
              setAccountCreated(
                (useRefAccountCreated.current.innerText = response.data.message)
              );
            }
          });
      }
    } catch (err) {
      throw err;
    }
  };

  // Connexion de l'utilisateur
  const login = async (e) => {
    try {
      e.preventDefault();

      await axios
        .post("http://localhost:3001/api/auth/login", Ulogin)
        .then((res) => {
          if (res.status === 201) {
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/posts");
          }
          if (res.status === 200) {
            setLoginError(
              (useRefLoginError.current.innerText = res.data.message)
            );
          }
        });
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {/* Si état est sur register (voir composent Authentification) formulaile création de compte */}
      {form === "register" ? (
        <form className="form" onSubmit={signup} ref={registerForRef}>
          {
            <>
              <input
                className="input_ctn"
                type="text"
                placeholder="Prénom"
                id="firstname"
                name="firstname"
                onChange={(e) =>
                  upSignup({
                    ...Usignup,
                    firstname: e.target.value,
                  })
                }
                onBlur={checkFirstName}
                value={Usignup.firstname}
                ref={useRefFirstName}
              />
              <div
                className="firstname msg-error"
                ref={useRefFirstNameError}
              ></div>
              <input
                className="input_ctn"
                type="text"
                placeholder="Nom"
                id="lastname"
                name="lastname"
                onChange={(e) =>
                  upSignup({
                    ...Usignup,
                    lastname: e.target.value,
                  })
                }
                onBlur={checkLastName}
                value={Usignup.lastname}
              />
              <div
                className="lastname msg-error"
                ref={useRefLastNameError}
              ></div>
              <input
                className="input_ctn"
                type="email"
                placeholder="Adresse email"
                id="email"
                name="email"
                onChange={(e) =>
                  upSignup({ ...Usignup, email: e.target.value })
                }
                onBlur={(e) => checkEmail(e.target.value)}
                value={Usignup.email}
                ref={useRefEmail}
              />
              <div className="email msg-error" ref={useRefEmailError}></div>

              <input
                className="input_ctn"
                type="password"
                placeholder="Mot de passe"
                id="password"
                name="password"
                onChange={(e) =>
                  upSignup({
                    ...Usignup,
                    password: e.target.value,
                  })
                }
                onBlur={(e) => checkPassword(e.target.value)}
                value={Usignup.password}
                ref={useRefPassword}
              />
              <div
                className="password msg-error"
                ref={useRefPasswordError}
              ></div>
            </>
          }

          <Button name="Inscription" />
          <div
            className="account-created msg-succes"
            ref={useRefAccountCreated}
          >
            {accountCreated}
          </div>
        </form>
      ) : (
        // Si état est pas sur register (sur login) formulaire de connexion
        <form className="form" onSubmit={login}>
          <input
            type="email"
            className="input_ctn"
            placeholder="Votre adresse mail"
            id="login-email"
            name="email"
            onChange={(e) =>
              setLogin({
                ...Ulogin,
                email: e.target.value,
              })
            }
            value={Ulogin.email}
          />
          <input
            type="password"
            className="input_ctn"
            placeholder="Votre mot de passe"
            id="login-password"
            name="password"
            onChange={(e) =>
              setLogin({
                ...Ulogin,
                password: e.target.value,
              })
            }
            value={Ulogin.password}
          />
          <div className="login_error" ref={useRefLoginError}>
            {loginError}
          </div>
          <p></p>
          <Button name="Connexion" />
        </form>
      )}
    </>
  );
};

export default SetForm;
