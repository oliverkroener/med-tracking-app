"use client"

import {
  makeStyles,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  AppItem,
  Hamburger,
} from "@fluentui/react-nav-preview";
import {
  bundleIcon,
  HomeRegular,
  Home20Filled,
  DocumentRegular,
  Document20Filled,
  SettingsRegular,
  Settings20Filled,
  PersonRegular,
  Person20Filled,
  SignOutRegular,
  SignOut20Filled,
  PersonCircle32Regular,
} from "@fluentui/react-icons";
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

const Home = bundleIcon(Home20Filled, HomeRegular);
const Document = bundleIcon(Document20Filled, DocumentRegular);
const Settings = bundleIcon(Settings20Filled, SettingsRegular);
const Person = bundleIcon(Person20Filled, PersonRegular);
const SignOut = bundleIcon(SignOut20Filled, SignOutRegular);

const useStyles = makeStyles({
  sidebar: {
    height: "100vh",
    position: "sticky",
    top: 0,
    transition: "width 0.2s",
    width: "var(--sidebar-width)",
    overflow: "hidden",
  },
  nav: {
    minWidth: "unset",
    transition: "min-width 0.2s, max-width 0.2s",
  }
});

export function Sidebar() {
  const styles = useStyles();
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split('/')[1] || 'en';

  const currentPath = pathname
    ?.split('/')
    .filter((segment, index) => index > 1)
    .join('/');

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true
    });
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={styles.sidebar}
      style={{
        // 200px when open, 56px (just icons) when closed
        ["--sidebar-width" as any]: isOpen ? "200px" : "56px"
      }}
    >
      <NavDrawer
        className={styles.nav}
        defaultSelectedValue={currentPath}
        type="inline"
        open={true}
        style={
          isOpen
            ? { minWidth: "250px" }
            : { minWidth: "56px", maxWidth: "56px", overflow: "hidden" }
        }
      >
        <NavDrawerHeader>
          <Tooltip content={isOpen ? "Close Navigation" : "Open Navigation"} relationship="label">
            <Hamburger onClick={() => setIsOpen(!isOpen)} />
          </Tooltip>
        </NavDrawerHeader>
        <NavDrawerBody>
          <AppItem icon={<PersonCircle32Regular />}>
            {isOpen && t('appTitle')}
          </AppItem>
          <NavItem icon={<Home />} value="portal" onClick={() => router.push(`/${locale}/portal`)}>
            {isOpen && t('menu.dashboard')}
          </NavItem>
          <NavItem icon={<Document />} value="portal/prescriptions" onClick={() => router.push(`/${locale}/portal/prescriptions`)}>
            {isOpen && t('menu.prescriptions')}
          </NavItem>
          <NavItem icon={<Settings />} value="portal/settings" onClick={() => router.push(`/${locale}/portal/settings`)}>
            {isOpen && t('menu.settings')}
          </NavItem>
          <NavItem icon={<Person />} value="portal/profile" onClick={() => router.push(`/${locale}/portal/profile`)}>
            {isOpen && t('user.profile')}
          </NavItem>
          <NavItem icon={<SignOut />} onClick={handleSignOut}>
            {isOpen && t('user.signOut')}
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
    </aside>
  );
}