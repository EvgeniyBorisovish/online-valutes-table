import React from 'react'
import Header from '../header/Header'
import Table_data from "../table_data/Table_data"
import './Data_modeling.css';
export default function Data_modeling(){
    return (
        <React.Fragment>
         <Header />
         <div className="data_modeling_cont" >
              <Table_data />
         </div>
         </React.Fragment>
     );
 }
