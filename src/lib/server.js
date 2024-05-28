import Pocketbase from "pocketbase";

export let pocketbase = new Pocketbase("http://127.0.0.1:8090");

try{
  pocketbase.authStore.loadFromCookie(window.localStorage.getItem("auth"));
}catch(e){
  console.log(e);
}

pocketbase.authStore.onChange((e)=>{
  window.localStorage.setItem("auth", pocketbase.authStore.exportToCookie());
  console.log(e);
});