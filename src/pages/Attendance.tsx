import React, { useState, ChangeEvent } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// TODO: Replace with API integration
interface AttendanceRow {
  id: number;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Late";
  checkIn: string;
  checkOut: string;
}

const useAttendance = () => {
  const [data, setData] = useState<AttendanceRow[]>([
    { id: 1, name: "Sarah Johnson", date: "2024-07-01", status: "Present", checkIn: "09:00", checkOut: "17:00" },
    { id: 2, name: "Michael Chen", date: "2024-07-01", status: "Absent", checkIn: "-", checkOut: "-" },
    { id: 3, name: "Alex Rodriguez", date: "2024-07-01", status: "Late", checkIn: "09:30", checkOut: "17:00" },
  ]);
  // TODO: Replace with real API fetch, add, edit, delete
  return { data, setData };
};

const Attendance: React.FC = () => {
  const { data, setData } = useAttendance();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<AttendanceRow | null>(null);
  const [form, setForm] = useState<Omit<AttendanceRow, "id">>({ name: "", date: "", status: "Present", checkIn: "", checkOut: "" });

  const filtered = data.filter(row => row.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setEditRow(null);
    setForm({ name: "", date: "", status: "Present", checkIn: "", checkOut: "" });
    setModalOpen(true);
  };
  const openEdit = (row: AttendanceRow) => {
    setEditRow(row);
    setForm({ name: row.name, date: row.date, status: row.status, checkIn: row.checkIn, checkOut: row.checkOut });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => {
    if (editRow) {
      setData(data.map(r => r.id === editRow.id ? { ...form, id: editRow.id } : r));
    } else {
      setData([...data, { ...form, id: Date.now() } as AttendanceRow]);
    }
    setModalOpen(false);
  };
  const handleDelete = (id: number) => setData(data.filter(r => r.id !== id));
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
            <Button variant="outline" aria-label="Advanced Filter">Advanced Filter</Button>
            <Button onClick={openAdd} aria-label="Add Attendance">Add Attendance</Button>
            <Button variant="secondary" onClick={handleExport} aria-label="Export Attendance">Export</Button>
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
                      <Button size="sm" variant="outline" onClick={() => openEdit(row)} aria-label="Edit Attendance">Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(row.id)} aria-label="Delete Attendance">Delete</Button>
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
      {/* TODO: Add loading and error states for API integration */}
    </div>
  );
};

export default Attendance; 