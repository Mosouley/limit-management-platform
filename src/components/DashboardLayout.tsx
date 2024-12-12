import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Building2, CreditCard, FileText, AlertTriangle, BarChart3, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
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
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="flex h-14 items-center justify-between border-b px-6">
              <span className="font-semibold">Credit Management</span>
              <ThemeToggle />
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path} 
                        className={`flex items-center gap-3 ${
                          location.pathname === item.path 
                            ? 'text-primary' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
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
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};