/* ============================================================
   A PADARIA — carrega os dados de dados/dados.json e monta a página.
   Sem banco de dados: para editar produtos, preços, textos, fotos e
   contato, basta abrir dados/dados.json em qualquer editor.
   ============================================================ */

// cores de destaque que giram por categoria (paleta oficial)
const ACENTOS = ["#F77315", "#11908F", "#FAD117"];

function precoBR(v){
  if (v === null || v === undefined || v === "") return "sob consulta";
  return "R$ " + Number(v).toFixed(2).replace(".", ",");
}
function slug(s){
  return s.normalize("NFD").replace(/[̀-ͯ]/g,"")
          .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}
function esc(s){return (s||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function linkZap(numero, texto){
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
}

function montar(dados){
  const c = dados.contato;
  const m = dados.marca;
  const zapPedido = linkZap(c.whatsapp_numero, "Olá, A Padaria! Gostaria de fazer um pedido.");

  /* ----- textos e links dinâmicos ----- */
  document.querySelectorAll("[data-zap-pedido]").forEach(a => a.href = zapPedido);
  document.querySelectorAll("[data-maps]").forEach(a => a.href = c.maps_url);
  document.querySelectorAll("[data-instagram]").forEach(a => a.href = c.instagram_url);

  setHTML("sobre-texto", m.sobre.map(p => `<p>${esc(p)}</p>`).join(""));
  setHTML("encomendas-texto", m.encomendas.map(p => `<p>${esc(p)}</p>`).join(""));

  set("hora-dias", c.horario_dias);
  set("hora-horas", c.horario_horas);
  set("insta-user", "@" + c.instagram_user);
  set("wa-user", c.whatsapp_exibicao);
  set("rd-end1", c.endereco_linha1);
  set("rd-end2", c.endereco_linha2);
  set("rd-hora", c.horario_dias + ", " + c.horario_horas);
  set("ano", new Date().getFullYear());

  /* ----- filtros (chips) ----- */
  const filtros = document.getElementById("filtros");
  filtros.innerHTML =
    `<button class="chip ativo" data-alvo="todos">Tudo</button>` +
    dados.categorias.map(cat =>
      `<button class="chip" data-alvo="cat-${slug(cat.nome)}">${esc(cat.nome)}</button>`).join("");

  /* ----- catálogo ----- */
  const raiz = document.getElementById("catalogo");
  raiz.innerHTML = dados.categorias.map((cat, i) => {
    const acc = ACENTOS[i % ACENTOS.length];
    const cards = cat.produtos.map(p => {
      const foto = p.foto
        ? `<img src="${esc(p.foto)}" alt="${esc(p.nome)}" loading="lazy">`
        : `<div class="ph">
             <svg viewBox="0 0 60 20" fill="none" aria-hidden="true"><path d="M3 10 q6 -9 12 0 q6 9 12 0 q6 -9 12 0 q6 9 12 0" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
             <span>Foto em breve</span>
           </div>`;
      return `
      <article class="produto" style="--acc:${acc}">
        <div class="p-foto"><div class="barra"></div>${foto}</div>
        <div class="p-corpo">
          <h4>${esc(p.nome)}</h4>
          ${p.descricao ? `<p class="p-desc">${esc(p.descricao)}</p>` : ""}
          <div class="p-preco">${precoBR(p.preco)}</div>
        </div>
      </article>`;
    }).join("");

    return `
    <section class="categoria" id="cat-${slug(cat.nome)}" data-cat>
      <div class="cat-cabecalho" style="border-color:${acc}">
        <h3>${esc(cat.nome)}</h3>
        <span class="cat-count">${cat.produtos.length} ${cat.produtos.length===1?"item":"itens"}</span>
      </div>
      <div class="grid">${cards}</div>
    </section>`;
  }).join("");

  /* ----- comportamento dos filtros ----- */
  filtros.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if(!btn) return;
    filtros.querySelectorAll(".chip").forEach(c => c.classList.remove("ativo"));
    btn.classList.add("ativo");
    const alvo = btn.dataset.alvo;
    raiz.querySelectorAll("[data-cat]").forEach(sec => {
      sec.style.display = (alvo === "todos" || sec.id === alvo) ? "" : "none";
    });
    if(alvo !== "todos"){
      const el = document.getElementById(alvo);
      const y = el.getBoundingClientRect().top + window.scrollY - 168;
      window.scrollTo({top:y, behavior:"smooth"});
    }
  });
}

function set(id, txt){ const el = document.getElementById(id); if(el) el.textContent = txt; }
function setHTML(id, html){ const el = document.getElementById(id); if(el) el.innerHTML = html; }

/* ----- carregamento dos dados ----- */
fetch("dados/dados.json")
  .then(r => { if(!r.ok) throw new Error(r.status); return r.json(); })
  .then(montar)
  .catch(err => {
    document.getElementById("catalogo").innerHTML =
      `<div class="aviso">
        <p><strong>Não foi possível carregar o catálogo.</strong></p>
        <p>Se você abriu o arquivo com duplo clique, o navegador bloqueia a leitura do
        <code>dados.json</code>. Publique o site em uma hospedagem (ex.: Netlify, Vercel,
        GitHub Pages) ou rode localmente:</p>
        <p><code>python -m http.server</code> e acesse <code>http://localhost:8000</code></p>
      </div>`;
    console.error("Erro ao carregar dados.json:", err);
  });

/* ----- menu mobile ----- */
document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("aberto");
});
document.querySelectorAll("#nav .link").forEach(a =>
  a.addEventListener("click", () => document.getElementById("nav").classList.remove("aberto")));
