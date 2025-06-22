import React from 'react';
import FormInput from '../FormInput'; // Reusable Input Field component
import FileUpload from '../FileUpload'; // File Upload component
import { RxPerson } from "react-icons/rx";
import { PiPhoneThin } from "react-icons/pi";
import { MdCalendarToday } from "react-icons/md";
import { useDispatch, } from 'react-redux';
// import {  setFormData } from '../../../Redux/formData/formSlice';
import {  setFormData } from '../../../../Redux/formData/formSlice';

const PersonalInfoForm = ({ formik, type,minDate }) => {
 const dispatch = useDispatch();

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));  // Update form data in Redux
    formik.handleChange(e);
  };


return  <>

    <FormInput
      name="guestName"
      type="text"
      placeholder="Enter Guest Name"
      icon={<RxPerson />}
      value={formik.values.guestName}
      onChange={handleInputChange}
      // onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.guestName && formik.errors.guestName}
    />

    <FormInput
      name="mobileNumber"
      type="text"
      placeholder="Enter Mobile Number"
      icon={<PiPhoneThin />}
      value={formik.values.mobileNumber}
      onChange={handleInputChange}
      onBlur={formik.handleBlur}
      error={formik.touched.mobileNumber && formik.errors.mobileNumber}
    />

    <FormInput
      name="checkInDate"
      type="date"
      placeholder="Check-In Date"
      icon={<MdCalendarToday />}
      value={formik.values.checkInDate}
      onChange={handleInputChange}
      onBlur={formik.handleBlur}
      error={formik.touched.checkInDate && formik.errors.checkInDate}
      min={minDate} // Set the min date
    />

    <FormInput
      name="checkOutDate"
      type="date"
      placeholder="Check-Out Date"
      icon={<MdCalendarToday />}
      value={formik.values.checkOutDate}
      onChange={handleInputChange}
      onBlur={formik.handleBlur}
      error={formik.touched.checkOutDate && formik.errors.checkOutDate}
      min={minDate} // Set the min date
    />

    {type === 'Foreigners' && (
      <FormInput
        name="visaExpiryDate"
        type="date"
        placeholder="Visa Expiry Date"
        icon={<MdCalendarToday />}
        value={formik.values.visaExpiryDate}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        error={formik.touched.visaExpiryDate && formik.errors.visaExpiryDate}
        min={minDate} // Set the min date
      />
    )}

    <FileUpload type={type}  formik={formik} error={formik.touched.uploadFile && formik.errors.uploadFile} />
  </>
};

export default PersonalInfoForm;
