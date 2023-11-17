// In the original browser environment when importing JS files, we should include .js extension。
import Store from "./services/store.js"
import { loadData } from "./services/Menu.js"

window.app = {}
app.store = Store

// Better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", async () => {
  loadData()
})

console.log(app.store)
