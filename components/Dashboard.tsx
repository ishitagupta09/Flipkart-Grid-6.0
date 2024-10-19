import React, { useState, useEffect } from 'react';
import { Camera, AlertTriangle, Upload, BarChart2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [alerts, setAlerts] = useState(0);
  const [lowStockItems, setLowStockItems] = useState<string[]>([]);
  const [todayStats, setTodayStats] = useState({
    scanned: 0,
    removed: 0,
    wasted: 0,
    saved: 0
  });
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      setTotalProducts(prev => prev + Math.floor(Math.random() * 5));
      setAlerts(Math.floor(Math.random() * 10));
      setLowStockItems(['Milk', 'Bread', 'Eggs']);
      setTodayStats({
        scanned: Math.floor(Math.random() * 100),
        removed: Math.floor(Math.random() * 20),
        wasted: Math.floor(Math.random() * 10),
        saved: Math.floor(Math.random() * 70)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Here you would typically send this image to your backend for processing
      console.log('Image selected:', file.name);
      // Simulate processing
      setTimeout(() => {
        alert('Image processed and added to inventory!');
        setSelectedImage(null);
      }, 2000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Camera Control</h3>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleCamera}
              className={`px-4 py-2 rounded ${cameraActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
            >
              {cameraActive ? 'Close Camera' : 'Open Camera'}
            </button>
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
              <Upload className="inline-block mr-2" />
              Upload Image
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          </div>
          {cameraActive && (
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <Camera size={48} />
              <p className="ml-2">Camera is active</p>
            </div>
          )}
          {selectedImage && (
            <div className="mt-2">
              <p>Processing: {selectedImage.name}</p>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Inventory Summary</h3>
          <ul>
            <li className="mb-2">Total Products: <span className="font-bold text-blue-600">{totalProducts}</span></li>
            <li className="flex items-center mb-2">
              <AlertTriangle className="text-yellow-500 mr-2" />
              Alerts: <span className="font-bold text-yellow-500 ml-2">{alerts}</span>
            </li>
            <li>
              <h4 className="font-semibold">Low Stock Items:</h4>
              <ul className="list-disc list-inside">
                {lowStockItems.map((item, index) => (
                  <li key={index} className="text-red-500">{item}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Today's Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <BarChart2 className="mx-auto text-blue-500" />
            <p className="mt-2">Scanned: {todayStats.scanned}</p>
          </div>
          <div className="text-center">
            <BarChart2 className="mx-auto text-red-500" />
            <p className="mt-2">Removed: {todayStats.removed}</p>
          </div>
          <div className="text-center">
            <BarChart2 className="mx-auto text-yellow-500" />
            <p className="mt-2">Wasted: {todayStats.wasted}</p>
          </div>
          <div className="text-center">
            <BarChart2 className="mx-auto text-green-500" />
            <p className="mt-2">Saved: {todayStats.saved}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
