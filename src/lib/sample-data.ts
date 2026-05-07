import { User, Attendance, LeaveRequest, Task, TimeEntry, File, Event, Notification } from '@/types';

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@ionixx.com',
    phone: '+1-555-0123',
    address: '123 Main St, City, State',
    department: 'Engineering',
    designation: 'Senior Developer',
    employeeId: 'EMP001',
    joiningDate: '2022-01-15',
    reportingManager: 'Jane Smith',
    role: 'employee',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    accountType: 'Savings',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@ionixx.com',
    phone: '+1-555-0124',
    address: '456 Oak Ave, City, State',
    department: 'Engineering',
    designation: 'Engineering Manager',
    employeeId: 'EMP002',
    joiningDate: '2021-03-10',
    reportingManager: 'Mike Johnson',
    role: 'manager',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@ionixx.com',
    phone: '+1-555-0125',
    address: '789 Pine St, City, State',
    department: 'Engineering',
    designation: 'VP Engineering',
    employeeId: 'EMP003',
    joiningDate: '2020-06-01',
    reportingManager: 'CEO',
    role: 'admin',
  },
];

export const sampleAttendance: Attendance[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-01-15',
    checkIn: '09:00',
    checkOut: '18:00',
    status: 'present',
    hoursWorked: 8,
  },
  {
    id: '2',
    userId: '1',
    date: '2024-01-16',
    checkIn: '09:15',
    checkOut: '18:30',
    status: 'late',
    hoursWorked: 8.25,
  },
  {
    id: '3',
    userId: '1',
    date: '2024-01-17',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'present',
    hoursWorked: 7.5,
  },
];

export const sampleLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '1',
    leaveType: 'casual',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    reason: 'Personal work',
    status: 'approved',
    appliedDate: '2024-01-10',
    approvedBy: 'Jane Smith',
    approvedDate: '2024-01-12',
  },
  {
    id: '2',
    userId: '1',
    leaveType: 'sick',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    reason: 'Fever and cold',
    status: 'pending',
    appliedDate: '2024-01-24',
  },
];

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Update Documentation',
    description: 'Update the API documentation for the new features',
    assignee: '1',
    assigner: '2',
    priority: 'medium',
    status: 'completed',
    dueDate: '2024-01-20',
    createdDate: '2024-01-15',
    completedDate: '2024-01-19',
    progress: 100,
  },
  {
    id: '2',
    title: 'Code Review',
    description: 'Review the pull request for the authentication module',
    assignee: '1',
    assigner: '2',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-01-25',
    createdDate: '2024-01-18',
    progress: 60,
  },
  {
    id: '3',
    title: 'Bug Fix',
    description: 'Fix the login issue on mobile devices',
    assignee: '1',
    assigner: '2',
    priority: 'urgent',
    status: 'pending',
    dueDate: '2024-01-22',
    createdDate: '2024-01-20',
    progress: 0,
  },
];

export const sampleTimeEntries: TimeEntry[] = [
  {
    id: '1',
    userId: '1',
    project: 'Employee Portal',
    task: 'Frontend Development',
    date: '2024-01-15',
    startTime: '09:00',
    endTime: '17:00',
    description: 'Working on dashboard components',
    totalHours: 8,
    status: 'approved',
  },
  {
    id: '2',
    userId: '1',
    project: 'Employee Portal',
    task: 'API Integration',
    date: '2024-01-16',
    startTime: '09:15',
    endTime: '17:30',
    description: 'Integrating authentication APIs',
    totalHours: 8.25,
    status: 'submitted',
  },
];

export const sampleFiles: File[] = [
  {
    id: '1',
    name: 'Employee Handbook 2024.pdf',
    type: 'application/pdf',
    size: 2048576,
    uploadedBy: 'HR Team',
    uploadedDate: '2024-01-01',
    category: 'hr-policies',
    accessLevel: 'public',
    url: '/files/employee-handbook-2024.pdf',
  },
  {
    id: '2',
    name: 'Salary Slip - January 2024.pdf',
    type: 'application/pdf',
    size: 512000,
    uploadedBy: 'Payroll Team',
    uploadedDate: '2024-01-31',
    category: 'salary',
    accessLevel: 'private',
    url: '/files/salary-slip-jan-2024.pdf',
  },
];

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team standup meeting',
    date: '2024-01-22',
    time: '14:00',
    type: 'meeting',
    attendees: ['1', '2', '3'],
    location: 'Conference Room A',
  },
  {
    id: '2',
    title: 'John Doe Birthday',
    description: 'Birthday celebration',
    date: '2024-01-25',
    time: '12:00',
    type: 'birthday',
    attendees: ['1', '2', '3'],
  },
  {
    id: '3',
    title: 'Project Deadline',
    description: 'Employee Portal Phase 1 completion',
    date: '2024-01-30',
    time: '17:00',
    type: 'deadline',
    attendees: ['1', '2', '3'],
  },
];

export const sampleNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'New Task Assigned',
    message: 'You have been assigned a new task: "Bug Fix"',
    type: 'info',
    isRead: false,
    createdAt: '2024-01-20T10:30:00Z',
    actionUrl: '/tasks/3',
  },
  {
    id: '2',
    userId: '1',
    title: 'Leave Request Approved',
    message: 'Your leave request for Jan 20-22 has been approved',
    type: 'success',
    isRead: false,
    createdAt: '2024-01-12T15:45:00Z',
    actionUrl: '/leave',
  },
  {
    id: '3',
    userId: '1',
    title: 'Team Meeting Reminder',
    message: 'Team meeting scheduled for tomorrow at 2:00 PM',
    type: 'warning',
    isRead: true,
    createdAt: '2024-01-21T09:00:00Z',
    actionUrl: '/calendar',
  },
];

export const quickStats = [
  { label: 'Attendance Rate', value: '95%', change: '+2%', icon: 'CheckCircle', color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Tasks Completed', value: '15/20', change: '+3', icon: 'Target', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Hours This Week', value: '42h', change: '+5h', icon: 'Clock', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { label: 'Performance Score', value: '4.8', change: '+0.2', icon: 'Star', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
];

export const recentActivities = [
  { type: 'checkin', message: 'Checked in at 9:00 AM', time: 'Today', icon: 'CheckCircle', color: 'text-green-500' },
  { type: 'task', message: 'Completed "Update Documentation" task', time: 'Yesterday', icon: 'Target', color: 'text-blue-500' },
  { type: 'leave', message: 'Leave request approved', time: '2 days ago', icon: 'Calendar', color: 'text-yellow-500' },
  { type: 'meeting', message: 'Attended team standup', time: '3 days ago', icon: 'Users', color: 'text-purple-500' },
];

export const celebrationCards = [
  {
    title: 'Birthday',
    description: 'Team member birthdays this week',
    icon: 'Cake',
    color: 'text-pink-600',
    items: [
      { name: 'Sarah Johnson', date: 'Jan 25', status: 'Today', years: '25 years' },
      { name: 'Mike Chen', date: 'Jan 28', status: 'upcoming', years: '27 years' },
      { name: 'Lisa Wang', date: 'Jan 30', status: 'upcoming', years: '29 years' }
    ]
  },
  {
    title: 'Work Anniversary',
    description: 'Celebrating work milestones',
    icon: 'HeartHandshake',
    color: 'text-red-600',
    items: [
      { name: 'John Smith', date: 'Jan 20', status: 'completed', years: '2 years' },
      { name: 'Emma Davis', date: 'Jan 22', status: 'completed', years: '1 year' }
    ]
  },
  {
    title: 'Wedding Anniversary',
    description: 'Celebrating love and commitment',
    icon: 'Gift',
    color: 'text-purple-600',
    items: [
      { name: 'David & Maria', date: 'Jan 26', status: 'upcoming', years: '5 years' }
    ]
  }
];