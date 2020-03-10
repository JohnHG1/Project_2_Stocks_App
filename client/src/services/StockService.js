const baseURL = 'http://localhost:3000/api/stocks/'

export default {
  getStocks(){
    return fetch(baseURL)
    .then(res => res.json())
  },

  postStock(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-type': 'application/json'}
    })
    .then(res => res.json())
  },
  deleteStock(id) {
    return fetch(baseURL + id, {
      method: 'DELETE'
    })
  },
  updateStock(id, payload) {
    return fetch(baseURL + id, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: { 'Content-type': 'application/json'}
    })
  }
}
