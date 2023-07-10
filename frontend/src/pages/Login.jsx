import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/form/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit(values, actions) {
      console.log(values);
      actions.resetForm();
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formik.values));
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      navigate("/");
    }
  }, [isSuccess, isLoading, navigate]);
  return (
    <div className="bg-blue-50 h-screen p-4 flex justify-center items-center">
      <form className="w-full flex justify-center items-center flex-col mx-auto">
        <Input
          type="text"
          className="mb-3"
          placeholder="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <Input
          type="password"
          className="mb-3"
          placeholder="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button
          className="bg-blue-400 text-white p-2 rounded-md w-full max-w-sm"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
