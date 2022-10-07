import React from "react";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Users from "./Users";
import Profile from "./profile";
import { Button } from "bootstrap";


function App(){
    return(
        <div>
            <BrowserRouter>
            <Routes>
           
                <Route path="/" element={<Users/>}></Route>
                <Route path="/Profile" element={<Profile/>}></Route>
            </Routes>
            </BrowserRouter>

        </div>
    );
};
export default App;