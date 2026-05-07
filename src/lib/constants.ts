export const ROUTES = {
  Login: "/login",
  ForgotPassword: "/forgot-password",
  Dashboard: "/dashboard",
  Profile: "/profile",
  Attendance: "/attendance",
  TimeTracker: "/time-tracker",
  Leave: "/leave",
  Files: "/files",
  Organization: "/organization",
  Tasks: "/tasks",
  Reports: "/reports",
  // Manager (MSS)
  TeamOverview: "/team",
  Approvals: "/approvals",
  AttendanceMonitoring: "/attendance-monitoring",
  PerformanceReview: "/performance-review",
  // HR
  EmployeeManagement: "/employee-management",
  Recruitment: "/recruitment",
  Training: "/training",
  Compliance: "/compliance",
  // Executive
  Analytics: "/analytics",
  KpiMonitoring: "/kpi-monitoring",
  // System Admin
  UserManagement: "/user-management",
  RolesPermissions: "/roles-permissions",
  SystemConfig: "/system-config",
  Integrations: "/integrations",
  Logs: "/logs",
} ;

export const QUICK_ADD_OPTIONS = [
  {
    id: "task",
    label: "Add Task",
    icon: "Plus",
  },
  {
    id: "event",
    label: "Add Event",
    icon: "Calendar",
  },
  {
    id: "leave",
    label: "Add Leave",
    icon: "CalendarDays",
  },
  {
    id: "file",
    label: "Upload File",
    icon: "Upload",
  },
] ;

export const LEAVE_TYPES = [
  { id: "casual", label: "Casual Leave", color: "bg-blue-100 text-blue-800" },
  { id: "sick", label: "Sick Leave", color: "bg-red-100 text-red-800" },
  { id: "earned", label: "Earned Leave", color: "bg-green-100 text-green-800" },
  { id: "maternity", label: "Maternity Leave", color: "bg-pink-100 text-pink-800" },
  { id: "paternity", label: "Paternity Leave", color: "bg-purple-100 text-purple-800" },
] ;

export const TASK_STATUS = [
  { id: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { id: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
  { id: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  { id: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
] ;

export const TASK_PRIORITY = [
  { id: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
  { id: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { id: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { id: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
] ;

export const ATTENDANCE_STATUS = [
  { id: "present", label: "Present", color: "bg-green-100 text-green-800" },
  { id: "absent", label: "Absent", color: "bg-red-100 text-red-800" },
  { id: "late", label: "Late", color: "bg-yellow-100 text-yellow-800" },
  { id: "half-day", label: "Half Day", color: "bg-orange-100 text-orange-800" },
] ;

// Utility functions for dashboard
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const getGreeting = (currentTime: Date) => {
  const hour = currentTime.getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const getGreetingIcon = (currentTime: Date) => {
  const hour = currentTime.getHours();
  if (hour < 12) return 'Sun';
  if (hour < 17) return 'Coffee';
  return 'Moon';
};