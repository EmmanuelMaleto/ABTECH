import { Users, Clock, DollarSign, TrendingUp, Calendar, UserCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatsCard } from "./StatsCard";
import heroImage from "@/assets/hrms-hero.jpg";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const departments = ["Engineering", "Product", "Design", "Human Resources", "Sales", "Marketing", "Finance"];

function AddEmployeeDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [form, setForm] = useState({ name: "", email: "", department: "", position: "" });
  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleDept = (value: string) => setForm({ ...form, department: value });
  const handleSubmit = (e: any) => { e.preventDefault(); onOpenChange(false); };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Department</FormLabel>
            <FormControl>
              <Select value={form.department} onValueChange={handleDept}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Position</FormLabel>
            <FormControl>
              <Input name="position" value={form.position} onChange={handleChange} required />
            </FormControl>
          </FormItem>
          <DialogFooter>
            <Button type="submit" className="w-full">Add Employee</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Dashboard() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-1 space-y-6 p-6">
      <AddEmployeeDialog open={open} onOpenChange={setOpen} />
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary-hover">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative flex items-center justify-between p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary-foreground">
              Welcome to Abtech HRMS
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Streamline your HR operations with our comprehensive management system
            </p>
            <div className="flex gap-4 mt-4">
              <Button variant="secondary" size="sm">
                Quick Actions
              </Button>
              <Button variant="outline" size="sm" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                View Reports
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src={heroImage} 
              alt="HRMS Dashboard" 
              className="w-96 h-48 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value="247"
          change="+12"
          changeType="increase"
          icon={Users}
          description="from last month"
        />
        <StatsCard
          title="Present Today"
          value="234"
          change="94.7%"
          changeType="increase"
          icon={Clock}
          description="attendance rate"
        />
        <StatsCard
          title="Pending Leave"
          value="18"
          change="+3"
          changeType="neutral"
          icon={Calendar}
          description="requests"
        />
        <StatsCard
          title="Monthly Payroll"
          value="$45,230"
          change="+2.5%"
          changeType="increase"
          icon={DollarSign}
          description="vs last month"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New employee onboarded", name: "Sarah Johnson", time: "2 hours ago", type: "success" },
                { action: "Leave request approved", name: "Michael Chen", time: "4 hours ago", type: "success" },
                { action: "Payroll processed", name: "Finance Department", time: "1 day ago", type: "neutral" },
                { action: "Performance review due", name: "Alex Rodriguez", time: "2 days ago", type: "warning" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-success' : 
                    activity.type === 'warning' ? 'bg-warning' : 'bg-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start h-auto p-3" onClick={() => setOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Add Employee</div>
                  <div className="text-xs text-muted-foreground">Register new team member</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-3">
                <Calendar className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Process Leave</div>
                  <div className="text-xs text-muted-foreground">Review pending requests</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-3">
                <DollarSign className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Generate Payroll</div>
                  <div className="text-xs text-muted-foreground">Monthly payroll processing</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Important Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <AlertCircle className="h-4 w-4 text-warning flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Contract Expiry Alert</p>
                  <p className="text-xs text-muted-foreground">3 contracts expiring this month</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Compliance Check</p>
                  <p className="text-xs text-muted-foreground">All systems up to date</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Engineering", count: 89, color: "bg-primary" },
                { name: "Sales", count: 45, color: "bg-success" },
                { name: "Marketing", count: 32, color: "bg-warning" },
                { name: "HR", count: 12, color: "bg-accent" },
                { name: "Finance", count: 18, color: "bg-destructive" },
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                    <span className="text-sm font-medium">{dept.name}</span>
                  </div>
                  <Badge variant="secondary">{dept.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}