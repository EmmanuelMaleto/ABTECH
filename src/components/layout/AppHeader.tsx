import { Bell, Search, User, LogOut, Settings, AlertCircle, CheckCircle2 } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

function ProfileDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 p-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/api/placeholder/80/80" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">HR</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="font-semibold text-lg">HR Manager</div>
            <div className="text-muted-foreground text-sm">hr@abtech.com</div>
            <div className="text-xs mt-1">Role: Admin</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AppHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search employees, departments..." 
                className="pl-9 w-80" 
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <div className="font-semibold mb-2">Notifications</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-warning/10 border border-warning/20">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <div>
                      <div className="text-sm font-medium">Contract Expiry Alert</div>
                      <div className="text-xs text-muted-foreground">3 contracts expiring this month</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-success/10 border border-success/20">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <div>
                      <div className="text-sm font-medium">Compliance Check</div>
                      <div className="text-xs text-muted-foreground">All systems up to date</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/10 border border-muted/20">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">New Employee Onboarded</div>
                      <div className="text-xs text-muted-foreground">Sarah Johnson joined Engineering</div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}