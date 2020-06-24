import React, {useState} from 'react'
import {Button} from '../../ui/Button'
import {Field} from '../../ui/Field'
import {formToObject} from '../../utils/api'

export function IngredientRow ({ingredient, onUpdate, onDelete}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [loadingDelete, setLoadingDelete] = useState(false)

  const handleSubmit = async function (e) {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await onUpdate(ingredient, formToObject(e.target))
    } catch (e) {
      setErrors(e)
    }
    setLoading(false)
  }

  const handleDelete = async function (e) {
    e.preventDefault()
    setLoadingDelete(true)
    await onDelete(ingredient)
  }

  return <form className="d-flex align-items-start" onSubmit={handleSubmit}>
    <Field name="title" defaultValue={ingredient.title} error={errors.title}/>
    <Field name="unit" defaultValue={ingredient.unit} className="ml-2" error={errors.unit}/>
    <Button className="text-nowrap ml-2" loading={loading}>Mettre à jour</Button>
    <Button className="text-nowrap ml-2" type="danger" loading={loadingDelete} onClick={handleDelete}>Supprimer</Button>
  </form>
}
