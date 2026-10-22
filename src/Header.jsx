import { useSelector } from 'react-redux'
import { Link } from 'react-router'

function Header() {
  const cartCount = useSelector(state =>
    state.panier.items.reduce((count, item) => count + (item.quantity ?? 1), 0)
  )

  return (
    <header className="flex items-center justify-between bg-blue-500 p-5 text-white">
      <h1 className="text-2xl font-bold">Shop</h1>
      <Link
        to="/cart"
        aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L21 8H6" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
        <span>Cart</span>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-blue-600">
          {cartCount}
        </span>
      </Link>
    </header>
  )
}

export default Header