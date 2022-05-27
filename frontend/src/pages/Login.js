import React from "react";
import Authentication from "../components/Authentication/Authentication.js";
import Header from "../components/Header/Header.js";
//import IdentificationForm from "../components/IdentificationForm/IdentificationForm";
//import "./Login.scss"

const Login = () => {
  return (
    <>
      <Header />
      <Authentication />
      {/* <main>
        <IdentificationForm />
      </main> */}
    </>
  );
};

export default Login;
