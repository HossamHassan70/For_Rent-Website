import React from 'react';
import Categories from './../Components/Categories';
import PropertiesList from './propertiesList';
import HeroSection from './../Components/HeroSection';
import BuildingDesign from './../Components/BuildingDesign'
const HomePage = () => {
    return (
        <>
            <HeroSection />
            <PropertiesList />
            <BuildingDesign/>
            <Categories />
        </>
    );
};

export default HomePage;