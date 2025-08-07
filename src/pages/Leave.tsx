import React from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// TODO: Replace with API integration
interface LeaveRow {
  id: number;
  name: string;
  type: string;
  from: string;
  to: string;
  status: "Approved" | "Pending";
}

const demoLeave: LeaveRow[] = [
  { id: 1, name: "Sarah Johnson", type: "Annual", from: "2024-07-10", to: "2024-07-15", status: "Approved" },
  { id: 2, name: "Michael Chen", type: "Sick", from: "2024-07-05", to: "2024-07-07", status: "Pending" },
];

const Leave: React.FC = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Leave Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search employee..." className="max-w-xs" />
          <Button variant="outline" aria-label="Filter Leave">Filter</Button>
          <Button aria-label="Request Leave">Request Leave</Button>
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
                  <td><Button size="sm" variant="outline" aria-label="View Leave">View</Button></td>
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

export default Leave; 