import React, { Component } from 'react';
import HospitalService from '../services/HospitalService';

class ListDistrictComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            state_id: this.props.match.params.state_id,
            district_list: []
        }
        this.viewHospitals = this.viewHospitals.bind(this);
    }

    componentDidMount(){
        HospitalService.getAllDistricts(this.state.state_id).then((res) => {
            this.setState({district_list: res.data});
        });
    }

    viewHospitals(district) {
        this.props.history.push(`/districts/${district}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Districts</h2>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>                          
                                <th>Districts</th>
                                <th>View Hospitals</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.district_list.map(
                                    st => 
                                    <tr key = {st.district}>
                                        <td>{st.district}</td>                                  
                                        <td><button onClick = {() => this.viewHospitals(st.district)}  className = "btn btn-info">View</button></td>
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

export default ListDistrictComponent;

// 