export default function ({ store, redirect, route, $moment }) {
 
  const token = store.state.user.token
  const dateExpires = store.state.user.dateExpires

  
  if (route.path === "/" || route.path === "/register" || route.path === "/forgetpassword") return;
  if(route.path==="/newpassword" && route.query.key) return;
  if (route.path === "/newpassword" && (route.query.key === null || route.query.key === undefined || route.query.key === "")) return redirect("/")

  if (!token) return redirect("/");
  if(token){
    const permission =store.state.user.user.permission;
    
    if(permission !==0 && route.path==="/adminRegister") return redirect("/listaproduto")
  if(permission ===2 && (route.path==="/movimentacao" || route.path==="/produtoregistro")) return redirect("/listaproduto")
  }
  

  if (dateExpires && $moment().isAfter(dateExpires)) return redirect("/")


}



