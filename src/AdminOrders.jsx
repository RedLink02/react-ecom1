import { useDispatch, useSelector } from 'react-redux'
import { updateCheckoutStatusAction } from './redux/actions/checkoutActions.js'

const orderStatuses = ['not confirmed', 'confirmed', 'shipped', 'delivered']
const statusClassNames = {
  'not confirmed': 'border-amber-200 bg-amber-50 text-amber-800 focus:border-amber-400 focus:ring-amber-100',
  confirmed: 'border-blue-200 bg-blue-50 text-blue-800 focus:border-blue-400 focus:ring-blue-100',
  shipped: 'border-violet-200 bg-violet-50 text-violet-800 focus:border-violet-400 focus:ring-violet-100',
  delivered: 'border-emerald-200 bg-emerald-50 text-emerald-800 focus:border-emerald-400 focus:ring-emerald-100',
}

export default function AdminOrders() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.checkout.checkouts)

  return (
    <>
      <div className="mb-5 mt-10 flex items-end justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-900">Orders</h3>
        <p className="text-sm text-slate-600">{orders.length} orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl bg-white px-6 py-12 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
          No orders have been placed yet.
        </div>
      ) : (
        <div className="space-y-4">
          {[...orders].reverse().map(order => (
            <article
              key={order.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <h4 className="font-bold text-slate-900">{order.id}</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    {new Date(order.placedAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-lg font-bold text-slate-900">
                  ${order.total.toFixed(2)}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label
                  htmlFor={`order-status-${order.id}`}
                  className="text-sm font-semibold text-slate-700"
                >
                  Order status
                </label>
                <select
                  id={`order-status-${order.id}`}
                  value={order.status ?? 'not confirmed'}
                  onChange={event => dispatch(
                    updateCheckoutStatusAction(order.id, event.target.value),
                  )}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold shadow-sm outline-none focus:ring-4 ${
                    statusClassNames[order.status] ?? statusClassNames['not confirmed']
                  }`}
                >
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-5 py-4 sm:grid-cols-2">
                <div>
                  <h5 className="text-sm font-semibold text-slate-900">Customer</h5>
                  <p className="mt-1 text-sm text-slate-700">{order.customer.fullName}</p>
                  <p className="text-sm text-slate-600">{order.customer.email}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    {order.customer.address}, {order.customer.city} {order.customer.zip}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-900">
                    Items ({order.itemCount})
                  </h5>
                  <ul className="mt-1 space-y-1">
                    {order.items.map(item => (
                      <li key={item.id} className="text-sm text-slate-600">
                        {item.name} x {item.quantity} — $
                        {(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
                <span>Subtotal: ${order.subtotal.toFixed(2)}</span>
                <span>Discount: -${order.discount.toFixed(2)}</span>
                <span>Shipping: ${order.shipping.toFixed(2)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
