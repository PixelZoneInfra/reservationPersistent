// Wspólne ustawienia
const API_URL = 'https://<YOUR_BACKEND>.onrender.com/api';
const ORDER_LIMIT_COUNT = 2;
const ORDER_LIMIT_TIME = 5 * 60 * 1000; // 5 minut

// Formatowanie czasu i daty
export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('pl-PL', {
    hour: '2-digit', minute: '2-digit'
  });
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('pl-PL', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

// Parametry URL (np. numer stolika)
export function getUrlParameter(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// LIMITY ZAMÓWIEŃ
export async function checkOrderLimit(desk) {
  const res = await fetch(`${API_URL}/orders?desk=${desk}`); 
  const orders = await res.json();
  const now = Date.now();
  const recent = orders
    .map(o => new Date(o.created_at).getTime())
    .filter(ts => now - ts < ORDER_LIMIT_TIME);
  const remaining = ORDER_LIMIT_COUNT - recent.length;
  let timeRemaining = 0;
  if (remaining <= 0) {
    timeRemaining = ORDER_LIMIT_TIME - (now - Math.min(...recent));
  }
  return { allowed: remaining > 0, remaining: Math.max(0, remaining), timeRemaining };
}

export async function addOrderToLimit(desk) {
  // Teraz limit sprawdzamy na serwerze; tu nic nie robimy
}

// SUMA ZAMÓWIENIA
export function calculateOrderTotal(items) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

// API: Pobierz wszystkie zamówienia
export async function fetchOrders() {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
}

// API: Złóż nowe zamówienie
export async function createOrder(order) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return res.json();
}

// API: Przełącz status zamówienia
export async function toggleOrderStatus(id) {
  const res = await fetch(`${API_URL}/orders/${id}`, { method: 'PUT' });
  return res.json();
}
