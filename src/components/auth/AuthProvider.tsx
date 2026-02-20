'use client';
import { PrivyProvider } from '@privy-io/react-auth';
import { PRIVY_APP_ID } from '@/lib/constants';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'google'],
        appearance: {
          theme: 'dark',
          accentColor: '#ff9500',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
