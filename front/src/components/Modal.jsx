import React, {useEffect} from 'react'
import {createPortal} from 'react-dom'

export function Modal ({onClose, children, title}) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return function () {
      document.body.classList.remove('modal-open')
    }
  })
  return createPortal(<>
    <div className="modal fade show" id="modal" tabIndex="-1" role="dialog" style={{display: 'block'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            {title && <h5 className="modal-title h4" id="modalLabel">{title}</h5>}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
  </>, document.body)
}
