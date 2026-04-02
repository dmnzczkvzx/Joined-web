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
  title: 'Joined.cz s.r.o. | E-commerce & Technology',
  ogTitle: 'Joined.cz s.r.o.',
  description:
    'Technologická firma zaměřená na e-commerce, marketplace operations a systémové integrace.',
  ogDescription: 'E-commerce · Technologie · Marketplace Operations',
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
      'Spolupráce – úvoddd',
      'Marketplace expanze EU',
      'Tech stack & architektura',
      'Integrace ERP systémů',
    ],
    en: [
      'Cooperation – intro',
      'EU marketplace expansion',
      'Tech stack & architecture',
      'ERP system integration',
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
  window.location.href = `mailto:hello@xyz.cz?subject=${subject}&body=${body}`
  formEmail.value = ''
  formMessage.value = ''
  formOpen.value = false
}


/* ---- Chat Content Factories ---- */
function getInitialMessage(chatIndex: number): Message {
  const allMessages: Record<Lang, string[]> = {
    cs: [
      // ── Chat 0: Spolupráce – úvoddd ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">Joined.cz s.r.o.</h2>
          <p class="text-emerald-400 text-sm font-medium">E-commerce · Technologie · Marketplace Operations</p>
        </div>
        <p>Jsme technologická firma zaměřená na <strong>e-commerce</strong> a <strong>online prodej</strong>.
           Budujeme a provozujeme obchodní kanály – od vlastních e-shopů po mezinárodní marketplace platformy.</p>
        <p>Propojujeme technologie, data a obchodní strategii do fungujícího celku.
           Pokud hledáte partnera pro online expanzi, jste na správném místě. 👇</p>
      </div>`,

      // ── Chat 1: Marketplace expanze EU ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">Marketplace expanze EU</h2>
          <p class="text-emerald-400 text-sm font-medium">Amazon · Kaufland · Allegro · bol.com</p>
        </div>
        <p>Pomáháme značkám <strong>expandovat na evropské marketplace platformy</strong>.
           Od analýzy trhu přes listing až po logistiku a zákaznický servis.</p>
        <p>Aktuálně spravujeme prodej na <strong>15+ platformách v 8 zemích EU</strong>.
           Zeptejte se na cokoliv ohledně marketplace strategie. 👇</p>
      </div>`,

      // ── Chat 2: Tech stack & architektura ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">Tech stack & architektura</h2>
          <p class="text-emerald-400 text-sm font-medium">Vue · Node.js · AWS · PostgreSQL</p>
        </div>
        <p>Stavíme na <strong>moderních technologiích</strong> s důrazem na škálovatelnost,
           výkon a rychlost nasazení. Žádný legacy – čistý, udržovatelný kód.</p>
        <p>Tady se dozvíte víc o tom, jak přistupujeme k <strong>vývoji a infrastruktuře</strong>. 👇</p>
      </div>`,

      // ── Chat 3: Integrace ERP systémů ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">Integrace ERP systémů</h2>
          <p class="text-emerald-400 text-sm font-medium">SAP · Pohoda · Money S3 · BaseLinker</p>
        </div>
        <p>Propojujeme <strong>ERP, WMS, PIM a e-commerce platformy</strong> do jednoho
           fungujícího ekosystému. Obousměrná synchronizace, real-time data.</p>
        <p>Zjistěte, jak řešíme integrace a kolik času vám můžeme ušetřit. 👇</p>
      </div>`,
    ],

    en: [
      // ── Chat 0: Cooperation – intro ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">Joined.cz s.r.o.</h2>
          <p class="text-emerald-400 text-sm font-medium">E-commerce · Technology · Marketplace Operations</p>
        </div>
        <p>We are a technology company focused on <strong>e-commerce</strong> and <strong>online sales</strong>.
           We build and operate sales channels – from custom e-shops to international marketplace platforms.</p>
        <p>We connect technology, data, and business strategy into a working whole.
           If you're looking for a partner for online expansion, you're in the right place. 👇</p>
      </div>`,

      // ── Chat 1: EU marketplace expansion ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">EU Marketplace Expansion</h2>
          <p class="text-emerald-400 text-sm font-medium">Amazon · Kaufland · Allegro · bol.com</p>
        </div>
        <p>We help brands <strong>expand to European marketplace platforms</strong>.
           From market analysis through listing to logistics and customer service.</p>
        <p>We currently manage sales on <strong>15+ platforms across 8 EU countries</strong>.
           Ask us anything about marketplace strategy. 👇</p>
      </div>`,

      // ── Chat 2: Tech stack & architecture ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">Tech Stack & Architecture</h2>
          <p class="text-emerald-400 text-sm font-medium">Vue · Node.js · AWS · PostgreSQL</p>
        </div>
        <p>We build on <strong>modern technologies</strong> with a focus on scalability,
           performance, and deployment speed. No legacy – clean, maintainable code.</p>
        <p>Learn more about how we approach <strong>development and infrastructure</strong>. 👇</p>
      </div>`,

      // ── Chat 3: ERP system integration ──
      `<div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-2">ERP System Integration</h2>
          <p class="text-emerald-400 text-sm font-medium">SAP · Pohoda · Money S3 · BaseLinker</p>
        </div>
        <p>We connect <strong>ERP, WMS, PIM and e-commerce platforms</strong> into one
           working ecosystem. Bidirectional sync, real-time data.</p>
        <p>Find out how we handle integrations and how much time we can save you. 👇</p>
      </div>`,
    ],
  }

  const html = allMessages[lang.value][chatIndex] ?? allMessages[lang.value][0]
  return { role: 'assistant', html }
}

function getChipsForChat(chatIndex: number): Chip[] {
  const allSets: Record<Lang, Chip[][]> = {
    cs: [
      // ── Chat 0: Spolupráce – úvoddd ──
      [
        {
          id: 'specialization',
          label: 'Na co se specializujeme?',
          sublabel: 'E-commerce, integrace, marketplace',
          response: `
            <div class="space-y-3">
              <p>Náš focus stojí na třech pilířích:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🛒 <strong>E-commerce operations</strong> – Stavíme a provozujeme e-shopy. Od výběru platformy po fulfillment.</li>
                <li>🔗 <strong>Systémové integrace</strong> – Propojujeme ERP, WMS, PIM a další systémy do jednoho ekosystému.</li>
                <li>🌍 <strong>Marketplace management</strong> – Prodej na Amazon, Kaufland, Allegro, bol.com a dalších platformách v EU.</li>
              </ul>
              <p>Netvoříme jen weby – budujeme celý <strong>technologický backbone</strong> pro online prodej.</p>
            </div>`,
        },
        {
          id: 'experience',
          label: 'Jakou máme zkušenost?',
          sublabel: 'Zahraniční trhy, projekty',
          response: `
            <div class="space-y-3">
              <p>Tým za XYX má roky zkušeností ze startupů a e-commerce firem na evropských trzích:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📦 Řízení prodeje na <strong>15+ marketplace platformách</strong> v EU</li>
                <li>⚙️ Integrace <strong>ERP / WMS / PIM</strong> systémů</li>
                <li>🇩🇪🇳🇱🇵🇱 Přímá zkušenost s trhy <strong>DE, NL, PL, AT, FR</strong></li>
                <li>📊 Data-driven přístup – automatizace, reporting, optimalizace</li>
              </ul>
            </div>`,
        },
        {
          id: 'tech',
          label: 'Jaké technologie používáme?',
          sublabel: 'Stack, nástroje, platformy',
          response: `
            <div class="space-y-3">
              <p>Pracujeme s moderním stackem:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Frontend:</strong> Vue.js, Nuxt</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Backend:</strong> Node.js, Python</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">E-commerce:</strong> Shopify, custom</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Integrace:</strong> BaseLinker, middleware</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Cloud:</strong> AWS, Vercel</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Data:</strong> PostgreSQL, pipelines</div>
              </div>
              <p>Vybíráme nástroje podle potřeb projektu, ne naopak.</p>
            </div>`,
        },
        {
          id: 'cooperation',
          label: 'Jak spolupracujeme?',
          sublabel: 'Modely partnerství',
          response: `
            <div class="space-y-3">
              <p>Hledáme partnery, ne klienty. Nabízíme:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🤝 <strong>Strategické partnerství</strong> – společný vstup na nové trhy a kanály</li>
                <li>🏷️ <strong>White-label řešení</strong> – provozujeme online prodej pod vaší značkou</li>
                <li>⚡ <strong>Tech as a service</strong> – naše infrastruktura, vaše produkty</li>
              </ul>
              <p>Rádi se potkáme na kávě nebo callu – ozvěte se.</p>
            </div>`,
        },
        {
          id: 'contact',
          label: 'Kontakt',
          sublabel: 'Jak se spojit',
          response: `
            <div class="space-y-3">
              <p>Nejrychlejší cesta k nám:</p>
              <div class="bg-white/5 rounded-xl p-4 space-y-2 not-prose">
                <p class="text-gray-300">📧 <strong class="text-white">hello@xyz.cz</strong></p>
                <p class="text-gray-300">🔗 <strong class="text-white">linkedin.com/company/xyz</strong></p>
                <p class="text-gray-300">📍 Praha, Česká republika</p>
                <p class="text-gray-300">🏢 IČO: xxxxxxxx <span class="text-gray-500">(v procesu založení)</span></p>
              </div>
            </div>`,
        },
      ],

      // ── Chat 1: Marketplace expanze EU ──
      [
        {
          id: 'mp-platforms',
          label: 'Na jakých platformách prodáváme?',
          sublabel: 'Amazon, Kaufland, Allegro…',
          response: `
            <div class="space-y-3">
              <p>Aktuálně spravujeme prodej na těchto platformách:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🇩🇪 <strong>Amazon.de</strong>, Kaufland.de, Otto.de</li>
                <li>🇳🇱 <strong>Bol.com</strong>, Amazon.nl</li>
                <li>🇵🇱 <strong>Allegro</strong>, Amazon.pl</li>
                <li>🇫🇷 Amazon.fr, <strong>Cdiscount</strong></li>
                <li>🇨🇿 Alza Marketplace, Mall.cz</li>
              </ul>
              <p>Každý marketplace má svá specifika – řešíme listing, pricing, logistics i zákaznický servis.</p>
            </div>`,
        },
        {
          id: 'mp-expansion',
          label: 'Jak probíhá expanze na nový trh?',
          sublabel: 'Proces, timeline, náklady',
          response: `
            <div class="space-y-3">
              <p>Vstup na nový marketplace typicky zahrnuje:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📋 <strong>Analýza trhu</strong> – konkurence, cenová hladina, poptávka</li>
                <li>📝 <strong>Registrace & onboarding</strong> – založení účtu, nastavení podmínek</li>
                <li>📦 <strong>Logistika</strong> – FBA / FBM, lokální sklady, dopravci</li>
                <li>🚀 <strong>Launch</strong> – listing optimalizace, PPC kampaně, reviews strategie</li>
              </ul>
              <p>Typický timeline je <strong>4–8 týdnů</strong> od rozhodnutí po první prodej.</p>
            </div>`,
        },
        {
          id: 'mp-results',
          label: 'Jaké výsledky dosahujeme?',
          sublabel: 'KPIs, metriky, case studies',
          response: `
            <div class="space-y-3">
              <p>Naše benchmarky napříč projekty:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Avg. ROAS:</strong> 4.2x</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Trhy:</strong> 8 zemí EU</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Platformy:</strong> 15+</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">SKUs:</strong> 5 000+</div>
              </div>
              <p>Konkrétní case studies rádi představíme na osobním callu.</p>
            </div>`,
        },
        {
          id: 'mp-pricing',
          label: 'Cenové modely a provize',
          sublabel: 'Jak účtujeme',
          response: `
            <div class="space-y-3">
              <p>Nabízíme flexibilní cenové modely:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>💰 <strong>Revenue share</strong> – procento z obratu, žádné fixní poplatky</li>
                <li>📊 <strong>Management fee</strong> – fixní měsíční správa + výkonnostní bonus</li>
                <li>🤝 <strong>Hybrid</strong> – kombinace obou modelů dle potřeb</li>
              </ul>
              <p>Vše záleží na rozsahu a komplexitě projektu. Rádi připravíme nabídku na míru.</p>
            </div>`,
        },
      ],

      // ── Chat 2: Tech stack & architektura ──
      [
        {
          id: 'tech-frontend',
          label: 'Frontend & UI',
          sublabel: 'Vue, Nuxt, design system',
          response: `
            <div class="space-y-3">
              <p>Na frontendu stavíme na:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>⚡ <strong>Nuxt 3</strong> – SSR, SSG, hybridní rendering</li>
                <li>🎨 <strong>Tailwind CSS</strong> – utility-first, konzistentní design</li>
                <li>🧩 <strong>Vlastní komponentový systém</strong> – znovupoužitelné UI bloky</li>
              </ul>
              <p>Důraz klademe na <strong>performance</strong>, přístupnost a rychlost nasazení.</p>
            </div>`,
        },
        {
          id: 'tech-backend',
          label: 'Backend & API',
          sublabel: 'Node.js, Python, databáze',
          response: `
            <div class="space-y-3">
              <p>Backend infrastruktura:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Runtime:</strong> Node.js, Python</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">API:</strong> REST, GraphQL</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">DB:</strong> PostgreSQL, Redis</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Queue:</strong> BullMQ, SQS</div>
              </div>
              <p>Vše běží na <strong>AWS</strong> s CI/CD přes GitHub Actions.</p>
            </div>`,
        },
        {
          id: 'tech-infra',
          label: 'Cloud & infrastruktura',
          sublabel: 'AWS, Vercel, monitoring',
          response: `
            <div class="space-y-3">
              <p>Naše cloudová architektura:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>☁️ <strong>AWS</strong> – EC2, Lambda, RDS, S3, CloudFront</li>
                <li>🚀 <strong>Vercel</strong> – frontend deployment, edge functions</li>
                <li>📈 <strong>Monitoring</strong> – Datadog, Sentry, custom dashboards</li>
                <li>🔒 <strong>Security</strong> – WAF, secrets management, audit logs</li>
              </ul>
            </div>`,
        },
        {
          id: 'tech-approach',
          label: 'Jak přistupujeme k vývoji?',
          sublabel: 'Metodika, procesy',
          response: `
            <div class="space-y-3">
              <p>Principy, kterými se řídíme:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🔄 <strong>Iterativní vývoj</strong> – krátké cykly, rychlé nasazení</li>
                <li>🧪 <strong>Testy</strong> – unit, integration, e2e</li>
                <li>📖 <strong>Dokumentace</strong> – API docs, runbooks, ADR</li>
                <li>🤖 <strong>Automatizace</strong> – CI/CD, IaC, code quality gates</li>
              </ul>
              <p>Neděláme waterfall. Stavíme, měříme, iterujeme.</p>
            </div>`,
        },
      ],

      // ── Chat 3: Integrace ERP systémů ──
      [
        {
          id: 'erp-systems',
          label: 'Jaké ERP systémy integrujeme?',
          sublabel: 'SAP, Pohoda, Money S3…',
          response: `
            <div class="space-y-3">
              <p>Máme zkušenosti s integrací:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🏢 <strong>SAP Business One</strong> – B2B i B2C scénáře</li>
                <li>📗 <strong>Pohoda</strong> – české e-commerce projekty</li>
                <li>💼 <strong>Money S3 / S5</strong> – středně velké firmy</li>
                <li>🌐 <strong>Vlastní systémy</strong> – custom API napojení</li>
              </ul>
              <p>Klíčové je vždy <strong>obousměrná synchronizace</strong> – objednávky, skladové zásoby, faktury.</p>
            </div>`,
        },
        {
          id: 'erp-middleware',
          label: 'Jak funguje middleware vrstva?',
          sublabel: 'BaseLinker, vlastní řešení',
          response: `
            <div class="space-y-3">
              <p>Mezi e-shopem / marketplace a ERP stojí naše middleware:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🔗 <strong>BaseLinker</strong> – rychlé napojení na 100+ platforem</li>
                <li>⚙️ <strong>Custom middleware</strong> – pro složitější business logiku</li>
                <li>🔄 <strong>Real-time sync</strong> – webhooky, polling, event-driven</li>
              </ul>
              <p>Volíme podle komplexity — jednodušší projekty = BaseLinker, enterprise = custom.</p>
            </div>`,
        },
        {
          id: 'erp-data',
          label: 'Datové toky a synchronizace',
          sublabel: 'Objednávky, sklad, ceny',
          response: `
            <div class="space-y-3">
              <p>Typické datové toky, které řešíme:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Objednávky:</strong> MP → ERP</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Sklad:</strong> ERP → MP</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Ceny:</strong> PIM → MP</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Faktury:</strong> ERP → email</div>
              </div>
              <p>Vše s <strong>error handling</strong>, retry logikou a notifikacemi při výpadcích.</p>
            </div>`,
        },
        {
          id: 'erp-timeline',
          label: 'Jak dlouho integrace trvá?',
          sublabel: 'Timeline, fáze projektu',
          response: `
            <div class="space-y-3">
              <p>Typický projekt integrace:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📋 <strong>Analýza</strong> (1–2 týdny) – mapování procesů, datový audit</li>
                <li>🛠️ <strong>Vývoj</strong> (3–6 týdnů) – napojení, transformace, testy</li>
                <li>🧪 <strong>UAT</strong> (1–2 týdny) – testování s reálnými daty</li>
                <li>🚀 <strong>Go-live</strong> – nasazení, monitoring, podpora</li>
              </ul>
              <p>Celkově <strong>6–10 týdnů</strong> dle komplexity. Jednoduchá napojení i za 2 týdny.</p>
            </div>`,
        },
      ],
    ],

    en: [
      // ── Chat 0: Cooperation – intro ──
      [
        {
          id: 'specialization',
          label: 'What do we specialize in?',
          sublabel: 'E-commerce, integrations, marketplace',
          response: `
            <div class="space-y-3">
              <p>Our focus stands on three pillars:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🛒 <strong>E-commerce operations</strong> – We build and run e-shops. From platform selection to fulfillment.</li>
                <li>🔗 <strong>System integrations</strong> – We connect ERP, WMS, PIM and other systems into one ecosystem.</li>
                <li>🌍 <strong>Marketplace management</strong> – Sales on Amazon, Kaufland, Allegro, bol.com and other EU platforms.</li>
              </ul>
              <p>We don't just build websites – we build the entire <strong>technology backbone</strong> for online sales.</p>
            </div>`,
        },
        {
          id: 'experience',
          label: 'What is our experience?',
          sublabel: 'International markets, projects',
          response: `
            <div class="space-y-3">
              <p>The team behind XYX has years of experience from startups and e-commerce companies across European markets:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📦 Managing sales on <strong>15+ marketplace platforms</strong> in the EU</li>
                <li>⚙️ Integration of <strong>ERP / WMS / PIM</strong> systems</li>
                <li>🇩🇪🇳🇱🇵🇱 Direct experience with <strong>DE, NL, PL, AT, FR</strong> markets</li>
                <li>📊 Data-driven approach – automation, reporting, optimization</li>
              </ul>
            </div>`,
        },
        {
          id: 'tech',
          label: 'What technologies do we use?',
          sublabel: 'Stack, tools, platforms',
          response: `
            <div class="space-y-3">
              <p>We work with a modern stack:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Frontend:</strong> Vue.js, Nuxt</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Backend:</strong> Node.js, Python</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">E-commerce:</strong> Shopify, custom</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Integrations:</strong> BaseLinker, middleware</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Cloud:</strong> AWS, Vercel</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Data:</strong> PostgreSQL, pipelines</div>
              </div>
              <p>We choose tools based on project needs, not the other way around.</p>
            </div>`,
        },
        {
          id: 'cooperation',
          label: 'How do we cooperate?',
          sublabel: 'Partnership models',
          response: `
            <div class="space-y-3">
              <p>We look for partners, not clients. We offer:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🤝 <strong>Strategic partnership</strong> – joint entry into new markets and channels</li>
                <li>🏷️ <strong>White-label solutions</strong> – we run online sales under your brand</li>
                <li>⚡ <strong>Tech as a service</strong> – our infrastructure, your products</li>
              </ul>
              <p>We'd love to meet over coffee or a call – get in touch.</p>
            </div>`,
        },
        {
          id: 'contact',
          label: 'Contact',
          sublabel: 'How to reach us',
          response: `
            <div class="space-y-3">
              <p>The fastest way to reach us:</p>
              <div class="bg-white/5 rounded-xl p-4 space-y-2 not-prose">
                <p class="text-gray-300">📧 <strong class="text-white">hello@xyz.cz</strong></p>
                <p class="text-gray-300">🔗 <strong class="text-white">linkedin.com/company/xyz</strong></p>
                <p class="text-gray-300">📍 Prague, Czech Republic</p>
                <p class="text-gray-300">🏢 ID: xxxxxxxx <span class="text-gray-500">(registration in progress)</span></p>
              </div>
            </div>`,
        },
      ],

      // ── Chat 1: EU marketplace expansion ──
      [
        {
          id: 'mp-platforms',
          label: 'Which platforms do we sell on?',
          sublabel: 'Amazon, Kaufland, Allegro…',
          response: `
            <div class="space-y-3">
              <p>We currently manage sales on these platforms:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🇩🇪 <strong>Amazon.de</strong>, Kaufland.de, Otto.de</li>
                <li>🇳🇱 <strong>Bol.com</strong>, Amazon.nl</li>
                <li>🇵🇱 <strong>Allegro</strong>, Amazon.pl</li>
                <li>🇫🇷 Amazon.fr, <strong>Cdiscount</strong></li>
                <li>🇨🇿 Alza Marketplace, Mall.cz</li>
              </ul>
              <p>Each marketplace has its specifics – we handle listing, pricing, logistics, and customer service.</p>
            </div>`,
        },
        {
          id: 'mp-expansion',
          label: 'How does market expansion work?',
          sublabel: 'Process, timeline, costs',
          response: `
            <div class="space-y-3">
              <p>Entering a new marketplace typically involves:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📋 <strong>Market analysis</strong> – competition, pricing, demand</li>
                <li>📝 <strong>Registration & onboarding</strong> – account setup, terms</li>
                <li>📦 <strong>Logistics</strong> – FBA / FBM, local warehouses, carriers</li>
                <li>🚀 <strong>Launch</strong> – listing optimization, PPC campaigns, reviews strategy</li>
              </ul>
              <p>Typical timeline is <strong>4–8 weeks</strong> from decision to first sale.</p>
            </div>`,
        },
        {
          id: 'mp-results',
          label: 'What results do we achieve?',
          sublabel: 'KPIs, metrics, case studies',
          response: `
            <div class="space-y-3">
              <p>Our benchmarks across projects:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Avg. ROAS:</strong> 4.2x</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Markets:</strong> 8 EU countries</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Platforms:</strong> 15+</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">SKUs:</strong> 5,000+</div>
              </div>
              <p>We're happy to present specific case studies on a personal call.</p>
            </div>`,
        },
        {
          id: 'mp-pricing',
          label: 'Pricing models & fees',
          sublabel: 'How we charge',
          response: `
            <div class="space-y-3">
              <p>We offer flexible pricing models:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>💰 <strong>Revenue share</strong> – percentage of turnover, no fixed fees</li>
                <li>📊 <strong>Management fee</strong> – fixed monthly fee + performance bonus</li>
                <li>🤝 <strong>Hybrid</strong> – combination of both models as needed</li>
              </ul>
              <p>Everything depends on the scope and complexity. We'll gladly prepare a custom offer.</p>
            </div>`,
        },
      ],

      // ── Chat 2: Tech stack & architecture ──
      [
        {
          id: 'tech-frontend',
          label: 'Frontend & UI',
          sublabel: 'Vue, Nuxt, design system',
          response: `
            <div class="space-y-3">
              <p>On the frontend we build with:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>⚡ <strong>Nuxt 3</strong> – SSR, SSG, hybrid rendering</li>
                <li>🎨 <strong>Tailwind CSS</strong> – utility-first, consistent design</li>
                <li>🧩 <strong>Custom component system</strong> – reusable UI blocks</li>
              </ul>
              <p>We focus on <strong>performance</strong>, accessibility, and deployment speed.</p>
            </div>`,
        },
        {
          id: 'tech-backend',
          label: 'Backend & API',
          sublabel: 'Node.js, Python, databases',
          response: `
            <div class="space-y-3">
              <p>Backend infrastructure:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Runtime:</strong> Node.js, Python</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">API:</strong> REST, GraphQL</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">DB:</strong> PostgreSQL, Redis</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Queue:</strong> BullMQ, SQS</div>
              </div>
              <p>Everything runs on <strong>AWS</strong> with CI/CD via GitHub Actions.</p>
            </div>`,
        },
        {
          id: 'tech-infra',
          label: 'Cloud & infrastructure',
          sublabel: 'AWS, Vercel, monitoring',
          response: `
            <div class="space-y-3">
              <p>Our cloud architecture:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>☁️ <strong>AWS</strong> – EC2, Lambda, RDS, S3, CloudFront</li>
                <li>🚀 <strong>Vercel</strong> – frontend deployment, edge functions</li>
                <li>📈 <strong>Monitoring</strong> – Datadog, Sentry, custom dashboards</li>
                <li>🔒 <strong>Security</strong> – WAF, secrets management, audit logs</li>
              </ul>
            </div>`,
        },
        {
          id: 'tech-approach',
          label: 'How do we approach development?',
          sublabel: 'Methodology, processes',
          response: `
            <div class="space-y-3">
              <p>Principles we follow:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🔄 <strong>Iterative development</strong> – short cycles, fast deployment</li>
                <li>🧪 <strong>Testing</strong> – unit, integration, e2e</li>
                <li>📖 <strong>Documentation</strong> – API docs, runbooks, ADR</li>
                <li>🤖 <strong>Automation</strong> – CI/CD, IaC, code quality gates</li>
              </ul>
              <p>We don't do waterfall. We build, measure, iterate.</p>
            </div>`,
        },
      ],

      // ── Chat 3: ERP system integration ──
      [
        {
          id: 'erp-systems',
          label: 'Which ERP systems do we integrate?',
          sublabel: 'SAP, Pohoda, Money S3…',
          response: `
            <div class="space-y-3">
              <p>We have experience integrating:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🏢 <strong>SAP Business One</strong> – B2B and B2C scenarios</li>
                <li>📗 <strong>Pohoda</strong> – Czech e-commerce projects</li>
                <li>💼 <strong>Money S3 / S5</strong> – mid-size companies</li>
                <li>🌐 <strong>Custom systems</strong> – custom API connections</li>
              </ul>
              <p>The key is always <strong>bidirectional sync</strong> – orders, inventory, invoices.</p>
            </div>`,
        },
        {
          id: 'erp-middleware',
          label: 'How does the middleware layer work?',
          sublabel: 'BaseLinker, custom solutions',
          response: `
            <div class="space-y-3">
              <p>Between the e-shop / marketplace and ERP sits our middleware:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>🔗 <strong>BaseLinker</strong> – quick connection to 100+ platforms</li>
                <li>⚙️ <strong>Custom middleware</strong> – for more complex business logic</li>
                <li>🔄 <strong>Real-time sync</strong> – webhooks, polling, event-driven</li>
              </ul>
              <p>We choose based on complexity — simpler projects = BaseLinker, enterprise = custom.</p>
            </div>`,
        },
        {
          id: 'erp-data',
          label: 'Data flows & synchronization',
          sublabel: 'Orders, inventory, prices',
          response: `
            <div class="space-y-3">
              <p>Typical data flows we handle:</p>
              <div class="grid grid-cols-2 gap-2 my-3 not-prose">
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Orders:</strong> MP → ERP</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Inventory:</strong> ERP → MP</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Prices:</strong> PIM → MP</div>
                <div class="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-300"><strong class="text-white">Invoices:</strong> ERP → email</div>
              </div>
              <p>All with <strong>error handling</strong>, retry logic, and failure notifications.</p>
            </div>`,
        },
        {
          id: 'erp-timeline',
          label: 'How long does integration take?',
          sublabel: 'Timeline, project phases',
          response: `
            <div class="space-y-3">
              <p>A typical integration project:</p>
              <ul class="space-y-2 list-none pl-0">
                <li>📋 <strong>Analysis</strong> (1–2 weeks) – process mapping, data audit</li>
                <li>🛠️ <strong>Development</strong> (3–6 weeks) – connection, transformation, testing</li>
                <li>🧪 <strong>UAT</strong> (1–2 weeks) – testing with real data</li>
                <li>🚀 <strong>Go-live</strong> – deployment, monitoring, support</li>
              </ul>
              <p>Total <strong>6–10 weeks</strong> depending on complexity. Simple connections even in 2 weeks.</p>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum non vel libero. Proin ac felis nec sapien ullamcorper dignissim.</p>
            <p>Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl. Donec euismod, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <h4 class="text-white font-semibold text-base">Naše mise</h4>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.</p>
            <p>Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna, in commodo elit erat nec turpis.</p>
            <h4 class="text-white font-semibold text-base">Naše hodnoty</h4>
            <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
            <p>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</p>
          </div>`,
      },
      contact: {
        title: 'Kontakt',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Spojte se s námi</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            <div class="bg-white/5 rounded-lg p-4 space-y-2">
              <p>📧 <strong class="text-white">hello@xyz.cz</strong></p>
              <p>📞 <strong class="text-white">+420 xxx xxx xxx</strong></p>
              <p>📍 <strong class="text-white">Praha, Česká republika</strong></p>
            </div>
            <h4 class="text-white font-semibold text-base">Fakturační údaje</h4>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            <p>Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna.</p>
            <h4 class="text-white font-semibold text-base">Pracovní doba</h4>
            <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.</p>
          </div>`,
      },
      partners: {
        title: 'Partneři',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Naši partneři</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum non vel libero.</p>
            <p>Proin ac felis nec sapien ullamcorper dignissim. Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <h4 class="text-white font-semibold text-base">Strategická spolupráce</h4>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.</p>
            <h4 class="text-white font-semibold text-base">Jak se stát partnerem</h4>
            <p>Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna, in commodo elit erat nec turpis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue.</p>
            <p>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</p>
          </div>`,
      },
      marketplaces: {
        title: 'Marketplaces',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Kde prodáváme</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum.</p>
            <ul class="space-y-1 list-none pl-0">
              <li>🇩🇪 Amazon.de, Kaufland.de, Otto.de</li>
              <li>🇳🇱 Bol.com, Amazon.nl</li>
              <li>🇵🇱 Allegro, Amazon.pl</li>
              <li>🇫🇷 Amazon.fr, Cdiscount</li>
              <li>🇨🇿 Alza Marketplace, Mall.cz</li>
            </ul>
            <h4 class="text-white font-semibold text-base">Naše approach</h4>
            <p>Proin ac felis nec sapien ullamcorper dignissim. Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.</p>
            <h4 class="text-white font-semibold text-base">Výsledky</h4>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor ut ullamcorper ligula.</p>
            <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.</p>
          </div>`,
      },
      dev: {
        title: 'Dev',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Technologie & vývoj</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum.</p>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">Vue.js / Nuxt</div>
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">Node.js / Python</div>
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">PostgreSQL</div>
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">AWS / Vercel</div>
            </div>
            <h4 class="text-white font-semibold text-base">Open source</h4>
            <p>Proin ac felis nec sapien ullamcorper dignissim. Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            <h4 class="text-white font-semibold text-base">API & integrace</h4>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.</p>
            <p>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
          </div>`,
      },
    },
    en: {
      aboutUs: {
        title: 'About us',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Who we are</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum non vel libero. Proin ac felis nec sapien ullamcorper dignissim.</p>
            <p>Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl. Donec euismod, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <h4 class="text-white font-semibold text-base">Our mission</h4>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.</p>
            <p>Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna, in commodo elit erat nec turpis.</p>
            <h4 class="text-white font-semibold text-base">Our values</h4>
            <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
            <p>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</p>
          </div>`,
      },
      contact: {
        title: 'Contact',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Get in touch</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            <div class="bg-white/5 rounded-lg p-4 space-y-2">
              <p>📧 <strong class="text-white">hello@xyz.cz</strong></p>
              <p>📞 <strong class="text-white">+420 xxx xxx xxx</strong></p>
              <p>📍 <strong class="text-white">Prague, Czech Republic</strong></p>
            </div>
            <h4 class="text-white font-semibold text-base">Billing details</h4>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            <p>Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna.</p>
            <h4 class="text-white font-semibold text-base">Business hours</h4>
            <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.</p>
          </div>`,
      },
      partners: {
        title: 'Partners',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Our partners</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum non vel libero.</p>
            <p>Proin ac felis nec sapien ullamcorper dignissim. Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <h4 class="text-white font-semibold text-base">Strategic cooperation</h4>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.</p>
            <h4 class="text-white font-semibold text-base">Become a partner</h4>
            <p>Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna, in commodo elit erat nec turpis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue.</p>
            <p>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</p>
          </div>`,
      },
      marketplaces: {
        title: 'Marketplaces',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Where we sell</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum.</p>
            <ul class="space-y-1 list-none pl-0">
              <li>🇩🇪 Amazon.de, Kaufland.de, Otto.de</li>
              <li>🇳🇱 Bol.com, Amazon.nl</li>
              <li>🇵🇱 Allegro, Amazon.pl</li>
              <li>🇫🇷 Amazon.fr, Cdiscount</li>
              <li>🇨🇿 Alza Marketplace, Mall.cz</li>
            </ul>
            <h4 class="text-white font-semibold text-base">Our approach</h4>
            <p>Proin ac felis nec sapien ullamcorper dignissim. Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.</p>
            <h4 class="text-white font-semibold text-base">Results</h4>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor ut ullamcorper ligula.</p>
            <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.</p>
          </div>`,
      },
      dev: {
        title: 'Dev',
        body: `
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-base">Technology & development</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod nisi at arcu fringilla, vel consequat magna tincidunt. Sed vitae tortor ac risus dictum fermentum.</p>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">Vue.js / Nuxt</div>
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">Node.js / Python</div>
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">PostgreSQL</div>
              <div class="bg-white/5 rounded-lg px-3 py-2 text-sm">AWS / Vercel</div>
            </div>
            <h4 class="text-white font-semibold text-base">Open source</h4>
            <p>Proin ac felis nec sapien ullamcorper dignissim. Nullam auctor, nisi eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.</p>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            <h4 class="text-white font-semibold text-base">API & integrations</h4>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.</p>
            <p>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
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
  <div class="flex h-screen bg-[#212121] text-gray-200 font-sans">
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
          class="w-[90vw] md:w-[30vw] h-[70vh] md:h-[50vh] bg-[#2f2f2f] border border-white/10 rounded-xl flex flex-col overflow-hidden animate-fade-in"
        >
          <!-- Popup header -->
          <div class="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0">
            <h3 class="text-sm font-semibold text-white">{{ popupTitle }}</h3>
            <button
              class="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              @click="closePopup"
            >
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
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
        'fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#171717] border-r border-white/10 transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Logo -->
      <div class="p-4 border-b border-white/10">
        <div class="flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-black"
          >
            <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <circle cx="9" cy="12" r="4" />
    <circle cx="15" cy="12" r="4" />
  </svg>
          </div>
          <div>
            <h1 class="text-base font-bold tracking-tight text-white leading-none italic">
                Joined<span class="text-emerald-400">.</span>cz
              </h1>
              <p class="text-[10px] text-gray-500 italic">s.r.o.</p>
          </div>
        </div>
      </div>

      <!-- History (clickable) -->
      <nav class="flex-1 overflow-y-auto p-3 space-y-1">
        <p class="text-[11px] text-gray-500 uppercase tracking-wider px-3 mb-2">
          {{ ui.conversations }}
        </p>
        <div
          v-for="(title, i) in sidebarTitles"
          :key="i"
          :class="[
            'px-3 py-2 rounded-lg text-sm cursor-pointer truncate transition-colors',
            activeChatIndex === i
              ? 'bg-white/10 text-white'
              : 'text-gray-500 hover:bg-white/5 hover:text-gray-300',
          ]"
          @click="openChat(i)"
        >
          {{ title }}
        </div>
      </nav>

      <!-- Bottom links → open popups -->
      <div class="p-3 border-t border-white/10 space-y-1">
        <button
          class="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          @click="openPopup('aboutUs')"
        >
          {{ ui.aboutUs }}
        </button>
        <button
          class="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
        sidebarOpen ? 'md:ml-64' : '',
      ]"
    >
      <!-- Top bar -->
      <header
        class="flex items-center justify-between px-4 h-12 border-b border-white/10 shrink-0"
      >
        <button
          class="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <nav class="flex items-center gap-1">
          <!-- Nav links → open popups -->
          <button
            v-for="link in navLinks"
            :key="link.key"
            class="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            @click="openPopup(link.key, 'top-right')"
          >
            {{ link.label }}
          </button>
          <!-- Language toggle -->
          <div class="w-px h-4 bg-white/10 mx-1" />
          <button
            class="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
            @click="toggleLang"
          >
            {{ lang === 'cs' ? 'EN' : 'CZ' }}
          </button>
        </nav>
      </header>

      <!-- Chat messages -->
      <main ref="chatContainer" class="flex-1 overflow-y-auto">
        <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <template v-for="(msg, i) in currentChat?.messages" :key="`${activeChatIndex}-${i}`">
            <!-- Assistant -->
            <div v-if="msg.role === 'assistant'" class="flex gap-3 items-start animate-fade-in">
              <div
                class="w-7 h-7 mt-1 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-black"
              >
                <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <circle cx="9" cy="12" r="4" />
    <circle cx="15" cy="12" r="4" />
  </svg>
              </div>
              <div
                class="prose prose-invert prose-sm max-w-none prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300 prose-ul:list-none prose-ul:pl-0 prose-li:pl-0"
                v-html="msg.html || msg.content"
              />
            </div>

            <!-- User -->
            <div v-if="msg.role === 'user'" class="flex justify-end animate-fade-in">
              <div class="bg-[#2f2f2f] px-4 py-2.5 rounded-2xl text-sm">
                {{ msg.content }}
              </div>
            </div>
          </template>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex gap-3 items-start animate-fade-in">
            <div
              class="w-7 h-7 mt-1 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-black"
            >
              <span class="text-sm font-bold italic text-black">J</span>
            </div>
            <div class="flex items-center gap-1.5 py-3">
              <span
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"
              />
              <span
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"
              />
              <span
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"
              />
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom: chips + fake input -->
      <div class="border-t border-white/10 p-4 shrink-0">
        <div class="max-w-4xl mx-auto space-y-3">

          <!-- Chips: hidden when form is open -->
          <Transition name="fade">
            <div
              v-if="currentChat?.availableChips.length && !formOpen"
              class="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              <button
                v-for="chip in currentChat.availableChips"
                :key="chip.id"
                class="text-left px-4 py-3 border border-white/10 rounded-xl text-sm hover:bg-white/5 hover:border-white/20 transition-all group"
                @click="selectChip(chip)"
              >
                <span class="text-gray-200 group-hover:text-white font-medium">{{ chip.label }}</span>
                <p v-if="chip.sublabel" class="text-xs text-gray-500 mt-0.5">{{ chip.sublabel }}</p>
              </button>
            </div>
          </Transition>

          <!-- Collapsed: clickable bar -->
          <div
            v-if="!formOpen"
            class="flex items-center gap-3 bg-[#2f2f2f] rounded-2xl px-4 py-3 hover:bg-[#353535] transition-colors cursor-pointer"
            @click="openForm"
          >
            <span class="text-sm text-gray-500 flex-1">{{ ui.askAnything }}</span>
            <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                />
              </svg>
            </div>
          </div>

          <!-- Expanded: contact form -->
          <Transition name="fade">
            <div
              v-if="formOpen"
              class="bg-[#2f2f2f] rounded-2xl p-4 space-y-3 animate-fade-in"
            >
              <!-- Close row -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-400">{{ ui.askAnything }}</span>
                <button
                  class="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  @click="closeForm"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Email field -->
              <input
                v-model="formEmail"
                type="email"
                :placeholder="ui.yourEmail"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-emerald-500/50 transition-colors"
              />

              <!-- Message field -->
              <textarea
                v-model="formMessage"
                :placeholder="ui.yourMessage"
                rows="4"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-emerald-500/50 transition-colors resize-none"
                @keydown.ctrl.enter="submitForm"
                @keydown.meta.enter="submitForm"
              />

              <!-- Send button -->
              <div class="flex justify-end">
                <button
                  class="px-5 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
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
  </div>
</template>

<style>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in-up 0.3s ease-out;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-track {
  background: transparent;
}
main::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
.popup-content::-webkit-scrollbar {
  width: 6px;
}
.popup-content::-webkit-scrollbar-track {
  background: transparent;
}
.popup-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
</style>