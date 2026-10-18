// src/data/archive.js
// Cultural Archive entries for LIKHAYON Digital Museum
// ⚠ All records are fictional sample data for demonstration purposes only.

export const MUSEUM_CATEGORIES = [
  'All',
  'Festival Decorations',
  'Bamboo Structures',
  'Traditional Crafts',
  'Costumes & Props',
  'Reusable Event Materials',
];

export const archiveEntries = [
  /* ── FESTIVAL DECORATIONS ─────────────────────────────── */
  {
    id: 'arc-001',
    title: 'Sampaguita Arch Garland Set',
    subtitle: 'Floral Gateway of the Procession',
    category: 'Festival Decorations',
    associatedFestival: 'Obando Fertility Festival (Sayaw sa Obando)',
    community: 'Obando, Bulacan',
    era: 'Contemporary tradition (annually renewed)',
    description:
      'Intricately woven sampaguita garland arches are a defining visual element of Bulacan\'s festival processions. Each strand is crafted from silk fabric and fine wire, designed to faithfully replicate the national flower. In processions, they are draped across doorways, carriages, and triumphal arches as an offering of beauty and devotion to the patron saints.',
    culturalSignificance:
      'The sampaguita — Jasminum sambac — is the national flower of the Philippines and holds deep cultural meaning as a symbol of purity, humility, and the Filipino soul. Its use in religious and civic festivals connects participants to a tradition of floral offerings that predates Spanish colonization in the region. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Silk-fabric strands are washable and reusable across multiple festivals. The set in LIKHAYON\'s collection consists of 500 strands averaging 1.5m each. Suitable for doorways, arches, stage decoration, and procession floats.',
    condition: 'Excellent',
    collectionStatus: 'In Collection',
    materialId: 'mat-002',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691cc90?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=700&q=80',
      'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=700&q=80',
    ],
    curator: 'Sample Curator — LIKHAYON Documentation Team',
    dateAdded: '2025-01-10',
    tags: ['sampaguita', 'garland', 'procession', 'floral', 'Obando'],
    youthNote: 'Did you know? The sampaguita has been woven into Filipino festivals for centuries. Garland-making is a skill passed down through families in many Bulacan communities.',
  },
  {
    id: 'arc-006',
    title: 'Giant Parol Star Lantern Set',
    subtitle: 'The Bulacan Christmas Tradition',
    category: 'Festival Decorations',
    associatedFestival: 'Bulacan Parol Festival (Province-wide)',
    community: 'Multiple municipalities, Bulacan',
    era: 'Living tradition; documentary evidence from 1800s',
    description:
      'The parol (star lantern) is one of the most recognizable symbols of Filipino Christmas. Bulacan communities have produced parols for generations using bamboo, Japanese paper, and in modern iterations, recycled materials. The LIKHAYON collection holds a set of 20 large parols (1.2m diameter) in red, gold, white, and green — originally used for a municipal Christmas lighting ceremony.',
    culturalSignificance:
      'The parol represents the Star of Bethlehem and the Filipino spirit of hospitality and faith during the Christmas season. Bulacan\'s parol-making tradition is among the oldest in Luzon, influencing the more widely known industry in San Fernando, Pampanga. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Bamboo frames are structurally sound and can be re-covered with new paper by community volunteers as a heritage craft activity. Suitable for outdoor displays, school events, and civic celebrations.',
    condition: 'Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-004',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=700&q=80',
    ],
    curator: 'Sample Curator — Bulacan Provincial Tourism Office',
    dateAdded: '2025-04-01',
    tags: ['parol', 'Christmas', 'lantern', 'bamboo', 'star'],
    youthNote: 'Making a parol is a family tradition in many Bulacan homes. Try crafting a mini-parol using bamboo sticks, string, and tissue paper — the same basic method used for centuries.',
  },
  {
    id: 'arc-008',
    title: 'Spandex Festival Banners',
    subtitle: 'Bright Markers of Community Celebration',
    category: 'Festival Decorations',
    associatedFestival: 'Meycauayan City Foundation Anniversary',
    community: 'Meycauayan, Bulacan',
    era: 'Contemporary (2020s)',
    description:
      'A set of 30 spandex festival banners mounted on 3-meter wooden poles. Each banner features traditional Bulaqueño geometric patterns in red, gold, and green — colors associated with both civic pride and the Philippine flag. Originally used to line Malhacan Road during foundation day celebrations, these banners transform public spaces into festive corridors.',
    culturalSignificance:
      'Banner and flag decoration of public thoroughfares during festivals is a deep-rooted tradition across Philippine municipalities. The patterns on these banners were inspired by pre-colonial weaving motifs found in archaeological textiles from Central Luzon. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Spandex material is washable, colorfast, and highly durable. Each banner folds compactly for storage. Suitable for street decoration, stage backdrops, and ceremonial settings.',
    condition: 'Excellent',
    collectionStatus: 'In Collection',
    materialId: 'mat-008',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — LIKHAYON Documentation Team',
    dateAdded: '2025-05-10',
    tags: ['banner', 'flags', 'street', 'parade', 'geometric'],
    youthNote: 'Notice the geometric patterns? These designs echo ancient weaving traditions from the region. Compare them to the banig (reed mat) patterns in our Craft Traditions collection!',
  },

  /* ── BAMBOO STRUCTURES ────────────────────────────────── */
  {
    id: 'arc-001b',
    title: 'Kawayan Triumphal Arch',
    subtitle: 'Gateway of the Festival Procession',
    category: 'Bamboo Structures',
    associatedFestival: 'Sayaw sa Obando (Obando Fertility Festival)',
    community: 'Obando, Bulacan',
    era: 'Contemporary; traditional form with roots in 17th-century celebration',
    description:
      'A large ceremonial bamboo arch used as the gateway for festival processions and outdoor events. Constructed from mature kawayan tinik (thorny bamboo), it features woven rattan cross-bracing and can be assembled and disassembled without permanent fasteners — a traditional construction method that requires no nails. The arch spans 4 meters and rises 5 meters at its peak.',
    culturalSignificance:
      'Triumphal arches made of bamboo and natural materials have been central to Philippine festival processional culture for centuries, blending indigenous construction knowledge with the ceremonial traditions introduced during the colonial period. Bamboo\'s symbolic value as a material of resilience and flexibility makes it particularly meaningful in festival contexts. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Disassembles into modular panels for transport in a standard cargo vehicle. Can be re-used 8–12 times before structural replacement is needed. Excellent for event entrances, stage frames, and outdoor installations.',
    condition: 'Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-001',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=700&q=80',
    ],
    curator: 'Sample Curator — LIKHAYON Documentation Team',
    dateAdded: '2025-03-15',
    tags: ['bamboo', 'arch', 'kawayan', 'procession', 'Obando'],
    youthNote: 'Did you know bamboo is one of the fastest-growing plants on Earth? A single bamboo grove can produce enough material for structures like this arch in just 3–5 years — making it one of nature\'s most sustainable building materials.',
  },
  {
    id: 'arc-013',
    title: 'Bangkang Papel — Paper Boat Set',
    subtitle: 'River-Bound Prayers of Bocaue',
    category: 'Bamboo Structures',
    associatedFestival: 'Bocaue River Festival',
    community: 'Bocaue, Bulacan',
    era: 'Living tradition; origins debated among historians',
    description:
      'Twelve miniature bamboo-framed boats with wax paper hulls, used in the Bocaue River Festival\'s evening flotilla. Each boat (approx. 1.5m long) is lit with candles and set adrift on the river as a ritual offering. The bamboo frames are crafted using traditional boat-building joinery — no metal fasteners. After the festival, the frames are collected for reuse.',
    culturalSignificance:
      'The act of floating lit paper boats is interpreted as sending prayers, intentions, or the spirits of one\'s ancestors along the water\'s current — a practice that blends pre-colonial river veneration with Catholic devotional tradition. The Bocaue River has been a spiritual site for the community for generations. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'The bamboo frames can be re-wrapped with new wax paper for each festival use. The set is available for water-based events and river festivals throughout the province. Suitable for outdoor fluvial celebrations.',
    condition: 'Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-006',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — Municipal Tourism Office of Bocaue',
    dateAdded: '2025-04-20',
    tags: ['boat', 'river', 'bamboo', 'Bocaue', 'candle'],
    youthNote: 'The act of floating a lit boat on water appears in many Asian cultures. In the Philippines, this tradition takes on deeply personal meanings for the communities that practice it — a way of connecting with those who came before.',
  },
  {
    id: 'arc-015',
    title: 'Bamboo Floral Trellis Arches',
    subtitle: 'Living Frames for Community Celebrations',
    category: 'Bamboo Structures',
    associatedFestival: 'Marilao Fiesta Celebration',
    community: 'Marilao, Bulacan',
    era: 'Contemporary (introduced 2018)',
    description:
      'A set of six decorative bamboo trellis arches with integrated wire mesh, each 2.5m tall and 2m wide. Originally designed for a parish fiesta entrance, the arches feature a classic ogee (pointed arch) form based on traditional Filipino bahay kubo doorway proportions. The wire mesh allows fresh or artificial flowers to be woven in and out for each event.',
    culturalSignificance:
      'The use of natural arches and floral frameworks at celebration entrances is an enduring Filipino tradition with roots in both indigenous and colonial aesthetic practices. The bahay kubo proportions referenced in the design connect this contemporary piece to vernacular architecture. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Highly reusable — the frame is permanent while flower arrangements change per event. Suitable for weddings, fiestas, school events, and civic celebrations. Very popular booking; reserve early.',
    condition: 'Very Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-015',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — LIKHAYON Documentation Team',
    dateAdded: '2025-06-20',
    tags: ['trellis', 'arch', 'bamboo', 'flowers', 'entrance'],
    youthNote: 'Look at the arch shape. This pointed form has been used in Filipino architecture for generations — from bahay kubo doors to church windows. How many arch shapes can you spot in your own community?',
  },

  /* ── TRADITIONAL CRAFTS ───────────────────────────────── */
  {
    id: 'arc-004',
    title: 'Woven Banig Display Panels',
    subtitle: 'Reed Mat Patterns as Cultural Identity',
    category: 'Traditional Crafts',
    associatedFestival: 'Balagtas Arts & Crafts Fair',
    community: 'Balagtas & Plaridel, Bulacan',
    era: 'Living tradition; continuously practiced',
    description:
      'Twelve large woven banig (reed mat) panels crafted in Balagtas using locally sourced tikog grass and buri palm leaves. Each panel (1.5m × 2m) is woven by hand using techniques passed down through families over generations. The geometric patterns are not merely decorative — they encode information about the weaver\'s family, region, and community affiliation. These panels are used as backdrop displays in cultural events and exhibitions.',
    culturalSignificance:
      'Banig weaving is one of the oldest craft traditions in the Philippines, predating Spanish contact. In Bulacan, fewer than 200 active practitioners remain, making each woven piece a record of endangered knowledge. The patterns visible in this collection represent at least three distinct family weaving lineages. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Can be hung vertically as backdrop panels, laid flat as floor displays, or used as table coverings in museum-style exhibitions. Each panel is lightweight (3kg) and rolls compactly for transport. Ideal for cultural exhibitions and educational displays.',
    condition: 'Excellent',
    collectionStatus: 'In Collection',
    materialId: 'mat-012',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1490750967868-88df5691cc90?w=700&q=80',
    ],
    curator: 'Aniceta Manalang — Master Weaver, Balagtas (Sample attribution)',
    dateAdded: '2025-03-05',
    tags: ['banig', 'weaving', 'crafts', 'pattern', 'tikog'],
    youthNote: 'Every pattern in a banig tells a story. The diamond shapes represent mountains; zigzag lines can represent water or birds in flight. Try to identify the patterns in this collection — what stories do you think the weaver was telling?',
  },
  {
    id: 'arc-011',
    title: 'Kulintang & Ceremonial Drum Set',
    subtitle: 'The Sound of Pre-Colonial Bulacan',
    category: 'Traditional Crafts',
    associatedFestival: 'Bulacan Heritage Festival',
    community: 'Malolos & Meycauayan, Bulacan',
    era: 'Pre-colonial tradition; instruments in collection are contemporary reproductions',
    description:
      'A complete kulintang ensemble — eight graduated gongs mounted on a wooden frame, two large ceremonial drums, and a set of mallets — reproduced by contemporary craftsmen using traditional materials and tuning methods. The set is used in cultural performances, heritage presentations, and educational demonstrations throughout the province.',
    culturalSignificance:
      'The kulintang is among the oldest surviving musical traditions in the Philippines, predating Western contact by centuries. In Luzon, the tradition largely disappeared after the colonial period except in isolated cultural pockets. Bulacan\'s ongoing effort to preserve kulintang performance represents one of the few active revival programs in Central Luzon. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'The set is available for cultural performances, heritage events, and educational workshops. A trained kulintang player is recommended; LIKHAYON can connect borrowers with cultural practitioners upon request.',
    condition: 'Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-011',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — Bulacan Kulintang Ensemble',
    dateAdded: '2025-01-25',
    tags: ['kulintang', 'gong', 'music', 'drum', 'pre-colonial'],
    youthNote: 'Music before records, radios, or speakers — the kulintang was how communities communicated across distances and marked sacred moments. Listen to a kulintang recording: the sound is unlike anything in Western music.',
  },
  {
    id: 'arc-009',
    title: 'Carabao Festival Decorated Yoke Set',
    subtitle: 'A Farmer\'s Offering of Gratitude',
    category: 'Traditional Crafts',
    associatedFestival: 'Pulilan Carabao Festival',
    community: 'Pulilan, Bulacan',
    era: 'Living ritual tradition; 300+ years of practice (estimated)',
    description:
      'Ten ornately decorated wooden yokes and fifty matching flower garland sets, used in the Pulilan Carabao Festival\'s ritual kneeling ceremony. Each yoke is painted in bright colors with brass accent studs and floral motifs — crafted by local artisans who specialize in festival regalia. The garlands are made from artificial silk flowers in colors matched to the owning family\'s festival identity.',
    culturalSignificance:
      'The Carabao Festival honors San Isidro Labrador, patron saint of farmers, through a centuries-old ritual in which carabaos (water buffalos) are led to the church and made to kneel as an act of thanksgiving. The decorated yokes are not ordinary work implements — they are transformed into sacred objects for the duration of the festival. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'The yokes and garlands are symbolically significant items. Borrowers should be aware of their ritual context. Appropriate for agricultural heritage presentations, cultural exhibitions, and community events that honor farming traditions.',
    condition: 'Very Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-009',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — Dr. Jose Reyes, Bulacan State University',
    dateAdded: '2025-05-15',
    tags: ['carabao', 'yoke', 'Pulilan', 'farming', 'thanksgiving'],
    youthNote: 'The carabao is the national animal of the Philippines. For generations of Filipino farmers, it was not just a work animal but a life partner — central to survival, community, and celebration.',
  },

  /* ── COSTUMES & PROPS ─────────────────────────────────── */
  {
    id: 'arc-005',
    title: 'Heritage Barong Tagalog Ensemble',
    subtitle: 'The Formal Dress of a Nation\'s Story',
    category: 'Costumes & Props',
    associatedFestival: 'Malolos Heritage Week / Kasarinlan Festival',
    community: 'Malolos, Bulacan — Seat of the First Philippine Republic',
    era: 'Worn in heritage reenactments of the 1898–1899 Malolos Congress period',
    description:
      'Fifteen formal barong tagalog garments in piña (pineapple fiber) fabric, with matching formal trousers. These costumes are used in official heritage reenactments at the Barasoain Church complex in Malolos, where delegates of the Malolos Congress once gathered to draft the first democratic constitution in Asia. Each garment is sized S through XL and has been tailored to period-appropriate silhouettes.',
    culturalSignificance:
      'The barong tagalog is the national formal dress of Filipino men. Its use in Malolos heritage reenactments directly connects the garment to one of the most historically significant moments in Philippine history — the founding of the First Philippine Republic in 1899. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Dry-clean or hand-wash only. Borrowers must agree to professional cleaning if soiled. Available in sizes S (3), M (5), L (4), XL (3). Suitable for historical reenactments, heritage ceremonies, and cultural pageants.',
    condition: 'Very Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-005',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1585152968992-d2b9444408cc?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — National Historical Commission of the Philippines',
    dateAdded: '2025-02-14',
    tags: ['barong', 'costume', 'Malolos', 'heritage', 'piña'],
    youthNote: 'Malolos was the capital of the First Philippine Republic. The men who signed the first Philippine Constitution wore garments like these. When you wear a barong tagalog at a formal event, you are connected to that story.',
  },
  {
    id: 'arc-007',
    title: 'Ritual Dance Headdress Collection',
    subtitle: 'Crowns of the Obando Devotees',
    category: 'Costumes & Props',
    associatedFestival: 'Sayaw sa Obando (Obando Fertility Festival)',
    community: 'Obando, Bulacan',
    era: 'Contemporary; traditional design with 17th-century origins',
    description:
      'Twelve ornate headdresses worn by participants in the Sayaw sa Obando ritual dances. Each headdress features peacock feathers, polished cowrie shells, woven rattan base, and silk ribbons in gold and red. They are handcrafted by local artisans in Obando who specialize in festival regalia — a skill with only a handful of remaining practitioners.',
    culturalSignificance:
      'The Sayaw sa Obando is a devotional dance performed in honor of three Catholic saints, with petitioners dancing in the streets to seek blessings for fertility, children, and marriage. The headdresses mark the wearer as a devoted participant in an act of public faith. The festival was recognized as a National Intangible Cultural Heritage of the Philippines in 2015. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Handle with care — feathers and shells are fragile. Store in individual cloth bags (provided). Adjustable rattan base fits head circumferences 55–62cm. Available for ritual dance performances, cultural exhibitions, and heritage programs.',
    condition: 'Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-007',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — LIKHAYON Documentation Team',
    dateAdded: '2025-03-01',
    tags: ['headdress', 'Obando', 'dance', 'ritual', 'feathers'],
    youthNote: 'A headdress is more than decoration — it is a statement of identity and devotion. The peacock feathers in these pieces have traditionally symbolized beauty and spiritual aspiration in many Philippine cultural contexts.',
  },
  {
    id: 'arc-014',
    title: 'Maria Clara Heritage Dress Collection',
    subtitle: 'The Filipino Woman in Formal Tradition',
    category: 'Costumes & Props',
    associatedFestival: 'Malolos Heritage Pageant',
    community: 'Malolos, Bulacan',
    era: 'Contemporary reproduction of late-19th-century dress tradition',
    description:
      'Eight complete Maria Clara dresses in blue, yellow, pink, and white piña-blend fabric, with matching camisa and patadyong accessories. These costumes were commissioned for the Malolos Heritage Pageant, which celebrates the women\'s literacy movement of Malolos — a landmark episode in Philippine feminist history when women petitioned for the right to education in 1889.',
    culturalSignificance:
      'The Malolos women\'s petition of 1889, championed by a group of 20 women from Malolos who requested a night school for women, is considered one of the earliest organized feminist movements in Philippine history. The Maria Clara dress, as worn by these women, has become a symbol of that legacy. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Hand wash or dry-clean only. Available in sizes S (2), M (3), L (3). Suitable for heritage pageants, historical reenactments, cultural exhibitions, and educational programs on Philippine women\'s history.',
    condition: 'Excellent',
    collectionStatus: 'In Collection',
    materialId: 'mat-014',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — LIKHAYON Documentation Team',
    dateAdded: '2025-02-28',
    tags: ['Maria Clara', 'dress', 'Malolos', 'women', 'heritage'],
    youthNote: 'The women of Malolos are among the unsung heroes of Philippine history. In 1889, twenty women from this city sent a petition to the colonial government demanding the right to education. This dress connects you to their courage.',
  },

  /* ── REUSABLE EVENT MATERIALS ─────────────────────────── */
  {
    id: 'arc-003',
    title: 'Processional Andas — Santo Niño Float',
    subtitle: 'A Vessel for the Sacred Image',
    category: 'Reusable Event Materials',
    associatedFestival: 'Malolos City Fiesta',
    community: 'Malolos, Bulacan',
    era: 'Contemporary; traditional form with baroque-period origins',
    description:
      'A traditional wooden andas (processional float/platform) with gilded ornamental panels, used to carry religious icons in civic-religious processions. The platform dismantles into three modular sections for transport and storage. Comes with a full velvet drapery set in deep red and gold. The gilding technique uses gold-leaf paint applied over a clay primer base — a method used in Philippine colonial-era religious art.',
    culturalSignificance:
      'The andas is a central object in Philippine Catholic tradition. Its design reflects the baroque aesthetic introduced during the Spanish colonial period, adapted by Filipino craftsmen over centuries into a distinctly Philippine form. The act of carrying the andas in procession is considered an honor and a form of devotion in communities across Bulacan. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Requires at least 8 carriers. Velvet drapery set included. Modular assembly takes approximately 45 minutes with 4 people. Suitable for civic-religious processions, cultural exhibitions, and heritage events. Condition-rated Good — gilding is intact; minor wear on base panels.',
    condition: 'Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-003',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — Malolos City Heritage Office',
    dateAdded: '2024-11-20',
    tags: ['andas', 'float', 'procession', 'gilded', 'religious'],
    youthNote: 'The andas is carried on the shoulders of devotees — a physical act of service and faith. Look closely at the gilded panels: the floral and vine patterns draw from both indigenous Filipino and Spanish baroque design traditions.',
  },
  {
    id: 'arc-010',
    title: 'Bamboo Torchlight Set',
    subtitle: 'Light for the Evening Procession',
    category: 'Reusable Event Materials',
    associatedFestival: 'Hagonoy Immersion Festival',
    community: 'Hagonoy, Bulacan',
    era: 'Living tradition; torch processions predate Spanish colonial contact',
    description:
      'Forty bamboo torchlights, each 1.8m tall with a metal oil cup at the crown. Used in the Hagonoy Immersion Festival\'s signature evening torchlight procession along the river bank, where the reflection of hundreds of burning torches on the water creates one of the most visually striking ritual experiences in Bulacan. Five liters of lamp oil are included with the set.',
    culturalSignificance:
      'Torch processions in Hagonoy are associated with the feast of St. John the Baptist and are believed to draw on pre-colonial practices of fire and light as markers of sacred time and community gathering. The synthesis of indigenous fire tradition and Catholic feast day practice is a distinctive form of Philippine cultural syncretism. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'Borrowers must comply with local fire safety regulations. A fire safety officer must be present at events. Torches should not be used indoors. Five units currently undergoing maintenance — 35 units available. Suitable for outdoor evening processions, cultural demonstrations, and heritage events.',
    condition: 'Good',
    collectionStatus: 'Partially Available (35 of 40)',
    materialId: 'mat-010',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — Hagonoy Municipal Tourism Office',
    dateAdded: '2025-06-01',
    tags: ['torch', 'fire', 'procession', 'night', 'Hagonoy'],
    youthNote: 'Fire has been used in human ritual for as long as we have records of community life. In Hagonoy, the torchlight procession turns the river into a mirror of fire — an experience that connects participants to something ancient and communal.',
  },
  {
    id: 'arc-013b',
    title: 'Fluvial Festival Raft Frame',
    subtitle: 'Platform for the River Procession',
    category: 'Reusable Event Materials',
    associatedFestival: 'Bocaue River Festival',
    community: 'Bocaue, Bulacan',
    era: 'Contemporary construction; fluvial procession tradition predates 1800s',
    description:
      'Two steel-and-bamboo raft frames, each 3m × 4m when fully assembled, used as platforms for fluvial (water-based) processions. Each raft can support a 1m × 2m display platform for religious icons, performers, or decorative elements. Ten life vests are included with the set. The frames disassemble for dry storage between festivals.',
    culturalSignificance:
      'The Bocaue River Festival is one of the Philippines\' most distinctive fluvial celebrations, merging pre-colonial river reverence with Catholic devotional practice. The river — and the raft that carries the sacred image upon it — serves as the processional road, reflecting the community\'s historic relationship with waterways as pathways of both commerce and the sacred. [Sample record — cultural details are illustrative.]',
    reuseNotes:
      'A river permit is required for use in public waterways. LIKHAYON can assist borrowing organizations with documentation. Life vests must be worn by all persons aboard. Suitable for fluvial processions, river festivals, and waterfront cultural events.',
    condition: 'Good',
    collectionStatus: 'In Collection',
    materialId: 'mat-013',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=900&q=80',
    gallery: [],
    curator: 'Sample Curator — Municipal Tourism Office of Bocaue',
    dateAdded: '2025-07-10',
    tags: ['raft', 'river', 'fluvial', 'Bocaue', 'procession'],
    youthNote: 'The Bocaue River was the highway of the ancient community — goods, people, and prayers all traveled on it. The festival raft continues that tradition: the river as a living road connecting people to their faith and each other.',
  },
];
