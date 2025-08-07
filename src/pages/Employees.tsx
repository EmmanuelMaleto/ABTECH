import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Software Engineer",
    department: "Engineering",
    email: "sarah.johnson@abtech.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    department: "Product",
    email: "michael.chen@abtech.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    position: "UX Designer",
    department: "Design",
    email: "alex.rodriguez@abtech.com",
    phone: "+1 (555) 345-6789",
    status: "On Leave",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "HR Specialist",
    department: "Human Resources",
    email: "emily.davis@abtech.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    avatar: "/api/placeholder/40/40"
  },
];

export default function Employees() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const openDialog = (msg: string) => { setDialogMsg(msg); setDialogOpen(true); };
  const closeDialog = () => setDialogOpen(false);
  const hasEmployees = employees.length > 0;
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground">Manage your team members and their information</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover" onClick={() => openDialog("Demo: This would open the Add Employee page or modal.")}>
          <span>+</span>
          Add Employee
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">🔍</span>
          <Input 
            placeholder="Search employees..." 
            className="pl-9" 
          />
        </div>
        <Button variant="outline" size="sm">
          <span>🧰</span>
          Filter
        </Button>
      </div>
      {hasEmployees ? (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <span>⋮</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>View Attendance</DropdownMenuItem>
                    <DropdownMenuItem>Performance Review</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Department:</span>
                <Badge variant="secondary">{employee.department}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge 
                  variant={employee.status === 'Active' ? 'default' : 'destructive'}
                  className={employee.status === 'Active' ? 'bg-success text-success-foreground' : ''}
                >
                  {employee.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>✉️</span>
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>📞</span>
                <span>{employee.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <span className="h-12 w-12 mb-4 text-primary">+</span>
          <h2 className="text-2xl font-semibold mb-2">No Employees Found</h2>
          <p className="mb-4">Get started by adding your first employee to the directory.</p>
          <Button className="bg-primary hover:bg-primary-hover" onClick={() => openDialog("Demo: This would open the Add Employee page or modal.")}>
            <span>+</span>
            Add Employee
          </Button>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={open => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo Action</DialogTitle>
            <DialogDescription>{dialogMsg}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}