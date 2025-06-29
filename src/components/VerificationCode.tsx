import React, { useState, useEffect, useRef } from 'react';

interface VerificationCodeProps {
  phoneNumber: string;
  onSuccess: () => void;
  onBack: () => void;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ phoneNumber, onSuccess, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // 自动跳转到下一个输入框
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // 检查是否输入完成
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      setTimeout(() => {
        handleVerify(newCode.join(''));
      }, 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (verificationCode: string) => {
    // 模拟验证码验证（这里假设正确的验证码是 123456）
    if (verificationCode === '123456') {
      onSuccess();
    } else {
      setError('验证码错误，请重新输入');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-white/95">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">输入验证码</h1>
        <p className="text-gray-600 leading-relaxed">
          验证码已发送至 <span className="font-medium text-gray-900">{formatPhoneNumber(phoneNumber)}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            请输入6位验证码
          </label>
          <div className="flex justify-center space-x-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  error 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 focus:border-green-500 focus:ring-green-500'
                }`}
                autoFocus={index === 0}
              />
            ))}
          </div>
          {error && (
            <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              重新发送验证码
            </button>
          ) : (
            <p className="text-gray-500">
              {countdown}秒后可重新发送
            </p>
          )}
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          返回修改手机号
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          提示：演示验证码为 <span className="font-mono font-bold">123456</span>
        </p>
      </div>
    </div>
  );
};

export default VerificationCode;