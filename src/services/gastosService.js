import axios from 'axios';
import { getHeaders } from '../utils/utils';

const URL_ENDPOINT = '/gastos';

const getAll = async (mes,anio) => {
    const result = await axios.get(`${URL_ENDPOINT}/${mes}/${anio}`,{headers: getHeaders()});
    return result;
}

export default {getAll}