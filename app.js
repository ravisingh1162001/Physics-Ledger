async function loadJSON(path){try{const res=await fetch(path);return await res.json()}catch(e){console.error('Failed to load',path,e);return null}}

function renderUpdates(updates){const container=document.getElementById('updates-list');if(!updates||updates.length===0){container.innerHTML='<p class="muted">No updates yet.</p>';return}
  container.innerHTML='';updates.forEach(u=>{const el=document.createElement('article');el.className='card';el.innerHTML=`<h4>${u.title}</h4><p class="muted">${u.date} • ${u.category}</p><p>${u.excerpt}</p><a href="${u.url||'#'}" class="muted">Read more →</a>`;container.appendChild(el)})}

function renderProducts(products){const container=document.getElementById('products-list');if(!products||products.length===0){container.innerHTML='<p class="muted">No products listed.</p>';return}
  container.innerHTML='';products.forEach(p=>{const el=document.createElement('div');el.className='card';el.innerHTML=`<h4>${p.name}</h4><p class="muted">${p.type} • ${p.price||'Contact for pricing'}</p><p>${p.desc}</p><a href="${p.link||'#'}" class="muted">Learn more →</a>`;container.appendChild(el)})}

function renderOpportunities(opps){const list=document.getElementById('opportunities-list');if(!opps||opps.length===0){list.innerHTML='<li class="muted">No open opportunities.</li>';return}
  list.innerHTML='';opps.forEach(o=>{const li=document.createElement('li');li.innerHTML=`<strong>${o.title}</strong> — <span class="muted">${o.location||'Remote'}</span><div class="muted">${o.summary}</div>`;list.appendChild(li)})}

async function init(){const [updates,products,opps]=await Promise.all([loadJSON('data/updates.json'),loadJSON('data/products.json'),loadJSON('data/opportunities.json')]);renderUpdates(updates);renderProducts(products);renderOpportunities(opps)}

document.getElementById('subscribe-form').addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('email').value;alert('Thanks — we will reach out to ' + email);document.getElementById('subscribe-form').reset()})

init();