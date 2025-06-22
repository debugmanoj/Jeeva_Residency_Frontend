import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../../Layout/Layout"

import { setpaymentActiveTab } from '../../../Redux/rooms/roomSlice';
import Tabs from "../../../Components/Tabs/Tabs"
import { IoIosArrowRoundBack } from "react-icons/io";
import FormContent from './FormContent'; // Importing FormContent Component
import { useNavigate } from 'react-router-dom';

const DetailsPage = () => {
  const navigate=useNavigate()
  const [step, setStep] = useState(1); // Step control
  const dispatch = useDispatch();
  const { paymentActiveTab } = useSelector((state) => state.rooms); // Get activeTab from Redux store
  const tabs = ['Indians', 'Foreigners'];

  const handleTabClick = (tab) => {

    dispatch(setpaymentActiveTab(tab)); // Dispatch the action to change the active tab
  };

const handleNavigate = () => {
    if (step === 1) {
      navigate("/viewAllAvailablerooms"); // Navigate back to "Available Rooms" on Step 1
    } else if (step === 2) {
      setStep(step - 1); // Go back to Step 1 from Step 2
    }
  };
  

  

  return (
    <Layout>
      <div className="p-6">
        <div   className='flex items-center mb-[13%] cursor-default'>
          <IoIosArrowRoundBack className='cursor-pointer' onClick={handleNavigate}/>
          <span className='ml-[3%] font-extrabold text-xs font-sans '>{step===1?"Available Room":"Personal Infromation"}</span>
        </div>

        {/* Conditionally render tabs */}
        {step === 1 && (
          <Tabs
            tabs={tabs}
            activeTab={paymentActiveTab}
            onTabClick={handleTabClick}
          />
        )}

<div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hidden">
          {/* Directly load the FormContent */}
          <FormContent type={paymentActiveTab} step={step} setStep={setStep} />
        </div>
      </div>
    </Layout>
  );
};

export default DetailsPage;
