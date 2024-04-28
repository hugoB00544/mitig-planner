import {React} from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.css';
import Interface from './Component/Interface.js';
import reportWebVitals from './scripts/reportWebVitals.js';
import { HashRouter, Routes, Route} from "react-router-dom";
import InterfaceParty from './Component/InterfaceParty.js';
import InterfaceSolo from './Component/InterfaceSolo.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path={"/"} element={<Interface/>}/>
      <Route path={"/solo"} element={<InterfaceSolo/>} />
      <Route path={"/party"} element={<InterfaceParty/>} />
    </Routes>
  </HashRouter>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
