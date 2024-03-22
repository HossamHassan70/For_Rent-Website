import React from 'react';
import PropertiesList from './propertiesList';
import HeroSection from './../Components/HeroSection';
import BuildingDesign from './../Components/BuildingDesign'
const HomePage = () => {
    return (
        <>
            <HeroSection />
            <PropertiesList />
            <BuildingDesign/>
        </>
    );
};

export default HomePage;