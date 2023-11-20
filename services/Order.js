import { getProductById } from "./Menu.js"

export function placeOrder() {
  // actucally need to use api
  alert(
    "Your order will be ready under the number " + parseInt(Math.random() * 100)
  )
  app.store.menu = []
}

export async function addToCard(id) {
  const product = await getProductById(id)
  const result = app.store.cart.filter(
    (prodInCart) => prodInCart.product.id == id
  )
  // the product already in the cart
  if (result.length == 1) {
    // we should assign a new array to the cart so that it's (the address) really changed, can others can listen to the change through appcartchange event
    app.store.cart = app.store.cart.map((i) =>
      i.prodduct.id == id ? { ...i, quantity: i.quantity + 1 } : i
    )
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }]
  }
}

export async function removeFromCart(id) {
  console.log(app.store.cart)
  app.store.cart = app.store.cart.filter((product) => {
    debugger
    return product.product.id != id
  })
  console.log(app.store.cart)
}
