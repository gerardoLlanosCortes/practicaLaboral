export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
        "Accept": 'application/json',
        "authorization": "Bearer: " + localStorage.getItem("user-token")
    }
}

export const getHeadersData = () => {
    return {
        "Content-Type": "multipart/form-data",
        "Accept": 'application/json',
        "authorization": "Bearer: " + localStorage.getItem("user-token")
    }
}