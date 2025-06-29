import React from 'react';

interface SuccessPageProps {
  phoneNumber: string;
  onStartOver: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ phoneNumber, onStartOver }) => {
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-white/95">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">验证成功！</h1>
        
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-8">
          <p className="text-gray-600 mb-2">您的手机号码</p>
          <p className="text-2xl font-bold text-green-600 tracking-wider">
            +86 {formatPhoneNumber(phoneNumber)}
          </p>
          <p className="text-sm text-gray-500 mt-2">已成功验证</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">手机号码验证完成</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">账户安全已提升</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={onStartOver}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            重新开始验证
          </button>
          
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
            返回首页
          </button>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="text-left">
              <p className="text-sm font-medium text-amber-800">安全提示</p>
              <p className="text-xs text-amber-700 mt-1">请妥善保管您的手机，避免验证码泄露给他人</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;