import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function showAlert(mensaje, icono, tipo="", foco=""){
    if(tipo === "eliminar"){
        const MySwal = withReactContent(Swal)
        return MySwal.fire({
                title: mensaje,
                icon: icono,
                confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
                cancelButtonColor: '#d33',
                showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
        })
    }else{
        onFocus(foco)
        const mySwal = withReactContent(Swal)
        mySwal.fire({
            title: mensaje,
            icon: icono,
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
        })
    }
}


function onFocus(foco){
    if (foco !== "") {
        document.getElementById(foco).focus()
    }
}

const buscarEnTabla = (value, itemsArray, colsArray) => {
    return itemsArray.filter((item) => {
        return colsArray.some((col) => {
            return item.hasOwnProperty(col) && item[col].toLowerCase().includes(value.toLowerCase())
        })
    })
} 



export {buscarEnTabla, showAlert}