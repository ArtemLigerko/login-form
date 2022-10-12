// import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/LoginForm.scss";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Enter Email")
      .email("Please, enter a valid email"),
    password: yup
      .string()
      .required("Enter password")
      .min(8, "You password must conrains min 8 characters")
      .matches(
        /^(?=.*[A-Z])/,
        "You password must contain at least one uppercase character"
      )
      .matches(
        /^(?=.*[a-z])/,
        "You password must contain at least one lowercase character"
      )
      .matches(
        /^(?=.*[0-9])/,
        "You password must contain at least one digit character"
      )
      .matches(
        /^(?=.*[!@#$%^&*-])/,
        "You password must contain at least one special character (!@#$%^&*)"
      ),
  })
  .required();

interface IFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    reset();
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login:</h2>
        <label>
          <p>Email:</p>
          <input type="text" {...register("email")} />
        </label>

        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}

        <label>
          <p>Password:</p>
          <input type="password" {...register("password")} />
        </label>
        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}

        <input type="submit" value="Login" disabled={!isValid} />
      </form>
    </div>
  );
};

export default LoginForm;
