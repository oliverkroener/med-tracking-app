export const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM || 'medicine-tracking',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'your-client-id',
  url: process.env.KEYCLOAK_URL || 'https://sso.kroener.digital/auth',
};