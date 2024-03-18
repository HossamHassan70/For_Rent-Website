const InitialValue ={
    movie: []
}

export default function DelFaveReduce(state = InitialValue, action ){
    switch(action.type){
        case "DELFAVE": 
            return {
                ...state,
                movie: [ ...state.movie.slice(0, action.payload),...state.movie.slice(action.payload + 1)]
            }
        default: 
            return state
    }
}