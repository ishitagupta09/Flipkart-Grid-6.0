import React, { useState, useEffect } from 'react';
import { Camera, Check } from 'lucide-react';

const ProductScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<null | { name: string, brand: string, price: number, expiry: string }>(null);

  const startScanning = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setScannedProduct({
        name: 'Sample Product',
        brand: 'Sample Brand',
        price: 99.99,
        expiry: '2024-12-31'
      });
      setIsScanning(false);
    }, 3000);
  };

  const addToInventory = () => {
    // Implement logic to add scanned product to inventory
    alert('Product added to inventory!');
    setScannedProduct(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product Scanner</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <button
            onClick={startScanning}
            disabled={isScanning}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isScanning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </button>
        </div>
        {isScanning && (
          <div className="bg-gray-200 h-48 flex items-center justify-center">
            <Camera size={48} className="animate-pulse" />
            <p className="ml-2">Scanning product...</p>
          </div>
        )}
        {scannedProduct && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Scanned Product:</h3>
            <ul className="list-disc list-inside">
              <li>Name: {scannedProduct.name}</li>
              <li>Brand: {scannedProduct.brand}</li>
              <li>Price: ${scannedProduct.price.toFixed(2)}</li>
              <li>Expiry Date: {scannedProduct.expiry}</li>
            </ul>
            <button
              onClick={addToInventory}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <Check className="inline-block mr-2" /> Add to Inventory
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScanner;
