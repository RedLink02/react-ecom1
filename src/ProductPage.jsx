import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import { addArticleCart } from './redux/actions/panierActions.js'

export default function ProductPage() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(state =>
    state.articles.articles.find(article => String(article.id) === productId),
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
          <Link
            to="/"
            className="mb-6 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Back to shop
          </Link>
          {!product ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Product not found</h2>
              <p className="mt-2 text-sm text-slate-600">
                This product may have been removed.
              </p>
            </div>
          ) : (
            <article className="grid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 md:grid-cols-2">
              <div
                aria-hidden="true"
                className={`flex min-h-72 items-center justify-center bg-gradient-to-br ${product.imageStyle || 'from-sky-100 to-blue-200'}`}
              >
                <span className="text-9xl drop-shadow-sm">{product.emoji || '🛍️'}</span>
              </div>
              <div className="flex flex-col items-start p-6 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  {product.category}
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {product.name}
                </h1>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {product.description}
                </p>
                <p className="mt-6 text-2xl font-bold text-slate-900">
                  ${Number(product.price).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(addArticleCart({ ...product, quantity: 1 }))}
                  className="mt-8 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Add to cart
                </button>
              </div>
            </article>
          )}
        </section>
      </main>
    </div>
  )
}