import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PersonalInfoForm from './PersonalInform/PersonalInfoForm.jsx';
import PaymentInfoForm from "./PaymentInfoForm/PaymentInfoForm.jsx";

import Button from '../../../Components/Button/Button';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import customerService from '../../../services/customerService.js';
import { hideLoader, showLoader } from '../../../Redux/Loader/loaderSlice.js';
import { useNavigate } from 'react-router-dom';

const FormContent = ({ type, step, setStep }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.form.formData); // Access form data from Redux
  const { selectedRoom } = useSelector((state) => state.rooms.availableRoom); // Access Redux state


  const validationSchemaStep1 = Yup.object({
    guestName: Yup.string().required('Guest name is required'),
    mobileNumber: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Mobile number is not valid')
      .required('Mobile number is required'),
    checkInDate: Yup.date()
      .min(new Date().toISOString().split('T')[0], 'Check-in date must be today or later') // Validate min date for Check-In
      .required('Check-in date is required'),
    checkOutDate: Yup.date()
      .min(new Date().toISOString().split('T')[0], 'Check-out date must be today or later') // Validate min date for Check-Out
      .when('checkInDate', (checkInDate, schema) =>
        checkInDate ? schema.min(checkInDate, 'Check-out date cannot be earlier than check-in date') : schema
      ) // Validate Check-Out date to be later than Check-In date
      .required('Check-out date is required'),
    // checkInDate: Yup.date().required('Check-in date is required'),
    // checkOutDate: Yup.date().required('Check-out date is required'),
    visaExpiryDate: type === 'Foreigners' ? Yup.date().required('Visa expiry date is required') : Yup.date().notRequired(),
    uploadFile: Yup.mixed()
      .required('File is required')
      .test('fileSize', 'File is too large. Max size is 5MB', (value) => value && value.size <= 5 * 1024 * 1024)
      .test('fileFormat', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)),
  });

  const validationSchemaStep2 = Yup.object({
    rentCost: Yup.number().required('Rent cost is required'),
    discount: Yup.number().required('Discount is required'),
    paid: Yup.number().required('Paid amount is required'),
    balance: Yup.number().required('Balance amount is required'),
    paymentType: Yup.string().required('Payment type is required'),
  });

  const formik = useFormik({
    initialValues: formData
    // {
    //   guestName: '',
    //   mobileNumber: '',
    //   checkInDate: new Date().toISOString().split('T')[0],
    //   checkOutDate: '',
    //   visaExpiryDate: '',
    //   uploadFile: null,
    //   rentCost: '',
    //   discount: '',
    //   paid: '',
    //   balance: '',
    //   paymentType: 'Cash',
    //   roomId: selectedRoom?.roomId || '', // Add roomId from selectedRoom
    // }
    ,
    validationSchema: step === 1 ? validationSchemaStep1 : validationSchemaStep2,

    onSubmit: async (values) => {
      // Create a new FormData object
      const formData = new FormData();

      // Append all non-file fields
      formData.append('name', values.guestName);
      formData.append('mobileNumber', values.mobileNumber);
      formData.append('checkIn', values.checkInDate);
      formData.append('checkOut', values.checkOutDate);
      formData.append('nationality', type); // 'Indian' or 'Foreigner'
      formData.append('idProofType', values.idProofType || 'Aadhar'); // Assuming 'Aadhar' as a default value
      formData.append('roomId', values.roomId);
      formData.append('rentCost', values.rentCost);
      formData.append('discount', values.discount);
      formData.append('paid', values.paid);
      formData.append('balance', values.balance);
      formData.append('paymentType', values.paymentType);

      // Append the file(s) to FormData
      if (values.uploadFile) {
        formData.append('idProof', values.uploadFile); // The file field name should match 'idProof' in your backend
      }

      // If nationality is 'Foreigners', include the visa file
      if (type === 'Foreigners' && values.visaExpiryDate) {
        formData.append('visa', values.visaFile);
        formData.append('visaExpiry', values.visaExpiryDate);
      }

      // Now send formData to your backend
      dispatch(showLoader());

      await customerService.createCustomer(formData);

      navigate("/bookConfirmation")
      dispatch(hideLoader());
    },
  });

  const nextStep = async () => {
    // Mark all fields as touched before validation
    formik.setTouched({
      guestName: true,
      mobileNumber: true,
      checkInDate: true,
      checkOutDate: true,
      visaExpiryDate: true,
      uploadFile: true,
      rentCost: true,
      discount: true,
      paid: true,
      balance: true,
      paymentType: true,
      roomId: true, // Mark roomId as touched as well
    });
    const errors = await formik.validateForm();
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      setStep(2); // If valid, move to the next step
    }

    if (isValid && step === 2 && selectedRoom) {
      formik.handleSubmit()
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Example: "2025-06-22"

  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        {step === 1 && <PersonalInfoForm formik={formik} type={type}
          minDate={today}
        />}
        {step === 2 && <PaymentInfoForm formik={formik}
          minDate={today}
        />}
        <Button

          type="button"
          text={step === 2 ? "Submit" : "Next"}
          width="w-full"
          size="small"
          color="bg-red-500 text-white"
          forWardIcon={step === 2 ? null : <IoIosArrowRoundForward size={20} />}
          onClick={nextStep}
        />
      </form>
    </div>
  );
};

export default FormContent;
