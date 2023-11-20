export class OrderPage extends HTMLElement {
  // # - private property
  #user = {
    name: "",
    phone: "",
    email: "",
  }

  constructor() {
    super()
    this.root = this.attachShadow({ mode: "open" })
    const styles = document.createElement("style")
    this.root.appendChild(styles)
    const section = document.createElement("section")
    this.root.appendChild(section)

    async function loadCSS() {
      const request = await fetch("/components/OrderPage.css")
      styles.textContent = await request.text()
    }

    loadCSS()
  }

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render()
    })

    this.render()
  }

  render() {
    let html
    let section = this.root.querySelector("section")
    if (app.store.cart.length == 0) {
      section.innerHTML = ` <p class="empty">Your order is empty</p>`
    } else {
      html = `
      <h2>Your Order</h2>
      <ul>
      </ul> `
      section.innerHTML = html
    }

    const template = document.getElementById("order-form-template")
    const content = template.content.cloneNode(true)
    section.appendChild(content)

    let total = 0

    for (let proInCart of app.store.cart) {
      const item = document.createElement("cart-item")
      item.dataset.item = JSON.stringify(proInCart)
      this.root.querySelector("ul").appendChild(item)

      total += proInCart.quantity * proInCart.product.price
    }
    if (this.root.querySelector("ul")) {
      this.root.querySelector("ul").innerHTML += ` <li>
      <p class='total'>Total</p>
      <p class='price-total'>$${total.toFixed(2)}</p>
      </li>                
    `
    }

    this.setFormBindings(this.root.querySelector("form"))
  }

  setFormBindings(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      alert(`Thank you for your rder ${this.#user.name}.`)
      this.#user.name = ""
      this.#user.email = ""
      this.#user.phone = ""
    })

    Array.from(form.elements).forEach((ele) =>
      ele.addEventListener("change", (e) => (this.#user[ele.name] = ele.value))
    )

    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value
        form.elements[property].value = value
        return true
      },
    })
  }
}

customElements.define("order-page", OrderPage)
