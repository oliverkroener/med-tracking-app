"use client"

import {
  Button,
  Card,
  CardHeader,
  CardPreview,
  Title3,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  Shield24Regular,
  DocumentText24Regular,
  Stethoscope24Regular,
} from "@fluentui/react-icons";
import { GB, US, DE, ES, FR } from 'country-flag-icons/react/3x2';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useContext } from "react";
import { ThemeContext } from "./providers";
import { usePathname, useRouter } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { customLightTheme } from '@/theme/theme';
import { useLocale } from 'next-intl';

const useStyles = makeStyles({
  colorBrandBackground: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  heroSection: {
    background: `linear-gradient(135deg, ${customLightTheme.colorBrandBackground2} 0%, ${customLightTheme.colorBrandBackground} 100%)`,
    color: customLightTheme.colorNeutralForegroundOnBrand,
  },
  card: {
    maxWidth: "350px",
    height: "100%",
  },
  footer: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

export default function LandingPage() {
  const styles = useStyles();
  const t = useTranslations('landing');
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const languages = [
    { 
      code: 'en', 
      label: 'English (US)', 
      icon: <US title="US English" className="w-6 h-4" /> 
    },
    { 
      code: 'en-GB', 
      label: 'English (UK)', 
      icon: <GB title="British English" className="w-6 h-4" /> 
    },
    { 
      code: 'de', 
      label: 'Deutsch', 
      icon: <DE title="Deutsch" className="w-6 h-4" /> 
    },
    { 
      code: 'es', 
      label: 'Español', 
      icon: <ES title="Español" className="w-6 h-4" /> 
    },
    { 
      code: 'fr', 
      label: 'Français', 
      icon: <FR title="Français" className="w-6 h-4" /> 
    },
  ];

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(/^\/[^\/]+/, `/${newLocale}`);
    router.push(newPathname);
  };

  const features = [
    {
      title: t('features.digitalPrescriptions.title'),
      description: t('features.digitalPrescriptions.description'),
      icon: <DocumentText24Regular />,
    },
    {
      title: t('features.secureAccess.title'),
      description: t('features.secureAccess.description'),
      icon: <Shield24Regular />,
    },
    {
      title: t('features.medicineTracking.title'),
      description: t('features.medicineTracking.description'),
      icon: <Stethoscope24Regular />,
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(`/${pathname.split('/')[1]}${path}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className={`${styles.heroSection} py-20 px-6`}>
        <div className="max-w-7xl mx-auto text-center">
          <Title3 className="text-4xl font-bold mb-6">
            {t('hero.title')}
          </Title3>
          <Text className="text-xl mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </Text>
          <Button appearance="primary" size="large">
            {t('auth.startTrial')}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={styles.card}>
                <CardPreview>
                  <div className="p-6">
                    {feature.icon}
                  </div>
                </CardPreview>
                <CardHeader
                  header={<Text weight="semibold">{feature.title}</Text>}
                  description={<Text>{feature.description}</Text>}
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}