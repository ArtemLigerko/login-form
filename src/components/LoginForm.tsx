// import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/LoginForm.scss";

const schema = yup
  .object({
    email: yup.string().required("Please, enter a valid email").email(),
    password: yup.string().required("Enter password"),
  })
  .required();

interface IFormInputs {
  email: string;
  password: string;
}

const loginData = {
  email: "test@gmail.com",
  password: "qwert-11",
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    if (
      data.email === loginData.email &&
      data.password === loginData.password
    ) {
      console.log(data);
      alert(JSON.stringify(data));
    } else {
      console.log("Wrong password or email");
      alert("Wrong password or email");
    }
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

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
