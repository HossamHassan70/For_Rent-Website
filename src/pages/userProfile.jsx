import { Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./css/userProfile.css";
import { useParams } from "react-router-dom";
// import OwnerProperties from "../Components/OwnerProperties";
import LoadingScreen from "./loadingScreen";
// import OwnerRequests from "../Components/ownerRequests";
// import ReviewsList from "../Components/reviews";
import { jwtDecode } from "jwt-decode";

// const Emails = ({ userId }) => {
//   const [emails, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `https://jsonplaceholder.typicode.com/users/${userId}/posts`
//         );
//         setPosts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   return (
//     <div>
//       {loading ? (
//         <>
//           <LoadingScreen />
//         </>
//       ) : (
//         <ul className="email-list">
//           {emails.map((email) => (
//             <li key={email.id} className="email-item">
//               <h3 className="email-title">{email.title}</h3>
//               <p className="email-body">{email.body}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const Posts = ({ userId }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `https://dummyjson.com/users/${userId}/posts`
//         );
//         setPosts(response.data.posts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   return (
//     <div>
//       {loading ? (
//         <>
//           <LoadingScreen />
//         </>
//       ) : (
//         <ul className="post-list">
//           {posts.map((post) => (
//             <li key={post.id} className="post-item">
//               <h3 className="post-title">{post.title}</h3>
//               <p className="post-body">{post.body}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const { userId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const prevUserIdRef = useRef(null);
  const [uid, setUid] = useState("");
  const [infos, setInfos] = useState();

  useEffect(() => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      const decodedToken = jwtDecode(refreshToken);
      const userId = decodedToken.user.id;
      const userInfos = decodedToken.user;
      setInfos(userInfos);
      setUid(userId);
    }
  }, []);

  console.log(uid);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUserData({ ...userData });
  };

  const handleSaveClick = () => {
    axios
      .put(`http://127.0.0.1:8000/api/users/${userId}`, editedUserData)
      .then((response) => {
        setUserData(response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${uid}`
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (userId !== prevUserIdRef.current) {
      prevUserIdRef.current = userId;
      fetchData();
    }
  }, []);

  return (
    <Container fluid className="mt-3">
      <Row>
        {/* <Col sm={12} md={3}>
          <h4 className="col-name">User Detail</h4>
          <div className="user-details-container d-flex justify-content-center">
            {editMode ? (
              <div>
                <div className="circle-image text-center">
                  <img
                    src={editedUserData.profile_picture}
                    alt="Profile"
                    className="rounded-circle img-thumbnail"
                    onError={(e) => {
                      e.target.src = "src/images/blank_profile.png";
                    }}
                  />
                  <p className="title">{userData.name}</p>
                  <p className="sub-title">{userData.university}</p>
                </div>

                <div className="my-3 text-center icons-container">
                  <i
                    className="profile-icon my-1 mx-2 far fa-save"
                    onClick={handleSaveClick}
                  ></i>
                  <i
                    className="profile-icon my-1 mx-2 far fa-window-close"
                    onClick={() => setEditMode(false)}
                  ></i>
                </div>

                <h5 className="sub-title my-2">Edit Information</h5>
                <div className="information-content pt-2">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={editedUserData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={editedUserData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="maidenName">Maiden Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="maidenName"
                            value={editedUserData.maidenName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={editedUserData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={editedUserData.address?.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="city">City:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={editedUserData.address?.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={editedUserData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="circle-image text-center">
                  <img
                    src={userData?.profile_picture}
                    alt="Profile"
                    className="rounded-circle img-thumbnail"
                    onError={(e) => {
                      e.target.src = "src/images/blank_profile.png";
                    }}
                  />
                  <p className="title">{userData.name}</p>
                  <p className="sub-title">{userData.university}</p>
                </div>

                <div className="my-3 text-center icons-container">
                  <i
                    className="profile-icon my-1 mx-2 far fa-edit"
                    onClick={handleEditClick}
                  ></i>
                  <i className="profile-icon my-1 mx-2 far fa-envelope"></i>
                  <i className="profile-icon my-1 mx-2 fas fa-phone-alt"></i>
                  <i className="profile-icon my-1 mx-2 fas fa-plus"></i>
                  <i className="profile-icon my-1 mx-2 fas fa-file-medical"></i>
                  <i className="profile-icon my-1 mx-2 far fa-calendar"></i>
                </div>

                <h5 className="sub-title my-2">Information</h5>
                <div className="information-content pt-2">
                  <div className="flex-container">
                    <p>
                      <b>Full name: &#160;</b> {userData?.firstName}{" "}
                      {userData?.lastName}, {userData?.maidenName}
                    </p>
                    <p>
                      <b>Email: &#160;</b> {userData?.email}
                    </p>
                    <p>
                      <b>City: &#160;</b> {userData?.address?.address}
                    </p>
                    <p>
                      <b>Region: &#160;</b> {userData?.address?.city}
                    </p>
                    <p>
                      <b>Phone: &#160;</b> {userData?.phone}
                    </p>
                    <p>
                      <b>Created at: &#160;</b> 15 Dec, 2023
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col> */}
        <Col sm={12} md={3}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <div className="user-details-container">
              <h4 className="col-name">User Detail</h4>
              {editMode ? (
                // Edit mode
                <div>
                  {/* Editing form */}
                  <div className="circle-image text-center">
                    <img
                      src={editedUserData.profile_picture}
                      alt="Profile"
                      className="rounded-circle img-thumbnail"
                      onError={(e) => {
                        e.target.src = "src/images/blank_profile.png";
                      }}
                    />
                    <p className="title">{userData.name}</p>
                  </div>

                  <div className="my-3 text-center icons-container">
                    <i
                      className="profile-icon my-1 mx-2 far fa-save"
                      onClick={handleSaveClick}
                    ></i>
                    <i
                      className="profile-icon my-1 mx-2 far fa-window-close"
                      onClick={() => setEditMode(false)}
                    ></i>
                  </div>
                  <h5 className="sub-title my-2">Edit Information</h5>
                  <div className="information-content pt-2">
                    {/* Input fields for editing */}
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={editedUserData.first_name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={editedUserData.last_name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              value={editedUserData.phone_number}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Display mode
                <div>
                  {/* Display user information */}
                  <div className="circle-image text-center">
                    <img
                      src={userData?.profile_picture}
                      alt="Profile"
                      className="rounded-circle img-thumbnail"
                      onError={(e) => {
                        e.target.src = "src/images/blank_profile.png";
                      }}
                    />
                    <p className="title">{userData.name}</p>
                  </div>

                  <div className="my-3 text-center icons-container">
                    <i
                      className="profile-icon my-1 mx-2 far fa-edit"
                      onClick={handleEditClick}
                    ></i>
                    {/* Other icons */}
                  </div>
                  <h5 className="sub-title my-2">Information</h5>
                  <div className="information-content pt-2">
                    {/* Display user details */}
                    <div className="flex-container">
                      <p>
                        <b>Full name: &#160;</b> {infos.firstName}
                      </p>
                      <p>
                        <b>Email: &#160;</b> {infos.email}
                      </p>
                      <p>
                        <b>Date Of Birth: &#160;</b> {infos.DOB}
                      </p>
                      <p>
                        <b>Phone: &#160;</b> {infos.phoneNumber}
                      </p>
                      <p>
                        <b>Created at: &#160;</b> {infos.registration_date}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Col>
        {/* right column */}
        {/* <Col sm={12} md={9}>
          <h4 className="col-name">Activities</h4>

          <Nav
            className="custom-nav user-details-container d-flex justify-content-around"
            tabs
          >
            <NavItem>
              <NavLink
                className={activeNavItem === "posts" ? "active" : ""}
                onClick={() => handleNavItemClicked("posts")}
              >
                Posts
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeNavItem === "emails" ? "active" : ""}
                onClick={() => handleNavItemClicked("emails")}
              >
                Emails
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeNavItem === "reviews" ? "active" : ""}
                onClick={() => handleNavItemClicked("reviews")}
              >
                My Reviews
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeNavItem === "requests" ? "active" : ""}
                onClick={() => handleNavItemClicked("requests")}
              >
                My Requests
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeNavItem === "properties" ? "active" : ""}
                onClick={() => handleNavItemClicked("properties")}
              >
                My Properties
              </NavLink>
            </NavItem>
          </Nav>

          <div>{renderContent()}</div>
        </Col> */}
      </Row>
    </Container>
  );
};

export default UserProfile;
