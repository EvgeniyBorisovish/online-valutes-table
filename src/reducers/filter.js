import {CHANGE_DATE,CHANGE_COUNT_ROW,CHANGE_REFRESH_DATA} from '../constants/actions'
import {filter_value,countRowTable,delay_refresh_data} from '../constants/filters_values'

const initialState = {start: filter_value.start, end: filter_value.end,countRowTable:countRowTable,delay_refresh_data:delay_refresh_data}

export const filter = (state=initialState, action)=>{
  console.log(action)
  switch (action.type) {
      case CHANGE_DATE:
          return {
               ...state, [action.payload.id_period]:action.payload.value }
      case CHANGE_COUNT_ROW:
          return {
            ...state, countRowTable:action.payload }
      case CHANGE_REFRESH_DATA:
              return {
                ...state, delay_refresh_data:action.payload }                
      

      default:
          return state;
  }
}

