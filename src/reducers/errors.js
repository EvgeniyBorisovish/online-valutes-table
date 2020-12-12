
import {ERROR_GET_DATA,CLEAR_ERROR_DATA} from '../constants/actions'

const initialState = {
    error_messages: []
}

export const  errors  =  (
  state = initialState,
  action
) => {
  
  switch (action.type) {
      
      case ERROR_GET_DATA:
        
          return {
              ...state,
              error_messages: [...state.error_messages,action.payload]
          };


        case CLEAR_ERROR_DATA:
          state.error_messages = []
        return {
            ...state,
            error_messages: [...state.error_messages]
        };
      default:
          return state;
  }

}