import React from 'react';


export const order = {
  orderNumber: '12345',
  placedAt: '2025-05-26T10:00:00Z',
  status: 'Delivered',
  shipping: {
    fullName: 'John Doe',
    phone: '+91 1234567890',
    address: '123 Main St',
    city: 'Mumbai',
    zipCode: '400001',
  },
  payment: {
    cardholderName: 'John Doe',
    cardLast4: '1234',
    autoRecharge: true,
  },
  items: [
    { name: 'Product A', quantity: 2, price: 100 },
    { name: 'Product B', quantity: 1, price: 300 },
  ],
  subtotal: 500,
  shippingCost: 50,
  discount: 50,
  total: 500,
};

