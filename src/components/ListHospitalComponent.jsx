import React, { Component } from 'react';
import HospitalService from '../services/HospitalService';

class ListHospitalComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hospitals: []
        }
        this.addHospital = this.addHospital.bind(this);
        this.bookHospital = this.bookHospital.bind(this);
        this.viewHospital = this.viewHospital.bind(this);
    }

    // call rest api
    componentDidMount(){
        HospitalService.getHospitals().then((res) => {
            this.setState({hospitals: res.data});
        });
    }

    addHospital(){
        this.props.history.push('/add-hospital'); // mention the component to navigate to, on click of button add hosp
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
                {/* <div>
                    <button className = "btn btn-primary" onClick = {this.addHospital}>Add Hospital</button>
                </div> */}
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Hospital Name</th>                                        
                                <th>District</th>
                                <th>State</th>
                                <th>Number of Beds</th>
                                <th>Book</th>
                                <th>View</th>
                                
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
                                            <button onClick = {() => this.bookHospital(hospital.id)} className = "btn btn-info">Book</button>                                            
                                        </td>
                                        <td>
                                            <button onClick = {() => this.viewHospital(hospital.id)} className = "btn btn-info">View</button>
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

export default ListHospitalComponent;