import React, { useState } from 'react';

interface PhoneInputProps {
  onSubmit: (phone: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      setError('请输入手机号码');
      return;
    }
    
    if (!validatePhone(phone)) {
      setError('请输入正确的手机号码格式');
      return;
    }
    
    setError('');
    onSubmit(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(value);
    if (error) setError('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-white/95">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">手机验证</h1>
        <p className="text-gray-600 leading-relaxed">请输入您的手机号码，我们将发送验证码到您的手机</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            手机号码
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">+86</span>
            </div>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                error 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-green-500 focus:ring-green-500'
              }`}
              placeholder="请输入手机号码"
              maxLength={11}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          获取验证码
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          点击"获取验证码"即表示您同意我们的
          <a href="#" className="text-green-600 hover:text-green-700">服务条款</a>
          和
          <a href="#" className="text-green-600 hover:text-green-700">隐私政策</a>
        </p>
      </div>
    </div>
  );
};

export default PhoneInput;