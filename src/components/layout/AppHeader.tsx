import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import React, { useState } from "react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Input 
                placeholder="Search employees, departments..." 
                className="pl-9 w-80" 
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <span className="text-xl">🔔</span>
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="right-0 top-0 w-full max-w-sm fixed h-full rounded-none border-l shadow-lg flex flex-col">
              <DrawerHeader>
                <DrawerTitle>Notifications</DrawerTitle>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                  <div className="font-medium">Contract Expiry Alert</div>
                  <div className="text-xs text-muted-foreground">3 contracts expiring this month</div>
                </div>
                <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                  <div className="font-medium">Compliance Check</div>
                  <div className="text-xs text-muted-foreground">All systems up to date</div>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <div className="font-medium">New Employee Added</div>
                  <div className="text-xs text-muted-foreground">Welcome Jane Doe to the team!</div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    HR
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">HR Manager</p>
                  <p className="text-sm text-muted-foreground">hr@abtech.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}