import React, { useState } from 'react';
import { Lock, Home, AlertTriangle } from 'lucide-react';

const Forbidden = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated danger elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl">
                {/* Lock icon */}
                <div className="mb-8 flex justify-center">
                    <div className={`relative transition-transform duration-500 ${hovered ? 'scale-110 rotate-12' : ''}`}>
                        <Lock size={100} className="text-red-500 drop-shadow-lg" strokeWidth={1.5} />
                        <AlertTriangle size={40} className="absolute -bottom-4 -right-4 text-orange-500 animate-bounce" />
                    </div>
                </div>

                {/* 403 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl md:text-[140px] font-black bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-red-600 leading-none mb-4">
                        403
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Access Forbidden
                    </h2>
                    <p className="text-lg text-slate-300 max-w-md mx-auto">
                        You don't have permission to access this resource. This area is restricted and off-limits for your current access level.
                    </p>
                </div>

                {/* Details box */}
                <div className="bg-slate-800/40 border border-red-500/30 rounded-lg p-6 mb-8 backdrop-blur-sm">
                    <p className="text-sm text-slate-400">
                        <span className="text-red-400 font-semibold">Error Code:</span> 403 Forbidden<br />
                        <span className="text-red-400 font-semibold">Reason:</span> Insufficient permissions<br />
                        <span className="text-red-400 font-semibold">Status:</span> Access Denied
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.location.href = '/'}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                        <Home size={20} />
                        Return Home
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-500 text-slate-200 font-semibold rounded-lg hover:border-red-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                        Go Back
                    </button>
                </div>

                {/* Footer message */}
                <p className="text-xs text-slate-500 mt-12">
                    If you believe this is an error, please contact support.
                </p>
            </div>
        </div>
    );
};

export default Forbidden;