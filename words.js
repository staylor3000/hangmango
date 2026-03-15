// Hangmango word bank v=001

const WORD_BANK = {
  animals: {
    easy:   ['CAT','DOG','PIG','COW','HEN','ANT','FOX','OWL','BAT','EMU','BEE','YAK'],
    medium: ['TIGER','SHARK','EAGLE','KOALA','ZEBRA','LLAMA','PARROT','MONKEY','BEAVER','PANDA','LEMUR','BISON'],
    hard:   ['ELEPHANT','CROCODILE','CHIMPANZEE','SALAMANDER','RHINOCEROS','FLAMINGO','PORCUPINE','WOLVERINE','CHAMELEON','ORANGUTAN']
  },
  food: {
    easy:   ['PIE','CAKE','SOUP','RICE','PLUM','LIME','CORN','TACO','BUN','EGG','JAM','NUT'],
    medium: ['PIZZA','MANGO','SUSHI','BAGEL','WAFFLE','PICKLE','NACHOS','BURRITO','DONUT','QUICHE','FALAFEL','BROWNIE'],
    hard:   ['CHOCOLATE','CROISSANT','QUESADILLA','BRUSCHETTA','CAULIFLOWER','BLUEBERRY','CHEESECAKE','CLEMENTINE','MARMALADE','STROGANOFF']
  },
  sports: {
    easy:   ['GOLF','POLO','JUDO','SWIM','DIVE','RACE','SHOT','KICK'],
    medium: ['TENNIS','BOXING','HOCKEY','RUGBY','FENCING','SURFING','CYCLING','ARCHERY','CRICKET','ROWING'],
    hard:   ['BADMINTON','VOLLEYBALL','GYMNASTICS','SKATEBOARD','SNOWBOARD','WATERPOLO','BASKETBALL','EQUESTRIAN','BOBSLEIGH','DECATHLON']
  },
  countries: {
    easy:   ['PERU','CUBA','CHAD','MALI','IRAN','IRAQ','LAOS','FIJI','TOGO','OMAN','INDIA','SPAIN'],
    medium: ['BRAZIL','FRANCE','GREECE','MEXICO','SWEDEN','TURKEY','NORWAY','CANADA','POLAND','EGYPT','KENYA','JAPAN'],
    hard:   ['AUSTRALIA','SWITZERLAND','PHILIPPINES','MOZAMBIQUE','BANGLADESH','AZERBAIJAN','MADAGASCAR','LUXEMBOURG','KYRGYZSTAN','LIECHTENSTEIN']
  },
  movies: {
    easy:   ['TOY','UP','JAWS','CARS','ELF','HOOK','ALIEN'],
    medium: ['FROZEN','ALIENS','GREASE','BAMBI','SHREK','MULAN','CLUELESS','GANDHI','BEETLEJUICE','LABYRINTH'],
    hard:   ['INCEPTION','INTERSTELLAR','PARASITE','CASABLANCA','TERMINATOR','LABYRINTH','CHINATOWN','TRAINSPOTTING','APOCALYPSE','BRAVEHEART']
  },
  science: {
    easy:   ['ATOM','CELL','WAVE','HEAT','MASS','GENE','ROCK','STAR','MOON','ACID'],
    medium: ['PLANET','MAGNET','FOSSIL','COMET','ENERGY','CARBON','TISSUE','OXYGEN','PROTON','METEOR','FUNGUS','ENZYME'],
    hard:   ['TELESCOPE','ECOSYSTEM','ATMOSPHERE','CHROMOSOME','EARTHQUAKE','MICROCHIP','LABORATORY','HYPOTHESIS','PHOTOSYNTHESIS','EVAPORATION']
  }
};

const CATEGORY_META = {
  animals:   { icon: '🐾', label: 'Animals' },
  food:      { icon: '🍕', label: 'Food' },
  sports:    { icon: '⚽', label: 'Sports' },
  countries: { icon: '🌍', label: 'Countries' },
  movies:    { icon: '🎬', label: 'Movies' },
  science:   { icon: '🔬', label: 'Science' }
};

function getWord(category, difficulty) {
  const list = WORD_BANK[category][difficulty];
  return list[Math.floor(Math.random() * list.length)];
}
