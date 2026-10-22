import { useNavigate } from 'react-router'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import AdminOrders from './AdminOrders.jsx'
import AdminProducts from './AdminProducts.jsx'
import { ADMIN_AUTH_KEY } from './adminAuth.js'

export default function Admin() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                Manage your collection
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Admin dashboard
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(ADMIN_AUTH_KEY)
                navigate('/admin/login', { replace: true })
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Log out
            </button>
          </div>

          <AdminProducts />
          <AdminOrders />
        </section>
      </main>
    </div>
  )
}
