import React from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// TODO: Replace with API integration
interface PerformanceRow {
  id: number;
  name: string;
  review: string;
  score: number;
}

const demoPerformance: PerformanceRow[] = [
  { id: 1, name: "Sarah Johnson", review: "Excellent", score: 95 },
  { id: 2, name: "Michael Chen", review: "Good", score: 88 },
];

const Performance: React.FC = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Performance Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search employee..." className="max-w-xs" />
          <Button variant="outline" aria-label="Filter Performance">Filter</Button>
          <Button aria-label="New Review">New Review</Button>
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
                  <td><Button size="sm" variant="outline" aria-label="View Performance">View</Button></td>
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

export default Performance; 