let allProducts=[], country="us";

// Load products
async function loadProducts(){
  const res = await fetch(`/api/products?country=${country}`);
  allProducts = await res.json();
  displaySlider(allProducts.slice(0,5));
  displayProducts(allProducts);
}

// Display main products
function displayProducts(products){
  const container = document.getElementById("products");
  if(!container) return;
  container.innerHTML = products.map(p=>`
    <div class="card">
      <img src="${p.image}" alt="${p.title}">
      <div class="card-content">
        <h3>${p.title}</h3>
        <div class="rating">⭐ ${p.rating}</div>
        <p>${p.price}</p>
      </div>
      <button class="buy-btn" onclick="buyNow('${p.affiliate_link}','${p.title}','${p.price}')">🔥 Order Now</button>
    </div>`).join('');
}

// Display slider
function displaySlider(products){
  const slider = document.getElementById("featuredProducts");
  if(!slider) return;
  slider.innerHTML = products.map(p=>`
    <div class="card" style="min-width:250px;">
      <img src="${p.image}" alt="${p.title}">
      <div class="card-content"><h3>${p.title}</h3><p>${p.price}</p></div>
      <button class="buy-btn" onclick="buyNow('${p.affiliate_link}','${p.title}','${p.price}')">🔥 Order Now</button>
    </div>`).join('');
}

// Live search
function liveSearch(){
  const q = document.getElementById("searchInput").value.toLowerCase();
  displayProducts(allProducts.filter(p=>p.title.toLowerCase().includes(q)));
}

// Filter category
function filterCategory(cat){
  if(cat==="all") displayProducts(allProducts);
  else displayProducts(allProducts.filter(p=>p.category===cat));
}

// View cart
function viewCart(){alert("Cart is empty!");}

// Buy now -> Checkout
function buyNow(link,title,price){
  localStorage.setItem("product_link",link);
  localStorage.setItem("product_title",title);
  localStorage.setItem("product_price",price);
  fbq('track','InitiateCheckout'); gtag('event','begin_checkout');
  window.location.href="checkout.html";
}

// Submit order (Checkout)
function submitOrder(){
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const address=document.getElementById("address").value;
  const product_title=localStorage.getItem("product_title");
  const product_price=localStorage.getItem("product_price");
  const product_link=localStorage.getItem("product_link");
  if(!name||!email||!address){alert("Please fill all fields"); return;}
  fetch('/api/order',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({product:{title:product_title,price:product_price,link:product_link},user:{name,email,address}})
  }).then(res=>res.json()).then(d=>{
    if(d.success) window.location.href="thankyou.html";
  });
}

// Dashboard stats
async function loadDashboard(){
  const res = await fetch('/api/orders');
  const orders = await res.json();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((a,o)=>a+parseFloat(o.product.price.replace('$','')),0);
