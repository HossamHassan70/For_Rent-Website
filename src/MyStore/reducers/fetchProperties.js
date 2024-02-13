  const INITIAL_VALUE = {
    loading: false,
    properties: [],
    error: '',
  };
  
  const propertiesReducer = (state = INITIAL_VALUE, action) => {
    switch (action.type) {
      case 'FETCH_PROPERTIES_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_PROPERTIES_SUCCESS':
        return {
          ...state,
          loading: false,
          properties: action.payload,
          error: '',
        };
      case 'FETCH_PROPERTIES_FAILURE':
        return {
          ...state,
          loading: false,
          properties: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default propertiesReducer;

  // const INITIAL_VALUE = {
  //   loading: false,
  //   properties: [],
  //   error: '',
  // };
  
  // const propertiesReducer = (state = INITIAL_VALUE, action) => {
  //   switch (action.type) {
  //     case 'FETCH_ZILLA_REQUEST':
  //       return {
  //         ...state,
  //         loading: true,
  //       };
  //     case 'FETCH_ZILLA_SUCCESS':
  //       return {
  //         ...state,
  //         loading: false,
  //         properties: action.payload,
  //         error: '',
  //       };
  //     case 'FETCH_ZILLA_FAILURE':
  //       return {
  //         ...state,
  //         loading: false,
  //         properties: [],
  //         error: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
  // };
  
  // export default propertiesReducer;