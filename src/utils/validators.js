const empresaValidator = (value) => {
    return value !== "" && value.length >= 3 && value.length <= 20
}

const bancoValidator = (value) => {
    return value !== "" && value.length >= 3 && value.length <= 200
}

const itemValidar = (value) => {
    return value !== "" && value.length >= 3 && value.length <= 100
}

const nombreValidar = (value) => {
    return value !== "" && value.length >= 3 && value.length <= 50
}

const cuentaValidar = (value) => {
    return value !== "" && value.length >= 1 && value.length <= 15
}

const imeiValidar = (value) => {
    return value !== "" && value.length >= 1 && value.length <= 15
}



export {empresaValidator, bancoValidator, itemValidar, nombreValidar, cuentaValidar, imeiValidar}