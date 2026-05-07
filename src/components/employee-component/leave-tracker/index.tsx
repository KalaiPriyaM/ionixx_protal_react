import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { sampleLeaveRequests } from '@/lib/sample-data';
import { LEAVE_TYPES } from '@/lib/constants';

export default function Leave() {
  const [showApplyForm, setShowApplyForm] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getLeaveTypeBadge = (type: string) => {
    const leaveType = LEAVE_TYPES.find(lt => lt.id === type);
    return (
      <Badge className={leaveType?.color || 'bg-gray-100 text-gray-800'}>
        {leaveType?.label || type}
      </Badge>
    );
  };

  const leaveBalance = {
    casual: 12,
    sick: 7,
    earned: 15,
    maternity: 90,
    paternity: 15
  };

  const pendingRequests = sampleLeaveRequests.filter(req => req.status === 'pending');
  const approvedRequests = sampleLeaveRequests.filter(req => req.status === 'approved');
  const rejectedRequests = sampleLeaveRequests.filter(req => req.status === 'rejected');

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-gray-600 mt-2">Manage your leave requests and track your leave balance</p>
          </div>
          <Button onClick={() => setShowApplyForm(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Apply for Leave</span>
          </Button>
        </div>

        {/* Leave Balance */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(leaveBalance).map(([type, balance]) => {
            const leaveType = LEAVE_TYPES.find(lt => lt.id === type);
            return (
              <Card key={type}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">{leaveType?.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{balance}</p>
                    <p className="text-xs text-gray-500">days remaining</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Apply for Leave */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Apply for Leave</span>
              </CardTitle>
              <CardDescription>Submit a new leave request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Leave Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select leave type</option>
                  {LEAVE_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Reason</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md h-20"
                  placeholder="Enter reason for leave..."
                />
              </div>
              
              <Button className="w-full">Submit Request</Button>
            </CardContent>
          </Card>

          {/* Leave Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Leave Calendar</span>
              </CardTitle>
              <CardDescription>View team leaves and holidays</CardDescription>
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
                  const leave = sampleLeaveRequests.find(req => 
                    req.startDate <= dateStr && req.endDate >= dateStr && req.status === 'approved'
                  );
                  
                  return (
                    <div
                      key={date}
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded-lg border
                        ${leave 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
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
                  <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
                  <span>On Leave</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded"></div>
                  <span>Working Day</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span>Pending Requests</span>
              </CardTitle>
              <CardDescription>{pendingRequests.length} requests awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      {getLeaveTypeBadge(request.leaveType)}
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm font-medium">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{request.reason}</p>
                  </div>
                ))}
                {pendingRequests.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No pending requests</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Approved Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Approved Requests</span>
              </CardTitle>
              <CardDescription>{approvedRequests.length} approved requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {approvedRequests.map((request) => (
                  <div key={request.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      {getLeaveTypeBadge(request.leaveType)}
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm font-medium">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{request.reason}</p>
                    {request.approvedBy && (
                      <p className="text-xs text-green-600 mt-1">
                        Approved by {request.approvedBy}
                      </p>
                    )}
                  </div>
                ))}
                {approvedRequests.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No approved requests</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Rejected Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Rejected Requests</span>
              </CardTitle>
              <CardDescription>{rejectedRequests.length} rejected requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rejectedRequests.map((request) => (
                  <div key={request.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      {getLeaveTypeBadge(request.leaveType)}
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm font-medium">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{request.reason}</p>
                  </div>
                ))}
                {rejectedRequests.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No rejected requests</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Leave History</span>
            </CardTitle>
            <CardDescription>Complete history of your leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleLeaveRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(request.status)}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {getLeaveTypeBadge(request.leaveType)}
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm font-medium">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600">{request.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Applied: {new Date(request.appliedDate).toLocaleDateString()}
                    </p>
                    {request.approvedDate && (
                      <p className="text-xs text-gray-500">
                        {request.status === 'approved' ? 'Approved' : 'Rejected'}: {new Date(request.approvedDate).toLocaleDateString()}
                      </p>
                    )}
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
