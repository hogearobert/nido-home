const CART_KEY = 'nido_cart';

function getCart() {
  try {
    const d = localStorage.getItem(CART_KEY);
    if (!d) return [];
    const items = JSON.parse(d);
    if (!Array.isArray(items)) return [];
    return items.filter(i => i && i.id && i.qty > 0);
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateBadge();
}

function addToCart(id, name, price, qty = 1) {
  const items = getCart();
  const found = items.find(i => i.id === id);
  if (found) {
    found.qty = Math.min(99, found.qty + qty);
  } else {
    items.push({ id, name, price, qty });
  }
  saveCart(items);
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function updateQty(id, qty) {
  const items = getCart();
  const item = items.find(i => i.id === id);
  if (!item) return;
  if (qty < 1) { removeFromCart(id); return; }
  item.qty = Math.min(99, qty);
  saveCart(items);
}

function cartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

function updateBadge() {
  const el = document.getElementById('cart-badge');
  if (!el) return;
  const c = cartCount();
  el.textContent = c;
  el.style.display = c > 0 ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', updateBadge);
