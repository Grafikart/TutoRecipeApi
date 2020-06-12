import React from 'react'

export function Button ({loading, className = '', type = 'primary', ...buttonProps}) {
  if (loading) {
    buttonProps.children = <>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> Chargement...
      </>
    buttonProps.disabled = true
  }

  if (type === 'submit') {
    type = 'primary'
    buttonProps = {type: 'submit', ...buttonProps}
  }

 return <button className={`btn btn-${type} ${className}`} {...buttonProps}></button>
}
