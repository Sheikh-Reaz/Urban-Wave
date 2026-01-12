import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Package, TrendingUp, User, Search, HelpCircle, Eye, Truck, Clock } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext/ThemeContext';
import ThemeToggle from '../../../components/ThemeToggle';

const BuyerDashboard = () => {
    const { theme, toggleTheme } = useTheme();
    
    const data = {
        user: {
            name: 'Sarah',
            stats: {
                totalOrders: 12,
                activeOrders: 3,
                deliveredOrders: 9,
                totalSpent: 1250.75
            }
        },
        spendingData: [
            { month: 'Jan', amount: 180 },
            { month: 'Feb', amount: 220 },
            { month: 'Mar', amount: 150 },
            { month: 'Apr', amount: 280 },
            { month: 'May', amount: 195 },
            { month: 'Jun', amount: 225.75 }
        ],
        orderStatusData: [
            { name: 'Pending', value: 1, color: '#fbbf24' },
            { name: 'Processing', value: 1, color: '#3b82f6' },
            { name: 'Delivered', value: 10, color: '#10b981' }
        ],
        activeOrders: [
            { 
                id: 'ORD001', 
                product: 'Premium Cotton T-Shirt', 
                price: 29.99, 
                orderDate: '2024-06-15', 
                status: 'Processing', 
                progress: 65,
                estimatedDelivery: '2024-06-20' 
            },
            { 
                id: 'ORD002', 
                product: 'Wireless Headphones', 
                price: 89.99, 
                orderDate: '2024-06-14', 
                status: 'Shipped', 
                progress: 85,
                estimatedDelivery: '2024-06-18' 
            },
            { 
                id: 'ORD003', 
                product: 'Smart Watch', 
                price: 199.99, 
                orderDate: '2024-06-12', 
                status: 'Pending', 
                progress: 25,
                estimatedDelivery: '2024-06-25' 
            }
        ],
        recentOrders: [
            { id: 'ORD004', product: 'Winter Jacket', price: 199.99, orderDate: '2024-06-10', status: 'Delivered' },
            { id: 'ORD005', product: 'Slim Fit Jeans', price: 79.99, orderDate: '2024-06-08', status: 'Delivered' },
            { id: 'ORD006', product: 'Business Formal Shirt', price: 89.99, orderDate: '2024-06-05', status: 'Delivered' },
            { id: 'ORD007', product: 'Casual Shorts', price: 39.99, orderDate: '2024-06-03', status: 'Delivered' },
            { id: 'ORD008', product: 'Running Shoes', price: 129.99, orderDate: '2024-06-01', status: 'Delivered' }
        ],
        featuredProducts: [
            { id: 1, name: 'Premium Cotton T-Shirt', price: 29.99, image: '/images/tshirt.jpg' },
            { id: 2, name: 'Wireless Headphones', price: 89.99, image: '/images/headphones.jpg' },
            { id: 3, name: 'Smart Watch', price: 199.99, image: '/images/watch.jpg' },
            { id: 4, name: 'Laptop Backpack', price: 49.99, image: '/images/backpack.jpg' }
        ]
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return 'text-yellow-600 bg-yellow-100';
            case 'Processing': return 'text-blue-600 bg-blue-100';
            case 'Delivered': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getProgressColor = (progress) => {
        if (progress < 33) return 'bg-red-500';
        if (progress < 66) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Welcome back, {data.user.name}!</h1>
                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Here's what's happening with your orders today.</p>
                </div>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Orders</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.user?.stats?.totalOrders || 0}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <ShoppingCart className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Active Orders</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.user?.stats?.activeOrders || 0}</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Delivered</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.user?.stats?.deliveredOrders || 0}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Package className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Spent</p>
                            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${data.user?.stats?.totalSpent?.toFixed(2) || '0.00'}</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Spending Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data.spendingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Order Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.orderStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({name, value}) => `${name}: ${value}`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.orderStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Active Orders */}
            <div className={`rounded-lg shadow p-6 mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Active Orders</h3>
                <div className="space-y-4">
                    {data.activeOrders.map((order, index) => (
                        <div key={index} className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{order.product}</h4>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Order ID: {order.id}</p>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Ordered: {order.orderDate}</p>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Est. Delivery: {order.estimatedDelivery}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${order.price.toFixed(2)}</p>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className={`flex justify-between text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <span>Delivery Progress</span>
                                    <span>{order.progress}%</span>
                                </div>
                                <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                    <div 
                                        className={`h-2 rounded-full ${getProgressColor(order.progress)}`}
                                        style={{ width: `${order.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                <Truck className="w-4 h-4 mr-2" />
                                Track Order
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders and Featured Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h3>
                    <div className="space-y-3">
                        {data.recentOrders.map((order, index) => (
                            <div key={index} className={`border-b pb-3 last:border-b-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{order.product}</p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{order.orderDate}</p>
                                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${order.price.toFixed(2)}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Featured Products</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {data.featuredProducts.map((product, index) => (
                            <div key={index} className={`border rounded-lg p-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className={`bg-gray-200 rounded-lg h-24 mb-2 flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : ''}`}>
                                    <Package className="w-8 h-8 text-gray-400" />
                                </div>
                                <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm`}>{product.name}</h4>
                                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${product.price}</p>
                                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <Search className="w-4 h-4 mr-2" />
                        Browse Products
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        My Orders
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                    </button>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;