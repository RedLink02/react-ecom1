import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import { addCheckoutAction } from './redux/actions/checkoutActions.js'
import { clearCart } from './redux/actions/panierActions.js'

export default function Checkout() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.panier.items)
  const isFromCart = location.state?.fromCart === true

  if (!isFromCart) {
    return <Navigate to="/cart" replace />
  }

  const itemCount = cartItems.reduce((count, item) => count + (item.quantity ?? 1), 0)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0,
  )
  const shipprice = subtotal * 0.1
  const discount = Math.floor(subtotal / 100) * 10
  const shipping = cartItems.length > 0 ? shipprice : 0
  const total = subtotal - discount + shipping

  function handlePlaceOrder(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    dispatch(addCheckoutAction({
      id: `ORD-02${Date.now()}`,
      placedAt: new Date().toISOString(),
      customer: {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        zip: formData.get('zip'),
      },
      items: cartItems.map(({ id, name, price, quantity, emoji }) => ({
        id,
        name,
        price,
        quantity: quantity ?? 1,
        emoji,
      })),
      itemCount,
      subtotal,
      discount,
      shipping,
      total,
    }))
    dispatch(clearCart())
    navigate('/success', { state: { fromCheckout: true } })
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Secure checkout
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Checkout
            </h2>
          </div>
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <form className="space-y-6" onSubmit={handlePlaceOrder}>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">Shipping details</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label htmlFor="full-name" className="mb-2 block text-sm font-medium text-slate-700">
                        Full name
                      </label>
                      <input
                        id="full-name"
                        name="fullName"
                        type="text"
                        defaultValue="Walid Dilaw"
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue="mail@mail.ma"
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
                        Street address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        defaultValue="address"
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        defaultValue="Hyrule"
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="mb-2 block text-sm font-medium text-slate-700">
                        ZIP code
                      </label>
                      <input
                        id="zip"
                        name="zip"
                        type="text"
                        defaultValue="20220"
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">Payment method</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label htmlFor="card-name" className="mb-2 block text-sm font-medium text-slate-700">
                        Name on card
                      </label>
                      <input
                        id="card-name"
                        type="text"
                        defaultValue="Walid Dilaw"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="card-number" className="mb-2 block text-sm font-medium text-slate-700">
                        Card number
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        defaultValue="1234 5678 9012 3456"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="expiry" className="mb-2 block text-sm font-medium text-slate-700">
                        Expiry
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        defaultValue="09/30"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="mb-2 block text-sm font-medium text-slate-700">
                        CVC
                      </label>
                      <input
                        id="cvc"
                        type="text"
                        defaultValue="123"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/cart"
                    className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Back to cart
                  </Link>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Place order
                  </button>
                </div>
              </form>

              <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Order summary</h3>

                <div className="mt-5 space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-sm text-slate-600">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800">{item.name}</p>
                        <p>Qty: {item.quantity ?? 1}</p>
                      </div>
                      <span className="font-semibold text-slate-900">
                        ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-200 pt-5">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Items</span>
                    <span>{itemCount}</span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-emerald-700">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-slate-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="mt-5 flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </aside>
            </div>
        </section>
      </main>
    </div>
  )
}
