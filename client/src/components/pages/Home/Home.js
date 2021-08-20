import React, { useEffect } from 'react';

import Footer from '../../components/Footer/Footer';

export default function Home(){

    useEffect(() => {
        document.title = 'Welcome to Safar'
    },[])

    return (
        <>
            <Footer />
        </>
    )
}