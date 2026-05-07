import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Timer, 
  Play, 
  Pause, 
  Square,
  Clock,
  Calendar,
  Plus,
  BarChart3
} from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { sampleTimeEntries } from '@/lib/sample-data';

export default function TimeTracker() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setCurrentTime(0);
  };

  const totalHoursThisWeek = sampleTimeEntries.reduce((total, entry) => {
    const entryDate = new Date(entry.date);
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    if (entryDate >= weekStart && entryDate <= weekEnd) {
      return total + entry.totalHours;
    }
    return total;
  }, 0);

  const totalHoursThisMonth = sampleTimeEntries.reduce((total, entry) => {
    const entryDate = new Date(entry.date);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear) {
      return total + entry.totalHours;
    }
    return total;
  }, 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Tracker</h1>
          <p className="text-gray-600 mt-2">Track time spent on projects and tasks</p>
        </div>

        {/* Time Tracking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{totalHoursThisWeek.toFixed(1)}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{totalHoursThisMonth.toFixed(1)}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Productivity</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Timer className="h-5 w-5" />
                <span>Time Tracker</span>
              </CardTitle>
              <CardDescription>Track time for current task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-gray-900 mb-4">
                  {formatTime(currentTime)}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Project</label>
                    <select 
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    >
                      <option value="">Select project</option>
                      <option value="employee-portal">Employee Portal</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="api-development">API Development</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Task</label>
                    <select 
                      value={selectedTask}
                      onChange={(e) => setSelectedTask(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    >
                      <option value="">Select task</option>
                      <option value="frontend">Frontend Development</option>
                      <option value="backend">Backend Development</option>
                      <option value="testing">Testing</option>
                      <option value="documentation">Documentation</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-6">
                  {!isRunning ? (
                    <Button onClick={handleStart} className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={handlePause} variant="outline" className="flex-1">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={handleStop} variant="outline">
                    <Square className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Entries */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Today's Time Entries</span>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </CardTitle>
              <CardDescription>Your time entries for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleTimeEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{entry.project}</h4>
                        <Badge variant="outline">{entry.task}</Badge>
                        <Badge className={
                          entry.status === 'approved' ? 'bg-green-100 text-green-800' :
                          entry.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {entry.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{entry.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{entry.startTime} - {entry.endTime}</span>
                        <span>{entry.totalHours}h logged</span>
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                ))}
                
                {sampleTimeEntries.length === 0 && (
                  <div className="text-center py-8">
                    <Timer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No time entries today</h3>
                    <p className="text-gray-600">Start tracking your time to see entries here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Weekly Time Distribution</span>
            </CardTitle>
            <CardDescription>Time spent on different projects this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="font-medium">Employee Portal</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">24.5h</p>
                  <p className="text-sm text-gray-600">65%</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="font-medium">Mobile App</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">8.5h</p>
                  <p className="text-sm text-gray-600">23%</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="font-medium">API Development</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">4.0h</p>
                  <p className="text-sm text-gray-600">12%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
