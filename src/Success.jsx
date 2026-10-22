import { Link, useNavigate, Navigate, useLocation } from 'react-router'
import Header from "./Header"
import Sidebar from "./Sidebar"


export default function Success(){
    const location = useLocation()
    const isFromCheckout = location.state?.fromCheckout === true

    if (!isFromCheckout){
        return <Navigate to='/cart' replace />
    }

    return (
        
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
        <main className="min-w-0 flex-1">
            <Header />
            <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
                    <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-200">
                    <span aria-hidden="true" className="text-5xl">📦</span>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                        Order placed successfully ! 
                    </h3>
                    <Link
                        to="/"
                        className="mt-6 inline-flex rounded-lg bg-blue-600 px-2 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Continue shopping
                    </Link>
                    </div>
                </section>
            </main>
        </div>
    )
}