const customError = (status, code, message, details) =>{
    const error = new Error(message);
    error.status = status;
    error.code = code;
    error.details = details;
    return error;
}

module.exports = customError;