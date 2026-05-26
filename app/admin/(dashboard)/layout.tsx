import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to login if not authenticated (except for login page)
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <main className="md:ml-64">
          <div className="min-h-screen pt-16 md:pt-0">
            <div className="container mx-auto p-6">{children}</div>
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
