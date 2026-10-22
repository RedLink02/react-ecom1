import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import { ADMIN_AUTH_KEY, DEMO_ADMIN_CREDENTIALS } from './adminAuth.js'

const inputClassName =
  'mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true'

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  function handleLogin(event) {
    event.preventDefault()

    if (
      credentials.username === DEMO_ADMIN_CREDENTIALS.username &&
      credentials.password === DEMO_ADMIN_CREDENTIALS.password
    ) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true')
      const redirectPath = location.state?.from?.pathname
      navigate(redirectPath && redirectPath !== '/admin/login' ? redirectPath : '/admin', {
        replace: true,
      })
      return
    }

    setLoginError('Incorrect username or password.')
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-lg px-6 py-10 sm:px-8">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Restricted area
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Admin login
            </h2>
          </div>
          <form
            onSubmit={handleLogin}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
          >
            <div>
              <label htmlFor="admin-username" className="text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={credentials.username}
                onChange={event =>
                  setCredentials(current => ({ ...current, username: event.target.value }))
                }
                className={inputClassName}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="admin-password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={event =>
                  setCredentials(current => ({ ...current, password: event.target.value }))
                }
                className={inputClassName}
              />
            </div>
            {loginError && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-600">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
