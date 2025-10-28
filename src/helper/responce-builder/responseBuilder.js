export default class ResponseBuilder {
  static success(res, statusCode, message, payload = {}) {
   return res.status(statusCode).json({message,...payload,});
  }
  static error(res, statusCode, message, errorMsg = null) {
    const response = { message };
    if (errorMsg) {
      response.error = errorMsg;
    }

    return res.status(statusCode).json(response);
  }
}