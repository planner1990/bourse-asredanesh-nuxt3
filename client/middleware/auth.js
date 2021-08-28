export default function ({ store, route, redirect }) {
  store.dispatch('user/init');
  const islogin = store.getters['user/isLogin']
  console.log(islogin)
  if (!islogin) {
    return redirect('/login')
  } else if (route.fullPath === '/login' && !!islogin) {
    return redirect('/')
  }
}
