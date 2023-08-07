export default function ({ store, redirect, route, $moment }) {
  console.log(store)
  const token = store.state.user.token
  const dateExpires = store.state.user.dateExpires

  if (route.path === "/" || route.path === "/register") return;

  if (!token) return redirect("/");

  if (dateExpires && $moment().isAfter(dateExpires)) return redirect("/")


}



