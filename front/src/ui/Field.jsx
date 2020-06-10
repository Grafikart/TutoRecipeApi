import React from 'react'

export function Field ({name, children, className = '', type = "text", error, ...props}) {
  const inputClass = `form-control${error ? ' is-invalid' : ''}`

  return <div className={`form-group ${className}`}>
    {children && <label htmlFor={name}>{children}</label>}
    <input type={type} name={name} className={inputClass} {...props}/>
    {error && <div className="invalid-feedback">
      {error}
    </div>}
  </div>
}
