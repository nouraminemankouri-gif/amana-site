import { notFound } from "next/navigation";
import { auth, isAdminEmail } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!hasDatabase()) notFound();
  const session = await auth().catch(() => null);
  if (!session?.user?.email || !isAdminEmail(session.user.email)) notFound();
  return <>{children}</>;
}
