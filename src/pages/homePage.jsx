import React from 'react';
import Categories from './../Components/Categories';
import PropertiesList from './propertiesList';
import HeroSection from './../Components/HeroSection';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <PropertiesList />
            <Categories />
        </>
    );
};

export default HomePage;