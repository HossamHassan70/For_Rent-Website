const InitialValue ={
    movie: [],
    index:[]
}

export default function AddFaveReduce(state = InitialValue, action ){
    switch(action.type){
        case "ADDFAVE": 
            return {
                ...state,
                movie: [...state.movie,action.payload]
            }
        case "DELFAVE": 
            return {
                ...state,
                movie: [ ...state.movie.slice(0, action.payload),...state.movie.slice(action.payload + 1)]
            }
        case "ADDINDEX": 
            return {
                ...state,
                index: [ ...state.index,action.payload]
            }
        case "DELINDEX": 
            return {
                ...state,
                index: [ ...state.index.slice(0, action.payload),...state.index.slice(action.payload + 1)]
            }

        default: 
            return state
    }
}