<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#111827">
  <title>Stories | ARS Official</title>
  <link rel="stylesheet" href="style.css">

  <style>
    body{margin:0;font-family:Arial,sans-serif;background:#f4f6f9;color:#172033}
    .page{max-width:1100px;margin:auto;padding:24px 16px 60px}
    .back{display:inline-block;margin-bottom:18px;padding:10px 15px;border-radius:9px;background:#111827;color:#fff;text-decoration:none}
    .hero{padding:42px 20px;text-align:center;color:#fff;border-radius:24px;background:linear-gradient(135deg,#111827,#374151);margin-bottom:22px}
    .hero h1{margin:0 0 8px;font-size:34px}
    .categories{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}
    .categories button{border:1px solid #d1d5db;background:#fff;padding:10px 15px;border-radius:20px;cursor:pointer}
    .categories button.active{background:#111827;color:#fff}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}
    .story{background:#fff;border-radius:18px;padding:22px;box-shadow:0 6px 20px rgba(0,0,0,.07)}
    .tag{font-size:13px;font-weight:bold;opacity:.65}
    .story h2{margin:10px 0}
    .story p{line-height:1.8;white-space:pre-line}
    .actions{display:flex;gap:8px;flex-wrap:wrap}
    .actions button{border:1px solid #d1d5db;background:#fff;border-radius:9px;padding:9px 12px;cursor:pointer}
  </style>
</head>

<body>

<main class="page">

  <a href="index.html" class="back">← ARS Home</a>

  <section class="hero">
    <h1>ARS Stories</h1>
    <p>Read • Discover • Share</p>
  </section>

  <div id="categories" class="categories"></div>

  <section id="storyGrid" class="grid"></section>

</main>

<script>
(function(){

  const categories=[
    "All",
    "Poem",
    "Horror",
    "Friendship",
    "Emotional",
    "Story",
    "Moral",
    "Mystery",
    "Biography",
    "Motivation"
  ];

  const stories=[
    {
      id:"ARS-ST-001",
      category:"Moral",
      title:"मेहनत का फल",
      text:"एक छोटे से गाँव में एक बच्चा हर दिन अपने लक्ष्य के लिए मेहनत करता था। रास्ता कठिन था, लेकिन उसने हार नहीं मानी। आखिरकार उसकी मेहनत उसकी सबसे बड़ी पहचान बन गई।"
    },
    {
      id:"ARS-ST-002",
      category:"Friendship",
      title:"सच्ची दोस्ती",
      text:"सच्चा दोस्त वही होता है जो अच्छे समय में साथ रहने के साथ कठिन समय में भी हिम्मत देता है।"
    },
    {
      id:"ARS-ST-003",
      category:"Motivation",
      title:"एक कदम और",
      text:"कभी-कभी मंजिल बहुत दूर लगती है। ऐसे समय में पूरी यात्रा के बारे में सोचने के बजाय केवल अगला कदम उठाना चाहिए।"
    }
  ];

  let selected="All";

  const categoryBox=
    document.getElementById("categories");

  const grid=
    document.getElementById("storyGrid");


  function renderCategories(){

    categoryBox.innerHTML="";

    categories.forEach(category=>{

      const button=
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

    const filtered=
      selected==="All"
      ? stories
      : stories.filter(
          story=>story.category===selected
        );


    if(!filtered.length){

      grid.innerHTML=
        "<div class='story'>इस category में अभी कोई story उपलब्ध नहीं है।</div>";

      return;
    }


    filtered.forEach(story=>{

      const card=
        document.createElement("article");

      card.className="story";

      card.innerHTML=`
        <div class="tag">
          ${escapeHTML(story.category)}
        </div>

        <h2>${escapeHTML(story.title)}</h2>

        <p>${escapeHTML(story.text)}</p>

        <div class="actions">

          <button data-share="${story.id}">
            ↗ Share
          </button>

          <button data-save="${story.id}">
            🔖 Save
          </button>

        </div>
      `;

      grid.appendChild(card);

    });


    document.querySelectorAll("[data-share]")
      .forEach(button=>{

        button.onclick=function(){

          const story=
            stories.find(
              item=>item.id===this.dataset.share
            );

          if(!story)return;

          const text=
            story.title+
            "\n\n"+
            story.text+
            "\n\n— ARS Official";

          if(navigator.share){

            navigator.share({
              title:story.title,
              text:text,
              url:location.href
            }).catch(()=>{});

          }else{

            navigator.clipboard
              .writeText(text+"\n"+location.href)
              .then(()=>alert("Story copied!"));

          }

        };

      });


    document.querySelectorAll("[data-save]")
      .forEach(button=>{

        button.onclick=function(){

          const key="ARS_STORY_SAVED";

          let saved=[];

          try{
            saved=JSON.parse(
              localStorage.getItem(key)
            )||[];
          }catch{}

          const id=this.dataset.save;

          if(saved.includes(id)){

            saved=saved.filter(x=>x!==id);
            this.textContent="🔖 Save";

          }else{

            saved.push(id);
            this.textContent="✓ Saved";

          }

          localStorage.setItem(
            key,
            JSON.stringify(saved)
          );

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
