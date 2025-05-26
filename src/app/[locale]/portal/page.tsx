"use client"

import {
  Button,
  makeStyles,
  tokens,
  FluentProvider,
  webLightTheme
} from "@fluentui/react-components";
import {
  HomeRegular
} from "@fluentui/react-icons";
import { Sidebar } from "./components/Sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DashboardCharts } from '@/components/DashboardCharts';

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    minHeight: "100vh",
    fontSize: "1rem", // This will be 2rem because of root size
  },
  sidebar: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "1rem",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  content: {
    padding: "2rem",
  },
  menuButton: {
    width: "100%",
    justifyContent: "flex-start",
    padding: "0.5rem 1rem",
    fontSize: "1rem", // This will be 2rem because of root size
    "& svg": {
      width: "32px",
      height: "32px",
    }
  },
  userSection: {
    marginTop: "auto",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingTop: "1rem",
  }
});

export default function AdminDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Sidebar />


      <div className={styles.content}>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <DashboardCharts />
      </div>
    </div>
  );
}