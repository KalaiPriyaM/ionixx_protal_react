import React from "react";
import LoginForm from "./login-form";
import FormLayout from "../../ui/form-layout";

const Login = () => {
  return (
    <div>
      <FormLayout
        children={<LoginForm />}
        title="Log in to your account"
        description="Welcome back! Please enter your details"
      />
    </div>
  );
};

export default Login;
