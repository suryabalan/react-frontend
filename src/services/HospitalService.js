import axios from 'axios';

const HOSPITAL_API_BASE_URL = "https://hms24.azurewebsites.net/quarantine/api/v1/hospitals";

const V_URL = "https://hms24.azurewebsites.net/quarantine/api/v1/"
class HospitalService {

        getHospitals(){
            return axios.get(HOSPITAL_API_BASE_URL);
        }

        createHospital(hospital){
            return axios.post(HOSPITAL_API_BASE_URL, hospital);
        }

        getHospitalById(hospitalId){
            return axios.get(HOSPITAL_API_BASE_URL + '/' + hospitalId);
        }

        changeTotalNumBedsById(hospitalId){
            return axios.put(HOSPITAL_API_BASE_URL + '/' + hospitalId);
        }

        getAllStates(){
            return axios.get(HOSPITAL_API_BASE_URL + "/states");
        }

        getAllDistricts(state_id){
            return axios.get(HOSPITAL_API_BASE_URL + "/states/" + state_id);
        }

        getAllHospitalsInDistrict(district){
            return axios.get(HOSPITAL_API_BASE_URL + "/districts/" + district);
        }
        getVdHospitals(){
            return axios.get(V_URL+ "/vm");
        }
}

// export object of this class
export default new HospitalService()