import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Upload, Video, Users, DollarSign, PlusSquare, 
    FileText, HelpCircle, LogOut, Menu, X, CheckCircle, Clock, XCircle,
    BarChart3, FileVideo, BookText, AlertCircle, Download, Eye, Edit
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5001/api/lecturer';

// --- Sub-components defined OUTSIDE to prevent re-render focus loss ---

const DashboardHome = ({ stats, setActiveTab }) => (
    <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stats.activeCourses}</h3>
                    <p className="text-gray-600">Active Courses</p>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-sm border border-green-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                    <Video size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stats.totalContent}</h3>
                    <p className="text-gray-600">Total Uploads</p>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-sm border border-purple-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                    <Users size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stats.totalStudents}</h3>
                    <p className="text-gray-600">Students</p>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl shadow-sm border border-amber-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                    <Clock size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stats.pendingApprovals}</h3>
                    <p className="text-gray-600">Pending Approvals</p>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stats.approvedContent}</h3>
                    <p className="text-gray-600">Approved Content</p>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-2xl shadow-sm border border-rose-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                    <BarChart3 size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stats.earnings}</h3>
                    <p className="text-gray-600">Earnings ($)</p>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Upload className="text-indigo-600" />
                    Quick Upload
                </h3>
                <p className="text-gray-600 mb-4">Upload new content quickly</p>
                <button 
                    onClick={() => setActiveTab('upload')}
                    className="w-full bg-indigo-50 text-indigo-700 font-semibold py-3 rounded-xl hover:bg-indigo-100 transition"
                >
                    Go to Upload Section
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="text-amber-600" />
                    Pending Approvals
                </h3>
                <p className="text-gray-600 mb-4">{stats.pendingApprovals} items awaiting admin approval</p>
                <button 
                    onClick={() => setActiveTab('admin')}
                    className="w-full bg-amber-50 text-amber-700 font-semibold py-3 rounded-xl hover:bg-amber-100 transition"
                >
                    View Status
                </button>
            </div>
        </div>
    </div>
);

const UploadSection = ({ uploadForm, setUploadForm, handleUploadSubmit }) => (
    <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-3xl shadow-sm border border-indigo-100 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Upload className="text-indigo-600" size={28} /> 
                Upload New Content
            </h2>
            <p className="text-gray-600">Upload video lectures, course materials, and resources for your students</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <form onSubmit={handleUploadSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Content Title
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g., Introduction to Python Programming" 
                            required 
                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-text"
                            value={uploadForm.title} 
                            onChange={e => setUploadForm({...uploadForm, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Course (Mock)
                        </label>
                        <select className="w-full p-4 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer">
                            <option>Computer Science 101</option>
                            <option>Data Science Fundamentals</option>
                            <option>Web Development</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea 
                        placeholder="Describe this lesson, what students will learn, and any prerequisites..." 
                        required 
                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition h-32 cursor-text"
                        value={uploadForm.description} 
                        onChange={e => setUploadForm({...uploadForm, description: e.target.value})}
                    ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            <FileVideo className="inline mr-2" size={18} />
                            Video File (MP4/MKV) {uploadForm.video && <span className="text-green-600 text-xs ml-2">✓ Selected</span>}
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50/50 hover:bg-white">
                            <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                            <p className="text-gray-600 mb-2">Drag & drop or click to upload</p>
                            <input 
                                type="file" 
                                accept="video/mp4,video/mkv" 
                                required 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={e => setUploadForm({...uploadForm, video: e.target.files[0]})}
                                // NO value attribute here for file input
                            />
                            <p className="text-sm text-gray-500">Max 2GB • MP4, MKV</p>
                            {uploadForm.video && <p className="text-xs text-indigo-600 mt-2 font-semibold truncate px-4">{uploadForm.video.name}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            <BookText className="inline mr-2" size={18} />
                            Notes (PDF - Optional) {uploadForm.notes && <span className="text-green-600 text-xs ml-2">✓ Selected</span>}
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50/50 hover:bg-white">
                            <FileText className="mx-auto text-gray-400 mb-3" size={32} />
                            <p className="text-gray-600 mb-2">Optional study materials</p>
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={e => setUploadForm({...uploadForm, notes: e.target.files[0]})}
                                // NO value attribute here for file input
                            />
                            <p className="text-sm text-gray-500">PDF format</p>
                            {uploadForm.notes && <p className="text-xs text-purple-600 mt-2 font-semibold truncate px-4">{uploadForm.notes.name}</p>}
                        </div>
                    </div>
                </div>
                
                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transform hover:-translate-y-0.5"
                    >
                        Upload Content & Submit for Approval
                    </button>
                </div>
            </form>
        </div>
    </div>
);

const QuizSection = ({ quizForm, setQuizForm, handleQuizSubmit }) => (
    <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-3xl shadow-sm border border-pink-100 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <HelpCircle className="text-pink-600" size={28} /> 
                Create Interactive Quiz
            </h2>
            <p className="text-gray-600">Create engaging quizzes to test student understanding</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quiz Question
                    </label>
                    <textarea 
                        placeholder="Enter your quiz question here..." 
                        required 
                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition h-24 cursor-text"
                        value={quizForm.question} 
                        onChange={e => setQuizForm({...quizForm, question: e.target.value})}
                    ></textarea>
                </div>
                
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">
                        Options (Mark the correct one)
                    </label>
                    {quizForm.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className={`flex-1 p-4 bg-gray-50 rounded-xl border-2 ${
                                quizForm.correctAnswer === opt ? 'border-green-500 bg-green-50' : 'border-gray-300'
                            } transition-all`}>
                                <input 
                                    type="text" 
                                    placeholder={`Option ${idx + 1}`} 
                                    required 
                                    className="w-full bg-transparent outline-none cursor-text"
                                    value={opt} 
                                    onChange={e => {
                                        const newOpts = [...quizForm.options];
                                        newOpts[idx] = e.target.value;
                                        setQuizForm({...quizForm, options: newOpts});
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setQuizForm({...quizForm, correctAnswer: opt})}
                                className={`p-3 rounded-lg ${
                                    quizForm.correctAnswer === opt 
                                        ? 'bg-green-100 text-green-700 border-2 border-green-500' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } transition`}
                            >
                                {quizForm.correctAnswer === opt ? 'Correct ✓' : 'Mark Correct'}
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <AlertCircle size={18} />
                        <span className="font-semibold">Tip:</span>
                    </div>
                    <p className="text-blue-600 text-sm">
                        The option marked as "Correct" will be automatically saved as the correct answer. 
                        Students will see all options in random order.
                    </p>
                </div>
                
                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-4 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transform hover:-translate-y-0.5"
                    >
                        Create Quiz
                    </button>
                </div>
            </form>
        </div>
    </div>
);

const AdminStatusSection = ({ contentList, adminFilter, setAdminFilter }) => {
    const filteredContentList = contentList.filter(item => {
        if (adminFilter === 'ALL') return true;
        return item.status === adminFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold mb-2">Content Status Tracker</h2>
                <p className="text-gray-300">Monitor your content approval status and student engagement</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                        <div className="text-2xl font-bold">{contentList.length}</div>
                        <div className="text-gray-300 text-sm">Total Uploads</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                        <div className="text-2xl font-bold text-green-400">
                            {contentList.filter(item => item.status === 'APPROVED').length}
                        </div>
                        <div className="text-gray-300 text-sm">Approved</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                        <div className="text-2xl font-bold text-amber-400">
                            {contentList.filter(item => item.status === 'PENDING').length}
                        </div>
                        <div className="text-gray-300 text-sm">Pending</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                        <div className="text-2xl font-bold text-rose-400">
                            {contentList.filter(item => item.status === 'REJECTED').length}
                        </div>
                        <div className="text-gray-300 text-sm">Rejected</div>
                    </div>
                </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setAdminFilter(filter)}
                        className={`px-4 py-2 rounded-full font-semibold transition-all ${
                            adminFilter === filter
                                ? filter === 'PENDING' ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                                : filter === 'APPROVED' ? 'bg-green-100 text-green-700 border-2 border-green-300'
                                : filter === 'REJECTED' ? 'bg-rose-100 text-rose-700 border-2 border-rose-300'
                                : 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {filter}
                        {filter !== 'ALL' && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white">
                                {contentList.filter(item => item.status === filter).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>
            
            {/* Content Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="border-b border-gray-200">
                                <th className="p-6 text-left font-bold text-gray-700">Title & Type</th>
                                <th className="p-6 text-left font-bold text-gray-700">Upload Date</th>
                                <th className="p-6 text-left font-bold text-gray-700">Duration</th>
                                <th className="p-6 text-left font-bold text-gray-700">Engagement</th>
                                <th className="p-6 text-left font-bold text-gray-700">Status</th>
                                <th className="p-6 text-left font-bold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContentList.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center">
                                        <div className="text-gray-400">
                                            <FileText className="mx-auto mb-3" size={48} />
                                            <p className="text-lg">No content found</p>
                                            <p className="text-sm">Try changing your filter selection</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredContentList.map((item) => (
                                    <tr 
                                        key={item.id} 
                                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200"
                                    >
                                        <td className="p-6">
                                            <div className="font-semibold text-gray-800">{item.title}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                {item.type}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-gray-700">{new Date(item.created_at).toLocaleDateString()}</div>
                                            <div className="text-sm text-gray-500">{new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                        </td>
                                        <td className="p-6 text-gray-700">{item.duration}</td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: item.studentEngagement }}
                                                    ></div>
                                                </div>
                                                <span className="text-gray-700 font-medium">{item.studentEngagement}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                                                item.status === 'APPROVED' 
                                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                                    : item.status === 'REJECTED' 
                                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                                {item.status === 'APPROVED' ? <CheckCircle size={16} /> :
                                                 item.status === 'REJECTED' ? <XCircle size={16} /> :
                                                 <Clock size={16} />}
                                                {item.status}
                                            </div>
                                            {item.status === 'REJECTED' && (
                                                <p className="text-xs text-rose-600 mt-1">Check email for details</p>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                                    <Eye size={18} />
                                                </button>
                                                {item.status === 'REJECTED' && (
                                                    <button className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition">
                                                        <Edit size={18} />
                                                    </button>
                                                )}
                                                {item.status === 'APPROVED' && (
                                                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                                                        <Download size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const LecturerDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [stats, setStats] = useState({ 
        activeCourses: 0, 
        totalStudents: 0, 
        earnings: 0,
        totalContent: 0,
        pendingApprovals: 0,
        approvedContent: 0
    });
    const [contentList, setContentList] = useState([]);
    
    // Upload Form State
    const [uploadForm, setUploadForm] = useState({
        courseId: '', title: '', description: '', video: null, notes: null
    });
    
    // Quiz Form State
    const [quizForm, setQuizForm] = useState({
        courseId: '', question: '', options: ['', '', '', ''], correctAnswer: ''
    });

    // Admin Filter
    const [adminFilter, setAdminFilter] = useState('ALL');

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (activeTab === 'admin') {
            fetchContentStatus();
        }
    }, [activeTab]);

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
    };
    
    const getJsonHeader = () => {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_BASE}/dashboard-stats`, getJsonHeader());
            setStats(res.data);
        } catch (err) { 
            console.error(err); 
            // Mock data for demo
            setStats({
                activeCourses: 5,
                totalStudents: 243,
                earnings: 2450,
                totalContent: 47,
                pendingApprovals: 3,
                approvedContent: 32
            });
        }
    };

    const fetchContentStatus = async () => {
        try {
            const res = await axios.get(`${API_BASE}/content/status`, getJsonHeader());
            setContentList(res.data);
        } catch (err) { 
            console.error(err);
            // Mock data for demo
            setContentList([
                {
                    id: 1,
                    title: 'Introduction to Python Programming',
                    created_at: '2024-01-15T10:30:00Z',
                    status: 'APPROVED',
                    type: 'Video Lecture',
                    duration: '45 min',
                    studentEngagement: '85%'
                },
                {
                    id: 2,
                    title: 'Advanced React Hooks',
                    created_at: '2024-01-18T14:20:00Z',
                    status: 'PENDING',
                    type: 'Tutorial',
                    duration: '60 min',
                    studentEngagement: '0%'
                },
                {
                    id: 3,
                    title: 'Data Structures and Algorithms',
                    created_at: '2024-01-10T09:15:00Z',
                    status: 'REJECTED',
                    type: 'Course Material',
                    duration: '90 min',
                    studentEngagement: '92%'
                },
                {
                    id: 4,
                    title: 'Machine Learning Fundamentals',
                    created_at: '2024-01-20T16:45:00Z',
                    status: 'APPROVED',
                    type: 'Video Lecture',
                    duration: '75 min',
                    studentEngagement: '78%'
                },
                {
                    id: 5,
                    title: 'Web Development Bootcamp',
                    created_at: '2024-01-22T11:00:00Z',
                    status: 'PENDING',
                    type: 'Course Series',
                    duration: '120 min',
                    studentEngagement: '0%'
                }
            ]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('courseId', 1);
        formData.append('title', uploadForm.title);
        formData.append('description', uploadForm.description);
        // Video check
        if (!uploadForm.video) {
            alert('Please select a video file.');
            return;
        }
        formData.append('video', uploadForm.video);
        if(uploadForm.notes) formData.append('notes', uploadForm.notes);

        try {
            await axios.post(`${API_BASE}/content/upload`, formData, getAuthHeader());
            alert("Content uploaded successfully and sent for admin approval");
            // Correct reset
            setUploadForm({ courseId: '', title: '', description: '', video: null, notes: null });
            fetchStats(); 
        } catch (error) {
            alert("Upload failed. Please try again");
        }
    };

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/quiz/create`, {
                courseId: 1,
                ...quizForm
            }, getJsonHeader());
            alert("Quiz created successfully");
            setQuizForm({ courseId: '', question: '', options: ['', '', '', ''], correctAnswer: '' });
        } catch (error) {
            alert("Failed to create quiz");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
            {/* Sidebar */}
            <motion.div 
                initial={{ x: -280 }} 
                animate={{ x: isSidebarOpen ? 0 : -280 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed md:static inset-y-0 left-0 w-80 bg-white border-r border-gray-200 z-50 flex flex-col shadow-xl"
            >
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600">
                    <span className="text-2xl font-bold text-white">Prolync Edu</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg">
                        <X size={20}/>
                    </button>
                </div>
                
                <nav className="flex-1 p-6 space-y-2">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: BookOpen, color: 'text-indigo-600' },
                        { id: 'upload', label: 'Upload Content', icon: Upload, color: 'text-green-600' },
                        { id: 'quiz', label: 'Quiz & Assessment', icon: HelpCircle, color: 'text-pink-600' },
                        { id: 'admin', label: 'Admin Status', icon: FileText, color: 'text-amber-600' },
                    ].map(item => (
                        <motion.button 
                            key={item.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { 
                                setActiveTab(item.id); 
                                if(window.innerWidth < 768) setIsSidebarOpen(false); 
                            }}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 font-medium ${
                                activeTab === item.id 
                                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md border border-indigo-100' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:shadow-sm'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white shadow' : 'bg-gray-100'}`}>
                                <item.icon size={20} className={item.color} />
                            </div>
                            {item.label}
                            {activeTab === item.id && (
                                <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"></div>
                            )}
                        </motion.button>
                    ))}
                </nav>

                <div className="p-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            L
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">Lecturer Account</p>
                            <p className="text-sm text-green-600 flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Online
                            </p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg shadow-rose-200"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Navbar */}
                <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 h-20 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)} 
                            className="md:hidden p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl text-indigo-600 hover:shadow-md transition"
                        >
                            <Menu size={20}/>
                        </button>
                        <h2 className="text-xl font-bold text-gray-800 capitalize">
                            {activeTab.replace('-', ' ')}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-gray-900">Welcome back, Lecturer!</p>
                            <p className="text-xs text-gray-500">Last login: Today, 10:30 AM</p>
                        </div>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                                L
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-32">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'dashboard' && <DashboardHome stats={stats} setActiveTab={setActiveTab} />}
                        {activeTab === 'upload' && <UploadSection uploadForm={uploadForm} setUploadForm={setUploadForm} handleUploadSubmit={handleUploadSubmit} />}
                        {activeTab === 'quiz' && <QuizSection quizForm={quizForm} setQuizForm={setQuizForm} handleQuizSubmit={handleQuizSubmit} />}
                        {activeTab === 'admin' && <AdminStatusSection contentList={contentList} adminFilter={adminFilter} setAdminFilter={setAdminFilter} />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LecturerDashboard;