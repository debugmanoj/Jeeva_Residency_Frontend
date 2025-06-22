import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    guestName: '',
    mobileNumber: '',
    checkInDate: new Date().toISOString().split('T')[0],
    // checkInDate: '',
    checkOutDate: '',
    visaExpiryDate: '',
    uploadFile: null,
    rentCost: '',
    discount: '',
    paid: '',
    balance: '',
    paymentType: 'Cash',
    roomId: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
     // Reset form data to initial state
    resetFormData: (state) => {
      state.formData = initialState.formData; // Reset to initial state
    },
     setRoomId: (state, action) => {
      state.formData.roomId = action.payload; // Set roomId from external action
    }
    
  },
});

export const { setFormData,resetFormData,setRoomId} = formSlice.actions;

export const selectFormData = (state) => state.form.formData;

export default formSlice.reducer;
