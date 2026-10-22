import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import {
  addArticleAction,
  deleteArticleAction,
  updateArticleAction,
} from './redux/actions/articleActions.js'
import { ADMIN_AUTH_KEY } from './adminAuth.js'

const initialForm = {
  name: '',
  category: '',
  description: '',
  price: '',
  emoji: '',
}

const inputClassName =
  'mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'

export default function Admin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(state => state.articles.articles)
  const [form, setForm] = useState(initialForm)
  const [modalMode, setModalMode] = useState(null)
  const [editingProductId, setEditingProductId] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    const name = form.name.trim()
    const category = form.category.trim()
    const description = form.description.trim()
    const price = Number(form.price)

    if (!name || !category || !description || !Number.isFinite(price) || price < 0) {
      return
    }

    if (modalMode === 'edit') {
      const existingProduct = products.find(product => product.id === editingProductId)
      if (!existingProduct) return

      dispatch(updateArticleAction({
        ...existingProduct,
        name,
        category,
        description,
        price,
        emoji: form.emoji.trim() || '🛍️',
      }))
    } else {
      const nextId = products.reduce(
        (largestId, product) => Math.max(largestId, Number(product.id) || 0),
        0,
      ) + 1

      dispatch(addArticleAction({
        id: nextId,
        name,
        category,
        description,
        price,
        emoji: form.emoji.trim() || '🛍️',
        imageStyle: 'from-sky-100 to-blue-200',
      }))
    }

    setForm(initialForm)
    setEditingProductId(null)
    setModalMode(null)
  }

  function openEditModal(product) {
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: String(product.price),
      emoji: product.emoji || '',
    })
    setEditingProductId(product.id)
    setModalMode('edit')
  }

  function closeModal() {
    setForm(initialForm)
    setEditingProductId(null)
    setModalMode(null)
  }

  function handleRemoveProduct() {
    if (editingProductId === null) return

    dispatch(deleteArticleAction(editingProductId))
    closeModal()
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm(currentForm => ({ ...currentForm, [name]: value }))
  }

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
                Admin products
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm)
                  setEditingProductId(null)
                  setModalMode('add')
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Add item
              </button>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem(ADMIN_AUTH_KEY)
                  navigate('/admin/login', { replace: true })
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Log out
              </button>
            </div>
          </div>

          {modalMode && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
              role="presentation"
              onMouseDown={event => {
                if (event.target === event.currentTarget) {
                  closeModal()
                }
              }}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-modal-title"
                className="my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-8"
              >
                <h3
                  id="product-modal-title"
                  className="mb-6 text-xl font-bold text-slate-900"
                >
                  {modalMode === 'edit' ? 'Modify item' : 'Add a new item'}
                </h3>
                <form id="add-product-form" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="product-name" className="text-sm font-medium text-slate-700">
                        Product name
                      </label>
                      <input
                        id="product-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        maxLength={80}
                        placeholder="Product name"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="product-category" className="text-sm font-medium text-slate-700">
                        Category
                      </label>
                      <input
                        id="product-category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        maxLength={40}
                        placeholder="Product category"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="product-price" className="text-sm font-medium text-slate-700">
                        Price
                      </label>
                      <input
                        id="product-price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        required
                        placeholder="0.00"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="product-emoji" className="text-sm font-medium text-slate-700">
                        Product icon (optional)
                      </label>
                      <input
                        id="product-emoji"
                        name="emoji"
                        value={form.emoji}
                        onChange={handleChange}
                        maxLength={8}
                        placeholder="🛍️"
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="product-description" className="text-sm font-medium text-slate-700">
                        Description
                      </label>
                      <textarea
                        id="product-description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        maxLength={240}
                        rows={3}
                        placeholder="Describe the item"
                        className={`${inputClassName} resize-y`}
                      />
                    </div>
                  </div>
                </form>
                  <div className="mt-6 flex justify-end gap-3">
                    {modalMode === 'edit' && (
                      <button
                        type="button"
                        onClick={handleRemoveProduct}
                        className="mr-auto rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      >
                        Remove item
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="add-product-form"
                      className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      {modalMode === 'edit' ? 'Save changes' : 'Add item'}
                    </button>
                  </div>
                </section>
              </div>
          )}

          <div className="mb-5 flex items-end justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900">Product list</h3>
            <p className="text-sm text-slate-600">{products.length} items</p>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
              No products yet. Select “Add item” to create your first product.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map(product => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    aria-hidden="true"
                    className={`flex h-40 items-center justify-center bg-gradient-to-br ${product.imageStyle || 'from-sky-100 to-blue-200'}`}
                  >
                    <span className="text-7xl drop-shadow-sm">
                      {product.emoji || '🛍️'}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {product.category}
                    </p>
                    <div className="mt-2 flex items-start justify-between gap-3">
                      <h4 className="text-lg font-bold text-slate-900">
                        {product.name}
                      </h4>
                      <p className="shrink-0 font-semibold text-slate-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                      {product.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => openEditModal(product)}
                      className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Manage item
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
