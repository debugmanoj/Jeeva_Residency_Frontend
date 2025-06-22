import React, { useState } from 'react';
import Button from "../../../Components/Button/Button"
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../../Redux/formData/formSlice';

const FileUpload = ({ type, formik,error }) => {
  const formData=useSelector((state)=>state.form.formData)
  const [uploadStatus, setUploadStatus] = useState(null); // State for upload status
  const dispatch=useDispatch()


  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];

    // Reset status before validating the file
    setUploadStatus(null);

    // Validate file (size and format)
    if (file) {
      const isValidFormat = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit

      if (isValidFormat && isValidSize) {
        // Let Formik handle the form field state
        formik.setFieldTouched('uploadFile', true);
        formik.setFieldValue('uploadFile', file);

 // Dispatch the file metadata to Redux (name, size, and type)
        dispatch(setFormData({ uploadFile: { name: file.name, size: file.size, type: file.type } }));
        // dispatch(setFormData({ uploadFile: file }));

        // Set the upload status
        setUploadStatus('Image uploaded successfully');
      } else {
        // Handle invalid file format or size
        formik.setFieldValue('uploadFile', null); // Reset form field
        dispatch(setFormData({ uploadFile: null })); // Reset file in Redux
        setUploadStatus(isValidSize ? 'Unsupported file format' : 'File is too large. Max size is 5MB');
      }
    } else {
      // If no file selected, reset the upload status
      formik.setFieldValue('uploadFile', null); // Reset form field
      dispatch(setFormData({ uploadFile: null })); // Reset file in Redux
      setUploadStatus('');
    }
  };


// Check if uploadFile is set in Redux and show the appropriate upload status
  const displayUploadStatus = formData.uploadFile ? 'Image uploaded successfully' : uploadStatus;

 
  return (
 <>
  <div className="mb-4 flex items-center font-sans p-[4%] bg-[#f5f5f5] rounded-md">
    <div className='w-[13%]'>
      <LiaCloudUploadAltSolid color='gray' size={25} />
    </div>
    <div className="text-sm mt-1 w-[70%]">
      <div className='text-md'>Upload</div>
      <div className='text-gray-500 text-xs'>{type === 'Indians' ? "Upload Your Aadhar Card" : "Upload Your Visa"}</div>
    </div>
    <div className='w-[30%]'>
      <input
        type="file"
        name="uploadFile"
        onChange={handleFileChange}
        // onChange={(e) => {
        //   e.preventDefault()
        //   formik.setFieldTouched('uploadFile', true);
        //   formik.setFieldValue('uploadFile', e.currentTarget.files[0]);
        // }}
        className="hidden"
      />
      <Button
      // type="button"
        text="Upload"
        size="medium"
        onClick={() => document.querySelector('input[name="uploadFile"]').click()}
      />
    </div>
  </div>
     {error && <div className="text-red-500 text-xs mt-2 ml-3 mb-2">{error}</div>}
    {/* Show upload status based on formData */}
      {displayUploadStatus && (
        <div
          className={`text-xs mt-1 ml-3 mb-1 ${displayUploadStatus === 'Image uploaded successfully' ? 'text-green-500' : 'text-red-500'}`}
        >
          {displayUploadStatus}
        </div>
      )}
     </>
 )
};

export default FileUpload;
