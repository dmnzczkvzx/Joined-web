<script setup lang="ts">
interface Message {
  role: 'assistant' | 'user'
  content?: string
  html?: string
}

interface Chip {
  id: string
  label: string
  sublabel?: string
  response: string
}

interface ChatState {
  messages: Message[]
  availableChips: Chip[]
  clickedChipIds: string[]
}

type Lang = 'cs' | 'en'

/* ---- SEO ---- */
useSeoMeta({
  title: 'Joined.cz | E-commerce & Technology',
  ogTitle: 'Joined.cz',
  description:
    'Joined.cz je obchodní firma z IT prostředí. Nakupujeme zboží a prodáváme ho na vlastních marketplace kanálech ve střední a západní Evropě — Allegro, Kaufland, cDiscount, ManoMano a další. Hledáme dodavatele a výrobce s dobrými produkty.',
  ogDescription: 'E-commerce operations · Technical business sale partner · CZ / DE / PL / FR / IT',
})

/* ---- Language ---- */
const lang = ref<Lang>('cs')

function toggleLang() {
  lang.value = lang.value === 'cs' ? 'en' : 'cs'
}

/* ---- UI Translations ---- */
const ui = computed(() => {
  const map: Record<
    Lang,
    {
      conversations: string
      aboutUs: string
      contact: string
      askAnything: string
    }
  > = {
    cs: {
      conversations: 'Konverzace',
      aboutUs: 'O nás',
      contact: 'Kontakt',
      askAnything: 'Zeptej se nás na cokoliv...',
      yourEmail: 'Váš e-mail',
      yourMessage: 'Vaše zpráva',
      send: 'Odeslat',
    },
    en: {
      conversations: 'Conversations',
      aboutUs: 'About us',
      contact: 'Contact',
      askAnything: 'Ask us anything...',
      yourEmail: 'Your email',
      yourMessage: 'Your message',
      send: 'Send',
    },
  }
  return map[lang.value]
})

/* ---- Nav links (translated) ---- */
const navLinks = computed(() => {
  const map: Record<Lang, { label: string; key: string }[]> = {
    cs: [
      { label: 'Partneři', key: 'partners' },
      { label: 'Marketplaces', key: 'marketplaces' },
      { label: 'Dev', key: 'dev' },
    ],
    en: [
      { label: 'Partners', key: 'partners' },
      { label: 'Marketplaces', key: 'marketplaces' },
      { label: 'Dev', key: 'dev' },
    ],
  }
  return map[lang.value]
})

/* ---- Sidebar history titles (translated) ---- */
const sidebarTitles = computed(() => {
  const map: Record<Lang, string[]> = {
    cs: [
      'Kdo jsme',
      'Marketplace prodej',
      'Jak spolupracujeme',
      'Systémové napojení',
    ],
    en: [
      'Who we are',
      'Marketplace sales',
      'How we partner',
      'System connectivity',
    ],
  }
  return map[lang.value]
})

/* ---- Zeptej se nás ---- */
function openForm() {
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
}

function submitForm() {
  if (!formEmail.value || !formMessage.value) return
  const subject = encodeURIComponent('Zpráva z webu / Website message')
  const body = encodeURIComponent(`From: ${formEmail.value}\n\n${formMessage.value}`)
  window.location.href = `mailto:obchod@joined.cz?subject=${subject}&body=${body}`
  formEmail.value = ''
  formMessage.value = ''
  formOpen.value = false
}


/* ---- Chat Content Factories ---- */
function getInitialMessage(chatIndex: number): Message {
  const allMessages: Record<Lang, string[]> = {
    cs: [
      // ── Chat 0: Kdo jsme ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">Joined.cz</h2>
          <p class="text-cyan-400 text-sm font-medium">E-commerce operations · Technical business sale partner · CZ / DE / PL / FR / IT</p>
        </div>
        <p>Jsme <strong>obchodní firma</strong> z IT a startupové komunity — nakupujeme, prodáváme a provozujeme vlastní prodejní kanály na marketplace platformách ve střední a západní Evropě.</p>
        <p>Za námi stojí roky reálné praxe v e-commerce — vlastní e-shopy, online marketing, systémová napojení, marketplace operace. Pracujeme s produkty z různých kategorií: elektronika, sport, domácnost, automotive, hobby, zahrada i průmyslové zboží. Víme, kde je poptávka a kde se dá vydělat.</p>
        <p>Hledáme dobré produkty a dobré podmínky — ať už chcete jednoduše prodávat nám, nebo stavět společný obchod. Dohodnem se rychle. 👇</p>
        <p class="text-gray-600 text-xs italic mt-2">Tento web byl vygenerován za pomoci AI (Claude Sonnet 4.6) a slouží jako business vizitka.</p>
      </div>`,

      // ── Chat 1: Marketplace prodej ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">Marketplace prodej v Evropě</h2>
          <p class="text-cyan-400 text-sm font-medium">Allegro · Kaufland · cDiscount · ManoMano · Leroy Merlin · Castorama</p>
        </div>
        <p>Prodáváme na hlavních evropských marketplace platformách — primárně v <strong>CZ, DE, PL, FR, IT</strong>.</p>
        <p>Každý vstup předchází důkladný průzkum: víme, jaké jsou ceny konkurence, kde je poptávka a kde je prostor. Ceny a stavy skladu jsme schopni aktualizovat skoro v reálném čase — nezaspíme výprodej ani výkyv trhu.</p>
        <p>Zeptejte se na konkrétní platformy, trhy nebo kategorie. 👇</p>
      </div>`,

      // ── Chat 2: Jak spolupracujeme ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">Jak spolupracujeme</h2>
          <p class="text-cyan-400 text-sm font-medium">Jeden meeting · Rychlý start · Bez zbytečné byrokracie</p>
        </div>
        <p>Vše dohodneme po emailu, nebo na <strong>jednom meetingu</strong>. Řeknete nám, co máte, za kolik a za jakých podmínek — my řekneme, jestli to dává smysl a jak chceme spolupracovat. Žádné složité onboardingy.</p>
        <p>Můžeme být jednoduše vaším odběratelem, nebo můžeme stavět komplexnější model — fulfillment, replenishment, flash sale, sezónní kampaně. Rozhodnutí je vždy na obou stranách. 👇</p>
      </div>`,

      // ── Chat 3: Systémové napojení ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">Systémové napojení</h2>
          <p class="text-cyan-400 text-sm font-medium">Napojíme cokoliv · Vy se nemusíte starat · Vyřešíme s vaším IT</p>
        </div>
        <p>Systémové napojení řešíme za vás — <strong>stačí nám kontakt na vašeho ajťáka nebo IT dodavatele</strong> a my s ním domluvíme vše technické přímo, bez vašeho zapojení.</p>
        <p>Výsledek: vaše a naše ceny, skladové zásoby a objednávky se synchronizují automaticky mezi vaším systémem a marketplace platformami. Bez ruční práce, bez chyb, bez zpoždění. 👇</p>
      </div>`,
    ],

    en: [
      // ── Chat 0: Who we are ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">Joined.cz</h2>
          <p class="text-cyan-400 text-sm font-medium">E-commerce operations · Technical business sale partner · CZ / DE / PL / FR / IT</p>
        </div>
        <p>We are a <strong>trading company</strong> from the IT and startup community — we buy, we sell, and we operate our own sales channels on marketplace platforms across Central and Western Europe.</p>
        <p>Behind us are years of real-world e-commerce experience — running e-shops, online marketing, system integrations, marketplace operations. We work across product categories: electronics, sports, home, automotive, hobby, garden and industrial goods. We know where the demand is and where margins hold.</p>
        <p>We're looking for good products and good terms — whether you want to simply sell to us, or build something together. We move fast. 👇</p>
        <p class="text-gray-600 text-xs italic mt-2">This website was generated with the help of AI (Claude Sonnet 4.6) and serves as a business card.</p>
      </div>`,

      // ── Chat 1: Marketplace sales ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">Marketplace Sales in Europe</h2>
          <p class="text-cyan-400 text-sm font-medium">Allegro · Kaufland · cDiscount · ManoMano · Leroy Merlin · Castorama</p>
        </div>
        <p>We sell on major European marketplace platforms — primarily in <strong>CZ, DE, PL, FR, IT</strong>.</p>
        <p>Every market entry is preceded by thorough research: we know competitor prices, where demand is and where there's room. We can update prices and inventory near real-time — we don't miss a flash sale or a market shift.</p>
        <p>Ask about specific platforms, markets or categories. 👇</p>
      </div>`,

      // ── Chat 2: How we partner ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">How we partner</h2>
          <p class="text-cyan-400 text-sm font-medium">One meeting · Fast start · No unnecessary bureaucracy</p>
        </div>
        <p>Everything gets agreed over email, or in <strong>one meeting</strong>. Tell us what you have, at what price, and under what terms — we'll say whether it makes sense and how we want to work together. No complex onboarding.</p>
        <p>We can be your straightforward buyer, or we can build something more structured — fulfillment, replenishment, flash sales, seasonal campaigns. The decision is always on both sides. 👇</p>
      </div>`,

      // ── Chat 3: System connectivity ──
      `<div class="space-y-4">
        <div class="bg-cyan-500/5 border border-cyan-400/20 rounded-sm p-5">
          <h2 class="text-2xl font-bold text-white mb-2">System connectivity</h2>
          <p class="text-cyan-400 text-sm font-medium">We connect anything · You don't need to worry · We'll sort it with your IT</p>
        </div>
        <p>We handle the technical side for you — <strong>just give us your IT contact or system provider</strong> and we'll coordinate everything directly with them, without pulling you in.</p>
        <p>The result: your and our prices, stock levels and orders sync automatically between your system and the marketplace platforms. No manual work, no errors, no delays. 👇</p>
      </div>`,
    ],
  }

  const html = allMessages[lang.value][chatIndex] ?? allMessages[lang.value][0]
  return { role: 'assistant', html }
}

function getChipsForChat(chatIndex: number): Chip[] {
  const allSets: Record<Lang, Chip[][]> = {
    cs: [
      // ── Chat 0: Kdo jsme ──
      [
        {
          id: 'what-we-do',
          label: 'Co přesně děláme?',
          sublabel: 'Sales na marketplace a e-shopech',
          response: `
            <div class="space-y-3">
              <p>Naším hlavním businessem je <strong>technický sales</strong> — prodej produktů partnerů na evropských marketplace platformách a e-shopech:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🛒 <strong>Marketplace sales</strong> – Amazon, cDiscount, Leroy Merlin, Allegro, ManoMano, Castorama</li>
                <li>🏪 <strong>E-shop operace</strong> – provoz vlastních obchodních kanálů</li>
                <li>🔗 <strong>Systémové napojení</strong> – ERP integrace, feed management, middleware</li>
                <li>🌍 <strong>Aktivní trhy</strong> – CZ, DE, PL, FR, IT</li>
              </ul>
              <p>Pracujeme s různými business modely — <strong>dropshipping, fulfillment, replenishment, longtailing</strong>. Zvolíme to, co dává smysl pro konkrétní produkt a trh.</p>
            </div>`,
        },
        {
          id: 'experience',
          label: 'Jakou máme zkušenost?',
          sublabel: 'E-commerce, integrace, trhy',
          response: `
            <div class="space-y-3">
              <p>Za námi stojí roky praxe napříč celým e-commerce stackem:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📦 <strong>Marketplace operace</strong> – vertikální i horizontální marketplaces, flash sales a private marketplaces</li>
                <li>🏗️ <strong>E-shopy</strong> – od spuštění po škálování, různé platformy a trhy</li>
                <li>📣 <strong>Online marketing</strong> – PPC, SEO, srovnávače, feed optimalizace</li>
                <li>⚙️ <strong>Systémové integrace</strong> – ERP (Pohoda, SAP, Money S3), BaseLinker, Mergado</li>
                <li>🧩 <strong>Startup prostředí</strong> – umíme stavět od nuly, pracovat rychle, rozhodovat se na základě dat</li>
              </ul>
            </div>`,
        },
        {
          id: 'cooperation-model',
          label: 'Jak funguje spolupráce?',
          sublabel: 'Jednoduše — jsme odběratel, ne agentura',
          response: `
            <div class="space-y-3">
              <p>Spolupráce je přímá — jsme obchodní partner, ne zprostředkovatel:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🤝 <strong>Přímý odběratel</strong> – nakoupíme od vás zboží a prodáváme na vlastní účet, vlastní riziko</li>
                <li>📦 <strong>Nákup-prodej</strong> – klasický B2B obchod, fakturujete nám, my řešíme zbytek</li>
                <li>🔄 <strong>Sdílený model</strong> – dohodnuté podmínky, vy dodáváte, my prodáváme a dělíme se o výsledek</li>
                <li>🚀 <strong>Rychlý start</strong> – od meetingu po první objednávku typicky 2–4 týdny</li>
              </ul>
              <p>Vy znáte produkt, my známe terén.</p>
            </div>`,
        },
        {
          id: 'markets',
          label: 'Kde jsme aktivní?',
          sublabel: 'Trhy a platformy',
          response: `
            <div class="space-y-3">
              <p>Aktuálně aktivní nebo ve výhledu:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🇨🇿 <strong>CZ</strong> – Allegro, Alza</li>
                <li>🇩🇪 <strong>DE</strong> – Kaufland, Amazon.de</li>
                <li>🇵🇱 <strong>PL</strong> – Castorama, Leroy Merlin, Allegro, eMag</li>
                <li>🇫🇷 <strong>FR</strong> – cDiscount, ManoMano, Leroy Merlin, Castorama</li>
              </ul>
              <p>Pro vaše produkty vždy hledáme trh, kde je největší poptávka, IT nám nestojí v cestě, je to náš nástroj.</p>
            </div>`,
        },
        {
          id: 'contact',
          label: 'Kontakt',
          sublabel: 'Jak se spojit',
          response: `
            <div class="space-y-3">
              <p>Nejrychlejší cesta k nám:</p>
              <div class="bg-white/4 rounded-sm p-4 space-y-2 not-prose">
                <p class="text-gray-300">📧 <strong class="text-white">obchod@joined.cz</strong></p>
                <p class="text-gray-300">📍 Praha, Česká republika</p>
              </div>
            </div>`,
        },
      ],

      // ── Chat 1: Marketplace prodej ──
      [
        {
          id: 'mp-platforms',
          label: 'Na jakých platformách prodáváme?',
          sublabel: 'Allegro, Kaufland, cDiscount…',
          response: `
            <div class="space-y-3">
              <p>Aktuálně aktivní nebo rozbíhané:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🇨🇿 <strong>CZ</strong> – Allegro, Alza</li>
                <li>🇩🇪 <strong>DE</strong> – Kaufland, Amazon.de</li>
                <li>🇵🇱 <strong>PL</strong> – Castorama, Leroy Merlin, Allegro, eMag</li>
                <li>🇫🇷 <strong>FR</strong> – cDiscount, ManoMano, Leroy Merlin, Castorama</li>
              </ul>
              <p>Každá platforma má jiná pravidla a přístup k zákazníkovi. Víme, jak na každé z nich provozovat ziskový provoz.</p>
            </div>`,
        },
        {
          id: 'mp-models',
          label: 'Jaké business modely používáme?',
          sublabel: 'Dropshipping, nákup-prodej, longtail',
          response: `
            <div class="space-y-3">
              <p>Přizpůsobujeme se podle produktu, marže a partnera:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🚚 <strong>Dropshipping</strong> – objednávka jde přímo k vám, my řídíme prodej a zákaznický servis</li>
                <li>📦 <strong>Nákup-prodej</strong> – nakoupíme zboží a prodáváme z vlastního skladu nebo FBA</li>
                <li>🔎 <strong>Longtail strategie</strong> – velký katalog, menší marže na kus, objem dělá výsledek</li>
                <li>🤝 <strong>Hybrid</strong> – kombinace modelů dle kategorie nebo trhu</li>
              </ul>
              <p>Na meetingu vybereme model, který dává smysl pro vaše produkty a podmínky.</p>
            </div>`,
        },
        {
          id: 'mp-products',
          label: 'Jaké produkty prodáváme?',
          sublabel: 'Kategorie, výběr, průzkum trhu',
          response: `
            <div class="space-y-3">
              <p>Pracujeme s produkty z různých kategorií — nejsme specializovaní jen na jednu oblast:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🔧 <strong>Nářadí, hobby & DIY</strong> – silná a stabilní poptávka napříč EU</li>
                <li>🏠 <strong>Domácnost & zahrada</strong> – sezónní i celoroční kategorie</li>
                <li>⚡ <strong>Elektronika & příslušenství</strong> – rychlý obrat, citlivé na cenu</li>
                <li>🚗 <strong>Automotive & sport</strong> – longtail potenciál, méně konkurence</li>
                <li>🏭 <strong>Průmyslové & B2B produkty</strong> – stabilní marže, opakované objednávky</li>
              </ul>
              <p>Před každým vstupem analyzujeme poptávku, ceny konkurence a potenciální marži. Nezačínáme naslepo.</p>
            </div>`,
        },
        {
          id: 'mp-onboarding',
          label: 'Jak probíhá onboarding?',
          sublabel: 'Od meetingu po první prodej',
          response: `
            <div class="space-y-3">
              <p>Typický průběh od prvního kontaktu po spuštění:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>1️⃣ <strong>Meeting</strong> – produkty, ceny, business model, podmínky</li>
                <li>2️⃣ <strong>Feed / ceník</strong> – vy pošlete data, my napojíme do systémů</li>
                <li>3️⃣ <strong>Listing</strong> – Listing na marketplaces není vždy jednoduchý, proto se o něj staráme my</li>
                <li>4️⃣ <strong>Launch</strong> – spuštění na platformě, první objednávky</li>
                <li>5️⃣ <strong>Reporting</strong> – pravidelný přehled prodejů, marží, výkonu</li>
              </ul>
              <p>Od meetingu po první listing typicky <strong>2–4 týdny</strong>.</p>
            </div>`,
        },
      ],

      // ── Chat 2: Jak spolupracujeme ──
      [
        {
          id: 'first-meeting',
          label: 'Jak vypadá první meeting?',
          sublabel: 'Agenda a výstup',
          response: `
            <div class="space-y-3">
              <p>Na prvním meetingu projdeme vše, co potřebujeme vědět:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📋 <strong>Váš katalog</strong> – jaké produkty, kategorie, ceny</li>
                <li>🌍 <strong>Cílové trhy</strong> – kde chcete nebo kde vidíme příležitost</li>
                <li>📦 <strong>Business model</strong> – dropshipping / fulfillment / replenishment / longtailing</li>
                <li>💰 <strong>Cenové podmínky</strong> – výkupní ceny, marže, revenue share</li>
                <li>🔗 <strong>Logistika</strong> – expedice z vaší strany nebo z naší / FBA</li>
              </ul>
              <p>Výstup: jasná dohoda nebo konkrétní next steps. Bez zbytečného táhnutí.</p>
            </div>`,
        },
        {
          id: 'partner-requirements',
          label: 'Co potřebujeme od partnera?',
          sublabel: 'Jako každý odběratel',
          response: `
            <div class="space-y-3">
              <p>Jako od každého dodavatele — nic víc, nic míň:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📄 <strong>Ceník nebo nabídkový list</strong> – nákupní ceny, MOQ, případně EAN kódy</li>
                <li>📦 <strong>Dodací podmínky</strong> – sklady, lead time, minimální objednávky</li>
                <li>💳 <strong>Platební podmínky</strong> – splatnost, způsob fakturace</li>
                <li>✅ <strong>Reklamační a vrátky</strong> – postup při vadném zboží nebo vrácení od zákazníka</li>
              </ul>
              <p>Technické věci jako produktové fotky nebo popisky si dokážeme obstarat sami. Potřebujeme hlavně vědět, za kolik a za jakých podmínek.</p>
            </div>`,
        },
        {
          id: 'business-models',
          label: 'Modely a typy spolupráce',
          sublabel: 'Fulfillment, replenishment, flash sale…',
          response: `
            <div class="space-y-3">
              <p>Rozumíme všem standardním modelům v e-commerce — přizpůsobíme se vašim potřebám:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📦 <strong>Přímý nákup</strong> – nakoupíme od vás, prodáváme na vlastní účet a vlastní riziko</li>
                <li>🚚 <strong>Consignment / dropshipping</strong> – zboží expedujete vy na naši objednávku</li>
                <li>🏭 <strong>Fulfillment</strong> – vaše zboží na našem nebo FBA skladě, my řídíme prodej</li>
                <li>🔄 <strong>Replenishment</strong> – pravidelné nákupy dle prodejů a sezóny</li>
                <li>⚡ <strong>Flash sale / výprodeje</strong> – odkoupíme přebytky nebo sezónní zboží</li>
                <li>📅 <strong>Sezónní kampaně</strong> – dohodnutý objem na Black Friday, Vánoce, sezónu</li>
                <li>🎁 <strong>Bundle deals</strong> – nakoupíme komplementární produkty a prodáváme jako set</li>
                <li>🔎 <strong>Longtail</strong> – velký katalog, pravidelné menší objednávky, stabilní obrat</li>
              </ul>
            </div>`,
        },
        {
          id: 'our-scope',
          label: 'Co je na naší straně?',
          sublabel: 'Vše — to je náš business',
          response: `
            <div class="space-y-3">
              <p>Jakmile máme zboží, vše ostatní je naše starost — ne vaše:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🗂️ <strong>Produktové stránky</strong> – listing, fotky, texty, lokalizace do cílového jazyka</li>
                <li>💶 <strong>Pricing</strong> – nastavení a průběžná optimalizace cen dle trhu a konkurence</li>
                <li>📣 <strong>Reklama</strong> – PPC kampaně na platformách, kde to má smysl</li>
                <li>📞 <strong>Zákaznický servis</strong> – komunikace se zákazníky, reklamace, vrácení zboží</li>
                <li>📊 <strong>Reporting</strong> – pravidelný přehled obratu a výkonu, pokud o něj stojíte</li>
              </ul>
              <p>Nespravujeme váš účet. Máme vlastní — a staráme se o něj sami.</p>
            </div>`,
        },
      ],

      // ── Chat 3: Systémové napojení ──
      [
        {
          id: 'how-it-works',
          label: 'Jak napojení funguje?',
          sublabel: 'Jednoduše — řešíme to za vás',
          response: `
            <div class="space-y-3">
              <p>Celý proces je jednoduchý — technické detaily jsou naše starost:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>1️⃣ <strong>Dohodnem spolupráci</strong> – produkty, ceny, podmínky</li>
                <li>2️⃣ <strong>Vy nám dáte kontakt</strong> na vašeho ajťáka nebo IT dodavatele</li>
                <li>3️⃣ <strong>My si domluvíme s ním</strong> vše technické — napojení, přístupy, testování</li>
                <li>4️⃣ <strong>Vy dostanete výsledek</strong> – automatická synchronizace bez ruční práce</li>
              </ul>
              <p>Nemusíte rozumět tomu, jak to funguje pod kapotou. Stačí, že to funguje.</p>
            </div>`,
        },
        {
          id: 'what-we-need',
          label: 'Co od vás potřebujeme?',
          sublabel: 'Minimum z vaší strany',
          response: `
            <div class="space-y-3">
              <p>Ze strany IT potřebujeme skutečně minimum:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📞 <strong>Kontakt na vašeho ajťáka</strong> – interní IT nebo dodavatel systému</li>
                <li>🔑 <strong>Přístupy k systému</strong> – váš IT člověk ví, co to znamená</li>
                <li>📋 <strong>Základní info o datech</strong> – co máte v systému (ceny, sklad, produkty)</li>
              </ul>
              <p>Zbytek — způsob napojení, testování, spuštění — vyřešíme s vaším IT bez vašeho zapojení.</p>
            </div>`,
        },
        {
          id: 'integration-timeline',
          label: 'Jak dlouho napojení trvá?',
          sublabel: 'Od dohody po spuštění',
          response: `
            <div class="space-y-3">
              <p>Záleží na vašem systému, ale zpravidla:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📄 <strong>Objednávky přes CSV/XLSX</strong> – 1–2 týdny</li>
                <li>⚡ <strong>Ceník v tabulce nebo souboru</strong> – 1–2 týdny</li>
                <li>📦 <strong>Standardní účetní systém</strong> (Pohoda, Money, vlastní ERP) – 2–4 týdny</li>
                <li>🏢 <strong>Komplexnější systém</strong> (SAP, více skladů, custom) – 4–8 týdnů</li>
              </ul>
              <p>Pošlete nám kontakt na vašeho ajťáka a my vám dáme konkrétní odhad do 48 hodin.</p>
            </div>`,
        },
      ],
    ],

    en: [
      // ── Chat 0: Who we are ──
      [
        {
          id: 'what-we-do',
          label: 'What exactly do we do?',
          sublabel: 'Sales on marketplaces and e-shops',
          response: `
            <div class="space-y-3">
              <p>Our core business is <strong>technical sales</strong> — selling partner products on European marketplace platforms and e-shops:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🛒 <strong>Marketplace sales</strong> – Amazon, cDiscount, Leroy Merlin, Allegro, ManoMano, Castorama</li>
                <li>🏪 <strong>E-shop operations</strong> – running our own sales channels</li>
                <li>🔗 <strong>System connectivity</strong> – ERP integrations, feed management, middleware</li>
                <li>🌍 <strong>Active markets</strong> – CZ, DE, PL, FR, IT</li>
              </ul>
              <p>We work with various business models — <strong>dropshipping, fulfillment, replenishment, longtailing</strong>. We pick what makes sense for the specific product and market.</p>
            </div>`,
        },
        {
          id: 'experience',
          label: 'What is our experience?',
          sublabel: 'E-commerce, integrations, markets',
          response: `
            <div class="space-y-3">
              <p>Behind us are years of hands-on experience across the full e-commerce stack:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📦 <strong>Marketplace operations</strong> – vertical &amp; horizontal marketplaces, flash sales and private marketplaces</li>
                <li>🏗️ <strong>E-shops</strong> – from launch to scaling, across platforms and markets</li>
                <li>📣 <strong>Online marketing</strong> – PPC, SEO, price comparison sites, feed optimization</li>
                <li>⚙️ <strong>System integrations</strong> – ERP (Pohoda, SAP, Money S3), BaseLinker, Mergado</li>
                <li>🧩 <strong>Startup environment</strong> – we know how to build from scratch, move fast, and decide based on data</li>
              </ul>
            </div>`,
        },
        {
          id: 'cooperation-model',
          label: 'How does cooperation work?',
          sublabel: 'Simple — we\'re a buyer, not an agency',
          response: `
            <div class="space-y-3">
              <p>Straightforward — we're a business partner, not a middleman:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🤝 <strong>Direct buyer</strong> – we purchase from you and sell on our own account, our own risk</li>
                <li>📦 <strong>Buy-sell</strong> – classic B2B trade, you invoice us, we handle the rest</li>
                <li>🔄 <strong>Shared model</strong> – agreed terms, you supply, we sell and share the result</li>
                <li>🚀 <strong>Fast start</strong> – from meeting to first order typically 2–4 weeks</li>
              </ul>
              <p>You know the product, we know the terrain.</p>
            </div>`,
        },
        {
          id: 'markets',
          label: 'Where are we active?',
          sublabel: 'Markets and platforms',
          response: `
            <div class="space-y-3">
              <p>Currently active or in pipeline:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🇨🇿 <strong>CZ</strong> – Allegro, Alza</li>
                <li>🇩🇪 <strong>DE</strong> – Kaufland, Amazon.de</li>
                <li>🇵🇱 <strong>PL</strong> – Castorama, Leroy Merlin, Allegro, eMag</li>
                <li>🇫🇷 <strong>FR</strong> – cDiscount, ManoMano, Leroy Merlin, Castorama</li>
              </ul>
              <p>We always find the market where demand is highest for your products — IT is our tool, not our obstacle.</p>
            </div>`,
        },
        {
          id: 'contact',
          label: 'Contact',
          sublabel: 'How to reach us',
          response: `
            <div class="space-y-3">
              <p>The fastest way to reach us:</p>
              <div class="bg-white/4 rounded-sm p-4 space-y-2 not-prose">
                <p class="text-gray-300">📧 <strong class="text-white">obchod@joined.cz</strong></p>
                <p class="text-gray-300">📍 Prague, Czech Republic</p>
              </div>
            </div>`,
        },
      ],

      // ── Chat 1: Marketplace sales ──
      [
        {
          id: 'mp-platforms',
          label: 'Which platforms do we sell on?',
          sublabel: 'Allegro, Kaufland, cDiscount…',
          response: `
            <div class="space-y-3">
              <p>Currently active or ramping up:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🇨🇿 <strong>CZ</strong> – Allegro, Alza</li>
                <li>🇩🇪 <strong>DE</strong> – Kaufland, Amazon.de</li>
                <li>🇵🇱 <strong>PL</strong> – Castorama, Leroy Merlin, Allegro, eMag</li>
                <li>🇫🇷 <strong>FR</strong> – cDiscount, ManoMano, Leroy Merlin, Castorama</li>
              </ul>
              <p>Each platform has different rules and customer service standards. We know how to run profitable operations on all of them.</p>
            </div>`,
        },
        {
          id: 'mp-models',
          label: 'What business models do we use?',
          sublabel: 'Dropshipping, buy-sell, longtail',
          response: `
            <div class="space-y-3">
              <p>We adapt to the product, margin, and partner:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🚚 <strong>Dropshipping</strong> – orders go directly to you, we handle sales and customer service</li>
                <li>📦 <strong>Buy-sell</strong> – we purchase stock and sell from our own warehouse or FBA</li>
                <li>🔎 <strong>Longtail strategy</strong> – large catalog, lower per-unit margin, volume drives results</li>
                <li>🤝 <strong>Hybrid</strong> – combination of models depending on category or market</li>
              </ul>
              <p>We'll choose the model that makes sense for your products and terms.</p>
            </div>`,
        },
        {
          id: 'mp-products',
          label: 'What products do we sell?',
          sublabel: 'Categories, selection, market research',
          response: `
            <div class="space-y-3">
              <p>We work across product categories — we're not limited to one segment:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🔧 <strong>Tools, hobby & DIY</strong> – strong and stable demand across EU</li>
                <li>🏠 <strong>Home & garden</strong> – seasonal and year-round categories</li>
                <li>⚡ <strong>Electronics & accessories</strong> – fast turnover, price-sensitive</li>
                <li>🚗 <strong>Automotive & sports</strong> – longtail potential, less competition</li>
                <li>🏭 <strong>Industrial & B2B goods</strong> – stable margins, repeat orders</li>
              </ul>
              <p>Before every launch we analyse demand, competitor pricing and potential margin. We don't go in blind.</p>
            </div>`,
        },
        {
          id: 'mp-onboarding',
          label: 'How does onboarding work?',
          sublabel: 'From meeting to first sale',
          response: `
            <div class="space-y-3">
              <p>Typical flow from first contact to launch:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>1️⃣ <strong>Meeting</strong> – products, pricing, business model, terms</li>
                <li>2️⃣ <strong>Feed / price list</strong> – you send the data, we connect it to our systems</li>
                <li>3️⃣ <strong>Listing</strong> – Marketplace listing isn't always straightforward, so we handle it ourselves</li>
                <li>4️⃣ <strong>Launch</strong> – going live on the platform, first orders</li>
                <li>5️⃣ <strong>Reporting</strong> – regular overview of sales, margins, performance</li>
              </ul>
              <p>From meeting to first listing typically <strong>2–4 weeks</strong>.</p>
            </div>`,
        },
      ],

      // ── Chat 2: How we partner ──
      [
        {
          id: 'first-meeting',
          label: 'What does the first meeting look like?',
          sublabel: 'Agenda and outcome',
          response: `
            <div class="space-y-3">
              <p>In the first meeting we cover everything we need to know:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📋 <strong>Your catalog</strong> – what products, categories, prices</li>
                <li>🌍 <strong>Target markets</strong> – where you want to be or where we see opportunity</li>
                <li>📦 <strong>Business model</strong> – dropshipping / fulfillment / replenishment / longtailing</li>
                <li>💰 <strong>Pricing terms</strong> – wholesale prices, margin, revenue share</li>
                <li>🔗 <strong>Logistics</strong> – fulfillment from your side or ours / FBA</li>
              </ul>
              <p>Outcome: a clear agreement or concrete next steps. No unnecessary dragging.</p>
            </div>`,
        },
        {
          id: 'partner-requirements',
          label: 'What do we need from a partner?',
          sublabel: 'Like any buyer would ask',
          response: `
            <div class="space-y-3">
              <p>Same as any buyer — nothing more, nothing less:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📄 <strong>Price list or offer</strong> – wholesale prices, MOQ, EAN codes if available</li>
                <li>📦 <strong>Delivery terms</strong> – warehouse location, lead time, minimum orders</li>
                <li>💳 <strong>Payment terms</strong> – payment period, invoicing method</li>
                <li>✅ <strong>Returns policy</strong> – process for defective goods or customer returns</li>
              </ul>
              <p>Product photos and descriptions we can sort ourselves. We mainly need to know the price and terms.</p>
            </div>`,
        },
        {
          id: 'business-models',
          label: 'Cooperation models',
          sublabel: 'Fulfillment, replenishment, flash sale…',
          response: `
            <div class="space-y-3">
              <p>We understand all standard e-commerce models — we'll adapt to your needs:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📦 <strong>Direct purchase</strong> – we buy from you, sell on our own account and risk</li>
                <li>🚚 <strong>Consignment / dropshipping</strong> – you ship on our order</li>
                <li>🏭 <strong>Fulfillment</strong> – your goods at our or FBA warehouse, we run the sales</li>
                <li>🔄 <strong>Replenishment</strong> – regular purchasing based on sales and season</li>
                <li>⚡ <strong>Flash sales</strong> – we buy surplus or seasonal stock for concentrated campaigns</li>
                <li>📅 <strong>Seasonal campaigns</strong> – agreed volume for Black Friday, Christmas, season</li>
                <li>🎁 <strong>Bundle deals</strong> – we buy complementary products and sell as a set</li>
                <li>🔎 <strong>Longtail</strong> – large catalog, regular smaller orders, steady turnover</li>
              </ul>
            </div>`,
        },
        {
          id: 'our-scope',
          label: 'What\'s on our side?',
          sublabel: 'Everything — that\'s our business',
          response: `
            <div class="space-y-3">
              <p>Once we have the goods, everything else is our problem — not yours:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🗂️ <strong>Product pages</strong> – listing, photos, copy, localization into target language</li>
                <li>💶 <strong>Pricing</strong> – setting and ongoing optimization based on market and competition</li>
                <li>📣 <strong>Advertising</strong> – PPC campaigns on platforms where it makes sense</li>
                <li>📞 <strong>Customer service</strong> – buyer communication, claims, returns handling</li>
                <li>📊 <strong>Reporting</strong> – regular sales and performance overview if you want it</li>
              </ul>
              <p>We don't manage your account. We have our own — and we take care of it ourselves.</p>
            </div>`,
        },
      ],

      // ── Chat 3: System connectivity ──
      [
        {
          id: 'how-it-works',
          label: 'How does connectivity work?',
          sublabel: 'Simple — we handle it for you',
          response: `
            <div class="space-y-3">
              <p>The whole process is straightforward — technical details are our problem:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>1️⃣ <strong>We agree on the partnership</strong> – products, pricing, terms</li>
                <li>2️⃣ <strong>You give us a contact</strong> for your IT person or system provider</li>
                <li>3️⃣ <strong>We coordinate with them</strong> directly — connection, access, testing</li>
                <li>4️⃣ <strong>You get the result</strong> – automatic sync, no manual work</li>
              </ul>
              <p>You don't need to understand how it works under the hood. You just need it to work.</p>
            </div>`,
        },
        {
          id: 'what-we-need',
          label: 'What do we need from you?',
          sublabel: 'Minimum on your side',
          response: `
            <div class="space-y-3">
              <p>On the IT side, we need very little from you:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📞 <strong>Your IT contact</strong> – internal IT or your system provider</li>
                <li>🔑 <strong>System access</strong> – your IT person knows what that means</li>
                <li>📋 <strong>Basic data info</strong> – what's in your system (prices, stock, products)</li>
              </ul>
              <p>The rest — how exactly we connect, testing, go-live — we sort out with your IT without your involvement.</p>
            </div>`,
        },
        {
          id: 'integration-timeline',
          label: 'How long does it take?',
          sublabel: 'From agreement to go-live',
          response: `
            <div class="space-y-3">
              <p>Depends on your system, but typically:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📄 <strong>Orders via CSV/XLSX</strong> – 1–2 weeks</li>
                <li>⚡ <strong>Price list in a spreadsheet or file</strong> – 1–2 weeks</li>
                <li>📦 <strong>Standard accounting system</strong> (Pohoda, Money, custom ERP) – 2–4 weeks</li>
                <li>🏢 <strong>More complex setup</strong> (SAP, multiple warehouses, custom) – 4–8 weeks</li>
              </ul>
              <p>Send us your IT contact and we'll give you a concrete estimate within 48 hours.</p>
            </div>`,
        },
      ],
    ],
  }

  return allSets[lang.value][chatIndex] ?? allSets[lang.value][0]
}

/* ---- State ---- */
const sidebarOpen = ref(false)
const isTyping = ref(false)
const chatContainer = ref<HTMLElement | null>(null)
const activeChatIndex = ref(0)
const chatStates = ref<ChatState[]>([])
const formOpen = ref(false)
const formEmail = ref('')
const formMessage = ref('')

/* ---- Popup state ---- */
const popupOpen = ref(false)
const popupTitle = ref('')
const popupContent = ref('')
const popupPosition = ref<'bottom-left' | 'top-right'>('bottom-left')

const popupData = computed(() => {
  const data: Record<Lang, Record<string, { title: string; body: string }>> = {
    cs: {
      aboutUs: {
        title: 'O nás',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Kdo jsme</h4>
            <p>Jsme technicky <strong>obchodní firma</strong> z IT a startupové komunity. Nakupujeme zboží, prodáváme ho na vlastních prodejních kanálech a marketplace platformách ve střední a západní Evropě — primárně v CZ, DE, PL, FR, IT.</p>
            <p>Nejsme agentura ani zprostředkovatel. Neseme vlastní riziko, děláme vlastní rozhodnutí. Za námi stojí roky reálné praxe v e-commerce: vlastní e-shopy, marketplace operace, systémová napojení.</p>
            <h4 class="text-white font-semibold text-base">Co hledáme</h4>
            <p>Hledáme dobré produkty a férové podmínky. Můžeme být jednoduše vaším odběratelem — fakturujete nám, my se staráme o zbytek. Nebo se dohodneme na komplexnějším modelu, pokud to dává smysl pro obě strany.</p>
            <h4 class="text-white font-semibold text-base">Jak pracujeme</h4>
            <p>Přímá komunikace. Rychlá rozhodnutí. Žádné sliby na které se čeká rok.</p>
          </div>`,
      },
      contact: {
        title: 'Kontakt',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Spojte se s námi</h4>
            <p>Nejrychlejší cesta je e-mail. Na první kontakt odpovídáme obvykle do 24 hodin.</p>
            <div class="bg-white/5 rounded-lg p-4 space-y-2">
              <p>📧 <strong class="text-white">obchod@joined.cz</strong></p>
              <p>📍 <strong class="text-white">Praha, Česká republika</strong></p>
            </div>
            <h4 class="text-white font-semibold text-base">Fakturační údaje</h4>
            <p>Joined.cz s.r.o. · IČO: 24945455 · Praha, CZ </p>
            <h4 class="text-white font-semibold text-base">Pracovní dostupnost</h4>
            <p>Po–Pá, 9:00–18:00. Flexibilní pro mezinárodní partnery.</p>
            <h4 class="text-white font-semibold text-base">Zpracování osobních údajů</h4>
            <p class="text-gray-400 text-sm">Tento web slouží výhradně jako B2B vizitka. Neprovozujeme analytiku, nepoužíváme tracking cookies a neshromažďujeme žádná osobní data. Kontakt na obchod@joined.cz slouží výhradně k obchodní komunikaci.</p>
          </div>`,
      },
      partners: {
        title: 'Partneři',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Koho hledáme</h4>
            <p>Hledáme <strong>dodavatele, výrobce a distributory</strong>, od kterých chceme nakupovat. Nepotřebujeme váš marketing ani vaši infrastrukturu — jen dobré produkty a férové nákupní podmínky.</p>
            <p>Funguje to nejlépe, pokud máte standardizované produkty s EAN, rozumnou nákupní cenu a zájem o prodej na trzích střední a západní Evropy.</p>
            <h4 class="text-white font-semibold text-base">Jak to funguje</h4>
            <p>Jeden meeting a pár emailů, dohodnuté podmínky, ceník nebo nabídkový list — a jedeme. Od prvního kontaktu po první objednávku typicky 2–4 týdny.</p>
            <h4 class="text-white font-semibold text-base">Jak začít</h4>
            <p>Napište nám na <strong>obchod@joined.cz</strong>, určitě dokážeme najít variantu, která bude vyhovovat oběma stranám.</p>
          </div>`,
      },
      marketplaces: {
        title: 'Marketplaces',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Kde prodáváme</h4>
            <ul class="space-y-1 list-none pl-0">
              <li>🇨🇿 <strong>CZ</strong> – Allegro, Alza</li>
              <li>🇩🇪 <strong>DE</strong> – Kaufland, Amazon.de</li>
              <li>🇵🇱 <strong>PL</strong> – Castorama, Leroy Merlin, Allegro, eMag</li>
              <li>🇫🇷 <strong>FR</strong> – cDiscount, ManoMano, Leroy Merlin, Castorama</li>
            </ul>
            <h4 class="text-white font-semibold text-base">Business modely</h4>
            <p>Dropshipping, nákup-prodej, longtail strategie nebo revenue share. Vybereme model, který dává smysl pro konkrétní produkt a trh.</p>
            <h4 class="text-white font-semibold text-base">Co řídíme sami</h4>
            <p>Listing, content, pricing, reklama, zákaznický servis, logistika. Vše na vlastních účtech, vlastní zodpovědností — od nákupu po doručení zákazníkovi.</p>
          </div>`,
      },
      dev: {
        title: 'Systémy',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Systémy a nástroje</h4>
            <p>Pracujeme s nástroji, které jsou standardem v e-commerce — pro správu objednávek, feedů, skladů, reklamy i napojení na marketplace platformy. Neinvestujeme do jednoho řešení, ale do schopnosti pracovat s tím, co dává smysl pro daný trh a model.</p>
            <h4 class="text-white font-semibold text-base">Vlastní vývoj</h4>
            <p>Kde standardní nástroje nestačí, stavíme vlastní middleware — napojení na ERP, feed transformace, synchronizace skladů a objednávek.</p>
            <h4 class="text-white font-semibold text-base">Integrace</h4>
            <p>REST, SOAP, GraphQL, XML/CSV/JSON. Propojujeme cokoliv s čímkoliv, pokud nám to dává obchodní smysl.</p>
          </div>`,
      },
    },
    en: {
      aboutUs: {
        title: 'About us',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Who we are</h4>
            <p>We are technically a <strong>trading company</strong> from the IT and startup community. We buy products, sell them on our own sales channels and marketplace platforms across Central and Western Europe — primarily CZ, PL, FR, IT.</p>
            <p>We are not an agency or intermediary. We carry our own risk, make our own decisions. Behind us are years of hands-on e-commerce: running e-shops, marketplace operations, system integrations.</p>
            <h4 class="text-white font-semibold text-base">What we look for</h4>
            <p>Good products and fair terms. You can simply sell to us — invoice us, we handle everything else. Or we can agree on a more complex model if it makes sense for both sides.</p>
            <h4 class="text-white font-semibold text-base">How we work</h4>
            <p>Direct communication. Fast decisions. No promises that take a year to materialise.</p>
          </div>`,
      },
      contact: {
        title: 'Contact',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Get in touch</h4>
            <p>The fastest route is email. We typically respond to first contact within 24 hours.</p>
            <div class="bg-white/5 rounded-lg p-4 space-y-2">
              <p>📧 <strong class="text-white">obchod@joined.cz</strong></p>
              <p>📍 <strong class="text-white">Prague, Czech Republic</strong></p>
            </div>
            <h4 class="text-white font-semibold text-base">Company details</h4>
            <p>Joined.cz s.r.o. · ID: 24945455 · Prague, CZ</p>
            <h4 class="text-white font-semibold text-base">Availability</h4>
            <p>Mon–Fri, 9:00–18:00 CET. Flexible for international partners.</p>
            <h4 class="text-white font-semibold text-base">Personal Data</h4>
            <p class="text-gray-400 text-sm">This website serves exclusively as a B2B business card. We do not run analytics, use tracking cookies, or collect any personal data. The contact at obchod@joined.cz is used solely for business communication.</p>
          </div>`,
      },
      partners: {
        title: 'Partners',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Who we're looking for</h4>
            <p>We're looking for <strong>suppliers, manufacturers and distributors</strong> we can buy from. We don't need your marketing or infrastructure — just good products and fair purchase terms.</p>
            <p>It works best if you have standardized products with EAN codes, a reasonable wholesale price, and interest in selling across Central and Western European markets.</p>
            <h4 class="text-white font-semibold text-base">How it works</h4>
            <p>One meeting and a few emails, agreed terms, a price list or offer sheet — and we're off. From first contact to first order typically 2–4 weeks.</p>
            <h4 class="text-white font-semibold text-base">How to start</h4>
            <p>Write to <strong>obchod@joined.cz</strong> — we'll find an arrangement that works for both sides.</p>
          </div>`,
      },
      marketplaces: {
        title: 'Marketplaces',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Where we sell</h4>
            <ul class="space-y-1 list-none pl-0">
              <li>🇨🇿 <strong>CZ</strong> – Allegro, Alza</li>
              <li>🇩🇪 <strong>DE</strong> – Kaufland, Amazon.de</li>
              <li>🇵🇱 <strong>PL</strong> – Castorama, Leroy Merlin, Allegro, eMag</li>
              <li>🇫🇷 <strong>FR</strong> – cDiscount, ManoMano, Leroy Merlin, Castorama</li>
            </ul>
            <h4 class="text-white font-semibold text-base">Business models</h4>
            <p>Dropshipping, buy-sell, longtail strategy or revenue share. We pick the model that makes sense for the specific product and market.</p>
            <h4 class="text-white font-semibold text-base">What we run ourselves</h4>
            <p>Listing, content, pricing, advertising, customer service, logistics. All on our own accounts, our own responsibility — from purchase to delivery.</p>
          </div>`,
      },
      dev: {
        title: 'Systems',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Systems and tools</h4>
            <p>We work with tools that are standard in e-commerce — for order management, feeds, inventory, advertising, and marketplace platform connectivity. We don't lock into one solution, but into the ability to work with whatever makes sense for the given market and model.</p>
            <h4 class="text-white font-semibold text-base">Custom development</h4>
            <p>Where standard tools fall short, we build our own middleware — ERP connections, feed transformations, inventory and order synchronization.</p>
            <h4 class="text-white font-semibold text-base">Integrations</h4>
            <p>REST, SOAP, GraphQL, XML/CSV/JSON. We connect anything to anything, as long as it makes business sense.</p>
          </div>`,
      },
    },
  }
  return data[lang.value]
})

function openPopup(key: string, position: 'bottom-left' | 'top-right' = 'bottom-left') {
  const content = popupData.value[key]
  if (!content) return
  popupTitle.value = content.title
  popupContent.value = content.body
  popupPosition.value = position
  popupOpen.value = true
  if (window.innerWidth < 768) sidebarOpen.value = false
}

function closePopup() {
  popupOpen.value = false
}

/* ---- Initialize / Reset chats ---- */
function initializeChats() {
  chatStates.value = sidebarTitles.value.map((_, i) => ({
    messages: [getInitialMessage(i)],
    availableChips: [...getChipsForChat(i)],
    clickedChipIds: [],
  }))
  activeChatIndex.value = 0
}

/* ---- Current chat (computed shortcut) ---- */
const currentChat = computed(() => chatStates.value[activeChatIndex.value])

/* ---- Methods ---- */
async function scrollToBottom() {
  await nextTick()
  chatContainer.value?.scrollTo({
    top: chatContainer.value.scrollHeight,
    behavior: 'smooth',
  })
}

async function selectChip(chip: Chip) {
  const chat = chatStates.value[activeChatIndex.value]
  if (!chat) return

  chat.clickedChipIds.push(chip.id)

  chat.messages.push({ role: 'user', content: chip.label })
  chat.availableChips = chat.availableChips.filter((c) => c.id !== chip.id)

  isTyping.value = true
  await scrollToBottom()
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 800))

  isTyping.value = false
  chat.messages.push({ role: 'assistant', html: chip.response })
  await scrollToBottom()
}

function rebuildChatsForLang() {
  chatStates.value = chatStates.value.map((chat, i) => {
    const allChips = getChipsForChat(i)
    const messages: Message[] = [getInitialMessage(i)]

    // Replay clicked chips in new language
    for (const chipId of chat.clickedChipIds) {
      const chip = allChips.find((c) => c.id === chipId)
      if (chip) {
        messages.push({ role: 'user', content: chip.label })
        messages.push({ role: 'assistant', html: chip.response })
      }
    }

    const availableChips = allChips.filter(
      (c) => !chat.clickedChipIds.includes(c.id)
    )

    return {
      messages,
      availableChips,
      clickedChipIds: [...chat.clickedChipIds],
    }
  })
}

function openChat(index: number) {
  activeChatIndex.value = index
  if (window.innerWidth < 768) sidebarOpen.value = false
  nextTick(() => scrollToBottom())
}

/* ---- Watch language → reset chats ---- */
watch(lang, () => {
  if (chatStates.value.length) {
    rebuildChatsForLang()
  } else {
    initializeChats()
  }
})

/* ---- Lifecycle ---- */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closePopup()
}

/* ---- Cookie banner ---- */
const cookieVisible = ref(true)

onMounted(() => {
  initializeChats()
  if (window.innerWidth >= 768) sidebarOpen.value = true
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="flex h-screen bg-[#060a12] text-gray-200 font-sans cockpit-bg">
    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- ==================== POPUP ==================== -->
    <Transition name="fade">
      <div
        v-if="popupOpen"
        :class="[
          'fixed inset-0 bg-black/50 z-[60] flex',
          popupPosition === 'bottom-left'
            ? 'items-end justify-start p-6'
            : 'items-start justify-end p-6'
        ]"
        @click.self="closePopup"
      >
        <div
          class="w-[90vw] md:w-[30vw] h-[70vh] md:h-[50vh] bg-[#0d1523] border border-cyan-500/6 rounded-md flex flex-col overflow-hidden animate-fade-in"
        >
          <!-- Popup header -->
          <div class="flex items-center justify-between px-5 py-3 border-b border-cyan-500/6 shrink-0 bg-[#030710]/60">
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-mono text-cyan-400/30 uppercase tracking-[0.2em]">JOINED.CZ //</span>
              <h3 class="text-[11px] font-mono font-semibold text-cyan-400/65 uppercase tracking-wider">{{ popupTitle }}</h3>
            </div>
            <button class="p-1.5 hover:bg-cyan-500/10 rounded transition-colors" @click="closePopup">
              <svg class="w-4 h-4 text-cyan-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Popup scrollable content -->
          <div
            class="popup-content flex-1 overflow-y-auto px-5 py-4 text-sm text-gray-300"
            v-html="popupContent"
          />
        </div>
      </div>
    </Transition>

    <!-- ==================== SIDEBAR ==================== -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#030710] transition-transform duration-300 sidebar-shadow',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Logo -->
      <div class="p-4 hud-sep">
        <div class="flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-sm bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-sm font-bold hud-avatar"
          >
            <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <circle cx="9" cy="12" r="4" />
    <circle cx="15" cy="12" r="4" />
  </svg>
          </div>
          <div>
            <h1 class="text-sm font-mono font-bold tracking-widest text-white leading-none uppercase">
                JOINED<span class="text-cyan-400">.</span>CZ
              </h1>
              <p class="text-[9px] font-mono text-cyan-400/40 tracking-widest uppercase">S.R.O.</p>
          </div>
        </div>
        <div class="mt-3 pt-1.5 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1 h-1 rounded-full bg-cyan-400 hud-pulse"></span>
            <span class="text-[9px] font-mono text-cyan-400/40 uppercase tracking-wider">SYS ONLINE</span>
          </div>
          <span class="text-[9px] font-mono text-cyan-400/20 tracking-wider">v1.0</span>
        </div>
      </div>

      <!-- Mission Log -->
      <nav class="flex-1 overflow-y-auto p-3 space-y-1">
        <div class="flex items-center gap-2 px-2 mb-3">
          <span class="text-[9px] font-mono text-cyan-400/30 uppercase tracking-[0.2em]">MISSION LOG</span>
          <div class="flex-1 h-px bg-cyan-500/5"></div>
        </div>
        <div
          v-for="(title, i) in sidebarTitles"
          :key="i"
          :class="[
            'px-3 py-2 rounded text-sm cursor-pointer transition-colors flex items-center gap-2.5',
            activeChatIndex === i
              ? 'bg-cyan-400/8 text-cyan-400 hud-active-item'
              : 'text-gray-500 hover:bg-white/5 hover:text-gray-300',
          ]"
          @click="openChat(i)"
        >
          <span :class="['w-1.5 h-1.5 rounded-full shrink-0 transition-colors', activeChatIndex === i ? 'bg-cyan-400' : 'bg-cyan-400/20']" />
          <span class="truncate">{{ title }}</span>
        </div>
      </nav>

      <!-- Nav / Bottom -->
      <div class="p-3 bg-[#020509] hud-sep-top">
        <div class="flex items-center gap-2 px-1 mb-2">
          <div class="flex-1 h-px bg-cyan-500/4"></div>
          <span class="text-[9px] font-mono text-cyan-400/20 uppercase tracking-[0.2em]">NAV</span>
          <div class="flex-1 h-px bg-cyan-500/4"></div>
        </div>
        <button
          class="w-full text-left px-3 py-2 text-[11px] font-mono text-gray-500 hover:text-cyan-400/60 hover:bg-cyan-500/5 rounded uppercase tracking-wider transition-colors"
          @click="openPopup('aboutUs')"
        >
          {{ ui.aboutUs }}
        </button>
        <button
          class="w-full text-left px-3 py-2 text-[11px] font-mono text-gray-500 hover:text-cyan-400/60 hover:bg-cyan-500/5 rounded uppercase tracking-wider transition-colors"
          @click="openPopup('contact')"
        >
          {{ ui.contact }}
        </button>
      </div>
    </aside>

    <!-- ==================== MAIN ==================== -->
    <div
      :class="[
        'flex-1 flex flex-col min-w-0 transition-[margin] duration-300',
        sidebarOpen ? 'md:ml-64 md:mr-64' : '',
      ]"
    >
      <!-- Bridge Status Bar -->
      <header class="flex items-center justify-between px-4 h-12 shrink-0 bg-[#030710]/70">
        <div class="flex items-center gap-4">
          <button
            class="p-1.5 hover:bg-cyan-500/10 rounded transition-colors"
            @click="sidebarOpen = !sidebarOpen"
          >
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div class="hidden md:flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 hud-pulse"></span>
            <span class="text-[9px] font-mono text-cyan-400/40 uppercase tracking-[0.18em]">COMMS ACTIVE</span>
          </div>
        </div>
        <nav class="flex items-center gap-0.5">
          <button
            v-for="link in navLinks"
            :key="link.key"
            class="px-3 py-1.5 text-[10px] font-mono text-gray-500 hover:text-cyan-400/70 hover:bg-cyan-500/5 rounded uppercase tracking-wider transition-colors"
            @click="openPopup(link.key, 'top-right')"
          >
            {{ link.label }}
          </button>
          <div class="w-px h-4 bg-cyan-500/15 mx-1" />
          <button
            class="px-3 py-1.5 text-[10px] font-mono text-gray-500 hover:text-cyan-400/70 hover:bg-cyan-500/5 rounded uppercase tracking-wider transition-colors"
            @click="toggleLang"
          >
            {{ lang === 'cs' ? 'EN' : 'CZ' }}
          </button>
        </nav>
      </header>

      <!-- Channel Indicator -->
      <div class="px-6 py-2 bg-[#030710]/50 shrink-0">
        <div class="max-w-4xl mx-auto flex items-center gap-2.5">
          <span class="text-[9px] font-mono text-cyan-400/30 uppercase tracking-[0.2em]">CHANNEL</span>
          <span class="text-[9px] font-mono text-cyan-400/20">//</span>
          <span class="text-[10px] font-mono text-cyan-400/55 uppercase tracking-wider">{{ sidebarTitles[activeChatIndex] }}</span>
          <div class="ml-auto flex items-center gap-1.5">
            <span class="w-1 h-1 rounded-full bg-cyan-400/50 hud-pulse"></span>
            <span class="text-[9px] font-mono text-cyan-400/25 uppercase">LIVE</span>
          </div>
        </div>
      </div>

      <!-- Chat messages -->
      <main ref="chatContainer" class="flex-1 overflow-y-auto">
        <div class="max-w-4xl mx-auto px-6 py-8 space-y-6">
          <template v-for="(msg, i) in currentChat?.messages" :key="`${activeChatIndex}-${i}`">
            <!-- Assistant -->
            <div v-if="msg.role === 'assistant'" class="flex gap-4 items-start animate-fade-in">
              <div class="w-7 h-7 mt-0.5 shrink-0 rounded-sm bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center hud-avatar">
                <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="12" r="4" /><circle cx="15" cy="12" r="4" />
                </svg>
              </div>
              <div class="flex-1 min-w-0 hud-msg prose prose-invert prose-sm max-w-none prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300 prose-ul:list-none prose-ul:pl-0 prose-li:pl-0"
                v-html="msg.html || msg.content" />
            </div>

            <!-- User -->
            <div v-if="msg.role === 'user'" class="flex justify-end animate-fade-in">
              <div class="max-w-[78%] bg-[#0d1523] border border-cyan-500/6 px-4 py-2.5 rounded-sm text-sm text-gray-300 hud-user-msg">
                {{ msg.content }}
              </div>
            </div>
          </template>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex gap-4 items-start animate-fade-in">
            <div class="w-7 h-7 mt-0.5 shrink-0 rounded-sm bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center hud-avatar">
              <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="4" /><circle cx="15" cy="12" r="4" />
              </svg>
            </div>
            <div class="flex items-center gap-1.5 py-3">
              <span class="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce [animation-delay:0ms]" />
              <span class="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce [animation-delay:150ms]" />
              <span class="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom: chips + fake input -->
      <div class="p-4 shrink-0 bg-[#030710]/60 hud-sep-top">
        <div class="max-w-4xl mx-auto space-y-3">

          <!-- Chips: hidden when form is open -->
          <Transition name="fade">
            <div v-if="currentChat?.availableChips.length && !formOpen">
              <div class="flex items-center gap-2 mb-2.5">
                <span class="text-[9px] font-mono text-cyan-400/30 uppercase tracking-[0.2em]">AVAILABLE QUERIES</span>
                <div class="flex-1 h-px bg-cyan-500/5"></div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  v-for="chip in currentChat.availableChips"
                  :key="chip.id"
                  class="text-left px-4 py-3 rounded-sm text-sm hover:bg-cyan-500/5 transition-all group hud-chip"
                  @click="selectChip(chip)"
                >
                  <span class="text-gray-300 group-hover:text-white font-medium">{{ chip.label }}</span>
                  <p v-if="chip.sublabel" class="text-[10px] font-mono text-cyan-400/30 mt-0.5 uppercase tracking-wide">{{ chip.sublabel }}</p>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Collapsed: clickable bar -->
          <div
            v-if="!formOpen"
            class="flex items-center gap-3 bg-[#0d1523] rounded-sm px-4 py-3 hover:bg-[#111d30] transition-all cursor-pointer"
            @click="openForm"
          >
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-[10px] font-mono text-cyan-400/45 uppercase tracking-wider">COMM</span>
              <span class="text-cyan-400/25 text-xs">▷</span>
            </div>
            <span class="text-sm text-gray-600 flex-1">{{ ui.askAnything }}</span>
            <div class="w-7 h-7 rounded-sm bg-cyan-500/8 border border-cyan-500/6 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-cyan-400/35" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" />
              </svg>
            </div>
          </div>

          <!-- Expanded: contact form -->
          <Transition name="fade">
            <div v-if="formOpen" class="bg-[#0d1523] rounded-sm p-4 space-y-3 animate-fade-in">
              <!-- Close row -->
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono text-cyan-400/45 uppercase tracking-wider">COMM</span>
                  <span class="text-cyan-400/25 text-xs">▷</span>
                  <span class="text-[11px] text-gray-500">{{ ui.askAnything }}</span>
                </div>
                <button class="p-1.5 hover:bg-cyan-500/10 rounded transition-colors" @click="closeForm">
                  <svg class="w-4 h-4 text-cyan-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Email field -->
              <input
                v-model="formEmail"
                type="email"
                :placeholder="ui.yourEmail"
                class="w-full bg-cyan-950/30 border border-cyan-500/8 rounded px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-cyan-400/50 transition-colors"
              />

              <!-- Message field -->
              <textarea
                v-model="formMessage"
                :placeholder="ui.yourMessage"
                rows="4"
                class="w-full bg-cyan-950/30 border border-cyan-500/8 rounded px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-cyan-400/50 transition-colors resize-none"
                @keydown.ctrl.enter="submitForm"
                @keydown.meta.enter="submitForm"
              />

              <!-- Send button -->
              <div class="flex justify-end">
                <button
                  class="px-5 py-2 bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 text-sm font-mono font-semibold rounded hover:bg-cyan-500/25 hover:border-cyan-400/60 transition-all hud-btn"
                  @click="submitForm"
                >
                  {{ ui.send }}
                </button>
              </div>
            </div>
          </Transition>

        </div>
      </div>
    </div>

    <!-- ==================== DEKORATIVNÍ ČÁRA (smazat pokud nevyhovuje) ==================== -->
    <div class="fixed bottom-0 right-14 w-px h-[50vh] z-[60] pointer-events-none"
         style="background: linear-gradient(to top, rgba(0,210,255,0.5) 0%, rgba(0,210,255,0.1) 70%, transparent 100%)">
    </div>
    <!-- ==================== /DEKORATIVNÍ ČÁRA ==================== -->

    <!-- ==================== COOKIE BANNER ==================== -->
    <Transition name="fade">
      <div
        v-if="cookieVisible"
        class="fixed bottom-5 right-5 z-[70] w-72 bg-[#0a0f1e] cookie-panel animate-fade-in"
      >
        <!-- Corner brackets -->
        <span class="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400/50 pointer-events-none"></span>
        <span class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400/50 pointer-events-none"></span>

        <!-- Header -->
        <div class="flex items-center justify-between px-4 pt-3 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-1 h-1 rounded-full bg-cyan-400 hud-pulse"></span>
            <span class="text-[9px] font-mono text-cyan-400/50 uppercase tracking-[0.2em]">SYSTEM // OZNÁMENÍ</span>
          </div>
          <button class="text-cyan-400/30 hover:text-cyan-400/70 transition-colors text-xs leading-none" @click="cookieVisible = false">✕</button>
        </div>

        <!-- Body -->
        <div class="px-4 pb-3">
          <p class="text-xs text-gray-400 leading-relaxed">
            Tento web slouží jako B2B vizitka. Nesbíráme osobní údaje ani neprovádíme analýzu návštěvnosti.
          </p>
        </div>

        <!-- Actions -->
        <div class="px-4 pb-4">
          <button
            class="w-full py-2 text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors rounded-sm hud-btn-accept"
            @click="cookieVisible = false"
          >
            Beru na vědomí
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
/* ── Sidebar: shadow + vertical gradient edge ── */
.sidebar-shadow {
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
}
.sidebar-shadow::after {
  content: '';
  position: absolute;
  top: 5%; right: 0; bottom: 5%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(0, 210, 255, 0.9) 50%, transparent);
  pointer-events: none;
}

/* ── Gradient separator — bottom edge ── */
.hud-sep {
  position: relative;
}
.hud-sep::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 210, 255, 0.2), transparent);
  animation: scan 5s ease-in-out infinite;
  pointer-events: none;
}

/* ── Gradient separator — top edge ── */
.hud-sep-top {
  position: relative;
}
.hud-sep-top::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 210, 255, 0.2), transparent);
  animation: scan 5s ease-in-out infinite;
  pointer-events: none;
}

/* ── Cockpit grid background ── */
.cockpit-bg {
  background-image:
    linear-gradient(rgba(0, 210, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 210, 255, 0.025) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* ── HUD glow elements ── */
.hud-avatar {
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.25), inset 0 0 6px rgba(0, 210, 255, 0.05);
}
.hud-chip {
  box-shadow: 0 0 0 1px rgba(0, 210, 255, 0.09);
}
.hud-chip:hover {
  box-shadow: 0 0 0 1px rgba(0, 210, 255, 0.28), 0 0 10px rgba(0, 210, 255, 0.08);
}
.hud-btn:hover {
  box-shadow: 0 0 14px rgba(0, 210, 255, 0.3);
}

/* ── Active sidebar item — left-border accent ── */
.hud-active-item {
  box-shadow: inset 2px 0 0 rgba(0, 210, 255, 0.55);
}

/* ── Pulse animation for status dots ── */
@keyframes hud-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
.hud-pulse {
  animation: hud-pulse 2.2s ease-in-out infinite;
}

/* ── Assistant message: subtle left-border panel ── */
.hud-msg {
  padding-left: 14px;
  border-left: 1px solid rgba(0, 210, 255, 0.08);
}

/* ── User message: corner accent top-right ── */
.hud-user-msg {
  position: relative;
}
.hud-user-msg::after {
  content: '';
  position: absolute;
  top: -1px; right: -1px;
  width: 10px; height: 10px;
  border-top: 1px solid rgba(0, 210, 255, 0.3);
  border-right: 1px solid rgba(0, 210, 255, 0.3);
}

/* ── Scanning line on top bar ── */
@keyframes scan {
  0% { opacity: 1; }
  50% { opacity: 0.45; }
  100% { opacity: 1; }
}
header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 210, 255, 1), transparent);
  animation: scan 3s ease-in-out infinite;
}
header {
  position: relative;
}

/* ── Fade in animation ── */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in-up 0.25s ease-out;
}

/* ── Vue transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Cookie banner panel ── */
.cookie-panel {
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(0, 210, 255, 0.08),
    -40px -40px 160px rgba(0, 210, 255, 0.18),
    -15px -15px 70px rgba(0, 210, 255, 0.28);
}
.hud-btn-accept {
  box-shadow: 0 0 0 1px rgba(0, 210, 255, 0.2);
}
.hud-btn-accept:hover {
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.25), 0 0 0 1px rgba(0, 210, 255, 0.35);
}

/* ── Scrollbars ── */
main::-webkit-scrollbar,
.popup-content::-webkit-scrollbar {
  width: 4px;
}
main::-webkit-scrollbar-track,
.popup-content::-webkit-scrollbar-track {
  background: transparent;
}
main::-webkit-scrollbar-thumb,
.popup-content::-webkit-scrollbar-thumb {
  background: rgba(0, 210, 255, 0.15);
  border-radius: 2px;
}
</style>