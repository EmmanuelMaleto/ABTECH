import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import { Calendar, DollarSign, UserCheck, TrendingUp, Settings as SettingsIcon, Shield, AlertCircle } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";

const queryClient = new QueryClient();

const EmptyState = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
    <Icon className="h-12 w-12 mb-4 text-primary" />
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p>{description}</p>
  </div>
);

const AttendanceEmpty = () => <EmptyState icon={Calendar} title="Attendance Management" description="Track and manage employee attendance here. Feature coming soon!" />;
const LeaveEmpty = () => <EmptyState icon={Calendar} title="Leave Management" description="Manage leave requests and balances. Feature coming soon!" />;
const PayrollEmpty = () => <EmptyState icon={DollarSign} title="Payroll Management" description="Process payroll and view salary details. Feature coming soon!" />;
const RecruitmentEmpty = () => <EmptyState icon={UserCheck} title="Recruitment Management" description="Handle job postings and candidate tracking. Feature coming soon!" />;
const PerformanceEmpty = () => <EmptyState icon={TrendingUp} title="Performance Management" description="Review and manage employee performance. Feature coming soon!" />;
const SettingsEmpty = () => <EmptyState icon={SettingsIcon} title="Settings" description="Configure system and user settings. Feature coming soon!" />;
const ComplianceEmpty = () => <EmptyState icon={Shield} title="Compliance" description="Monitor compliance and regulatory requirements. Feature coming soon!" />;

const demoAttendance = [
  { id: 1, name: "Sarah Johnson", date: "2024-07-01", status: "Present", checkIn: "09:00", checkOut: "17:00" },
  { id: 2, name: "Michael Chen", date: "2024-07-01", status: "Absent", checkIn: "-", checkOut: "-" },
  { id: 3, name: "Alex Rodriguez", date: "2024-07-01", status: "Late", checkIn: "09:30", checkOut: "17:00" },
];

// Placeholder hooks for API integration
const useAttendance = () => {
  const [data, setData] = useState([
    { id: 1, name: "Sarah Johnson", date: "2024-07-01", status: "Present", checkIn: "09:00", checkOut: "17:00" },
    { id: 2, name: "Michael Chen", date: "2024-07-01", status: "Absent", checkIn: "-", checkOut: "-" },
    { id: 3, name: "Alex Rodriguez", date: "2024-07-01", status: "Late", checkIn: "09:30", checkOut: "17:00" },
  ]);
  // Simulate API fetch, add, edit, delete
  return { data, setData };
};

const AttendanceDemo = () => {
  const { data, setData } = useAttendance();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [form, setForm] = useState({ name: "", date: "", status: "Present", checkIn: "", checkOut: "" });

  const filtered = data.filter(row => row.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setEditRow(null);
    setForm({ name: "", date: "", status: "Present", checkIn: "", checkOut: "" });
    setModalOpen(true);
  };
  const openEdit = (row) => {
    setEditRow(row);
    setForm(row);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => {
    if (editRow) {
      setData(data.map(r => r.id === editRow.id ? { ...form, id: editRow.id } : r));
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };
  const handleDelete = id => setData(data.filter(r => r.id !== id));
  const handleExport = () => {
    // Simple CSV export
    const csv = ["Name,Date,Status,Check-In,Check-Out"].concat(
      data.map(r => [r.name, r.date, r.status, r.checkIn, r.checkOut].join(","))
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search employee..." className="max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
            <Button variant="outline">Advanced Filter</Button>
            <Button onClick={openAdd}>Add Attendance</Button>
            <Button variant="secondary" onClick={handleExport}>Export</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.date}</td>
                    <td>
                      <Badge variant={row.status === "Present" ? "default" : row.status === "Late" ? "secondary" : "destructive"}>{row.status}</Badge>
                    </td>
                    <td>{row.checkIn}</td>
                    <td>{row.checkOut}</td>
                    <td className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(row)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(row.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Modal for Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{editRow ? "Edit Attendance" : "Add Attendance"}</h2>
            <div className="space-y-3">
              <Input name="name" placeholder="Employee Name" value={form.name} onChange={handleChange} />
              <Input name="date" type="date" placeholder="Date" value={form.date} onChange={handleChange} />
              <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2" aria-label="Attendance Status">
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
              <Input name="checkIn" placeholder="Check-In Time" value={form.checkIn} onChange={handleChange} />
              <Input name="checkOut" placeholder="Check-Out Time" value={form.checkOut} onChange={handleChange} />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleSave}>{editRow ? "Save Changes" : "Add"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Demo data and components for other pages
const demoPayroll = [
  { id: 1, name: "Sarah Johnson", month: "June 2024", amount: "$5,000", status: "Paid" },
  { id: 2, name: "Michael Chen", month: "June 2024", amount: "$4,500", status: "Pending" },
];
const PayrollDemo = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Payroll Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search employee..." className="max-w-xs" />
          <Button variant="outline">Filter</Button>
          <Button>Process Payroll</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoPayroll.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.month}</td>
                  <td>{row.amount}</td>
                  <td><Badge variant={row.status === "Paid" ? "default" : "destructive"}>{row.status}</Badge></td>
                  <td><Button size="sm" variant="outline">View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const demoRecruitment = [
  { id: 1, position: "Frontend Developer", applicants: 12, status: "Open" },
  { id: 2, position: "HR Specialist", applicants: 5, status: "Closed" },
];
const RecruitmentDemo = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Recruitment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search position..." className="max-w-xs" />
          <Button variant="outline">Filter</Button>
          <Button>Post Job</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Applicants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoRecruitment.map((row) => (
                <tr key={row.id}>
                  <td>{row.position}</td>
                  <td>{row.applicants}</td>
                  <td><Badge variant={row.status === "Open" ? "default" : "destructive"}>{row.status}</Badge></td>
                  <td><Button size="sm" variant="outline">View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const demoPerformance = [
  { id: 1, name: "Sarah Johnson", review: "Excellent", score: 95 },
  { id: 2, name: "Michael Chen", review: "Good", score: 88 },
];
const PerformanceDemo = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Performance Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search employee..." className="max-w-xs" />
          <Button variant="outline">Filter</Button>
          <Button>New Review</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Review</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoPerformance.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.review}</td>
                  <td>{row.score}</td>
                  <td><Button size="sm" variant="outline">View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const demoSettings = [
  { id: 1, setting: "Company Name", value: "Abtech" },
  { id: 2, setting: "Timezone", value: "UTC+3" },
];
const SettingsDemo = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search setting..." className="max-w-xs" />
          <Button variant="outline">Filter</Button>
          <Button>Edit Settings</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Setting</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoSettings.map((row) => (
                <tr key={row.id}>
                  <td>{row.setting}</td>
                  <td>{row.value}</td>
                  <td><Button size="sm" variant="outline">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const demoCompliance = [
  { id: 1, policy: "Data Privacy", status: "Compliant" },
  { id: 2, policy: "Workplace Safety", status: "Pending" },
];
const ComplianceDemo = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Compliance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search policy..." className="max-w-xs" />
          <Button variant="outline">Filter</Button>
          <Button>New Policy</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Policy</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoCompliance.map((row) => (
                <tr key={row.id}>
                  <td>{row.policy}</td>
                  <td><Badge variant={row.status === "Compliant" ? "default" : "destructive"}>{row.status}</Badge></td>
                  <td><Button size="sm" variant="outline">View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const demoLeave = [
  { id: 1, name: "Sarah Johnson", type: "Annual", from: "2024-07-10", to: "2024-07-15", status: "Approved" },
  { id: 2, name: "Michael Chen", type: "Sick", from: "2024-07-05", to: "2024-07-07", status: "Pending" },
];
const LeaveDemo = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Leave Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search employee..." className="max-w-xs" />
          <Button variant="outline">Filter</Button>
          <Button>Request Leave</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoLeave.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
                  <td>{row.from}</td>
                  <td>{row.to}</td>
                  <td><Badge variant={row.status === "Approved" ? "default" : "destructive"}>{row.status}</Badge></td>
                  <td><Button size="sm" variant="outline">View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/employees" element={<AppLayout><Employees /></AppLayout>} />
          <Route path="/attendance" element={<AppLayout><AttendanceDemo /></AppLayout>} />
          <Route path="/leave" element={<AppLayout><LeaveDemo /></AppLayout>} />
          <Route path="/payroll" element={<AppLayout><PayrollDemo /></AppLayout>} />
          <Route path="/recruitment" element={<AppLayout><RecruitmentDemo /></AppLayout>} />
          <Route path="/performance" element={<AppLayout><PerformanceDemo /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><SettingsDemo /></AppLayout>} />
          <Route path="/compliance" element={<AppLayout><ComplianceDemo /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
