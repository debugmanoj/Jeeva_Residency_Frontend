// Redux/slices/homeTabsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from '../../services/roomService';

// Async thunk to fetch paginated rooms
export const fetchRooms = createAsyncThunk(
  'homeTabs/fetchRooms',
  async ({ page, activeTab, limit }, { rejectWithValue }) => {
    try {
      const response = await roomService.fetchPaginatedRooms(page, limit, activeTab);
      return response;  // Return room data
    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

// Async thunk to fetch available rooms
export const fetchAvailableRooms = createAsyncThunk(
  'homeTabs/fetchAvailableRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await roomService.fetchAvailableRooms();
      return response;  // Return available rooms data
    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

// Initial state
const initialState = {
  activeTab: 'All',
  paymentActiveTab: "Indians",
  rooms: [],
  availableRoom: { // Corrected here
    selectedRoom: null,
    availableRooms: []
  },
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

// Slice
const homeTabsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.rooms = [];  // Clear rooms when tab changes
      state.page = 1;  // Reset page when tab changes
      state.hasMore = true;  // Reset hasMore flag
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setpaymentActiveTab: (state, action) => {
      state.paymentActiveTab = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.availableRoom.selectedRoom = action.payload; // Set selected room
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        // Append new data while avoiding duplicates
        const uniqueRooms = [
          ...state.rooms,
          ...action.payload.data.filter(
            (newRoom) => !state.rooms.some((existingRoom) => existingRoom._id === newRoom._id)
          ),
        ];
        state.rooms = uniqueRooms;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAvailableRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.availableRoom.availableRooms = action.payload.data; // Corrected here
      })
      .addCase(fetchAvailableRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveTab, setPage, setHasMore, setpaymentActiveTab, setSelectedRoom } = homeTabsSlice.actions;
export default homeTabsSlice.reducer;