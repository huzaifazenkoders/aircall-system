"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import { authStyles } from "../styles/authStyles";

const LoginView = () => {
  return (
    <div className={authStyles.pageRoot}>
      <div className={authStyles.pageContent}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginView;
