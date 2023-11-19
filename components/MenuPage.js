export class MenuPage extends HTMLElement {
  constructor() {
    super()
    // if you want to outside to access your inner dom or not
    // this.root = this.attachShadow({ mode: "open" })
    this.attachShadow({ mode: "open" })
  }

  // connectCallback is a lifecycle method, it is runned when element was insert into the document tree
  connectedCallback() {
    const template = document.getElementById("menu-page-template")
    const content = template.content.cloneNode(true)
    // this指向
    // this.root.appendChild(content)
    this.shadowRoot.appendChild(content)
  }
}

// when there is a <menu-page> </menu-page> in HTML, browser will create a instance of MenuPage and insert it into the document
customElements.define("menu-page", MenuPage)
