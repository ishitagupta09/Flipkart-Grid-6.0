import React, { useState, useEffect } from 'react';
import { Camera, BarChart, Package, Truck, HelpCircle, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ProductScanner from './components/ProductScanner';
import Inventory from './components/Inventory';
import Analytics from './components/Analytics';
import CustomerCare from './components/CustomerCare';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual authentication logic here
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flipkart AI Inventory</h1>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center">
              <LogOut className="mr-2" /> Logout
            </button>
          ) : (
            <form onSubmit={handleLogin} className="flex">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mr-2 p-1 text-black"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mr-2 p-1 text-black"
              />
              <button type="submit" className="bg-green-500 px-4 py-1 rounded">Login</button>
            </form>
          )}
        </div>
      </header>

      {isLoggedIn && (
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto flex justify-between">
            <button onClick={() => setActiveTab('dashboard')} className={`p-4 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''}`}>
              <Camera className="inline-block mr-2" /> Dashboard
            </button>
            <button onClick={() => setActiveTab('scanner')} className={`p-4 ${activeTab === 'scanner' ? 'bg-gray-700' : ''}`}>
              <Camera className="inline-block mr-2" /> Product Scanner
            </button>
            <button onClick={() => setActiveTab('inventory')} className={`p-4 ${activeTab === 'inventory' ? 'bg-gray-700' : ''}`}>
              <Package className="inline-block mr-2" /> Inventory
            </button>
            <button onClick={() => setActiveTab('analytics')} className={`p-4 ${activeTab === 'analytics' ? 'bg-gray-700' : ''}`}>
              <BarChart className="inline-block mr-2" /> Analytics
            </button>
            <button onClick={() => setActiveTab('customerCare')} className={`p-4 ${activeTab === 'customerCare' ? 'bg-gray-700' : ''}`}>
              <HelpCircle className="inline-block mr-2" /> Customer Care
            </button>
          </div>
        </nav>
      )}

      <main className="container mx-auto mt-8">
        {isLoggedIn ? (
          <>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'scanner' && <ProductScanner />}
            {activeTab === 'inventory' && <Inventory />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'customerCare' && <CustomerCare />}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Flipkart AI Inventory Management</h2>
            <p>Please log in to access the system.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
