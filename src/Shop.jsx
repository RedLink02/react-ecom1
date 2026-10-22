import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addArticleCart } from './redux/actions/panierActions.js'
import CardItem from './CardItem.jsx'


export default function Shop() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.articles.articles)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceAscending, setPriceAscending] = useState(true)
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProducts = products
    .filter(product =>
      [product.name, product.category, product.description]
        .some(value => value.toLowerCase().includes(normalizedQuery))
    )
    .sort((first, second) =>
      priceAscending
        ? first.price - second.price
        : second.price - first.price
    )

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
          <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="relative min-w-0 flex-1">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m16 16 4 4" />
              </svg>
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <button
              type="button"
              onClick={() => setPriceAscending(current => !current)}
              aria-label={`Sort by price ${priceAscending ? 'high to low' : 'low to high'}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Price: {priceAscending ? 'Low to high' : 'High to low'}
              <span aria-hidden="true">{priceAscending ? '↑' : '↓'}</span>
            </button>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-bold text-slate-900">
                No products found
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Try another search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map(product => (
                <CardItem
                  key={product.id}
                  product={product}
                  linkTo={`/products/${product.id}`}
                  primaryLabel="Add to cart"
                  onPrimaryAction={() => dispatch(addArticleCart({ ...product, quantity: 1 }))}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
