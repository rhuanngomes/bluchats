import React from 'react';
import SettingsSidebar from './SettingsSidebar';

interface SettingsLayoutProps {
  children: React.ReactNode;
  onBack: () => void;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, onBack }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SettingsSidebar onBack={onBack} />
      
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;