const Router = {
  init: () => {
    // prevent navlink to navigate so that we can customize
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault()
        const url = event.target.getAttribute("href")
        /**
         * Router.go() is used to navigate to specific route
         */
        Router.go(url)
      })
    })
    // Event handler for url changes (such as the use click baco or forward arrow)
    // window.addEventListener("popstate", (event) => {
    //   console.log("state", event.state)
    //   Router.go(event.state.route, false)
    // })
    // Check the inital URL (if the user use a deep link at first)
    Router.go(location.pathname)
  },
  go: (route, addToHisotry = true) => {
    console.log(`Going to ${route}`)
    if (addToHisotry) {
      /**
       * history.pushState() is used to add new state to browser history
       * and change current url
       */
      history.pushState({ route }, "", route)
    }
    let pageElement = null
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page")
        break
      case "/order":
        pageElement = document.createElement("order-page")
        break
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page")
          const paramId = route.substring(route.lastIndexOf("-") + 1) // substring [a,b)
          pageElement.dataset.id = paramId
        }
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
