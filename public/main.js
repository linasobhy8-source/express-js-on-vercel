let products=[
{title:"Smart Watch Pro",asin:"B09V7Z4TJG",price:39.99,category:"wearables",image:"https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg",video:"https://www.youtube.com/embed/Bwz8Tx75YU"},
{title:"Wireless Earbuds",asin:"B08T5GJ2M7",price:29.99,category:"electronics",image:"https://m.media-amazon.com/images/I/71v9z1k4a7L._AC_SL1500_.jpg"},
{title:"Air Fryer 5L",asin:"B08CVL1SV6",price:59.99,category:"kitchen",image:"https://m.media-amazon.com/images/I/81v8b8h50EL._AC_SL1500_.jpg"},
{title:"Home LED Lamp",asin:"B08XYT4JX7",price:19.99,category:"home",image:"https://m.media-amazon.com/images/I/61HqX8pU7FL._AC_SL1500_.jpg"}
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];

function displayProducts(list){
let html="";
list.forEach(p=>{
html+=`<div class="card">
<img src="${p.image}">
<div class="card-content">
<h3>${p.title}</h3>
<p>$${p.price}</p>
</div>
${p.video?`<iframe width="100%" height="200" src="${p.video}" frameborder="0" allowfullscreen></iframe>`:""}
<button class="buy-btn" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
<button class="buy-btn" onclick='window.open("https://www.amazon.com/dp/${p.asin}?tag=koloonlinesto-20")'>🔥 Buy Now</button>
</div>`;});
document.getElementById("products").innerHTML=html;
}

function addToCart(p){
cart.push(p);
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function updateCart(){document.getElementById("cartCount").innerText=cart.length;}
function scrollToProducts(){document.getElementById("products").scrollIntoView({behavior:"smooth"});}
function smartSuggest(){
let q=document.getElementById("searchInput").value.toLowerCase();
let results=products.filter(p=>p.title.toLowerCase().includes(q));
displayProducts(results);
let sug="";
results.slice(0,5).forEach(p=>{sug+=`<div onclick="selectProduct('${p.title}')" style="padding:8px;cursor:pointer">${p.title}</div>`;});
document.getElementById("suggestions").innerHTML=sug;
}
function selectProduct(t){document.getElementById("searchInput").value=t;document.getElementById("suggestions").innerHTML="";smartSuggest();}
function filterCategory(cat){if(cat==="all"){displayProducts(products);return;}displayProducts(products.filter(p=>p.category===cat));}

displayProducts(products);
updateCart();
