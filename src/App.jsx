import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from "./Components/Loader/Loader"

const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const Home = lazy(() => import('./pages/Home/Home'));
const Expense = lazy(() => import('./pages/Expense/Expense'));
const AvailableRooms = lazy(() => import('./pages/Home/AvailalbeRooms/AvailableRooms'));
const DetailsPage=lazy(() => import('./pages/Home/DetailsPage/DetailsPage'))
const Booked=lazy(() => import('./pages/Home/DetailsPage/Booked'))
const BookSummary=lazy(() => import('./pages/Home/DetailsPage/BookSummary'))

const App = () => {
  const loading = useSelector((state) => state.loader.isLoading); // Get loading state from Redux
  return (
    <>
    {loading && <Loader />}
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/viewAllAvailablerooms" element={<AvailableRooms />} />
            <Route path="/detailsPage" element={<DetailsPage />} />
            <Route path="/bookConfirmation" element={<Booked />} />
            <Route path="/BookSummary" element={<BookSummary />} />

            
          </Routes>

        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App



