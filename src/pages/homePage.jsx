import React from 'react';
import Categories from './../Components/Categories';
import PropertiesList from './propertiesList';
import HeroSection from './../Components/HeroSection';
import PropertyView from '../pages/view property';
const HomePage = () => {
    return (
        <>
            <HeroSection />
            <PropertiesList />
            <Categories />
            <PropertyView />
        </>
    );
};

export default HomePage;