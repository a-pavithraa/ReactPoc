import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44336/AutoExceptions'
});

export default instance;