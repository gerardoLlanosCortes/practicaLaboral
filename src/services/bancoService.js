import axios from 'axios';

const URL_ENDPOINT = '/banco';

const headers = {
    "Content-Type": "application/json",
    "Accept": 'application/json',
    "authorization": "Bearer: " + localStorage.getItem("user-token")
}

const getAll = async () => {
    const result = await axios.get(URL_ENDPOINT,{headers});
    return result;
}

const getOne = async (id) => {
    const result = await axios.get(`${URL_ENDPOINT}/${id}`,{headers});
    return result;
}

const insert = async (data) => {
    const result = await axios.post(URL_ENDPOINT,data,{headers});
    return result;
}

const del = async (id) => {
    const result = await axios.delete(`${URL_ENDPOINT}/${id}`,{headers});
    return result;
}

const update = async (id,data) => {
    const result = await axios.patch(`${URL_ENDPOINT}/${id}`,data,{headers});
    return result;
}

// const enviarSolicitud = async(metodo, op) => {
//     await axios({method:metodo, url:url, headers:header, data:parametros})
//     .then(function(respuesta){
//         if(respuesta.statusText === "OK"){
//             let tipo = "success"
//             let mensaje = "Accion exitosa"
//             show__alert(mensaje,tipo)
//             document.getElementById("btnCerrar").click()
//             obtenerDatos()
//         }
//     }).catch(function(err){
//         show__alert("Error en la solicitud", "error")
//         console.log(err)
//     })
// }

export default {getAll,getOne,insert, del, update}