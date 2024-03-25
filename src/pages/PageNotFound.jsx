import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div id="notfound-div" className='container text-center'
            style={{ height: "68vh" }}>
            <h1 className="text-danger display-1 mt-5 fw-bold">Page Not Found 404</h1>
            <p className="lead fw-bold">Sorry, this page was not found.</p>
            <p className="lead fw-bold">You can go back to <Link className="text-primary" to="/">Home</Link>.</p>
        </div>
    );
}

export default PageNotFound;