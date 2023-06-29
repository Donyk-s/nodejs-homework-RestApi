const HttpError =({ status, message }) => {
    const error = new HttpError( message);
    error.status = status;
    return error;
}
module.exports = HttpError;