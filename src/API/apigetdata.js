import {v4 as uuid} from "uuid"

export async function getData_onDate(year, month, date) {
    month = String(month);
    date = String(date);
    let data = {};
    try {
      const res = await fetch(
        `https://www.cbr-xml-daily.ru/archive/${year}/${month.padStart(
          2,
          "0"
        )}/${date.padStart(2, "0")}/daily_json.js`
      );
      data = await res.json();
  
      const newValuteArr = Object.values(data.Valute).sort((a,b)=>{if (a.Name>b.Name){return -1}})//отсортированный по наименованию  массив
  
      let newValuteObj = {}//Объект отсортированный по наименованию валют.
    
      newValuteArr.forEach((element)=>{
       newValuteObj[element.CharCode] = element
      })
    
      data.Valute = newValuteObj
  
  
    } catch (error) {
      const dateString = String(date).padStart(2,"0") +"."+ String(month).padStart(2,"0") +"."+ String(year).padStart(4,"0");  
      data.error_message = {date:dateString,textError:error}
      
    }
    //Valute:
    //AMD: {ID: "R01060", NumCode: "051", CharCode: "AMD", Nominal: 100, Name: "Армянских драмов", …}
  
    return data; //  Массив { Valute , error_message - сообщение об ошибке } 
  }//getData_onDate(year, month, date)
  
  
  export   function getResultData(obj_data,  loading) {
      const data_obj = {};
    
      const kod = uuid();
     
      data_obj[kod] = obj_data;
  
    return { data_arr:Object.keys(data_obj), data_obj ,loading };
  }
  