import React, { Component } from 'react';
import HospitalService from '../services/HospitalService';

class ListHospitalComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            state_list: []
    
        }
        this.viewDistricts = this.viewDistricts.bind(this);
    }

    // call rest api
    componentDidMount(){
        HospitalService.getAllStates().then((res) => {
            this.setState({state_list: res.data});
        });
        
    }

    viewDistricts(state_id) {
        this.props.history.push(`/states/${state_id}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">States</h2>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>                          
                                <th>State</th>
                                <th>View</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.state_list.map(
                                    st => 
                                    <tr key = {st.state}>
                                        <td>{st.state}</td>                                  
                                        <td><button onClick = {() => this.viewDistricts(st.state_id)} className = "btn btn-info">View</button></td>
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