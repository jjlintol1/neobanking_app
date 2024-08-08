import { CustomError } from "./customError";

export default class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, 409);
    }
}