const productsContainer = document.getElementById('products-container');
const reviewsContainer = document.getElementById('reviews-container');

const products = [
  {
    id: 1,
    title: "Smart Watch Pro",
    image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg",
    base_link: "https://www.amazon.com/dp/B09V7Z4TJG",
    tags: { US:"koloonlinesto-20", CA:"linasobhy20d8-20", EG:"onlinesh03f31-21", PL:"koloonline-21" }
  },
  {
    id: 2,
    title: "Wireless Earbuds",
    image: "https://m.media-amazon.com/images/I/71v9z1k4a7L._AC_SL1500_.jpg",
    base_link: "https://www.amazon.com/dp/B08T5GJ2M7",
    tags: { US:"koloonlinesto-20", CA:"linasobhy20d8-20", EG:"onlinesh03f31-21", PL:"koloonline-21" }
  }
];

// Load products dynamically
products.forEach(p => {
  const country = 'US'; // can detect dynamically
  const affiliateLink = `${p.base_link}?tag=${p.tags[country]}`;
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${p.image}" alt="${p.title}">
    <h3>${p.title}</h3>
    <button onclick="window.open('${affiliateLink}','_blank')">Buy Now</button>
  `;
  productsContainer.appendChild(card);
});

// Sample Reviews
const reviews = [
  { name:"Alice", text:"Great product! Fast shipping.", image:"https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg" },
  { name:"Bob", text:"Excellent quality.", image:"https://m.media-amazon.com/images/I/71v9z1k4a7L._AC_SL1500_.jpg" }
];
reviews.forEach(r => {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `<img src="${r.image}" alt="${r.name}"><h3>${r.name}</h3><p>${r.text}</p>`;
  reviewsContainer.appendChild(div);
});
