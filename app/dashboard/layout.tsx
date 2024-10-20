import BreadcrumbComp from "@/components/Crumbs";
import { validateRequest } from "@/lib/auth";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  return (
    <div className="flex w-full h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-grow">
          <div className="sticky top-0 z-10">
            <BreadcrumbComp />
          </div>
          <div className="flex-grow p-6 overflow-auto">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
