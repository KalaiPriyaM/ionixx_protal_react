import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Building, 
  Users, 
  Search,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  User,
  Crown
} from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { sampleUsers } from '@/lib/sample-data';

export default function Organization() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Departments', count: sampleUsers.length },
    { id: 'engineering', name: 'Engineering', count: sampleUsers.filter(u => u.department === 'Engineering').length },
    { id: 'hr', name: 'Human Resources', count: 0 },
    { id: 'marketing', name: 'Marketing', count: 0 },
    { id: 'sales', name: 'Sales', count: 0 },
  ];

  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             user.department.toLowerCase() === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'manager':
        return <User className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      'admin': 'bg-yellow-100 text-yellow-800',
      'manager': 'bg-blue-100 text-blue-800',
      'employee': 'bg-green-100 text-green-800',
      'hr': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <Badge className={colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization</h1>
          <p className="text-gray-600 mt-2">Explore company structure and employee directory</p>
        </div>

        {/* Organization Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{sampleUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{departments.length - 1}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Managers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sampleUsers.filter(u => u.role === 'manager' || u.role === 'admin').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{sampleUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Departments Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedDepartment === dept.id
                        ? 'bg-blue-100 text-blue-900'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-sm font-medium">{dept.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {dept.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Employee Directory */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                          {getRoleIcon(user.role)}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{user.designation}</p>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          {getRoleBadge(user.role)}
                          <Badge variant="outline" className="text-xs">
                            {user.department}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3" />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-3 w-3" />
                            <span>ID: {user.employeeId}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Manager: {user.reportingManager}
                            </span>
                            <Button variant="outline" size="sm">
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Try adjusting your search terms' : 'No employees in this department'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Organization Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Organization Chart</span>
            </CardTitle>
            <CardDescription>Visual representation of company hierarchy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* CEO Level */}
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Crown className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="font-medium text-sm">CEO</p>
                  <p className="text-xs text-gray-600">Mike Johnson</p>
                </div>
              </div>

              {/* Manager Level */}
              <div className="flex justify-center">
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-sm">VP Engineering</p>
                    <p className="text-xs text-gray-600">Mike Johnson</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-sm">VP Marketing</p>
                    <p className="text-xs text-gray-600">Sarah Wilson</p>
                  </div>
                </div>
              </div>

              {/* Employee Level */}
              <div className="flex justify-center">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="font-medium text-xs">Engineering Manager</p>
                    <p className="text-xs text-gray-600">Jane Smith</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="font-medium text-xs">Senior Developer</p>
                    <p className="text-xs text-gray-600">John Doe</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
