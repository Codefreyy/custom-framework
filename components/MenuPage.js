export class MenuPage extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const template = document.getElementById("menu-page-template")
    const content = template.content.cloneNode(true)
    // this指向
    this.appendChild(content)
  }
}

// when there is a <menu-page> </menu-page> in HTML, browser will create a instance of MenuPage and insert it into the document
customElements.define("menu-page", MenuPage)
