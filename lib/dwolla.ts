import { Client } from "dwolla-v2";

function getEnvironment(): "sandbox" | "production" {
    const env = process.env.DWOLLA_ENVIRONMENT_TYPE as string;
    if (!env) {
        throw new Error("Environment type not found");
    }
    switch (env) {
        case "sandbox":
            return "sandbox";
        case "production":
            return "production";
        default:
            throw new Error("Invalid environment type");
    }
}

export const dwolla = new Client({
    key: process.env.DWOLLA_API_KEY as string,
    secret: process.env.DWOLLA_API_SECRET as string,
    environment: getEnvironment(),
});



