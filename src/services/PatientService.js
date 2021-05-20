import axios from 'axios';

const PATIENT_API_BASE_URL = "https://hms24.azurewebsites.net/quarantine/api/v1/patients";
const BASE = "https://hms24.azurewebsites.net/quarantine/api/v1/virtual";

class PatientService {

        getPatients(){
            return axios.get(PATIENT_API_BASE_URL);
        }

        createPatient(patient){
            return axios.post(PATIENT_API_BASE_URL, patient);
        }
        createVpatient(virtual){
            return axios.post(BASE, virtual);
        }
}

export default new PatientService()