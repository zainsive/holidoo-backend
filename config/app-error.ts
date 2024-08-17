const errorCodes = {
  404: "not-found",
};

export class AppError extends Error {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
  static badRequest(message: string) {
    return new AppError(400, message);
  }

  static internal(message: string) {
    return new AppError(500, message);
  }

  static notFound(message: string) {
    return new AppError(404, message);
  }
}
