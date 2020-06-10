import React from 'react'
import {Button} from '../../ui/Button'
import {Field} from '../../ui/Field'
import {useApiFetch} from '../../hooks/api'
import {formToJson} from '../../utils/api'

export function IngredientCreate ({onCreate}) {

  const {loading, errors, doFetch: fetchCreate} = useApiFetch()

  const handleSubmit = async function (e) {
    e.preventDefault()
    const form = e.target
    try {
      const ingredient = await fetchCreate('/ingredients', {
        method: 'post',
        body: formToJson(e.target)
      })
      onCreate(ingredient)
      form.reset()
      form.querySelector('input').focus()
    } catch (e) {
      console.error(e)
    }
  }

  return <form className="d-flex align-items-start" onSubmit={handleSubmit}>
    <Field name="title" error={errors.title} placeholder="Nom de l'ingrédient"/>
    <Field name="unit" className="ml-2" error={errors.unit} placeholder="Unité"/>
    <Button className="text-nowrap ml-2" loading={loading}>Créer</Button>
  </form>
}
