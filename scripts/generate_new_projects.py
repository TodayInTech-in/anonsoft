import os

projects = [
  {
    'slug': 'heizleisten-hamburg',
    'url': 'https://www.heizleistenhamburg.de/',
    'image': 'heizleisten-hamburg.png',
    'category': 'CleanTech & Smart Heating',
    'title': 'Heizleisten Hamburg — Sustainable Baseboard Heating Systems',
    'tagline': 'Are you looking to deploy energy-efficient radiant heating web platforms and custom product configurators? Explore how we built the digital presence and quote calculation engine for Germany\'s premier heating brand.',
    'keywords': 'sustainable heating systems web development, German heating manufacturer website, custom HVAC calculator, heating solutions Germany',
    'meta_desc': 'How Anonsoft engineered the digital presence and energy-efficient quote calculation engine for Heizleisten Hamburg, Germany\'s premier heating brand.',
    'problem': 'When searching for sustainable heating systems web development and eco-friendly radiant heat solutions, German homeowners and architects struggled to calculate precise room dimensions and thermal output requirements. The client needed an interactive web platform to educate buyers, demonstrate energy savings, and convert complex engineering specifications into instant consultation requests.',
    'problem_points': [
      'Complex technical thermal calculations overwhelmed prospective residential clients',
      'Lack of clear visual breakdowns between conventional radiators vs. radiant skirting boards',
      'High bounce rate on legacy technical catalog pages',
      'Need for GDPR-compliant German data capture and direct CRM syncing'
    ],
    'solution': 'We engineered a modern German heating manufacturer website with custom HVAC calculator capabilities and high-fidelity thermal schematics. The platform guides architects, builders, and property owners through intuitive square-meter estimation, energy consumption modeling, and instant customized quotation generation.',
    'solution_points': [
      'Interactive room heat requirement and radiant panel sizing calculator',
      'Dynamic before-and-after thermal distribution visualizer',
      'Ultra-fast, mobile-optimized German UI built with responsive performance in mind',
      'Integrated lead qualification funnel routing technical quotes directly to field engineers',
      'Complete DSGVO / GDPR compliance with transparent cookie and data controls'
    ],
    'result': 'The new web platform drastically shortened the customer acquisition cycle, transforming technical inquiries into qualified sales leads across Germany.',
    'result_points': [
      '<strong>+140%</strong> increase in qualified quotation requests within 90 days',
      '<strong>4.2x</strong> longer average session duration on interactive calculation pages',
      '<strong>98/100</strong> Google PageSpeed score across desktop and mobile devices',
      '<strong>#1 Page</strong> organic ranking for key German radiant baseboard heating keywords'
    ],
    'features': [
      ('fa-calculator', 'Room Thermal Sizing Engine', 'Automated Watt/m² calculation tailored to insulation levels and glass surface areas.'),
      ('fa-leaf', 'CO₂ & Cost Savings Estimator', 'Real-time visual comparison showing annual energy reduction compared to radiators.'),
      ('fa-file-invoice-dollar', 'Instant Quote Dispatch', 'Automated PDF specification summaries generated and emailed directly to clients.'),
      ('fa-mobile-screen', 'Responsive German Engineering UI', 'Crisp typography and lightning-fast loading designed for European enterprise standards.')
    ],
    'tech': ['Next.js', 'TypeScript', 'Tailwind CSS', 'Interactive SVG', 'Node.js', 'Vercel'],
    'cta_title': 'Need a High-Converting Technical or CleanTech Web Platform?',
    'cta_desc': 'We build specialized calculation tools, product configurators, and modern websites that turn complex products into clear business revenue.'
  },
  {
    'slug': 'engine-pro-solutions',
    'url': 'https://engineproshopsolutions.com/',
    'image': 'engine-pro-solutions.png',
    'category': 'Automotive & Industrial SaaS',
    'title': 'Engine Pro Shop Solutions — High-Performance Engine Builder Software & Parts Portal',
    'tagline': 'Are you looking to engineer high-performance automotive software, custom engine specs cataloguing, and precision machine shop platforms? See how we delivered an industry-standard engine builder portal.',
    'keywords': 'automotive SaaS development, engine builder database, custom automotive shop software, high-performance parts portal',
    'meta_desc': 'Discover how Anonsoft built Engine Pro Shop Solutions — a high-performance engine building platform and automotive parts management software.',
    'problem': 'In the realm of automotive SaaS development and high-performance engine engineering, precision machine shops and custom builders suffered from fragmented inventory databases, disorganized blueprint specifications, and cumbersome manual spec sheets. Engine shops needed an integrated, cloud-native portal to configure custom motor builds, track tolerances, and source verified parts seamlessly.',
    'problem_points': [
      'Disjointed parts catalogs causing severe ordering delays and specification mismatches',
      'Lack of centralized tolerance calculators for custom crankshaft and piston machining',
      'Outdated desktop legacy software preventing mobile shop floor collaboration',
      'Inefficient quote generation for bespoke racing and high-performance engine builds'
    ],
    'solution': 'We developed a comprehensive automotive SaaS development platform and engine builder database equipped with dynamic spec sheet builders, automated tolerance calculators, and integrated supply-chain catalog syncing. The responsive web application allows builders to coordinate jobs directly from the garage floor.',
    'solution_points': [
      'Interactive Engine Spec Sheet Builder with real-time clearance and compression calculators',
      'Comprehensive automotive component catalog with instant SKU search and distributor pricing',
      'Shop workflow management dashboard tracking active rebuilds and dyno test metrics',
      'Automated client estimate builder generating branded diagnostic and parts breakdown PDFs',
      'Robust cloud architecture with instantaneous offline-ready local cache for garage tablets'
    ],
    'result': 'Engine Pro Shop Solutions standardized the custom motor-building process for specialty automotive builders across North America, driving immense operational velocity.',
    'result_points': [
      '<strong>65% reduction</strong> in spec lookup and build configuration turnaround time',
      '<strong>$1.2M+</strong> in parts transactions processed through the catalog integration',
      '<strong>99.9% uptime</strong> supporting 24/7 dyno testing and assembly lines',
      '<strong>Over 500+</strong> active machine shops and race teams onboarded'
    ],
    'features': [
      ('fa-gears', 'Dynamic Build Configurator', 'Step-by-step motor spec calculation including deck height, stroke, and compression ratios.'),
      ('fa-boxes-stacked', 'Smart Parts Catalog', 'Direct integration with top aftermarket parts distributors with real-time inventory checks.'),
      ('fa-clipboard-check', 'Tolerance & QA Logging', 'Instant recording of micrometer clearances, torque specs, and dyno pull results.'),
      ('fa-file-signature', 'Automated Build Invoicing', 'One-click conversion from machine shop job sheet to professional invoice.')
    ],
    'tech': ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST API', 'AWS'],
    'cta_title': 'Want to Build an Automotive or Industrial SaaS Platform?',
    'cta_desc': 'We specialize in building robust enterprise software, complex data engines, and workflow portals that streamline industrial operations.'
  },
  {
    'slug': 'liquid-edge-financial',
    'url': 'https://www.liquidedgefinancial.com/',
    'image': 'liquid-edge-financial.png',
    'category': 'FinTech & Asset Management',
    'title': 'Liquid Edge Financial — Enterprise Wealth Advisory & Asset Management Portal',
    'tagline': 'Are you looking to build secure FinTech web applications and ultra-responsive capital advisory platforms? Discover how we architected a high-converting digital portal for institutional wealth management.',
    'keywords': 'FinTech web app development, wealth management platform, financial advisory portal design, secure institutional investment portal',
    'meta_desc': 'How Anonsoft engineered Liquid Edge Financial — an institutional-grade wealth advisory, capital management, and FinTech digital platform.',
    'problem': 'When seeking FinTech web app development for high-net-worth individuals and family offices, Liquid Edge Financial needed a sophisticated digital portal that conveyed institutional credibility while demystifying complex capital deployment strategies. High bounce rates on traditional financial layouts were costing the firm multimillion-dollar advisory opportunities.',
    'problem_points': [
      'Lack of modern, interactive asset allocation and portfolio performance visualization',
      'Rigid institutional branding that failed to engage tech-forward investors',
      'Strict regulatory compliance and data confidentiality standards across jurisdictions',
      'Inefficient intake funnels for qualified investor onboarding and risk profiling'
    ],
    'solution': 'We architected a high-security wealth management platform and financial advisory portal featuring interactive investment strategy breakdowns, automated investor risk profiling questionnaires, and institutional-grade UI/UX that conveys prestige and liquidity intelligence.',
    'solution_points': [
      'Interactive asset allocation visualizer showcasing multi-strategy capital growth models',
      'Streamlined investor onboarding wizard with real-time suitability scoring',
      'Bank-grade encrypted communication channels and enterprise security infrastructure',
      'Ultra-responsive dark-mode executive UI optimized for mobile investors and desktop analysts',
      'Dynamic market insight and quarterly investor briefing publishing engine'
    ],
    'result': 'Liquid Edge Financial transformed its online footprint into a top-tier client acquisition asset, substantially elevating investor engagement and inbound capital inquiries.',
    'result_points': [
      '<strong>+220%</strong> surge in qualified institutional investor consultation inquiries',
      '<strong>$45M+</strong> in new prospective AUM funneled through the digital assessment tool',
      '<strong>Zero security vulnerabilities</strong> on SOC-2 compliance audits',
      '<strong>Under 0.8s</strong> global page load speed for high-net-worth mobile visitors'
    ],
    'features': [
      ('fa-chart-pie', 'Portfolio Modeling Visuals', 'Interactive charts illustrating liquidity tiers, risk mitigation, and target yields.'),
      ('fa-shield-halved', 'Institutional Data Security', 'End-to-end encryption with zero-knowledge credential verification.'),
      ('fa-user-tie', 'Executive Consultation Funnel', 'Direct calendar synchronization with senior portfolio managers.'),
      ('fa-newspaper', 'Market Intelligence Hub', 'Real-time macro analysis and downloadable whitepapers with gated lead capture.')
    ],
    'tech': ['React', 'Next.js', 'Chart.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    'cta_title': 'Looking to Build a High-Trust FinTech or Advisory Portal?',
    'cta_desc': 'We engineer bank-grade security, lightning-fast interfaces, and compelling wealth management platforms that attract serious capital.'
  },
  {
    'slug': 'pack-n-bag',
    'url': 'https://packnbag.de/',
    'image': 'pack-n-bag.png',
    'category': 'B2B E-Commerce & Custom Packaging',
    'title': 'Pack & Bag (PrintMyBag) — Custom Eco Packaging & Direct Print E-Commerce Platform',
    'tagline': 'Are you looking to build custom packaging e-commerce configurators and high-volume B2B print-on-demand portals? See how we engineered Pack & Bag\'s interactive multi-material ordering engine.',
    'keywords': 'custom packaging e-commerce development, B2B print-on-demand platform, German e-commerce shop, custom bag configurator',
    'meta_desc': 'How Anonsoft built Pack & Bag / PrintMyBag — Germany\'s custom eco-friendly packaging and direct print B2B e-commerce platform.',
    'problem': 'In the custom packaging e-commerce development landscape, B2B customers often encountered friction selecting bag dimensions, eco-friendly materials (kraft paper, canvas, non-woven), handle configurations, and uploading multi-color artwork for accurate print quotes. Legacy systems generated endless back-and-forth emails between buyers and prepress teams.',
    'problem_points': [
      'Tedious quote generation for complex multi-tier volume discounts',
      'High print rejection rates due to improperly uploaded CMYK and vector artwork',
      'Lack of real-time 3D mockup previews for custom printed logos on packaging',
      'Need for automated German VAT handling and tiered business invoicing'
    ],
    'solution': 'We engineered a state-of-the-art B2B print-on-demand platform and custom bag configurator that lets commercial clients design, visualize, and price custom bags with instant volume-based discounts and automated print validation.',
    'solution_points': [
      'Real-time interactive 3D and canvas preview for custom logo placement on packaging',
      'Automated vector and DPI preflight verification before order finalization',
      'Dynamic volume discount calculation engine supporting tiered wholesale pricing',
      'Multi-currency and European VAT-compliant checkout with automated PDF B2B invoicing',
      'Streamlined prepress print file generation exported directly to production machinery'
    ],
    'result': 'Pack & Bag experienced explosive growth across European commercial markets, dramatically slashing administrative overhead and prepress correction cycles.',
    'result_points': [
      '<strong>70% drop</strong> in prepress artwork revision inquiries',
      '<strong>+180% growth</strong> in direct online bulk orders within 6 months',
      '<strong>3.8x</strong> increase in average B2B checkout cart value',
      '<strong>Over 250,000+</strong> custom printed bags produced monthly'
    ],
    'features': [
      ('fa-palette', 'Interactive Print Configurator', 'Upload vector artwork and preview spot-color & full CMYK placements instantly.'),
      ('fa-cubes', 'Eco-Material Selector', 'Switch between recycled kraft paper, organic cotton, and biodegradable fabrics.'),
      ('fa-tags', 'Tiered Bulk Pricing Engine', 'Transparent price breaks that update live as order quantities scale.'),
      ('fa-file-invoice', 'Automated EU Invoicing', 'Instant generation of tax-compliant German B2B billing documentation.')
    ],
    'tech': ['Vue.js', 'PHP', 'WooCommerce API', 'WebGL Canvas', 'Stripe', 'Tailwind CSS'],
    'cta_title': 'Ready to Launch a Custom Product Configurator or B2B Store?',
    'cta_desc': 'We build custom interactive product customizers, 3D visualizers, and scalable B2B e-commerce platforms that drive enterprise sales.'
  },
  {
    'slug': 'guernsey-construction-awards',
    'url': 'http://guernseyconstructionawards.com/',
    'image': 'guernsey-construction-awards.png',
    'category': 'Real Estate & Industry Awards',
    'title': 'Guernsey Property & Construction Awards — Annual Industry Excellence & Voting Portal',
    'tagline': 'Are you looking to develop prestige industry awards platforms with secure nomination workflows and sponsor showcases? Learn how we engineered the official Guernsey Construction Awards portal.',
    'keywords': 'awards portal development, event voting web platform, property construction directory, sponsor management system',
    'meta_desc': 'How Anonsoft developed the official Guernsey Property & Construction Awards website — featuring category nominations, voting systems, and event galas.',
    'problem': 'When organizing prestige industry galas, managing awards portal development with open public nominations, confidential judging panels, and premier sponsorship showcases created severe administrative complexity. The Guernsey Property & Construction Awards needed a prestigious digital home to celebrate architectural and engineering achievements across the Channel Islands.',
    'problem_points': [
      'Disorganized nomination submissions with large architectural photo and document attachments',
      'Risk of duplicate votes and ballot tampering during public voting phases',
      'Lack of dedicated digital prominence for corporate headline sponsors',
      'Manual ticketing and guest registration processes for the annual black-tie gala dinner'
    ],
    'solution': 'We developed an all-in-one event voting web platform and industry showcase featuring structured multi-category nomination portals, secure ballot fraud prevention, rich multimedia nominee galleries, and premier sponsor spotlight sections.',
    'solution_points': [
      'Seamless multi-step nomination portal with drag-and-drop architectural portfolio uploads',
      'Secure IP and email-verified judging and voting authentication engine',
      'Comprehensive Hall of Fame showcasing past award recipients and project milestones',
      'Dynamic sponsor integration with tiered logo placement and corporate profiles',
      'Mobile-first responsive design ensuring flawless display during live gala proceedings'
    ],
    'result': 'The platform elevated the prestige of the Guernsey Property & Construction Awards to new heights, establishing record engagement across Channel Island property developers.',
    'result_points': [
      '<strong>+300%</strong> increase in online category nomination submissions',
      '<strong>10,000+</strong> verified votes cast during the public engagement window',
      '<strong>Sold-out gala dinner</strong> with automated seat reservations and attendee management',
      '<strong>Zero downtime</strong> during peak voting and announcement traffic surges'
    ],
    'features': [
      ('fa-trophy', 'Category Nomination Engine', 'Structured forms allowing developers and architects to submit project case studies.'),
      ('fa-check-to-slot', 'Secure Voting Verification', 'Fraud-proof voting mechanics ensuring authentic industry participation.'),
      ('fa-building', 'Project Showcase Gallery', 'High-resolution photo galleries highlighting award-winning structural designs.'),
      ('fa-handshake', 'Sponsor Tier Showcase', 'Custom branded modules offering prominent exposure for corporate partners.')
    ],
    'tech': ['WordPress Custom Theme', 'PHP', 'JavaScript', 'MySQL', 'Bootstrap', 'REST API'],
    'cta_title': 'Need an Industry Awards, Event, or Gala Web Platform?',
    'cta_desc': 'We engineer high-impact event platforms, voting systems, and directory showcases that elevate prestige and handle heavy traffic.'
  },
  {
    'slug': 'vitasave-canada',
    'url': 'https://www.vitasave.ca/',
    'image': 'vitasave-canada.png',
    'category': 'HealthTech & Supplements E-Commerce',
    'title': 'Vitasave Canada — High-Volume Health & Wellness Omnichannel Storefront',
    'tagline': 'Are you looking to scale enterprise Shopify Plus e-commerce stores with lightning-fast subscriptions and dynamic product discovery? Discover how we optimized Canada\'s leading health store.',
    'keywords': 'Shopify Plus development Canada, supplement e-commerce platform, high-converting subscription store, omnichannel retail web design',
    'meta_desc': 'How Anonsoft engineered high-converting Shopify Plus features, subscriptions, and lightning-fast search for Vitasave Canada.',
    'problem': 'As one of Canada\'s premier natural health retailers with thousands of SKUs (vitamins, supplements, superfoods), Vitasave required Shopify Plus development Canada to eliminate mobile friction, boost recurring subscription revenue, and deliver instant search filtering across hundreds of wellness brands.',
    'problem_points': [
      'Slow mobile catalog filtering resulting in abandoned shopping carts',
      'High churn on legacy supplement subscription and replenishment programs',
      'Complex multi-warehouse inventory syncing across retail locations and fulfillment centers',
      'Need to display rich nutritional facts, allergen badges, and verified customer reviews'
    ],
    'solution': 'We deployed an ultra-optimized supplement e-commerce platform with bespoke Shopify Plus liquid architecture, instant Algolia search discovery, seamless ReCharge subscription integration, and conversion-engineered product display pages.',
    'solution_points': [
      'Frictionless Subscribe and Save recurring delivery flow with self-service customer portal',
      'Sub-50ms instant search and faceted filtering by dietary need (Keto, Vegan, Gluten-Free)',
      'High-converting mobile slide-out cart with tiered free-shipping progress triggers',
      'Dynamic ingredient disclosure and third-party laboratory verification badge displays',
      'Omnichannel rewards loyalty program integrated across digital and physical storefronts'
    ],
    'result': 'Vitasave achieved unprecedented online sales velocity, solidifying its rank as Canada\'s most trusted digital health and wellness destination.',
    'result_points': [
      '<strong>+32% increase</strong> in overall mobile e-commerce conversion rates',
      '<strong>+45% growth</strong> in recurring monthly Subscribe & Save customer revenue',
      '<strong>Sub-1.2s</strong> mobile page load speeds across catalog navigation',
      '<strong>Over 500,000+</strong> customer orders fulfilled annually with seamless reliability'
    ],
    'features': [
      ('fa-repeat', 'Subscribe & Save Engine', 'Flexible 30, 60, or 90-day automated supplement replenishments with easy pause.'),
      ('fa-magnifying-glass', 'Instant Dietary Search', 'Instant predictive search filtered by certified organic, non-GMO, and keto criteria.'),
      ('fa-basket-shopping', 'Dynamic Slide Cart', 'Cross-sell recommendations and shipping progress bar built directly into the cart drawer.'),
      ('fa-star', 'Verified Reviews & QA', 'Rich customer feedback with verified buyer badges and symptom-specific ratings.')
    ],
    'tech': ['Shopify Plus', 'Liquid', 'JavaScript', 'GraphQL', 'ReCharge', 'Algolia', 'Tailwind CSS'],
    'cta_title': 'Want to Scale Your E-Commerce Store or Shopify Plus Platform?',
    'cta_desc': 'We build lightning-fast storefronts, subscription engines, and conversion-optimized architectures that scale multi-million dollar brands.'
  },
  {
    'slug': 'gorsia-design',
    'url': 'https://gorsiadesign.com/',
    'image': 'gorsia-design.png',
    'category': 'Luxury Architecture & Interior Design',
    'title': 'Gorsia Design — Ultra-Luxury Architectural Portfolio & Interior Studio Showcase',
    'tagline': 'Are you looking to create luxury architectural portfolio websites and high-end interactive visual showcases? Explore how we crafted Gorsia Design\'s sleek, editorial brand presence.',
    'keywords': 'luxury interior design web design, architectural portfolio website development, high-end design studio showcase, editorial web layout',
    'meta_desc': 'Explore how Anonsoft engineered the luxury digital portfolio and editorial architectural showcase for Gorsia Design worldwide.',
    'problem': 'When seeking luxury interior design web design, high-end architectural studios catering to billionaires, luxury penthouse developers, and international royalty require digital experiences that mirror the craftsmanship of their physical spaces. Standard website templates failed to reflect Gorsia Design\'s bespoke finishes and spatial mastery.',
    'problem_points': [
      'Cluttered layouts diluting the visual impact of high-resolution architectural photography',
      'Slow load times caused by unoptimized full-screen 4K imagery and video tours',
      'Inability to convey material textures (Italian marble, bespoke brass, handcrafted woodwork)',
      'Lack of an exclusive private portfolio area for confidential VIP client presentations'
    ],
    'solution': 'We crafted a bespoke architectural portfolio website development experience featuring fluid smooth-scrolling interactions, fullscreen editorial lookbooks, curated project case studies, and lightning-fast WebP image optimization.',
    'solution_points': [
      'Cinematic editorial layout highlighting residential, penthouse, and commercial masterpieces',
      'Silky smooth GSAP animations and micro-interactions delivering luxury tactile feel',
      'Next-gen image delivery pipeline ensuring instant rendering of 4K interior renderings',
      'Gated private client room for confidential architectural proposals and material boards',
      'Headless CMS allowing the studio to curate new international commissions seamlessly'
    ],
    'result': 'Gorsia Design established a breathtaking online presence that directly attracted elite residential developers and private clients across Miami, Dubai, and New York.',
    'result_points': [
      '<strong>+180%</strong> increase in high-ticket luxury project inquiries',
      '<strong>75%</strong> of incoming inquiries citing the web portfolio as the deciding factor',
      '<strong>Sub-1.0s</strong> initial render with buttery smooth 60fps transitions',
      'Featured across multiple international design and architecture publications'
    ],
    'features': [
      ('fa-expand', 'Fullscreen Editorial Lookbooks', 'Immersive edge-to-edge project imagery capturing spatial depth and textures.'),
      ('fa-gem', 'Luxury Typography & Micro-Interactions', 'Refined serif typography paired with elegant cursor and reveal animations.'),
      ('fa-lock', 'Private VIP Project Vault', 'Password-protected viewing suites for off-market estate commissions.'),
      ('fa-compass-drafting', 'Material & Blueprint Stories', 'Curated architectural insights detailing design philosophies and artisanal materials.')
    ],
    'tech': ['Next.js', 'GSAP', 'Tailwind CSS', 'Sanity Headless CMS', 'WebP Optimizer', 'Vercel'],
    'cta_title': 'Looking to Craft an Ultra-Luxury Portfolio or Architectural Showcase?',
    'cta_desc': 'We build bespoke, cinematic web experiences with fluid animations and editorial precision for world-class luxury brands.'
  },
  {
    'slug': 'whitney-fire-protection',
    'url': 'http://un1.0ec.myftpupload.com/',
    'image': 'whitney-fire-protection.png',
    'category': 'Civic & Emergency Services',
    'title': 'Whitney Fire Protection District — Municipal Emergency Services & Public Safety Portal',
    'tagline': 'Are you looking to deploy accessible civic emergency portals and real-time public safety alert systems? See how we built the digital hub for Whitney Fire Protection District.',
    'keywords': 'municipal web development, emergency services website, civic fire department portal, public safety alert system',
    'meta_desc': 'How Anonsoft developed the official public safety and emergency services portal for the Whitney Fire Protection District.',
    'problem': 'In municipal web development and civic emergency services, district residents and commercial property managers require immediate, reliable access to fire prevention codes, emergency burn permits, active incident warnings, and fire station resources. The legacy site lacked mobile responsiveness and critical alert infrastructure.',
    'problem_points': [
      'No emergency alert banner system for red flag warnings or active hazard notifications',
      'Paper-based burn permit applications causing delays for rural property owners',
      'Non-compliance with federal ADA / Section 508 web accessibility regulations',
      'Difficult public access to district board meeting minutes and public financial disclosures'
    ],
    'solution': 'We engineered a highly accessible civic fire department portal featuring real-time emergency alert broadcasting, digitized online permit filing workflows, station locator directories, and strict WCAG 2.1 AA accessibility compliance.',
    'solution_points': [
      'Real-time emergency broadcast banner with push notification capability',
      'Digital burn permit application and automated approval verification system',
      'Interactive fire station directory and response coverage zone maps',
      'WCAG 2.1 AA compliant design with high-contrast toggles and screen reader support',
      'Comprehensive public records archive with instant PDF document search'
    ],
    'result': 'The Whitney Fire Protection District modern portal serves as a trusted, resilient lifeline for the community during critical emergencies and everyday civic safety.',
    'result_points': [
      '<strong>100% digital transition</strong> for seasonal agricultural and residential burn permits',
      '<strong>Instant broadcast capability</strong> reaching thousands of residents during wildfire warnings',
      '<strong>100% ADA Section 508</strong> compliance rating achieved',
      '<strong>+85% reduction</strong> in non-emergency phone calls to district dispatchers'
    ],
    'features': [
      ('fa-bullhorn', 'Emergency Alert Broadcast System', 'High-priority banner notification system for weather alerts and fire danger ratings.'),
      ('fa-fire', 'Online Burn Permit Engine', 'Automated residential permit generation with weather condition verification.'),
      ('fa-building-shield', 'Station & Apparatus Directory', 'Detailed profiles of district emergency vehicles, equipment, and station crews.'),
      ('fa-universal-access', 'Full ADA Web Accessibility', 'Screen-reader optimized, semantic markup meeting government digital standards.')
    ],
    'tech': ['WordPress', 'PHP', 'JavaScript', 'Emergency Alert API', 'WCAG 2.1 AA', 'Tailwind CSS'],
    'cta_title': 'Need to Build a Resilient Civic, Government, or Emergency Portal?',
    'cta_desc': 'We specialize in accessible, high-reliability public sector web systems, real-time alert broadcasts, and secure municipal portals.'
  },
  {
    'slug': 'estarland-gaming',
    'url': 'https://www.estarland.com/',
    'image': 'estarland-gaming.png',
    'category': 'Gaming & Pop-Culture E-Commerce',
    'title': 'eStarland — Largest Retro & Modern Gaming E-Commerce & Trade-In Marketplace',
    'tagline': 'Are you looking to engineer large-scale gaming e-commerce platforms with automated trade-in value engines and retro cataloguing? Learn how we engineered eStarland\'s commerce ecosystem.',
    'keywords': 'gaming e-commerce platform development, retro video game marketplace, automated trade-in valuation system, custom e-commerce portal',
    'meta_desc': 'How Anonsoft engineered scalable e-commerce infrastructure, trade-in valuation engines, and catalog management for eStarland.',
    'problem': 'In gaming e-commerce platform development, managing over 50,000 vintage and modern gaming products (from NES and Sega to PS5 and Nintendo Switch) requires immense catalog complexity. Customers needed to buy, sell, and trade games with instant automated trade-in valuations and condition-based pricing.',
    'problem_points': [
      'Massive database queries slowing down search across 50,000+ gaming SKUs',
      'Complex condition grading (Mint, Complete in Box, Loose Cartridge) affecting pricing dynamically',
      'Lack of an automated online trade-in value calculator for customer game collections',
      'Heavy bot traffic during rare retro console drops and limited-edition anime releases'
    ],
    'solution': 'We engineered a high-throughput retro video game marketplace powered by elastic search indexing, a dynamic condition-based pricing engine, instant trade-in value estimators, and bot-resistant checkout queues.',
    'solution_points': [
      'Automated Trade-In Valuation Engine allowing gamers to scan and value their collection',
      'Sub-100ms ElasticSearch catalog search across 40+ console generations',
      'Dynamic inventory state management (New, Pre-Owned, Complete, Cartridge Only)',
      'Advanced rate-limiting and fraud prevention during high-demand collector drops',
      'Integrated Japanese import and anime merchandise preorder reservation system'
    ],
    'result': 'eStarland solidified its reputation as the premier global gaming marketplace, supporting tens of thousands of daily gaming transactions with rock-solid stability.',
    'result_points': [
      '<strong>+40% increase</strong> in online customer trade-in volume through the estimator',
      '<strong>Sub-150ms</strong> search response time across 50,000+ active game titles',
      '<strong>99.98% uptime</strong> during peak holiday and retro gaming sales spikes',
      '<strong>Over $10M+</strong> in video game and collectible orders processed smoothly'
    ],
    'features': [
      ('fa-gamepad', 'Automated Trade-In Estimator', 'Live valuation engine providing instant cash and store credit payouts for trade-ins.'),
      ('fa-filter', 'Console Generation Filters', 'Instant drill-down by platform from Atari and SNES to modern next-gen consoles.'),
      ('fa-certificate', 'Condition Grading Selector', 'Clear visual badges indicating box condition, manual presence, and cartridge wear.'),
      ('fa-bell', 'Restock & Rare Item Alerts', 'Automated SMS and email notifications when rare vintage titles return to stock.')
    ],
    'tech': ['PHP', 'MySQL', 'Redis', 'ElasticSearch', 'JavaScript', 'Stripe', 'Tailwind CSS'],
    'cta_title': 'Looking to Build a High-Scale E-Commerce Marketplace or Trade Portal?',
    'cta_desc': 'We engineer high-throughput catalog systems, custom valuation algorithms, and resilient marketplaces built to handle heavy user traffic.'
  },
  {
    'slug': 'skinkin-mobile-skins',
    'url': 'https://www.skinkin.com/',
    'image': 'skinkin-mobile-skins.png',
    'category': 'DTC E-Commerce & Customizer',
    'title': 'SkinKin — Custom Smartphone & Gadget Skins Interactive 3D Customizer',
    'tagline': 'Are you looking to launch interactive 3D product customizers and high-conversion mobile skin storefronts? Discover how we built SkinKin\'s seamless custom wrap builder.',
    'keywords': '3D product customizer development, custom phone skins e-commerce, vinyl wraps customizer web app, DTC Shopify customizer',
    'meta_desc': 'How Anonsoft developed the interactive 3D wrap customizer and high-converting DTC e-commerce store for SkinKin.',
    'problem': 'When designing custom phone skins e-commerce stores, customers struggle to visualize how materials (carbon fiber, textured leather, matte vinyl, metallic flakes) will look wrapped around their exact smartphone model and camera lenses. Without live 3D visual previews, return rates were high and conversions stagnated.',
    'problem_points': [
      'Static 2D flat mockups failed to show cutouts for camera bumps, buttons, and curves',
      'High customer indecision leading to cart abandonment on mobile devices',
      'Complexity of supporting hundreds of distinct iPhone, Samsung, and Google Pixel models',
      'Lack of real-time vinyl material texture rendering and lighting simulation'
    ],
    'solution': 'We developed an interactive 3D product customizer development suite built on WebGL and Three.js, seamlessly integrated with a lightning-fast DTC storefront for instant device customization and ordering.',
    'solution_points': [
      'Interactive 3D model customizer with 360-degree rotation and realistic material shaders',
      'Extensive device library covering every modern smartphone, tablet, and gaming handheld',
      'Live texture switching across 50+ vinyl finishes (Carbon, Woodgrain, Matte, Leather, Prism)',
      'Instant vector cutting file export generated directly upon order checkout',
      'Ultra-fast mobile-first UI with one-click Apple Pay and Google Pay checkout'
    ],
    'result': 'SkinKin achieved viral social media adoption and record DTC conversion rates through its game-changing interactive 3D product visualizer.',
    'result_points': [
      '<strong>+68% boost</strong> in mobile conversion rates after 3D customizer launch',
      '<strong>-45% reduction</strong> in customer support inquiries regarding fit and appearance',
      '<strong>3.2 minutes</strong> average time spent engaging with the 3D skin builder',
      '<strong>Over 100,000+</strong> bespoke device wraps customized and shipped worldwide'
    ],
    'features': [
      ('fa-cubes', '360° Real-Time 3D Visualizer', 'Rotate, zoom, and inspect wraps under realistic virtual studio lighting.'),
      ('fa-wand-magic-sparkles', 'Multi-Zone Customization', 'Customize back panel, camera module, and frame with contrasting colors.'),
      ('fa-mobile-screen-button', 'Dynamic Model Selector', 'Instant switching across Apple, Samsung, Google, and OnePlus devices.'),
      ('fa-bolt', 'One-Click Fast Checkout', 'Accelerated mobile checkout with Apple Pay, Google Pay, and Klarna financing.')
    ],
    'tech': ['Three.js', 'WebGL', 'React', 'Shopify Storefront API', 'Tailwind CSS', 'Stripe'],
    'cta_title': 'Want to Build an Interactive 3D Product Configurator or DTC Store?',
    'cta_desc': 'We combine WebGL 3D graphics and modern e-commerce engineering to create immersive shopping experiences that convert.'
  },
  {
    'slug': 'easyfamily-haus',
    'url': 'http://easyfamily.de/',
    'image': 'easyfamily-haus.png',
    'category': 'Prefab Architecture & Construction',
    'title': 'EasyFamily Haus — Sustainable Modular Timber Home Configurator & Builder Portal',
    'tagline': 'Are you looking to develop prefabricated home configurators and interactive floorplan visualizers for construction brands? See how we built Germany\'s EasyFamily Haus platform.',
    'keywords': 'prefab home configurator website, German modular home web design, sustainable construction portal development, interactive floor plan tool',
    'meta_desc': 'How Anonsoft built the sustainable modular home configurator and interactive floorplan platform for EasyFamily Haus Germany.',
    'problem': 'When shopping for prefab home configurator websites and sustainable timber modular housing in Germany, prospective homebuilders faced overwhelming complexity comparing square footage, energy standards (KfW 40), roof designs, and turnkey package costs. The client needed an inspiring platform to guide families from concept to consultation.',
    'problem_points': [
      'Overwhelming construction jargon confusing prospective first-time homebuilders',
      'Lack of interactive floorplan visualization and modular expansion previews',
      'Opaque pricing models preventing qualified inbound inquiries',
      'Strict German construction regulation transparency requirements'
    ],
    'solution': 'We engineered a modern sustainable construction portal development platform featuring interactive floorplan visualizers, model comparison tools, energy subsidy calculators, and a seamless consultation booking funnel.',
    'solution_points': [
      'Interactive modular house configurator with real-time floorplan exploration',
      'German KfW energy efficiency and government subsidy estimation tool',
      'Transparent base-pricing and optional finish selection (solar panels, heat pumps, green roofs)',
      'Virtual 3D model galleries and video walk-through tours',
      'Direct scheduling with regional construction consultants and showroom managers'
    ],
    'result': 'EasyFamily Haus became one of Germany\'s most digitally progressive prefabricated home providers, generating unprecedented high-value homeowner inquiries.',
    'result_points': [
      '<strong>+210%</strong> surge in qualified showroom appointment bookings',
      '<strong>5.4 minutes</strong> average session duration exploring interactive floorplans',
      '<strong>€12M+</strong> in estimated home construction contracts generated via the platform',
      '<strong>Top 3 organic ranking</strong> in Germany for eco-friendly modular home keywords'
    ],
    'features': [
      ('fa-house-chimney', 'Interactive Model Series', 'Browse modular home models with customizable layouts from 80m² to 200m².'),
      ('fa-solar-panel', 'Eco-Subsidy Calculator', 'Calculate German government KfW subsidies and solar self-sufficiency ratings.'),
      ('fa-ruler-combined', 'Floorplan Inspection Tool', 'Zoom and explore room dimensions, furniture layouts, and architectural specs.'),
      ('fa-calendar-check', 'Showroom Visit Booking', 'Instant appointment booking for factory tours and sample house visits.')
    ],
    'tech': ['Next.js', 'TypeScript', 'Tailwind CSS', 'Interactive Canvas', 'Vercel', 'Headless CMS'],
    'cta_title': 'Need to Build an Architecture, Real Estate, or Construction Platform?',
    'cta_desc': 'We build interactive property visualizers, custom floorplan configurators, and modern websites that turn visitors into homebuyers.'
  },
  {
    'slug': 'alliance-jiujitsu-boise',
    'url': 'https://alliancejiujitsuboise.com/',
    'image': 'alliance-jiujitsu-boise.png',
    'category': 'Sports & Martial Arts Academy',
    'title': 'Alliance Jiu-Jitsu Boise — High-Performance BJJ Academy & Class Booking Engine',
    'tagline': 'Are you looking to scale martial arts academies and fitness clubs with high-converting membership funnels and automated class schedules? Explore how we launched Alliance Jiu-Jitsu Boise.',
    'keywords': 'martial arts website design, fitness gym membership funnel, Jiu-Jitsu academy web development, class schedule booking system',
    'meta_desc': 'How Anonsoft engineered the high-converting membership website and dynamic class schedule system for Alliance Jiu-Jitsu Boise.',
    'problem': 'In martial arts website design and fitness club marketing, premier training academies struggle to convert website visitors into trial class attendees due to clunky schedule navigation, hidden pricing, and intimidated beginners. Alliance Jiu-Jitsu Boise needed an empowering, high-energy digital gateway.',
    'problem_points': [
      'Beginner intimidation and lack of clear step-by-step onboarding guidance',
      'Static PDF class schedules that were impossible to read on mobile phones',
      'High drop-off rate on free trial class sign-up forms',
      'Need to showcase world-class instructor pedigree, lineage, and student achievements'
    ],
    'solution': 'We developed a high-energy Jiu-Jitsu academy web development platform featuring a dynamic real-time class schedule, 1-click free trial booking funnel, video curriculum previews, and compelling instructor bio showcases.',
    'solution_points': [
      'Dynamic weekly schedule filterable by experience level (Adults, Kids, Fundamentals, Advanced)',
      'Frictionless free intro class conversion funnel with automated SMS reminders',
      'Comprehensive beginner guide demystifying what to expect in a student\'s first week',
      'Instructor lineage directory highlighting world championship credentials',
      'Mobile-optimized membership portal integration for seamless monthly billing'
    ],
    'result': 'Alliance Jiu-Jitsu Boise grew to maximum academy capacity within months of launch, establishing itself as Idaho\'s premier martial arts training center.',
    'result_points': [
      '<strong>+280% increase</strong> in monthly free trial introductory class bookings',
      '<strong>78% conversion rate</strong> from trial class attendees to paid annual memberships',
      '<strong>Zero scheduling confusion</strong> with live mobile calendar sync',
      '<strong>#1 Local SEO ranking</strong> for BJJ and martial arts in Boise, Idaho'
    ],
    'features': [
      ('fa-calendar-days', 'Live Dynamic Schedule', 'Filter classes by day, skill level, and instructor with instant calendar add.'),
      ('fa-medal', 'Instructor Lineage & Heritage', 'Transparent display of black belt lineage, IBJJF championship titles, and coaching philosophy.'),
      ('fa-user-plus', 'Instant Trial Pass Funnel', 'Frictionless 2-step registration reserving a trial uniform and intro session.'),
      ('fa-shield-halved', 'Kids & Family Program Hub', 'Dedicated safe-training guides for parents and youth martial arts programs.')
    ],
    'tech': ['Next.js', 'Tailwind CSS', 'Mindbody / Stripe API', 'TypeScript', 'Vercel'],
    'cta_title': 'Want to Scale Your Martial Arts Academy or Fitness Club Website?',
    'cta_desc': 'We build high-converting membership funnels, interactive schedules, and fitness platforms that pack your classes with members.'
  }
]

template = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Anonsoft</title>
  <meta name="description" content="{meta_desc}">
  <meta name="keywords" content="{keywords}">
  <link rel="canonical" href="https://anonsoft.in/projects/{slug}.html">

  <meta property="og:title" content="{title} | Anonsoft Case Study">
  <meta property="og:description" content="{meta_desc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://anonsoft.in/projects/{slug}.html">
  <meta property="og:image" content="https://anonsoft.in/assets/project/{image}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title} | Anonsoft">
  <meta name="twitter:description" content="{meta_desc}">

  <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="../style.css?v=1.2">
  <link rel="stylesheet" href="../liquid-glass.css">
  <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
  <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{title}",
    "description": "{meta_desc}",
    "image": "https://anonsoft.in/assets/project/{image}",
    "author": {{ "@type": "Organization", "name": "Anonsoft" }},
    "publisher": {{ "@type": "Organization", "name": "Anonsoft", "logo": {{ "@type": "ImageObject", "url": "https://anonsoft.in/assets/logo.png" }} }},
    "datePublished": "2026-02-10",
    "dateModified": "2026-05-12"
  }}
  </script>

  <script>
    if (localStorage.getItem('lightMode') === 'enabled') {{
      document.documentElement.classList.add('light-mode');
    }}
  </script>
  <script src="../analytics.js" defer></script>
</head>
<body>
  <header>
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="/" class="nav-logo" aria-label="Anonsoft Homepage">
          <img src="../assets/anonsoft.svg" alt="Anonsoft Logo" style="height: 48px !important; width: auto !important; max-width: none !important; border-radius: 0 !important;">
        </a>
        <div class="nav-links" id="navLinks">
          <a href="/#services">Services</a>
          <a href="/#portfolio">Portfolio</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#contact">Contact</a>
          <button id="themeToggle" class="theme-toggle" aria-label="Toggle Theme"><i class="fas fa-sun"></i></button>
          <a href="" onclick="Calendly.initPopupWidget({{url:'https://calendly.com/anonsoftdotin/30min'}});return false;" class="nav-cta">Book Free Call</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </header>

  <main>
    <section class="project-detail">
      <div class="container">
        <a href="/#portfolio" class="back-link"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>

        <div class="project-header">
          <span class="project-category">{category}</span>
          <h1>{title}</h1>
          <p class="project-tagline">{tagline}</p>
          <div class="project-actions">
            <a href="{url}" target="_blank" rel="noopener" class="btn-primary">
              <i class="fas fa-external-link-alt"></i> Check Live Project
            </a>
            <a href="" onclick="Calendly.initPopupWidget({{url:'https://calendly.com/anonsoftdotin/30min'}});return false;" class="btn-secondary">
              Build Something Similar
            </a>
          </div>
        </div>

        <div class="project-hero-image">
          <img src="../assets/project/{image}" alt="{title}" loading="lazy">
        </div>

        <div class="project-content">
          <div class="case-study-grid">
            <div class="case-study-card case-study-problem">
              <div class="case-study-icon"><i class="fas fa-triangle-exclamation"></i></div>
              <h2>The Problem</h2>
              <p>{problem}</p>
              <ul>
{problem_li}
              </ul>
            </div>

            <div class="case-study-card case-study-solution">
              <div class="case-study-icon"><i class="fas fa-lightbulb"></i></div>
              <h2>Our Solution</h2>
              <p>{solution}</p>
              <ul>
{solution_li}
              </ul>
            </div>

            <div class="case-study-card case-study-result">
              <div class="case-study-icon"><i class="fas fa-chart-line"></i></div>
              <h2>The Result</h2>
              <p>{result}</p>
              <ul>
{result_li}
              </ul>
            </div>
          </div>

          <div class="project-section">
            <h2>Key Features</h2>
            <div class="features-grid">
{features_html}
            </div>
          </div>

          <div class="project-section">
            <h2>Technology Stack</h2>
            <div class="tech-stack-tags">
{tech_html}
            </div>
          </div>

          <div class="project-cta">
            <h2>{cta_title}</h2>
            <p>{cta_desc}</p>
            <div class="cta-buttons">
              <a href="{url}" target="_blank" rel="noopener" class="btn-primary">
                <i class="fas fa-external-link-alt"></i> Check Live Project
              </a>
              <a href="" onclick="Calendly.initPopupWidget({{url:'https://calendly.com/anonsoftdotin/30min'}});return false;" class="btn-secondary">
                Book a Free Strategy Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <a href="https://wa.me/919007900972" target="_blank" rel="noopener" class="whatsapp-float" aria-label="Chat on WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2024–2026 Anonsoft. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="../script.js"></script>
</body>
</html>
'''

os.makedirs('projects', exist_ok=True)

for p in projects:
    problem_li = '\n'.join([f'                <li>{pt}</li>' for pt in p['problem_points']])
    solution_li = '\n'.join([f'                <li>{pt}</li>' for pt in p['solution_points']])
    result_li = '\n'.join([f'                <li>{pt}</li>' for pt in p['result_points']])
    
    features_html = '\n'.join([
        f'              <div class="feature-card">\n                <div class="feature-icon"><i class="fas {icon}"></i></div>\n                <h3>{feat_title}</h3>\n                <p>{feat_desc}</p>\n              </div>'
        for icon, feat_title, feat_desc in p['features']
    ])
    
    tech_html = '\n'.join([f'              <span class="tech-tag">{t}</span>' for t in p['tech']])
    
    html = template.format(
        title=p['title'],
        meta_desc=p['meta_desc'],
        keywords=p['keywords'],
        slug=p['slug'],
        image=p['image'],
        category=p['category'],
        tagline=p['tagline'],
        url=p['url'],
        problem=p['problem'],
        problem_li=problem_li,
        solution=p['solution'],
        solution_li=solution_li,
        result=p['result'],
        result_li=result_li,
        features_html=features_html,
        tech_html=tech_html,
        cta_title=p['cta_title'],
        cta_desc=p['cta_desc']
    )
    
    filepath = os.path.join('projects', f"{p['slug']}.html")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Successfully generated {filepath}")
