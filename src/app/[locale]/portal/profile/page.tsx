"use client"

import { useSession } from "next-auth/react";
import { 
  Card, 
  CardHeader,
  Text,
  Badge,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { Sidebar } from "../components/Sidebar";
import { redirect } from "next/navigation";
import { useTranslations } from 'next-intl';

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    minHeight: "100vh",
    fontSize: "1rem",
  },
  content: {
    padding: "2rem",
  }
});

export default function ProfilePage() {
  const styles = useStyles();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const t = useTranslations('profile');

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        <Card>
          <CardHeader
            header={<Text size={500} weight="semibold">Profile Information</Text>}
          />
          <div className="p-4">
            <div className="mb-4">
              <Text weight="semibold">Email:</Text>
              <Text>{session?.user?.email}</Text>
            </div>
            
            <div className="mb-4">
              <Text weight="semibold">Groups:</Text>
              <div className="flex flex-wrap gap-2 mt-2">
                {session?.user?.groups?.map((group, index) => (
                  <Badge 
                    key={index}
                    appearance="filled"
                    color="brand"
                  >
                    {group}
                  </Badge>
                )) || <Text>No groups assigned</Text>}
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}