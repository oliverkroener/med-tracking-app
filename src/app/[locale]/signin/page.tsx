"use client"

import { useEffect, useState } from "react";
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/Header';
import {
  Card,
  CardHeader,
  Button,
  Text,
  makeStyles,
  tokens,
  useFluent,
  useId,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
  },
  center: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  logoBox: {
    background: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusXLarge,
    padding: "1.5rem 0",
    margin: "0 2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: "48px",
    width: "auto",
  },
  button: {
    width: "100%",
    marginTop: tokens.spacingVerticalM,
    paddingTop: "14px",
    paddingBottom: "14px",
    justifyContent: "flex-start",
    gap: tokens.spacingHorizontalM,
    fontWeight: 500,
  },
  providerIcon: {
    borderRadius: "4px",
    background: tokens.colorNeutralBackground3,
  }
});

export default function SignIn() {
  const styles = useStyles();
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/portal';
  const { theme } = useFluent();

  const getProviderLogo = (providerId: string) => {
    switch (providerId) {
      case 'keycloak':
        return '/login-logos/keycloak.svg';
      case 'azure-ad':
        return '/login-logos/azure.svg';
      default:
        return '';
    }
  };

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <main className={styles.root} data-theme={theme}>
      <Header />
      <div className={styles.center}>
        <Card className={styles.card}>
          <CardHeader
            header={
              <div style={{ textAlign: "center", width: "100%" }}>
                <Text size={600} weight="semibold">
                  Sign in
                </Text>
              </div>
            }
          />
          <div style={{ padding: "0 2rem 2rem 2rem" }}>
            {providers && Object.values(providers).map((provider) => (
              <Button
                key={provider.name}
                appearance="secondary"
                className={styles.button}
                icon={
                  <Image
                    src={getProviderLogo(provider.id)}
                    alt={`${provider.name} logo`}
                    width={24}
                    height={24}
                    className={styles.providerIcon}
                  />
                }
                onClick={() => signIn(provider.id, { callbackUrl })}
              >
                Continue with {provider.name}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
