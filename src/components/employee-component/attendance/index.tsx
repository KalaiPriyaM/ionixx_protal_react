import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock3
} from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { sampleAttendance } from '@/lib/sample-data';
import { ATTENDANCE_STATUS } from '@/lib/constants';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('09:00');

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }));
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'half-day':
        return <Clock3 className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = ATTENDANCE_STATUS.find(s => s.id === status);
    return (
      <Badge className={statusConfig?.color || 'bg-gray-100 text-gray-800'}>
        {statusConfig?.label || status}
      </Badge>
    );
  };

  const currentMonthAttendance = sampleAttendance.filter(record => 
    new Date(record.date).getMonth() === new Date().getMonth()
  );

  const totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const presentDays = currentMonthAttendance.filter(record => record.status === 'present').length;
  const absentDays = currentMonthAttendance.filter(record => record.status === 'absent').length;
  const lateDays = currentMonthAttendance.filter(record => record.status === 'late').length;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-2">Track your daily attendance and working hours</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Present Days</p>
                  <p className="text-2xl font-bold text-gray-900">{presentDays}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Absent Days</p>
                  <p className="text-2xl font-bold text-gray-900">{absentDays}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Late Days</p>
                  <p className="text-2xl font-bold text-gray-900">{lateDays}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance %</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((presentDays / totalDays) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Check In/Out */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Today's Attendance</span>
              </CardTitle>
              <CardDescription>Check in and out for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Current Status</p>
                <p className="text-2xl font-bold text-green-600">
                  {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                </p>
                {isCheckedIn && (
                  <p className="text-sm text-gray-600 mt-1">
                    Since: {checkInTime}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                {!isCheckedIn ? (
                  <Button 
                    onClick={handleCheckIn} 
                    className="w-full"
                    size="lg"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Check In
                  </Button>
                ) : (
                  <Button 
                    onClick={handleCheckOut} 
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Check Out
                  </Button>
                )}
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Expected working hours: 8 hours</p>
                <p>Break time: 1 hour</p>
              </div>
            </CardContent>
          </Card>

          {/* Calendar View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Attendance Calendar</span>
              </CardTitle>
              <CardDescription>View your attendance for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => {
                  const date = i + 1;
                  const dateStr = `2024-01-${date.toString().padStart(2, '0')}`;
                  const attendance = sampleAttendance.find(record => record.date === dateStr);
                  
                  return (
                    <div
                      key={date}
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded-lg border
                        ${attendance 
                          ? attendance.status === 'present' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : attendance.status === 'late'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                        }
                      `}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                  <span>Present</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
                  <span>Late</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                  <span>Absent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance Records</CardTitle>
            <CardDescription>Your attendance history for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleAttendance.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {record.checkIn} - {record.checkOut || 'Not checked out'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(record.status)}
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {record.hoursWorked || 0} hours
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
