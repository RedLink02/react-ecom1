import { Link } from 'react-router'

export default function CardItem({
  product,
  linkTo,
  primaryLabel,
  onPrimaryAction,
  secondaryLabel,
  onSecondaryAction,
  primaryClassName = 'mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
  secondaryClassName = 'mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
}) {
  const itemPrice = typeof product.price === 'number'
    ? product.price
    : Number(product.price || 0)

  return (
    <article
      className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
    >
      {linkTo && (
        <Link
          to={linkTo}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        />
      )}
      <div className="pointer-events-none relative z-10">
        <div
          aria-hidden="true"
          className={`flex h-52 items-center justify-center bg-gradient-to-br ${product.imageStyle || 'from-sky-100 to-blue-200'}`}
        >
          <span className="text-8xl drop-shadow-sm">{product.emoji || '🛍️'}</span>
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
              ${itemPrice.toFixed(2)}
            </p>
          </div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
            {product.description}
          </p>

          {primaryLabel && onPrimaryAction && (
            <button
              type="button"
              onClick={onPrimaryAction}
              className={`${primaryClassName} pointer-events-auto`}
            >
              {primaryLabel}
            </button>
          )}

          {secondaryLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className={`${secondaryClassName} pointer-events-auto`}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
