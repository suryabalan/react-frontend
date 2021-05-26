import React, { Component } from 'react';
import HospitalService from '../services/HospitalService';
import PatientService from '../services/PatientService';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class BookHospitalComponent extends Component {
    

  

 
    constructor(props) {
        super(props)

        this.state = {
            patient_name: '',
            patient_ph_no: '',
            alert_message: '',
             boxAll: false,
            
            hospital_id: this.props.match.params.id
        }
        this.addPatientNameHandler = this.addPatientNameHandler.bind(this);
        this.addPhoneNumberHandler = this.addPhoneNumberHandler.bind(this);
        
        this.savePatient = this.savePatient.bind(this);
        this.cancel = this.cancel.bind(this);
        
    }
   
    


     
    addPatientNameHandler= (event) => {
        this.setState({patient_name: event.target.value});
    }

    addPhoneNumberHandler= (event) => {
        this.setState({patient_ph_no: event.target.value});
    }

     handleChange = event => {
    this.setState({ boxAll: event.target.checked });
  };
   

    savePatient = (e) => {
        
       if(this.state.boxAll===true)
       {
        e.preventDefault();
        let patient = {patient_name: this.state.patient_name, patient_ph_no: this.state.patient_ph_no, hospital_id: this.state.hospital_id};
    
        PatientService.createPatient(patient).then(res => {
            HospitalService.changeTotalNumBedsById(this.state.hospital_id).then(res => {
                this.props.history.push('/book-hospital');
                
            })
        });
       }
       else
       {
          alert("Due to the current covid situation beds are alloted if you have comorbidites,For others virtual consultation with doctor is recommended.Head over to doctor appointment page") 
       }       
       
        
    }
    
    

    cancel () {
        this.props.history.push('/book-hospital');
    }
    

    render() {
       
       
        return (
            
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">Book Hospital</h3>
                            <div className = "card-body">
                                <form action="">
                                    <div className = "form-group">
                                        <label>Patient Name</label>
                                        <input placeholder="Patient Name" name = "patient_name" className = "form-control" 
                                            value = {this.state.patient_name} onChange = {this.addPatientNameHandler} required/>
                                    </div>

                                    <div className = "form-group">
                                        <label>Phone Number</label>
                                        <input placeholder="Phone Number" name = "patient_ph_no" className = "form-control" 
                                            value = {this.state.patient_ph_no} onChange = {this.addPhoneNumberHandler} required/>
                                    </div>
                                    <div>
                                    <text>Medical Conditions:(If any)</text>
                                    </div>
                                    <div>
                                    <FormGroup row>
                                    <FormControlLabel 
                                    control={<Checkbox color="primary"  onChange={this.handleChange}   />}
                                    label="Asthma"
                                    />
                                    </FormGroup>
                                    
                                    </div>
                                    <div>
                                    <FormGroup row>
                                    <FormControlLabel 
                                    control={<Checkbox color="primary"  onChange={this.handleChange} />}
                                    label="Type 2 Diabetes"
                                    />
                                    </FormGroup>
                                    
                                    </div>
                                    <div>
                                    <FormGroup row>
                                    <FormControlLabel 
                                    control={<Checkbox color="primary"  onChange={this.handleChange} />}
                                    label="Chronic obstructive pulmonary disease (COPD)"
                                    />
                                    </FormGroup>
                                    
                                    </div>
                                    

                                    
                                    <button className = "btn btn-success" onClick = {this.savePatient}>Save</button>
                                    
                                    <button className = "btn btn-danger" onClick = {this.cancel} style = {{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookHospitalComponent;
