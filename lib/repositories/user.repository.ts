"use server";

import prisma from "../prisma";

interface CreateUserAccountParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  dwollaCustomerId: string;
  dwollaCustomerUrl: string;
  avatarColor: string;
  avatarTextColor: string;
}

export async function createUserAccount({
  email,
  password,
  firstName,
  lastName,
  username,
  dwollaCustomerId,
  dwollaCustomerUrl,
  avatarColor,
  avatarTextColor,
}: CreateUserAccountParams) {
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password,
        dwollaCustomerId,
        dwollaCustomerUrl,
        avatarColor,
        avatarTextColor,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetUserByIdParams {
  userId: string;
}

export async function getUserById({ userId }: GetUserByIdParams) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetUserByEmailParams {
  email: string;
}

export async function getUserByEmail({ email }: GetUserByEmailParams) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetUserByUsernameParams {
  username: string;
}

export async function getUserByUsername({
  username,
}: GetUserByUsernameParams) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetUsersParams {
  query: string;
  page: number;
  pageSize: number;
}

export async function getUsers({
  query,
  page = 1,
  pageSize = 8,
}: GetUsersParams) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
            },
          },
          {
            username: {
              contains: query,
            },
          },
          {
            firstName: {
              contains: query,
            },
          },
          {
            lastName: {
              contains: query,
            },
          },
        ],
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}
