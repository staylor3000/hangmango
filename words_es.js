// Hangmango Spanish word bank v=002

const WORD_BANK_ES = {
  animales: {
    easy:   ['GATO', 'PERRO', 'PATO', 'RANA', 'VACA', 'TORO', 'LOBO', 'MONO', 'SAPO', 'OVEJA', 'CABRA', 'MULA', 'PUMA', 'RATA', 'BURRO'],
    medium: ['ELEFANTE', 'TIBURÓN', 'DELFÍN', 'PINGÜINO', 'TORTUGA', 'CANGURO', 'PANTERA', 'GUEPARDO', 'CÓNDOR', 'BALLENA', 'HALCÓN', 'CABALLO', 'CAMELLO', 'PÁJARO', 'GORILA'],
    hard:   ['MURCIÉLAGO', 'SALAMANDRA', 'RINOCERONTE', 'HIPOPÓTAMO', 'CHIMPANCÉ', 'ARMADILLO', 'ALBATROS', 'ANACONDA', 'MANTARRAYA', 'TARÁNTULA', 'ESCARABAJO', 'ORNITORRINCO', 'COCODRILO', 'SERPIENTE', 'GUACAMAYO']
  },
  comida: {
    easy:   ['PAPA', 'MAÍZ', 'ARROZ', 'LECHE', 'CARNE', 'POLLO', 'QUESO', 'FRUTA', 'MANGO', 'LIMÓN', 'UVAS', 'PERA', 'SOPA', 'FIDEO', 'TORTA'],
    medium: ['NARANJA', 'TOMATE', 'PEPINO', 'CEBOLLA', 'PLÁTANO', 'AGUACATE', 'ESPINACA', 'BRÓCOLI', 'ZANAHORIA', 'CALABAZA', 'FRIJOLES', 'TAMALES', 'TOSTADAS', 'ENCHILADA', 'GUAYABA'],
    hard:   ['CHOCOLATE', 'QUESADILLA', 'GUACAMOLE', 'EMPANADA', 'CHICHARRÓN', 'CHILAQUILES', 'COLIFLOR', 'MANDARINA', 'FRAMBUESA', 'ALCACHOFA', 'CHAMPIÑÓN', 'BERENJENA', 'HORCHATA', 'MARACUYÁ', 'PISTACHO']
  },
  deportes: {
    easy:   ['FÚTBOL', 'TENIS', 'BOXEO', 'GOLF', 'RUGBY', 'SURF', 'LUCHA', 'PESCA', 'REMO', 'SALTO', 'JUDO', 'POLO', 'VELA', 'MOTO', 'DANZA'],
    medium: ['BÉISBOL', 'VOLEIBOL', 'CICLISMO', 'NATACIÓN', 'ATLETISMO', 'KARATE', 'GIMNASIA', 'PATINAJE', 'ESGRIMA', 'ESCALADA', 'ARQUERÍA', 'TRIATLÓN', 'HANDBALL', 'TAEKWONDO', 'WATERPOLO'],
    hard:   ['BALONCESTO', 'PARACAIDISMO', 'HALTEROFILIA', 'MOTOCICLISMO', 'WINDSURFING', 'BALONMANO', 'EQUITACIÓN', 'SNOWBOARD', 'ALPINISMO', 'KICKBOXING', 'PENTATLÓN', 'PARAPENTE', 'RAQUETBOL', 'CANOTAJE', 'PIRAGÜISMO']
  },
  países: {
    easy:   ['CUBA', 'CHILE', 'PERÚ', 'CHINA', 'INDIA', 'BRASIL', 'JAPÓN', 'RUSIA', 'EGIPTO', 'ITALIA', 'COREA', 'GHANA', 'NEPAL', 'QATAR', 'IRÁN'],
    medium: ['MÉXICO', 'COLOMBIA', 'ECUADOR', 'PANAMÁ', 'URUGUAY', 'BOLIVIA', 'TURQUÍA', 'GRECIA', 'CANADÁ', 'SUECIA', 'NORUEGA', 'AUSTRIA', 'UCRANIA', 'ETIOPÍA', 'CROACIA'],
    hard:   ['ARGENTINA', 'VENEZUELA', 'GUATEMALA', 'NICARAGUA', 'HONDURAS', 'PARAGUAY', 'AUSTRALIA', 'ALEMANIA', 'INDONESIA', 'TAILANDIA', 'KAZAJISTÁN', 'MOZAMBIQUE', 'MAURITANIA', 'BANGLADESH', 'ESLOVAQUIA']
  },
  ciencia: {
    easy:   ['LUNA', 'AGUA', 'AIRE', 'ROCA', 'ÁTOMO', 'CÉLULA', 'PLANTA', 'METAL', 'CALOR', 'FUERZA', 'MASA', 'NÚCLEO', 'ÁCIDO', 'ASTRO', 'VAPOR'],
    medium: ['ENERGÍA', 'VOLCÁN', 'PLANETA', 'COMETA', 'ECLIPSE', 'GRAVEDAD', 'MOLÉCULA', 'PROTEÍNA', 'BACTERIA', 'OXÍGENO', 'CARBONO', 'NEUTRÓN', 'SATÉLITE', 'GALAXIA', 'PRESIÓN'],
    hard:   ['FOTOSÍNTESIS', 'ASTRONOMÍA', 'ATMÓSFERA', 'CROMOSOMA', 'ELECTRÓN', 'ECOSISTEMA', 'EVOLUCIÓN', 'METEORITO', 'MICROSCOPIO', 'ELECTRÓNICA', 'HIDRÓGENO', 'MAGNETISMO', 'GEOLOGÍA', 'TELESCOPIO', 'NEBULOSA']
  },
  música: {
    easy:   ['RITMO', 'NOTA', 'CLAVE', 'CORO', 'TUBA', 'ARPA', 'FLAUTA', 'BOMBO', 'BONGO', 'PIANO', 'VIOLA', 'CHELO', 'SALSA', 'VALS', 'JAZZ'],
    medium: ['GUITARRA', 'TROMPETA', 'VIOLÍN', 'BATERÍA', 'MELODÍA', 'ARMONÍA', 'SONATA', 'CUMBIA', 'REGUETÓN', 'MERENGUE', 'MARIMBA', 'SINFONÍA', 'CONCIERTO', 'CANTANTE', 'TAMBORES'],
    hard:   ['COMPOSICIÓN', 'CONTRABAJO', 'ORQUESTA', 'PERCUSIÓN', 'PANDERETA', 'XILÓFONO', 'FLAMENCO', 'PARTITURA', 'OBERTURA', 'ACORDEÓN', 'CONTRALTO', 'BANDONEÓN', 'CLARINETE', 'SERENATA', 'METRÓNOMO']
  },
  geografía: {
    easy:   ['ISLA', 'LAGO', 'SELVA', 'PUNA', 'MONTE', 'VALLE', 'COSTA', 'MAPA', 'POLO', 'ZONA', 'CABO', 'GOLFO', 'CERRO', 'DELTA', 'PAMPA'],
    medium: ['OCÉANO', 'DESIERTO', 'GLACIAR', 'MESETA', 'SABANA', 'CUENCA', 'LLANURA', 'PANTANO', 'LAGUNA', 'CATARATA', 'PRADERA', 'ESTEPA', 'MANGLAR', 'ESTUARIO', 'CAÑADA'],
    hard:   ['CORDILLERA', 'ARCHIPIÉLAGO', 'CONTINENTE', 'MERIDIANO', 'GEOMORFOLOGÍA', 'SUBTRÓPICO', 'HEMISFERIO', 'ALTIPLANO', 'PROMONTORIO', 'HIDROGRAFÍA', 'ESTRATOSFERA', 'ALTIMETRÍA', 'LITOLOGÍA', 'CARTOGRAFÍA', 'TOPOGRAFÍA']
  }
};

const CATEGORY_META_ES = {
  animales:  { icon: '🐾', label: 'Animales' },
  comida:    { icon: '🍕', label: 'Comida' },
  deportes:  { icon: '⚽', label: 'Deportes' },
  países:    { icon: '🌍', label: 'Países' },
  ciencia:   { icon: '🔬', label: 'Ciencia' },
  música:    { icon: '🎵', label: 'Música' },
  geografía: { icon: '🗺️', label: 'Geografía' }
};

function getWordES(category, difficulty) {
  const list = WORD_BANK_ES[category][difficulty];
  return list[Math.floor(Math.random() * list.length)];
}
