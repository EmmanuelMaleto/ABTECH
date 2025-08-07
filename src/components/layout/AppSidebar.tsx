import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: null,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: null,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: null,
  },
  {
    title: "Leave Management",
    url: "/leave",
    icon: null,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: null,
  },
  {
    title: "Recruitment",
    url: "/recruitment",
    icon: null,
  },
  {
    title: "Performance",
    url: "/performance",
    icon: null,
  },
];

const adminItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: null,
  },
  {
    title: "Compliance",
    url: "/compliance",
    icon: null,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) => {
    const active = isActive(path);
    return `w-full justify-start transition-colors ${
      active 
        ? "bg-primary text-primary-foreground font-medium" 
        : "hover:bg-secondary hover:text-secondary-foreground"
    }`;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">Abtech</h2>
              <p className="text-sm text-muted-foreground">HRMS</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {!collapsed && <span>{item.title}</span>}
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