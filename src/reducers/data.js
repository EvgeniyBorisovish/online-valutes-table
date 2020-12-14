import {START_GET_DATA,REQUEST_DATA,REQUEST_DATA_FINISHED,SUCCESS_GET_DATA} from '../constants/actions'

const initialState = {
    data_arr: [],
    data_obj: {},
    requestData: true,
    loading: false,
}

export const data = (state = initialState,action)=> {

  switch (action.type) {
       case START_GET_DATA:
          return {
              ...state,
              loading: true,
              requestData: true,
          };

      case REQUEST_DATA:
          return {
              ...state,
              requestData: false
          }
      case REQUEST_DATA_FINISHED:
          return {
              ...state,
              requestData: true
          }

      case SUCCESS_GET_DATA:
         if (action.payload.data_arr.length){
            state.data_arr.push(action.payload.data_arr[0])
         }
         
        
          return {
              ...state,
              loading: action.payload.loading,
              data_arr: [ ...state.data_arr],
              data_obj: {...state.data_obj, ...action.payload.data_obj },
          };
      default:
          return state;
  }
}