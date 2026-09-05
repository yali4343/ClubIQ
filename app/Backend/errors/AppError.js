class AppError extends Error {
  constructor(message, statusCode, code, details = undefined) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export default AppError;
