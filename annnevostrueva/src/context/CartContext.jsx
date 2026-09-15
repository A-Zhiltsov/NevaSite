import { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);

const STORAGE_KEY = 'cart';

export function CartProvider({ children }) {
  // === СОСТОЯНИЕ ===
  const [items, setItems] = useState(() => {
    // ленивая инициализация: читаем из localStorage один раз при монтировании
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  // === СИНХРОНИЗАЦИЯ С LOCALSTORAGE ===
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // === ОПЕРАЦИИ ===
  function addItem(product) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        // товар уже есть — увеличиваем количество
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // товара нет — добавляем с quantity 1
      return [...prev, { id: product.id, quantity: 1 }];
    });
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function increase(id) {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }

  function decrease(id) {
    setItems(prev => {
      return prev
        .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0); // если стало 0 — удаляем
    });
  }

  function clear() {
    setItems([]);
  }

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  // === ПРОИЗВОДНЫЕ ЗНАЧЕНИЯ ===
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = items.reduce((sum, i) => {
    const product = products.find(p => p.id === i.id);
    return sum + (product ? product.price * i.quantity : 0);
  }, 0);

  // === ЧТО ОТДАЁМ НАРУЖУ ===
  const value = {
    items,
    isOpen,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    increase,
    decrease,
    clear,
    openCart,
    closeCart,
  };

  

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// === ХУК ДЛЯ УДОБНОГО ДОСТУПА ===
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}