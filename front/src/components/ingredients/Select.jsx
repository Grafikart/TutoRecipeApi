import React from 'react'

export function Select ({ingredients, onChange, value}) {

  const handleChange = function (e) {
    onChange(ingredients[parseInt(e.target.value, 10)])
  }

  return <select className="form-control" onChange={handleChange} value={value}>
    <option>Sélectionner un ingrédient</option>
    {ingredients.map((ingredient, k) => <option key={ingredient.id} value={k}>{ingredient.title}</option>)}
  </select>
}
