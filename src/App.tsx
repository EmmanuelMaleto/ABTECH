import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Recruitment from "./pages/Recruitment";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import Compliance from "./pages/Compliance";
import Leave from "./pages/Leave";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const EmptyState = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
    <Icon className="h-12 w-12 mb-4 text-primary" />
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p>{description}</p>
  </div>
);

const AttendanceEmpty = () => <EmptyState icon={null} title="Attendance Management" description="Track and manage employee attendance here. Feature coming soon!" />;
const LeaveEmpty = () => <EmptyState icon={null} title="Leave Management" description="Manage leave requests and balances. Feature coming soon!" />;
const PayrollEmpty = () => <EmptyState icon={null} title="Payroll Management" description="Process payroll and view salary details. Feature coming soon!" />;
const RecruitmentEmpty = () => <EmptyState icon={null} title="Recruitment Management" description="Handle job postings and candidate tracking. Feature coming soon!" />;
const PerformanceEmpty = () => <EmptyState icon={null} title="Performance Management" description="Review and manage employee performance. Feature coming soon!" />;
const SettingsEmpty = () => <EmptyState icon={null} title="Settings" description="Configure system and user settings. Feature coming soon!" />;
const ComplianceEmpty = () => <EmptyState icon={null} title="Compliance" description="Monitor compliance and regulatory requirements. Feature coming soon!" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/employees" element={<AppLayout><Employees /></AppLayout>} />
          <Route path="/attendance" element={<AppLayout><Attendance /></AppLayout>} />
          <Route path="/leave" element={<AppLayout><Leave /></AppLayout>} />
          <Route path="/payroll" element={<AppLayout><Payroll /></AppLayout>} />
          <Route path="/recruitment" element={<AppLayout><Recruitment /></AppLayout>} />
          <Route path="/performance" element={<AppLayout><Performance /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="/compliance" element={<AppLayout><Compliance /></AppLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
