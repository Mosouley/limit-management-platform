import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Building2, CreditCard, FileText, AlertTriangle, BarChart3, Home } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Building2, label: "Counterparties", path: "/counterparties" },
    { icon: CreditCard, label: "Limits", path: "/limits" },
    { icon: BarChart3, label: "Exposures", path: "/exposures" },
    { icon: AlertTriangle, label: "Exceptions", path: "/exceptions" },
    { icon: FileText, label: "Approvals", path: "/approvals" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};