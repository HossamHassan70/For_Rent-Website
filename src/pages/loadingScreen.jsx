import React from 'react';
import { ClipLoader } from 'react-spinners';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <ClipLoader size={"5rem"}/>
    </div>
  );
}

export default LoadingScreen;