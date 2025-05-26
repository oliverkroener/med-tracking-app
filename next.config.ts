import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Remove the i18n config since next-intl handles the routing
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
