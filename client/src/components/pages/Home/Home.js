import React, { useEffect } from 'react';

import Footer from '../../components/Footer/Footer';
import HowComponent from '../../components/How/HowComponent';
import WhyComponent from '../../components/Why/WhyComponent';

export default function Home(){

    useEffect(() => {
        document.title = 'Welcome to Safar'
    },[])

    return (
        <>
            <HowComponent /> 
            <WhyComponent />
            <Footer />
        </>
    )
}