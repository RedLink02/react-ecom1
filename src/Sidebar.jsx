import { Link } from 'react-router'

function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-slate-900 p-5 text-white">
      <h2 className="mb-5 font-bold">Menu</h2>
      <nav aria-label="Navigation principale">
        <ul className="space-y-3">
          <li>
            <Link to="/" className="block hover:text-blue-200">Accueil</Link>
          </li>
          <li>
            <Link to="/cart" className="block hover:text-blue-200">Panier</Link>
          </li>
          <li>
            <Link to="/admin" className="block hover:text-blue-200">Admin</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar