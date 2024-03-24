import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Badge, Modal, Form } from "react-bootstrap";
import LoadingScreen from "../pages/loadingScreen";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import ReactPaginate from "react-paginate";
import "../pages/css/requests.css";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [customRejectionReason, setCustomRejectionReason] = useState("");
  const rejectionReasons = [
    "Property already rented out.",
    "Request does not meet property requirements.",
    "Property is undergoing maintenance.",
    "Property is reserved for another applicant.",
  ];
  // Acceptance alert
  const [showAlert, setShowAlert] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState("");
  const token = useSelector((state) => state.authReducer.refreshToken);
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  // console.log(propertyRequests)

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const uid = decodedToken.user.id;
        const userRole = decodedToken.user.role;
        setUserId(uid);
        setUserRole(userRole);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property requests
        const requestsResponse = await axios.get(
          `http://127.0.0.1:8000/requests/`
        );

        // Filter requests based on user role
        let filteredRequests = [];
        if (userRole === "Owner") {
          filteredRequests = requestsResponse.data.filter(
            (request) => request.owner === userId
          );
        } else if (userRole === "Renter") {
          filteredRequests = requestsResponse.data.filter(
            (request) => request.renter === userId
          );
        }

        // Set property requests
        setPropertyRequests(filteredRequests);

        // Fetch property and renter details
        const addedDetails = await Promise.all(
          filteredRequests.map(async (request) => {
            const propertyDetails = await fetchPropertyDetails(request.property);
            const renterDetails = await fetchUserDetails(request.renter);
            return { ...request, propertyDetails: propertyDetails, renterDetails: renterDetails };
          })
        );

        setPropertyRequests(addedDetails);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, userId, userRole]);

  const fetchPropertyDetails = async (propertyId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/properties/${propertyId}`
      );
      return {
        title: response.data.title,
        availability: response.data.availability,
        image: response.data.image
      };
    } catch (error) {
      console.error("Error fetching property details:", error);
      return null;
    }
  };


  const fetchUserDetails = async (renterId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/users/${renterId}`
      );
      return {
        email: response.data.email,
        name: response.data.name
      };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPage(selectedPage);
  };

  // Accept Button
  const handleAccept = async (id) => {
    try {
      const requestToUpdate = propertyRequests.find(
        (request) => request.id === id
      );
      const updatedRequest = {
        ...requestToUpdate,
        is_accepted: true,
        is_rejected: false,
      };

      await axios.put(`http://127.0.0.1:8000/requests/${id}/`, updatedRequest);

      // Update the state to reflect the changes
      setPropertyRequests((prevRequests) => {
        return prevRequests.map((request) => {
          if (request.id === id) {
            return updatedRequest;
          }
          return request;
        });
      });

      // Send email for acceptance
      const acceptanceServiceId = "service_21hdjtz";
      const acceptanceTemplateId = "template_io83mns";
      const acceptancePublicKey = "xr6_cNCqHsf9TrFPu";
      const acceptanceData = {
        service_id: acceptanceServiceId,
        template_id: acceptanceTemplateId,
        user_id: acceptancePublicKey,
        template_params: {
          username: requestToUpdate.renterDetails.name,
          property_name: requestToUpdate.propertyDetails.title,
          message: "Your request has been accepted.",
          payment_link: `http://localhost:3000/payment/${requestToUpdate.id}/`,
          to_email: requestToUpdate.renterDetails.email
        },
      };

      // Send the email using EmailJS
      await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        acceptanceData
      );

      // Display alert when accept button is clicked
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // handle rejection in the modal
  const handleSubmitRejectModal = async () => {
    try {
      const requestToUpdate = propertyRequests.find(
        (request) => request.id === selectedRequestId
      );
      const updatedRequest = {
        ...requestToUpdate,
        is_accepted: false,
        is_rejected: true,
        rejection_reason: rejectionReason === "Other" ? customRejectionReason : rejectionReason,
      };
      await axios.put(
        `http://127.0.0.1:8000/requests/${selectedRequestId}/`,
        updatedRequest
      );

      // Send email for rejection
      const rejectionServiceId = "service_21hdjtz";
      const rejectionTemplateId = "template_o7hhtco";
      const rejectionPublicKey = "xr6_cNCqHsf9TrFPu";
      const rejectionData = {
        service_id: rejectionServiceId,
        template_id: rejectionTemplateId,
        user_id: rejectionPublicKey,
        template_params: {
          username: requestToUpdate.renterDetails.name,
          property_name: requestToUpdate.propertyDetails.title,
          message: "Your request has been rejected.",
          to_email: requestToUpdate.renterDetails.email,
          rejection_reason: rejectionReason === "Other" ? customRejectionReason : rejectionReason,
        },
      };

      // Send the email using EmailJS
      await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        rejectionData
      );

      // to update the page to show changes
      setPropertyRequests((prevRequests) => {
        return prevRequests.map((request) => {
          if (request.id === selectedRequestId) {
            return updatedRequest;
          }
          return request;
        });
      });
      handleCloseRejectModal();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // reject button to open the modal (open modal)
  const handleReject = (id) => {
    setSelectedRequestId(id);
    setShowRejectModal(true);
  };

  // // checkout button
  const handleCheckout = (requestId) => {
    navigate(`/payment/${requestId}/`);
  };

  // reject button in modal (close modal)
  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
    setSelectedRequestId(null);
    setRejectionReason("");
    setCustomRejectionReason("");
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      {/* Acceptance alert */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "1000",
          width: "50%",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {showAlert && (
          <div className="alert alert-success show" role="alert">
            We've notified the client about your accept via email
          </div>
        )}
      </div>

      {propertyRequests.length === 0 ? (
        <p className="no-reviews">You haven't received any request yet.</p>
      ) : (
        <>
          <h2 className="requests-header text-center">My Requests</h2>
          {propertyRequests
            .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
            .map((request) => (
              <Card
                className="mt-4"
                key={request.id}
                style={{ marginBottom: "10px" }}
              >
                <Card.Body className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
                  {request.propertyDetails?.image && (
                    <img
                      src={request.propertyDetails.image}
                      alt="Property"
                      className="property-image mx-auto mx-md-4 mb-3 mb-md-0"
                      style={{
                        width: "100%",
                        maxWidth: "23rem",
                        maxHeight: "20rem",
                        objectFit: "contain",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  )}

                  <div className="flex-grow-1">
                    <div className="card-header">
                      <Card.Title className="card-title">
                        {request.title}
                      </Card.Title>
                      <Card.Text className="card-date">
                        {formatDate(request.created_at)}
                      </Card.Text>
                    </div>

                    <Card.Text className="card-property">
                      {request.propertyDetails?.title}
                      {request.propertyDetails?.availability ? (
                        <span className="mx-3 available">
                          Available
                        </span>
                      ) : (
                        <span className="mx-4 not-available">
                          Rented
                        </span>
                      )}
                    </Card.Text>

                    <Card.Text className="card-message">
                      {request.message}
                    </Card.Text>
                    <Card.Text className="offered-price">
                      {request.price} EGP
                    </Card.Text>

                    {request.is_accepted ? (
                      request.propertyDetails?.availability ? (
                        <Badge className="my-1" bg="success">
                          Accepted - Payment Pending
                        </Badge>
                      ) : (
                        <Badge className="my-1" bg="success">
                          Accepted - Payment Received
                        </Badge>
                      )
                    ) : request.is_rejected ? (
                      <>
                        <Badge className="my-1" bg="danger">
                          Rejected
                        </Badge>
                        <br />
                        {request.rejection_reason && (
                          <p><b>Rejection Reason:</b> <span>{request.rejection_reason}</span></p>
                        )}
                      </>
                    ) : (
                      <Badge className="my-1" bg="secondary">
                        Pending
                      </Badge>
                    )}

                    {userRole === "Owner" &&
                      !request.is_accepted &&
                      !request.is_rejected && (
                        <div className="my-2">
                          {request.propertyDetails?.availability ? (
                            <Button
                              variant="success"
                              onClick={() => handleAccept(request.id)}
                              className="mr-2"
                              style={{
                                borderRadius: "10px",
                                fontWeight: "bold",
                                transition: "background-color 0.3s ease-in-out",
                              }}
                            >
                              Accept
                            </Button>
                          ) : null}

                          <Button
                            variant="danger"
                            onClick={() => handleReject(request.id)}
                            className="mx-2"
                            style={{
                              borderRadius: "10px",
                              fontWeight: "bold",
                              transition: "background-color 0.3s ease-in-out",
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    {userRole === "Renter" &&
                      request.is_accepted && (
                        <div className="my-2">
                          {request.propertyDetails?.availability ? (
                            <Button
                              variant="primary"
                              onClick={() => handleCheckout(request.id)}
                              className="mr-2"
                              style={{
                                borderRadius: "10px",
                                fontWeight: "bold",
                                transition: "background-color 0.3s ease-in-out",
                              }}
                            >
                              CheckOut
                            </Button>
                          ) : null}
                        </div>
                      )}
                  </div>
                </Card.Body>
              </Card>
            ))}

          {propertyRequests.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(propertyRequests.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          )}
        </>
      )}

      {/* reject modal */}
      <Modal show={showRejectModal} onHide={handleCloseRejectModal}>
        <Modal.Header closeButton>
          <Modal.Title>What is the rejection reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="rejectionReason">
            <Form.Label>Reason for Rejection</Form.Label>
            <div>
              {rejectionReasons.map((reason, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  id={`rejectionReason-${index}`}
                  name="rejectionReason"
                  label={reason}
                  value={reason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              ))}
              <Form.Check
                type="radio"
                id="rejectionReason-other"
                name="rejectionReason"
                label="Other"
                value="Other"
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              {rejectionReason === "Other" && (
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={customRejectionReason}
                  onChange={(e) => setCustomRejectionReason(e.target.value)}
                />
              )}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRejectModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmitRejectModal}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Requests;
