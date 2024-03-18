import { combineReducers } from "redux";
import AddFaveReduce from "./AddFaveReduce";
import DelFaveReduce from "./DelFaveReduce";

export default combineReducers({
    Rmovie:AddFaveReduce,
    Rdel:DelFaveReduce,
    
})