import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div id="notfound-div" className='container text-center'
            style={{ height: "60vh" }}>
            <h1 className="text-danger display-1 mt-5">Page Not Found 404</h1>
            <p className="lead">Sorry, this page was not found.</p>
            <p className="lead">You can go back to <Link className="text-primary" to="/">Home</Link>.</p>
        </div>
    );
}

export default PageNotFound;