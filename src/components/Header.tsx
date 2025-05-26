import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Switch,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  BookPulse24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";
import { GB, US, DE, ES, FR } from 'country-flag-icons/react/3x2';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from "react";
import { ThemeContext } from "@/app/[locale]/providers";
import Link from "next/link";
import { useLocale } from 'next-intl';

const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    height: "48px",
    width: "auto",
  },
  logoContainer: {
    backgroundColor: tokens.colorBrandBackground,
    padding: "6px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});

export function Header() {
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

  const handleNavigation = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(/^\/[^\/]+/, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <header className={`${styles.header} px-6 py-4`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={styles.logoContainer}>
              <img src="/logo.png" alt="Logo" className={styles.logo} />
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <Menu>
            <MenuTrigger>
              <Button appearance="subtle">
                <span className="flex items-center gap-2">
                  {languages.find(lang => lang.code === locale)?.icon || <US className="w-6 h-4" />}
                  <span>{languages.find(lang => lang.code === locale)?.label || 'English (US)'}</span>
                </span>
              </Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={locale === lang.code ? 'bg-gray-100' : ''}
                  >
                    <span className="flex items-center gap-2">
                      {lang.icon}
                      <span>{lang.label}</span>
                    </span>
                  </MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>

          {/* Theme Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => isDark && toggleTheme()}
              className={`p-1 rounded-full hover:bg-gray-200 transition-colors ${!isDark ? 'text-primary' : 'text-gray-400'
                }`}
              aria-label="Switch to light mode"
            >
              <WeatherSunny24Regular />
            </button>

            <Switch
              checked={isDark}
              onChange={toggleTheme}
              aria-label="Toggle theme"
            />

            <button
              onClick={() => !isDark && toggleTheme()}
              className={`p-1 rounded-full hover:bg-gray-700 transition-colors ${isDark ? 'text-primary' : 'text-gray-200'
                }`}
              aria-label="Switch to dark mode"
            >
              <WeatherMoon24Regular />
            </button>
          </div>

          {/* Auth Buttons */}
          <Button
            appearance="subtle"
            onClick={() => handleNavigation('/signin')}
          >
            {t('auth.signIn')}
          </Button>
          <Button
            appearance="primary"
            onClick={() => handleNavigation('/register')}
          >
            {t('auth.register')}
          </Button>
        </div>
      </nav>
    </header>
  );
}