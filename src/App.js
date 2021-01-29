import './App.css';
import React from "react";
import APICreate from './component/API_Create';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';



function App() {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h2 className="text-center text-uppercase text-dark">CRUD Operation in REACT JS with php</h2>
          <APICreate />
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default App;