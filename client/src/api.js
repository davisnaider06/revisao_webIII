const BASE = 'http://localhost:5000/api'

export async function getItems() {
  const res = await fetch(`${BASE}/items`)
  return res.ok ? res.json() : []
}

export async function addItem(body) {
  const res = await fetch(`${BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE}/items/${id}`, { method: 'DELETE' })
  return res.json()
}

export async function updateItem(id, body) {
  const res = await fetch(`${BASE}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}
