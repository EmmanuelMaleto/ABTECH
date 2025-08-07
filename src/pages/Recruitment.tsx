import React from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// TODO: Replace with API integration
interface RecruitmentRow {
  id: number;
  position: string;
  applicants: number;
  status: "Open" | "Closed";
}

const demoRecruitment: RecruitmentRow[] = [
  { id: 1, position: "Frontend Developer", applicants: 12, status: "Open" },
  { id: 2, position: "HR Specialist", applicants: 5, status: "Closed" },
];

const Recruitment: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMsg, setDialogMsg] = React.useState("");
  const openDialog = (msg: string) => { setDialogMsg(msg); setDialogOpen(true); };
  const closeDialog = () => setDialogOpen(false);
  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Recruitment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search position..." className="max-w-xs" />
            <Button variant="outline" aria-label="Filter Recruitment" onClick={() => openDialog("Demo: This would open the Recruitment Filter modal.")}>Filter</Button>
            <Button aria-label="Post Job" onClick={() => openDialog("Demo: This would open the Post Job modal.")}>Post Job</Button>
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
                    <td><Button size="sm" variant="outline" aria-label="View Recruitment" onClick={() => openDialog(`Demo: This would open the details for ${row.position}.`)}>View</Button></td>
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

export default Recruitment; 