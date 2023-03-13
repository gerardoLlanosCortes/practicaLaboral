import axios from 'axios';
import { getHeaders } from '../utils/utils';

const URL_ENDPOINT = '/gastos';

const getAll = async () => {
    const result = await axios.get(URL_ENDPOINT,{headers: getHeaders()});
    return result;
}

export default {getAll}