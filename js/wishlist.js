const WISH_KEY = 'nido_wishlist';

function getWishlist() {
  try {
    const d = localStorage.getItem(WISH_KEY);
    if (!d) return [];
    const items = JSON.parse(d);
    if (!Array.isArray(items)) return [];
    return items;
  } catch {
    localStorage.removeItem(WISH_KEY);
    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem(WISH_KEY, JSON.stringify(items));
  updateWishBadge();
}

function toggleWishlist(id, name, price, img) {
  const items = getWishlist();
  const idx = items.findIndex(i => i.id === id);
  if (idx >= 0) {
    items.splice(idx, 1);
    saveWishlist(items);
    showToast('Eliminat din Wishlist');
    return false;
  } else {
    items.push({ id, name, price, img });
    saveWishlist(items);
    showToast('Adăugat în Wishlist');
    return true;
  }
}

function isWished(id) {
  return getWishlist().some(i => i.id === id);
}

function updateWishBadge() {
  const el = document.getElementById('wishlist-badge');
  if (!el) return;
  const c = getWishlist().length;
  el.textContent = c;
  el.style.display = c > 0 ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', updateWishBadge);
