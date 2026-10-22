import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import {
  clearCart,
  removeArticleCart,
  updateArticleQuantity,
} from './redux/actions/panierActions.js'

export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.panier.items)
  const itemCount = cartItems.reduce((count, item) => count + (item.quantity ?? 1), 0)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0,
  )
  const discount = Math.floor(subtotal / 100) * 10
  const total = subtotal - discount
  const amountToNextDiscount = 100 - (subtotal % 100)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                Your selections
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Shopping cart
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Clear cart
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-200">
              <span aria-hidden="true" className="text-5xl">🛍️</span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Your cart is empty
              </h3>
              <p className="mt-2 text-slate-600">
                Browse the collection and find something you love.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex rounded-lg bg-blue-600 px-2 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="space-y-4">
                {cartItems.map(item => {
                  const quantity = item.quantity ?? 1

                  return (
                    <article
                      key={item.id}
                      className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                          {item.category || 'Item'}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          ${item.price.toFixed(2)} each
                        </p>
                        <div className="mt-4 inline-flex items-center gap-3 rounded-lg border border-slate-200 p-1">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            disabled={quantity <= 1}
                            onClick={() =>
                              dispatch(updateArticleQuantity(item.id, quantity - 1))
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md text-lg font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            -
                          </button>
                          <span aria-live="polite" className="min-w-6 text-center text-sm font-semibold text-slate-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() =>
                              dispatch(updateArticleQuantity(item.id, quantity + 1))
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md text-lg font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="shrink-0 text-lg font-bold text-slate-900">
                        ${(item.price * quantity).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => dispatch(removeArticleCart(item.id))}
                        className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:self-center"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-5 w-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" />
                        </svg>
                      </button>
                    </article>
                  )
                })}
              </div>

              <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Order summary
                </h3>
                <div className="mt-5 flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="mt-3 flex justify-between text-sm text-emerald-700">
                  <span>Discount ($10 per $100)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="my-5 border-t border-slate-200" />
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <label
                  htmlFor="discount-code"
                  className="mt-6 block text-sm font-medium text-slate-700"
                >
                  Discount code
                </label>
                <input
                  id="discount-code"
                  type="text"
                  placeholder="Enter your code"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                <button className='mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>Check-Out</button>
              </aside>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
