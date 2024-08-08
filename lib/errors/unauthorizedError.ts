import { CustomError } from "./customError";

export default class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}