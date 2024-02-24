import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAction } from '../MyStore/actions/searchAction';

const Search = () => {
    const dispatch = useDispatch();
    // const products = useSelector((state) => state.properties);
    // const loading = useSelector((state) => state.loading);

    const [query, setQuery] = useState('');

    const handleSearch = () => {
        dispatch(searchAction(query));
    };
    // const handleSearch = () => {

    // }
    return (
        <div className="col-md-6 m-0 p-0 border border-light border-5 border-opacity-50">
            <form className="d-flex ">
                <input
                    className="form-control me-0 "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    placeholder="Enter City, state or Zip"
                    aria-label="Search"
                    style={{ borderRadius: "0" }}
                />
                <button
                    className="btn "
                    onClick={handleSearch}
                    type="submit"
                    style={{
                        backgroundColor: "#008f97",
                        color: "white",
                        borderRadius: "0",
                    }}
                >
                    SEARCH
                </button>
            </form>
            {/* {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
                )} */}
        </div>
        // <div>
        //     <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        //     <button onClick={handleSearch}>Search</button>

        //     {loading ? (
        //         <p>Loading...</p>
        //     ) : (
        //         <ul>
        //             {products.map((product) => (
        //                 <li key={product.id}>{product.name}</li>
        //             ))}
        //         </ul>
        //     )}
        // </div>
    );
};

export default Search;