import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div id="notfound-div" className='container text-center'>
            <h1 className="text-danger  m-5">Page Not Found 404</h1> 
            <h4>Sorry This Page Not Found ! </h4>
            <h4>You can go back to <Link className="nav-link active text-primary" aria-current="page" to="/">Home</Link></h4>
        </div>
    );
}

export default PageNotFound;