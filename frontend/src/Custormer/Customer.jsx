import React from 'react'
//import Header from './component/layouts/header/Header';
//import Navigation from './component/layouts/navigation/Navigation';
//import Dashboard from './component/layouts/dashboard/Dashboard';
import Sidebar from './component/layouts/dashboard/SideBar';
import Footer from './component/layouts/footer/Footer';

const Customer = () => {
  return (
    <div className="vertical-layout vertical-menu-modern navbar-floating footer-static" data-open="click" data-menu="vertical-menu-modern" data-col="">
   {/*<Header/>*/}
   
   
    {/*<Footer/>*/}
    <Sidebar style={{position:"fixed"}}/>
    
   <Footer/>
    </div>
  )
}

export default Customer