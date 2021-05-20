import React, { Component } from 'react';
import HospitalService from '../services/HospitalService';

class ListHospitalsInDistrictComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            district: this.props.match.params.district,
            hospitals: []
        }
        this.bookHospital = this.bookHospital.bind(this);
        this.viewHospital = this.viewHospital.bind(this);
    }

    componentDidMount(){
        HospitalService.getAllHospitalsInDistrict(this.state.district).then((res) => {
            this.setState({hospitals: res.data});
        });
    }

    bookHospital(id) {
        this.props.history.push(`/book-hospital/${id}`);
    }

    viewHospital(id) {
        this.props.history.push(`/view-hospital/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Hospitals List</h2>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Hospital Name</th>                                        
                                <th>District</th>
                                <th>State</th>
                                <th>Number of Beds</th>
                                <th>Book</th>
                                <th>Doctor Appointment</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.hospitals.map(
                                    hospital => 
                                    <tr key = {hospital.id}>
                                        <td>{hospital.hospital_name}</td>                                        
                                        <td>{hospital.district}</td>
                                        <td>{hospital.state}</td>                                    
                                        <td>{hospital.total_num_beds}</td>
                                        <td>
                                            <button onClick = {() => this.bookHospital(hospital.id)} className = "btn btn-info">Book Bed</button>                                            
                                        </td>
                                        <td>
                                            <button onClick = {() => this.viewHospital(hospital.id)} className = "btn btn-info">Doctor Appointment</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                   
                </div>
            </div>
        );
    }
}

export default ListHospitalsInDistrictComponent;