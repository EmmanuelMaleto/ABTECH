import React from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// TODO: Replace with API integration
interface ComplianceRow {
  id: number;
  policy: string;
  status: "Compliant" | "Pending";
}

const demoCompliance: ComplianceRow[] = [
  { id: 1, policy: "Data Privacy", status: "Compliant" },
  { id: 2, policy: "Workplace Safety", status: "Pending" },
];

const Compliance: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMsg, setDialogMsg] = React.useState("");
  const openDialog = (msg: string) => { setDialogMsg(msg); setDialogOpen(true); };
  const closeDialog = () => setDialogOpen(false);
  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search policy..." className="max-w-xs" />
            <Button variant="outline" aria-label="Filter Compliance" onClick={() => openDialog("Demo: This would open the Compliance Filter modal.")}>Filter</Button>
            <Button aria-label="New Policy" onClick={() => openDialog("Demo: This would open the New Policy modal.")}>New Policy</Button>
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
                    <td><Button size="sm" variant="outline" aria-label="View Policy" onClick={() => openDialog(`Demo: This would open the details for ${row.policy}.`)}>View</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* TODO: Add loading and error states for API integration */}
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
};

export default Compliance; 