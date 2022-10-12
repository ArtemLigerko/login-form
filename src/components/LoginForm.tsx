import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let schema = yup
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "You password must contain: "
      ),
  })
  .required();

// schema
//   .validate({ email: "artmarket81@gmail.con", password: "Qwerty@12345" })
//   .catch((err) => {
//     console.log(err.name);
//   });
interface IFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  console.log(watch("email"));

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // style={{ display: "flex", justifyContent: "center" }}
      >
        <label>
          Email:
          <input {...register("email", { required: true })} />
        </label>
        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}

        <label>
          Password:
          <input
            {...register("password", {
              required: true,
            })}
          />
        </label>
        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
