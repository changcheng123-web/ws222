import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-white/95">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">处理中...</h2>
        <p className="text-gray-600">请稍候，正在为您处理请求</p>
        
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;