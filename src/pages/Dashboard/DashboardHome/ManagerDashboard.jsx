import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Package, Truck, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext/ThemeContext';
import ThemeToggle from '../../../components/ThemeToggle';

const ManagerDashboard = () => {
    const { theme, toggleTheme } = useTheme();
    
    const data = {
        stats: {
            pendingOrders: 12,
            approvedOrders: 8,
            shippedOrders: 15,
            totalProducts: 24
        },
        workflowData: [
            { status: 'Pending', count: 12, color: '#fbbf24' },
            { status: 'Approved', count: 8, color: '#10b981' },
            { status: 'Processing', count: 6, color: '#3b82f6' },
            { status: 'Shipped', count: 15, color: '#3b82f6' },
            { status: 'Delivered', count: 18, color: '#10b981' }
        ],
        weeklyProgress: {
            completed: 45,
            total: 50,
            percentage: 90
        },
        dailyActivity: [
            { day: 'Mon', received: 8, completed: 6 },
            { day: 'Tue', received: 12, completed: 10 },
            { day: 'Wed', received: 6, completed: 8 },
            { day: 'Thu', received: 10, completed: 7 },
            { day: 'Fri', received: 8, completed: 9 },
            { day: 'Sat', received: 6, completed: 5 }
        ],
        topCategories: [
            { name: 'Electronics', orders: 45, revenue: 12500 },
            { name: 'Clothing', orders: 38, revenue: 8900 },
            { name: 'Home & Garden', orders: 22, revenue: 5600 },
            { name: 'Sports', orders: 18, revenue: 4200 },
            { name: 'Books', orders: 12, revenue: 1800 },
            { name: 'Toys', orders: 8, revenue: 1200 }
        ],
        alerts: {
            needsAttention: [
                { id: 'ORD001', product: 'Wireless Headphones', customer: 'John Smith', time: '2 hours ago' },
                { id: 'ORD002', product: 'Smart Watch', customer: 'Sarah Johnson', time: '5 hours ago' },
                { id: 'ORD003', product: 'Laptop Stand', customer: 'Mike Davis', time: '1 day ago' }
            ],
            lowStock: [
                { product: 'Wireless Mouse', stock: 5, threshold: 10 },
                { product: 'USB Cable', stock: 3, threshold: 10 },
                { product: 'Phone Case', stock: 2, threshold: 10 }
            ],
            recentlyApproved: [
                { id: 'ORD004', product: 'Bluetooth Speaker', customer: 'Emily Brown', time: '30 minutes ago' },
                { id: 'ORD005', product: 'Desk Lamp', customer: 'David Wilson', time: '1 hour ago' },
                { id: 'ORD006', product: 'Monitor Stand', customer: 'Lisa Anderson', time: '2 hours ago' }
            ]
        }
    };

    return (
        <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Production Dashboard</h1>
                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>John Manager - Monitor and manage production workflow</p>
                </div>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Pending Orders</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.stats?.pendingOrders || 0}</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Awaiting approval</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Approved Orders</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.stats?.approvedOrders || 0}</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Ready for production</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Shipped Orders</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.stats?.shippedOrders || 0}</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>In transit</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Truck className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Products</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.stats?.totalProducts || 0}</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>In catalog</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Package className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Workflow</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.workflowData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6">
                                {data.workflowData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Completion</h3>
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="relative">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="#e5e7eb"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="#10b981"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 88}`}
                                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - data.weeklyProgress.percentage / 100)}`}
                                    className="transition-all duration-500"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-gray-900">{data.weeklyProgress.percentage}%</span>
                                <span className="text-sm text-gray-600">Complete</span>
                                <span className="text-xs text-gray-500 mt-1">{data.weeklyProgress.completed}/{data.weeklyProgress.total} Orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Activity Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Production Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.dailyActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="received" stroke="#3b82f6" strokeWidth={2} name="Orders Received" />
                        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Orders Completed" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Top Categories and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
                    <div className="space-y-3">
                        {data.topCategories.map((category, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-900">{category.name}</p>
                                    <p className="text-sm text-gray-500">{category.orders} orders</p>
                                </div>
                                <p className="font-semibold text-gray-900">${category.revenue.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Needs Attention */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                            Needs Attention
                        </h3>
                        <div className="space-y-3">
                            {data.alerts.needsAttention.map((order, index) => (
                                <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2">
                                    <p className="font-medium text-gray-900">{order.product}</p>
                                    <p className="text-sm text-gray-500">{order.customer} • {order.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                            Low Stock Alert
                        </h3>
                        <div className="space-y-3">
                            {data.alerts.lowStock.map((item, index) => (
                                <div key={index} className="border-l-4 border-red-400 pl-4 py-2">
                                    <p className="font-medium text-gray-900">{item.product}</p>
                                    <p className="text-sm text-red-600">Stock: {item.stock} (Threshold: {item.threshold})</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recently Approved */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Recently Approved
                        </h3>
                        <div className="space-y-3">
                            {data.alerts.recentlyApproved.map((order, index) => (
                                <div key={index} className="border-l-4 border-green-400 pl-4 py-2">
                                    <p className="font-medium text-gray-900">{order.product}</p>
                                    <p className="text-sm text-gray-500">{order.customer} • {order.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Add Product
                    </button>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                        Pending Orders
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Approved Orders
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Manage Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;