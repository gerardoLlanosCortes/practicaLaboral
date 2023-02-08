import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show__alert(mensaje, icono, foco=""){
    onFocus(foco)
    const mySwal = withReactContent(Swal)
    mySwal.fire({
        title: mensaje,
        icon: icono,
        confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
        cancelButtonColor: '#d33',
    })
}

function onFocus(foco){
    if (foco !== "") {
        document.getElementById(foco).focus()
    }
}