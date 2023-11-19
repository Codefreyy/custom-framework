const Store = {
  menu: null,
  cart: [],
}

const proxyStore = new Proxy(Store, {
  set(target, prop, value) {
    target[prop] = value
    if (prop == "menu") {
      window.dispatchEvent(new Event("appmenuchange"))
    }

    if ((prop = "cart")) {
      window.dispatchEvent(new Event("appcartchange"))
    }
    return true
  },
  get(target, prop) {
    return target[prop]
  },
})
export default proxyStore
