import React from 'react'
import {Button} from '../../ui/Button'
import {Field} from '../../ui/Field'
import {useApiFetch} from '../../hooks/api'
import {formToJson} from '../../utils/api'

export function IngredientRow ({ingredient, onUpdate, onDelete}) {

  const {loading, errors, doFetch: fetchUpdate} = useApiFetch()
  const {loading: loadingDelete, doFetch: fetchDelete} = useApiFetch()
  const endpoint = `/ingredients/${ingredient.id}`

  const handleSubmit = async function (e) {
    e.preventDefault()
    const newIngredient = await fetchUpdate(endpoint, {
      method: 'put',
      body: formToJson(e.target)
    })
    if (newIngredient) {
      onUpdate(ingredient, newIngredient)
    }
  }

  const handleDelete = async function (e) {
    e.preventDefault()
    await fetchDelete(endpoint, {
      method: 'delete'
    })
    onDelete(ingredient)
  }

  return <form className="d-flex align-items-start" onSubmit={handleSubmit}>
    <Field name="title" defaultValue={ingredient.title} error={errors.title}/>
    <Field name="unit" defaultValue={ingredient.unit} className="ml-2" error={errors.unit}/>
    <Button className="text-nowrap ml-2" loading={loading}>Mettre à jour</Button>
    <Button className="text-nowrap ml-2" type="danger" loading={loadingDelete} onClick={handleDelete}>Supprimer</Button>
  </form>
}
