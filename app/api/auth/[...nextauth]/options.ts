import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/lib/actions/user.action";
import { BadRequestError, UnauthorizedError } from "@/lib/errors";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password)
          throw new BadRequestError("Missing email or password");
        const user = await login({
          email: credentials.email,
          password: credentials.password,
        });
        if (!user) throw new UnauthorizedError("Invalid email or password");
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.dwollaCustomerId = user.dwollaCustomerId;
        token.dwollaCustomerUrl = user.dwollaCustomerUrl;
        token.avatarColor = user.avatarColor;
        token.avatarTextColor = user.avatarTextColor;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.dwollaCustomerId = token.dwollaCustomerId;
      session.user.dwollaCustomerUrl = token.dwollaCustomerUrl;
      session.user.avatarColor = token.avatarColor;
      session.user.avatarTextColor = token.avatarTextColor;
      return session;
    },
  },
};
