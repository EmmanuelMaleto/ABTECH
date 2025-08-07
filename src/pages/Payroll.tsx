import React from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// TODO: Replace with API integration
interface PayrollRow {
  id: number;
  name: string;
  month: string;
  amount: string;
  status: "Paid" | "Pending";
}

const demoPayroll: PayrollRow[] = [
  { id: 1, name: "Sarah Johnson", month: "June 2024", amount: "$5,000", status: "Paid" },
  { id: 2, name: "Michael Chen", month: "June 2024", amount: "$4,500", status: "Pending" },
];

const Payroll: React.FC = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Payroll Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search employee..." className="max-w-xs" />
          <Button variant="outline" aria-label="Filter Payroll">Filter</Button>
          <Button aria-label="Process Payroll">Process Payroll</Button>
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
                  <td><Button size="sm" variant="outline" aria-label="View Payroll">View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
    {/* TODO: Add loading and error states for API integration */}
  </div>
);

export default Payroll; 