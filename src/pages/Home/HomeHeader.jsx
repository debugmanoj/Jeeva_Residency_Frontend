import React from 'react'
import { useFormik } from 'formik';
import SearchBar from '../../Components/Search/SearchBar'; // Import the reusable SearchBar component
import { RiNotification2Line } from "react-icons/ri";
import { TbSettings2 } from "react-icons/tb";

const HomeHeader = () => {

      // Formik setup for search query
  const formik = useFormik({
    initialValues: {
      searchQuery: '', // Initial value for the search input
    },
    onSubmit: (values) => {
    },
  });
  return (
    <>
     <div className="flex w-full justify-between mt-2 ">
      <form onSubmit={formik.handleSubmit}>
        <SearchBar
          value={formik.values.searchQuery}
          onChange={formik.handleChange}
          placeholder="Search here"
          name="searchQuery"  // Pass the name here
        />
        {/* Optionally, you can display the form submission */}
      </form>
      <div className='flex items-center'>
        <RiNotification2Line size={16} />
        <TbSettings2  size={16} className='ml-4' />
      </div>
          
    </div>

    </>
  )
}

export default HomeHeader

