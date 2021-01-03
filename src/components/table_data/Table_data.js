import React from 'react';
import { useSelector } from 'react-redux';
import './Table_data.css';

const headerTableStyles = { width: "30%" }
function HeaderTable() {
    return (
      <div className="row-table row-table-header">
        <div> Дата </div>
        <div> № п/п</div>
        <div> ID </div>
        <div> Код </div>
        <div> Код(симв) </div>
        <div> Номинал </div>
        <div style={headerTableStyles}> Наименование </div>
        <div> Значение </div>
        <div> Предыдущее </div>
      </div>
    );
  }

  const row_styles = { width: "30%", textAlign: "left" }

function Ind({index}){


  const length = useSelector((state) => Object.keys(state.data.data_obj).length);
 
  return(
    <> {length-index}</>
  )
}

  function Row({ id_obj, index }) {
  
      const data = useSelector((state) => state.data.data_obj[id_obj]);
        
      if (data===undefined){
          return(null)
      }
      
        console.log(data)

        const { ID, NumCode, CharCode, Nominal, Name, Value, Previous, start } = data;
    
        return (
        <div className="row-table animation">
          <div> {start.toLocaleDateString()} </div>
          <div> <Ind index={index}/></div>
          <div> {ID} </div>
          <div> {NumCode} </div>
          <div> {CharCode} </div>
          <div> {Nominal} </div>
          <div style={row_styles}>{Name}</div>
          <div> {Value} </div>
          <div> {Previous} </div>
        </div>
        );
  }
  
  
const Row_memo = React.memo(Row)

function Table_data() {
    const data_arr = useSelector((state) => state.data.data_arr);
    
    return (<>
    <HeaderTable/>
    <div className="table-data-main" style={{overflow: "auto", width:"100%",height:"400px"}}>
        
        <div className="table-data-data">
          {data_arr.map((id_obj, index) => ( <Row_memo id_obj={id_obj} index={index} />) )}
        </div>    

    </div>
    </>
    )
    
}



export default Table_data

