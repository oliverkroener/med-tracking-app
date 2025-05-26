import { Text, makeStyles, tokens } from "@fluentui/react-components";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const useStyles = makeStyles({
  footer: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

export function Footer() {
  const styles = useStyles();
  const t = useTranslations('landing');

  return (
    <footer className={`${styles.footer} mt-auto py-12 px-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Text weight="semibold" className="mb-4 block">Company</Text>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm">About Us</Link>
              <Link href="/contact" className="text-sm">Contact</Link>
              <Link href="/careers" className="text-sm">Careers</Link>
            </div>
          </div>
          <div>
            <Text weight="semibold" className="mb-4 block">Legal</Text>
            <div className="flex flex-col gap-2">
              <Link href="/impressum" className="text-sm">Impressum</Link>
              <Link href="/privacy" className="text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-sm">Terms of Service</Link>
            </div>
          </div>
          <div>
            <Text weight="semibold" className="mb-4 block">Resources</Text>
            <div className="flex flex-col gap-2">
              <Link href="/docs" className="text-sm">Documentation</Link>
              <Link href="/support" className="text-sm">Support</Link>
              <Link href="/faq" className="text-sm">FAQ</Link>
            </div>
          </div>
          <div>
            <Text weight="semibold" className="mb-4 block">Connect</Text>
            <div className="flex flex-col gap-2">
              <Link href="/blog" className="text-sm">Blog</Link>
              <Link href="https://twitter.com" className="text-sm">Twitter</Link>
              <Link href="https://linkedin.com" className="text-sm">LinkedIn</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Text size="small" className="text-center block">
            © {new Date().getFullYear()} MedTracker. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}