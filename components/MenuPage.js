export class MenuPage extends HTMLElement {
  constructor() {
    super()
    // if you want to outside to access your inner dom or not
    this.root = this.attachShadow({ mode: "open" })
    // this.attachShadow({ mode: "open" })

    const styles = document.createElement("style")
    this.root.appendChild(styles)

    const loadCSS = async () => {
      const request = await fetch("/components/MenuPage.css")
      // convert it into text to put into textContent
      const css = await request.text()
      styles.textContent = css
    }
    loadCSS()
  }

  // connectCallback is a lifecycle method, it is runned when element was insert into the document tree
  connectedCallback() {
    const template = document.getElementById("menu-page-template")
    // template的内容在页面加载时不会被渲染 可以通过克隆或复制实例化 e.g. content.cloneNode(true) clone all the child elements and text Nodes
    const content = template.content.cloneNode(true)
    // this指向
    this.root.appendChild(content)
    // this.shadowRoot.appendChild(content)
    window.addEventListener("appmenuchange", () => {
      this.render()
    })
    this.render()
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = ""
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li")
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class='category'>
          </ul>
        `
        this.root.querySelector("#menu").appendChild(liCategory)
        category.products.forEach((product) => {
          const item = document.createElement("product-item")
          item.dataset.product = JSON.stringify(product)
          liCategory.querySelector("ul").appendChild(item)
        })
      }
    } else {
      this.root.querySelector("#menu").innerHTML = `<h2>Loading...</h2>`
    }
  }
}

// when there is a <menu-page> </menu-page> in HTML, browser will create a instance of MenuPage and insert it into the document
customElements.define("menu-page", MenuPage)
