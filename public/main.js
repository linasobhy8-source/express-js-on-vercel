let products = [
  {title:"Smart Watch Pro", asin:"B09V7Z4TJG", price:39.99, category:"wearables", image:"https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg"},
  {title:"Wireless Earbuds", asin:"B08T5GJ2M7", price:29.99, category:"electronics", image:"https://m.media-amazon.com/images/I/71v9z1k4a7L._AC_SL1500_.jpg"}
];

function buildLink(asin,country="US"){
  const tags = {
    US:"koloonlinesto-20", CA:"linasobhy20d8-20", EG:"onlinesh03f31-21", PL:"koloonline-21"
  };
  return `https://www.amazon.com/dp/${asin}?tag=${tags[country] || tags.US}`;
}

function displayProducts(list){
  let html="";
  list.forEach((p,i)=>{
    html+=`<div class="card">
      <img src="${p.image}">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
      </div>
      <button class="buy-btn" onclick="window.open('${buildLink(p.asin)}','_blank')">
        🔥 Buy Now
      </button>
    </div>`;
  });
  document.getElementById("products").innerHTML=html;
}
displayProducts(products);

function smartSuggest(){
  const q=document.getElementById("searchInput").value.toLowerCase();
  const results=products.filter(p=>p.title.toLowerCase().includes(q));
  displayProducts(results);
}
