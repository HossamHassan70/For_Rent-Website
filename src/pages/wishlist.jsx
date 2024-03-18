import Card from "../Components/card";
import { useDispatch, useSelector } from "react-redux";
import { DelFave } from "../Store/Actions/DelFave";
import { DelIndex } from "../Store/Actions/DelIndex";

function Fave() {
    const dispatch = useDispatch()

    const myFaves = useSelector((state) => state.Rmovie.movie)

    function delFave(movie){
        dispatch(DelFave(movie))   
    }
    function delIndexFave(index){
        dispatch(DelIndex(index))

    }
    return(
        <>
        { myFaves.length >0?
        <div className="row mx-auto" >
        { myFaves.map((m,i) => { return <div className="col-lg-3 col-md-6 col-sm-12  my-2 card" key={m.id}> <Card title={m}/> <button className="btn btn-danger" onClick={()=>{delFave(i);delIndexFave(i)}}>Delete</button> </div>} )	}
         </div>
        :
        <div className="container mt-5 text-center">
            No favourite Movie To Show
        </div>
         
        }
        </>
    )
}
export default Fave;