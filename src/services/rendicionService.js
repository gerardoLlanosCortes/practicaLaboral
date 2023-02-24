import axios from 'axios';
import { getHeaders, getHeadersData } from '../utils/utils';

const URL_ENDPOINT = '/rendicion';


const getAll = async () => {
    const result = await axios.get(URL_ENDPOINT,{headers: getHeaders()});
    return result;
}

const getOne = async (id) => {
    const result = await axios.get(`${URL_ENDPOINT}/${id}`,{headers: getHeaders()});
    return result;
}

// Encabezado

const insertEnc = async (data) => {
    const result = await axios.post(URL_ENDPOINT,data,{headers: getHeaders()});
    return result;
}

const delEnc = async (id) => {
    const result = await axios.delete(`${URL_ENDPOINT}/${id}`,{headers: getHeaders()});
    return result;
}

const updateEnc = async (id,data) => {
    const result = await axios.patch(`${URL_ENDPOINT}/${id}`,data,{headers: getHeaders()});
    return result;
}

// Detalle

const insertDet = async (idEnc,data) => {
    const result = await axios.post(`${URL_ENDPOINT}/${idEnc}`,data,{headers: getHeadersData()});
    return result;
}

const delDet = async (idEnc,idDet) => {
    const result = await axios.delete(`${URL_ENDPOINT}/${idEnc}/${idDet}`,{headers: getHeaders()});
    return result;
}

const updateDet = async (idEnc,idDet,data) => {
    const result = await axios.patch(`${URL_ENDPOINT}/${idEnc}/${idDet}`,data,{headers: getHeadersData()});
    return result;
}

const getImage = async (nombreImagen) => {
    const result = await axios.get(`/public/`+ nombreImagen);
    return result;
}

export default {getAll,getOne,insertEnc,delEnc,updateEnc, insertDet, delDet, updateDet, getImage}