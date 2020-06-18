import React from 'react'

export function NavBar ({title, page, onPageChange}) {

  const navClass = function (expected) {
    let className = 'nav-item'
    if (page === expected) {
      className += ' active'
    }
    return className
  }

  return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    <a className="navbar-brand" href="#">{ title }</a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className={navClass('recipes')}>
          <a className="nav-link" href="#" onClick={() => onPageChange('recipes')}>Recettes</a>
        </li>
        <li className={navClass('ingredients')}>
          <a className="nav-link" href="#" onClick={() => onPageChange('ingredients')}>Ingrédients</a>
        </li>
      </ul>
      <button onClick={() => onPageChange('new')} className="btn btn-outline-light my-2 my-sm-0">
        Ajouter
      </button>
    </div>
  </nav>
}
