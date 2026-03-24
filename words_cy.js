// Hangmango Welsh word bank v=001

const WORD_BANK_CY = {
  anifeiliaid: {
    easy:   ['CATH', 'CI', 'BUWCH', 'IAR', 'CWNINGEN', 'CEFFYL', 'HWYADEN', 'DAFAD', 'MOCHYN', 'TEIGR', 'LLEW', 'BLAIDD', 'ARTH', 'MWNCI', 'DOLFFIN'],
    medium: ['JIRAFF', 'PENGWIN', 'PAROT', 'CRWBAN', 'LLWYNOG', 'TYLLUAN', 'MORFIL', 'JAGWAR', 'OCTOPWS', 'CROCODIL', 'SGORPION', 'FFLAMINGO', 'PANTER'],
    hard:   ['HIPOPOTAMWS', 'RHINOSERWS', 'TSIMPANSÎ', 'ALBATROS', 'SALAMANDER', 'PLATYPWS', 'CANGARŴ', 'MOSGITO', 'CHWILEN', 'MULFRAN', 'MANDRILL', 'CAMELEON', 'YSTLUM', 'OSELOT']
  },
  bwyd: {
    easy:   ['BARA', 'LLAETH', 'WY', 'REIS', 'CAWL', 'CACEN', 'SALAD', 'PIZZA', 'SIWGR', 'MENYN', 'AFAL', 'LEMWN', 'MELON', 'CEIRIOSEN', 'MEFUSEN'],
    medium: ['CAWS', 'CYW', 'EOG', 'BERDYS', 'BROCOLI', 'PUPUR', 'CORBWMPEN', 'SELSIG', 'MWSTARD', 'SINAMON', 'CNAU', 'BRICYLLEN', 'MADARCH'],
    hard:   ['CREMPOG', 'BARA-BRITH', 'CAWL-CENNIN', 'PICL', 'TATWS-POB', 'PICE-AR-Y-MAEN', 'LOBSGOWS', 'TRIAGL', 'CAWS-CAERFFILI', 'BARA-LAWR']
  },
  cartref: {
    easy:   ['DRWS', 'FFENEST', 'GWELY', 'CADAIR', 'BWRDD', 'LAMP', 'SOFFA', 'BATH', 'SINC', 'POPTY', 'CARPED', 'CWPWRDD', 'MAT', 'SILFF', 'CLOC'],
    medium: ['YSTAFELL', 'CEGIN', 'LOLFA', 'GARDD', 'GAREJ', 'GRISIAU', 'NENFWD', 'LLAWR', 'MUR', 'TO', 'CYNTEDD', 'BALCONI', 'SELER', 'ATIG'],
    hard:   ['YSTAFELL-YMOLCHI', 'YSTAFELL-WELY', 'YSTAFELL-FWYTA', 'GWRESOGYDD', 'PEIRIANT-GOLCHI', 'OERGELL', 'MICRODON', 'TELEDU', 'CYFRIFIADUR', 'RHEWGELL']
  },
  tywydd: {
    easy:   ['HAUL', 'GLAW', 'EIRA', 'GWYNT', 'CYMYLAU', 'NIWL', 'IÂ', 'STORM', 'ENFYS', 'MELLT', 'BARRUG', 'CESAIR', 'HINDDA', 'GWRES', 'OERFEL'],
    medium: ['TYMHEREDD', 'RHAGOLWG', 'CORWYNT', 'TARANAU', 'LLIFOGYDD', 'SYCHDER', 'GWLYBANIAETH', 'HINSAWDD', 'GWYNTOEDD', 'TONNAU', 'RHEW', 'NIWLEN', 'DRYCIN'],
    hard:   ['TYMESTLOG', 'CYMYLOG', 'GWYNTOG', 'RHEWLLYD', 'STORMUS', 'CYMHEDROL', 'CYFANDIROL', 'TYMHOROL', 'GWLYBAIDD', 'EITHAFOL', 'TROANNOL', 'MYNYDDOL', 'ARFORDIROL']
  },
  cymru: {
    easy:   ['DRAIG', 'CAERDYDD', 'CYMRU', 'CYMRAEG', 'CASTELL', 'MYNYDD', 'AFON', 'LLYN', 'MÔR', 'FFERM', 'PENTREF', 'TREF', 'PONT', 'MAES', 'CAE'],
    medium: ['EISTEDDFOD', 'CORGI', 'CENNIN', 'CENNIN-PEDR', 'YR-WYDDFA', 'ABERYSTWYTH', 'CAERNARFON', 'WRECSAM', 'ABERTAWE', 'BANGOR', 'MERTHYR', 'LLANELLI', 'RHONDDA', 'GWYNEDD', 'CEREDIGION'],
    hard:   ['LLANFAIRPWLL', 'MACHYNLLETH', 'PONTYPRIDD', 'YSBYTY', 'SENEDD', 'PRIFYSGOL', 'AMGUEDDFA', 'LLYFRGELL', 'CYMUNEDOL', 'CENEDLAETHOL', 'RHYNGWLADOL', 'TREFTADAETH', 'DIWYLLIANT']
  },
  ysgol: {
    easy:   ['LLYFR', 'PENSIL', 'PAPUR', 'BEIRO', 'MAP', 'DESG', 'DOSBARTH', 'ATHRO', 'ATHRAWES', 'FFRIND', 'YSGOL', 'GWERS', 'CINIO', 'CHWARAE', 'CERDD'],
    medium: ['MATHEMATEG', 'SAESNEG', 'GWYDDONIAETH', 'HANES', 'DAEARYDDIAETH', 'CYFRIFIADUR', 'CELF', 'DRAMA', 'ADDYSG', 'LLENYDDIAETH', 'IAITH', 'SGWRS', 'PRAWF', 'ARHOLIAD', 'GWAITH'],
    hard:   ['CYFRIFIADUREG', 'TECHNOLEG', 'DYLUNIO', 'PEIRIANNEG', 'BIOLEG', 'CEMEG', 'FFISEG', 'ECONOMEG', 'SEICOLEG', 'ATHRONIAETH', 'LLYWODRAETH', 'CERDDORIAETH', 'PENSAERNÏAETH']
  },
  chwedlau: {
    easy:   ['DRAIG', 'BRENIN', 'BRENHINES', 'CAWR', 'ELLYLL', 'TYLWYTH', 'GWRACH', 'DEWIN', 'MARCHOG', 'CLEDDYF', 'TARIAN', 'TRYSOR', 'OGOF', 'CASTELL', 'FFOREST'],
    medium: ['MABINOGI', 'MYRDDIN', 'ARTHUR', 'BRANWEN', 'PRYDERI', 'RHIANNON', 'PWYLL', 'BENDIGEIDFRAN', 'GWYDION', 'ARIANRHOD', 'MATH', 'CERIDWEN', 'TALIESIN', 'LLEU'],
    hard:   ['MABINOGION', 'ANNWFN', 'TYLWYTH-TEG', 'CANTRE-R-GWAELOD', 'CALEDFWLCH', 'AFALLON', 'PENDRAGON', 'CARNEDD-LLEWELYN', 'ERYRI', 'BENDITH', 'HYNAFOL', 'CHWEDLONOL']
  }
};

const CATEGORY_META_CY = {
  anifeiliaid: { icon: '🐾', label: 'Anifeiliaid' },
  bwyd:        { icon: '🍕', label: 'Bwyd' },
  cartref:     { icon: '🏠', label: 'Cartref' },
  tywydd:      { icon: '⛅', label: 'Tywydd' },
  cymru:       { icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', label: 'Cymru' },
  ysgol:       { icon: '📚', label: 'Ysgol' },
  chwedlau:    { icon: '🐉', label: 'Chwedlau' }
};

function getWordCY(category, difficulty) {
  const list = WORD_BANK_CY[category][difficulty];
  return list[Math.floor(Math.random() * list.length)];
}
