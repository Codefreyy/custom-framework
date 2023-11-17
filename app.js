// In the original browser environment when importing JS files, we should include .js extension。
import Store from "./services/store.js"
import Router from "./services/Router.js"
import { loadData } from "./services/Menu.js"

window.app = {}
app.store = Store
app.router = Router

// Better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", async () => {
  loadData()
  app.router.init()
})

console.log(app.store)
