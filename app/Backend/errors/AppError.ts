class AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    details: unknown = undefined,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export default AppError;
