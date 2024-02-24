/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/css/review.css";
import ReactStarsS from "./rate";

export default function Rev(props) {
  const [reviews, setReviews] = useState([]);
  const [revs, setRevs] = useState("");
  const [sessionLogin, setSessionLogin] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [revNum, setRevNum] = useState("");
  const [stars, SetStars] = useState();

  useEffect(() => {
    revNumber();
  }, [reviews]);

  const revNumber = () => {
    setRevNum(reviews.length);
  };
  const onChangeH = (e) => {
    setRevs(e.target.value);
  };

  const onChangeR = (e) => {
    SetStars(e.target.value);
  };

  const createRev = async () => {
    try {
      await axios.post("https://api-generator.retool.com/mO7BTB/data", {
        Rate: stars,
        fName: sessionLogin[0].fullname,
        Reviews: revs,
        Fullname: sessionLogin[0].fullname,
      });

      loadData();
      console.log("Post successful");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get(
        "https://api-generator.retool.com/mO7BTB/data"
      );
      setReviews(res.data);
      revNumber();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
    setSessionLogin(sessionLogin);
    console.log(sessionLogin);
  }, []);

  useEffect(() => {
    loadData();
  }, [sessionLogin]);

  const deleteRev = async (id) => {
    try {
      await axios.delete(`https://api-generator.retool.com/mO7BTB/data/${id}`);

      loadData();
      revNumber();
      console.log("Delete successful");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const editRev = async (id) => {
    try {
      await axios.patch(`https://api-generator.retool.com/mO7BTB/data/${id}`, {
        Reviews: editedReviewText,
      });

      loadData();
      console.log("Edit successful");
      setEditingReviewId(null);
      setEditedReviewText("");
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };
  const geneStars = (rating) => {
    let starsHTML = "";
    for (let i = 0; i < rating; i++) {
      starsHTML += '<i class="fa-solid fa-star"></i>';
    }
    return <div dangerouslySetInnerHTML={{ __html: starsHTML }} />;
  };

  return (
    <>
      <h3>Reviews({revNum})</h3>
      {reviews.map((rev) => (
        <>
          <div className="border-bottom pt-3" key={rev.id}>
            <p className="m-0">Client Name: {rev.Fullname}</p>
            <div className="d-flex justify-content-between flex-wrap align-items-center">
              {editingReviewId === rev.id ? (
                <Form.Control
                  value={editedReviewText}
                  onChange={(e) => setEditedReviewText(e.target.value)}
                  type="text"
                  placeholder="Edit Review"
                />
              ) : (
                <p className="m-0">Review: {rev.Reviews}</p>
              )}
              <div className="d-flex gap-3 align-items-center">
                {editingReviewId === rev.id ? (
                  <i
                    onClick={() => editRev(rev.id)}
                    className="fa-solid fa-check"
                  ></i>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <p className="m-0">{geneStars(rev.Rate)}</p>
                    {sessionLogin &&
                      sessionLogin.length > 0 &&
                      sessionLogin[0].fullname === rev.Fullname && (
                        <i
                          onClick={() => deleteRev(rev.id)}
                          className="fa-solid fa-trash"
                        ></i>
                      )}
                    {sessionLogin &&
                      sessionLogin.length > 0 &&
                      sessionLogin[0].fullname === rev.Fullname && (
                        <>
                          {editingReviewId === rev.id ? null : (
                            <i
                              onClick={() => setEditingReviewId(rev.id)}
                              className="fa-solid fa-pen-to-square"
                            ></i>
                          )}
                        </>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <div className="border-bottom pt-3" key={rev.id}>
            <p className="m-0">Client Name: {rev.Fullname}</p>
            <div className="d-flex justify-content-between flex-wrap align-items-center">
              <p className="m-0">Review: {rev.Reviews}</p>
              <div className="d-flex gap-3 align-items-center">
                {editingReviewId === rev.id ? (
                  <div className="d-flex align-items-center">
                    <i
                      onClick={() => editRev(rev.id)}
                      className="fa-solid fa-check"
                    ></i>
                    <Form.Control
                      value={editedReviewText}
                      onChange={(e) => setEditedReviewText(e.target.value)}
                      type="text"
                      placeholder="Edit Review"
                    />
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <p className="m-0">{rev.Rate}</p>
                    {sessionLogin &&
                      sessionLogin.length > 0 &&
                      sessionLogin[0].fullname === rev.Fullname && (
                        <i
                          onClick={() => deleteRev(rev.id)}
                          className="fa-solid fa-trash"
                        ></i>
                      )}
                    {sessionLogin &&
                      sessionLogin.length > 0 &&
                      sessionLogin[0].fullname === rev.Fullname && (
                        <>
                          {editingReviewId === rev.id ? null : ( // No edit icon when editing
                            <i
                              onClick={() => setEditingReviewId(rev.id)}
                              className="fa-solid fa-pen-to-square"
                            ></i>
                          )}
                        </>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {/* <div
            className="d-flex gap-2 align-items-center border-bottom "
            key={rev.id}
          >
            <div className="d-flex pt-3">
              <div className="d-flex flex-column">
                <p className="m-0">{rev.Fullname}</p>
                {editingReviewId === rev.id ? (
                  <Form.Control
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                    type="text"
                    placeholder="Edit Review"
                  />
                ) : (
                  <div className="d-flex align-items-center gap-3">
                    <p className="m-0">{rev.Reviews}</p>
                    <div className="d-flex align-items-center gap-2">
                      <p className="m-0">{rev.Rate}</p>

                      {sessionLogin &&
                        sessionLogin.length > 0 &&
                        sessionLogin[0].fullname === rev.Fullname && (
                          <i
                            onClick={() => deleteRev(rev.id)}
                            class="fa-solid fa-trash"
                          ></i>
                        )}
                      {sessionLogin &&
                        sessionLogin.length > 0 &&
                        sessionLogin[0].fullname === rev.Fullname && (
                          <>
                            {editingReviewId === rev.id ? (
                              <i
                                onClick={() => editRev(rev.id)}
                                class="fa-solid fa-check"
                              ></i>
                            ) : (
                              <i
                                onClick={() => setEditingReviewId(rev.id)}
                                class="fa-solid fa-pen-to-square"
                              ></i>
                            )}
                          </>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </>
      ))}

      {sessionLogin && sessionLogin.length > 0 ? (
        <div className="d-flex gap-2 pt-3 align-items-center ">
          <div className="d-flex flex-column gap-1 ">
            {sessionLogin && sessionLogin.length > 0 && (
              <p className="m-0">{sessionLogin[0].fullname}</p>
            )}
            <div className="d-flex align-items-center gap-2">
              <Form.Control
                onChange={onChangeH}
                value={revs}
                type="text"
                placeholder="Please Add Review"
              />

              <Form.Control
                onChange={onChangeR}
                value={stars}
                type="text"
                placeholder="Please Add Rate"
              />
              {/* <ReactStarsS /> */}
              <i class="fa-solid fa-plus" onClick={createRev}></i>
            </div>
          </div>

          <div className="d-flex ">
            {/* <BtnsCo
              btnAct={createRev}
              btnType="submit"
              btnCs={{ backgroundColor: "#008f97" }}
              btnCo="primary"
              btnText="Add"
            /> */}
            {/* <i class="fa-solid fa-plus"></i> */}
            {reviews.length > 0 && <p className="m-0">{reviews[0].ratings}</p>}
          </div>
        </div>
      ) : (
        <p>Please Login To add Review</p>
      )}
    </>
  );
}
