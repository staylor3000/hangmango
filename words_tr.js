// Hangmango Turkish word bank v=001

const wordsTr = {
  hayvanlar: {
    easy: [
      "kedi", "köpek", "inek", "tavuk", "tavşan", "at", "ördek", "koyun",
      "domuz", "kaplan", "aslan", "kurt", "ayı", "maymun", "yunus"
    ],
    medium: [
      "zürafa", "penguen", "deve", "papağan", "kaplumbağa", "tilki",
      "baykuş", "kunduz", "balina", "jaguar", "ahtapot", "timsah",
      "akrep", "flamingo", "panter"
    ],
    hard: [
      "hipopotam", "gergedan", "şempanze", "albatros", "semender",
      "ornitorenk", "kanguru", "sivrisinek", "hamamböceği",
      "karabatak", "mandril", "bukalemun", "yarasa", "oselot", "anakonda"
    ]
  },
  yiyecek: {
    easy: [
      "ekmek", "süt", "yumurta", "pirinç", "çorba", "pasta", "salata",
      "pizza", "şeker", "tereyağı", "elma", "limon", "kavun", "kiraz", "çilek"
    ],
    medium: [
      "peynir", "tavuk", "somon", "karides", "brokoli", "biber",
      "ahududu", "patlıcan", "kabak", "simit", "sucuk",
      "hardal", "tarçın", "fındık", "kayısı"
    ],
    hard: [
      "mantı", "döner", "lahmacun", "musakka", "baklava",
      "börek", "kebap", "dolma", "cacık", "meze",
      "künefe", "kadayıf", "lokum", "helva", "şakşuka"
    ]
  },
  spor: {
    easy: [
      "futbol", "tenis", "golf", "boks", "ragbi", "bisiklet", "yüzme",
      "kayak", "judo", "yoga", "dans", "koşu", "kano", "sörf", "yelken"
    ],
    medium: [
      "voleybol", "basketbol", "tırmanma", "eskrim", "dalış",
      "hentbol", "beysbol", "atletizm", "triatlon",
      "badminton", "buzpateni", "bowling", "binicilik", "kürek", "jimnastik"
    ],
    hard: [
      "paraşüt", "pentatlon", "halter", "motosiklet",
      "trampolin", "tekvando", "dekatlon", "biatlon",
      "bobsley", "akrobasi", "yamaçparaşütü", "sutopu",
      "okçuluk", "kızak"
    ]
  },
  ülkeler: {
    easy: [
      "fransa", "ispanya", "italya", "çin", "japonya", "brezilya",
      "kanada", "fas", "hindistan", "mısır", "yunanistan", "isviçre",
      "meksika", "rusya", "küba"
    ],
    medium: [
      "almanya", "portekiz", "avustralya", "arjantin", "kolombiya",
      "nijerya", "vietnam", "ukrayna", "peru", "cezayir",
      "romanya", "macaristan", "tunus", "pakistan", "senegal"
    ],
    hard: [
      "mozambik", "bangladeş", "azerbaycan", "madagaskar",
      "kazakistan", "guatemala", "kamerun", "zimbabve", "nikaragua",
      "tacikistan", "özbekistan", "etiyopya", "moritanya",
      "botsvana", "slovakya"
    ]
  },
  bilim: {
    easy: [
      "atom", "güneş", "ay", "dünya", "su", "ateş", "rüzgar",
      "yağmur", "kar", "kök", "çiçek", "tohum", "kan", "kemik", "deri"
    ],
    medium: [
      "oksijen", "karbon", "yerçekimi", "tutulma", "erozyon",
      "foton", "nöron", "bakteri", "hücre", "devre",
      "izotop", "molekül", "hormon", "enzim", "kuyrukluyıldız"
    ],
    hard: [
      "fotosentez", "ekosistem", "kromozom", "metabolizma",
      "termodinamik", "elektroliz", "astrofizik",
      "manyetizma", "kristalografi", "jeomorfoloji",
      "biyokimya", "nöroloji", "spektroskopi", "tektonik", "jeofizik"
    ]
  },
  coğrafya: {
    easy: [
      "deniz", "göl", "dağ", "ada", "burun", "körfez",
      "delta", "orman", "çöl", "ova", "tepe", "nehir",
      "okyanus", "vadi", "plaj"
    ],
    medium: [
      "amazon", "sahra", "himalaya", "atlantik", "pasifik",
      "akdeniz", "arktik", "fiyort", "şelale", "volkan",
      "yayla", "tundra", "mangrov", "savan", "tropik"
    ],
    hard: [
      "patagonya", "mezopotamya", "pireneler", "kilimanjaro",
      "karpatlar", "kordiyera", "meridyen",
      "ekvator", "subantarktik", "subarktik", "tektonik",
      "anadolu", "kapadokya", "boğaz", "yarımada"
    ]
  },
  müzik: {
    easy: [
      "saz", "ud", "davul", "zurna", "bağlama", "keman", "piyano",
      "gitar", "flüt", "ritim", "melodi", "nota", "koro", "şarkı", "dans"
    ],
    medium: [
      "halk", "klasik", "arabesk", "türkü", "fasıl",
      "trompet", "klarnet", "akordeon", "orkestra", "konser",
      "makam", "usul", "mey", "kanun", "ney"
    ],
    hard: [
      "polifoni", "kontrpuan", "kompozisyon", "filarmoni",
      "doğaçlama", "disonans", "modülasyon", "senkop",
      "arpej", "müzikoloji", "enstrümantasyon",
      "senfoni", "kemençe", "rebap", "tanbur"
    ]
  },
  sanat: {
    easy: [
      "resim", "çizim", "heykel", "fotoğraf", "dans", "tiyatro",
      "sinema", "müzik", "roman", "şiir", "fresk", "portre",
      "renk", "fırça", "tuval"
    ],
    medium: [
      "suluboya", "gravür", "mozaik", "kaligrafi", "seramik",
      "litografi", "pastel", "vitray", "goblen", "nakış",
      "minyatür", "ebru", "çini", "halı", "hat"
    ],
    hard: [
      "empresyonizm", "sürrealizm", "rönesans", "barok",
      "romantizm", "kübizm", "ekspresyonizm", "natüralizm",
      "sembolizm", "klasisizm", "dadaizm", "fütürizm",
      "realizm", "modernizm", "osmanlı"
    ]
  }
};

const CATEGORY_META_TR = {
  hayvanlar: { icon: '🐾', label: 'Hayvanlar' },
  yiyecek:   { icon: '🍕', label: 'Yiyecek' },
  spor:      { icon: '⚽', label: 'Spor' },
  ülkeler:   { icon: '🌍', label: 'Ülkeler' },
  bilim:     { icon: '🔬', label: 'Bilim' },
  coğrafya:  { icon: '🗺️', label: 'Coğrafya' },
  müzik:     { icon: '🎵', label: 'Müzik' },
  sanat:     { icon: '🎨', label: 'Sanat' }
};

function getWordTR(category, difficulty) {
  const list = wordsTr[category][difficulty];
  return list[Math.floor(Math.random() * list.length)];
}

if (typeof module !== "undefined") module.exports = wordsTr;
