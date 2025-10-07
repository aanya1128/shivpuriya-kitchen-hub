import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Tag,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from 'react-i18next';

export function AdminSidebar() {
  const { t } = useTranslation();
  
  const menuItems = [
    { title: t('dashboard'), url: "/admin", icon: LayoutDashboard, end: true },
    { title: t('products'), url: "/admin/products", icon: Package },
    { title: t('orders'), url: "/admin/orders", icon: ShoppingCart },
    { title: t('customers'), url: "/admin/customers", icon: Users },
    { title: t('coupons'), url: "/admin/coupons", icon: Tag },
    { title: t('analytics'), url: "/admin/analytics", icon: BarChart3 },
    { title: t('settings'), url: "/admin/settings", icon: Settings },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('adminPanel')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.end}
                      className={({ isActive }) => 
                        isActive ? "bg-accent text-accent-foreground" : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
