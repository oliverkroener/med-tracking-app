"use client"

import { Button } from "@fluentui/react-components";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface MenuButtonProps {
  isActive?: boolean;
  icon: ReactNode;
  href?: string;
  className?: string;
  children: ReactNode;
}

export const MenuButton: FC<MenuButtonProps> = ({
  isActive,
  icon,
  href,
  className,
  children
}) => {
  const buttonContent = (
    <Button
      appearance={isActive ? "primary" : "subtle"}
      icon={icon}
      className={className}
      style={{ fontSize: '1rem' }}
    >
      {children}
    </Button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
};