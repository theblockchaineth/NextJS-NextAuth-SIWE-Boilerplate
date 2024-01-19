import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ token }) => {
      if (token) return true;
      return false;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: ["/protected"],
};
