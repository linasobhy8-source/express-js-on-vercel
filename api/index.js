// pages/index.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?country=US")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <>
      <Head>
        <title>Koloonline Store | Best Amazon Deals 2026</title>
        <meta name="description" content="Best Amazon deals, smart watches, gadgets and trending products." />
        <meta property="og:title" content="Koloonline Store 2026" />
        <meta property="og:description" content="Discover the best products from Amazon with affiliate links." />
        <meta property="og:image" content="https://i.postimg.cc/9fVfC1Y4/1000276862.png" />
        <meta property="og:url" content="https://www.koloonline.online" />
        <meta property="og:site_name" content="Koloonline Store" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Koloonline Store 2026" />
        <meta name="twitter:description" content="Best Amazon deals, gadgets, and smart watches with affiliate tracking." />
        <meta name="twitter:image" content="https://i.postimg.cc/9fVfC1Y4/1000276862.png" />
      </Head>

      <header style={{background:"#232f3e", padding:"15px", textAlign:"center"}}>
        <img src="https://i.postimg.cc/9fVfC1Y4/1000276862.png" alt="Koloonline Logo" style={{height:"70px"}}/>
      </header>

      <main style={{maxWidth:"1200px", margin:"20px auto", padding:"0 15px"}}>
        <h1 style={{textAlign:"center", marginBottom:"30px"}}>🔥 Top Amazon Products 2026</h1>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"20px"}}>
          {products.map(p => (
            <div key={p.id} style={{border:"1px solid #ddd", borderRadius:"10px", overflow:"hidden", padding:"10px"}}>
              <img src={p.image} alt={p.title} style={{width:"100%", height:"200px", objectFit:"cover"}} />
              <h3>{p.title}</h3>
              <p>⭐ {p.rating} | {p.reviews} Reviews</p>
              <p style={{fontWeight:"bold"}}>{p.price}</p>
              <button 
                onClick={()=> window.open(p.affiliate_link,"_blank")}
                style={{
                  background:"#ff9900",
                  color:"#fff",
                  padding:"10px 15px",
                  border:"none",
                  borderRadius:"5px",
                  cursor:"pointer",
                  display:"flex",
                  alignItems:"center",
                  gap:"5px"
                }}
              >
                <img src="https://i.postimg.cc/9fVfC1Y4/1000276862.png" style={{height:"20px"}}/>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
