import '../App.css';
import React from "react";
import axios from "axios";
import { Button,Modal } from 'react-bootstrap';
class APICreate extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      class: '',
      res: '',
      info: [],
      showHide : false,
      getResToUpdate: []
    }
  }
  handleModalShowHide() {
      this.setState({ showHide: !this.state.showHide });
  }
  handle = (e) => {
    this.setState({
      res: ''
    });
    if (e.target.name === 'name') {
      this.setState({
        name: e.target.value
      });
    }
    else if (e.target.name === 'class') {
      this.setState({
        class: e.target.value
      });
    }
    else {
      this.setState({
        email: e.target.value
      });
    }
  }
  edit = (e) => {
    e.preventDefault();
    this.setState({ showHide: !this.state.showHide });
    let formData = new FormData();
    formData.append('id', e.target.value);
    let url = "http://localhost/react-php/getDataToUpdateAPI.php";

    axios.post(url, formData).then((res) => {
      let details = res.data[0];
      // console.log(details.name);
      this.setState({
        // getResToUpdate: res.data
        name: details.name,
        email: details.email,
        class: details.class,
        id: details.id
      });
    }
    ).catch((err) => {
      this.setState({
        res: err
      });
    }
    );
  }
  handleUpdate = (e) => {
    if (e.target.name === 'name') {
      this.setState({
        name: e.target.value
      });
    }
    else if (e.target.name === 'class') {
      this.setState({
        class: e.target.value
      });
    }
    else {
      this.setState({
        email: e.target.value
      });
    }
  }
  updateData = (e) => {
    e.preventDefault();
    this.setState({ showHide: !this.state.showHide });
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('class', this.state.class);
    formData.append('email', this.state.email);
    let id = document.getElementById("id").value;
    formData.append('id', id);
    let url = "http://localhost/react-php/updateAPI.php";

    axios.post(url, formData).then(
      (res) => {
        // console.log(res);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('class').value = '';
        let url = "http://localhost/react-php/readAPI.php";    
        axios.get(url).then(
          (res) => {
            // console.log(res.data);
            this.setState({ info: res.data});
            // console.log(this.state.info);
          }
        );
        this.setState({
          res: res.data
        });
    }
    ).catch((err) => {
      // console.log(err);
      this.setState({
        res: err
      });
    }
    );
  }

  sendMsg = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('class', this.state.class);
    formData.append('email', this.state.email);
    let url = "http://localhost/react-php/";

    axios.post(url, formData).then(
      (res) => {
        let url = "http://localhost/react-php/readAPI.php";    
        axios.get(url).then(
          (res) => {
            // console.log(res.data);
            this.setState({ info: res.data});
            // console.log(this.state.info);
          }
        );
        // console.log(res.data);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('class').value = '';
        this.setState({
          res: res.data
        });
    }
    ).catch((err) => {
      // console.log(err);
      this.setState({
        res: err
      });
    }
    );
  }
  componentDidMount() {
    let url = "http://localhost/react-php/readAPI.php";

    axios.get(url).then(
      (res) => {
        // console.log(res.data);
        this.setState({ info: res.data});
        // console.log(this.state.info);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  Delete = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('id', e.target.value);
    let url = "http://localhost/react-php/deleteAPI.php";

    axios.post(url, formData).then((res) => {
      let url = "http://localhost/react-php/readAPI.php";    
      axios.get(url).then(
        (res) => {
          // console.log(res.data);
          this.setState({ info: res.data});
          // console.log(this.state.info);
        }
      );
      this.setState({
        res: res.data
      });
    }
    ).catch((err) => {
      // console.log(err);
      this.setState({
        res: err
      });
    }
    );
  }

  render() {
    return (
      <div align="center">
        <div className="row mt-4">
          <div className="col-md-2">
            <label className="form-label text-dark">Name:</label>
          </div>
          <div className="col-md-10">
            <input type="text" onChange={this.handle} className="form-control" name="name" id="name" placeholder="Enter Name"></input>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2">
            <label className="form-label text-dark">Email:</label>
          </div>
          <div className="col-md-10">
            <input type="email" onChange={this.handle} className="form-control" name="email" id="email" placeholder="Enter Email"></input>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2">
            <label className="form-label text-dark">Class:</label>
          </div>
          <div className="col-md-10">
            <input type="text" onChange={this.handle} className="form-control" name="class" id="class" placeholder="Enter Class"></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input onClick={this.sendMsg} className="btn btn-outline-success mt-2 px-3 py-1" type="submit" value="Send Message"></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="bg-success mt-4">{this.state.res}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <table width="100%" className="text-dark text-center">
              <thead>
                <th>SNO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Action</th>
                <th>Action</th>
              </thead>
              <tbody>
                {
                  this.state.info.map((ele, i) => {
                    return (<tr>
                      <td>{i + 1}</td>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.class}</td>
                      <td><button className="btn btn-success" onClick={this.edit} value={ele.id}>Edit</button></td>
                      <td><button className="btn btn-danger" onClick={this.Delete} value={ele.id}>Delete</button></td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

        <Modal show={this.state.showHide}>
          <Modal.Header>
            <Modal.Title>Update Data</Modal.Title>
              <span className="bg-danger closeBtn text-white px-3 py-2 cursor-pointer" onClick={() => this.handleModalShowHide()}><b>Close</b></span>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input type="hidden" className="form-control" name="id" id="id" value={this.state.id}></input>
              <div className="row">
                <div className="col-md-2">
                  <label className="form-label">Name:</label>
                </div>
                <div className="col-md-10">
                  <input type="text" value={this.state.name} onChange={this.handleUpdate} className="form-control" name="name" id="name" placeholder="Enter Name" ></input>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-md-2">
                  <label className="form-label">Email:</label>
                </div>
                <div className="col-md-10">
                  <input type="email" value={this.state.email} onChange={this.handleUpdate} className="form-control" name="email" id="email" placeholder="Enter Email"></input>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-md-2">
                  <label className="form-label">Class:</label>
                </div>
                <div className="col-md-10">
                  <input type="text" value={this.state.class} onChange={this.handleUpdate} className="form-control" name="class" id="class" placeholder="Enter Class" ></input>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                Close
            </Button>
            <Button type="submit" onClick={this.updateData} variant="primary">
                Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default APICreate;
