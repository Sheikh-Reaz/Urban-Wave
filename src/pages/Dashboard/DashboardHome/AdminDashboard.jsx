import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, ShoppingCart, Package, ArrowUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext/ThemeContext';
import ThemeToggle from '../../../components/ThemeToggle';

const AdminDashboard = () => {
    const { theme, toggleTheme } = useTheme();
    
    const data = {
        stats: {
            totalRevenue: 4299.15,
            totalOrders: 3,
            pendingOrders: 1,
            totalUsers: 4,
            newUsersThisMonth: 2,
            totalProducts: 6
        },
        revenueData: [
            { month: 'Jan', revenue: 2400, orders: 12 },
            { month: 'Feb', revenue: 1398, orders: 8 },
            { month: 'Mar', revenue: 3800, orders: 15 },
            { month: 'Apr', revenue: 3908, orders: 18 },
            { month: 'May', revenue: 4800, orders: 22 },
            { month: 'Jun', revenue: 4299, orders: 20 }
        ],
        orderStatusData: [
            { name: 'Pending', value: 1, color: '#fbbf24' },
            { name: 'Approved', value: 1, color: '#10b981' },
            { name: 'Shipped', value: 1, color: '#3b82f6' }
        ],
        userGrowthData: [
            { month: 'Jan', users: 10 },
            { month: 'Feb', users: 15 },
            { month: 'Mar', users: 22 },
            { month: 'Apr', users: 28 },
            { month: 'May', users: 32 },
            { month: 'Jun', users: 36 }
        ],
        topProducts: [
            { name: 'Premium Cotton T-Shirt', orders: 15, price: 29.99 },
            { name: 'Slim Fit Jeans', orders: 12, price: 79.99 },
            { name: 'Winter Jacket', orders: 8, price: 199.99 },
            { name: 'Business Formal Shirt', orders: 6, price: 89.99 },
            { name: 'Casual Shorts', orders: 4, price: 39.99 }
        ],
        recentOrders: [
            { id: 'ORD001', product: 'Premium Cotton T-Shirt', customer: 'John Doe', price: 29.99, status: 'Pending' },
            { id: 'ORD002', product: 'Winter Jacket', customer: 'Jane Smith', price: 199.99, status: 'Approved' },
            { id: 'ORD003', product: 'Slim Fit Jeans', customer: 'Bob Johnson', price: 79.99, status: 'Shipped' }
        ],
        recentUsers: [
            { name: 'Alice Brown', email: 'alice@example.com', role: 'Buyer', status: 'Approved' },
            { name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Manager', status: 'Pending' },
            { name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Approved' },
            { name: 'Eve Adams', email: 'eve@example.com', role: 'Buyer', status: 'Pending' },
            { name: 'Frank Lee', email: 'frank@example.com', role: 'Buyer', status: 'Approved' },
            { name: 'George Martin', email: 'george@example.com', role: 'Manager', status: 'Pending' }
        ]
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return 'text-yellow-600 bg-yellow-100';
            case 'Approved': return 'text-green-600 bg-green-100';
            case 'Shipped': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Pending': return <Clock className="w-4 h-4" />;
            case 'Approved': return <CheckCircle className="w-4 h-4" />;
            case 'Shipped': return <Package className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Welcome back! Here's what's happening with your store today.</p>
                </div>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Revenue</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${data.stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
                            <div className="flex items-center mt-2 text-green-600">
                                <ArrowUp className="w-4 h-4 mr-1" />
                                <span className="text-sm">12% from last month</span>
                            </div>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Orders</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.stats?.totalOrders || 0}</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{data.stats?.pendingOrders || 0} pending</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <ShoppingCart className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Users</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.stats?.totalUsers || 0}</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{data.stats?.newUsersThisMonth || 0} new this month</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Products</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.stats?.totalProducts || 0}</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Active in catalog</p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <Package className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className={`lg:col-span-2 rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data.revenueData || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Order Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.orderStatusData || []}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({name, value}) => `${name}: ${value}`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {(data.orderStatusData || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* User Growth Chart */}
            <div className={`rounded-lg shadow p-6 mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.userGrowthData || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Top Selling Products</h3>
                    <div className="space-y-3">
                        {(data.topProducts || []).map((product, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div>
                                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{product.orders} orders</p>
                                </div>
                                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h3>
                    <div className="space-y-3">
                        {(data.recentOrders || []).map((order, index) => (
                            <div key={index} className={`border-b pb-3 last:border-b-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{order.product}</p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{order.customer}</p>
                                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${order.price}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        <span className="ml-1">{order.status}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Users</h3>
                    <div className="space-y-3">
                        {(data.recentUsers || []).map((user, index) => (
                            <div key={index} className={`border-b pb-3 last:border-b-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{user.role}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Manage Users
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        View Products
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        All Orders
                    </button>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                        Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;