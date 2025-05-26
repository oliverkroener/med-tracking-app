import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import AzureAD from 'next-auth/providers/azure-ad';

const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      authorization: {
        params: {
          scope: "openid email profile"
        }
      },
      userinfo: {
        url: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          groups: profile.groups || []
        };
      }
    }),
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === 'keycloak' && profile) {
        token.groups = profile.groups;
        token.id = profile.sub;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.groups = token.groups as string[] || [];
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  events: {
    async signOut({ token, session }) {
      if (token?.accessToken) {
        token.accessToken = null;
      }
    }
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };