import axios from 'axios';
import { getHeaders } from '../utils/utils';

const URL_ENDPOINT = '/tipo';


const getAll = async () => {
    const result = await axios.get(URL_ENDPOINT,{headers: getHeaders()});
    return result;
}

const getOne = async (id) => {
    const result = await axios.get(`${URL_ENDPOINT}/${id}`,{headers: getHeaders()});
    return result;
}

const insert = async (data) => {
    const result = await axios.post(URL_ENDPOINT,data,{headers: getHeaders()});
    return result;
}

const del = async (id) => {
    const result = await axios.delete(`${URL_ENDPOINT}/${id}`,{headers: getHeaders()});
    return result;
}

const update = async (id,data) => {
    const result = await axios.patch(`${URL_ENDPOINT}/${id}`,data,{headers: getHeaders()});
    return result;
}


export default {getAll,getOne,insert,del,update}