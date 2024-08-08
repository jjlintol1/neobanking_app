import prisma from '../prisma';

interface CreateAccessTokenParams {
    userId: string;
    accessToken: string;
}

export async function createAccessToken({ userId, accessToken }: CreateAccessTokenParams) {
    try {
        return await prisma.accessToken.create({
            data: {
                userId,
                token: accessToken,
            },
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

interface GetAllUserAccessTokensParams {
    userId: string;
}

export async function getAllUserAccessTokens({ userId }: GetAllUserAccessTokensParams) {
    try {
        return await prisma.accessToken.findMany({
            where: {
                userId,
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

interface GetAccessTokenParams {
    accessToken: string;
    userId: string;
}

export async function getAccessToken({ accessToken, userId }: GetAccessTokenParams) {
    try {
        return await prisma.accessToken.findFirst({
            where: {
                token: {
                    equals: accessToken,
                },
                userId: {
                    equals: userId,
                },     
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

interface UpdateAccessTokenCursorParams {
    accessToken: string;
    cursor: string;
}

export async function updateAccessTokenCursor({
    accessToken,
    cursor
}: UpdateAccessTokenCursorParams) {
    try {
        return await prisma.accessToken.update({
            where: {
                token: accessToken,
            },
            data: {
                cursor,
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}