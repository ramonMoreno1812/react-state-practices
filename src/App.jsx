import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // counter starts at one
  const [count, setCount] = useState(0);
  // api use state
  const [publicHoliday, setPublicHoliday] = useState('');
  const [holidays, setHolidays] = useState ([]);

  function decrement(e) {
    if (count == 0) {
      setCount(count - 0);
    } else {
      setCount(count - 1);
    }
  }

  // get data from api function the response will be an object and under data section in the console
  // is the data we are looking for.
  const getData = () =>{
    // my random api axios is getting this data
    axios.get('https://date.nager.at/api/v2/publicholidays/2020/US')
    .then((res) => {  // if there is a succsessful response to the api call response is this
      // console.log(res.data);  // console log the response for testing
      // set my data to be used in state publicHoliday to pring as json data
      setPublicHoliday(JSON.stringify(res.data)); 
      
    }).catch(err => {// else it will catch the error
      console.log(err);  // console.log the error
    });
  }

  // display data upon loading screen 
 useEffect(() => {
  axios.get('https://date.nager.at/api/v2/publicholidays/2020/US')
  .then(res =>{
    setHolidays(res.data);
    console.log(res.data);
  }).catch(err => console.log(err));
 }, [] /* run only once when the app loads */);


  return (
    <div>
      <div className="counterSection">
        <h1>Counter Section</h1>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}> count + 1 </button>

        <br></br>
        <br></br>
        <button onClick={decrement}>minus count</button>
      </div>

      <br></br>
      <br></br>
      <br></br>

      <div className="apiFetchSection">
        <h1>Api Fetch Section as Json data</h1>
        <button onClick={getData}>Display Data</button>
        <br></br>
        <br></br>
        {/*{publicHoliday && <p>{publicHoliday}</p>}*/}
        {/*display raw data*/}
        {publicHoliday && <p>{publicHoliday}</p>}
      </div>

      <br></br>
      <br></br>
      <br></br>
      <div className="displayApi">
        <h1>Display API in Table</h1>
        <table className="tableData">
          <thead>
            <tr>
              <th>Country Code</th>
              <th>Date</th>
              <th>Local Name</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
          {
            holidays.map((holiday) => (
              <tr key={holiday.name}>
                    <td>{holiday.countryCode}</td>
                    <td>{ holiday.date }</td>
                    <td>{ holiday.localName }</td>
                    <td>{ holiday.name }</td>
                    <td>{ holiday.type }</td>
              </tr>
              
            ))
          }
            {/*{
              holidays.map((day, index) =>{
                return 
                  <tr key={index}>
                    <td>{day.countryCode}</td>
                    <td>{ day.date }</td>
                    <td>{ day.localName }</td>
                    <td>{ day.Name }</td>
                    <td>{ day.Type }</td>
                  </tr>
              })
            } */}
          <br></br>
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default App;
