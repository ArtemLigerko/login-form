// import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/LoginForm.scss";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Please, enter a valid email")
      .email("Please, enter a valid email"),
    password: yup.string().required("Enter password"),
  })
  .required();

interface IFormInputs {
  email: string;
  password: string;
}

const loginData = {
  email: "test@gmail.com",
  password: "test",
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
      alert(`Welcome! 
      ${JSON.stringify(data)}`);
    } else {
      console.log("Wrong password or email");
      alert(
        `Wrong password or email! 
        (Test email: "test@gmail.com", password: "test")`
      );
    }
    reset();
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Hi, you can login here</h2>
        <label>Email:</label>
        <input type="text" {...register("email")} />

        <p>
          {errors?.email && <span>{errors?.email?.message || "Error!"}</span>}
        </p>

        <label>Password:</label>
        <input type="password" {...register("password")} />
        <p>
          {errors?.password && (
            <span>{errors?.password?.message || "Error!"}</span>
          )}
        </p>

        <div className="button">
          <input className="button-login" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
