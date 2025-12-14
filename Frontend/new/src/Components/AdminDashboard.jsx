

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  Users, BookOpen, DollarSign, Shield, Home, BarChart3, 
  UserCheck, Book, CreditCard, Settings, LogOut, Bell,
  Calendar, FileText, Layers, ChevronDown, Search,
  TrendingUp, TrendingDown, Eye, Edit, Trash2, MoreVertical,
  Filter, Download, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced StatCard with trend indicator
const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon size={22} className={color.replace('bg-', 'text-').replace('-100', '-600')} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
              {trend && (
                <span className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {trend.value}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Sidebar Navigation Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const [expandedSections, setExpandedSections] = useState({
    users: true,
    courses: false,
    finance: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: Users,
      subItems: [
        { id: 'all-users', label: 'All Users' },
        { id: 'lecturers', label: 'Lecturers' },
        { id: 'lecturer-uploads', label: 'Lecturer Uploads' }, // New
        { id: 'pending-approvals', label: 'Pending Approvals' }
      ]
    },
    { 
      id: 'courses', 
      label: 'Course Catalog', 
      icon: Book,
      subItems: [
        { id: 'all-courses', label: 'All Courses' },
        { id: 'categories', label: 'Categories' },
        { id: 'enrollments', label: 'Enrollments' }
      ]
    },
    { 
      id: 'finance', 
      label: 'Finance', 
      icon: CreditCard,
      subItems: [
        { id: 'transactions', label: 'Transactions' },
        { id: 'revenue-reports', label: 'Revenue Reports' },
        { id: 'subscriptions', label: 'Subscriptions' }
      ]
    },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'blogs', label: 'Blog Management', icon: Layers },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">LearnHub ERP</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleSection(item.id)}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${expandedSections[item.id] ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSections[item.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-9 space-y-1"
                    >
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => setActiveTab(subItem.id)}
                          className={`w-full text-left p-2 text-sm rounded-lg transition-colors ${activeTab === subItem.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </nav>

      {/* Current User */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

// Enhanced Data Table Component
const DataTable = ({ data, columns, onAction, type = 'users', onExportPDF, onExportCSV }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Header with Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${type}...`}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
                <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100">
                  <Trash2 size={14} className="inline mr-1" />
                  Delete Selected
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Export Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
              >
                <Download size={16} />
                Export
                <ChevronDown size={14} className={`transform transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showExportMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                  >
                    <button
                      onClick={() => { onExportPDF(); setShowExportMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                    >
                      <FileText size={16} className="text-red-500" />
                      Export as PDF
                    </button>
                    <button
                      onClick={() => { onExportCSV(); setShowExportMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                    >
                      <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center text-[8px] text-white font-bold">X</div>
                      Export as CSV
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <UserPlus size={16} />
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(filteredData.map(item => item.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </th>
              {columns.map((column) => (
                <th key={column.key} className="p-4 text-left text-sm font-medium text-gray-700">
                  {column.label}
                </th>
              ))}
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows([...selectedRows, item.id]);
                      } else {
                        setSelectedRows(selectedRows.filter(id => id !== item.id));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="p-4">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing 1 to {filteredData.length} of {data.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ 
    totalUsers: 0, 
    totalLecturers: 0, 
    totalCourses: 0, 
    totalPayments: 0,
    activeUsers: 0,
    monthlyRevenue: 0
  });
  
  const [users, setUsers] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiError, setApiError] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New user registration', time: '2 min ago', unread: true },
    { id: 2, title: 'Course submission pending', time: '1 hour ago', unread: true },
    { id: 3, title: 'Payment received', time: '3 hours ago', unread: false },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setApiError(null);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // 1. Fetch Users (Critical)
      try {
        const usersRes = await axios.get('http://localhost:5001/api/admin/users', config);
        console.log("Users fetched:", usersRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }

      // 2. Fetch Stats
      try {
        const statsRes = await axios.get('http://localhost:5001/api/admin/stats', config);
        console.log("Stats fetched:", statsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }

      // 3. Fetch Lecturers
      try {
        const lecturersRes = await axios.get('http://localhost:5001/api/admin/lecturers', config);
        setLecturers(lecturersRes.data);
      } catch (err) {
        console.error("Failed to fetch lecturers", err);
      }
      
      // 4. Skip Blogs for now (suspected cause of hang)
      // const blogsRes = await axios.get('http://localhost:5001/api/blogs', config);
      // setBlogs(blogsRes.data);

    } catch (error) {
      console.error("Global fetch error", error);
      setApiError(error.message);
    }
  };

  const [pendingContent, setPendingContent] = useState([]);

  // ... (existing fetchData) ...

  const fetchPendingContent = async () => {
      try {
          const res = await axios.get('http://localhost:5001/api/admin/content/pending', {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setPendingContent(res.data);
      } catch (error) {
          console.error("Fetch pending error", error);
      }
  };

  const handleContentStatus = async (id, status) => {
      try {
          const endpoint = status === 'APPROVED' 
            ? `http://localhost:5001/api/admin/lecturer/upload/${id}/approve`
            : `http://localhost:5001/api/admin/lecturer/upload/${id}/reject`;

          await axios.put(endpoint, {}, { 
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
          });
          
          alert(status === 'APPROVED' ? "Content approved and published successfully" : "Content rejected");
          
          // Refresh list based on active tab
          if (activeTab === 'pending-approvals') {
              setPendingContent(pendingContent.filter(c => c.id !== id));
          } else if (activeTab === 'lecturer-uploads') {
              fetchAllContent();
          }
      } catch (error) {
          console.error("Status Update Error:", error);
          alert("Failed to update status");
      }
  };

  const [allContent, setAllContent] = useState([]);

  const fetchAllContent = async () => {
      try {
          const res = await axios.get('http://localhost:5001/api/admin/lecturer/uploads', {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setAllContent(res.data);
      } catch (error) {
          console.error("Fetch all content error", error);
      }
  };

  const exportUsersPDF = () => {
    const doc = new jsPDF();
    doc.text("User Management Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    
    doc.autoTable({
      startY: 35,
      head: [['ID', 'Name', 'Email', 'Phone', 'Status', 'Joined']],
      body: users.map(user => [
        user.id,
        user.full_name,
        user.email,
        user.phone || 'N/A',
        user.status,
        new Date(user.created_at).toLocaleDateString()
      ]),
    });

    doc.save('user-management-report.pdf');
  };

  const exportUsersCSV = () => {
    const headers = ['ID,Name,Email,Phone,Status,Joined'];
    const rows = users.map(user => 
      `${user.id},"${user.full_name}","${user.email}",${user.phone || 'N/A'},${user.status},${new Date(user.created_at).toLocaleDateString()}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_management_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
      if (activeTab === 'pending-approvals') fetchPendingContent();
      if (activeTab === 'lecturer-uploads') fetchAllContent();
  }, [activeTab]);

  // ... (rest of code) ...

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleTableAction = async (action, id) => {
    if (action === 'delete') {
      if (!window.confirm("Are you sure you want to delete this item?")) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5001/api/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(u => u.id !== id));
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const userColumns = [
    { key: 'full_name', label: 'Name', render: (user) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm">
          {user.full_name?.charAt(0) || 'U'}
        </div>
        <div>
          <p className="font-medium text-gray-900">{user.full_name}</p>
          <p className="text-xs text-gray-500">ID: {user.id}</p>
        </div>
      </div>
    )},
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'joined_date', label: 'Joined', render: (user) => (
      <span className="text-gray-600">{user.created_at?.split('T')[0] || 'N/A'}</span>
    )},
    { key: 'status', label: 'Status', render: (user) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {user.status?.charAt(0).toUpperCase() + user.status?.slice(1) || 'Active'}
      </span>
    )},
  ];

  const lecturerColumns = [
    { key: 'full_name', label: 'Lecturer' },
    { key: 'email', label: 'Email' },
    { key: 'expertise', label: 'Expertise', render: (lecturer) => (
      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
        {lecturer.expertise}
      </span>
    )},
    { key: 'courses_count', label: 'Courses', render: () => (
      <span className="font-medium">5</span>
    )},
    { key: 'rating', label: 'Rating', render: () => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span className="font-medium">4.8</span>
      </div>
    )},
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'dashboard' ? 'Dashboard Overview' : 
                 activeTab === 'all-users' ? 'User Management' :
                 activeTab === 'lecturers' ? 'Lecturers' : 'Admin Panel'}
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with your platform today.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Bell size={20} />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="font-bold text-gray-900">{stats.activeUsers || stats.totalUsers}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="font-bold text-green-600">${stats.monthlyRevenue || 0}</p>
                </div>
              </div>
              
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers} 
              icon={Users}
              color="bg-blue-100 text-blue-600"
              trend={{ value: '+12%', isPositive: true }}
              subtitle="This month"
            />
            <StatCard 
              title="Active Lecturers" 
              value={stats.totalLecturers} 
              icon={Shield}
              color="bg-purple-100 text-purple-600"
              trend={{ value: '+5%', isPositive: true }}
              subtitle="Teaching now"
            />
            <StatCard 
              title="Total Courses" 
              value={stats.totalCourses} 
              icon={BookOpen}
              color="bg-orange-100 text-orange-600"
              trend={{ value: '+8%', isPositive: true }}
              subtitle="Available"
            />
            <StatCard 
              title="Total Revenue" 
              value={`$${stats.totalPayments}`} 
              icon={DollarSign}
              color="bg-green-100 text-green-600"
              trend={{ value: '+15%', isPositive: true }}
              subtitle="Lifetime"
            />
            <StatCard 
              title="Course Enrollments" 
              value="1,284" 
              icon={UserCheck}
              color="bg-indigo-100 text-indigo-600"
              trend={{ value: '+23%', isPositive: true }}
              subtitle="Active enrollments"
            />
            <StatCard 
              title="Pending Approvals" 
              value="12" 
              icon={FileText}
              color="bg-yellow-100 text-yellow-600"
              subtitle="Need review"
            />
            <StatCard 
              title="Monthly Revenue" 
              value="$8,450" 
              icon={CreditCard}
              color="bg-emerald-100 text-emerald-600"
              trend={{ value: '+18%', isPositive: true }}
              subtitle="Current month"
            />
            <StatCard 
              title="Completion Rate" 
              value="78%" 
              icon={BarChart3}
              color="bg-cyan-100 text-cyan-600"
              trend={{ value: '+3%', isPositive: true }}
              subtitle="Course completion"
            />
          </div>

          {/* Data Tables Section */}
          <div className="space-y-6">

            {/* Pending Approvals Table */}
            {activeTab === 'pending-approvals' && (
               <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Content Approvals</h2>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                       <thead className="bg-gray-50 text-gray-700 font-medium">
                          <tr>
                             <th className="p-4 text-left">Title</th>
                             <th className="p-4 text-left">Lecturer</th>
                             <th className="p-4 text-left">Date</th>
                             <th className="p-4 text-left">Media</th>
                             <th className="p-4 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {pendingContent.length === 0 ? (
                              <tr><td colSpan="5" className="p-8 text-center text-gray-500">No pending content found.</td></tr>
                          ) : (
                              pendingContent.map(item => (
                                 <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">{item.title}</td>
                                    <td className="p-4 text-gray-600">{item.lecturer_name}</td>
                                    <td className="p-4 text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td className="p-4 flex gap-2">
                                       {item.video_path && (
                                           <a href={`http://localhost:5001/${item.video_path}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100 flex items-center gap-1">
                                               Video ↗
                                           </a>
                                       )}
                                       {item.notes_path && (
                                           <a href={`http://localhost:5001/${item.notes_path}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded hover:bg-purple-100 flex items-center gap-1">
                                               PDF ⬇
                                           </a>
                                       )}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                       <button 
                                          onClick={() => handleContentStatus(item.id, 'APPROVED')}
                                          className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded text-sm font-medium transition"
                                       >
                                          Approve
                                       </button>
                                       <button 
                                          onClick={() => handleContentStatus(item.id, 'REJECTED')}
                                          className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm font-medium transition"
                                       >
                                          Reject
                                       </button>
                                    </td>
                                 </tr>
                              ))
                          )}
                       </tbody>
                    </table>
                  </div>
               </div>
            )}

            {/* Lecturer Uploads Management Table */}
            {activeTab === 'lecturer-uploads' && (
               <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Lecturer Content Management</h2>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                       <thead className="bg-gray-50 text-gray-700 font-medium">
                          <tr>
                             <th className="p-4 text-left">Title</th>
                             <th className="p-4 text-left">Lecturer</th>
                             <th className="p-4 text-left">Links</th>
                             <th className="p-4 text-left">Status</th>
                             <th className="p-4 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {allContent.length === 0 ? (
                              <tr><td colSpan="5" className="p-8 text-center text-gray-500">No content found.</td></tr>
                          ) : (
                              allContent.map(item => (
                                 <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <p className="font-medium text-gray-900">{item.title}</p>
                                        <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-gray-900 font-medium">{item.lecturer_name}</p>
                                        <p className="text-xs text-gray-500">{item.lecturer_email}</p>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                       {item.video_path && (
                                           <a href={`http://localhost:5001/${item.video_path}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100 flex items-center gap-1">
                                               Video ↗
                                           </a>
                                       )}
                                       {item.notes_path && (
                                           <a href={`http://localhost:5001/${item.notes_path}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded hover:bg-purple-100 flex items-center gap-1">
                                               PDF ⬇
                                           </a>
                                       )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            item.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                            item.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                       {item.status === 'PENDING' && (
                                            <div className="space-x-2">
                                                <button 
                                                    onClick={async () => { await handleContentStatus(item.id, 'APPROVED'); fetchAllContent(); }}
                                                    className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded text-sm font-medium transition"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={async () => { await handleContentStatus(item.id, 'REJECTED'); fetchAllContent(); }}
                                                    className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm font-medium transition"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                       )}
                                       {item.status !== 'PENDING' && <span className="text-gray-400 text-sm">No Actions</span>}
                                    </td>
                                 </tr>
                              ))
                          )}
                       </tbody>
                    </table>
                  </div>
               </div>
            )}

            {/* Users Table */}
            {activeTab === 'all-users' || activeTab === 'dashboard' ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Users Management</h2>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Add New User
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Bulk Actions
                    </button>
                  </div>
                </div>
                <DataTable 
                  data={users.slice(0, 10)} 
                  columns={userColumns}
                  onAction={handleTableAction}
                  type="users"
                />
              </div>
            ) : null}

            {/* Lecturers Table */}
            {activeTab === 'lecturers' ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Lecturers Management</h2>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Invite Lecturer
                  </button>
                </div>
                <DataTable 
                  data={lecturers} 
                  columns={lecturerColumns}
                  onAction={handleTableAction}
                  type="lecturers"
                />
              </div>
            ) : null}

            {/* Blogs Table */}
            {activeTab === 'blogs' ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Blog Management</h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Create New Blog
                  </button>
                </div>
                <DataTable 
                  data={blogs} 
                  columns={blogColumns}
                  onAction={(action, id) => {
                      if (action === 'delete') {
                          // Placeholder for delete logic
                          if(window.confirm('Delete this blog?')) {
                             // Call delete API
                             axios.delete(`http://localhost:5000/api/blogs/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                             .then(() => setBlogs(blogs.filter(b => b._id !== id)))
                             .catch(err => alert('Failed to delete blog'));
                          }
                      }
                  }}
                  type="blogs"
                />
              </div>
            ) : null}

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New user registered', time: '2 min ago', user: 'John Doe' },
                    { action: 'Course purchased', time: '15 min ago', user: 'Jane Smith' },
                    { action: 'Payment processed', time: '1 hour ago', amount: '$49.99' },
                    { action: 'Lecturer approved', time: '2 hours ago', user: 'Dr. Robert Chen' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user || activity.amount}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Server Uptime', value: '99.9%', status: 'good' },
                    { label: 'API Response', value: '120ms', status: 'good' },
                    { label: 'Database Load', value: '45%', status: 'warning' },
                    { label: 'Storage Used', value: '78%', status: 'critical' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          item.status === 'good' ? 'text-green-600' :
                          item.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.value}
                        </span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              item.status === 'good' ? 'bg-green-500' :
                              item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: item.value }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Platform Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Avg. Session Time</span>
                    <span className="font-bold">24 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bounce Rate</span>
                    <span className="font-bold">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Sessions</span>
                    <span className="font-bold">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Support Tickets</span>
                    <span className="font-bold">8</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;