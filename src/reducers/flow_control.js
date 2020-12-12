import {PAUSED,CANSEL_PAUSED} from '../constants/actions'

const initialState = {paused: false}

 export const flow_control = (state = initialState,action) => {

   // console.log(action)

  switch (action.type) {
         case PAUSED:
          return {
              ...state,
              paused: true
          }
      case CANSEL_PAUSED:

          return {
              ...state,
              paused: false
          }
     
      default:
          return state;
  }
}