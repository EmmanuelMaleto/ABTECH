import React from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// TODO: Replace with API integration
interface SettingsRow {
  id: number;
  setting: string;
  value: string;
}

const demoSettings: SettingsRow[] = [
  { id: 1, setting: "Company Name", value: "Abtech" },
  { id: 2, setting: "Timezone", value: "UTC+3" },
];

const Settings: React.FC = () => (
  <div className="flex flex-col gap-6 p-6">
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search setting..." className="max-w-xs" />
          <Button variant="outline" aria-label="Filter Settings">Filter</Button>
          <Button aria-label="Edit Settings">Edit Settings</Button>
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
                  <td><Button size="sm" variant="outline" aria-label="Edit Setting">Edit</Button></td>
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

export default Settings; 