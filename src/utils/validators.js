const empresaValidator = (value) => {
    return value !== "" && value.length >= 3 && value.length <= 20
}


export {empresaValidator}