import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addArticleCart } from './redux/actions/panierActions.js'


export default function Shop() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.articles.articles)
    const cartCount = useSelector(state => state.panier.items.length)
    console.log(products)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              Cart: <span className="font-bold text-blue-600">{cartCount}</span>
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map(product => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  aria-hidden="true"
                  className={`flex h-52 items-center justify-center bg-gradient-to-br ${product.imageStyle}`}
                >
                  <span className="text-8xl drop-shadow-sm">{product.emoji}</span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {product.category}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="shrink-0 font-semibold text-slate-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => dispatch(addArticleCart({ ...product, quantity: 1 }))}
                    className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
