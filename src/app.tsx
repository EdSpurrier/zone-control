import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { ipcRenderer } from 'electron';
import './app.css';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {


  const [displays, setDisplays] = useState(new Array());

  ipcRenderer.on('asynchronous-reply', (event, arg) => {

    console.log("Reply:", arg);
    
    });


  ipcRenderer.on('display-info', (event, displays) => {
    //console.log("Displays:", displays);
    setDisplays(displays);
  });
  



  let displayTable = displays.map(function(display, key){
    return 
      <tr key={key}>
        <td>{display.id}</td>
        <td>{display.bounds.x}</td>
        <td>{display.bounds.y}</td>
        <td>{display.bounds.width}</td>
        <td>{display.bounds.height}</td>
      </tr>
    
  });



  return (
    <>
    {displayTable}
        <div className="App">
        <h1>
          Hi from a react app
        </h1>

        <button onClick={()=>{
          ipcRenderer.send('get-display-info', 'get')
        }}>Get Display Info</button>

        <button onClick={()=>{
          ipcRenderer.send('get-windows-info', 'get')
        }}>Get Windows Info</button>

        <button onClick={()=>{
          ipcRenderer.send('get-window', 'get')
        }}>GetWindow()</button>

      <table>
        <tr>
          <th>Id</th>
          <th>x</th>
          <th>y</th>
          <th>width</th>
          <th>height</th>
        </tr>
        {displays.map(display => {
          return (
          <tr>
            <td>{display.id}</td>
            <td>{display.bounds.x}</td>
            <td>{display.bounds.y}</td>
            <td>{display.bounds.width}</td>
            <td>{display.bounds.height}</td>
          </tr>
          )
        })}
      </table>



      </div>
    </>

   
  )
}

ReactDom.render(<App />, mainElement);