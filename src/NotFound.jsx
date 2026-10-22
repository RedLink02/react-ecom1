import { Link } from 'react-router'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

export default function NotFound() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Error 404
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Page not found
          </h2>
          <p className="mt-4 max-w-lg text-slate-600">
            :(
          </p>
          <Link
            to="/"
            className="mt-8 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Back to shop
          </Link>
        </section>
      </main>
    </div>
  )
}
