import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// export
function show__alert(mensaje, icono, foco=""){
    onFocus(foco)
    const mySwal = withReactContent(Swal)
    mySwal.fire({
        title: mensaje,
        icon: icono,
        confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
        cancelButtonColor: '#d33',
    })
}

function showAlertDelete(empresa){
    const MySwal = withReactContent(Swal)
    return MySwal.fire({
            title: "Seguro que quieres eliminar la empresa " + empresa + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
    })
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



export {show__alert, buscarEnTabla, showAlertDelete}