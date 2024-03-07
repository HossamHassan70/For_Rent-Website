// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import Form from "react-bootstrap/Form";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../pages/css/review.css";
// import ReactStarsS from "./rate";
// import BtnsCo from "./Btns";

// export default function Rev(props) {
//   const [reviews, setReviews] = useState([]);
//   const [revs, setRevs] = useState("");
//   const [sessionLogin, setSessionLogin] = useState([]);
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [editedReviewText, setEditedReviewText] = useState("");
//   const [revNum, setRevNum] = useState("");
//   const [stars, SetStars] = useState();
//   const [deleteR, setDeleteR] = useState(false);

//   useEffect(() => {
//     revNumber();
//   }, [reviews]);

//   const revNumber = () => {
//     setRevNum(reviews.length);
//   };
//   const onChangeH = (e) => {
//     setRevs(e.target.value);
//   };

//   const onChangeR = (e) => {
//     SetStars(e.target.value);
//   };

//   // const createRev = async () => {
//   //   try {
//   //     await axios.post("https://api-generator.retool.com/mO7BTB/data", {
//   //       Rate: stars,
//   //       fName: sessionLogin[0].fullname,
//   //       Reviews: revs,
//   //       Fullname: sessionLogin[0].fullname,
//   //     });

//   //     loadData();
//   //     console.log("Post successful");
//   //   } catch (error) {
//   //     console.error("Error posting review:", error);
//   //   }
//   // };

//   const createRev = async () => {
//     try {
//       if (!revs.trim()) {
//         console.error("Review cannot be empty");

//         return;
//       }

//       if (!stars) {
//         console.error("Please provide a rating");

//         return;
//       }

//       if (isNaN(stars)) {
//         console.error("Rating must be a number");

//         return;
//       }

//       const rating = parseFloat(stars);
//       if (rating < 1 || rating > 5) {
//         console.error("Rating must be between 1 and 5");

//         return;
//       }

//       await axios.post("https://api-generator.retool.com/mO7BTB/data", {
//         Rate: rating,
//         fName: sessionLogin[0].fullname,
//         Reviews: revs,
//         Fullname: sessionLogin[0].fullname,
//       });
//       setRevs("");
//       SetStars("");

//       loadData();
//       console.log("Post successful");
//     } catch (error) {
//       console.error("Error posting review:", error);
//     }
//   };

//   const loadData = async () => {
//     try {
//       const res = await axios.get(
//         "https://api-generator.retool.com/mO7BTB/data"
//       );
//       setReviews(res.data);
//       revNumber();
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   useEffect(() => {
//     let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
//     setSessionLogin(sessionLogin);
//     console.log(sessionLogin);
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [sessionLogin]);

//   const deleteRev = async (id) => {
//     try {
//       // await axios.delete(`https://api-generator.retool.com/mO7BTB/data/${id}`);
//       setDeleteR(true);
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   const ConfdeleteRev = async (id) => {
//     try {
//       console.log(id);
//       await axios.delete(`https://api-generator.retool.com/mO7BTB/data/${id}`);
//       loadData();
//       revNumber();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   const editRev = async (id) => {
//     try {
//       await axios.patch(`https://api-generator.retool.com/mO7BTB/data/${id}`, {
//         Reviews: editedReviewText,
//       });

//       loadData();
//       console.log("Edit successful");
//       setEditingReviewId(null);
//       setEditedReviewText("");
//     } catch (error) {
//       console.error("Error editing review:", error);
//     }
//   };
//   const geneStars = (rating) => {
//     let starsHTML = "";
//     for (let i = 0; i < rating; i++) {
//       starsHTML += '<i class="fa-solid fa-star"></i>';
//     }
//     return <div dangerouslySetInnerHTML={{ __html: starsHTML }} />;
//   };

//   return (
//     <>
//       <h3>Reviews({revNum})</h3>
//       {/* {reviews.map((rev) => (
//         <>
//           <div className="border-bottom pb-3 pt-3" key={rev.id}>
//             <p className="m-0">
//               <span
//                 className="p-1 rounded"
//                 style={{ backgroundColor: "#b4eee6" }}
//               >
//                 {rev.Fullname}
//               </span>
//             </p>
//             <div className="d-flex justify-content-between flex-wrap align-items-center">
//               {editingReviewId === rev.id ? (
//                 <Form.Control
//                   value={editedReviewText}
//                   onChange={(e) => setEditedReviewText(e.target.value)}
//                   type="text"
//                   placeholder="Edit Review"
//                 />
//               ) : (
//                 <p className="m-0">Review: {rev.Reviews}</p>
//               )}
//               <div className="d-flex gap-3 align-items-center">
//                 {editingReviewId === rev.id ? (
//                   <i
//                     onClick={() => editRev(rev.id)}
//                     className="fa-solid fa-check"
//                   ></i>
//                 ) : (
//                   <div className="d-flex align-items-center gap-2">
//                     <p className="m-0">{geneStars(rev.Rate)}</p>
//                     {sessionLogin &&
//                       sessionLogin.length > 0 &&
//                       sessionLogin[0].fullname === rev.Fullname && (
//                         <i
//                           onClick={() => deleteRev(rev.id)}
//                           data-bs-toggle="modal"
//                           data-bs-target="#staticBackdrop"
//                           className="fa-solid fa-trash"
//                         ></i>
//                       )}
//                     <div
//                       class="modal fade"
//                       id="staticBackdrop"
//                       data-bs-backdrop="static"
//                       data-bs-keyboard="false"
//                       tabindex="-1"
//                       aria-labelledby="staticBackdropLabel"
//                       aria-hidden="true"
//                     >
//                       <div class="modal-dialog">
//                         <div class="modal-content">
//                           <div class="modal-header">
//                             <h2
//                               class="modal-title fs-5"
//                               id="staticBackdropLabel"
//                             >
//                               Confirm Delete
//                             </h2>
//                             <button
//                               type="button"
//                               class="btn-close"
//                               data-bs-dismiss="modal"
//                               aria-label="Close"
//                             ></button>
//                           </div>
//                           <div class="modal-body">
//                             Are You Sure You want to delete this Review
//                           </div>
//                           <div class="modal-footer">
//                             <BtnsCo
//                               btnAct={() => ConfdeleteRev(rev.id)}
//                               nameM="modal"
//                               btnText="Delete"
//                               btnCo="danger"
//                             />
//                             <BtnsCo
//                               nameM="modal"
//                               btnText="Cancel"
//                               btnCo="primary"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {sessionLogin &&
//                       sessionLogin.length > 0 &&
//                       sessionLogin[0].fullname === rev.Fullname && (
//                         <>
//                           {editingReviewId === rev.id ? null : (
//                             <i
//                               onClick={() => setEditingReviewId(rev.id)}
//                               className="fa-solid fa-pen-to-square"
//                             ></i>
//                           )}
//                         </>
//                       )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       ))} */}
//       {reviews.map((rev) => (
//         <div className="border-bottom pb-3 pt-3" key={rev.id}>
//           <p className="m-0">
//             <span
//               className="p-1 rounded"
//               style={{ backgroundColor: "#b4eee6" }}
//             >
//               {rev.Fullname}
//             </span>
//           </p>
//           <div className="d-flex justify-content-between flex-wrap align-items-center">
//             {editingReviewId === rev.id ? (
//               <Form.Control
//                 value={editedReviewText}
//                 onChange={(e) => setEditedReviewText(e.target.value)}
//                 type="text"
//                 placeholder="Edit Review"
//               />
//             ) : (
//               <p className="m-0">Review: {rev.Reviews}</p>
//             )}
//             <div className="d-flex gap-3 align-items-center">
//               {editingReviewId === rev.id ? (
//                 <i
//                   onClick={() => editRev(rev.id)}
//                   className="fa-solid fa-check"
//                 ></i>
//               ) : (
//                 <div className="d-flex align-items-center gap-2">
//                   <p className="m-0">{geneStars(rev.Rate)}</p>
//                   {sessionLogin &&
//                     sessionLogin.length > 0 &&
//                     sessionLogin[0].fullname === rev.Fullname && (
//                       <i
//                         onClick={() => setDeleteR(rev.id)}
//                         data-bs-toggle="modal"
//                         data-bs-target="#staticBackdrop"
//                         className="fa-solid fa-trash"
//                       ></i>
//                     )}
//                   {sessionLogin &&
//                     sessionLogin.length > 0 &&
//                     sessionLogin[0].fullname === rev.Fullname && (
//                       <div
//                         className="modal fade"
//                         id={`staticBackdrop-${rev.id}`}
//                         data-bs-backdrop="static"
//                         data-bs-keyboard="false"
//                         tabIndex="-1"
//                         aria-labelledby={`staticBackdropLabel-${rev.id}`}
//                         aria-hidden="true"
//                       >
//                         <div className="modal-dialog">
//                           <div className="modal-content">
//                             <div className="modal-header">
//                               <h2
//                                 className="modal-title fs-5"
//                                 id={`staticBackdropLabel-${rev.id}`}
//                               >
//                                 Confirm Delete
//                               </h2>
//                               <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                               ></button>
//                             </div>
//                             <div className="modal-body">
//                               Are You Sure You want to delete this Review
//                             </div>
//                             <div className="modal-footer">
//                               <BtnsCo
//                                 btnAct={() => ConfdeleteRev(rev.id)}
//                                 nameM="modal"
//                                 btnText="Delete"
//                                 btnCo="danger"
//                               />
//                               <BtnsCo
//                                 nameM="modal"
//                                 btnText="Cancel"
//                                 btnCo="primary"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   {sessionLogin &&
//                     sessionLogin.length > 0 &&
//                     sessionLogin[0].fullname === rev.Fullname && (
//                       <>
//                         {editingReviewId === rev.id ? null : (
//                           <i
//                             onClick={() => setEditingReviewId(rev.id)}
//                             className="fa-solid fa-pen-to-square"
//                           ></i>
//                         )}
//                       </>
//                     )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}

//       {sessionLogin && sessionLogin.length > 0 ? (
//         <div className="d-flex gap-2 pt-3 align-items-center ">
//           <div className="d-flex flex-column gap-1 ">
//             {sessionLogin && sessionLogin.length > 0 && (
//               <p className="m-0">{sessionLogin[0].fullname}</p>
//             )}
//             <div className="d-flex align-items-center gap-2">
//               <Form.Control
//                 onChange={onChangeH}
//                 value={revs}
//                 type="text"
//                 placeholder="Please Add Review"
//               />

//               <Form.Control
//                 onChange={onChangeR}
//                 value={stars}
//                 type="text"
//                 placeholder="Please Add Rate"
//               />
//               {/* <ReactStarsS /> */}
//               <i class="fa-solid fa-plus" onClick={createRev}></i>
//             </div>
//           </div>

//           <div className="d-flex ">
//             {reviews.length > 0 && <p className="m-0">{reviews[0].ratings}</p>}
//           </div>
//         </div>
//       ) : (
//         <p>Please Login To add Review</p>
//       )}
//     </>
//   );
// }
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/css/review.css";
import ReactStarsS from "./rate";
import BtnsCo from "./Btns";

export default function Rev(props) {
  const [reviews, setReviews] = useState([]);
  const [revs, setRevs] = useState("");
  const [sessionLogin, setSessionLogin] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [revNum, setRevNum] = useState("");
  const [stars, SetStars] = useState("");
  const [deleteR, setDeleteR] = useState(false);
  const [deleteId, setDeleteId] = useState(""); // New state to hold the id of the review to delete

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
      if (!revs.trim()) {
        console.error("Review cannot be empty");
        return;
      }

      if (!stars) {
        console.error("Please provide a rating");
        return;
      }

      const rating = parseFloat(stars);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        console.error("Rating must be a number between 1 and 5");
        return;
      }

      await axios.post("https://api-generator.retool.com/mO7BTB/data", {
        Rate: rating,
        fName: sessionLogin[0].fullname,
        Reviews: revs,
        Fullname: sessionLogin[0].fullname,
      });
      setRevs("");
      SetStars("");
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

  const deleteRev = (id) => {
    setDeleteR(true);
    setDeleteId(id);
  };

  const ConfdeleteRev = async () => {
    try {
      console.log(deleteId);
      await axios.delete(
        `https://api-generator.retool.com/mO7BTB/data/${deleteId}`
      );
      loadData();
      revNumber();
      console.log("Delete successful");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
    setDeleteR(false); 
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
        <div className="border-bottom pb-3 pt-3" key={rev.id}>
          <p className="m-0">
            <span
              className="p-1 rounded"
              style={{ backgroundColor: "#b4eee6" }}
            >
              {rev.Fullname}
            </span>
          </p>
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
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        className="fa-solid fa-trash"
                      ></i>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div
        className={`modal fade ${deleteR ? "show" : ""}`} 
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="staticBackdropLabel">
                Confirm Delete
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDeleteR(false)} 
              ></button>
            </div>
            <div className="modal-body">
              Are You Sure You want to delete this Review
            </div>
            <div className="modal-footer">
              <BtnsCo
                btnAct={ConfdeleteRev}
                nameM="modal"
                btnText="Delete"
                btnCo="danger"
              />
              <BtnsCo nameM="modal" btnText="Cancel" btnCo="primary" />
            </div>
          </div>
        </div>
      </div>
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
            {reviews.length > 0 && <p className="m-0">{reviews[0].ratings}</p>}
          </div>
        </div>
      ) : (
        <p>Please Login To add Review</p>
      )}
    </>
  );
}
