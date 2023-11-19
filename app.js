// In the original browser environment when importing JS files, we should include .js extension。
import Store from "./services/store.js"
import Router from "./services/Router.js"
import { loadData } from "./services/Menu.js"
import { MenuPage } from "./components/MenuPage.js"
import { OrderPage } from "./components/OrderPage.js"
import { DetailsPage } from "./components/DetailsPage.js"
import ProductItem from "./components/ProductItem.js"

window.app = {}
app.store = Store
app.router = Router

// Better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", async () => {
  app.router.init()
  loadData()
})

console.log(app.store)
