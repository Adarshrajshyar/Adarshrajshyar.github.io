<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#111827">
  <title>Shayari | ARS Official</title>
  <link rel="stylesheet" href="style.css">

  <style>
    body{margin:0;font-family:Arial,sans-serif;background:#f4f6f9;color:#172033}
    .page{max-width:1100px;margin:auto;padding:24px 16px 60px}
    .back{display:inline-block;margin-bottom:18px;padding:10px 15px;border-radius:9px;background:#111827;color:#fff;text-decoration:none}
    .hero{padding:42px 20px;text-align:center;color:#fff;border-radius:24px;background:linear-gradient(135deg,#111827,#374151);margin-bottom:22px}
    .hero h1{margin:0 0 8px;font-size:34px}
    .hero p{margin:0;line-height:1.6}
    .categories{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}
    .categories button{border:1px solid #d1d5db;background:#fff;padding:10px 16px;border-radius:20px;cursor:pointer;font-weight:600}
    .categories button.active{background:#111827;color:#fff}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:18px}
    .shayari-card{background:#fff;border-radius:18px;padding:22px;box-shadow:0 6px 20px rgba(0,0,0,.07)}
    .tag{font-size:13px;font-weight:bold;opacity:.65}
    .shayari-text{font-size:18px;line-height:1.9;margin:15px 0;white-space:pre-line}
    .actions{display:flex;gap:8px;flex-wrap:wrap}
    .actions button{border:1px solid #d1d5db;background:#fff;border-radius:9px;padding:9px 12px;cursor:pointer}
    .actions button.liked{background:#111827;color:#fff}
    .empty{text-align:center;padding:35px;background:#fff;border-radius:18px}
  </style>
</head>

<body>
<main class="page">

  <a href="index.html" class="back">← ARS Home</a>

  <section class="hero">
    <h1>ARS Shayari</h1>
    <p>Sad • Love • Attitude • Friendship • Motivation</p>
  </section>

  <div id="categories" class="categories"></div>

  <section id="shayariGrid" class="grid"></section>

</main>

<script>
(function(){

  const categories = [
    "All",
    "Sad",
    "Love",
    "Attitude",
    "Friendship",
    "Motivation"
  ];

  const data = [
    {
      id:"ARS-SH-001",
      category:"Love",
      text:"कुछ रिश्ते शब्दों से नहीं,\nखामोशी से समझे जाते हैं।"
    },
    {
      id:"ARS-SH-002",
      category:"Sad",
      text:"हर मुस्कान के पीछे कहानी होती है,\nहर खामोशी में एक निशानी होती है।"
    },
    {
      id:"ARS-SH-003",
      category:"Attitude",
      text:"रास्ते चाहे मुश्किल हों,\nहौसला अपना मजबूत होना चाहिए।"
    },
    {
      id:"ARS-SH-004",
      category:"Friendship",
      text:"दोस्ती वो नहीं जो वक्त के साथ बदल जाए,\nदोस्ती वो है जो वक्त बदल दे।"
    },
    {
      id:"ARS-SH-005",
      category:"Motivation",
      text:"आज की मेहनत ही,\nकल की पहचान बनती है।"
    }
  ];

  let selected = "All";

  const categoryBox =
    document.getElementById("categories");

  const grid =
    document.getElementById("shayariGrid");


  function getSaved(){
    try{
      return JSON.parse(
        localStorage.getItem("ARS_SHAYARI_SAVED")
      ) || [];
    }catch{
      return [];
    }
  }


  function getLikes(){
    try{
      return JSON.parse(
        localStorage.getItem("ARS_SHAYARI_LIKES")
      ) || {};
    }catch{
      return {};
    }
  }


  function save(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }


  function renderCategories(){

    categoryBox.innerHTML="";

    categories.forEach(category=>{

      const button =
        document.createElement("button");

      button.textContent=category;

      if(category===selected){
        button.classList.add("active");
      }

      button.onclick=function(){
        selected=category;
        renderCategories();
        render();
      };

      categoryBox.appendChild(button);

    });
  }


  function render(){

    grid.innerHTML="";

    const likes=getLikes();
    const saved=getSaved();

    const filtered =
      selected==="All"
      ? data
      : data.filter(item=>item.category===selected);


    if(!filtered.length){

      grid.innerHTML =
        '<div class="empty">इस category में अभी content उपलब्ध नहीं है।</div>';

      return;
    }


    filtered.forEach(item=>{

      const card =
        document.createElement("article");

      card.className="shayari-card";

      const liked =
        likes[item.id] === true;

      const isSaved =
        saved.includes(item.id);


      card.innerHTML=`
        <div class="tag">${escapeHTML(item.category)}</div>

        <div class="shayari-text">
          ${escapeHTML(item.text)}
        </div>

        <div class="actions">

          <button class="${liked ? "liked":""}"
                  data-like="${item.id}">
            ${liked ? "♥ Liked" : "♡ Like"}
          </button>

          <button data-share="${item.id}">
            ↗ Share
          </button>

          <button data-save="${item.id}">
            ${isSaved ? "✓ Saved" : "🔖 Save"}
          </button>

        </div>
      `;

      grid.appendChild(card);
    });


    document.querySelectorAll("[data-like]")
      .forEach(button=>{

        button.onclick=function(){

          const id=this.dataset.like;
          const likes=getLikes();

          likes[id]=!likes[id];

          save("ARS_SHAYARI_LIKES",likes);

          render();

        };

      });


    document.querySelectorAll("[data-save]")
      .forEach(button=>{

        button.onclick=function(){

          const id=this.dataset.save;
          const saved=getSaved();

          const index=saved.indexOf(id);

          if(index>=0){
            saved.splice(index,1);
          }else{
            saved.push(id);
          }

          save("ARS_SHAYARI_SAVED",saved);

          render();

        };

      });


    document.querySelectorAll("[data-share]")
      .forEach(button=>{

        button.onclick=function(){

          const id=this.dataset.share;

          const item=data.find(
            x=>x.id===id
          );

          if(!item)return;

          const shareText =
            item.text +
            "\n\n— ARS Official";

          if(navigator.share){

            navigator.share({
              title:"ARS Shayari",
              text:shareText,
              url:location.href
            }).catch(()=>{});

          }else{

            navigator.clipboard
              .writeText(
                shareText+"\n"+location.href
              )
              .then(()=>{
                alert("Shayari copied!");
              });

          }

        };

      });

  }


  function escapeHTML(value){

    return String(value)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");

  }


  renderCategories();
  render();

})();
</script>

</body>
</html>
