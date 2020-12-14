import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {START_GET_DATA,CHANGE_DATE,CHANGE_COUNT_ROW,CHANGE_REFRESH_DATA,CLEAR_ERROR_DATA,PAUSED,CANSEL_PAUSED} from '../constants/actions'
import moment from 'moment'
import {Button, DatePicker,InputNumber,Checkbox,Alert} from 'antd';

import './Header.css';


function LimitCountRowTable(){

    let countRowTable =  useSelector((state) => state.filter.countRowTable);
    const dispatch = useDispatch();
    const onChangeCountRowsTable_zero = ()=>{

        if (countRowTable!==Infinity){
            dispatch({ type: CHANGE_COUNT_ROW,payload:Infinity})
        }
        else{
            dispatch({ type: CHANGE_COUNT_ROW,payload:10})
        }
       
    }

    const onChangeCountRowsTable = (value)=>{
        if (value){
            dispatch({ type: CHANGE_COUNT_ROW,payload:Number(value)})
        }
        
        
    }

    return(
        <div className="header-inputNumber-cont-first" >
        <div style={{display:(countRowTable===Infinity)?"none":"block"}}> 
            <label for="countRowTable" className="header-inputNumber-cont-first-label">Количество записей в таблице</label> 
            <InputNumber min={10} step={10} id="countRowTable" value={countRowTable} onChange={onChangeCountRowsTable} />
        </div>
        <div className="chekLimited"> 
        { countRowTable!==Infinity && <Checkbox name="countRows_zero"  value={countRowTable} onChange={onChangeCountRowsTable_zero}>
            <span>Любое количество</span> 
         </Checkbox> }

         { countRowTable===Infinity && <Button type="primary" style={{ marginTop: "40px", marginBottom: "40px" }} onClick={onChangeCountRowsTable_zero}> 
         <span>Задать лимит записей</span>  
         </Button> }
   
        </div>
        
    </div>)
    
}

function InputsValues(){
 
 return(<div className="header-inputNumber-cont" >
         <LimitCountRowTable />
         <DelayOutData />
        </div>);
}
//disabled={loading}

function DelayOutData(){

    let delay_refresh_data =  useSelector((state) => state.filter.delay_refresh_data);
    const dispatch = useDispatch();
    const onChangeDelay_Refresh_Data = (value)=>{
        if (value){
        dispatch({ type: CHANGE_REFRESH_DATA,payload:value})
        }
    }  

    

    return(
        <div className="header-inputNumber-cont-first" >
            <label for="delay_refresh_data" className="header-inputNumber-cont-first-label">Задержка вывода в миллесекундах</label> 
            <InputNumber  min={500} step={100} id="delay_refresh_data"
                value={delay_refresh_data} onChange={onChangeDelay_Refresh_Data}/>
        </div>
    )
}


function Error_messages(){

   const dispatch = useDispatch();

   const error_messages = useSelector((state) => state.errors.error_messages);
    
   const onCloseHandler = (index) => {
    dispatch({type:CLEAR_ERROR_DATA,payload:index})
}
  /*  
   useEffect(()=>{
 
    if (error_messages.length>0){

        error_messages.forEach((error,index) => {
             notification.error({
                message: "Ошибка получения данных на дату " + error.date + ", код ошибки: " + error.textError,
                duration:3,
                description:
                  "Ошибка получения данных",
                  onClose:()=>{onCloseHandler(index)} ,
              });    
        });

        
       }
},)
*/
    return(<>{
        error_messages.map((error,index) => (<Alert
            message={"Ошибка получения данных на дату " + error.date + ", код ошибки: " + error.textError}
            //description="Ошибка получения данных"
            type="error"
            closable
            onClose={()=>{onCloseHandler(index)}}
          />))
         }
    </>)
        /*{ error_messages.length>0 && <ul>{error_messages.map((error)=>(<li>{
            message.error("Ошибка, нет данных за период: "+
             error.date.year + 
             "-" + error.date.month + "-" + 
             error.date.date + ", error: " + 
             error.textError )}</li>))
            }</ul>}*/

    
}

export default function Header() {
    
    
    
    return(<>
            <h1 style={{textAlign:"center"}}>Таблица валют за произволный периоды:</h1>
            <DatesArrond/>
            <InputsValues/>
            <Error_messages/> 
            <ButtonProcessing/>
        </>);

    
}

function DatesArrond(){
    const start = useSelector((state) => state.filter.start);
    const end = useSelector((state) => state.filter.end);
    const loading = useSelector((state) => state.data.loading);
    const dispatch = useDispatch();
    return(
            <div className="header-dates-cont" >
                    
           <label for="start" className="header-dates-cont-label">Начало</label> 
           <DatePicker disabled={loading} placeholder="Начало" id="start" format={'DD-MM-YYYY'} style={{ widthMax: '20%' }} value={start===""?"":moment(start)} onChange={(date, dateString)=>{
      
               dispatch({ type: CHANGE_DATE,payload:{id_period:"start",value:date===null?"":date._d} })
   
           }} />
           <label for="start" className="header-dates-cont-label" style={{marginLeft:"20px"}}>Конец</label> 
           <DatePicker disabled={loading} placeholder="Конец" id="end" format={'DD-MM-YYYY'} style={{ widthMax: '20%' }} value={end===""?"":moment(end)} onChange={(date, dateString)=>{
               
               dispatch({ type: CHANGE_DATE,payload:{id_period:"end",value:date===null?"":date._d} })
   
           }} />
           </div>)
        
}

function ButtonProcessing(){
    const start = useSelector((state) => state.filter.start);
    const end = useSelector((state) => state.filter.end);
    const loading = useSelector((state) => state.data.loading);
    const paused = useSelector((state) => state.flow_control.paused);
    const requestData = useSelector((state) => state.data.requestData);

    const dispatch = useDispatch();

    const handlerOnclick = () => {
        if (
            start === "" ||
            end === ""
        ) {
            return;
        }

        if (!loading && !paused) {
            dispatch({
                type: START_GET_DATA,
                payload: {
                    start: start,
                    end: end
                }
            });
        } else if (loading && !paused) {
            
            dispatch({ type: PAUSED })

        } else if (loading && paused) {

            dispatch({ type: CANSEL_PAUSED })
        }
    }

    return(
        <div className="header-buttons-cont" >
        <Button type="primary" style={{ marginTop: "40px", marginBottom: "40px" }} onClick={handlerOnclick}  
        disabled={ (start === "" || end === "" ||!requestData)}>
            {!loading && !paused && "Загрузить данные... "}
            {loading && !paused && "Приостановить... "}
            {loading && paused && "Продолжить... "}
        </Button>

        </div>
    )
}