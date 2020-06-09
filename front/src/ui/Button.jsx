import React from 'react'

export function Button ({loading, ...buttonProps}) {
  if (loading) {
    buttonProps.children = <>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> Chargement...
      </>
    buttonProps.disabled = true
  }

 return <button className="btn btn-primary" {...buttonProps}></button>
}
