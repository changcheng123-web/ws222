import React, { useState, useEffect } from 'react';
import PhoneInput from './components/PhoneInput';
import VerificationCode from './components/VerificationCode';
import SuccessPage from './components/SuccessPage';
import LoadingSpinner from './components/LoadingSpinner';

type Step = 'phone' | 'verification' | 'success';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (phone: string) => {
    setIsLoading(true);
    setPhoneNumber(phone);
    
    // 模拟发送验证码的延迟
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('verification');
    }, 2000);
  };

  const handleVerificationSuccess = () => {
    setIsLoading(true);
    
    // 模拟验证延迟
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('success');
    }, 1500);
  };

  const handleBackToPhone = () => {
    setCurrentStep('phone');
    setPhoneNumber('');
  };

  const handleStartOver = () => {
    setCurrentStep('phone');
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLoading && <LoadingSpinner />}
        
        {!isLoading && currentStep === 'phone' && (
          <PhoneInput onSubmit={handlePhoneSubmit} />
        )}
        
        {!isLoading && currentStep === 'verification' && (
          <VerificationCode 
            phoneNumber={phoneNumber}
            onSuccess={handleVerificationSuccess}
            onBack={handleBackToPhone}
          />
        )}
        
        {!isLoading && currentStep === 'success' && (
          <SuccessPage 
            phoneNumber={phoneNumber}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}

export default App;