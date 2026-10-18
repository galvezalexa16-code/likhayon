// src/data/materials.js
// LIKHAYON — Sample materials inventory
// ⚠ All records are fictional sample data for prototype demonstration only.
// This is a PROPOSED initiative; LIKHAYON does not yet physically own these items.

export const CATEGORIES = [
  'All',
  'Bamboo Structures',
  'Floral Decorations',
  'Ritual Props',
  'Costumes & Textiles',
  'Lighting & Lanterns',
  'Floats & Platforms',
  'Banners & Signage',
  'Audio & Performance',
  'Woven & Craft Items',
];

export const CONDITIONS = ['All', 'Excellent', 'Very Good', 'Good', 'Fair'];

export const MUNICIPALITIES = [
  'Malolos', 'Balagtas', 'Bocaue', 'Marilao', 'Meycauayan',
  'Obando', 'Pulilan', 'Bulacan (town)', 'Hagonoy', 'Plaridel',
  'Guiguinto', 'San Jose del Monte', 'Sta. Maria', 'San Rafael',
];

export const UNITS = ['piece', 'set', 'strand', 'panel', 'unit', 'roll', 'pair', 'bundle'];

export const materials = [
  /* ── BAMBOO STRUCTURES ──────────────────────────────── */
  {
    id: 'mat-001',
    name: 'Kawayan Triumphal Arch',
    category: 'Bamboo Structures',
    unit: 'set',
    description:
      'A large ceremonial bamboo arch traditionally used as a gateway for festival processions and outdoor events. Constructed from mature kawayan tinik (thorny bamboo) with woven rattan cross-bracing. Disassembles into 6 modular panels for transport — no metal fasteners, fully traditional joinery. Includes assembly guide and tie-wraps.',
    origin: 'Obando',
    festival: 'Obando Fertility Festival (Sayaw sa Obando)',
    sourceNote: 'Proposed donation from Obando municipal government upon initiative launch.',
    quantity: 3,
    available: 2,
    condition: 'Good',
    dimensions: '4m wide × 5m tall (assembled)',
    weight: '~60 kg per set (6 panels)',
    usageNotes:
      'Assembly requires at least 4 persons and approximately 45 minutes. Suitable for outdoor use only. Do not leave exposed to rain for more than 48 hours without waterproof treatment.',
    handlingInstructions:
      'Wrap each bamboo panel in bubble wrap before transport. Store flat in a dry, ventilated space. Inspect joints before each use. Report any cracking to LIKHAYON immediately.',
    archiveEntryId: 'arc-001b',
    tags: ['arch', 'bamboo', 'procession', 'gateway', 'Obando'],
    imageUrl: '/images/materials/kawayan-arch.jpg',
    addedDate: '2025-03-15',
    lastBorrowed: '2025-07-20',
    notes: 'Third set undergoing routine maintenance — available upon request with 2-week lead time.',
    featured: true,
  },
  {
    id: 'mat-015',
    name: 'Bamboo Floral Trellis Arch Set',
    category: 'Bamboo Structures',
    unit: 'set',
    description:
      'Six decorative bamboo trellis arches with integrated wire mesh for weaving fresh or artificial flowers. Each arch features a classic pointed ogee form inspired by traditional Filipino bahay kubo doorway proportions. Flat-packed for transport; re-assembly takes ~20 minutes per arch.',
    origin: 'Marilao',
    festival: 'Marilao Parish Fiesta',
    sourceNote: 'Proposed donation from the Marilao Parish Pastoral Council upon initiative launch.',
    quantity: 6,
    available: 6,
    condition: 'Very Good',
    dimensions: '2.5m tall × 2m wide per arch',
    weight: '~18 kg per arch',
    usageNotes:
      'Fresh or artificial flowers can be woven through the wire mesh. Suitable for indoor and covered outdoor events. Wire mesh may leave marks on delicate fabric — drape protective cloth when using near costumes.',
    handlingInstructions:
      'Stack arches horizontally for transport. Avoid bending or forcing joints. Oil bamboo with linseed oil annually to prevent cracking.',
    archiveEntryId: 'arc-015',
    tags: ['trellis', 'arch', 'bamboo', 'flowers', 'entrance'],
    imageUrl: '/images/materials/singkaban-arch.jpg',
    addedDate: '2025-06-20',
    lastBorrowed: null,
    notes: 'Full set available. Very popular — book at least 3 weeks in advance.',
    featured: false,
  },
  {
    id: 'mat-006',
    name: 'Bangkang Papel Raft Frames (Set of 12)',
    category: 'Bamboo Structures',
    unit: 'set',
    description:
      'Twelve miniature bamboo-framed boat forms with wax paper hulls, used in the Bocaue River Festival\'s evening flotilla. Each boat is approximately 1.5m long and is crafted using traditional boat-building joinery without metal fasteners. The wax paper hull is replaced before each use; frames are reusable across multiple seasons.',
    origin: 'Bocaue',
    festival: 'Bocaue River Festival',
    sourceNote: 'Proposed donation from the Bocaue River Festival organizing committee.',
    quantity: 12,
    available: 12,
    condition: 'Good',
    dimensions: '1.5m long × 0.6m wide × 0.4m tall',
    weight: '~4 kg per boat',
    usageNotes:
      'Each boat holds one standard pillar candle (candle included for the first loan). Suitable for calm freshwater rivers and ponds only. Coordinate with local maritime authority for use on public waterways.',
    handlingInstructions:
      'Replace wax paper hull before each use (material supplied by borrower — white butcher paper is suitable). Store frames stacked in the provided wooden crate. Keep dry.',
    archiveEntryId: 'arc-013',
    tags: ['boat', 'river', 'bamboo', 'Bocaue', 'flotilla'],
    imageUrl: '/images/materials/bangkang-papel.jpg',
    addedDate: '2025-04-20',
    lastBorrowed: null,
    notes: 'River permit documentation assistance available from LIKHAYON upon request.',
    featured: false,
  },
  {
    id: 'mat-013',
    name: 'Fluvial Festival Raft Frames',
    category: 'Floats & Platforms',
    unit: 'set',
    description:
      'Two steel-reinforced bamboo raft frames for fluvial (water-based) processions. Each raft (3m × 4m assembled) supports a raised display platform up to 1m × 2m. Modular design disassembles to 12 sections per raft for dry storage. Ten certified life vests are included with each borrowing.',
    origin: 'Bocaue',
    festival: 'Bocaue River Festival',
    sourceNote: 'Proposed partnership with the Bocaue River Festival organizing committee.',
    quantity: 2,
    available: 2,
    condition: 'Good',
    dimensions: '3m × 4m per raft (assembled); 12 sections each',
    weight: '~120 kg per raft',
    usageNotes:
      'Requires a river safety permit from the local maritime authority. Borrower must designate a safety officer. Maximum platform load: 300 kg. Life vests must be worn by all persons aboard.',
    handlingInstructions:
      'All metal joints must be inspected and lubricated with marine grease before each use. Store disassembled in a dry covered area. Do not stack heavy items on the bamboo decking.',
    archiveEntryId: 'arc-013b',
    tags: ['raft', 'river', 'fluvial', 'Bocaue', 'platform'],
    imageUrl: '/images/materials/bocaue-pagoda.jpg',
    addedDate: '2025-07-10',
    lastBorrowed: null,
    notes: 'LIKHAYON can assist borrowers with river permit documentation.',
    featured: false,
  },

  /* ── FLORAL DECORATIONS ──────────────────────────────── */
  {
    id: 'mat-002',
    name: 'Sampaguita Silk Garland Strands',
    category: 'Floral Decorations',
    unit: 'strand',
    description:
      'Preserved artificial sampaguita garlands made with white silk fabric and fine wire, faithfully replicating the national flower. Each strand is 1.5m long and can be linked end-to-end. Machine-washable on gentle cycle. Originally used as procession and float decoration.',
    origin: 'Balagtas',
    festival: 'Balagtas Day Celebration & Obando Fertility Festival',
    sourceNote: 'Proposed donation from garland artisans in Balagtas and Obando upon initiative launch.',
    quantity: 500,
    available: 350,
    condition: 'Excellent',
    dimensions: '1.5m per strand',
    weight: '~80g per strand',
    usageNotes:
      'Can be draped over arches, tied to poles, woven into floral arrangements, or used as table runner decoration. Link strands end-to-end using the built-in wire loops.',
    handlingInstructions:
      'Hand-wash or gentle machine cycle in cold water. Air-dry only — do not iron or tumble-dry. Bundle strands in groups of 50 using the provided fabric bands. Store in the labeled canvas bags.',
    archiveEntryId: 'arc-001',
    tags: ['sampaguita', 'garland', 'procession', 'floral', 'Obando'],
    imageUrl: '/images/materials/sampaguita-garland.jpg',
    addedDate: '2025-01-10',
    lastBorrowed: '2025-08-05',
    notes: '150 strands currently on approved loan. 350 available immediately.',
    featured: true,
  },
  {
    id: 'mat-016',
    name: 'Dried Pandan & Rattan Ceiling Drops',
    category: 'Floral Decorations',
    unit: 'bundle',
    description:
      'Forty hanging ceiling installations made from dried pandan leaves, natural rattan loops, and dried capiz shells. Each drop is approximately 1.2m long and creates a layered, natural ceiling effect for indoor cultural events. Can be regrouped and rehung in different configurations.',
    origin: 'Plaridel',
    festival: 'Plaridel Arts & Crafts Festival',
    sourceNote: 'Proposed donation from Plaridel weaving cooperative upon initiative launch.',
    quantity: 40,
    available: 40,
    condition: 'Very Good',
    dimensions: '1.2m drop per unit; capiz shell diameter 5cm',
    weight: '~200g per drop',
    usageNotes:
      'Indoor use only. Attach using the provided clip hooks to a tension wire or ceiling grid. Arrange in clusters of 5–10 for best visual effect. Ensure capiz shells are fully dry before storage.',
    handlingInstructions:
      'Do not expose to rain or humidity — pandan will mold if stored wet. Hang or lay flat (never crumple). Return in the original labeled tubes. Replace broken capiz shells using the spare set provided.',
    archiveEntryId: null,
    tags: ['pandan', 'rattan', 'capiz', 'ceiling', 'natural'],
    imageUrl: '/images/materials/obando-headdress.jpg',
    addedDate: '2025-05-01',
    lastBorrowed: null,
    notes: 'Popular for indoor banquets and heritage exhibits.',
    featured: false,
  },

  /* ── RITUAL PROPS ────────────────────────────────────── */
  {
    id: 'mat-003',
    name: 'Gilded Processional Andas',
    category: 'Ritual Props',
    unit: 'set',
    description:
      'A traditional wooden processional float platform (andas) with gilded ornamental side panels, used to carry sacred images in civic-religious processions. The platform disassembles into 3 modular sections for transport. Includes a complete deep-red and gold velvet drapery set, 8 hardwood carrying poles, and cushion mounts.',
    origin: 'Malolos',
    festival: 'Malolos City Fiesta (Santo Niño Procession)',
    sourceNote: 'Proposed donation from the Malolos City Heritage Office upon initiative launch.',
    quantity: 1,
    available: 1,
    condition: 'Good',
    dimensions: '1.8m long × 0.9m wide × 1.2m tall (assembled)',
    weight: '~90 kg assembled; 30 kg per section',
    usageNotes:
      'Requires 8 carriers (poles included). Assembly takes approximately 45 minutes with 4 people. Suitable for civic-religious processions and heritage exhibitions. Treat with cultural respect — not appropriate for casual decorative use.',
    handlingInstructions:
      'Handle gilded panels carefully — gold-leaf finish chips if struck. Transport each section wrapped in moving blankets. Store the velvet drapery separately folded; do not compress. Inspect gilt panels after each use and report any chipping.',
    archiveEntryId: 'arc-003',
    tags: ['andas', 'procession', 'gilded', 'religious', 'Malolos'],
    imageUrl: '/images/materials/processional-andas.jpg',
    addedDate: '2024-11-20',
    lastBorrowed: '2025-06-15',
    notes: 'Reserved for religious processions and formally documented heritage events only.',
    featured: true,
  },
  {
    id: 'mat-009',
    name: 'Carabao Festival Decorated Yokes',
    category: 'Ritual Props',
    unit: 'piece',
    description:
      'Ten ornately painted and decorated ceremonial wooden yokes used in the Pulilan Carabao Festival ritual kneeling ceremony. Each yoke is hand-painted in bright pigments with brass accent studs and floral motifs. Matching silk flower garland sets (50 pieces) are included.',
    origin: 'Pulilan',
    festival: 'Pulilan Carabao Festival (Feast of San Isidro Labrador)',
    sourceNote: 'Proposed donation from the Pulilan festival organizing committee upon initiative launch.',
    quantity: 10,
    available: 10,
    condition: 'Very Good',
    dimensions: '1.2m wide × 0.4m tall per yoke',
    weight: '~8 kg per yoke',
    usageNotes:
      'These items carry ritual and cultural significance. Borrowers should present a use-case aligned with agricultural or heritage programming. Not appropriate for purely aesthetic decorative use without context.',
    handlingInstructions:
      'Protect painted surfaces — wrap individually in cloth before transport. Store in the provided wooden rack. Re-touch chipped paint only with matching pigments; contact LIKHAYON before repainting.',
    archiveEntryId: 'arc-009',
    tags: ['carabao', 'yoke', 'Pulilan', 'San Isidro', 'agriculture'],
    imageUrl: '/images/materials/carabao-festival.jpg',
    addedDate: '2025-05-15',
    lastBorrowed: null,
    notes: 'Silk flower garland set (50 pieces) included with each borrowing.',
    featured: false,
  },
  {
    id: 'mat-010',
    name: 'Bamboo Torchlight Set',
    category: 'Ritual Props',
    unit: 'set',
    description:
      'Forty bamboo torchlights (each 1.8m tall) with a steel oil cup at the crown and a pointed bamboo base stake for ground mounting. Used in the Hagonoy Immersion Festival\'s evening torchlight procession along the riverbank. Five liters of lamp oil are provided with each loan.',
    origin: 'Hagonoy',
    festival: 'Hagonoy Immersion Festival (Feast of St. John the Baptist)',
    sourceNote: 'Proposed donation from the Hagonoy Municipal Tourism Office upon initiative launch.',
    quantity: 40,
    available: 35,
    condition: 'Good',
    dimensions: '1.8m tall; oil cup diameter 10cm',
    weight: '~2 kg per torch',
    usageNotes:
      'Outdoor use only. A certified fire safety officer must be present at all times. Comply with local fire safety regulations. Do not use in enclosed or covered spaces. Keep a fire extinguisher on site.',
    handlingInstructions:
      'Drain all oil from cups before storage. Clean cups with a dry cloth. Store torches bundled in groups of 10 using the provided rope ties. Five units currently undergoing handle replacement — 35 available immediately.',
    archiveEntryId: 'arc-010',
    tags: ['torch', 'fire', 'procession', 'Hagonoy', 'evening'],
    imageUrl: '/images/materials/torch.jpg',
    addedDate: '2025-06-01',
    lastBorrowed: null,
    notes: '5 units under maintenance. 35 of 40 available. Fire safety officer required.',
    featured: false,
  },

  /* ── COSTUMES & TEXTILES ─────────────────────────────── */
  {
    id: 'mat-005',
    name: 'Barong Tagalog Heritage Ensemble',
    category: 'Costumes & Textiles',
    unit: 'set',
    description:
      'Fifteen formal barong tagalog garments in piña-blend fabric, with matching formal trousers. Tailored to period-appropriate silhouettes for reenactments of the 1898–1899 Malolos Congress era. Available in sizes S (3), M (5), L (4), XL (3). Each includes a matching white undershirt.',
    origin: 'Malolos',
    festival: 'Kasarinlan Festival / Malolos Heritage Week',
    sourceNote: 'Proposed acquisition by the Malolos City Heritage Office for the LIKHAYON collection.',
    quantity: 15,
    available: 12,
    condition: 'Very Good',
    dimensions: 'Sizes: S, M, L, XL (see notes for count per size)',
    weight: '~600g per set',
    usageNotes:
      'Suitable for historical reenactments, heritage ceremonies, cultural pageants, and formal exhibitions. Provide borrower sizing at least 2 weeks before the event for fitting checks.',
    handlingInstructions:
      'Dry-clean or hand-wash in cold water only. Do not iron directly — use a pressing cloth. Fold neatly and return in the garment bags provided. Report any tears immediately to avoid further damage.',
    archiveEntryId: 'arc-005',
    tags: ['barong', 'costume', 'Malolos', 'heritage', 'piña', 'formal'],
    imageUrl: '/images/materials/barong-tagalog.jpg',
    addedDate: '2025-02-14',
    lastBorrowed: '2025-09-01',
    notes: '3 pieces currently on approved loan. 12 available. S (2), M (4), L (4), XL (2).',
    featured: true,
  },
  {
    id: 'mat-007',
    name: 'Obando Ritual Dance Headdresses',
    category: 'Costumes & Textiles',
    unit: 'piece',
    description:
      'Twelve ornate ritual headdresses worn in the Sayaw sa Obando devotional dance. Each features peacock feathers, polished cowrie shells, a woven rattan base, and gold and red silk ribbons. Handcrafted by specialist festival regalia artisans in Obando. Adjustable rattan base fits head circumferences 55–62 cm.',
    origin: 'Obando',
    festival: 'Sayaw sa Obando (Obando Fertility Festival)',
    sourceNote: 'Proposed donation from the Obando Heritage and Crafts Association upon initiative launch.',
    quantity: 12,
    available: 12,
    condition: 'Good',
    dimensions: '~35cm diameter × 40cm tall; fits head 55–62cm',
    weight: '~400g per piece',
    usageNotes:
      'For ritual dance performances, cultural exhibitions, and heritage programs. Each headdress is a handcrafted cultural artifact — treat with appropriate care. Do not use as a casual costume prop without cultural context.',
    handlingInstructions:
      'Store in individual cloth bags (provided). Never stack or compress. Feathers straighten if lightly steamed — do not iron. Report any broken cowrie shells for replacement before the next loan.',
    archiveEntryId: 'arc-007',
    tags: ['headdress', 'Obando', 'dance', 'ritual', 'feathers', 'cowrie'],
    imageUrl: '/images/materials/festival-headdress.jpg',
    addedDate: '2025-03-01',
    lastBorrowed: null,
    notes: 'Full set available. Handle with care — peacock feathers are fragile.',
    featured: false,
  },
  {
    id: 'mat-014',
    name: 'Maria Clara Heritage Dress Collection',
    category: 'Costumes & Textiles',
    unit: 'set',
    description:
      'Eight complete Maria Clara dresses in blue, yellow, pink, and white piña-blend fabric with matching camisa and patadyong accessories. Commissioned for the Malolos Heritage Pageant honoring the women who petitioned for education rights in 1889.',
    origin: 'Malolos',
    festival: 'Malolos Heritage Pageant',
    sourceNote: 'Proposed acquisition by the Malolos City Heritage Office for the LIKHAYON collection.',
    quantity: 8,
    available: 8,
    condition: 'Excellent',
    dimensions: 'Sizes: S (2), M (3), L (3)',
    weight: '~900g per set including accessories',
    usageNotes:
      'Ideal for heritage pageants, historical reenactments, cultural exhibitions, and educational programs on Philippine women\'s history. Provide borrower sizing 2 weeks in advance.',
    handlingInstructions:
      'Hand-wash or dry-clean only. Store folded in acid-free tissue paper in the provided garment boxes. Do not hang for extended periods — piña-blend may stretch.',
    archiveEntryId: 'arc-014',
    tags: ['Maria Clara', 'dress', 'Malolos', 'women', 'heritage', 'piña'],
    imageUrl: '/images/materials/maria-clara.jpg',
    addedDate: '2025-02-28',
    lastBorrowed: null,
    notes: 'Full set available. S (2), M (3), L (3).',
    featured: false,
  },

  /* ── LIGHTING & LANTERNS ─────────────────────────────── */
  {
    id: 'mat-004',
    name: 'Giant Parol Star Lanterns (Set of 20)',
    category: 'Lighting & Lanterns',
    unit: 'set',
    description:
      'Twenty large parol (Filipino star lanterns) in red, gold, white, and green, each 1.2m in diameter. Bamboo frames are fitted with replaceable Japanese paper panels and pre-wired for LED string lights (lights included). Originally used in a municipal Christmas lighting ceremony.',
    origin: 'Malolos',
    festival: 'Bulacan Parol Festival (Province-wide)',
    sourceNote: 'Proposed donation from the Bulacan Provincial Tourism Office upon initiative launch.',
    quantity: 20,
    available: 20,
    condition: 'Good',
    dimensions: '1.2m diameter per parol',
    weight: '~1.5 kg per parol',
    usageNotes:
      'Suitable for outdoor displays, school events, civic Christmas celebrations, and cultural exhibits. LED lights require a standard 220V outlet or extension cord (not included). Replace paper panels between events if torn.',
    handlingInstructions:
      'Carry flat or hang — never crumple or fold. Replace torn paper panels with the spare sheets included in the storage box. Inspect LED wiring before each use. Store stacked in the provided foam-padded crate.',
    archiveEntryId: 'arc-006',
    tags: ['parol', 'Christmas', 'lantern', 'star', 'LED'],
    imageUrl: '/images/materials/parol-star-lanterns.jpg',
    addedDate: '2025-04-01',
    lastBorrowed: '2025-12-01',
    notes: 'Full set available. Replacement paper panels included. Very popular December–January.',
    featured: true,
  },

  /* ── BANNERS & SIGNAGE ───────────────────────────────── */
  {
    id: 'mat-008',
    name: 'Festival Street Banners on Poles',
    category: 'Banners & Signage',
    unit: 'set',
    description:
      'Thirty spandex festival banners on 3-meter wooden poles, each displaying traditional Bulaqueño geometric patterns in red, gold, and green. Originally used to line a civic thoroughfare during a foundation day celebration. Banners are machine-washable; poles are hardwood and reusable.',
    origin: 'Meycauayan',
    festival: 'Meycauayan City Foundation Anniversary',
    sourceNote: 'Proposed donation from the Meycauayan City Government upon initiative launch.',
    quantity: 30,
    available: 30,
    condition: 'Excellent',
    dimensions: 'Banner: 0.6m wide × 1.5m tall; Pole: 3m',
    weight: '~1.2 kg per banner-and-pole set',
    usageNotes:
      'Drive poles into soft ground (minimum 30cm deep) or mount in pole bases (not included; rent locally). Space 3–5m apart for street lining. Suitable for outdoor events in dry weather — banners can withstand light rain.',
    handlingInstructions:
      'Machine-wash banners in cold water; tumble-dry on low. Sand and re-varnish poles annually. Roll banners around the poles for compact storage. Return in the provided canvas carrier bags.',
    archiveEntryId: 'arc-008',
    tags: ['banner', 'street', 'parade', 'geometric', 'Meycauayan'],
    imageUrl: '/images/materials/angat-banners.jpg',
    addedDate: '2025-05-10',
    lastBorrowed: null,
    notes: 'Full set of 30 available. Pole bases not included.',
    featured: false,
  },

  /* ── AUDIO & PERFORMANCE ─────────────────────────────── */
  {
    id: 'mat-011',
    name: 'Kulintang Ensemble & Ceremonial Drums',
    category: 'Audio & Performance',
    unit: 'set',
    description:
      'A complete kulintang ensemble: eight graduated bronze gongs on a hardwood frame, two large ceremonial drums (tambora), and a full set of mallets. Contemporary reproductions crafted using traditional tuning methods. Used in cultural performances, heritage presentations, and educational demonstrations.',
    origin: 'Malolos',
    festival: 'Bulacan Heritage Festival',
    sourceNote: 'Proposed acquisition funded by the NCCA cultural grant proposal pending approval.',
    quantity: 1,
    available: 1,
    condition: 'Good',
    dimensions: 'Gong frame: 1.5m wide; Drums: 0.5m diameter each',
    weight: '~35 kg (full set)',
    usageNotes:
      'A trained kulintang player is strongly recommended. LIKHAYON can connect borrowers with cultural practitioners upon request. Suitable for cultural performances, school heritage programs, and museum-style exhibitions.',
    handlingInstructions:
      'Transport gongs individually wrapped in cloth. Never stack gongs. Tune with a calibrated tuner before each performance. Drumheads should be loosened during transport. Store in the padded hard cases provided.',
    archiveEntryId: 'arc-011',
    tags: ['kulintang', 'gong', 'music', 'drum', 'performance'],
    imageUrl: '/images/materials/kulintang-instrument.jpg',
    addedDate: '2025-01-25',
    lastBorrowed: '2025-08-10',
    notes: 'Available. Performer referral service available on request.',
    featured: false,
  },

  /* ── WOVEN & CRAFT ITEMS ─────────────────────────────── */
  {
    id: 'mat-012',
    name: 'Handwoven Banig Display Panels',
    category: 'Woven & Craft Items',
    unit: 'panel',
    description:
      'Twelve large woven banig (reed mat) panels in traditional geometric patterns, crafted from tikog grass and buri palm leaves by master weavers in Balagtas. Each panel (1.5m × 2m) encodes family and community identity in its patterns. Used as exhibition backdrops, partition screens, and floor displays in cultural events.',
    origin: 'Balagtas',
    festival: 'Balagtas Arts & Crafts Fair',
    sourceNote: 'Proposed donation from the Balagtas Weaving Cooperative upon initiative launch.',
    quantity: 12,
    available: 12,
    condition: 'Excellent',
    dimensions: '1.5m wide × 2m tall per panel',
    weight: '~3 kg per panel',
    usageNotes:
      'Hang vertically using the grommets on the top edge (S-hooks provided), lay flat as floor displays, or use as table coverings for museum-style exhibitions. Lightweight and compact when rolled for transport.',
    handlingInstructions:
      'Never fold — always roll around a cardboard tube to prevent crease damage. Store in a cool, dry place away from direct sunlight to prevent fading. Spot-clean with a damp cloth only — do not machine-wash.',
    archiveEntryId: 'arc-004',
    tags: ['banig', 'weaving', 'crafts', 'tikog', 'Balagtas'],
    imageUrl: '/images/materials/banig-mats.jpg',
    addedDate: '2025-03-05',
    lastBorrowed: '2025-07-30',
    notes: 'Full set available. Carry tubes provided for transport.',
    featured: true,
  },
  {
    id: 'mat-017',
    name: 'Bakya (Wooden Clog) Display Set',
    category: 'Woven & Craft Items',
    unit: 'pair',
    description:
      'Twenty pairs of hand-painted traditional bakya (wooden clogs) in various sizes, decorated with floral and geometric motifs in the style of Bulacan folk craft. Used as visual display items in cultural exhibitions and educational programs. Not intended for active wear.',
    origin: 'Guiguinto',
    festival: 'Guiguinto Cultural Heritage Month',
    sourceNote: 'Proposed donation from the Guiguinto Heritage Artisans Association.',
    quantity: 20,
    available: 20,
    condition: 'Very Good',
    dimensions: 'Sizes 5–11 (Philippine); display use only',
    weight: '~400g per pair',
    usageNotes:
      'Display only — not for walking. Arrange as table displays or hang using the pre-drilled hole at the heel (cord included). Pair with cultural information cards for best educational effect.',
    handlingInstructions:
      'Handle gently to protect painted surfaces. Wrap each pair individually in tissue paper. Do not expose to moisture — unpainted wood may warp. Return in the original sectioned box.',
    archiveEntryId: null,
    tags: ['bakya', 'wooden', 'folk', 'craft', 'display'],
    imageUrl: '/images/materials/bakya-clogs.png',
    addedDate: '2025-07-20',
    lastBorrowed: null,
    notes: 'Full set of 20 pairs available. For display only.',
    featured: false,
  },
];
