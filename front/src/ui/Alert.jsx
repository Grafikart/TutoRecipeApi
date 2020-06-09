import React from 'react'

export function Alert ({children, type}) {
  return <div className={"alert alert-" + type}>{children}</div>
}

export function AlertErrors ({errors}) {
  if (errors.length === 0) {
    return null
  }
  return <Alert type="danger">{errors}</Alert>
}
