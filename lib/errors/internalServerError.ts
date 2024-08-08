import { CustomError } from "./customError";

export default class InternalServerError extends CustomError {
    constructor(message: string) {
        super(message, 500);
    }
}