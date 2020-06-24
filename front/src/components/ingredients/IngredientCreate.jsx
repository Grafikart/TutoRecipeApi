import React, {useState} from 'react'
import {Button} from '../../ui/Button'
import {Field} from '../../ui/Field'
import {formToObject} from '../../utils/api'

export function IngredientCreate ({onCreate}) {

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async function (e) {
    e.preventDefault()
    const form = e.target
    setLoading(true)
    setErrors({})
    try {
      await onCreate(formToObject(e.target))
    } catch (e) {
      console.error(e)
      setErrors(e)
    }
    form.reset()
    setLoading(false)
  }

  return <form className="d-flex align-items-start" onSubmit={handleSubmit}>
    <Field name="title" error={errors.title} placeholder="Nom de l'ingrédient"/>
    <Field name="unit" className="ml-2" error={errors.unit} placeholder="Unité"/>
    <Button className="text-nowrap ml-2" loading={loading}>Créer</Button>
  </form>
}
