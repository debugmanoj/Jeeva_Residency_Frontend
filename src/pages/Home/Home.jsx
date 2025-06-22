import React from 'react';
import HomeHeader from './HomeHeader';
import HomeOverview from './HomeOverview';
import HomeTabs from "./HomeTabs/HomeTabs"
import Layout from '../Layout/Layout';
import { useSelector } from 'react-redux';



const Home = () => {

  const {name,email,role}=useSelector((state)=>state.auth)


  return (
    <Layout>
      <div className='p-3 font-sans'>
        <HomeHeader />
        <HomeOverview />
        <HomeTabs />
      </div>
    </Layout>

  );
};

export default Home;
