import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListHospitalComponent from './components/ListHospitalComponent';
import CreateHospitalComponent from "./components/CreateHospitalComponent";
import BookHospitalComponent from "./components/BookHospitalComponent";
import ViewHospitalComponent from "./components/ViewHospitalComponent";
import ListStateComponent from "./components/ListStateComponent";
import ListDistrictComponent from "./components/ListDistrictComponent";
import ListHospitalsInDistrictComponent from "./components/ListHospitalsInDistrictComponent";
import Video from "./components/Video/Video";
import signin from "./components/SignIn";
import signup from "./components/SignUp";
import Blog from "./components/HomePage/Blog";

function App() {
  return (
    <div>
      <Router>
            <HeaderComponent />
              <div className="container">
                <Switch> 
                    <Route path = "/" exact component = {Blog}></Route>
                    <Route path = "/signin" exact component = {signin}></Route>
                    <Route path = "/signup" exact component = {signup}></Route>
                    <Route path = "/state" exact component = {ListStateComponent}></Route>
                    <Route path = "/Video" exact component = {Video}></Route>
                    <Route path = "/hospitals" component = {ListHospitalComponent}></Route>
                    <Route path = "/add-hospital" component = {CreateHospitalComponent}></Route>
                    <Route path = "/book-hospital/:id" component = {BookHospitalComponent}></Route>
                    <Route path = "/view-hospital/:id" component = {ViewHospitalComponent}></Route>
                    <Route path = "/states" exact component = {ListStateComponent}></Route>
                    <Route path = "/states/:state_id" component = {ListDistrictComponent}></Route>
                    <Route path = "/districts/:district" component = {ListHospitalsInDistrictComponent}></Route>
                </Switch>
              </div>
        </Router>
    </div>
  );
}

export default App;
