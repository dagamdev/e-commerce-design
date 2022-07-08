//? load
const load = document.getElementById("load")
const logo = document.querySelector(".load__gif")
const intervalo  = setInterval(()=>{
   logo.classList.toggle("load_logo")
}, 900)
setTimeout(() => {
   clearInterval(intervalo)
   load.style = "display: none;"
}, 4000)


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


const body = document.querySelector("body")
const themeButton = document.getElementById("theme-button")
const cartCount = document.getElementById("cart-count")
themeButton.addEventListener("click", () => {
   themeButton.classList.toggle("bx-sun")
   body.classList.toggle("dark-theme")
})


const products = [
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
}

function clearCard(element){
   element.innerHTML = `<div class="cart__empty">
   <img src="./imgs/empty-cart.png" alt="empty cart">
   <h2>Your cart is empty</h2>
   <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product page.</p>
   </div>`
}

// let myCart = []
const cartCheckout = document.getElementById("cart-checkout")
const cartCountSpan = document.getElementById("cart-count")
const cartTotal = document.getElementById("cart-total")
const itemsCount = document.getElementById("items-count")
const cartContainer = document.querySelector(".cart__container")
const productsContent = document.querySelector(".products__content")
productsContent.addEventListener("click", (event) => {
   if(event.target.classList.contains("button") || event.target.classList.contains("bx")){
      let product = products.find(f=> f.id==event.target.dataset.id)
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
      cartCheckout.removeAttribute("disabled")
      cartCheckout.classList.add("cart__btn-active")
   }
})


cartContainer.addEventListener("click", (event) => {
   if(event.target.classList.contains("bx-plus")){
      let product = products.find(f=> f.id==event.target.dataset.id)
      if(product.stock <= product.units) return alert("No hay mas productos disponibles.")
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
         cartCheckout.setAttribute("disabled", "disabled")
         cartCheckout.classList.remove("cart__btn-active")
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
         cartCheckout.setAttribute("disabled", "disabled")
         cartCheckout.classList.remove("cart__btn-active")
      }
   }
})


const productsStock = document.querySelectorAll(".products__stock")
const productsQuantity = document.querySelectorAll("#products__quantity")
cartCheckout.addEventListener("click", () => {
   products.forEach((pr, ps) => {
      pr.stock-=pr.units
      pr.units = 0
      pr.subtotal = 0
      pr.selected = false
      productsStock[ps+1].textContent = `${pr.stock} products`
      productsQuantity[ps].textContent = `| Stock: ${pr.stock}`
   })

   insertHtml(cartContainer, products)
   clearCard(cartContainer)
   cartCheckout.setAttribute("disabled", "disabled")
   cartCheckout.classList.remove("cart__btn-active")
})


const productsLine = document.querySelectorAll(".products__line")
const productsCard = document.querySelectorAll(".products__card")
productsLine.forEach((pr, ps) => {
   pr.addEventListener("click", ()=> {
      productsLine.forEach((pr1, ps1) => {
         pr1.classList.remove("active-product")
      })
      pr.classList.add("active-product")

      productsCard.forEach((pc, psc)=> {
         if(ps==0){
            pc.removeAttribute("style")
         }else if(psc==(ps-1)){
            // pc.removeAttribute("style")
            pc.style = "transform: scale(1)"
            // pc.style = "transform: translate(0px, 0px)"
         }else{
            pc.style = "display: none"
            pc.style = "transform: scale(0)"
            // pc.style = "transform: translate(0px, 0px)"
         }
      })
   })
})