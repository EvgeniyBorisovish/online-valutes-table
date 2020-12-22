import { call, put, takeLatest,take, delay, select, all } from "redux-saga/effects";
import { REQUEST_DATA_FINISHED,SUCCESS_GET_DATA,START_GET_DATA,ERROR_GET_DATA,REQUEST_DATA } from "./constants/actions";

import { getData_onDate,getResultData } from "./API/apigetdata";


function* getData() {
 
  let {start,end}  = yield select((state) => state.filter);
  start = new Date(+start);
  end = new Date(+end);

  yield put({type: REQUEST_DATA})
    

  while (start <= end) {
    

    const countRowTable = yield select((state) => state.data.data_arr.length);
    let limitCountRowTable = yield select((state) => state.filter.countRowTable);
    let delay_refresh_data = yield select((state) => state.filter.delay_refresh_data); 
    yield delay(delay_refresh_data);

    if (countRowTable>limitCountRowTable){
      yield put({type: REQUEST_DATA_FINISHED})
      yield put({type: SUCCESS_GET_DATA,payload: {data_arr:[],data_obj:{},loading:false} });
      break
    }

    const data = yield call(getData_onDate, start.getFullYear(),start.getMonth() + 1,start.getDate());
   
    if (data.error_message){  
    
      yield put({ type: ERROR_GET_DATA, payload: data.error_message });

      start.setDate(start.getDate() + 1
      ); continue }
    
    if (Object.keys(data.Valute).length > 0) {

     const  new_valute={}

     Object.keys(data.Valute).forEach(id_prop => {
        new_valute[id_prop] = data.Valute[id_prop]
        new_valute[id_prop].start = new Date(+start) //.toLocaleDateString()
      });
      
    let counts = 0 
     
    const countsRow = Object.keys(new_valute).length

    for (let id in new_valute){

      counts+=1

      limitCountRowTable = yield select((state) => state.filter.countRowTable);

      if (countRowTable+counts>limitCountRowTable){

          if (counts===1){
            yield put({type: REQUEST_DATA_FINISHED})
          }

          yield put({
          type: SUCCESS_GET_DATA,
          payload: {data_arr:[],data_obj:{},loading:false} 
          });
          break
      }

      delay_refresh_data = yield select((state) => state.filter.delay_refresh_data); 

      yield delay(delay_refresh_data);

      let paused = yield select((state) => state.flow_control.paused);

      if (paused){
        yield take("CANSEL_PAUSED")
      }
      
      yield put({
       type: SUCCESS_GET_DATA, payload: getResultData(new_valute[id], ( (+start===+end) && (counts===countsRow))?false:true)});
      
      
      
      if (counts===1){
        yield put({type: REQUEST_DATA_FINISHED})
      }

    }

      }
    
    start.setDate(start.getDate() + 1);
  }

  
  const loading = yield select((state) => state.data.loading);
  if (loading){
    yield put({type: REQUEST_DATA_FINISHED})
    yield put({type: SUCCESS_GET_DATA,payload: {data_arr:[],data_obj:{},loading:false} });
  }

}

function* fetch_data() {
  yield takeLatest(START_GET_DATA, getData);
}

function* mySaga() {
  yield all([fetch_data()]);
}

export default mySaga;



