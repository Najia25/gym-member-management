import store from '../store'

export default (to, from, next) => {
  if (store.state.user) {
    next()
  } else {
    store.state.adminExist.then(() => {
      if (store.state.adminExist === 0) {
        next('/signup')
      } else {
        next('/signin')
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
