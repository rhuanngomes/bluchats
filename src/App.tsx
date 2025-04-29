import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import BillingPage from './pages/BillingPage';
import ProductPage from './pages/ProductPage';
import ChannelIntegrationsPage from './pages/ChannelIntegrationsPage';
import ResourcesPage from './pages/ResourcesPage';
import PricingPage from './pages/PricingPage';
import DirectoryPage from './pages/DirectoryPage.tsx';
import InboxSettingsPage from './pages/InboxSettingsPage';
import UsersPage from './pages/UsersPage';
import MetricsPage from './pages/MetricsPage';
import OmnichannelPage from './pages/features/OmnichannelPage';
import CustomerSupportPage from './pages/features/CustomerSupportPage';
import ProfilePage from './pages/ProfilePage';
import WhatsAppConfigPage from './pages/WhatsAppConfigPage';
import MyAccountPage from './pages/MyAccountPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/produto" element={<ProductPage />} />
        <Route path="/produto/atendimento" element={<CustomerSupportPage />} />
        <Route path="/recursos" element={<ResourcesPage />} />
        <Route path="/precos" element={<PricingPage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/app/inboxes" element={<InboxSettingsPage />} />
        <Route path="/app/profile" element={<ProfilePage />} />
        <Route path="/app/billing" element={<BillingPage />} />
        <Route path="/app/metrics" element={<MetricsPage />} />
        <Route path="/app/users" element={<UsersPage />} />
        <Route path="/app/my-account" element={<MyAccountPage />} />
        <Route path="/app/integrations/whatsapp" element={<WhatsAppConfigPage />} />
        <Route path="/app/integrations" element={<ChannelIntegrationsPage />} />
        <Route path="/app" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;