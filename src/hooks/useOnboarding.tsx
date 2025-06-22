
import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se o usuário já viu o onboarding
    const hasSeenOnboarding = localStorage.getItem('booklib-onboarding-completed');
    
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
    
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('booklib-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('booklib-onboarding-completed');
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding
  };
};
