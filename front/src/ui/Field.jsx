import React from 'react'

export function Field ({name, children, className = '', type = "text", error, ...props}) {
  const inputClass = `form-control${error ? ' is-invalid' : ''}`
  let input = null
  if (type === 'textarea') {
    input = <textarea name={name} className={inputClass} {...props}/>
  } else {
    input = <input type={type} name={name} className={inputClass} {...props}/>
  }

  return <div className={`form-group ${className}`}>
    {children && <label htmlFor={name}>{children}</label>}
    {input}
    {error && <div className="invalid-feedback">
      {error}
    </div>}
  </div>
}
