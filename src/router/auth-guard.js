import store from '../store'

export default (to, from, next) => {
  if (to.name === 'Home' && from.name === 'Signin') {
    next()
  } else if (store.state.admin) {
    next()
  } else {
    next('/signin')
  }
}
