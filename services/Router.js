const Router = {
  init: () => {
    // prevent navlink to navigate so that we can customize
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault()
        const url = event.target.getAttribute("href")
        Router.go(url)
      })
    })
    // Check the inital URL (if the user use a deep link at first)
    Router.go(location.pathname)
  },
  go: (route, addToHisotry = true) => {
    console.log(`Going to ${route}`)
    if (addToHisotry) {
      history.pushState({ route }, "", route)
    }
    let pageElement = null
    switch (route) {
      case "/":
        pageElement = document.createElement("h1")
        pageElement.textContent = "Menu"
        break
      case "/order":
        pageElement = document.createElement("h1")
        pageElement.textContent = "Your order"
        break
    }
    if (pageElement) {
      const cache = document.querySelector("main")
      cache.innerHTML = ""
      cache.appendChild(pageElement)
      window.scrollX = 0
      window.scrollY = 0
    }
  },
}

export default Router
