//? load
const load = document.getElementById("load")
const logo = document.querySelector(".load__gif")
const intervalo  = setInterval(()=>{
   logo.classList.toggle("load_logo")
}, 900)
setTimeout(() => {
   clearInterval(intervalo)
   load.style = "display: none;"
}, 5400)


const header = document.getElementById("header")
document.addEventListener("scroll", (event) => {
   header.classList.toggle("scroll-header", window.scrollY>100)
})

const navShop = document.getElementById("cart-shop")
const cart = document.getElementById("cart")
const cardClose = document.getElementById("cart-close")
navShop.addEventListener("click", (e) => {
   cart.classList.toggle("open")
})
cardClose.addEventListener("click", (e) => {
   cart.classList.toggle("open")
})

const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navClose = document.getElementById("nav-close")
navToggle.addEventListener("click", (e) => {
   navMenu.classList.toggle("open_nav")
   navShop.classList.toggle("open_nav-shop")
})
navClose.addEventListener("click", (e) => {
   navMenu.classList.toggle("open_nav")
   navShop.classList.toggle("open_nav-shop")
})

const navListLi = document.querySelectorAll(".nav__list li a")
navListLi.forEach(li=> li.addEventListener("click", ()=> navMenu.classList.toggle("open_nav")))


const control = localStorage.getItem("darkTeme") || false
const body = document.querySelector("body")
const themeButton = document.getElementById("theme-button")
const cartCount = document.getElementById("cart-count")

if(JSON.parse(control)){
   themeButton.classList.add("bx-sun")
   body.classList.add("dark-theme")
}
themeButton.addEventListener("click", () => {
   JSON.parse(control) ? localStorage.setItem("darkTeme", JSON.stringify(false)) : localStorage.setItem("darkTeme", JSON.stringify(true))
   themeButton.classList.toggle("bx-sun")
   body.classList.toggle("dark-theme")
})


const data = [
   {
      id: 1,
      stock: 10,
      title: "Hoodies",
      price: 14.00,
      subtotal: 0,
      img: "./imgs/featured1.png",
      units: 0,
      selected: false,
      position: 0
   },
   {
      id: 2,
      stock: 15,
      title: "Shirts",
      price: 24.00,
      subtotal: 0,
      img: "./imgs/featured2.png",
      units: 0,
      selected: false,
      position: 0
   },
   {
      id: 3,
      stock: 20,
      title: "Sweatshirts",
      price: 24.00,
      subtotal: 0,
      img: "./imgs/featured3.png",
      units: 0,
      selected: false,
      position: 0
   },
]

let products = []
if(localStorage.getItem("products")){
   products = JSON.parse(localStorage.getItem("products"))
}else{
   products = data
   localStorage.setItem("products", JSON.stringify(data))
}


function insertHtml(element, array){
   let cantidadItems = 0
   products.filter(f=> f.selected).forEach(f=> cantidadItems+=f.units)
   itemsCount.textContent = cantidadItems
   cartCountSpan.innerHTML = `<span>${cantidadItems}</span>`
   let totalAmount = 0
   products.filter(f=> f.selected).forEach((pr)=> totalAmount+=(pr.price*pr.units))
   cartTotal.textContent = totalAmount.toFixed(2)

   element.innerHTML = array.filter(f=> f.selected).sort((a,b)=> a.position - b.position).map(m=> `
   <article class="cart__card">
      <div class="cart__box">
         <img src="${m.img}" alt="${m.title}" class="cart__img">
      </div>
   
      <div class="cart__details">
         <h3 class="cart__title">${m.title}</h3>
         <span class="cart__stock">Stock: ${m.stock} | <span class="cart__price">$${m.price}.00</span></span>
         <span class="cart__subtotal">
            Subtotal: $${m.subtotal.toFixed(2)}
         </span>
   
         <div class="cart__amount">
            <div class="cart__amount-content">
               <span class="cart__amount-box minus">
                  <i class="bx bx-minus" data-id="${m.id}"></i>
               </span>
      
               <span class="cart__amount-number">${m.units} units</span>
      
               <span class="cart__amount-box plus">
                  <i class="bx bx-plus" data-id="${m.id}"></i>
               </span>
            </div>
      
            <i class="bx bx-trash-alt cart__amount-trash" data-id="${m.id}"></i>
         </div>
      </div>
   </article>`).join("")
   localStorage.setItem("products", JSON.stringify(products))
}

function clearCard(element){
   element.innerHTML = `<div class="cart__empty">
   <img src="./imgs/empty-cart.png" alt="empty cart">
   <h2>Your cart is empty</h2>
   <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product page.</p>
   </div>`
}

function cartCheckoutButton(element){
   if(products.some(s=> s.selected)){
      element.removeAttribute("disabled")
      element.classList.add("cart__btn-active")
   }else{
      element.setAttribute("disabled", "disabled")
      element.classList.toggle("cart__btn-active")
   }
}

const cartCheckout = document.getElementById("cart-checkout")
const cartCountSpan = document.getElementById("cart-count")
const cartTotal = document.getElementById("cart-total")
const itemsCount = document.getElementById("items-count")
const cartContainer = document.querySelector(".cart__container")
const productsContent = document.querySelector(".products__content")
const productsStock = document.querySelectorAll(".products__stock")
const productsQuantity = document.querySelectorAll("#products__quantity")
if(products.some(s=> s.selected)){
   insertHtml(cartContainer, products)
   cartCheckoutButton(cartCheckout)
}
products.forEach((pr, ps) => {
   productsStock[ps+1].textContent = `${pr.stock} products`
   productsQuantity[ps].textContent = `| Stock: ${pr.stock}`
})
console.log("hola")
productsContent.addEventListener("click", (event) => {
   if(event.target.classList.contains("button") || event.target.classList.contains("bx")){
      let product = products.find(f=> f.id==event.target.dataset.id)
      if(product.stock <= product.units) return alert("😥 No hay mas productos disponibles.")
      if(product.selected){
         product.units++
         product.subtotal+=product.price
      }else{
         product.units++
         product.subtotal+=product.price
         product.selected = true
         products.some(s=> s.selected) ? product.position = products.filter(f=> f.selected).sort((a,b)=> b.position - a.position)[0].position+1 : null
      }

      insertHtml(cartContainer, products)
      cartCheckoutButton(cartCheckout)
   }
})


cartContainer.addEventListener("click", (event) => {
   if(event.target.classList.contains("bx-plus")){
      let product = products.find(f=> f.id==event.target.dataset.id)
      if(product.stock <= product.units) return alert("😥 No hay mas productos disponibles.")
      product.units++
      product.subtotal+=product.price

      insertHtml(cartContainer, products)
   }

   if(event.target.classList.contains("bx-minus")){
      let product = products.find(f=> f.id==event.target.dataset.id)
      if(product.units == 1) product.selected = false
      product.units--
      product.subtotal-=product.price
      
      insertHtml(cartContainer, products)
      if(!products.some(s=> s.selected)) {
         clearCard(cartContainer)
         cartCheckoutButton(cartCheckout)
      }
   }

   if(event.target.classList.contains("bx-trash-alt")){
      let product = products.find(f=> f.id==event.target.dataset.id)
      product.units = 0
      product.subtotal = 0
      product.selected = false

      insertHtml(cartContainer, products)
      if(!products.some(s=> s.selected)) {
         clearCard(cartContainer)
         cartCheckoutButton(cartCheckout)
      }
   }
})


cartCheckout.addEventListener("click", () => {
   products.forEach((pr, ps) => {
      pr.stock-=pr.units
      pr.units = 0
      pr.subtotal = 0
      pr.selected = false
      pr.position = 0
      productsStock[ps+1].textContent = `${pr.stock} products`
      productsQuantity[ps].textContent = `| Stock: ${pr.stock}`
   })

   insertHtml(cartContainer, products)
   clearCard(cartContainer)
   cartCheckoutButton(cartCheckout)
})


const productsLine = document.querySelectorAll(".products__line")
// const productsCard = document.querySelectorAll(".products__card")
productsLine.forEach((pr, ps) => {
   pr.addEventListener("click", ()=> {
      productsLine.forEach((pr1, ps1) => {
         pr1.classList.remove("active-product")
      })
      pr.classList.add("active-product")
   })
})

mixitup(".products__content", {
   selectors: {
     target: ".products__card"
   },
   animation: {
     duration: 400
   }
})