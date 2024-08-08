import { CustomError } from "./customError";

export default class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}