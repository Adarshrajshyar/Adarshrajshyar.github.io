<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Shayari | ARS Official</title>
  <meta name="description" content="ARS Official पर पढ़ें प्रेम, दर्द, प्रेरणा, दोस्ती और एटीट्यूड से जुड़ी मौलिक शायरी।">
  <meta name="theme-color" content="#7c3aed">

  <link rel="stylesheet" href="style.css">

  <style>
    /* ================================
       ARS SHAYARI PAGE
    ================================= */

    .shayari-toolbar {
      margin-top: 28px;
      display: grid;
      gap: 18px;
    }

    .shayari-search {
      width: 100%;
      padding: 15px 18px;
      border: 1px solid var(--border-color, rgba(127,127,127,.22));
      border-radius: 14px;
      background: var(--card-bg, rgba(255,255,255,.7));
      color: var(--text-color, #222);
      outline: none;
      font-size: 15px;
      transition: .25s ease;
      box-sizing: border-box;
    }

    .shayari-search:focus {
      border-color: var(--primary-color, #7c3aed);
      box-shadow: 0 0 0 4px rgba(124,58,237,.10);
    }

    .category-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .category-tab {
      border: 1px solid var(--border-color, rgba(127,127,127,.22));
      background: var(--card-bg, rgba(255,255,255,.7));
      color: inherit;
      padding: 10px 17px;
      border-radius: 999px;
      cursor: pointer;
      font-size: 14px;
      transition: .25s ease;
    }

    .category-tab:hover,
    .category-tab.active {
      background: var(--primary-color, #7c3aed);
      color: #fff;
      border-color: var(--primary-color, #7c3aed);
      transform: translateY(-1px);
    }

    .shayari-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 22px;
      margin-top: 35px;
    }

    .shayari-card {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--border-color, rgba(127,127,127,.18));
      border-radius: 20px;
      padding: 25px;
      background: var(--card-bg, rgba(255,255,255,.75));
      box-shadow: 0 12px 35px rgba(0,0,0,.06);
      transition: .3s ease;
    }

    .shayari-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 45px rgba(0,0,0,.10);
    }

    .shayari-card::before {
      content: "“";
      position: absolute;
      right: 18px;
      top: 0;
      font-size: 90px;
      line-height: 1;
      opacity: .07;
      font-family: Georgia, serif;
    }

    .shayari-category {
      display: inline-flex;
      align-items: center;
      padding: 6px 11px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      background: rgba(124,58,237,.10);
      color: var(--primary-color, #7c3aed);
      margin-bottom: 16px;
    }

    .shayari-text {
      margin: 0;
      white-space: pre-line;
      line-height: 1.95;
      font-size: 16px;
      font-weight: 600;
    }

    .shayari-author {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid var(--border-color, rgba(127,127,127,.15));
      font-size: 13px;
      opacity: .72;
    }

    .shayari-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 18px;
    }

    .shayari-action {
      border: 1px solid var(--border-color, rgba(127,127,127,.18));
      background: transparent;
      color: inherit;
      padding: 8px 11px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      transition: .2s ease;
    }

    .shayari-action:hover {
      background: rgba(124,58,237,.09);
      border-color: rgba(124,58,237,.35);
    }

    .shayari-empty {
      display: none;
      text-align: center;
      padding: 50px 20px;
      margin-top: 30px;
      border: 1px dashed var(--border-color, rgba(127,127,127,.25));
      border-radius: 20px;
      opacity: .75;
    }

    .shayari-empty.show {
      display: block;
    }

    .shayari-note {
      margin-top: 25px;
      text-align: center;
      font-size: 14px;
      opacity: .7;
    }

    @media (max-width: 1000px) {
      .shayari-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 650px) {
      .shayari-grid {
        grid-template-columns: 1fr;
      }

      .shayari-card {
        padding: 21px;
      }

      .category-tabs {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 5px;
      }

      .category-tab {
        flex: 0 0 auto;
      }
    }
  </style>
</head>

<body>

  <!-- PAGE LOADER -->
  <div class="page-loader" aria-hidden="true">
    <div class="loader-spinner"></div>
  </div>

  <!-- HEADER -->
  <header class="site-header">
    <div class="container header-inner">

      <a href="index.html" class="brand">
        <img src="logo.png" alt="ARS Official Logo" class="brand-logo">
        <span class="brand-text">
          <strong>ARS</strong>
          <small>Official</small>
        </span>
      </a>

      <button class="menu-toggle"
              type="button"
              aria-label="Open navigation"
              aria-expanded="false">
        ☰
      </button>

      <nav class="main-nav" aria-label="Main Navigation">
        <a href="index.html">Home</a>
        <a href="founder.html">Founder</a>
        <a href="shayari.html" class="active">Shayari</a>
        <a href="stories.html">Stories & Poetry</a>
        <a href="education.html">ARS Education</a>
        <a href="first-flight.html">First Flight</a>
        <a href="ars-ai.html">ARS AI</a>
        <a href="joining.html">Join ARS</a>
        <a href="certificate.html">Certificate</a>
        <a href="verify.html">Verify</a>
        <a href="contact.html">Contact</a>
        <a href="publisher.html">Publisher</a>
        <a href="admin.html">Admin</a>
        <a href="policy.html">Policy</a>
      </nav>

    </div>
  </header>

  <!-- HERO -->
  <main>

    <section class="hero">
      <div class="container hero-content reveal">

        <span class="eyebrow">✍️ ARS Original Collection</span>

        <h1>
          शब्दों में एहसास,<br>
          <span>दिल से निकली शायरी</span>
        </h1>

        <p>
          प्रेम, दर्द, प्रेरणा, दोस्ती और एटीट्यूड —
          हर एहसास को शब्दों में महसूस कीजिए।
        </p>

        <div class="hero-actions">
          <a href="#shayariCollection" class="btn btn-primary">
            शायरी पढ़ें
          </a>

          <a href="index.html" class="btn btn-secondary">
            ← Home
          </a>
        </div>

      </div>
    </section>


    <!-- SHAYARI COLLECTION -->
    <section class="section" id="shayariCollection">
      <div class="container">

        <div class="section-heading reveal">
          <span class="eyebrow">ARS Shayari</span>

          <h2>
            अपनी पसंद की शायरी खोजें
          </h2>

          <p>
            Category चुनें या अपने मनपसंद शब्दों से शायरी खोजें।
          </p>
        </div>


        <!-- SEARCH + FILTER -->
        <div class="shayari-toolbar reveal">

          <input
            type="search"
            class="shayari-search"
            data-search-input
            placeholder="🔍 शायरी खोजें..."
            aria-label="Search Shayari"
          >

          <div class="category-tabs" aria-label="Shayari Categories">

            <button
              class="category-tab active"
              type="button"
              data-filter="all"
              data-filter-target="[data-shayari-card]"
            >
              ✨ सभी
            </button>

            <button
              class="category-tab"
              type="button"
              data-filter="love"
              data-filter-target="[data-shayari-card]"
            >
              ❤️ प्रेम
            </button>

            <button
              class="category-tab"
              type="button"
              data-filter="sad"
              data-filter-target="[data-shayari-card]"
            >
              💔 दर्द
            </button>

            <button
              class="category-tab"
              type="button"
              data-filter="motivational"
              data-filter-target="[data-shayari-card]"
            >
              🔥 प्रेरणादायक
            </button>

            <button
              class="category-tab"
              type="button"
              data-filter="friendship"
              data-filter-target="[data-shayari-card]"
            >
              🤝 दोस्ती
            </button>

            <button
              class="category-tab"
              type="button"
              data-filter="attitude"
              data-filter-target="[data-shayari-card]"
            >
              👑 एटीट्यूड
            </button>

          </div>
        </div>


        <!-- CARDS -->
        <div class="shayari-grid" id="shayariGrid">


          <!-- LOVE -->
          <article
            class="shayari-card reveal"
            data-shayari-card
            data-category="love"
            data-search="प्रेम प्यार मोहब्बत दिल एहसास"
          >

            <span class="shayari-category">
              ❤️ प्रेम
            </span>

            <p class="shayari-text">तेरी यादों का असर आज भी रहता है,
तेरा नाम दिल के पास ही रहता है।
दूर होकर भी तू दूर नहीं लगता,
क्योंकि तेरा एहसास मेरे साथ ही रहता है।</p>

            <div class="shayari-author">
              — Adarsh Raj Shayar
            </div>

            <div class="shayari-actions">

              <button
                class="shayari-action"
                type="button"
                data-like-id="shayari-love-001"
              >
                ❤️ Like
              </button>

              <button
                class="shayari-action"
                type="button"
                data-favorite-id="shayari-love-001"
              >
                ⭐ Favorite
              </button>

              <button
                class="shayari-action"
                type="button"
                data-save-id="shayari-love-001"
              >
                🔖 Save
              </button>

              <button
                class="shayari-action"
                type="button"
                data-copy="तेरी यादों का असर आज भी रहता है,
तेरा नाम दिल के पास ही रहता है।
दूर होकर भी तू दूर नहीं लगता,
क्योंकि तेरा एहसास मेरे साथ ही रहता है।"
              >
                📋 Copy
              </button>

              <button
                class="shayari-action"
                type="button"
                data-share-text="तेरी यादों का असर आज भी रहता है,
तेरा नाम दिल के पास ही रहता है।
दूर होकर भी तू दूर नहीं लगता,
क्योंकि तेरा एहसास मेरे साथ ही रहता है।"
              >
                ↗️ Share
              </button>

            </div>
          </article>


          <!-- SAD -->
          <article
            class="shayari-card reveal"
            data-shayari-card
            data-category="sad"
            data-search="दर्द उदासी अकेलापन याद"
          >

            <span class="shayari-category">
              💔 दर्द
            </span>

            <p class="shayari-text">कुछ रिश्ते आवाज़ नहीं करते,
फिर भी दिल में बहुत शोर करते हैं।
लोग दूर होकर भी याद रहते हैं,
और कुछ पास होकर भी दूर लगते हैं।</p>

            <div class="shayari-author">
              — Adarsh Raj Shayar
            </div>

            <div class="shayari-actions">

              <button
                class="shayari-action"
                type="button"
                data-like-id="shayari-sad-001"
              >
                ❤️ Like
              </button>

              <button
                class="shayari-action"
                type="button"
                data-favorite-id="shayari-sad-001"
              >
                ⭐ Favorite
              </button>

              <button
                class="shayari-action"
                type="button"
                data-save-id="shayari-sad-001"
              >
                🔖 Save
              </button>

              <button
                class="shayari-action"
                type="button"
                data-copy="कुछ रिश्ते आवाज़ नहीं करते,
फिर भी दिल में बहुत शोर करते हैं।
लोग दूर होकर भी याद रहते हैं,
और कुछ पास होकर भी दूर लगते हैं।"
              >
                📋 Copy
              </button>

              <button
                class="shayari-action"
                type="button"
                data-share-text="कुछ रिश्ते आवाज़ नहीं करते,
फिर भी दिल में बहुत शोर करते हैं।
लोग दूर होकर भी याद रहते हैं,
और कुछ पास होकर भी दूर लगते हैं।"
              >
                ↗️ Share
              </button>

            </div>
          </article>


          <!-- MOTIVATIONAL -->
          <article
            class="shayari-card reveal"
            data-shayari-card
            data-category="motivational"
            data-search="प्रेरणा मेहनत सफलता संघर्ष हिम्मत"
          >

            <span class="shayari-category">
              🔥 प्रेरणादायक
            </span>

            <p class="shayari-text">रास्ते कठिन हैं तो चलना सीख,
गिर जाएँ तो फिर संभलना सीख।
मंज़िल उन्हीं को मिलती है आखिर,
जो हार के बाद भी लड़ना सीख।</p>

            <div class="shayari-author">
              — Adarsh Raj Shayar
            </div>

            <div class="shayari-actions">

              <button
                class="shayari-action"
                type="button"
                data-like-id="shayari-motivation-001"
              >
                ❤️ Like
              </button>

              <button
                class="shayari-action"
                type="button"
                data-favorite-id="shayari-motivation-001"
              >
                ⭐ Favorite
              </button>

              <button
                class="shayari-action"
                type="button"
                data-save-id="shayari-motivation-001"
              >
                🔖 Save
              </button>

              <button
                class="shayari-action"
                type="button"
                data-copy="रास्ते कठिन हैं तो चलना सीख,
गिर जाएँ तो फिर संभलना सीख।
मंज़िल उन्हीं को मिलती है आखिर,
जो हार के बाद भी लड़ना सीख।"
              >
                📋 Copy
              </button>

              <button
                class="shayari-action"
                type="button"
                data-share-text="रास्ते कठिन हैं तो चलना सीख,
गिर जाएँ तो फिर संभलना सीख।
मंज़िल उन्हीं को मिलती है आखिर,
जो हार के बाद भी लड़ना सीख।"
              >
                ↗️ Share
              </button>

            </div>
          </article>


          <!-- FRIENDSHIP -->
          <article
            class="shayari-card reveal"
            data-shayari-card
            data-category="friendship"
            data-search="दोस्ती दोस्त यारी मित्रता भरोसा"
          >

            <span class="shayari-category">
              🤝 दोस्ती
            </span>

            <p class="shayari-text">दोस्ती नाम है उस रिश्ते का,
जहाँ हिसाब नहीं होता।
सच्चा दोस्त वही होता है,
जो साथ हो तो कोई डर नहीं होता।</p>

            <div class="shayari-author">
              — Adarsh Raj Shayar
            </div>

            <div class="shayari-actions">

              <button
                class="shayari-action"
                type="button"
                data-like-id="shayari-friendship-001"
              >
                ❤️ Like
              </button>

              <button
                class="shayari-action"
                type="button"
                data-favorite-id="shayari-friendship-001"
              >
                ⭐ Favorite
              </button>

              <button
                class="shayari-action"
                type="button"
                data-save-id="shayari-friendship-001"
              >
                🔖 Save
              </button>

              <button
                class="shayari-action"
                type="button"
                data-copy="दोस्ती नाम है उस रिश्ते का,
जहाँ हिसाब नहीं होता।
सच्चा दोस्त वही होता है,
जो साथ हो तो कोई डर नहीं होता।"
              >
                📋 Copy
              </button>

              <button
                class="shayari-action"
                type="button"
                data-share-text="दोस्ती नाम है उस रिश्ते का,
जहाँ हिसाब नहीं होता।
सच्चा दोस्त वही होता है,
जो साथ हो तो कोई डर नहीं होता।"
              >
                ↗️ Share
              </button>

            </div>
          </article>


          <!-- ATTITUDE -->
          <article
            class="shayari-card reveal"
            data-shayari-card
            data-category="attitude"
            data-search="एटीट्यूड स्वाभिमान पहचान मेहनत आत्मविश्वास"
          >

            <span class="shayari-category">
              👑 एटीट्यूड
            </span>

            <p class="shayari-text">हमारी पहचान किसी नाम की मोहताज नहीं,
हमारी मेहनत ही हमारी पहचान है।
जो समझते हैं हमें कमज़ोर,
उन्हें वक्त देगा असली जवाब महान है।</p>

            <div class="shayari-author">
              — Adarsh Raj Shayar
            </div>

            <div class="shayari-actions">

              <button
                class="shayari-action"
                type="button"
                data-like-id="shayari-attitude-001"
              >
                ❤️ Like
              </button>

              <button
                class="shayari-action"
                type="button"
                data-favorite-id="shayari-attitude-001"
              >
                ⭐ Favorite
              </button>

              <button
                class="shayari-action"
                type="button"
                data-save-id="shayari-attitude-001"
              >
                🔖 Save
              </button>

              <button
                class="shayari-action"
                type="button"
                data-copy="हमारी पहचान किसी नाम की मोहताज नहीं,
हमारी मेहनत ही हमारी पहचान है।
जो समझते हैं हमें कमज़ोर,
उन्हें वक्त देगा असली जवाब महान है।"
              >
                📋 Copy
              </button>

              <button
                class="shayari-action"
                type="button"
                data-share-text="हमारी पहचान किसी नाम की मोहताज नहीं,
हमारी मेहनत ही हमारी पहचान है।
जो समझते हैं हमें कमज़ोर,
उन्हें वक्त देगा असली जवाब महान है।"
              >
                ↗️ Share
              </button>

            </div>
          </article>


          <!-- LOVE 2 -->
          <article
            class="shayari-card reveal"
            data-shayari-card
            data-category="love"
            data-search="प्रेम मोहब्बत याद दिल"
          >

            <span class="shayari-category">
              ❤️ प्रेम
            </span>

            <p class="shayari-text">कहने को तो शब्द बहुत हैं,
पर तेरे लिए कम पड़ जाते हैं।
जब भी लिखता हूँ तेरा नाम,
मेरे जज़्बात शायरी बन जाते हैं।</p>

            <div class="shayari-author">
              — Adarsh Raj Shayar
            </div>

            <div class="shayari-actions">

              <button
                class="shayari-action"
                type="button"
                data-like-id="shayari-love-002"
              >
                ❤️ Like
              </button>

              <button
                class="shayari-action"
                type="button"
                data-favorite-id="shayari-love-002"
              >
                ⭐ Favorite
              </button>

              <button
                class="shayari-action"
                type="button"
                data-save-id="shayari-love-002"
              >
                🔖 Save
              </button>

              <button
                class="shayari-action"
                type="button"
                data-copy="कहने को तो शब्द बहुत हैं,
पर तेरे लिए कम पड़ जाते हैं।
जब भी लिखता हूँ तेरा नाम,
मेरे जज़्बात शायरी बन जाते हैं।"
              >
                📋 Copy
              </button>

              <button
                class="shayari-action"
                type="button"
                data-share-text="कहने को तो शब्द बहुत हैं,
पर तेरे लिए कम पड़ जाते हैं।
जब भी लिखता हूँ तेरा नाम,
मेरे जज़्बात शायरी बन जाते हैं।"
              >
                ↗️ Share
              </button>

            </div>
          </article>


        </div>


        <!-- EMPTY -->
        <div class="shayari-empty" id="shayariEmpty">
          <h3>कोई शायरी नहीं मिली</h3>
          <p>
            अपनी search बदलकर या दूसरी category चुनकर फिर से देखें।
          </p>
        </div>

        <p class="shayari-note">
          ✍️ ARS पर प्रकाशित सामग्री को लेखक की अनुमति के बिना
          व्यावसायिक रूप से पुनः प्रकाशित न करें।
        </p>

      </div>
    </section>


    <!-- CTA -->
    <section class="section join-section">
      <div class="container">

        <div class="join-card reveal">

          <span class="eyebrow">
            🌹 ARS Official
          </span>

          <h2>
            शब्द पसंद आए?
          </h2>

          <p>
            ARS के साथ जुड़ें और साहित्य, शिक्षा एवं रचनात्मकता
            की इस यात्रा का हिस्सा बनें।
          </p>

          <div class="hero-actions">

            <a href="joining.html" class="btn btn-primary">
              Join ARS
            </a>

            <a href="stories.html" class="btn btn-secondary">
              Stories & Poetry
            </a>

          </div>

        </div>

      </div>
    </section>

  </main>


  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="container">

      <div class="footer-grid">

        <div class="footer-brand">

          <a href="index.html" class="brand">
            <img src="logo.png" alt="ARS Official Logo" class="brand-logo">

            <span class="brand-text">
              <strong>ARS</strong>
              <small>Official</small>
            </span>
          </a>

          <p>
            शिक्षा, साहित्य और रचनात्मकता को एक मंच पर
            जोड़ने की एक पहल।
          </p>

          <div class="signature-box">
            <span>Founder</span>
            <strong>Adarsh Raj</strong>
          </div>

        </div>


        <div>
          <h3>Quick Links</h3>

          <a href="index.html">Home</a>
          <a href="founder.html">Founder</a>
          <a href="education.html">ARS Education</a>
          <a href="first-flight.html">First Flight</a>
          <a href="ars-ai.html">ARS AI</a>
        </div>


        <div>
          <h3>ARS</h3>

          <a href="shayari.html">Shayari</a>
          <a href="stories.html">Stories & Poetry</a>
          <a href="joining.html">Join ARS</a>
          <a href="certificate.html">Certificate</a>
          <a href="verify.html">Verify Certificate</a>
        </div>


        <div>
          <h3>Support</h3>

          <a href="contact.html">Contact</a>
          <a href="publisher.html">Publisher</a>
          <a href="admin.html">Admin</a>
          <a href="policy.html">Policy</a>
        </div>

      </div>


      <div class="footer-bottom">

        <p>
          © <span data-current-year></span>
          ARS Official. All Rights Reserved.
        </p>

        <p>
          Made with ❤️ by ARS
        </p>

      </div>

    </div>
  </footer>


  <!-- BACK TO TOP -->
  <button
    class="back-to-top"
    type="button"
    aria-label="Back to top"
  >
    ↑
  </button>


  <!-- SCRIPTS -->
  <script src="config.js"></script>
  <script src="storage.js"></script>
  <script src="script.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", function () {

      const cards = Array.from(
        document.querySelectorAll("[data-shayari-card]")
      );

      const tabs = Array.from(
        document.querySelectorAll("[data-filter]")
      );

      const searchInput =
        document.querySelector("[data-search-input]");

      const emptyState =
        document.getElementById("shayariEmpty");


      function updateCards() {

        const activeTab =
          document.querySelector("[data-filter].active");

        const category =
          activeTab ? activeTab.dataset.filter : "all";

        const search =
          searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;


        cards.forEach(function (card) {

          const cardCategory =
            (card.dataset.category || "").toLowerCase();

          const searchableText =
            (
              card.dataset.search ||
              card.innerText ||
              ""
            ).toLowerCase();

          const categoryMatch =
            category === "all" ||
            cardCategory === category;

          const searchMatch =
            !search ||
            searchableText.includes(search);

          const show =
            categoryMatch && searchMatch;

          card.style.display =
            show ? "" : "none";

          if (show) {
            visibleCount++;
          }

        });


        if (emptyState) {
          emptyState.classList.toggle(
            "show",
            visibleCount === 0
          );
        }

      }


      tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

          tabs.forEach(function (item) {
            item.classList.remove("active");
          });

          tab.classList.add("active");

          updateCards();

        });

      });


      if (searchInput) {

        searchInput.addEventListener(
          "input",
          updateCards
        );

      }


      updateCards();

    });
  </script>

</body>
</html>
