import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: null,
    role:null,
    email:null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setCredentials: (state, action) => {
        const {name,email,role}=action.payload
        state.name = name;
        state.role = role;
        state.email = email;
      },
      logout: (state) => {
        state.name = null;
        state.role = null;
        state.email = null;
      },
    },
  });
  
  export const { setCredentials, logout } = authSlice.actions;
  
  export default authSlice.reducer;