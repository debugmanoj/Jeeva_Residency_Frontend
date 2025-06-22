import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../Components/Input/Input';  // Import the reusable Input component
import {checkValidUser} from "../../services/authService.js"
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Redux/auth/authSlice.js';
import { hideLoader, showLoader } from '../../Redux/Loader/loaderSlice.js';

const App = () => {

    const navigate=useNavigate()
    const dispatch =useDispatch()
  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      showPassword: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('email is required')
        .min(3, 'email must be at least 3 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async(values) => {
      try {
       const responseData = await checkValidUser(values);
       

       if(responseData&&responseData.success){
         dispatch(showLoader());
        const { name, email, role } = responseData.data;
        dispatch(setCredentials({ name, email, role }));
        //  await new Promise((resolve) => setTimeout(resolve, 900000000000000000));
                 dispatch(hideLoader());
        navigate("/home")
      
       } 
      } catch (error) {
             dispatch(hideLoader());
      }
   
   
       
    },
  });

  // Toggle password visibility
  const toggleShowPassword = (e) => {

    e.preventDefault();  // Prevent form submission
    formik.setFieldValue('showPassword', !formik.values.showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <div className="w-full max-w-sm p-1 rounded-lg">
        <h2 className="text-2xl font-bold text-left mb-6">Sign in</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Reusable email Input */}
          <div className="mb-4">
            <Input
              type="text"
              name="email"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              showPassword={false}
              className={`${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500 border-2'  // Apply red border if there's an error
                  : 'border-gray-300'
              }`} 
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-2 ml-3">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Reusable Password Input with "Show/Hide" functionality */}
          <div className="mb-4">
            <Input
              type={formik.values.showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              showPassword={true}
              toggleShowPassword={toggleShowPassword}
              className={`${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500 border-2'  // Apply red border if there's an error
                  : 'border-gray-300'
              }`} 
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs mt-2 ml-3">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between mb-4 mt-10">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="rememberMe"
                className="mr-2 text-xs"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="text-xs text-[#595D62]">Remember Me</span>
            </label>
            <a href="#" className="text-xs text-custom-red">
              Forgot Password ?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-red-500 mt-2 text-white py-2 rounded-md text-md hover:bg-red-600"
            disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
