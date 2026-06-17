import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";

export default async function CompteLayout({ children }: { children: React.ReactNode }) {
  if (!hasDatabase()) redirect("/pro/onboarding");
  const session = await auth().catch(() => null);
  if (!session?.user?.email) redirect("/pro/onboarding");
  return <>{children}</>;
}
