// Hangmango word bank v=002

const wordsEn = {
  animals: {
    easy: [
      "cat", "dog", "cow", "chicken", "rabbit", "horse", "duck", "sheep",
      "pig", "tiger", "lion", "wolf", "bear", "monkey", "dolphin"
    ],
    medium: [
      "giraffe", "penguin", "camel", "parrot", "tortoise", "fox",
      "owl", "beaver", "whale", "jaguar", "octopus", "crocodile",
      "scorpion", "flamingo", "panther"
    ],
    hard: [
      "hippopotamus", "rhinoceros", "chimpanzee", "albatross", "salamander",
      "platypus", "anteater", "kangaroo", "mosquito", "beetle",
      "cormorant", "mandrill", "chameleon", "ocelot", "anaconda"
    ]
  },
  food: {
    easy: [
      "bread", "milk", "egg", "rice", "soup", "cake", "salad",
      "pizza", "sugar", "butter", "apple", "lemon", "melon", "cherry", "strawberry"
    ],
    medium: [
      "cheese", "salmon", "prawn", "broccoli", "pepper", "raspberry",
      "aubergine", "courgette", "croissant", "mustard", "cinnamon",
      "hazelnut", "apricot", "mushroom", "avocado"
    ],
    hard: [
      "ratatouille", "profiterole", "hollandaise", "gorgonzola",
      "bruschetta", "carpaccio", "bouillabaisse", "bechamel",
      "taramasalata", "spanakopita", "chimichurri", "gazpacho",
      "prosciutto", "tiramisu", "cacciatore"
    ]
  },
  sports: {
    easy: [
      "football", "tennis", "golf", "boxing", "rugby", "cycling", "swimming",
      "skiing", "judo", "yoga", "dancing", "running", "kayaking", "surfing", "sailing"
    ],
    medium: [
      "volleyball", "basketball", "climbing", "fencing", "diving",
      "handball", "baseball", "athletics", "triathlon", "badminton",
      "skating", "bowling", "equestrian", "rowing", "gymnastics"
    ],
    hard: [
      "skydiving", "pentathlon", "weightlifting", "motorcycling",
      "trampolining", "taekwondo", "decathlon", "biathlon",
      "bobsleigh", "acrobatics", "paragliding", "waterpolo",
      "archery", "luge", "speedskating"
    ]
  },
  countries: {
    easy: [
      "france", "spain", "italy", "china", "japan", "brazil",
      "canada", "morocco", "india", "egypt", "greece", "switzerland",
      "mexico", "russia", "cuba"
    ],
    medium: [
      "germany", "portugal", "australia", "argentina", "colombia",
      "nigeria", "vietnam", "ukraine", "peru", "algeria",
      "romania", "hungary", "tunisia", "pakistan", "senegal"
    ],
    hard: [
      "mozambique", "bangladesh", "azerbaijan", "madagascar",
      "kazakhstan", "guatemala", "cameroon", "zimbabwe", "nicaragua",
      "tajikistan", "uzbekistan", "ethiopia", "mauritania",
      "botswana", "slovakia"
    ]
  },
  movies: {
    easy: [
      "jaws", "grease", "alien", "rocky", "bambi", "dumbo", "psycho",
      "titanic", "frozen", "shrek", "elf", "up", "gravity", "inception", "avatar"
    ],
    medium: [
      "gladiator", "interstellar", "parasite", "braveheart", "spotlight",
      "whiplash", "moonlight", "nightcrawler", "chinatown", "casablanca",
      "manhattan", "goodfellas", "memento", "amelie", "ratatouille"
    ],
    hard: [
      "apocalypse now", "mulholland drive", "eternal sunshine",
      "there will be blood", "no country for old men",
      "the shawshank redemption", "schindlers list",
      "city of god", "spirited away",
      "blade runner", "the grand budapest hotel", "barton fink", "fargo"
    ]
  },
  science: {
    easy: [
      "atom", "sun", "moon", "earth", "water", "fire", "wind",
      "rain", "snow", "root", "flower", "seed", "blood", "bone", "skin"
    ],
    medium: [
      "oxygen", "carbon", "gravity", "eclipse", "erosion",
      "photon", "neuron", "bacteria", "cell", "circuit",
      "isotope", "molecule", "hormone", "enzyme", "comet"
    ],
    hard: [
      "photosynthesis", "ecosystem", "chromosome", "metabolism",
      "thermodynamics", "electrolysis", "astrophysics",
      "magnetism", "crystallography", "geomorphology",
      "biochemistry", "neurology", "spectroscopy", "tectonics", "geophysics"
    ]
  },
  music: {
    easy: [
      "jazz", "rock", "pop", "blues", "soul", "disco", "funk",
      "piano", "guitar", "flute", "drums", "violin", "harp",
      "rhythm", "melody"
    ],
    medium: [
      "reggae", "classical", "trumpet", "accordion", "keyboard",
      "orchestra", "symphony", "harmony", "concert", "festival",
      "conductor", "soprano", "tenor", "chorus", "tempo"
    ],
    hard: [
      "polyphony", "counterpoint", "composition", "philharmonic",
      "improvisation", "dissonance", "modulation", "syncopation",
      "arpeggio", "musicology", "instrumentation", "choreography",
      "sinfonietta", "harpsichord", "fortissimo"
    ]
  },
  mythology: {
    easy: [
      "zeus", "thor", "apollo", "atlas", "medusa", "minotaur",
      "pegasus", "cyclops", "dragon", "titan", "oracle", "sphinx",
      "hydra", "phoenix", "centaur"
    ],
    medium: [
      "achilles", "odysseus", "hercules", "poseidon", "artemis",
      "dionysus", "persephone", "prometheus", "narcissus", "icarus",
      "beowulf", "loki", "valkyrie", "odin", "anubis"
    ],
    hard: [
      "epimetheus", "ereshkigal", "gilgamesh", "scheherazade",
      "quetzalcoatl", "morrigan", "cernunnos", "baphomet",
      "anansi", "maui", "izanagi", "kagutsuchi",
      "enkidu", "tiresias", "andromeda"
    ]
  },
  nature: {
    easy: [
      "tree", "river", "flower", "stone", "cloud", "rain", "wind",
      "leaf", "root", "fruit", "lake", "beach", "forest", "mountain", "desert"
    ],
    medium: [
      "waterfall", "glacier", "volcano", "canyon", "estuary",
      "mangrove", "savanna", "tundra", "plateau", "lagoon",
      "coral reef", "wetland", "fjord", "delta", "peninsula"
    ],
    hard: [
      "biodiversity", "ecosystem", "deforestation", "sustainability",
      "phototropism", "pollination", "hibernation", "mimicry",
      "symbiosis", "decomposition", "stratification", "permafrost",
      "bioluminescence", "desertification", "afforestation"
    ]
  },
  art: {
    easy: [
      "painting", "drawing", "sculpture", "photo", "dance", "theatre",
      "cinema", "music", "novel", "poem", "fresco", "portrait",
      "colour", "brush", "canvas"
    ],
    medium: [
      "watercolour", "engraving", "mosaic", "calligraphy", "ceramics",
      "lithography", "pastel", "stained glass", "tapestry", "embroidery",
      "collage", "charcoal", "animation", "typography", "etching"
    ],
    hard: [
      "impressionism", "surrealism", "renaissance", "baroque",
      "romanticism", "cubism", "expressionism", "naturalism",
      "symbolism", "classicism", "dadaism", "futurism",
      "realism", "modernism", "bauhaus"
    ]
  },
  literature: {
    easy: [
      "novel", "poem", "story", "hero", "villain", "plot", "chapter",
      "author", "fiction", "myth", "fable", "drama", "prose",
      "sonnet", "theme"
    ],
    medium: [
      "shakespeare", "dickens", "tolkien", "hemingway", "austen",
      "metaphor", "narrator", "allegory", "soliloquy", "protagonist",
      "anthology", "biography", "dystopia", "satire", "haiku"
    ],
    hard: [
      "existentialism", "postmodernism", "intertextuality", "omniscient",
      "onomatopoeia", "personification", "foreshadowing", "bildungsroman",
      "tragicomedy", "anachronism", "verisimilitude", "epistolary",
      "solipsism", "absurdism", "surrealism"
    ]
  },
  cities: {
    easy: [
      "london", "paris", "tokyo", "rome", "berlin", "sydney",
      "dubai", "moscow", "cairo", "delhi", "seoul", "toronto",
      "miami", "oslo", "lima"
    ],
    medium: [
      "istanbul", "bangkok", "amsterdam", "barcelona", "singapore",
      "nairobi", "jakarta", "montreal", "melbourne", "casablanca",
      "budapest", "santiago", "karachi", "lagos", "tehran"
    ],
    hard: [
      "reykjavik", "ulaanbaatar", "vladivostok", "ouagadougou",
      "antananarivo", "kathmandu", "montevideo", "guadalajara",
      "thessaloniki", "tallinn", "windhoek", "tashkent",
      "islamabad", "johannesburg", "wellington"
    ]
  },
  technology: {
    easy: [
      "phone", "laptop", "screen", "mouse", "camera", "tablet",
      "robot", "wifi", "email", "browser", "server", "pixel",
      "cable", "keyboard", "battery"
    ],
    medium: [
      "algorithm", "database", "software", "hardware", "network",
      "firewall", "encryption", "interface", "bandwidth", "processor",
      "bluetooth", "podcast", "streaming", "cybersecurity", "platform"
    ],
    hard: [
      "cryptocurrency", "blockchain", "machinelearning", "virtualreality",
      "augmentedreality", "nanotechnology", "biotechnology", "quantumcomputing",
      "neuralnetwork", "opensource", "javascript", "cloudcomputing",
      "deeplearning", "microprocessor", "cybersecurity"
    ]
  },
  history: {
    easy: [
      "king", "queen", "war", "peace", "empire", "castle", "knight",
      "sword", "crown", "throne", "treaty", "republic", "colony",
      "revolution", "democracy"
    ],
    medium: [
      "renaissance", "reformation", "enlightenment", "crusades",
      "colonialism", "industrialisation", "suffragette", "parliament",
      "civilisation", "archaeology", "feudalism", "monarchy",
      "constitution", "declaration", "abolition"
    ],
    hard: [
      "mesopotamia", "byzantine", "ottomans", "conquistadors",
      "imperialism", "mercantilism", "nationalism", "totalitarianism",
      "decolonisation", "suffragism", "abolitionism", "republicanism",
      "constitutionalism", "enlightenment", "industrialisation"
    ]
  }
};

const CATEGORY_META = {
  animals:    { icon: '🐾', label: 'Animals' },
  food:       { icon: '🍕', label: 'Food' },
  sports:     { icon: '⚽', label: 'Sports' },
  countries:  { icon: '🌍', label: 'Countries' },
  movies:     { icon: '🎬', label: 'Movies' },
  science:    { icon: '🔬', label: 'Science' },
  music:      { icon: '🎵', label: 'Music' },
  mythology:  { icon: '🏛️', label: 'Mythology' },
  nature:     { icon: '🌿', label: 'Nature' },
  art:        { icon: '🎨', label: 'Art' },
  literature: { icon: '📚', label: 'Literature' },
  cities:     { icon: '🏙️', label: 'Cities' },
  technology: { icon: '💻', label: 'Technology' },
  history:    { icon: '📜', label: 'History' }
};

function getWord(category, difficulty) {
  const list = wordsEn[category][difficulty];
  return list[Math.floor(Math.random() * list.length)];
}

if (typeof module !== "undefined") module.exports = wordsEn;
