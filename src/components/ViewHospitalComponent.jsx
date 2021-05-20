import React, { Component } from 'react';
import HospitalService from '../services/HospitalService';
import PatientService from '../services/PatientService';

import Video from './Video/Video';
import {
  Card, CardHeader, CardBody, Form, FormGroup, Label, Input, FormText, Button, Alert
} from 'reactstrap'
const styles = { "backgroundColor": "#007bff", "color": "#ffffff", "cursor": "pointer" };
class ViewHospitalComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            hospital: {},
            vadamalayan: [],
            showBody: false,
            Pname: "",
            Age: "",
            Gender: "",
            Date: "",
            Time: "",
            Problem: "",
            Dname: "",
            formErrors: false,
            hospUrl : '',
            Hid: this.props.match.params.id
        }
        this.addPatientNameHandler = this.addPatientNameHandler.bind(this);
        this.addAgeHandler = this.addAgeHandler.bind(this);
        this.addGenderHandler=this.addGenderHandler.bind(this);
        this.addDateHandler = this.addDateHandler.bind(this);
        this.addTimeHandler = this.addTimeHandler.bind(this);
        this.addDnameHandler = this.addDnameHandler.bind(this);
        this.addProblemHandler = this.addProblemHandler.bind(this);
        this.savePatient = this.savePatient.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    toggleBody = () => {
    this.setState({
      showBody: !this.state.showBody
    });
  }
  addPatientNameHandler= (event) => {
        this.setState({Pname: event.target.value});
    }

    addAgeHandler= (event) => {
        this.setState({Age: event.target.value});
    }
    addGenderHandler= (event) => {
      this.setState({Gender: event.target.value})
    }
    addDateHandler= (event) => {
      this.setState({Date: event.target.value})
    }
    addTimeHandler= (event) => {
      this.setState({Time: event.target.value})
    }
    addDnameHandler= (event) => {
      this.setState({Dname: event.target.value})
    }
    addProblemHandler= (event) => {
      this.setState({Problem: event.target.value})
    }
  savePatient = (e) => {
    e.preventDefault();
  
    
      let virtual = { Hid: this.state.Hid, Pname: this.state.Pname, Age: this.state.Age, Gender: this.state.Gender, Date: this.state.Date, Time: this.state.Time, Dname: this.state.Dname, Problem: this.state.Problem };
      
    
    PatientService.createVpatient(virtual).then(res => {
            HospitalService.changeTotalNumBedsById(this.state.hospital_id).then(res => {
                this.props.history.push('/');
                
            })
        });

  }
  cancel () {
        this.props.history.push('/');
    }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
    componentDidMount(){
        HospitalService.getHospitalById(this.state.id).then(res => {
            this.setState({hospital: res.data});
            this.setState({hospUrl: "https://maps.google.com/maps?q=" + this.state.hospital.location_coordinates + "&t=&z=13&ie=UTF8&iwloc=&output=embed"});
        });
        HospitalService.getVdHospitals().then(res => {
            this.setState({vadamalayan: res.data});
            
        });
    }

    render() {
        let displayBody = {
      display: this.state.showBody ? 'block' : 'none'
    };
    let errors = {
      display: this.state.formErrors ? 'block' : 'none'
    };
     if(this.state.id==23501)
     {
        return (
            <div>
                <h2 className="text-center">States</h2>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>                          
                                <th>Doctors</th>
                                <th>Departments</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.vadamalayan.map(
                                    st => 
                                    <tr>
                                        <td>{st.doctors}</td>                                  
                                        <td>{st.departments}</td> 
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                    <div class="card" style = {{marginTop : "20px"}}>                        
                            <div class="card-body">
                                <h3 class="card-title">Hospital Details</h3>                                
                            </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">{this.state.hospital.hospital_name}</li>
                                    <li class="list-group-item">{this.state.hospital.location}</li>
                                    <li class="list-group-item">{this.state.hospital.district}</li>
                                    <li class="list-group-item">{this.state.hospital.state}</li>
                                    <li class="list-group-item">{this.state.hospital.pincode}</li>                          
                                </ul>    
                    </div>
                </div>
               
                <div class="col">
                    <div class="card" style = {{marginTop: "20px"}}>
                     <div class="card-body">
                        <h5 class="card-title">Total Number Of Beds Available</h5>
                        <h1 class="card-title">{this.state.hospital.total_num_beds}</h1>
                    </div>
                    </div>
                </div>     

                <div class = "col"></div>

                <div class = "col">
                    <div id="map-container-google-1" class="z-depth-1-half map-container"  style={{height: "500px"}}>                        
                        <iframe src={this.state.hospUrl} frameborder="0" style={{border: "0"}} allowfullscreen></iframe>
                    
            
           <Card className="mt-4 mb-4 card-border" outline color="primary" >
        <CardHeader style={styles} onClick={this.toggleBody}><i className="fas fa-plus"></i> Add New Appointment</CardHeader>
        <CardBody style={displayBody} id="aptBody">
          <FormText color="muted" className="mb-1">
            <span className="text-danger">*</span>All fields are required
          </FormText>
          <Form onSubmit={this.save}>
            <FormGroup>
              <Label for="Pname">Patient Name</Label>
              <Input type="text" id="Pname" placeholder="Patient's name" value={this.state.Pname} name="Pname" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Age">Age</Label>
              <Input type="number" id="Age" placeholder="Patient's age" value={this.state.Age} name="Age" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Gender">Gender</Label>
              <Input type="select" id="Gender" value={this.state.Gender} name="Gender" onChange={this.handleChange} >
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Date">Date</Label>
              <Input type="date" id="Date" value={this.state.Date} name="Date" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Time">Time</Label>
              <Input type="time" id="Time" value={this.state.Time} name="Time" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Dname">Doctor Name</Label>
              <Input type="select" id="Dname" value={this.state.Dname} name="Dname" onChange={this.handleChange} >
                <option>Select doctor name</option>
                <option>Dr. S Sathish Kumar</option>
                <option>Dr. V Amuthan</option>
                <option>Dr. CPM Chandrasekar</option>
                <option>Dr. BRJ Kannan</option>
                <option>Dr. J Sathish Kinne</option>
                <option>Dr. K Lakshmi Priya</option>
                <option>Dr. S Alagu Ganesh</option>
                <option>Dr. P Vinod</option>
                <option>Dr. M Dheepha</option>
                <option>Dr. V Raja Gopalan</option>
                <option>Dr. M Srinivasan</option>
                <option>Dr. M Ganapathivel Kannnan</option>
                <option>Dr. DN Sharmila</option>
                <option>Dr. James Pandian</option>
                <option>Dr. N Prithiviraj</option>
                <option>Dr. M Ravinarayanan</option>
                <option>Dr. G Ganesh Prabhu</option>
                <option>Dr. V Jeyakodish</option>
                <option>Dr. N Parvatha Sundarai</option>
                <option>Dr. RM Hemnath</option>
                <option>Dr. M Kavitha</option>
                <option>Dr. SC Vivekanandhan</option>
                <option>Dr. M Kannan</option>
                <option>Dr. RT Narendhran</option>
                <option>Dr. P Amudha Rajeshwari</option>
                <option>Dr. S Sridhar</option>
                <option>Dr. Ganesh Pandian</option>
                <option>Dr. D Ashok Kumar</option>
                <option>Dr. D David Praveen Kumar</option>
                <option>Dr. R Sivanantham</option>
                <option>Dr. M Chidambaram</option>
                <option>Dr. R Vetri Nallathambi</option>
                <option>Dr. A Anand Kumar</option>
                <option>Dr. C Justin</option>
                <option>Dr. G Geetha Rani</option>
                <option>Dr. A Jegan</option>
                <option>Dr. SS Rajendran</option>
                <option>Dr. MK Mothilal</option>
                <option>Dr. J Sundarapandian</option>
                <option>Dr. Vijayaraghavan RL</option>
                <option>Dr. V Pappunathan</option>
                <option>Dr. S Sowmiya Prithiviraj</option>
                <option>Dr. P Sivalingam</option>
                <option>Dr. S Thahseen Nilofar</option>
                <option>Dr. I Selvamani</option>
                <option>Dr. T Kumanan</option>
                <option>Dr. T Lakshmi Devi</option>
                <option>Dr. M Amarnath</option>
                <option>Dr. V Meenakshi Sundaram</option>
                <option>Dr. K Muralidharan</option>
                <option>Dr. Durga R</option>
                <option>Dr. C Vignesh</option>
                <option>Dr. SJV Gnanaraj</option>
                <option>Dr. Moses K Daniel</option>
                <option>Dr. S Elamparithi</option>
                <option>Dr. S Rajendran</option>
                


              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Problem">Problem</Label>
              <Input type="textarea" id="Problem" placeholder="Notes" value={this.state.Problem} name="Problem" onChange={this.handleChange} />
            </FormGroup>
            <Alert color="danger" style={errors}>
              Please fill all the details
          </Alert>
            <Button type="submit" color="primary" block onClick = {this.savePatient}>Add Appointment</Button>
            
          </Form>
        </CardBody>
      </Card > 
      <Button color="primary"  onClick={() => this.props.history.push('/Video')}>Virtual Appointment</Button>   
        </div>
                </div>                    
            </div>        
                    
                </div>
            </div>
           
        );
     }
     else{

     
        return (
            
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                    <div class="card" style = {{marginTop : "20px"}}>                        
                            <div class="card-body">
                                <h3 class="card-title">Hospital Details</h3>                                
                            </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">{this.state.hospital.hospital_name}</li>
                                    <li class="list-group-item">{this.state.hospital.location}</li>
                                    <li class="list-group-item">{this.state.hospital.district}</li>
                                    <li class="list-group-item">{this.state.hospital.state}</li>
                                    <li class="list-group-item">{this.state.hospital.pincode}</li>                          
                                </ul>    
                    </div>
                </div>
               
                <div class="col">
                    <div class="card" style = {{marginTop: "20px"}}>
                     <div class="card-body">
                        <h5 class="card-title">Total Number Of Beds Available</h5>
                        <h1 class="card-title">{this.state.hospital.total_num_beds}</h1>
                    </div>
                    </div>
                </div>     

                <div class = "col"></div>

                <div class = "col">
                    <div id="map-container-google-1" class="z-depth-1-half map-container"  style={{height: "500px"}}>                        
                        <iframe src={this.state.hospUrl} frameborder="0" style={{border: "0"}} allowfullscreen></iframe>
                    
            
           <Card className="mt-4 mb-4 card-border" outline color="primary" >
        <CardHeader style={styles} onClick={this.toggleBody}><i className="fas fa-plus"></i> Add New Appointment</CardHeader>

         
        
        
        <CardBody style={displayBody} id="aptBody">
          <FormText color="muted" className="mb-1">
            <span className="text-danger">*</span>All fields are required
          </FormText>
          <Form>
            <FormGroup>
              <Label for="Pname">Patient Name</Label>
              <Input type="text" id="Pname" placeholder="Patient's name" value={this.state.Pname} name="Pname" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Age">Age</Label>
              <Input type="number" id="Age" placeholder="Patient's age" value={this.state.Age} name="Age" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Gender">Gender</Label>
              <Input type="select" id="Gender" value={this.state.Gender} name="Gender" onChange={this.handleChange} >
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Date">Date</Label>
              <Input type="date" id="Date" value={this.state.Date} name="Date" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Time">Time</Label>
              <Input type="time" id="Time" value={this.state.Time} name="Time" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="Dname">Doctor Name</Label>
              <Input type="select" id="Dname" value={this.state.Dname} name="Dname" onChange={this.handleChange} >
                <option>Select doctor name</option>
                <option>Dr. S Sathish Kumar</option>
                <option>Dr. V Amuthan</option>
                

              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Problem">Problem</Label>
              <Input type="textarea" id="Problem" placeholder="Notes" value={this.state.Problem} name="Problem" onChange={this.handleChange} />
            </FormGroup>
            <Alert color="danger" style={errors}>
              Please fill all the details
          </Alert>
            <Button type="submit" color="primary" onClick = {this.savePatient}>Add Appointment</Button>
          </Form>
        </CardBody>
      </Card >  
      <Button color="primary" onClick={() => this.props.history.push('/Video')}>Virtual Appointment</Button> 
        </div>
        
                </div>                    
            </div>        
        );
     }
    }
}

export default ViewHospitalComponent;


