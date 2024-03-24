import { Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/userProfile.css";
import { useParams } from "react-router-dom";
import LoadingScreen from "./loadingScreen";
import profile_photo from "../images/blank_profile.png"

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const { userId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState();
  const [userNum, setUserNum] = useState();
  const [loading, setLoading] = useState(true);
  const editedData = { name: userName, phone_number: userNum };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}`
        );
        setUserNum(userData.phone_number)
        setUserName(userData.name);
        setUserData(response.data);
        if (response.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [userData.name, userData.phone_number, userId]);


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    axios
      .patch(`http://127.0.0.1:8000/api/users/${userId}/`, editedData)
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
          setEditMode(false);
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setUserNum(e.target.value);
  };

  var dateObject = new Date(userData.registration_date);

  var year = dateObject.getFullYear();
  var month = dateObject.getMonth() + 1;
  var day = dateObject.getDate();

  if (loading || !userData) return <LoadingScreen />;
  return (
    <Container fluid className="mt-3 d-flex justify-content-center">
      <Col sm={12} md={4}>
        <div className="user-details-container">
          <h4 className="col-name">User Detail</h4>
          {editMode ? (
            <div>
              {/* Editing form */}
              <div className="circle-image text-center">
                <img
                  src={profile_photo}
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
                        <label htmlFor="firstName">Full Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={userName}
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
                          value={userNum}
                          onChange={handleNumberChange}
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
                  src={profile_photo}
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
              </div>
              <h5 className="sub-title my-2">Information</h5>
              <div className="information-content pt-2">
                {/* Display user details */}
                <div className="flex-container">
                  <p>
                    <b>Full name: &#160;</b> {userData.name}
                  </p>
                  <p>
                    <b>Email: &#160;</b> {userData.email}
                  </p>
                  <p>
                    <b>Phone: &#160;</b> {userData.phone_number}
                  </p>
                  <p>
                    <b>Created at: &#160;</b> {day + "-" + month + "-" + year}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* )} */}
      </Col>
    </Container>
  );
};

export default UserProfile;
