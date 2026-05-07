import { useMemo, useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar as CalendarIcon,
  Home,
  MessageSquare,
  Search,
} from "lucide-react";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { teamAttendanceToday, type AttendanceEntry } from "@/lib/team-data";

type StatusFilter = "all" | AttendanceEntry["status"];

const statusMeta: Record<
  AttendanceEntry["status"],
  { label: string; badge: string; icon: React.ReactNode }
> = {
  present: {
    label: "Present",
    badge: "bg-green-100 text-green-800",
    icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  },
  late: {
    label: "Late",
    badge: "bg-yellow-100 text-yellow-800",
    icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
  },
  absent: {
    label: "Absent",
    badge: "bg-red-100 text-red-800",
    icon: <XCircle className="h-4 w-4 text-red-600" />,
  },
  "half-day": {
    label: "Half Day",
    badge: "bg-orange-100 text-orange-800",
    icon: <CalendarIcon className="h-4 w-4 text-orange-600" />,
  },
  leave: {
    label: "On Leave",
    badge: "bg-blue-100 text-blue-800",
    icon: <CalendarIcon className="h-4 w-4 text-blue-600" />,
  },
  wfh: {
    label: "WFH",
    badge: "bg-teal-100 text-teal-800",
    icon: <Home className="h-4 w-4 text-teal-600" />,
  },
};

export default function AttendanceMonitoring() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [resolved, setResolved] = useState<Record<string, boolean>>({});
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [draft, setDraft] = useState<string>("");

  const summary = useMemo(() => {
    const total = teamAttendanceToday.length;
    const present = teamAttendanceToday.filter((e) => e.status === "present").length;
    const late = teamAttendanceToday.filter((e) => e.status === "late").length;
    const absent = teamAttendanceToday.filter((e) => e.status === "absent").length;
    const onLeave = teamAttendanceToday.filter((e) => e.status === "leave").length;
    return { total, present, late, absent, onLeave };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return teamAttendanceToday.filter((e) => {
      const matchSearch =
        !term ||
        e.employeeName.toLowerCase().includes(term) ||
        e.employeeId.toLowerCase().includes(term);
      const matchFilter = filter === "all" || e.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const exceptions = useMemo(
    () =>
      teamAttendanceToday.filter(
        (e) => (e.status === "late" || e.status === "absent") && !resolved[e.employeeId]
      ),
    [resolved]
  );

  const openNote = (employeeId: string) => {
    setActiveNote(employeeId);
    setDraft(notes[employeeId] ?? "");
  };

  const saveNote = () => {
    if (!activeNote) return;
    setNotes((prev) => ({ ...prev, [activeNote]: draft.trim() }));
    setResolved((prev) => ({ ...prev, [activeNote]: true }));
    setActiveNote(null);
    setDraft("");
  };

  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-[#464EB8] via-[#3FCCE8] to-[#505AC9] rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <ClipboardCheck className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Attendance Monitoring</h1>
                <p className="text-white/90 mt-1">{dateLabel}</p>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-xs uppercase tracking-wider text-white/70">Attendance rate</p>
              <p className="text-3xl font-bold">
                {summary.total === 0
                  ? "—"
                  : `${Math.round(((summary.present + summary.late) / summary.total) * 100)}%`}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <SummaryTile label="Total" value={summary.total} tone="bg-indigo-50 text-indigo-700" />
          <SummaryTile label="Present" value={summary.present} tone="bg-green-50 text-green-700" />
          <SummaryTile label="Late" value={summary.late} tone="bg-yellow-50 text-yellow-700" />
          <SummaryTile label="Absent" value={summary.absent} tone="bg-red-50 text-red-700" />
          <SummaryTile label="On Leave" value={summary.onLeave} tone="bg-blue-50 text-blue-700" />
        </div>

        {exceptions.length > 0 && (
          <Card className="border-0 shadow-lg border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
                <span>Exceptions to handle ({exceptions.length})</span>
              </CardTitle>
              <CardDescription>
                Late arrivals and absences without a note. Resolve with a note to clear them.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exceptions.map((e) => (
                  <div
                    key={e.employeeId}
                    className="flex items-center gap-3 p-3 border border-amber-200 bg-amber-50/40 rounded-lg"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-amber-200 text-amber-900 text-xs font-semibold">
                        {initials(e.employeeName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{e.employeeName}</p>
                      <p className="text-xs text-gray-600">{e.exception}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openNote(e.employeeId)}
                      className="text-amber-700 border-amber-300 hover:bg-amber-100"
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      Resolve
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-[#464EB8]" />
              <span>Team Attendance</span>
            </CardTitle>
            <CardDescription>Real-time view of today's check-ins.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or employee ID"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#464EB8]/30"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as StatusFilter)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm md:w-56 focus:outline-none focus:ring-2 focus:ring-[#464EB8]/30"
              >
                <option value="all">All statuses</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
                <option value="leave">On Leave</option>
                <option value="wfh">WFH</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase text-gray-500 tracking-wider border-b border-gray-200">
                    <th className="py-3 pr-4">Employee</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Check-in</th>
                    <th className="py-3 px-2">Check-out</th>
                    <th className="py-3 px-2">Note</th>
                    <th className="py-3 pl-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => {
                    const meta = statusMeta[e.status];
                    const note = notes[e.employeeId];
                    return (
                      <tr key={e.employeeId} className="border-b border-gray-100 hover:bg-gray-50/60">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-br from-[#464EB8] to-[#3FCCE8] text-white text-xs font-semibold">
                                {initials(e.employeeName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{e.employeeName}</p>
                              <p className="text-xs text-gray-500">{e.designation}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="inline-flex items-center gap-1.5">
                            {meta.icon}
                            <Badge className={meta.badge}>{meta.label}</Badge>
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-700">{e.checkIn ?? "—"}</td>
                        <td className="py-3 px-2 text-gray-700">{e.checkOut ?? "—"}</td>
                        <td className="py-3 px-2 max-w-[18ch]">
                          {note ? (
                            <span className="text-xs text-gray-600 line-clamp-2" title={note}>
                              {note}
                            </span>
                          ) : e.exception ? (
                            <span className="text-xs text-amber-700">{e.exception}</span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-3 pl-2 text-right">
                          {e.status === "late" || e.status === "absent" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openNote(e.employeeId)}
                              className="text-[#464EB8] border-[#464EB8]/30"
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              {note ? "Edit note" : "Add note"}
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400">No action needed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-sm text-gray-500">
                        No matching attendance records.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {activeNote && (
        <NoteDialog
          employeeName={teamAttendanceToday.find((e) => e.employeeId === activeNote)?.employeeName ?? ""}
          value={draft}
          onChange={setDraft}
          onCancel={() => setActiveNote(null)}
          onSave={saveNote}
        />
      )}
    </MainLayout>
  );
}

function SummaryTile({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${tone}`}>
          {label}
        </span>
      </CardContent>
    </Card>
  );
}

function NoteDialog({
  employeeName,
  value,
  onChange,
  onCancel,
  onSave,
}: {
  employeeName: string;
  value: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#464EB8]" />
          Resolve exception
        </h3>
        <p className="text-sm text-gray-500 mt-1">Add a note for {employeeName}.</p>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="e.g. Approved late entry — informed via Slack."
          className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#464EB8]/30"
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={!value.trim()}
            className="bg-[#464EB8] hover:bg-[#3a3f9a]"
          >
            Save note
          </Button>
        </div>
      </div>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
