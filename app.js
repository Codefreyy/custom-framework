// In the original browser environment when importing JS files, we should include .js extension。
import Store from "./services/store.js"
import Router from "./services/Router.js"
import { loadData } from "./services/Menu.js"
import { MenuPage } from "./components/MenuPage.js"
import { OrderPage } from "./components/OrderPage.js"
import { DetailsPage } from "./components/DetailsPage.js"
import ProductItem from "./components/ProductItem.js"
import CartItem from "./components/CartItem.js"

window.app = {}
app.store = Store
app.router = Router

// Better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", async () => {
  app.router.init()
  loadData()
})

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge")
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0)
  badge.textContent = qty
  badge.hidden = qty === 0
})
