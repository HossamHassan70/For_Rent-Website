// import Form from "react-bootstrap/Form";
// import BtnsCo from "./Btns";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Rev(props) {
//   const [reviews, setReviews] = useState([]);
//   const [revs, setRevs] = useState("");
//   const [sessionLogin, setSessionLogin] = useState(null);
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [editedReviewText, setEditedReviewText] = useState("");

//   const onChangeH = (e) => {
//     setRevs(e.target.value);
//   };

//   const createRev = async () => {
//     try {
//       await axios.post("https://api-generator.retool.com/mO7BTB/data", {
//         Rate: 5,
//         fName: sessionLogin[0].fullname,
//         Reviews: revs,
//         Fullname: sessionLogin[0].fullname,
//       });
//       // After successful post, fetch updated data
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
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [sessionLogin]); // Reload data when sessionLogin changes

//   const deleteRev = async (id) => {
//     try {
//       await axios.delete(`https://api-generator.retool.com/mO7BTB/data/${id}`);
//       // After successful delete, fetch updated data
//       loadData();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   const editRev = (id, revs) => {
//     axios.patch(`https://api-generator.retool.com/mO7BTB/data/${id}`, {
//       Reviews: revs,
//     });
//   };

//   return (
//     <>
//       {reviews.map((rev) => (
//         <div
//           className="d-flex gap-2 pt-3 align-items-end border-bottom"
//           key={rev.id}
//         >
//           <div className="d-flex gap-1">
//             <div>
//               <p className="m-0">{rev.Fullname}</p>
//               <div>{rev.Reviews}</div>
//             </div>
//           </div>

//           <div>
//             <p className="m-0">{rev.Rate}</p>
//           </div>
//           {sessionLogin[0].fullname === rev.Fullname && (
//             <BtnsCo
//               btnAct={() => deleteRev(rev.id)}
//               btnType="submit"
//               btnCo="danger"
//               btnText="remove"
//             />
//           )}
//           {sessionLogin[0].fullname === rev.Fullname && (
//             <BtnsCo btnType="submit" btnCo="primary" btnText="edit" />
//           )}
//         </div>
//       ))}

//       <div className="d-flex gap-2 pt-3 align-items-end ">
//         <div className="d-flex flex-column gap-1 ">
//           {sessionLogin && sessionLogin.length > 0 && (
//             <p className="m-0">{sessionLogin[0].fullname}</p>
//           )}

//           <Form.Control
//             onChange={onChangeH}
//             value={revs}
//             type="text"
//             placeholder="Please Add Review"
//           />
//         </div>

//         <div className="d-flex ">
//           <BtnsCo
//             btnAct={createRev}
//             btnType="submit"
//             btnCs={{ backgroundColor: "#008f97" }}
//             btnCo="primary"
//             btnText="Add"
//           />

//           {reviews.length > 0 && <p className="m-0">{reviews[0].ratings}</p>}
//         </div>
//       </div>
//     </>
//   );
// }
import Form from "react-bootstrap/Form";
import BtnsCo from "./Btns";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Rev(props) {
  const [reviews, setReviews] = useState([]);
  const [revs, setRevs] = useState("");
  const [sessionLogin, setSessionLogin] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null); // Track the id of the review being edited
  const [editedReviewText, setEditedReviewText] = useState(""); // Track the edited review text

  const onChangeH = (e) => {
    setRevs(e.target.value);
  };

  const createRev = async () => {
    try {
      await axios.post("https://api-generator.retool.com/mO7BTB/data", {
        Rate: 5,
        fName: sessionLogin[0].fullname,
        Reviews: revs,
        Fullname: sessionLogin[0].fullname,
      });
      // After successful post, fetch updated data
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
      // After successful delete, fetch updated data
      loadData();
      console.log("Delete successful");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const editRev = async (id) => {
    try {
      await axios.patch(`https://api-generator.retool.com/mO7BTB/data/${id}`, {
        Reviews: editedReviewText, // Update the review text
      });
      // After successful edit, fetch updated data
      loadData();
      console.log("Edit successful");
      setEditingReviewId(null); // Reset editing state
      setEditedReviewText(""); // Reset edited review text
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  return (
    <>
      {reviews.map((rev) => (
        <div
          className="d-flex gap-2 pt-3 align-items-end border-bottom"
          key={rev.id}
        >
          <div className="d-flex gap-1">
            <div>
              <p className="m-0">{rev.Fullname}</p>
              {editingReviewId === rev.id ? ( 
                <Form.Control
                  value={editedReviewText}
                  onChange={(e) => setEditedReviewText(e.target.value)}
                  type="text"
                  placeholder="Edit Review"
                />
              ) : (
                <div>{rev.Reviews}</div>
              )}
            </div>
          </div>

          <div>
            <p className="m-0">{rev.Rate}</p>
          </div>

          {/* Render edit and delete buttons */}
          {sessionLogin[0].fullname === rev.Fullname && (
            <BtnsCo
              btnAct={() => deleteRev(rev.id)}
              btnType="submit"
              btnCo="danger"
              btnText="remove"
            />
          )}
          {sessionLogin[0].fullname === rev.Fullname && (
            <>
              {editingReviewId === rev.id ? ( // Check if currently editing this review
                <BtnsCo
                  btnAct={() => editRev(rev.id)}
                  btnType="submit"
                  btnCo="primary"
                  btnText="save"
                />
              ) : (
                <BtnsCo
                  btnAct={() => setEditingReviewId(rev.id)} // Set editing state for this review
                  btnType="submit"
                  btnCo="primary"
                  btnText="edit"
                />
              )}
            </>
          )}
        </div>
      ))}

      <div className="d-flex gap-2 pt-3 align-items-end ">
        <div className="d-flex flex-column gap-1 ">
          {sessionLogin && sessionLogin.length > 0 && (
            <p className="m-0">{sessionLogin[0].fullname}</p>
          )}

          <Form.Control
            onChange={onChangeH}
            value={revs}
            type="text"
            placeholder="Please Add Review"
          />
        </div>

        <div className="d-flex ">
          <BtnsCo
            btnAct={createRev}
            btnType="submit"
            btnCs={{ backgroundColor: "#008f97" }}
            btnCo="primary"
            btnText="Add"
          />

          {reviews.length > 0 && <p className="m-0">{reviews[0].ratings}</p>}
        </div>
      </div>
    </>
  );
}
