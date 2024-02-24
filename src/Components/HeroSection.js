import React from "react";


import backgroundImage from "../images/image4.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import { searchAction } from "../MyStore/actions/searchAction";
import Search from "./searchComponent";


const HeroSection = () => {
  // const Search = () => {
  //   const dispatch = useDispatch();
  //   const products = useSelector((state) => state.products);
  //   const loading = useSelector((state) => state.loading);

  //   const [query, setQuery] = useState('');

  //   const handleSearch = () => {
  //     dispatch(searchAction(query));
  //   };
    return (
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          marginTop: "-50px",
        }}
      >
        <div className="container d-flex align-items-center h-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-3 m-0 p-0 border border-light border-5 border-opacity-50">
              <select className="form-select " aria-label="Default select example"
              defaultValue="0">
                <option value="0"> Select Type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <Search/>
            {/* <div className="col-md-6 m-0 p-0 border border-light border-5 border-opacity-50">
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
            </div> */}
          </div>
        </div>
      </div>
    );
  };
// }

export default HeroSection;
