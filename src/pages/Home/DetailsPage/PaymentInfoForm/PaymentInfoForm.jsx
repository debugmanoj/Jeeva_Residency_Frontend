import React from 'react';
import FormInput from '../FormInput'; // Reusable Input Field component
import Dropdown from '../../../../Components/DropDown/DropDown';
import { useDispatch } from 'react-redux';
import {setFormData} from "../../../../Redux/formData/formSlice"

const PaymentInfoForm = ({ formik }) => {
   const dispatch = useDispatch(); // Initialize dispatch for Redux

     // Handle form field change and dispatch to Redux
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value); // Let Formik handle the change
    dispatch(setFormData({ [name]: value })); // Dispatch the updated value to Redux
  };

    // Handle dropdown change and dispatch to Redux
  const handleDropdownChange = (value) => {
    formik.setFieldValue('paymentType', value); // Let Formik handle the change
    dispatch(setFormData({ paymentType: value })); // Dispatch the updated value to Redux
  };

 return <>
    <div className="grid grid-cols-2 grid-rows-3 gap-2">
      <div > 
        <label className='text-sm ml-1'>Rent Cost</label>
        <FormInput
        className={"mt-2"}
        name="rentCost"
        type="number"
        placeholder="Rent Cost"
        value={formik.values.rentCost}
        onChange={handleInputChange} // Handle change and dispatch to Redux
        // onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rentCost && formik.errors.rentCost}
      /></div>
      <div >
        <label className='text-sm ml-1'>Discount</label>
        <FormInput
        className={"mt-2"}
        name="discount"
        type="number"
        placeholder="Discount"
        value={formik.values.discount}
        onChange={handleInputChange} // Handle change and dispatch to Redux
        // onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.discount && formik.errors.discount}
      />
      </div>
      <div className="row-start-2">   
         <label className='text-sm ml-1'>Paid</label>
         <FormInput
         className={"mt-2"}
        name="paid"
        type="number"
        placeholder="Paid"
        value={formik.values.paid}
         onChange={handleInputChange} // Handle change and dispatch to Redux
        // onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.paid && formik.errors.paid}
      /></div>
      <div className="row-start-2"> 
        <label className='text-sm ml-1'>Balance</label>
           <FormInput
           className={"mt-2"}
        name="balance"
        type="number"
        placeholder="Balance"
        value={formik.values.balance}
        // onChange={formik.handleChange}
        onChange={handleInputChange} // Handle change and dispatch to Redux
        onBlur={formik.handleBlur}
        error={formik.touched.balance && formik.errors.balance}
      /></div>
      <div className="col-span-2 row-start-3"><div className="mb-4">
        <Dropdown
          label="Payment Type"
          className={"mt-2"}
          value={formik.values.paymentType}
           onChange={handleDropdownChange} // Handle dropdown change and dispatch to Redux
          // onChange={(value) => formik.setFieldValue("paymentType", value)} // Update formik value
          options={['Cash', 'Online']}
          error={formik.touched.paymentType && formik.errors.paymentType}
        />
      </div></div>
    </div>









  </>
};

export default PaymentInfoForm;
