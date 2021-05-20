import React, { Component } from 'react';
import HospitalService from '../services/HospitalService';

class CreateHospitalComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hospital_name: '',
            district: '',
            state: '',
            total_num_beds: ''
        }
        this.changeHospitalNameHandler = this.changeHospitalNameHandler.bind(this);
        this.changeDistrictHandler = this.changeDistrictHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeTotalNumBedsHandler = this.changeTotalNumBedsHandler.bind(this);

        this.saveHospital = this.saveHospital.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    changeHospitalNameHandler= (event) => {
        this.setState({hospital_name: event.target.value});
    }

    changeDistrictHandler= (event) => {
        this.setState({district: event.target.value});
    }

    changeStateHandler= (event) => {
        this.setState({state: event.target.value});
    }

    changeTotalNumBedsHandler= (event) => {
        this.setState({total_num_beds: event.target.value});
    }

    saveHospital = (e) => {
        e.preventDefault();
        let hospital = {hospital_name: this.state.hospital_name, district: this.state.district, state: this.state.state, total_num_beds: this.state.total_num_beds};
        console.log('Hospital => ' + JSON.stringify(hospital));

        HospitalService.createHospital(hospital).then(res => {
            this.props.history.push('/hospitals');
        });
    }

    cancel () {
        this.props.history.push('/hospitals');
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">Add Hospital</h3>
                            <div className = "card-body">
                                <form action="">
                                    <div className = "form-group">
                                        <label>Hospital Name</label>
                                        <input placeholder="Hospital Name" name = "hospital_name" className = "form-control" 
                                            value = {this.state.hospital_name} onChange = {this.changeHospitalNameHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label>District</label>
                                        <input placeholder="District" name = "district" className = "form-control" 
                                            value = {this.state.district} onChange = {this.changeDistrictHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label>State</label>
                                        <input placeholder="State" name = "state" className = "form-control" 
                                            value = {this.state.state} onChange = {this.changeStateHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label>Total Number of Beds</label>
                                        <input placeholder="Total Number of Beds" name = "total_num_beds" className = "form-control" 
                                            value = {this.state.total_num_beds} onChange = {this.changeTotalNumBedsHandler}/>
                                    </div>

                                    <button className = "btn btn-success" onClick = {this.saveHospital}>Save</button>
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

export default CreateHospitalComponent;