import React, { useEffect, useState } from 'react'
import { getItems, addItem, deleteItem, updateItem } from './api'

export default function App() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const load = async () => {
    const data = await getItems()
    setItems(data)
  }

  useEffect(() => { load() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name) return
    await addItem({ name, quantity })
    setName('')
    setQuantity(1)
    load()
  }

  const handleDelete = async (id) => {
    await deleteItem(id)
    load()
  }

  const togglePurchased = async (item) => {
    await updateItem(item._id, { purchased: !item.purchased })
    load()
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Lista de Compras</h1>

      <form className="row g-2 mb-4" onSubmit={handleAdd}>
        <div className="col-sm-6">
          <input className="form-control" placeholder="Nome do produto" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="col-sm-2">
          <input type="number" min="1" className="form-control" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        </div>
        <div className="col-sm-2">
          <button className="btn btn-primary w-100" type="submit">Adicionar</button>
        </div>
      </form>

      <ul className="list-group">
        {items.map(item => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input className="form-check-input me-2" type="checkbox" checked={item.purchased} onChange={() => togglePurchased(item)} />
              <strong className={item.purchased ? 'text-decoration-line-through' : ''}>{item.name}</strong>
              <small className="text-muted ms-2">x{item.quantity}</small>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
