import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, RefreshCw } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  expiry: string;
  quantity: number;
  freshness?: number;
  category: 'Cosmetics' | 'Electronics' | 'Groceries' | 'Other';
}

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Simulating fetching inventory data
    const sampleProducts: Product[] = [
      { id: 1, name: 'Apple', brand: 'FreshFruits', price: 1.99, expiry: '2024-03-15', quantity: 100, freshness: 95, category: 'Groceries' },
      { id: 2, name: 'Milk', brand: 'DairyBest', price: 3.49, expiry: '2024-03-10', quantity: 50, category: 'Groceries' },
      { id: 3, name: 'Shampoo', brand: 'CleanHair', price: 5.99, expiry: '2025-06-30', quantity: 200, category: 'Cosmetics' },
      { id: 4, name: 'Smartphone', brand: 'TechGiant', price: 599.99, expiry: '2026-12-31', quantity: 20, category: 'Electronics' },
      { id: 5, name: 'Tomato', brand: 'VeggieLand', price: 0.99, expiry: '2024-03-09', quantity: 80, freshness: 90, category: 'Groceries' },
    ];
    setProducts(sampleProducts);
  }, []);

  const sortProducts = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <div className="mb-4">
        <label htmlFor="category-select" className="mr-2">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="All">All</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Electronics">Electronics</option>
          <option value="Groceries">Groceries</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => sortProducts('name')}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => sortProducts('brand')}>
                Brand {sortField === 'brand' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => sortProducts('category')}>
                Category {sortField === 'category' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => sortProducts('price')}>
                Price {sortField === 'price' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => sortProducts('expiry')}>
                Expiry Date {sortField === 'expiry' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => sortProducts('quantity')}>
                Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2">Freshness</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.brand}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  {new Date(product.expiry) < new Date() ? (
                    <span className="text-red-500 flex items-center">
                      <AlertTriangle className="mr-1" size={16} />
                      {product.expiry}
                    </span>
                  ) : (
                    product.expiry
                  )}
                </td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">
                  {product.freshness ? (
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${product.freshness}%` }}
                        ></div>
                      </div>
                      {product.freshness}%
                    </div>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
