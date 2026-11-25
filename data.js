// ═══════════════════════════════════════════════════════
//  data.js  —  Wambaga Family Tree Data
//  All persons from the document. Edit this file to add/fix people.
// ═══════════════════════════════════════════════════════
const PEOPLE = {};
let nextId = 1;
function p(name,gen,branch,parentId,opts={}){
  const id='p'+nextId++;
  PEOPLE[id]={id,name,gen,branch,parentId,children:[],
    note:opts.note||'',died:opts.died||'',born:opts.born||'',
    spouse:opts.spouse||'',location:opts.location||'',
    isFemale:name.startsWith('Bi ')||opts.female||false,
    isUnknown:opts.unknown||false};
  if(parentId && PEOPLE[parentId]) PEOPLE[parentId].children.push(id);
  return id;
}
// ── GEN 1: BAGHA ──────────────────────────
const gBagha = p('Bagha',1,'Wambaga wote',null,{
  note:'Mzee wa kwanza wa Wambaga. Alitoka Asmara, Ethiopia ~1545. Kulitokea vita vya wenyewe kwa wenyewe  -  akakimbia Uganda (Mbale) pamoja na kundi lake, ikiwemo Mndome (babu wa Wandeme).',
  location:'Asmara, Ethiopia'});

// ── GEN 2: MLAVI ──────────────────────────
const gMlavi = p('Mlavi',2,'Wambaga wote',gBagha,{
  note:'Mtoto pekee wa Bagha. Walihamia Uganda (Mbale) ~1575, kisha wakaenda Nairobi. Mlavi alimzaa watoto wawili: Mwangi (alibaki Kenya) na Shambiro (aliendelea kusini).',
  location:'Uganda → Nairobi, Kenya'});

// ── GEN 3: MWANGI & SHAMBIRO ──────────────
const gMwangi = p('Mwangi Mlavi',3,'Tawi la Kenya',gMlavi,{
  note:'Alibaki Kenya. Uzao wake wako Kenya hadi leo.',location:'Kenya'});
const gShambiro = p('Shambiro Mlavi',3,'Wambaga wote',gMlavi,{
  note:'Alikaa Kitui, Machakosi, na Voi (Kijiji cha Mwandau). Baba wa matawi yote makuu ya Wambaga Tanzania. Watoto wake: Bangalala, Mbaniko, Sengasu, Sinta/Sinda, na Bi Kokidia.',
  location:'Voi, Kijiji cha Mwandau, Kenya'});

// ── GEN 4 (Doc Gen 1): WATOTO WA SHAMBIRO ──
const gBangalala = p('Bangalala Shambiro',4,'Tawi la Bangalala',gShambiro,{
  note:'Wambaga wa Usangi Ndanda, Kiriche. Uzao wake: Mtira (akina Ringania, Ngomasere) na Mwangi (uzao haujulikani).',
  location:'Usangi Ndanda, Kiriche'});
const gMbaniko = p('Mbaniko Shambiro',4,'Tawi la Mbaniko',gShambiro,{
  note:'Alioa mke wa Kimasai: Namanga Sayore. Watoto wake: Kalighi na Tenameso. Uzao wake wako Usangi Kirongaya na Ngujini.',
  spouse:'Namanga Sayore (Kimasai)',location:'Usangi Kirongaya / Ngujini'});
const gSengasu = p('Sengasu Shambiro',4,'Tawi la Sengasu',gShambiro,{
  note:'Wa kwanza kuvuka Tanzania. Akapita Mbuga ya Tsavo, Mbuga ya Mkomazi, Kilima cha Mazara, Kilima cha Kamirangi hadi Kisiwani  -  pakaitwa Hamteta (maana: mtu anayetoka Teta/Taveta). Watoto: Rindi, Kuare, Walongwa, Bi Nankondo, Bi Namhezi.',
  location:'Mbaga Madiveni'});
const gSinta = p('Sinta / Sinda Shambiro',4,'Tawi la Sinta',gShambiro,{
  note:'Wambaga wa Mbagha.',location:'Mbagha'});
p('Bi Kokidia Shambiro',4,'Tawi la Shambiro',gShambiro,{female:true});

// ─────────────────────────────────────────
// TAWI LA BANGALALA
// ─────────────────────────────────────────
const gMtira = p('Mtira Bangalala',5,'Tawi la Bangalala',gBangalala,{
  note:'Mtoto wa Bangalala Shambiro. Uzao wake kupitia Ringania: Sekanyonge (akina Nziamwe, Maliare, Lichmen), Mnyalo (akina Varisanga, Kiagho), na wengine.'});
const gMwangiBang = p('Mwangi Bangalala',5,'Tawi la Bangalala',gBangalala,{
  note:'Uzao wake haujulikani.'});

// ─────────────────────────────────────────
// TAWI LA MBANIKO  -  KALIGHI
// ─────────────────────────────────────────
// Gen 5 (Doc Gen 2): Watoto wa Mbaniko
const gKalighi = p('Kalighi Mbaniko',5,'Tawi la Mbaniko',gMbaniko,{
  note:'Watoto wake: Kinyunyu na Chikira Kalighi.'});
const gTenameso = p('Tenameso Mbaniko',5,'Tawi la Tenameso',gMbaniko,{
  note:'Watoto wake: Kizigha (Mkisangara) na Mshewa (Tatiro).'});

// Gen 6 (Doc Gen 3): Watoto wa Kalighi
const gKinyunyu = p('Kinyunyu Kalighi',6,'Tawi la Mbaniko',gKalighi,{
  note:'Watoto wake: Kitagha, Kagulu, Kilango, Bi Nambojo.'});
const gChikira = p('Chikira Kalighi',6,'Tawi la Chikira',gKalighi,{
  note:'Watoto wake: Mrighwa, Mwanyika, Kanyange, Sayore. Uzao wako Kisangara juu na maeneo mengine.'});

// Gen 7 (Doc Gen 4): Watoto wa Kinyunyu
const gKitagha = p('Kitagha Kinyunyu',7,'Tawi la Mbaniko',gKinyunyu,{
  note:'Watoto wake: Mpombeyagonja/Thekiro, Kinenekejo, Tegurwa.'});
const gKagulu = p('Kagulu Kinyunyu',7,'Tawi la Kagulu',gKinyunyu,{
  note:'Watoto wake: Mlavi Kagulu, Angida Kagulu.'});
const gKilango = p('Kilango Kinyunyu',7,'Tawi la Kilango',gKinyunyu,{
  note:'Watoto wake: Varinoi, Mlau, Ngwaru, Shai.'});
p('Bi Nambojo Kinyunyu',7,'Tawi la Mbaniko',gKinyunyu,{female:true});

// Gen 8 (Doc Gen 5): Watoto wa Kitagha
const gMpombeya = p('Mpombeyagonja / Thekiro',8,'★ Tawi la Mpombeyagonja',gKitagha,{
  note:'Mzee maarufu wa tawi la Mpombeyagonja. Alioa wanawake wawili: (1) Navuri na (2) Kitukule. Watoto wake: Mashanga/Masudi, Mwejuma/Naneka, Kinonga/Athumani, Bi Zaina/Majwii.',
  spouse:'(1) Navuri  (2) Kitukule'});
const gKinenekejo = p('Kinenekejo Kitagha',8,'Tawi la Kinenekejo',gKitagha,{
  note:'Kinenekejo mwana Kitagha mwana Kinyunyu mwana Kalighi mwana Mbaniko mwana Shambiro mwana Mlavi mwana Bagha. Watoto wake: Abdalah, Haji, Nasoro, Rashidi, Juma, Kutua, Simbano, na wengine.'});
const gTegurwa = p('Tegurwa Kitagha',8,'Tawi la Mbaniko',gKitagha);

// Gen 9 (Doc Gen 6): Watoto wa Mpombeyagonja
const gMashanga = p('Mashanga / Masudi',9,'Tawi la Mpombeyagonja',gMpombeya,{
  died:'9/5/1959, Usangi Kirongaya',
  spouse:'(1) Namcheja/Mariamu  (2) Nakio/Zuhura  (3) Mwajuma/Naikube  (4) Namshitu',
  note:'Alifariki 9/5/1959 Usangi Kirongaya. Alioa wanawake wanne. Watoto 18 (waume 9, wake 9).'});
const gMwejuma = p('Mwejuma / Naneka',9,'Tawi la Mpombeyagonja',gMpombeya,{
  born:'1911',died:'1993',
  spouse:'(1) Mwanaidi/Namkeshe (aliyekuwa mke wa Kinonga)  (2) Mwatumu',
  note:'Alizaliwa 1911, alifariki 1993. Alioa wake wawili. Watoto 12.'});
const gKinonga = p('Kinonga / Athumani',9,'Tawi la Mpombeyagonja',gMpombeya,{
  note:'Alifanya kazi Arusha. Alifariki Kisangiro (he Mramba) kwa ugonjwa wa malaria akiwa njiani kurudi Usangi kutoka Arusha  -  alizikwa Kisangiro kwani hapakuwa na usafiri. Alioa wake wawili: (1) Mwanaidi/Shange (baadaye aliolewa na Mashanga), (2) Mwanaidi/Namkeshe (baadaye aliolewa na Mwejuma).',
  spouse:'(1) Mwanaidi/Shange  (2) Mwanaidi/Namkeshe'});
p('Bi Zaina / Majwii',9,'Tawi la Mpombeyagonja',gMpombeya,{
  female:true,note:'Aliolewa na Khalifani Kiure Mziray wa Kirongaya (Kijelwa).'});

// Gen 10 (Doc Gen 7): Watoto wa Mashanga/Masudi
const gAlliM = p('Alli Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{
  born:'1905',died:'1977',
  spouse:'(1) Mwajuma/Nahuja  (2) Halima/Nyagahwa'});
const gJumaM = p('Juma Masudi',10,'Tawi la Mpombeyagonja',gMashanga);
const gHoseni = p('Hoseni / Kichikiro Masudi',10,'Tawi la Mpombeyagonja',gMashanga);
const gHasaniM = p('Hasani Masudi',10,'Tawi la Mpombeyagonja',gMashanga);
const gMohamed = p('Mohamedi Masudi',10,'Tawi la Mpombeyagonja',gMashanga);
const gRamadM = p('Ramadhani / Kutua Masudi',10,'Tawi la Mpombeyagonja',gMashanga);
p('Amiri Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{note:'Hana Uzao'});
const gAdamM = p('Adam Masudi',10,'Tawi la Mpombeyagonja',gMashanga);
p('Saidi / Bule Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{note:'Hana Uzao'});
p('Bi Nakutua Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Mwanahawa / Kitukule Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Mayoa Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Kasindigwe Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Nakija Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Safina Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Amina Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Rabia Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});
p('Bi Mwanaima Masudi',10,'Tawi la Mpombeyagonja',gMashanga,{female:true});

// Gen 10: Watoto wa Kinonga/Athumani
const gSwediA = p('Swedi Athumani',10,'Tawi la Mpombeyagonja',gKinonga);
p('Bi Aziza / Kitukule Athumani',10,'Tawi la Mpombeyagonja',gKinonga,{female:true});

// Gen 10 (Doc Gen 7): Watoto wa Mwejuma/Naneka  ★ KEY BRANCH
const gIsumaili = p('Isumaili Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma,{
  died:'4/8/1918',note:'Alifariki 4/8/1918'});
const gIssa = p('Issa Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma);
const gKhalifa8 = p('Halifa / Mkulungu Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma,{
  died:'1983',note:'Alifariki mwaka 1983'});
const gMustafa = p('Mustafa / Kinenekejo Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma);
const gShabaniK = p('Shabani / Kilonzi Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma);
const gChayoa = p('Ishaki / Chayoa / Sekro Mwejuma',10,'★ Mwandishi wa Historia',gMwejuma,{
  note:'Mwana wa Mwejuma/Naneka. Anaishi Mwanga Mji Mpya.',
  location:'Mwanga Mji Mpya'});
const gYakuba = p('Yakuba / Mlavi Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma);
p('Bi Sada Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma,{female:true});
p('Bi Rafia / Kandoo Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma,{female:true});
p('Bi Zera Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma,{female:true});
p('Bi Rukia / Navuri Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma,{female:true});
p('Bi Mwanahawa Mwejuma',10,'Tawi la Mpombeyagonja',gMwejuma,{female:true});

// Gen 11 (Doc Gen 8): Watoto wa Alli Masudi
const gIddiA = p('Iddi Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM);
p('Bi Majabu Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Ezena Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Mwanamkuu Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Sabitina Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Aminika / Nangera Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Latifa / Latoa Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Zuhura / Nakio Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Mwanasha / Namshitu Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Tabu Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});
p('Bi Sofia / Namshitu Alli Masudi',11,'Tawi la Mpombeyagonja',gAlliM,{female:true});

// Gen 11: Watoto wa Juma Masudi
const gAbtwalbe = p('Abtwalbe Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM);
const gAthJuma = p('Athumani / Kinonga Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM);
p('Nuhu Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM);
const gIdrisaJ = p('Idrisa Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM);
const gAbdalaJ = p('Abdala / Deghere Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM);
p('Daudi Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM);
p('Bi Mwanaidi Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM,{female:true});
p('Bi Zahara Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM,{female:true});
p('Bi Mwajuma Juma Masudi',11,'Tawi la Mpombeyagonja',gJumaM,{female:true});

// Gen 11: Watoto wa Hoseni/Kichikiro Masudi
const gYunusiH = p('Yunusi / Mwejuma Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
p('Zahiri Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
const gHudiH = p('Hudi Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
const gAthH = p('Athumani / Kinonga Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
p('Mwejuma Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
p('Amiri Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
const gRashidiH = p('Rashidi Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
const gBashiriH = p('Bashiri / Kitembe Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
p('Antoni Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
const gHakimuH = p('Hakimu Hoseni',11,'Tawi la Mpombeyagonja',gHoseni);
p('Bi Mwatumu Hoseni',11,'Tawi la Mpombeyagonja',gHoseni,{female:true});
p('Bi Namshitu Hoseni',11,'Tawi la Mpombeyagonja',gHoseni,{female:true});
p('Bi Mwaro Hoseni',11,'Tawi la Mpombeyagonja',gHoseni,{female:true});
p('Bi Nuruzeni / Mwajuma Hoseni',11,'Tawi la Mpombeyagonja',gHoseni,{female:true});

// Gen 11: Watoto wa Hasani Masudi
p('Awadhi Hasani',11,'Tawi la Mpombeyagonja',gHasaniM);
p('Kinonga / Athumani Hasani',11,'Tawi la Mpombeyagonja',gHasaniM);
p('Kiondo / Majid Hasani',11,'Tawi la Mpombeyagonja',gHasaniM);
p('Bi Mariamu / Namcheja Hasani',11,'Tawi la Mpombeyagonja',gHasaniM,{female:true});
p('Bi Mtaro Hasani',11,'Tawi la Mpombeyagonja',gHasaniM,{female:true});
p('Bi Farida Hasani',11,'Tawi la Mpombeyagonja',gHasaniM,{female:true});
p('Bi Amina Hasani',11,'Tawi la Mpombeyagonja',gHasaniM,{female:true});
p('Bi Halima Hasani',11,'Tawi la Mpombeyagonja',gHasaniM,{female:true});
p('Bi Batuli Hasani',11,'Tawi la Mpombeyagonja',gHasaniM,{female:true});

// Gen 11: Watoto wa Mohamedi Masudi
p('Azidiheri Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed);
p('Saidi Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed);
p('Masudi / Mashanga Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed);
p('Daudi Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed);
p('Mwejuma Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed);
p('Bi Zuhura / Nakio Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed,{female:true});
p('Bi Mwanaidi / Namkeshe Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed,{female:true});
p('Bi Rehema Mohamedi',11,'Tawi la Mpombeyagonja',gMohamed,{female:true});

// Gen 11: Watoto wa Ramadhani/Kutua Masudi
const gMasudiRam = p('Masudi / Mashanga Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM);
const gRiadiR = p('Riadi / Shabani Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM);
const gAthumaniRam = p('Kinonga / Athumani Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM);
const gMkulunguR = p('Mkulungu Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM);
const gMwejumaR = p('Mwejuma / Naneka Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM);
p('Majaliwa Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM);
p('Bi Namcheja / Mariamu Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM,{female:true});
p('Bi Mwanaidi / Shange Ramadhani',11,'Tawi la Mpombeyagonja',gRamadM,{female:true});

// Gen 11: Watoto wa Adam Masudi
const gMasudiAdam = p('Masudi Adamu',11,'Tawi la Mpombeyagonja',gAdamM);
p('Mwinyifadhi Adamu',11,'Tawi la Mpombeyagonja',gAdamM);
const gHajiAdam = p('Haji Adamu',11,'Tawi la Mpombeyagonja',gAdamM);
p('Selemani Adamu',11,'Tawi la Mpombeyagonja',gAdamM);
const gAthumaniAdam = p('Athumani / Kinonga Adamu',11,'Tawi la Mpombeyagonja',gAdamM);
p('Bi Maisara Adamu',11,'Tawi la Mpombeyagonja',gAdamM,{female:true});
p('Bi Zakia Adamu',11,'Tawi la Mpombeyagonja',gAdamM,{female:true});

// Gen 11: Watoto wa Swedi Athumani (mtoto wa Kinonga)
const gRahimuSw = p('Rahimu / Kinonga Swedi',11,'Tawi la Mpombeyagonja',gSwediA);
const gDaudiSw = p('Daudi Swedi Athumani',11,'Tawi la Mpombeyagonja',gSwediA);
const gHaruniSw = p('Haruni / Mwejuma Swedi',11,'Tawi la Mpombeyagonja',gSwediA);
const gMavuraSw = p('Mavura Swedi Athumani',11,'Tawi la Mpombeyagonja',gSwediA);
const gIssaSw = p('Issa / Mishehe Swedi Athumani',11,'Tawi la Mpombeyagonja',gSwediA);
p('Bi Mwanaidi / Shange Swedi',11,'Tawi la Mpombeyagonja',gSwediA,{female:true});
p('Bi Majabu Swedi Athumani',11,'Tawi la Mpombeyagonja',gSwediA,{female:true});

// Gen 11: Watoto wa Isumaili Mwejuma
const gAthumaniIs = p('Athumani / Kinonga Isumaili',11,'Tawi la Mpombeyagonja',gIsumaili);
const gSaidiIs = p('Saidi Isumaili',11,'Tawi la Mpombeyagonja',gIsumaili);
const gMweIs = p('Mwejuma Isumaili',11,'Tawi la Mpombeyagonja',gIsumaili);
p('Bi Fatuma Isumaili',11,'Tawi la Mpombeyagonja',gIsumaili,{female:true});
p('Bi Dina Isumaili',11,'Tawi la Mpombeyagonja',gIsumaili,{female:true});
p('Bi Mwatumu Isumaili',11,'Tawi la Mpombeyagonja',gIsumaili,{female:true});
p('Bi Zaina / Majhii Isumaili',11,'Tawi la Mpombeyagonja',gIsumaili,{female:true});

// Gen 11: Watoto wa Issa Mwejuma
const gSihirabi = p('Sihirabi / Mwejuma Issa',11,'Tawi la Mpombeyagonja',gIssa);
const gHoseniIs = p('Hoseni Issa',11,'Tawi la Mpombeyagonja',gIssa);
const gAthIs = p('Athumani / Kinonga Issa',11,'Tawi la Mpombeyagonja',gIssa);
const gAbdalaIs = p('Abdala Issa',11,'Tawi la Mpombeyagonja',gIssa);
p('Bi Mwanaidi / Namkeshe Issa',11,'Tawi la Mpombeyagonja',gIssa,{female:true});
p('Bi Zaujati Issa',11,'Tawi la Mpombeyagonja',gIssa,{female:true});
p('Bi Majabu Issa',11,'Tawi la Mpombeyagonja',gIssa,{female:true});
p('Bi Mwanaidi / Shange Issa',11,'Tawi la Mpombeyagonja',gIssa,{female:true});

// Gen 11: Watoto wa Halifa/Mkulungu Mwejuma
p('Bi Aisha Khalifa Mwejuma',11,'Tawi la Mpombeyagonja',gKhalifa8,{female:true});
p('Bi Maimuna Khalifa Mwejuma',11,'Tawi la Mpombeyagonja',gKhalifa8,{female:true});

// Gen 11: Watoto wa Mustafa/Kinenekejo Mwejuma
p('Juma Mustafa',11,'Tawi la Mpombeyagonja',gMustafa);
p('Saidi Mustafa',11,'Tawi la Mpombeyagonja',gMustafa);
p('Bi Sanifa / Mwatumu Mustafa',11,'Tawi la Mpombeyagonja',gMustafa,{female:true});
p('Bi Mwanamani Mustafa',11,'Tawi la Mpombeyagonja',gMustafa,{female:true});

// Gen 11: Watoto wa Shabani/Kilonzi Mwejuma
p('Mwejuma / Naneka Shabani',11,'Tawi la Mpombeyagonja',gShabaniK);
p('Kitururu Shabani',11,'Tawi la Mpombeyagonja',gShabaniK);
p('Bi Mwatumu Shabani',11,'Tawi la Mpombeyagonja',gShabaniK,{female:true});
p('Bi Maudi Shabani',11,'Tawi la Mpombeyagonja',gShabaniK,{female:true});

// Gen 11: ★ Watoto wa Chayoa/Sekro (Author's children)
const gMwinyi = p('Mwejuma / Mwinyi Sekro',11,'★ Tawi la Chayoa',gChayoa,{
  note:'Mtoto wa Chayoa/Sekro. Msaidizi wa familia.'});
p('Rajabu / Liana Sekro',11,'★ Tawi la Chayoa',gChayoa);
p('Masudi / Mashanga Sekro',11,'★ Tawi la Chayoa',gChayoa);
p('Bi Zuhura / Nakio Sekro',11,'★ Tawi la Chayoa',gChayoa,{female:true});
p('Bi Aziza Sekro',11,'★ Tawi la Chayoa',gChayoa,{female:true});

// Gen 11: Watoto wa Yakuba/Mlavi Mwejuma
p('Mwejuma / Naneka Yakuba',11,'Tawi la Mpombeyagonja',gYakuba);
p('Bi Mwatumu Yakuba',11,'Tawi la Mpombeyagonja',gYakuba,{female:true});

// Gen 12 (Doc Gen 9): ★ Watoto wa Mwinyi Sekro
p('Namraro / Hidaya Mwinyi Sekro',12,'★ Tawi la Chayoa',gMwinyi,{female:true});
p('Nima Mwinyi Sekro',12,'★ Tawi la Chayoa',gMwinyi);
p('Jania Mwinyi Sekro',12,'★ Tawi la Chayoa',gMwinyi);

// Gen 12: Watoto wa Saidi Isumaili
p('Isumaili Saidi Isumaili',12,'Tawi la Mpombeyagonja',gSaidiIs);
p('Aliamini Saidi Isumaili',12,'Tawi la Mpombeyagonja',gSaidiIs);
p('Abuu Saidi Isumaili',12,'Tawi la Mpombeyagonja',gSaidiIs);
p('Khalifa Saidi Isumaili',12,'Tawi la Mpombeyagonja',gSaidiIs);
p('Mahamedi Saidi Isumaili',12,'Tawi la Mpombeyagonja',gSaidiIs);
p('Bi Zawadi Saidi Isumaili',12,'Tawi la Mpombeyagonja',gSaidiIs,{female:true});
p('Bi Naroka Saidi Isumaili',12,'Tawi la Mpombeyagonja',gSaidiIs,{female:true});

// Gen 12: Watoto wa Mwejuma Isumaili
p('Sekro / Chayoa Mwejuma Isumaili',12,'Tawi la Mpombeyagonja',gMweIs);

// Gen 12: Watoto wa Sihirabi Issa
p('Junior / Sekro Sihirabi Issa',12,'Tawi la Mpombeyagonja',gSihirabi);

// Gen 12: Watoto wa Hoseni Issa
p('Isa Hoseni Issa',12,'Tawi la Mpombeyagonja',gHoseniIs);
p('Abasi Hoseni Issa',12,'Tawi la Mpombeyagonja',gHoseniIs);
p('Hamdani / Chayoa Hoseni Issa',12,'Tawi la Mpombeyagonja',gHoseniIs);

// Gen 12: Watoto wa Athumani/Kinonga Issa
p('Saidi / Bule Athumani Issa',12,'Tawi la Mpombeyagonja',gAthIs);
p('Bi Zawadi / Nakimo Athumani Issa',12,'Tawi la Mpombeyagonja',gAthIs,{female:true});
p('Bi Sofia / Mwanasha Athumani Issa',12,'Tawi la Mpombeyagonja',gAthIs,{female:true});

// Gen 12: Watoto wa Abdala Issa
p('Chayoa / Sekro Abdala Issa',12,'Tawi la Mpombeyagonja',gAbdalaIs);
p('Bi Neema / Sofia Abdala Issa',12,'Tawi la Mpombeyagonja',gAbdalaIs,{female:true});

// Gen 12: Watoto wa Iddi Alli Masudi
p('Alli Iddi Alli Masudi',12,'Tawi la Mpombeyagonja',gIddiA);
p('Hasani Iddi Alli Masudi',12,'Tawi la Mpombeyagonja',gIddiA);
p('Juma Iddi Alli Masudi',12,'Tawi la Mpombeyagonja',gIddiA);
p('Juma Mdogo Iddi Alli Masudi',12,'Tawi la Mpombeyagonja',gIddiA);
p('Bi Mwajuma / Nahuja Iddi Alli',12,'Tawi la Mpombeyagonja',gIddiA,{female:true});
p('Bi Mwanaidi Iddi Alli',12,'Tawi la Mpombeyagonja',gIddiA,{female:true});

// Gen 12: Watoto wa Abtwalbe Juma Masudi
p('Ali / Mbure Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe);
p('Abuu Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe);
p('Chedi Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe);
p('Bisa Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe);
p('Hasani Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe);
p('Bi Amina Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe,{female:true});
p('Bi Nuni Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe,{female:true});
p('Bi Mariamu Abtwalbe Juma',12,'Tawi la Mpombeyagonja',gAbtwalbe,{female:true});

// Gen 12: Watoto wa Athumani/Kinonga Juma Masudi
p('Heri Athumani Juma',12,'Tawi la Mpombeyagonja',gAthJuma);
p('Liliani Athumani Juma',12,'Tawi la Mpombeyagonja',gAthJuma);
p('Imrani / Halifa Athumani Juma',12,'Tawi la Mpombeyagonja',gAthJuma);

// Gen 12: Watoto wa Idrisa Juma
p('Mahamedi Idrisa Juma',12,'Tawi la Mpombeyagonja',gIdrisaJ);

// Gen 12: Watoto wa Abdala/Deghere Juma
p('Juma Abdala Juma',12,'Tawi la Mpombeyagonja',gAbdalaJ);

// Gen 12: Watoto wa Yunusi Hoseni
p('Ali / Mbure Yunusi Hoseni',12,'Tawi la Mpombeyagonja',gYunusiH);
p('Bi Halima / Nyagahwa Yunusi Hoseni',12,'Tawi la Mpombeyagonja',gYunusiH,{female:true});
p('Bi Mariamu Yunusi Hoseni',12,'Tawi la Mpombeyagonja',gYunusiH,{female:true});

// Gen 12: Watoto wa Hudi Hoseni
p('Hoseni Hudi',12,'Tawi la Mpombeyagonja',gHudiH);
p('Hasani Hudi',12,'Tawi la Mpombeyagonja',gHudiH);
p('Bi Mwanamisi / Namdu Hudi',12,'Tawi la Mpombeyagonja',gHudiH,{female:true});

// Gen 12: Watoto wa Athumani/Kinonga Hoseni
p('Ali / Mbure Athumani Hoseni',12,'Tawi la Mpombeyagonja',gAthH);

// Gen 12: Watoto wa Bashiri/Kitembe Hoseni
p('Khalifa Bashiri Hoseni',12,'Tawi la Mpombeyagonja',gBashiriH);
p('Hoseni / Mapalala Bashiri Hoseni',12,'Tawi la Mpombeyagonja',gBashiriH);
p('Bi Zubeda Bashiri Hoseni',12,'Tawi la Mpombeyagonja',gBashiriH,{female:true});
p('Bi Zawadi Bashiri Hoseni',12,'Tawi la Mpombeyagonja',gBashiriH,{female:true});

// Gen 12: Watoto wa Hakimu Hoseni
p('Msafiri Hakimu Hoseni',12,'Tawi la Mpombeyagonja',gHakimuH);

// ─────────────────────────────────────────
// TAWI LA KINENEKEJO
// (Watoto wa Kitagha, kaka wa Mpombeyagonja)
// ─────────────────────────────────────────
// Gen 9 (Doc Gen 6): Watoto wa Kinenekejo Kitagha
const gAbdalaK = p('Abdalah Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo);
const gHajiK = p('Haji Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo);
p('Nasoro Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo);
const gRashidiK = p('Rashidi Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo);
const gJumaK = p('Juma Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo);
p('Kutua Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo);
p('Simbano Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo);
p('Bi Mikali Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo,{female:true});
p('Bi Mizighi Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo,{female:true});
p('Bi Mariamu Kinenekejo',9,'Tawi la Kinenekejo',gKinenekejo,{female:true});

// Gen 10: Watoto wa Abdalah Kinenekejo
p('Haji Abdalah Kinenekejo',10,'Tawi la Kinenekejo',gAbdalaK);
p('Timotheo Abdalah Kinenekejo',10,'Tawi la Kinenekejo',gAbdalaK);
p('Geofrey Abdalah Kinenekejo',10,'Tawi la Kinenekejo',gAbdalaK);
p('David Abdalah Kinenekejo',10,'Tawi la Kinenekejo',gAbdalaK);

// Gen 10: Watoto wa Rashidi Kinenekejo
const gRamadR = p('Ramadhani Rashidi Kinenekejo',10,'Tawi la Kinenekejo',gRashidiK);
p('Selemani Rashidi Kinenekejo',10,'Tawi la Kinenekejo',gRashidiK);
p('Habibu Rashidi Kinenekejo',10,'Tawi la Kinenekejo',gRashidiK);
p('Hamadi Rashidi Kinenekejo',10,'Tawi la Kinenekejo',gRashidiK);
p('Kinenekejo Rashidi',10,'Tawi la Kinenekejo',gRashidiK);
p('Bi Hawa Rashidi',10,'Tawi la Kinenekejo',gRashidiK,{female:true});
p('Bi Zeituni Rashidi',10,'Tawi la Kinenekejo',gRashidiK,{female:true});
p('Bi Wida Rashidi',10,'Tawi la Kinenekejo',gRashidiK,{female:true});
p('Bi Chausiku Rashidi',10,'Tawi la Kinenekejo',gRashidiK,{female:true});

// Gen 10: Watoto wa Juma Kinenekejo
const gSudiJ = p('Sudi Juma Kinenekejo',10,'Tawi la Kinenekejo',gJumaK);
const gSwediJ = p('Swedi Juma Kinenekejo',10,'Tawi la Kinenekejo',gJumaK);
const gRajabuJ = p('Rajabu Juma Kinenekejo',10,'Tawi la Kinenekejo',gJumaK);
p('Bi Mwanamkuu Juma Kinenekejo',10,'Tawi la Kinenekejo',gJumaK,{female:true});
p('Bi Zubeda Juma Kinenekejo',10,'Tawi la Kinenekejo',gJumaK,{female:true});

// Gen 11: Watoto wa Sudi Juma
p('Karimu / Maliare Sudi Juma',11,'Tawi la Kinenekejo',gSudiJ);
p('Abdalah / Deghere Sudi Juma',11,'Tawi la Kinenekejo',gSudiJ);
p('Bi Neema / Tekiaendwa Sudi Juma',11,'Tawi la Kinenekejo',gSudiJ,{female:true});
p('Bi Zaina Sudi Juma',11,'Tawi la Kinenekejo',gSudiJ,{female:true});
p('Bi Aisha Sudi Juma',11,'Tawi la Kinenekejo',gSudiJ,{female:true});
p('Bi Mwatumu Sudi Juma',11,'Tawi la Kinenekejo',gSudiJ,{female:true});

// Gen 11: Watoto wa Swedi Juma
p('Bashiri Swedi Juma',11,'Tawi la Kinenekejo',gSwediJ);
p('Wela Swedi Juma',11,'Tawi la Kinenekejo',gSwediJ);
p('Rashidi Swedi Juma',11,'Tawi la Kinenekejo',gSwediJ);
p('Amiri Swedi Juma',11,'Tawi la Kinenekejo',gSwediJ);
p('Juma Swedi Juma',11,'Tawi la Kinenekejo',gSwediJ);
p('Bi Tekiendwa Swedi Juma',11,'Tawi la Kinenekejo',gSwediJ,{female:true});

// Gen 11: Watoto wa Rajabu Juma
const gJumaRaj = p('Juma Rajabu Juma',11,'Tawi la Kinenekejo',gRajabuJ);
const gHaruniRaj = p('Haruni Rajabu Juma',11,'Tawi la Kinenekejo',gRajabuJ);
p('Hakimu Rajabu Juma',11,'Tawi la Kinenekejo',gRajabuJ);
p('Simbano Rajabu Juma',11,'Tawi la Kinenekejo',gRajabuJ);
p('Bi Aina Rajabu Juma',11,'Tawi la Kinenekejo',gRajabuJ,{female:true});
p('Bi Zera Rajabu Juma',11,'Tawi la Kinenekejo',gRajabuJ,{female:true});
p('Bi Mwanasha Rajabu Juma',11,'Tawi la Kinenekejo',gRajabuJ,{female:true});

// Gen 11: Watoto wa Ramadhani Rashidi
p('Rashidi Ramadhani Rashidi',11,'Tawi la Kinenekejo',gRamadR);
p('Fadhili Ramadhani Rashidi',11,'Tawi la Kinenekejo',gRamadR);
p('Yunusi Ramadhani Rashidi',11,'Tawi la Kinenekejo',gRamadR);
p('Abdu Ramadhani Rashidi',11,'Tawi la Kinenekejo',gRamadR);
p('Kasimu / Kinyurura Ramadhani',11,'Tawi la Kinenekejo',gRamadR);
p('Bi Rafia Ramadhani Rashidi',11,'Tawi la Kinenekejo',gRamadR,{female:true});
p('Bi Khadija Ramadhani Rashidi',11,'Tawi la Kinenekejo',gRamadR,{female:true});

// Gen 12: Watoto wa Juma Rajabu
p('Rajabu Juma Rajabu',12,'Tawi la Kinenekejo',gJumaRaj);
// Gen 12: Watoto wa Haruni Rajabu
p('Sudi Haruni Rajabu',12,'Tawi la Kinenekejo',gHaruniRaj);

// ─────────────────────────────────────────
// TAWI LA KAGULU (Kinyunyu's 2nd child)
// ─────────────────────────────────────────
// Gen 8: Watoto wa Kagulu Kinyunyu
const gMlaviKag = p('Mlavi Kagulu',8,'Tawi la Kagulu',gKagulu);
p('Angida Kagulu',8,'Tawi la Kagulu',gKagulu);

// Gen 9: Watoto wa Mlavi Kagulu
const gTitoM = p('Tito Mlavi',9,'Tawi la Kagulu',gMlaviKag);
const gShabaniML = p('Shabani Mlavi',9,'Tawi la Kagulu',gMlaviKag);
p('Salehe Mlavi',9,'Tawi la Kagulu',gMlaviKag);

// Gen 10: Watoto wa Tito Mlavi
const gTufike = p('Tufike Tito Mlavi',10,'Tawi la Kagulu',gTitoM);
const gPeterT = p('Peter Tito Mlavi',10,'Tawi la Kagulu',gTitoM);
p('Hosenieli Tito Mlavi',10,'Tawi la Kagulu',gTitoM);
p('Anikija Tito Mlavi',10,'Tawi la Kagulu',gTitoM);
p('Bi Nasikiwa Tito Mlavi',10,'Tawi la Kagulu',gTitoM,{female:true});
p('Bi Maria Tito Mlavi',10,'Tawi la Kagulu',gTitoM,{female:true});

// Gen 10: Watoto wa Shabani Mlavi
const gJumaSh = p('Juma Shabani Mlavi',10,'Tawi la Kagulu',gShabaniML);
p('Bi Mwezine Shabani Mlavi',10,'Tawi la Kagulu',gShabaniML,{female:true});
p('Bi Mwanamisi Shabani Mlavi',10,'Tawi la Kagulu',gShabaniML,{female:true});
p('Bi Kodawa Shabani Mlavi',10,'Tawi la Kagulu',gShabaniML,{female:true});

// Gen 11: Watoto wa Juma Shabani
p('Shabani Juma Shabani',11,'Tawi la Kagulu',gJumaSh);
p('Mnandi Juma Shabani',11,'Tawi la Kagulu',gJumaSh);
p('Tito Juma Shabani',11,'Tawi la Kagulu',gJumaSh);
p('Bi Zena Juma Shabani',11,'Tawi la Kagulu',gJumaSh,{female:true});
p('Bi Mariamu Juma Shabani',11,'Tawi la Kagulu',gJumaSh,{female:true});
p('Bi Jasmini / Nendiwe Juma Shabani',11,'Tawi la Kagulu',gJumaSh,{female:true});
p('Bi Dina Juma Shabani',11,'Tawi la Kagulu',gJumaSh,{female:true});
p('Bi Fatuma Juma Shabani',11,'Tawi la Kagulu',gJumaSh,{female:true});

// Gen 11: Watoto wa Tufike Tito
p('Tito Tufike',11,'Tawi la Kagulu',gTufike);
p('Jesca Tufike',11,'Tawi la Kagulu',gTufike,{female:true});
p('Zaina Tufike',11,'Tawi la Kagulu',gTufike,{female:true});

// Gen 11: Watoto wa Peter Tito
p('Tito Peter Tito',11,'Tawi la Kagulu',gPeterT);
p('Bi Nendiwe Peter Tito',11,'Tawi la Kagulu',gPeterT,{female:true});
p('Bi Eliza Peter Tito',11,'Tawi la Kagulu',gPeterT,{female:true});

// ─────────────────────────────────────────
// TAWI LA KILANGO (Kinyunyu's 3rd child)
// ─────────────────────────────────────────
// Gen 8: Watoto wa Kilango Kinyunyu
const gVarinoi = p('Varinoi Kilango',8,'Tawi la Kilango',gKilango);
const gMlauK = p('Mlau Kilango',8,'Tawi la Kilango',gKilango);
const gNgwaruK = p('Ngwaru Kilango',8,'Tawi la Kilango',gKilango);
p('Shai Kilango',8,'Tawi la Kilango',gKilango);

// Gen 9: Watoto wa Varinoi
const gJumaVar = p('Juma Varinoi Kilango',9,'Tawi la Kilango',gVarinoi);
p('Magwala Varinoi Kilango',9,'Tawi la Kilango',gVarinoi);
p('Miraji Varinoi Kilango',9,'Tawi la Kilango',gVarinoi);
p('Bi Niindae Varinoi Kilango',9,'Tawi la Kilango',gVarinoi,{female:true});

// Gen 9: Watoto wa Mlau Kilango
p('David Mlau Kilango',9,'Tawi la Kilango',gMlauK);
p('Juma Mlau Kilango',9,'Tawi la Kilango',gMlauK);
p('Bi Nangondo Mlau Kilango',9,'Tawi la Kilango',gMlauK,{female:true});

// Gen 9: Watoto wa Ngwaru Kilango
const gOmariNg = p('Omari / Thanane Ngwaru Kilango',9,'Tawi la Kilango',gNgwaruK);

// Gen 10: Watoto wa Juma Varinoi
const gJumJum = p('Jumanne Juma Varinoi',10,'Tawi la Kilango',gJumaVar);
const gVarJum = p('Varinoi Juma Varinoi',10,'Tawi la Kilango',gJumaVar);

// Gen 10: Watoto wa Omari Ngwaru
p('Boniface Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Safieli Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Japhate Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Philimoni Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Vicent Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Abeli Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('William Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Gadi Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Methew Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Jackson Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);
p('Stephene Omari Ngwaru',10,'Tawi la Kilango',gOmariNg);

// Gen 11: Watoto wa Jumanne Juma
p('Juma Jumanne Juma',11,'Tawi la Kilango',gJumJum);
p('Bi Maria Jumanne Juma',11,'Tawi la Kilango',gJumJum,{female:true});

// Gen 11: Watoto wa Varinoi Juma
p('Khalidi Varinoi Juma',11,'Tawi la Kilango',gVarJum);
p('Buga Varinoi Juma',11,'Tawi la Kilango',gVarJum);

// ─────────────────────────────────────────
// TAWI LA CHIKIRA KALIGHI (Kalighi's 2nd child)
// ─────────────────────────────────────────
// Gen 7: Watoto wa Chikira Kalighi
const gMrighwa = p('Mrighwa Chikira',7,'Tawi la Chikira',gChikira);
const gMwanyika = p('Mwanyika Chikira',7,'Tawi la Chikira',gChikira);
const gKanyange = p('Kanyange Chikira',7,'Tawi la Chikira',gChikira,{note:'Taarifa zake hazijapatikana'});
const gSayoreC = p('Sayore Chikira',7,'Tawi la Chikira',gChikira,{location:'Kisangara juu'});

// Gen 8: Watoto wa Mrighwa Chikira
const gMajani = p('Majani Mrighwa',8,'Tawi la Chikira',gMrighwa);
p('Wandema Mrighwa',8,'Tawi la Chikira',gMrighwa);
p('Bi Nemango Mrighwa',8,'Tawi la Chikira',gMrighwa,{female:true});

// Gen 8: Watoto wa Mwanyika Chikira
const gKachema = p('Kachema Mwanyika',8,'Tawi la Chikira',gMwanyika);
const gMgayaC = p('Mgaya Mwanyika Chikira',8,'Tawi la Chikira',gMwanyika);

// Gen 8: Watoto wa Sayore Chikira
const gSylvester = p('Sylvester Sayore Chikira',8,'Tawi la Chikira',gSayoreC);

// Gen 9: Watoto wa Majani Mrighwa
const gSamweli = p('Samweli Majani Mrighwa',9,'Tawi la Chikira',gMajani);
const gRafaeliMaj = p('Rafaeli Majani Mrighwa',9,'Tawi la Chikira',gMajani);
p('Patrice Majani Mrighwa',9,'Tawi la Chikira',gMajani);

// Gen 9: Watoto wa Kachema Mwanyika
const gAroniC = p('Aroni Kachema',9,'Tawi la Chikira',gKachema);

// Gen 9: Watoto wa Mgaya Mwanyika
const gRamadMgaya = p('Ramadhani / Makinda Mgaya',9,'Tawi la Chikira',gMgayaC);
p('Thumuni Mgaya',9,'Tawi la Chikira',gMgayaC,{note:'Hana Uzao'});

// Gen 9: Watoto wa Sylvester Sayore
p('Leonard Sylvester Sayore',9,'Tawi la Chikira',gSylvester);
p('Kainkwa Sylvester Sayore',9,'Tawi la Chikira',gSylvester);
p('Bi Filipina Sylvester Sayore',9,'Tawi la Chikira',gSylvester,{female:true});
p('Bi Edgar Sylvester Sayore',9,'Tawi la Chikira',gSylvester,{female:true});

// Gen 10: Watoto wa Samweli Majani
p('Kirumo Samweli Majani',10,'Tawi la Chikira',gSamweli);
p('Greyson Samweli Majani',10,'Tawi la Chikira',gSamweli);
p('Furahini Samweli Majani',10,'Tawi la Chikira',gSamweli);
p('Bi Nasemba Samweli Majani',10,'Tawi la Chikira',gSamweli,{female:true});

// Gen 10: Watoto wa Aroni Kachema
p('Furahini Aroni Kachema',10,'Tawi la Chikira',gAroniC);
p('Sifuni Aroni Kachema',10,'Tawi la Chikira',gAroniC);
p('Bi Phoibe Aroni Kachema',10,'Tawi la Chikira',gAroniC,{female:true});
p('Bi Nazihirwa Aroni Kachema',10,'Tawi la Chikira',gAroniC,{female:true});

// Gen 10: Watoto wa Ramadhani/Makinda Mgaya (15 watoto!)
const gIbrahimuR = p('Ibrahimu Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
const gMussaR = p('Mussa Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
const gSaidiRm = p('Saidi Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
const gIdiRm = p('Idi Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
const gJumaRm = p('Juma Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
const gHoseniRm = p('Hoseni Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
const gMahamduRm = p('Mahamdu Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
p('Iddi Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya);
p('Bi Mwanasha / Nakio Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});
p('Bi Mwanaidi Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});
p('Bi Bitizani Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});
p('Bi Hadija Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});
p('Bi Zuhura Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});
p('Bi Tabu Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});
p('Bi Bahati Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});
p('Bi Tunu Ramadhani Mgaya',10,'Tawi la Chikira',gRamadMgaya,{female:true});

// Gen 11: Watoto wa Ibrahimu Ramadhani Mgaya
p('Ramadhani / Makinda Ibrahimu',11,'Tawi la Chikira',gIbrahimuR);
p('Hasani Ibrahimu',11,'Tawi la Chikira',gIbrahimuR);
p('Aroni Ibrahimu',11,'Tawi la Chikira',gIbrahimuR);
p('Tojo Ibrahimu',11,'Tawi la Chikira',gIbrahimuR);
p('Thadi Ibrahimu',11,'Tawi la Chikira',gIbrahimuR);
p('Samweli Ibrahimu',11,'Tawi la Chikira',gIbrahimuR);
p('Bi Mkunde Ibrahimu',11,'Tawi la Chikira',gIbrahimuR,{female:true});

// Gen 11: Watoto wa Mussa Ramadhani Mgaya
p('Makinda / Ramadhani Musa',11,'Tawi la Chikira',gMussaR);
p('Daudi Musa',11,'Tawi la Chikira',gMussaR);
p('Ridhiwani / Aron Musa',11,'Tawi la Chikira',gMussaR);
p('Rajani / Mwedadi Musa',11,'Tawi la Chikira',gMussaR);
p('Bi Zaliha Musa',11,'Tawi la Chikira',gMussaR,{female:true});
p('Bi Zera Musa',11,'Tawi la Chikira',gMussaR,{female:true});
p('Bi Zainabu Musa',11,'Tawi la Chikira',gMussaR,{female:true});
p('Bi Sanura Musa',11,'Tawi la Chikira',gMussaR,{female:true});
p('Bi Fadhila Musa',11,'Tawi la Chikira',gMussaR,{female:true});

// Gen 11: Watoto wa Saidi Ramadhani Mgaya
p('Makinda Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm);
p('Sadiki Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm);
p('Aroni Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm);
p('Absalum Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm);
p('Bi Siaba Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm,{female:true});
p('Bi Hawa Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm,{female:true});
p('Bi Zainabu / Nankondo Saidi',11,'Tawi la Chikira',gSaidiRm,{female:true});
p('Bi Zera Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm,{female:true});
p('Bi Maisara Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm,{female:true});
p('Bi Sofia Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm,{female:true});
p('Bi Mkunde Saidi Ramadhani',11,'Tawi la Chikira',gSaidiRm,{female:true});

// Gen 11: Watoto wa Idi Ramadhani Mgaya
p('Makinda / Ramadhani Idi',11,'Tawi la Chikira',gIdiRm);
p('Ali Idi Ramadhani',11,'Tawi la Chikira',gIdiRm);
p('Aroni Idi Ramadhani',11,'Tawi la Chikira',gIdiRm);
p('Bi Fatma Idi Ramadhani',11,'Tawi la Chikira',gIdiRm,{female:true});
p('Bi Majabu Idi Ramadhani',11,'Tawi la Chikira',gIdiRm,{female:true});

// Gen 11: Watoto wa Juma Ramadhani Mgaya
p('George / Makinda Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Hamadi Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Rasuli Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Salehe Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Yusufu Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Hudi Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Wahabi Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Ali Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Aroni Juma Ramadhani',11,'Tawi la Chikira',gJumaRm);
p('Bi Hidaya Juma Ramadhani',11,'Tawi la Chikira',gJumaRm,{female:true});
p('Bi Latifa Juma Ramadhani',11,'Tawi la Chikira',gJumaRm,{female:true});
p('Bi Shufaa Juma Ramadhani',11,'Tawi la Chikira',gJumaRm,{female:true});

// Gen 11: Watoto wa Mahamdu Ramadhani Mgaya
p('Shwaibu Mahamdu Ramadhani',11,'Tawi la Chikira',gMahamduRm);
p('Shabani Mahamdu Ramadhani',11,'Tawi la Chikira',gMahamduRm);
p('Bi Sheila Mahamdu Ramadhani',11,'Tawi la Chikira',gMahamduRm,{female:true});
p('Bi Mwajuma Mahamdu Ramadhani',11,'Tawi la Chikira',gMahamduRm,{female:true});
p('Bi Zainabu Mahamdu Ramadhani',11,'Tawi la Chikira',gMahamduRm,{female:true});

// Gen 11: Watoto wa Hoseni Ramadhani Mgaya
p('Makinda Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm);
p('Amiri Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm);
p('Aroni Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm);
p('Juma Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm);
p('Bi Suna Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm,{female:true});
p('Bi Ashura Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm,{female:true});
p('Bi Zainabu Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm,{female:true});
p('Bi Fatuma Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm,{female:true});
p('Bi Latifa Hoseni Ramadhani',11,'Tawi la Chikira',gHoseniRm,{female:true});

// ─────────────────────────────────────────
// TAWI LA TENAMESO (Mbaniko's 2nd child)
// ─────────────────────────────────────────
// Gen 6 (Doc Gen 3): Watoto wa Tenameso Mbaniko
const gKizighaT = p('Kizigha Tenameso',6,'Tawi la Tenameso',gTenameso,{location:'Mkisangara'});
const gMshewaT = p('Mshewa / Tatiro Tenameso',6,'Tawi la Tenameso',gTenameso);

// Gen 7 (Doc Gen 4): Watoto wa Kizigha Tenameso
const gIguguK = p('Igugu Kizigha',7,'Tawi la Tenameso',gKizighaT);
const gMpanjiK = p('Mpanji Kizigha',7,'Tawi la Tenameso',gKizighaT);
const gIgombeK = p('Igombelanyuma Kizigha',7,'Tawi la Tenameso',gKizighaT);
p('Bi Mwajuma Igombelanyuma',8,'Tawi la Tenameso',gIgombeK,{female:true});

// Gen 7: Watoto wa Mshewa/Tatiro Tenameso
const gKadoriM = p('Kadori Mshewa',7,'Tawi la Tenameso',gMshewaT);
const gKivwasiM = p('Kivwasi / Kalua Mshewa',7,'Tawi la Tenameso',gMshewaT);
p('Bi Namsi Mshewa',7,'Tawi la Tenameso',gMshewaT,{female:true});

// Gen 8 (Doc Gen 5): Watoto wa Kadori Mshewa
const gKanyempwe = p('Kanyempwe Kadori',8,'Tawi la Tenameso',gKadoriM);
const gKaboraK = p('Kabora Kadori',8,'Tawi la Tenameso',gKadoriM);
p('Bi Mvuni Kadori',8,'Tawi la Tenameso',gKadoriM,{female:true,
  note:'Aliolewa na Ghuhia Chachika. Mama yake Mfumwa Liana Ghuhia.'});

// Gen 8: Watoto wa Kivwasi Mshewa
const gKisengeK = p('Kisenge Kivwasi',8,'Tawi la Tenameso',gKivwasiM);
p('Bi Namsi Kivwasi',8,'Tawi la Tenameso',gKivwasiM,{female:true});

// Gen 9 (Doc Gen 6): Watoto wa Kanyempwe Kadori
const gKachenjeKan = p('Kachenje Kanyempwe',9,'Tawi la Tenameso',gKanyempwe,{
  note:'Mzee Aliamani Kachenje ni mtoto wake. Baba wa historia ya Wambaga.'});
const gTekinaKan = p('Tekina / Lungo Kanyempwe',9,'Tawi la Tenameso',gKanyempwe);
p('Kimomwe Kanyempwe',9,'Tawi la Tenameso',gKanyempwe);
p('Kihara Kanyempwe',9,'Tawi la Tenameso',gKanyempwe);
p('Bi Kodawa / Amina Kanyempwe',9,'Tawi la Tenameso',gKanyempwe,{female:true,
  note:'Aliolewa na Mfumwa Liana  -  mama yake Liana Ghuhia.'});
p('Bi Tekinacha / Nakiete Kanyempwe',9,'Tawi la Tenameso',gKanyempwe,{female:true,
  note:'Aliolewa na Sekondo Sareva Mndeme.'});
p('Bi Kapwile Kanyempwe',9,'Tawi la Tenameso',gKanyempwe,{female:true});
p('Bi Nakitia Kanyempwe',9,'Tawi la Tenameso',gKanyempwe,{female:true});
p('Bi Kitente / Nakiete Kanyempwe',9,'Tawi la Tenameso',gKanyempwe,{female:true,
  note:'Aliolewa na Kisenge Ghuhia.'});

// Gen 9: Watoto wa Kabora Kadori
const gMgayaKab = p('Mgaya / Kadori Kabora',9,'Tawi la Tenameso',gKaboraK);
p('Matighi Kabora',9,'Tawi la Tenameso',gKaboraK);
p('Bi Ikoko / Nakiete Kabora',9,'Tawi la Tenameso',gKaboraK,{female:true});
p('Bi Meizina Kabora',9,'Tawi la Tenameso',gKaboraK,{female:true});
p('Bi Kimwede / Mwanasha Kabora',9,'Tawi la Tenameso',gKaboraK,{female:true});
p('Bi Nakiete Kabora',9,'Tawi la Tenameso',gKaboraK,{female:true});

// Gen 9: Watoto wa Kisenge Kivwasi
const gEliaK = p('Elia / Nguluma Kisenge',9,'Tawi la Tenameso',gKisengeK);
p('Kilango Kisenge Kivwasi',9,'Tawi la Tenameso',gKisengeK);

// Gen 10 (Doc Gen 7): Watoto wa Kachenje Kanyempwe
const gAliamani = p('Eliamani / Aliamani Kachenje',10,'Tawi la Tenameso',gKachenjeKan,{
  note:'Mzee Aliamani Kachenje  -  Mlezi mkubwa wa Historia ya Wambaga. Alihifadhi historia ya vizazi vya kila ukoo wa Wambaga kichwani hadi kizazi cha saba. Mwandishi Chayoa/Sekro alikutana naye ~1982 akaandika historia ile. Anaishi Usangi Ngujini.',
  location:'Usangi Ngujini'});
const gNgusaruK = p('Ngusaru Kachenje',10,'Tawi la Tenameso',gKachenjeKan);
p('Kija / Kabora Kachenje',10,'Tawi la Tenameso',gKachenjeKan);
p('Bi Nangera / Nangonji Kachenje',10,'Tawi la Tenameso',gKachenjeKan,{female:true});
p('Bi Mwaro / Nakiete Kachenje',10,'Tawi la Tenameso',gKachenjeKan,{female:true});
p('Bi Cheandikwe Kachenje',10,'Tawi la Tenameso',gKachenjeKan,{female:true});
p('Bi Amina / Nakitia Kachenje',10,'Tawi la Tenameso',gKachenjeKan,{female:true});

// Gen 10: Watoto wa Tekina/Lungo Kanyempwe
const gRichardT = p('Richard Tekina',10,'Tawi la Tenameso',gTekinaKan);
p('Juma / Liana Tekina',10,'Tawi la Tenameso',gTekinaKan);
p('Japhet Tekina',10,'Tawi la Tenameso',gTekinaKan);
p('Bi Nantumbi / Mwajuma Tekina',10,'Tawi la Tenameso',gTekinaKan,{female:true});

// Gen 10: Watoto wa Mgaya Kabora
const gMrindokoMg = p('Mrindoko Mgaya Kabora',10,'Tawi la Tenameso',gMgayaKab);
const gDaudiMg = p('Daudi Mgaya Kabora',10,'Tawi la Tenameso',gMgayaKab);
p('Mbasha Mgaya Kabora',10,'Tawi la Tenameso',gMgayaKab);
p('Kutua / Baridi / Lungere Mgaya',10,'Tawi la Tenameso',gMgayaKab);

// Gen 10: Watoto wa Elia/Nguluma Kisenge
p('Bright / Kisenge Elia',10,'Tawi la Tenameso',gEliaK);
p('Charles Elia Kisenge',10,'Tawi la Tenameso',gEliaK);
p('Bi Kushaghwa / Happy Elia',10,'Tawi la Tenameso',gEliaK,{female:true});
p('Bi Nanzia / Fidelia Elia',10,'Tawi la Tenameso',gEliaK,{female:true});
p('Bi Nighuhia Elia Kisenge',10,'Tawi la Tenameso',gEliaK,{female:true});

// Gen 11 (Doc Gen 8): Watoto wa Eliamani/Aliamani Kachenje
p('Wilhem / Kachenje Eliamani',11,'Tawi la Tenameso',gAliamani);
const gLawrenceE = p('Laurence / Kilango Eliamani',11,'Tawi la Tenameso',gAliamani);
p('Joseph / Kimomwe Eliamani',11,'Tawi la Tenameso',gAliamani);
p('Godson / Chelangwa Eliamani',11,'Tawi la Tenameso',gAliamani);
p('Elia Eliamani',11,'Tawi la Tenameso',gAliamani);
p('Charles Eliamani',11,'Tawi la Tenameso',gAliamani);
p('Bi Dorothy / Naduika Eliamani',11,'Tawi la Tenameso',gAliamani,{female:true});
p('Bi Hedi / Nankumbi Eliamani',11,'Tawi la Tenameso',gAliamani,{female:true});

// Gen 11: Watoto wa Ngusaru Kachenje
const gAndreaN = p('Mwalimu Andrea Ngusaru',11,'Tawi la Tenameso',gNgusaruK);
const gSamsonN = p('Mwalimu Samson / Bakari Ngusaru',11,'Tawi la Tenameso',gNgusaruK);
const gEmmaN = p('Emmanueli / Luhindi Ngusaru',11,'Tawi la Tenameso',gNgusaruK);
p('Bi Eunice Ngusaru',11,'Tawi la Tenameso',gNgusaruK,{female:true});
p('Bi Namraro / Nankumbi Ngusaru',11,'Tawi la Tenameso',gNgusaruK,{female:true});

// Gen 11: Watoto wa Richard Tekina
p('Bi DR Dinna Richard Tekina',11,'Tawi la Tenameso',gRichardT,{female:true});
p('Bi Ruth Richard Tekina',11,'Tawi la Tenameso',gRichardT,{female:true});

// Gen 11: Watoto wa Mrindoko Mgaya
const gHemediMr = p('Hemedi / Kighana Mrindoko',11,'Tawi la Tenameso',gMrindokoMg);
p('Ali / Irema Mrindoko',11,'Tawi la Tenameso',gMrindokoMg);
p('Mahamedi / Mahuna Mrindoko',11,'Tawi la Tenameso',gMrindokoMg);
p('Bi Nabighi / Cheivawe Mrindoko',11,'Tawi la Tenameso',gMrindokoMg,{female:true});
p('Bi Tabu Mrindoko',11,'Tawi la Tenameso',gMrindokoMg,{female:true});

// Gen 11: Watoto wa Daudi Mgaya Kabora
const gFadhiliDM = p('Fadhili Daudi Mgaya',11,'Tawi la Tenameso',gDaudiMg);
p('Kasimu / Mtighi Daudi Mgaya',11,'Tawi la Tenameso',gDaudiMg);
const gProfYunusi = p('Prof Yunusi / Lokinda Daudi Mgaya',11,'Tawi la Tenameso',gDaudiMg);
p('Bi Amina / Nangera Daudi Mgaya',11,'Tawi la Tenameso',gDaudiMg,{female:true});
p('Bi Nuruzeni / Ledaiwe Daudi Mgaya',11,'Tawi la Tenameso',gDaudiMg,{female:true});

// Gen 12 (Doc Gen 9): Watoto wa Laurence Eliamani
p('David / Eliamani Laurence',12,'Tawi la Tenameso',gLawrenceE);
p('Francis / Ngusaru Laurence',12,'Tawi la Tenameso',gLawrenceE);
p('Richard / Enirisha Laurence',12,'Tawi la Tenameso',gLawrenceE);
p('Edward / Ali Laurence',12,'Tawi la Tenameso',gLawrenceE);
p('Bi Gloria Laurence',12,'Tawi la Tenameso',gLawrenceE,{female:true});
p('Bi Shagwe / Helena Laurence',12,'Tawi la Tenameso',gLawrenceE,{female:true});
p('Bi Josephine / Namshitu Laurence',12,'Tawi la Tenameso',gLawrenceE,{female:true});

// Gen 12: Watoto wa Mwalimu Samson Ngusaru
const gAmaniS = p('Amani / Eliamini Samson',12,'Tawi la Tenameso',gSamsonN);
const gBernardS = p('Bernard Samson',12,'Tawi la Tenameso',gSamsonN);
const gAlexS = p('Alex Samson Ngusaru',12,'Tawi la Tenameso',gSamsonN);
const gAlbertS = p('Albert / Elinihaki Samson',12,'Tawi la Tenameso',gSamsonN);
p('Bi Stella Samson',12,'Tawi la Tenameso',gSamsonN,{female:true});
p('Bi Anna / Mwajuma Samson',12,'Tawi la Tenameso',gSamsonN,{female:true});
p('Bi Mary / Namtero Samson',12,'Tawi la Tenameso',gSamsonN,{female:true});

// Gen 12: Watoto wa Mwalimu Andrea Ngusaru
p('Walter / Ngusaru Andrea',12,'Tawi la Tenameso',gAndreaN);
p('David / Kalutu Andrea',12,'Tawi la Tenameso',gAndreaN);
p('Irema / Peter Andrea',12,'Tawi la Tenameso',gAndreaN);
p('Chedieli / Hoseni Andrea',12,'Tawi la Tenameso',gAndreaN);
p('Daudi / Oska Andrea',12,'Tawi la Tenameso',gAndreaN);
p('Erica Andrea Ngusaru',12,'Tawi la Tenameso',gAndreaN);
p('Richard Andrea Ngusaru',12,'Tawi la Tenameso',gAndreaN);
p('Bi Upendo / Varirwe Andrea',12,'Tawi la Tenameso',gAndreaN,{female:true});
p('Bi Lilian / Nakiete Andrea',12,'Tawi la Tenameso',gAndreaN,{female:true});
p('Bi Lightnes / Namtero Andrea',12,'Tawi la Tenameso',gAndreaN,{female:true});
p('Bi Helena Andrea Ngusaru',12,'Tawi la Tenameso',gAndreaN,{female:true});

// Gen 12: Watoto wa Emmanueli Ngusaru
p('Ngusaru Emmanueli',12,'Tawi la Tenameso',gEmmaN);
p('Bi Rose / Namtero Emmanueli',12,'Tawi la Tenameso',gEmmaN,{female:true});

// Gen 12: Watoto wa Hemedi Mrindoko
p('Shabani Hemedi Mrindoko',12,'Tawi la Tenameso',gHemediMr);
p('Diwani / Mkothi Hemedi',12,'Tawi la Tenameso',gHemediMr);
p('Bashiri / Mbasha Hemedi',12,'Tawi la Tenameso',gHemediMr);
p('Jumanne / Maghembe Hemedi',12,'Tawi la Tenameso',gHemediMr);
p('Bi Chausiku Hemedi',12,'Tawi la Tenameso',gHemediMr,{female:true});
p('Bi Azama Hemedi',12,'Tawi la Tenameso',gHemediMr,{female:true});
p('Bi Asilina Hemedi',12,'Tawi la Tenameso',gHemediMr,{female:true});
p('Bi Namtero Hemedi',12,'Tawi la Tenameso',gHemediMr,{female:true});

// Gen 12: Watoto wa Fadhili Daudi Mgaya
const gKasimuFD = p('Kasimu Fadhili Daudi',12,'Tawi la Tenameso',gFadhiliDM);
p('Daudi Fadhili Daudi',12,'Tawi la Tenameso',gFadhiliDM);
p('Amani Fadhili Daudi',12,'Tawi la Tenameso',gFadhiliDM);
p('Ramadhani Fadhili Daudi',12,'Tawi la Tenameso',gFadhiliDM);
p('Bi Hadija Fadhili Daudi',12,'Tawi la Tenameso',gFadhiliDM,{female:true});

// Gen 12: Watoto wa Prof Yunusi Daudi Mgaya
p('Baraka / Daudi Yunusi',12,'Tawi la Tenameso',gProfYunusi);
p('Bi Rehema / Ikube Yunusi',12,'Tawi la Tenameso',gProfYunusi,{female:true});
p('Bi Nasikiwa Yunusi',12,'Tawi la Tenameso',gProfYunusi,{female:true});

// Gen 13: Watoto wa Amani Samson
p('Nichlaus / Amani Samson',13,'Tawi la Tenameso',gAmaniS);
p('Bi Boyce / Bahati Amani Samson',13,'Tawi la Tenameso',gAmaniS,{female:true});
p('Bi Vanessa Amani Samson',13,'Tawi la Tenameso',gAmaniS,{female:true});

// Gen 13: Watoto wa Bernard Samson
p('Samson Bernard Samson',13,'Tawi la Tenameso',gBernardS);
p('Brayan / Dennis Bernard',13,'Tawi la Tenameso',gBernardS);
p('Andrea Bernard Samson',13,'Tawi la Tenameso',gBernardS);

// Gen 13: Watoto wa Alex Samson
p('Samson / Aron Alex Samson',13,'Tawi la Tenameso',gAlexS);
p('Bi Bahati / Rinna Alex Samson',13,'Tawi la Tenameso',gAlexS,{female:true});

// Gen 13: Watoto wa Albert Samson
p('Samson Albert Samson',13,'Tawi la Tenameso',gAlbertS);
p('Ikuji Albert Samson',13,'Tawi la Tenameso',gAlbertS);
p('Herman Albert Samson',13,'Tawi la Tenameso',gAlbertS);

// Gen 13: Watoto wa Kasimu Fadhili
p('Daudi Kasimu Fadhili',13,'Tawi la Tenameso',gKasimuFD);
p('Baridi Kasimu Fadhili',13,'Tawi la Tenameso',gKasimuFD);
p('Bi Hadija Kasimu Fadhili',13,'Tawi la Tenameso',gKasimuFD,{female:true});
p('Bi Hawa Kasimu Fadhili',13,'Tawi la Tenameso',gKasimuFD,{female:true});
p('Bi Jasmine Kasimu Fadhili',13,'Tawi la Tenameso',gKasimuFD,{female:true});

// ─────────────────────────────────────────
// TAWI LA SENGASU
// ─────────────────────────────────────────
// Gen 5 (Doc Gen 2): Watoto wa Sengasu Shambiro
const gRindi = p('Rindi Sengasu',5,'Tawi la Sengasu',gSengasu,{
  note:'Mtoto wa Sengasu. Alikaa Milima ya Nguu karibu na Handeni. Baba wa Shebughe Mkilindi - mzazi wa nasaba ya watawala wa Ufalme wa Shambaa (Kilindi dynasty). Historia ya Wambaga inadai Mbegha Vuga - mwanzilishi wa Ufalme wa Shambaa - ni mzao wake.',
  location:'Milima ya Nguu, Handeni'});
const gKuare = p('Kuare / Nkuare Sengasu',5,'Tawi la Sengasu',gSengasu,{
  note:'Mmbagha wa Madiveni. Watoto wake: Kijomu na Shambiro II.',location:'Mbaga Madiveni'});
const gWalongwa = p('Walongwa Sengasu',5,'Tawi la Sengasu',gSengasu,{
  note:'Mmbagha wa Mramba. Kazi yake: kubariki vyakula (kuhoja kwa Kipare) na utaalam wa kuondoa wadudu mashambani (menda). Aliishi karibu na msitu wa Wambaga uitwao Mashankwe.',location:'Mramba'});
p('Bi Nankondo Sengasu',5,'Tawi la Sengasu',gSengasu,{female:true});
p('Bi Namhezi Sengasu',5,'Tawi la Sengasu',gSengasu,{female:true});

// Rindi → Mkilindi dynasty
const gShebughe = p('Shebughe Mkilindi',6,'Tawi la Sengasu/Mkilindi',gRindi,{note:'Mtoto wa Rindi Sengasu. Baba wa Kimweri Mkilindi. Mzazi wa mwanzo wa nasaba ya Kilindi ya Milima ya Usambara.'});
const gKimweri = p('Kimweri Mkilindi',7,'Tawi la Sengasu/Mkilindi',gShebughe,{note:'Mtoto wa Shebughe. Baba wa Mbegha Vuga - Mfalme wa kwanza wa Ufalme wa Shambaa.',location:'Milima ya Usambara'});
const gMbega = p('Simba Mwene / Mbega Vuga',8,'Tawi la Sengasu/Mkilindi',gKimweri,{note:'"Simba Mwene" - Mfalme na Simba wa Milima. Mwanzilishi wa Ufalme wa Shambaa (Kilindi dynasty). Mara kwa mara Wafalme wa Shambaa waliwaomba Wambaga wataalamu wa mvua (rainmakers) kwa ada kubwa.',location:'Vuga, Milima ya Usambara'});
const gSimba = p('Simba Mwene',9,'Tawi la Sengasu/Mkilindi',gMbega);
p('Ghendea Mkilindi',10,'Tawi la Sengasu/Mkilindi',gSimba);
const gNRindi = p('N. Rindi Mkilindi',10,'Tawi la Sengasu/Mkilindi',gSimba);
p('N. Mfongo Mkilindi',10,'Tawi la Sengasu/Mkilindi',gSimba);
p('Kirota Moshi',11,'Tawi la Sengasu/Mkilindi',gNRindi,{note:'1882'});
p('Meli Mandara',11,'Tawi la Sengasu/Mkilindi',gNRindi,{born:'1882'});

// Kuare → Madiva/Nzovu → 5 main branches
const gKijomu = p('Kijomu Kuare',6,'Tawi la Sengasu/Madiveni',gKuare);
const gShambiroII = p('Shambiro II Kuare',6,'Tawi la Sengasu/Madiveni',gKuare);
const gMadiva = p('Madiva / Nzovu Shambiro II',7,'Tawi la Sengasu/Madiveni',gShambiroII,{
  note:'Watoto wake 5: Luvigho, Chasimba, Chalambo, Chachika, Kikwa  -  walikaa Mbaga na Usangi.'});

// Gen 8 (Doc Gen 5): Watoto wa Madiva/Nzovu
const gLuvigho = p('Luvigho Madiva/Nzovu',8,'Tawi la Luvigho/Mbaga',gMadiva,{
  note:'Wambaga wa Mbaga. Watoto wake 10 wakiwemo Ngoka, Mfumwa Mashombo, na wengine.',
  location:'Mbaga'});
const gChasimba = p('Chasimba Madiva/Nzovu',8,'Tawi la Chasimba',gMadiva,{
  note:'Wambaga wa Kiriche (Chali), Kilaweni (Mmbati), Mabweni (Sabuni), Butu (Munga). Alitumwa Usangi kama jemadari wa pili  -  lakini Wagweno hawakuja tena.',
  location:'Kiriche, Kilaweni, Mabweni, Butu'});
const gChalambo = p('Chalambo Madiva/Nzovu',8,'Tawi la Chalambo',gMadiva,{note:'Alihamia Manka, Mbaga hadi Muheza Mwembe. Uzao wake unakaa Mvureni Ibutu.',
  location:'Vudee, Makanya, Usangi'});
const gChachika = p('Chachika Madiva/Nzovu',8,'★ Chifu Chachika',gMadiva,{
  note:'★ JEMADARI WA KWANZA  -  Alipelekwa Usangi na Chifu Nzovu baba yake akiwa na miaka 20 (~1805) kukabiliana na Wagweno waliosaidiwa na Wachaga na Wasangi. Baada ya ushindi mkubwa, Chifu Munga wa Usangi alimzawadia Chachika uchifu  -  akawa chifu wa kwanza wa Usangi kutoka ukoo wa Wambaga.',
  location:'Usangi Kighare, Kilaweni, Shunguri'});
const gKikwa = p('Kikwa Madiva/Nzovu',8,'Tawi la Kikwa',gMadiva,{
  note:'Wambaga wa Kizungo, Vumari Same. Wachache wako Usangi: akina Kireti na Ngereka.',
  location:'Kizungo, Vumari Same'});

// Gen 9 (Doc Gen 6): Watoto wa Luvigho Madiva/Nzovu
p('Ngoka Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Sembike Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Mngendi Luvigho',9,'Tawi la Luvigho',gLuvigho);
const gMashombo = p('Mfumwa Mashombo Luvigho',9,'Tawi la Luvigho',gLuvigho,{
  note:'Mtoto wa Luvigho  -  mzazi wa Mfumwa Joseph Mapande Mashombo (chifu wa mwisho wa Mbaga South Pare).'});
p('Kichumbi Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Nziamwe Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Kubane Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Mbike Luvigho',9,'Tawi la Luvigho',gLuvigho);

// Gen 10: Watoto wa Mfumwa Mashombo
const gMadava = p('Madava Mashombo',10,'Tawi la Luvigho',gMashombo);
// Gen 11: 
const gMapande = p('Mapande Madava',11,'Tawi la Luvigho',gMadava);
// Gen 12:
p('Mfumwa Joseph Mapande Mashombo',12,'Tawi la Luvigho',gMapande,{
  note:'Chifu wa mwisho wa Mbaga South Pare.'});

// Gen 9: Watoto wa Chasimba
const gKengia = p('Kengia Chasimba',9,'Tawi la Chasimba',gChasimba,{
  note:'Chifu wa Wambaga wa Chasimba. Katika enzi ya kibonda (karne ya 19), alihamisha makao yake mashariki mwa Usangi kufuatilia njia za biashara. Alifungua soko la watumwa Usangi. Biashara ya pembe za ndovu na utumwa ilisababisha migogoro ya ndani na kuporomoka kwa miundo ya kimila.',
  location:'Usangi'});
p('Kivonga Chasimba',9,'Tawi la Chasimba',gChasimba);

// Gen 10: Watoto wa Kengia Chasimba (13 watoto!)
const gNaguvu = p('Naguvu Kengia',10,'Tawi la Chasimba',gKengia);
const gKilenga = p('Kilenga Kengia',10,'Tawi la Chasimba',gKengia);
const gMazinaK = p('Mazina Kengia',10,'Tawi la Chasimba',gKengia);
const gKiluviaK = p('Kiluvia Kengia',10,'Tawi la Chasimba',gKengia);
const gMagwero = p('Magwero Kengia',10,'Tawi la Chasimba',gKengia);
const gLuhwaK = p('Luhwa Kengia',10,'Tawi la Chasimba',gKengia);
const gSavuriK = p('Savuri / Saghuri Kengia',10,'Tawi la Chasimba',gKengia);
p('Lusango Kengia',10,'Tawi la Chasimba',gKengia);
p('Kituhu Kengia',10,'Tawi la Chasimba',gKengia);
p('Mlavi Kengia',10,'Tawi la Chasimba',gKengia);
p('Lughendo Kengia',10,'Tawi la Chasimba',gKengia);
p('Semvua Kengia',10,'Tawi la Chasimba',gKengia);
p('Mahuna Kengia',10,'Tawi la Chasimba',gKengia);

// Gen 11: Watoto wa Naguvu Kengia
const gSabuni = p('Sabuni / Salimu Naguvu',11,'Tawi la Chasimba',gNaguvu,{
  note:'Mfumwa  -  Chifu wa Usangi. Alimzaa watoto wengi sana (34+).',location:'Usangi'});
p('Mnangombe Naguvu',11,'Tawi la Chasimba',gNaguvu);

// Gen 12: Watoto wa Mfumwa Sabuni Naguvu (34 watoto)
p('Hemedi Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Simioni Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Muhamadi Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Aballah Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Yusufu Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Mfumwa Wiliamu Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Abeli Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Moses Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Timotheo Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Onesmo Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Edward Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Bernard Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Huseni Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Albert Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Isumaili Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Omari Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Mngwadu Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Lukwaro Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Sudi Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Rajabu Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Minja Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Amini Sabuni',12,'Tawi la Chasimba',gSabuni);
p('Bi Natia Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Phoibe Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Ruth Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Beatrice Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Naghuhiwa Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Christina Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Maria Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Elivida Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Niwaeli Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Turufaina Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Berita Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});
p('Bi Anna Sabuni',12,'Tawi la Chasimba',gSabuni,{female:true});

// Gen 11: Watoto wa Mazina Kengia (kutoka PDF)
p('Ndaghine Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Mtahiko Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Kichanja Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Kiravu Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Kiumba Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Ghuhia Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Mbaruku Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Madava Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Kichawele Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Lukwaro Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Baruti Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Kabora Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Johari Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Masanza Mazina',11,'Tawi la Chasimba',gMazinaK);
p('Savuri Mazina',11,'Tawi la Chasimba',gMazinaK);

// Gen 11: Watoto wa Kilenga Kengia
const gChali = p('Chali Kilenga',11,'Tawi la Chasimba',gKilenga);
p('Yateri Kilenga',11,'Tawi la Chasimba',gKilenga);
const gMmbati = p('Mmbati Kilenga',11,'Tawi la Chasimba',gKilenga);
const gBakariK = p('Bakari Kilenga',11,'Tawi la Chasimba',gKilenga);
p('Semboja Kilenga',11,'Tawi la Chasimba',gKilenga);
p('Mrindoko Kilenga',11,'Tawi la Chasimba',gKilenga);

// Gen 12: Watoto wa Chali Kilenga
const gAbdalaC = p('Abdala Chali',12,'Tawi la Chasimba',gChali);
const gSolomoniC = p('Solomoni Chali',12,'Tawi la Chasimba',gChali);
const gYakoboC = p('Yakobo Chali',12,'Tawi la Chasimba',gChali);
const gAllenC = p('Allen Chali',12,'Tawi la Chasimba',gChali);
p('Ndemasi Chali',12,'Tawi la Chasimba',gChali);
const gMlangaC = p('Mlanga / Mohamedi Chali',12,'Tawi la Chasimba',gChali);
p('Iddi Chali',12,'Tawi la Chasimba',gChali);
p('Juma Chali',12,'Tawi la Chasimba',gChali);
p('Kituhu Chali',12,'Tawi la Chasimba',gChali);
p('Mazina / Ramadhani Chali',12,'Tawi la Chasimba',gChali);
p('Bi Natia Chali',12,'Tawi la Chasimba',gChali,{female:true});
p('Bi Namkeshe Chali',12,'Tawi la Chasimba',gChali,{female:true});

// Gen 12: Watoto wa Mmbati Kilenga
p('Filipo Mmbati',12,'Tawi la Chasimba',gMmbati);
p('Yoeli Mmbati',12,'Tawi la Chasimba',gMmbati);
p('Godwin / Lodi Mmbati',12,'Tawi la Chasimba',gMmbati);

// Gen 12: Watoto wa Bakari Kilenga
p('Daudi Bakari Kilenga',12,'Tawi la Chasimba',gBakariK);
p('Mzee Bakari Kilenga',12,'Tawi la Chasimba',gBakariK);
p('Ibrahim Bakari Kilenga',12,'Tawi la Chasimba',gBakariK);
p('Athumani Bakari Kilenga',12,'Tawi la Chasimba',gBakariK);
p('Shabani Bakari Kilenga',12,'Tawi la Chasimba',gBakariK);
p('Kilenga Bakari Kilenga',12,'Tawi la Chasimba',gBakariK);
p('Mramba Bakari Kilenga',12,'Tawi la Chasimba',gBakariK);
p('Bi Safiyuna Bakari Kilenga',12,'Tawi la Chasimba',gBakariK,{female:true});

// Gen 13: Watoto wa Abdala Chali
p('Petro Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Hoseni Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Issa / Wiston Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Mhamadi Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Rajabu Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Isumaili Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Shabani Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Fadhili Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);
p('Hakimu Abdala Chali',13,'Tawi la Chasimba',gAbdalaC);

// Gen 13: Watoto wa Solomoni Chali
p('Ephraim Solomoni Chali',13,'Tawi la Chasimba',gSolomoniC);
p('Yoabu Solomoni Chali',13,'Tawi la Chasimba',gSolomoniC);
p('Eliudi Solomoni Chali',13,'Tawi la Chasimba',gSolomoniC);
p('Humphrey Solomoni Chali',13,'Tawi la Chasimba',gSolomoniC);
p('Bi Florence Solomoni Chali',13,'Tawi la Chasimba',gSolomoniC,{female:true});
p('Bi Amaria Solomoni Chali',13,'Tawi la Chasimba',gSolomoniC,{female:true});

// Gen 13: Watoto wa Yakobo Chali
p('Rex Yakobo Chali',13,'Tawi la Chasimba',gYakoboC);
p('Hans Yakobo Chali',13,'Tawi la Chasimba',gYakoboC);
p('Emmanueli Yakobo Chali',13,'Tawi la Chasimba',gYakoboC);
p('Joseph Yakobo Chali',13,'Tawi la Chasimba',gYakoboC);
p('Bi Namramba Yakobo Chali',13,'Tawi la Chasimba',gYakoboC,{female:true});
p('Bi Bety Yakobo Chali',13,'Tawi la Chasimba',gYakoboC,{female:true});
p('Bi Stella Yakobo Chali',13,'Tawi la Chasimba',gYakoboC,{female:true});
p('Bi Helena Yakobo Chali',13,'Tawi la Chasimba',gYakoboC,{female:true});
p('Bi Anjela Yakobo Chali',13,'Tawi la Chasimba',gYakoboC,{female:true});

// Gen 13: Watoto wa Allen Chali
p('Bi Agnes Allen Chali',13,'Tawi la Chasimba',gAllenC,{female:true});
p('Bi Glad Allen Chali',13,'Tawi la Chasimba',gAllenC,{female:true});
p('Bi Niwael Allen Chali',13,'Tawi la Chasimba',gAllenC,{female:true});

// Gen 13: Watoto wa Mlanga/Mohamedi Chali
p('Majid Mlanga Chali',13,'Tawi la Chasimba',gMlangaC);
p('Kuswai Mlanga Chali',13,'Tawi la Chasimba',gMlangaC);
p('Salehe Mlanga Chali',13,'Tawi la Chasimba',gMlangaC);
p('Bakari Mlanga Chali',13,'Tawi la Chasimba',gMlangaC);
p('Bi Sarifa Mlanga Chali',13,'Tawi la Chasimba',gMlangaC,{female:true});
p('Bi Aisha Mlanga Chali',13,'Tawi la Chasimba',gMlangaC,{female:true});
p('Bi Hajjat Zaituni / Narokiwa Mlanga',13,'Tawi la Chasimba',gMlangaC,{female:true});

// Gen 9: Watoto wa Chachika Madiva/Nzovu (★ Chifu)
const gGhuhia = p('Ghuhia Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Mtoto mkubwa wa Chachika. Aliongoza tawi la uchifu wa Usangi. Watoto: Liana (Chifu), Yatera, Kichawele, Chelangwa, Ndaghine, Kisenge, Nguruta, Bi Nankumbi (aliolewa na Kachenje Kanyembwe - endogamy ya matawi mawili), Bi Tekuiwa.',location:'Usangi Kighare'});
const gMronga = p('Mronga Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Mtoto wa Chachika. Uzao wake kupitia Mangare na Mpoa.',location:'Mangare, Mkindi'});
const gLunga = p('Lunga Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Mtoto wa Chachika. Uzao wake kupitia Kibakaya. Binti yake Bi Mtundu aliolewa na Kanyempwe.',location:'Kibakaya'});
p('Sekalati Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Mtoto wa Chachika.',location:'Kisaka'});
p('Ibura Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Mtoto wa Chachika. Hatibu Mshanga. Warithi wake wanajulikana kama akina Mshanga.'});
p('Igombe / Lukwaro Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Mtoto wa Chachika. Ukoo wake: Omari - wanaishi Gadi Shunguri.'});
const gMagiriC = p('Magiri Chachika',9,'★ Tawi la Chachika',gChachika,{note:"Mtoto wa Chachika. Watoto: Ng'ombehema, Madenkera, Kiraghinja (alifariki bila watoto)."});
p('Mgayo Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Mtoto wa Chachika. Alifariki bila watoto.'});


// ══════════════════════════════════════════════════════════════════════
// TAWI LA BANGALALA  -  EXTENDED (kutoka Mbaga History PDF)
// ══════════════════════════════════════════════════════════════════════

// Gen 5: Mtira → Ringania
const gRingania = p('Ringania Mtira',6,'Tawi la Bangalala',gMtira,{note:'Mtoto wa Mtira Bangalala.'});
const gMnyaloBang = p('Mnyalo Ringania',7,'Tawi la Bangalala',gRingania);

// Gen 6: Ringania's children
const gSekanyonge = p('Sekanyonge Ringania',7,'Tawi la Bangalala',gRingania,{note:'Watoto wake: Ngomasere, Nziamwe, Kasala, Kimalo, Kipwili, Kimario, Maleko, Kabora.'});

// Gen 7: Sekanyonge's children
const gNziamweB = p('Nziamwe Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);
// (Ngomasere, Kasala, Kimalo, Kipwili, Kimario, Maleko, Kabora - Sekanyonge)
const gNgomasere = p('Ngomasere Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);
const gKasalaS = p('Kasala Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);
const gKimaloS = p('Kimalo Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);
const gKipwiliS = p('Kipwili Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);
const gKimarioS = p('Kimario Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);
const gMalekoS = p('Maleko Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);
const gKaboraS = p('Kabora Sekanyonge',8,'Tawi la Bangalala',gSekanyonge);

// Gen 8: Nziamwe children
const gMaliare = p('Maliare Nziamwe',9,'Tawi la Bangalala',gNziamweB);
p('Bi Naisha Nziamwe',9,'Tawi la Bangalala',gNziamweB,{female:true});
p('Bi Chengele Nziamwe',9,'Tawi la Bangalala',gNziamweB,{female:true});
p('Bi Namraro Nziamwe',9,'Tawi la Bangalala',gNziamweB,{female:true});

// Gen 9: Maliare children (large branch)
const gLichmen = p('Lichmen Maliare',10,'Tawi la Bangalala',gMaliare);
p('Ali Maliare Nziamwe',10,'Tawi la Bangalala',gMaliare);
p('Meraji Maliare',10,'Tawi la Bangalala',gMaliare);
p('Bakari Maliare',10,'Tawi la Bangalala',gMaliare);
p('Abdallah Maliare',10,'Tawi la Bangalala',gMaliare);
p('Nuru Maliare',10,'Tawi la Bangalala',gMaliare);
p('Yusufu Maliare',10,'Tawi la Bangalala',gMaliare);
p('Hamisi Maliare',10,'Tawi la Bangalala',gMaliare);
p('Musa Maliare',10,'Tawi la Bangalala',gMaliare);
p('Babu Maliare',10,'Tawi la Bangalala',gMaliare);

// Gen 10: Lichmen children (massive modern expansion)
const gAtwiL = p('Atwi / Kajia Lichmen Maliare',11,'Tawi la Bangalala',gLichmen);
const gAbdulL = p('Abdul / Maliare Lichmen Maliare',11,'Tawi la Bangalala',gLichmen);
const gJafariL = p('Jafari / Juma Lichmen Maliare',11,'Tawi la Bangalala',gLichmen);
const gYunusiL = p('Yunusi / Iddi Lichmen Maliare',11,'Tawi la Bangalala',gLichmen);
const gHamzaL = p('Hamza / Haji Lichmen Maliare',11,'Tawi la Bangalala',gLichmen);
const gMajidiL = p('Majidi / Isumaili Lichmen Maliare',11,'Tawi la Bangalala',gLichmen);
const gSubiraL = p('Subira / Muhamadi Lichmen Maliare',11,'Tawi la Bangalala',gLichmen);
p('Fred Lichmen',11,'Tawi la Bangalala',gLichmen);
p('Nasibu Lichmen',11,'Tawi la Bangalala',gLichmen);
p('Jacobo Lichmen',11,'Tawi la Bangalala',gLichmen);
p('Stanley Lichmen',11,'Tawi la Bangalala',gLichmen);

// Mnyalo → Varisanga branch
const gVarisangaB = p('Varisanga Mnyalo',8,'Tawi la Bangalala',gMnyaloBang);
const gNjaritaB = p('Njarita Mnyalo',8,'Tawi la Bangalala',gMnyaloBang);

const gKiagho = p('Kiagho Varisanga',9,'Tawi la Bangalala',gVarisangaB);
const gJumaVarisB = p('Juma Varisanga Mnyalo',9,'Tawi la Bangalala',gVarisangaB);
p('Selemani Varisanga',9,'Tawi la Bangalala',gVarisangaB);
p('Bi Ledaiwe Varisanga',9,'Tawi la Bangalala',gVarisangaB,{female:true});
p('Bi Nakija Varisanga',9,'Tawi la Bangalala',gVarisangaB,{female:true});

const gHasaniKiagho = p('Hasani Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho);
const gHamisiKiagho = p('Hamisi Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho);
const gKisakaKiagho = p('Kisaka / Halidi Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho);
const gSenkoroKiagho = p('Senkoro Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{
  note:'Binti yake Bi Ezena aliolewa na Mfumwa Athumani Issa Liana.'});

// ══════════════════════════════════════════════════════════════════════
// TAWI LA CHALAMBO  -  EXTENDED (kutoka Mbaga History PDF)
// ══════════════════════════════════════════════════════════════════════
// Chalambo (Gen 8) → Keramiti → Kijo → Manase

const gKeramiti = p('Keramiti Chalambo',9,'Tawi la Chalambo',gChalambo,{note:'Mtoto wa Chalambo Madiva/Nzovu. Uzao wake ulihamia Muheza Mwembe, Mvureni Ibutu.'});
const gKijo = p('Kijo Keramiti',10,'Tawi la Chalambo',gKeramiti);
const gManase = p('Manase Kijo',11,'Tawi la Chalambo',gKijo,{
  born:'1856',died:'1976',
  note:'Mtu wa ajabu  -  aliishi miaka 120 (1856-1976)! Alilelewa na wamisionari wa Kijerumani wa Shighatini. Baba wa watoto 13+.'});

// Manase children
const gMchungaji = p('Mchungaji Kiravu Manase',12,'Tawi la Chalambo',gManase,{
  note:'Alihusika sana na muundo wa kidini wa Kikristo.'});
p('Willam Manase',12,'Tawi la Chalambo',gManase);
p('Joseph Manase',12,'Tawi la Chalambo',gManase);
p('Simba Manase',12,'Tawi la Chalambo',gManase);
p('Majaliwa Manase',12,'Tawi la Chalambo',gManase);
p('Mntambo Manase',12,'Tawi la Chalambo',gManase);
p('Anderson Manase',12,'Tawi la Chalambo',gManase);
p('Juma Manase',12,'Tawi la Chalambo',gManase);
p('Nicholaus Manase',12,'Tawi la Chalambo',gManase);
p('Andrea Manase',12,'Tawi la Chalambo',gManase);
p('Bi Tamari Manase',12,'Tawi la Chalambo',gManase,{female:true});
p('Bi Masai Manase',12,'Tawi la Chalambo',gManase,{female:true});

// Mchungaji's children
p('Manase Mchungaji',13,'Tawi la Chalambo',gMchungaji);
p('Mchungaji Omari',13,'Tawi la Chalambo',gMchungaji);
p('Jonathan Mchungaji',13,'Tawi la Chalambo',gMchungaji);
p('Bi Elizabeth Mchungaji',13,'Tawi la Chalambo',gMchungaji,{female:true});
p('Bi Grace Mchungaji',13,'Tawi la Chalambo',gMchungaji,{female:true});
p('Bi Natujwa Mchungaji',13,'Tawi la Chalambo',gMchungaji,{female:true});
p('Bi Naretiwahedi Mchungaji',13,'Tawi la Chalambo',gMchungaji,{female:true});
p('Bi Naanjela Mchungaji',13,'Tawi la Chalambo',gMchungaji,{female:true});

// ══════════════════════════════════════════════════════════════════════
// TAWI LA CHACHIKA  -  GHUHIA (★ Chifu wa Usangi)  -  EXTENDED
// ══════════════════════════════════════════════════════════════════════
// Ghuhia Chachika (Gen 9) → Liana (Chifu), Yatera, Kichawele, Chelangwa,
//   Ndaghine, Kisenge, Nguruta, Bi Nankumbi (aliolewa na Kachenje Kanyembwe!), Bi Tekuiwa

const gLiana = p('Mfumwa Liana Ghuhia',10,'★ Tawi la Chachika',gGhuhia,{
  note:'Chifu wa Usangi. Aloa wake wengi. Baba wa Mavura aliyemrithi. Mzazi wa Alhaji Issa Mlao  -  mwandishi wa kitabu cha historia ya Wambaga (2020). Watoto 16+ wa kiume na 16 wa kike.',
  location:'Usangi Kighare'});
const gYateraG = p('Yatera Ghuhia',10,'★ Tawi la Chachika',gGhuhia,{location:'Usangi'});
const gKichaweleG = p('Kichawele Ghuhia',10,'★ Tawi la Chachika',gGhuhia);
const gChelangwa = p('Chelangwa Ghuhia',10,'★ Tawi la Chachika',gGhuhia);
const gNdaghineG = p('Ndaghine Ghuhia',10,'★ Tawi la Chachika',gGhuhia);
const gKisengeG = p('Kisenge Ghuhia',10,'★ Tawi la Chachika',gGhuhia,{note:'Bi Kitente Kanyembwe aliolewa na Kisenge Ghuhia  -  endogamy ya Mbaniko na Sengasu.'});
const gNgurutaG = p('Nguruta Ghuhia',10,'★ Tawi la Chachika',gGhuhia);
p('Bi Nankumbi Ghuhia',10,'★ Tawi la Chachika',gGhuhia,{female:true,note:'Aliolewa na Kachenje Kanyembwe.'});

// ════════════════════════════════════════════════════════
// TAWI LA CHELANGWA GHUHIA — Kizazi 10 hadi 12
// ════════════════════════════════════════════════════════

// Kizazi 11 — Mtoto wa Chelangwa
const gNgulumaC = p('Nguluma / Ghuhia Chelangwa',11,'★ Tawi la Chachika',gChelangwa,{note:'Mtoto pekee wa Chelangwa Ghuhia.'});

// Kizazi 12 — Watoto wa Nguluma
const gShekhe = p('Shekhe Salehe Nguluma',12,'★ Tawi la Chachika',gNgulumaC,{note:'Amehamia Kisangara.',location:'Kisangara'});
const gThomasN = p('Thomas / Kashando Nguluma',12,'★ Tawi la Chachika',gNgulumaC,{born:'1918',died:'5/10/1989'});
const gMuhamadN = p('Muhamad / Chauled Nguluma',12,'★ Tawi la Chachika',gNgulumaC);
const gShabaniN = p('Shabani Nguluma',12,'★ Tawi la Chachika',gNgulumaC);
const gMbarakaN = p('Mbaraka Nguluma',12,'★ Tawi la Chachika',gNgulumaC);

// Kizazi 13 — Watoto wa Shekhe Salehe
const gFadhiliS = p('Fadhili Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe);
const gYasiniS = p('Yasini Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe);
const gMuhidiniS = p('Muhidini Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe);
const gMkaiS = p('Dr Mkai / Awadhi Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe);
p('Bi Mwamini Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe,{female:true});
p('Bi Rafia Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe,{female:true});
p('Bi Fatuma Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe,{female:true});
p('Bi Maimuna Salehe Nguluma',13,'★ Tawi la Chachika',gShekhe,{female:true});

// Kizazi 13 — Watoto wa Thomas/Kashando
const gDanieliT = p('Danieli Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN);
const gAlexanderT = p('Dr Alexander / Karunde Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN);
const gHansT = p('Hans / Kadeghe Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN);
const gErickT = p('Erick Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN);
p('Bi Mwalimu Mary / Nanzia Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN,{female:true});
p('Bi Prof Magreth Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN,{female:true});
p('Bi Beatrice Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN,{female:true});
p('Bi Dr Angela Thomas Nguluma',13,'★ Tawi la Chachika',gThomasN,{female:true});

// Kizazi 13 — Watoto wa Muhamad/Chauled
const gSembulaN = p('Sembula / Yahaya Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN);
const gHasaniN = p('Alhaji Hasani / Tereyoya Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN);
const gFarijaliN = p('Farijali / Kiure Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN);
p('Ramadhani / Kitojo Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN);
const gRajabuN = p('Rajabu / Raja Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN);
p('Bi Amina Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});
p('Bi Jamila Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});
p('Bi Ezena Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});
p('Bi Zera / Kipwerle Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});
p('Bi Hawa / Namghanga Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});
p('Bi Hafiswa Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});
p('Bi Mariamau / Mshunga Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});
p('Bi Arafa Muhamad Nguluma',13,'★ Tawi la Chachika',gMuhamadN,{female:true});

// Kizazi 13 — Watoto wa Shabani
const gAbtwalbeS = p('Abtwalbe Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN);
p('Athumani Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN);
p('Haruni Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN);
p('Bi Amina / Aina Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN,{female:true});
p('Bi Swaiba Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN,{female:true});
p('Bi Nakutua Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN,{female:true});
p('Bi Jasmini Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN,{female:true});
p('Bi Nanguji / Zahara Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN,{female:true});
p('Bi Arafa Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN,{female:true});
p('Bi Halima Shabani Nguluma',13,'★ Tawi la Chachika',gShabaniN,{female:true});

// Kizazi 13 — Watoto wa Mbaraka
p('Mrisali Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN);
p('Hamisi / Ngereka Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN);
p('Yetiro / Abdallah Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN);
p('Baraka Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN);
p('Bi Aminani Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN,{female:true});
p('Bi Aisha Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN,{female:true});
p('Bi Kipwele Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN,{female:true});
p('Bi Mwanaisha Mbaraka Nguluma',13,'★ Tawi la Chachika',gMbarakaN,{female:true});

// ── Kizazi 14 — Watoto wa Shekhe's children ──
// Watoto wa Muhidini Salehe
p('Mussa Muhidini Salehe Nguluma',14,'★ Tawi la Chachika',gMuhidiniS);
p('Bi Hamida Muhidini Salehe Nguluma',14,'★ Tawi la Chachika',gMuhidiniS,{female:true});

// Watoto wa Fadhili Salehe
p('Ndaghine Fadhili Salehe Nguluma',14,'★ Tawi la Chachika',gFadhiliS);
p('Halifa Fadhili Salehe Nguluma',14,'★ Tawi la Chachika',gFadhiliS);
p('Bi Asia Fadhili Salehe Nguluma',14,'★ Tawi la Chachika',gFadhiliS,{female:true});

// Watoto wa Yasini Salehe
p('Salehe Yasini Salehe Nguluma',14,'★ Tawi la Chachika',gYasiniS);
p('Issa Yasini Salehe Nguluma',14,'★ Tawi la Chachika',gYasiniS);
p('Bi Mwajuma Yasini Salehe Nguluma',14,'★ Tawi la Chachika',gYasiniS,{female:true});
p('Bi Hadija Yasini Salehe Nguluma',14,'★ Tawi la Chachika',gYasiniS,{female:true});

// Watoto wa Dr Mkai/Awadhi
p('Bi Halima Awadhi Salehe Nguluma',14,'★ Tawi la Chachika',gMkaiS,{female:true});
p('Bi Rahma Awadhi Salehe Nguluma',14,'★ Tawi la Chachika',gMkaiS,{female:true});

// Watoto wa Dr Alexander/Karunde Thomas
p('Thomas Alex Thomas Nguluma',14,'★ Tawi la Chachika',gAlexanderT);
p('Godwin Alex Thomas Nguluma',14,'★ Tawi la Chachika',gAlexanderT);
p('Bi Paulina Alex Thomas Nguluma',14,'★ Tawi la Chachika',gAlexanderT,{female:true});

// Mtoto wa Danieli Thomas
p('Bi Lukundo Danieli Thomas Nguluma',14,'★ Tawi la Chachika',gDanieliT,{female:true});

// Watoto wa Hans/Kadeghe Thomas
p('Thomas / Mtera Hans Thomas Nguluma',14,'★ Tawi la Chachika',gHansT);
p('Liana Hans Thomas Nguluma',14,'★ Tawi la Chachika',gHansT);
p('Bi Paulina Hans Thomas Nguluma',14,'★ Tawi la Chachika',gHansT,{female:true});

// Mtoto wa Erick Thomas
p('Davis / Thomas Erick Thomas Nguluma',14,'★ Tawi la Chachika',gErickT);

// Watoto wa Sembula/Yahaya
p('Muhamad / Ndaghine Sembula Muhamad Nguluma',14,'★ Tawi la Chachika',gSembulaN);
p('Bi Zuhura Sembula Muhamad Nguluma',14,'★ Tawi la Chachika',gSembulaN,{female:true});

// Watoto wa Alhaji Hassani/Tereyoya
p('Muhamad / Chauled Hassani Muhamad Nguluma',14,'★ Tawi la Chachika',gHasaniN);
p('Rashidi Hassani Muhamad Nguluma',14,'★ Tawi la Chachika',gHasaniN);
p('Bi Hidaya / Makiuth Hassani Muhamad Nguluma',14,'★ Tawi la Chachika',gHasaniN,{female:true});
p('Bi Amina Hassani Muhamad Nguluma',14,'★ Tawi la Chachika',gHasaniN,{female:true});

// Watoto wa Farijali/Kiure
p('Muhamad Farijali Muhamad Nguluma',14,'★ Tawi la Chachika',gFarijaliN);
p('Bi Makiuth / Mwantumu Farijali Muhamad Nguluma',14,'★ Tawi la Chachika',gFarijaliN,{female:true});

// Watoto wa Rajabu/Raja
p('Muhamad Rajabu Muhamad Nguluma',14,'★ Tawi la Chachika',gRajabuN);
p('Bi Zuhura Rajabu Muhamad Nguluma',14,'★ Tawi la Chachika',gRajabuN,{female:true});

// Watoto wa Abtwalbe Shabani
p('Shabani Abtwalbe Shabani Nguluma',14,'★ Tawi la Chachika',gAbtwalbeS);
p('Salehe Abtwalbe Shabani Nguluma',14,'★ Tawi la Chachika',gAbtwalbeS);
p('Bi Hadija Abtwalbe Shabani Nguluma',14,'★ Tawi la Chachika',gAbtwalbeS,{female:true});
p('Bi Swaiba Abtwalbe Shabani Nguluma',14,'★ Tawi la Chachika',gAbtwalbeS,{female:true});
p('Bi Paulina Abtwalbe Shabani Nguluma',14,'★ Tawi la Chachika',gAbtwalbeS,{female:true});
p('Bi Aminata Abtwalbe Shabani Nguluma',14,'★ Tawi la Chachika',gAbtwalbeS,{female:true});
p('Bi Tekuiwa Ghuhia',10,'★ Tawi la Chachika',gGhuhia,{female:true});

// Mfumwa Liana Ghuhia  -  watoto (Gen 11)
const gMavura = p('Mfumwa Mavura Liana',11,'★ Tawi la Chachika',gLiana,{
  note:'Alimrithi baba yake Liana kama Chifu wa Usangi.',location:'Usangi'});
const gMashindeL = p('Mashinde / Kasimu Liana',11,'★ Tawi la Chachika',gLiana);
const gMlaoLiana = p('Issa / Mlao Liana',11,'★ Tawi la Chachika',gLiana,{
  note:'Mzazi wa Alhaji Issa Mlao Yusufu Mavura  -  mwandishi wa kitabu kikuu cha Wambaga 2020. Pia Mfumwa Athumani (mtoto wake) alitawazwa Chifu Mkuu wa Wambaga wote wa Usangi 1985.',
  location:'Usangi'});
const gDaudiL = p('Daudi Liana',11,'★ Tawi la Chachika',gLiana,{note:'Mwana wa Mfumwa Liana Ghuhia. Aliishi Usangi Kighare. Alikuwa na watoto wengi — vizazi vyake viko sehemu nyingi za Usangi na Tanzania.'});

// ── Daudi Liana's children (Gen 12) ──
const gAmiriDL = p('Amiri / Liana Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'9 Sep 1926',died:'11 Jun 2000',spouse:'Sada Rajabu',note:'Nurse/Peasant'});
const gSalimuDL = p('Salimu / Mbonea Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1936',died:'2012',spouse:'Amina Abdala Kindoi'});
const gHalifaDL = p('Halifa / Nguruta Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1944'});
const gHemediDL = p('Hemedi / Liana Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1928',died:'2010',spouse:'Mwanaidi Saidi',note:'Daktari wa Mifugo (Veterinary Doctor)'});
const gFadhiliDL = p('Balozi Fadhili Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1944',spouse:'Elizabeth John Omari',note:'Balozi — alihudumu katika sekta ya diplomasia.'});
const gRashidiDL = p('Rashidi / Rd Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{spouse:'Zaina Shabani'});
const gRajabuDL = p('Rajabu / Liana Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{spouse:'Amina Iddi Mkindi'});
const gNasibuDL = p('Nasibu / Kamando Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{note:'Kamando — alihudumu katika jeshi.'});
const gHaruniDL = p('Haruni Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{spouse:'Habiba Bakari'});
const gRukiaDL = p('Bi Ruikia / Namangi Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1946',died:'2010',spouse:'Mussa Makinda',female:true});
const gMwanahawaDL = p('Bi Mwanahawa / Nadoo Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{spouse:'Saleh Masasi',female:true});
// Bi Asna = Bi Asina — see gAsinaD below
const gBilidaDL = p('Bi Mwalimu Bilihuda Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{female:true,note:'Mwalimu'});
const gAsinaniDL = p('Bi Asinani Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1952',female:true});
const gZaniaDL = p('Bi Zania Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1950',female:true,spouse:'Brig Novatus Matiku'});

// ── Gen 13: Amiri Daudi Liana's children ──
const gDaudiAmiri = p('Daudi Amiri Daudi Liana',13,'★ Tawi la Chachika',gAmiriDL);
p('Amiri Daudi Amiri',14,'★ Tawi la Chachika',gDaudiAmiri);
const gZaharaAmiri = p('Bi Zahara Amiri Daudi Liana',13,'★ Tawi la Chachika',gAmiriDL,{female:true});
const gRajabuAmiri = p('Rajabu Amiri Daudi Liana',13,'★ Tawi la Chachika',gAmiriDL);
// Gen 14: Daudi Amiri children
p('Bi Rehema / Sada Daudi Amiri',14,'★ Tawi la Chachika',gDaudiAmiri,{female:true});
p('Bi Victoria Daudi Amiri',14,'★ Tawi la Chachika',gDaudiAmiri,{female:true});
// Gen 14: Rajabu Amiri children

// ── Gen 13: Salimu Daudi Liana's children ──
const gDaudiSalimu = p('Daudi Salimu Daudi Liana',13,'★ Tawi la Chachika',gSalimuDL,{born:'1962',spouse:'Namshali'});
const gAbdallahSalimu = p('Abdallah / Abdala Salimu Daudi Liana',13,'★ Tawi la Chachika',gSalimuDL,{born:'1970'});
// Gen 14: Daudi Salimu children
// Gen 14: Abdallah Salimu children

// ── Gen 13: Halifa Daudi Liana's children ──
// gDaudiPambe merged into gDaudiKhalifa_K_1_a
// gDaudiHalifa merged into gDaudiKhalifa_K_1_b
// Gen 14: Daudi/Pambe children
// Gen 14: Daudi Halifa children
// Gen 14: Yusufu Halifa children
// Gen 14: Nassir/Mavura Halifa children

// ── Gen 13: Hemedi Daudi Liana's children ──
const gDrIssaHem = p('Dr Issa Hemedi Daudi',13,'★ Tawi la Chachika',gHemediDL,{born:'1959',spouse:'Chiku & Hanifa',note:'Daktari / Benki (Doctor/Banker)'});
// Gen 14: Dr Issa Hemedi children
p('Hemedi Issa Hemedi',14,'★ Tawi la Chachika',gDrIssaHem);
p('Bi Lulu Issa Hemedi',14,'★ Tawi la Chachika',gDrIssaHem,{female:true});
p('Bi Nasra Issa Hemedi',14,'★ Tawi la Chachika',gDrIssaHem,{female:true});
// Gen 14: Prof Saidi Hemedi children
// Gen 14: Daudi Hemedi child
// Gen 14: Mwedadi Hemedi children
// Gen 14: Hussein Hemedi children

// ── Gen 13: Balozi Fadhili Daudi Liana's children ──
const gDaudiFadhili = p('Daudi Fadhili Daudi Liana',13,'★ Tawi la Chachika',gFadhiliDL,{spouse:'Redempta Njau',note:'Mjasiriamali / Software Engineer'});
const gJohnFadhili = p('John Fadhili Daudi Liana',13,'★ Tawi la Chachika',gFadhiliDL,{spouse:'Gilese Ngoga'});
const gAdamFadhili = p('Adam / Mavura Fadhili Daudi Liana',13,'★ Tawi la Chachika',gFadhiliDL,{spouse:'Nancy'});
// Gen 14: Daudi Fadhili children
p('David Daudi Fadhili',14,'★ Tawi la Chachika',gDaudiFadhili);
p('Geularina Daudi Fadhili',14,'★ Tawi la Chachika',gDaudiFadhili,{born:'2015',female:true});

// Gen 14: John Fadhili children
// Gen 14: Adam/Mavura Fadhili children
p('Deron / Fadhili Adam Fadhili',14,'★ Tawi la Chachika',gAdamFadhili);
p('Bi Elsie / Elizabeth Adam Fadhili',14,'★ Tawi la Chachika',gAdamFadhili,{female:true});

// ── Gen 13: Rashidi Daudi Liana's children ──
// ── Watoto wa Rashidi ──
const gMwajabdRash = p('Bi Dr Mwajabu Rashidi Daudi',13,'★ Tawi la Chachika',gRashidiDL,{born:'1970',female:true,spouse:'Robert Nyamwika',note:'Daktari wa Upasuaji (Surgeon Doctor)'});
p('David Robert Katama Nyamwika',14,'★ Tawi la Chachika',gMwajabdRash,{born:'15 Apr 2020'});
p('Elisha Robert Rashidi Nyamwika',14,'★ Tawi la Chachika',gMwajabdRash,{born:'15 Apr 2020'});
p('Ezekiel Robert Chirere Nyamwika',14,'★ Tawi la Chachika',gMwajabdRash,{born:'15 Apr 2020'});
p('Elizabeth Robert Rwayenga Nyamwika',14,'★ Tawi la Chachika',gMwajabdRash,{born:'15 Apr 2020',female:true});
const gDaudiRash = p('Daudi Rashidi Daudi Liana',13,'★ Tawi la Chachika',gRashidiDL,{born:'1972',spouse:'Sada Khalifa',note:'Gemstone Specialist'});
p('Rashidi Daudi Rashidi',14,'★ Tawi la Chachika',gDaudiRash,{born:'1999'});
p('Khalifa Daudi Rashidi',14,'★ Tawi la Chachika',gDaudiRash,{born:'2011'});
const gShabaniRash = p('Shabani Rashidi Daudi Liana',13,'★ Tawi la Chachika',gRashidiDL,{born:'1976',spouse:'Elizabeth Barabara',note:'NSSF / Lawyer'});
p('Zeina Shabani Rashidi',14,'★ Tawi la Chachika',gShabaniRash,{born:'2008',female:true});
p('Grace Shabani Rashidi',14,'★ Tawi la Chachika',gShabaniRash,{born:'2011',female:true});
p('Rashidi Shabani Rashidi',14,'★ Tawi la Chachika',gShabaniRash,{born:'2014'});
p('Mwajabu Shabani Rashidi',14,'★ Tawi la Chachika',gShabaniRash,{born:'2019',female:true});

// ── Gen 13: Rajabu Daudi Liana's children ──
const gDaudiRajabu = p('Daudi Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{spouse:'Tausi'});
const gYusufuRaj = p('Yusufu Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL);
p('Shanil Yusufu',14,'★ Tawi la Chachika',gYusufuRaj,{female:true});
p('Shakir Yusufu',14,'★ Tawi la Chachika',gYusufuRaj);
p('Sharuk Yusufu',14,'★ Tawi la Chachika',gYusufuRaj);
const gTwahiruRaj = p('Twahiru Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{spouse:'Neema'});
const gJuariyaRaj = p('Bi Juariya Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{female:true});
const gAzizaRaj = p('Bi Aziza / Hajjat Aziza Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{female:true,spouse:'Suleiman Tassama'});
const gNasibKamando = p('Nasib Kamando',14,'★ Tawi la Chachika',gAzizaRaj);
p('Maryam Tassama',14,'★ Tawi la Chachika',gAzizaRaj,{female:true});
p('Amina Tassama',14,'★ Tawi la Chachika',gAzizaRaj,{female:true});
const gAllyTassama = p('Ally Tassama',14,'★ Tawi la Chachika',gAzizaRaj);
const gHidayaRaj = p('Bi Hidaya / Namraro Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{female:true,spouse:'Ishaq / Sekro Mwejuma Chayoa',note:'Aliolewe na Ishaq / Sekro Mwejuma Chayoa (Tawi la Mpombeyagonja). Uzao wa matawi mawili makuu — Chachika na Chayoa.'});
// Watoto wa Hidaya Rajabu + Ishaq Sekro (wanaunganisha matawi mawili):
const gRajabuSekroH = p('Rajabu / Liana Sekro',14,'★ Tawi la Chachika',gHidayaRaj,{note:'Mtoto wa Hidaya Rajabu (Chachika) na Ishaq/Sekro Mwejuma (Chayoa). Unganisho la matawi mawili.'});
const gMwinyiSekroH = p('Mwejuma / Mwinyi Sekro',14,'★ Tawi la Chachika',gHidayaRaj,{note:'Mtoto wa Hidaya Rajabu (Chachika) na Ishaq/Sekro Mwejuma (Chayoa). Ana watoto: Namraro/Hidaya, Nima, Jania.'});
p('Namraro / Hidaya Mwinyi Sekro',15,'★ Tawi la Chachika',gMwinyiSekroH,{female:true});
p('Nima Mwinyi Sekro',15,'★ Tawi la Chachika',gMwinyiSekroH);
p('Jania Mwinyi Sekro',15,'★ Tawi la Chachika',gMwinyiSekroH);
const gSofiaRaj = p('Bi Sofia Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{female:true});
const gJainaRaj = p('Bi Jaina Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{born:'1976',female:true,spouse:'Dr Kennedy Greyson'});
p('Lisa Kennedy',14,'★ Tawi la Chachika',gJainaRaj,{born:'1999',female:true});
p('Neville Kennedy',14,'★ Tawi la Chachika',gJainaRaj,{born:'2003'});
p('Michelle Kennedy',14,'★ Tawi la Chachika',gJainaRaj,{born:'2009',female:true});
p('Anecia Kennedy',14,'★ Tawi la Chachika',gJainaRaj,{born:'2009',female:true});
p('Lincolin Kennedy',14,'★ Tawi la Chachika',gJainaRaj,{born:'2012'});
const gRehemaRaj = p('Bi Rehema Rajabu Daudi',13,'★ Tawi la Chachika',gRajabuDL,{female:true,spouse:'Kamanda Semboja'});
p('Lulu Kamanda Semboja',14,'★ Tawi la Chachika',gRehemaRaj,{born:'2001',female:true});
p('Imran Kamanda Semboja',14,'★ Tawi la Chachika',gRehemaRaj,{born:'2005'});
p('Ryaan Kamanda Semboja',14,'★ Tawi la Chachika',gRehemaRaj,{born:'2009'});
p('Irfaan Kamanda Semboja',14,'★ Tawi la Chachika',gRehemaRaj,{born:'2015'});
// Gen 14: Daudi Rajabu children
p('Rajabu Daudi Rajabu',14,'★ Tawi la Chachika',gDaudiRajabu);
p('Bi Amina Daudi Rajabu',14,'★ Tawi la Chachika',gDaudiRajabu,{female:true});
// Gen 14: Twahiru Rajabu children
p('Rajabu Twahiru Rajabu',14,'★ Tawi la Chachika',gTwahiruRaj);
p('Haruni Twahiru Rajabu',14,'★ Tawi la Chachika',gTwahiruRaj);
p('Naseeb Twahiru Rajabu',14,'★ Tawi la Chachika',gTwahiruRaj);
p('Bi Amina Twahiru Rajabu',14,'★ Tawi la Chachika',gTwahiruRaj,{female:true});

// ── Gen 13: Nasibu / Kamando Daudi Liana's children ──
const gDaudiNasibu = p('Daudi Nasibu Daudi',13,'★ Tawi la Chachika',gNasibuDL,{born:'1968',spouse:'Aidat / Rukia'});
const gMwedadiNasibu = p('Mwedadi Nasibu Daudi',13,'★ Tawi la Chachika',gNasibuDL,{born:'1980',spouse:'Sabrina'});
const gAminaNasibuDL = p('Bi Dr Amina Nasibu Daudi',13,'★ Tawi la Chachika',gNasibuDL,{born:'1970',female:true,note:'Daktari.',spouse:'Muhad Sadiki'});
const gZakiaNasibuDL = p('Bi Zakia Nasibu Daudi',13,'★ Tawi la Chachika',gNasibuDL,{born:'1972',female:true,spouse:'Mwarami Kahabi'});
const gZafaraniNasibuDL = p('Bi Zafarani Nasibu Daudi',13,'★ Tawi la Chachika',gNasibuDL,{born:'1974',female:true,spouse:'Ally Selemani'});
const gShamimNasibuDL = p('Bi Shamim Nasibu Daudi',13,'★ Tawi la Chachika',gNasibuDL,{born:'1976',female:true,spouse:'Ally Sekei'});
const gShamsaNasibuDL = p('Bi Shamsa / Beresha Nasibu Daudi',13,'★ Tawi la Chachika',gNasibuDL,{born:'1978',female:true,spouse:'James Allen Mtahiko'});
// Gen 14: Daudi Nasibu children
p('Nasibu Daudi Nasibu',14,'★ Tawi la Chachika',gDaudiNasibu);
p('Bi Najma Daudi Nasibu',14,'★ Tawi la Chachika',gDaudiNasibu,{female:true});
p('Bi Sabrina Daudi Nasibu',14,'★ Tawi la Chachika',gDaudiNasibu,{female:true});
// Gen 14: Mwedadi Nasibu children
// Children of Nasibu daughters:

// ── Gen 13: Haruni Daudi Liana's children ──
// Haruni watoto wako chini (section mpya)

// ════════════════════════════════════════════════════════
// VIZAZI VYA DAUDI LIANA — kutoka document la familia 2024
// Imeingizwa: watu wapya, vizazi vya wanawake, miaka, kazi
// ════════════════════════════════════════════════════════

// ── VIZAZI VYA AMIRI DAUDI (A.1) ──
// UPDATE gAmiriDL: {born:'9th sep1926',died:'11th June2000',spouse:'Sada Rajabu',note:'Nurse/Persant. Simu: Box 33 Usangi'}
const gZukraAmiri_A_1_a = p('Zukra Amiri',13,'★ Tawi la Chachika',gAmiriDL,{born:'1952',spouse:'Sabdiel Fundisha',note:'Teacher. Simu: Sanya Juu',female:true});
const gElirehemaSab_A_1_a_1 = p('Elirehema Sabdiel  Fundisha',14,'★ Tawi la Chachika',gZukraAmiri_A_1_a,{born:'1973'});
p('Ema Elirehema',15,'★ Tawi la Chachika',gElirehemaSab_A_1_a_1,{female:true});
p('Angel Elirehema',15,'★ Tawi la Chachika',gElirehemaSab_A_1_a_1,{female:true});
p('Sharon Elirehema',15,'★ Tawi la Chachika',gElirehemaSab_A_1_a_1,{female:true});
p('Elisha Elirehema',15,'★ Tawi la Chachika',gElirehemaSab_A_1_a_1);
const gDianaSabdiel_A_1_a_2 = p('Diana Sabdiel Fundisha',14,'★ Tawi la Chachika',gZukraAmiri_A_1_a,{female:true});
p('Brian',15,'★ Tawi la Chachika',gDianaSabdiel_A_1_a_2);
p('Saidi',15,'★ Tawi la Chachika',gDianaSabdiel_A_1_a_2);
p('Sabri',15,'★ Tawi la Chachika',gDianaSabdiel_A_1_a_2);
const gAlex_A_1_a_3 = p('Alex (Amiri) Sabdiel Fundisha',14,'★ Tawi la Chachika',gZukraAmiri_A_1_a);
p('Megan',15,'★ Tawi la Chachika',gAlex_A_1_a_3,{female:true});
p('Marion',15,'★ Tawi la Chachika',gAlex_A_1_a_3,{female:true});
p('Ariela',15,'★ Tawi la Chachika',gAlex_A_1_a_3,{female:true});
const gStanleySabdi_A_1_a_4 = p('Stanley Sabdiel Fundisha',14,'★ Tawi la Chachika',gZukraAmiri_A_1_a);
p('Ronald',15,'★ Tawi la Chachika',gStanleySabdi_A_1_a_4);
p('Miriam',15,'★ Tawi la Chachika',gStanleySabdi_A_1_a_4,{female:true});
const gZeraAmiri_A_1_b = p('Zera Amiri',13,'★ Tawi la Chachika',gAmiriDL,{female:true});
const gSalumAmiri_A_1_b_1 = p('Salum Amiri',14,'★ Tawi la Chachika',gZeraAmiri_A_1_b);
p('Sharon Salim',15,'★ Tawi la Chachika',gSalumAmiri_A_1_b_1,{female:true});
p('Zera  Salim',15,'★ Tawi la Chachika',gSalumAmiri_A_1_b_1,{female:true});
p('Stanley (Amiri) Mngulu',14,'★ Tawi la Chachika',gZeraAmiri_A_1_b);
const gHellenaAlexa_A_1_b_3 = p('Hellena Alexander Mkumbwa',14,'★ Tawi la Chachika',gZeraAmiri_A_1_b,{female:true});
p('Jovin Nashon Mkama',15,'★ Tawi la Chachika',gHellenaAlexa_A_1_b_3);
p('Noel Alexander Mkubwa',14,'★ Tawi la Chachika',gZeraAmiri_A_1_b);
const gSalmaAmiri_A_1_c = p('Salma Amiri',13,'★ Tawi la Chachika',gAmiriDL,{female:true});
const gAlphonseChar_A_1_c_1 = p('Alphonse Charles Ndomba',14,'★ Tawi la Chachika',gSalmaAmiri_A_1_c);
p('Lisa Alphonce Ndomba',15,'★ Tawi la Chachika',gAlphonseChar_A_1_c_1,{female:true});
p('Suzanne  Charles Ndomba',14,'★ Tawi la Chachika',gSalmaAmiri_A_1_c,{female:true});
const gDorahCharles_A_1_c_3 = p('Dorah Charles Ndomba',14,'★ Tawi la Chachika',gSalmaAmiri_A_1_c,{female:true});
p('Cassandra Francis Mandepu',15,'★ Tawi la Chachika',gDorahCharles_A_1_c_3,{female:true});
const gHaulatiAmiri_A_1_d = p('Haulati Amiri',13,'★ Tawi la Chachika',gAmiriDL,{female:true});
p('Asina(Janeth)  George   Msongole',14,'★ Tawi la Chachika',gHaulatiAmiri_A_1_d,{female:true});
p('Yuneth George Msongole',14,'★ Tawi la Chachika',gHaulatiAmiri_A_1_d,{female:true});
p('Millicent George Msongole',14,'★ Tawi la Chachika',gHaulatiAmiri_A_1_d,{female:true});
const gMariamAmiri_A_1_e = p('Mariam Amiri(Mnaro)',13,'★ Tawi la Chachika',gAmiriDL,{female:true});
const gEzena_A_1_e_1 = p('Ezena(Salma) Mnaro',14,'★ Tawi la Chachika',gMariamAmiri_A_1_e,{female:true});
p('Nasri Ali',15,'★ Tawi la Chachika',gEzena_A_1_e_1,{female:true});
p('Samia Ali',15,'★ Tawi la Chachika',gEzena_A_1_e_1);
p('Samil Ali',15,'★ Tawi la Chachika',gEzena_A_1_e_1);
p('Alim Ali',15,'★ Tawi la Chachika',gEzena_A_1_e_1);
const gJumaMnaro_A_1_e_2 = p('Juma Mnaro',14,'★ Tawi la Chachika',gMariamAmiri_A_1_e);
p('Maureen Juma',15,'★ Tawi la Chachika',gJumaMnaro_A_1_e_2);
p('Aliamini Juma',15,'★ Tawi la Chachika',gJumaMnaro_A_1_e_2);
p('Junaidi Juma',15,'★ Tawi la Chachika',gJumaMnaro_A_1_e_2);
p('Aiman Juma',15,'★ Tawi la Chachika',gJumaMnaro_A_1_e_2);
p('Jasir Juma',15,'★ Tawi la Chachika',gJumaMnaro_A_1_e_2);
const gHamisi_A_1_e_3 = p('Hamisi(Chichi) Mnaro',14,'★ Tawi la Chachika',gMariamAmiri_A_1_e);
p('Aliamini Hamisi',15,'★ Tawi la Chachika',gHamisi_A_1_e_3);
p('Mariam Hamisi',15,'★ Tawi la Chachika',gHamisi_A_1_e_3,{female:true});
const gZidikheriMna_A_1_e_4 = p('Zidikheri Mnaro',14,'★ Tawi la Chachika',gMariamAmiri_A_1_e);
p('Alina Zidikheri',15,'★ Tawi la Chachika',gZidikheriMna_A_1_e_4);
p('Alia Zidikheri',15,'★ Tawi la Chachika',gZidikheriMna_A_1_e_4);
p('Aliamini Zidikheri',15,'★ Tawi la Chachika',gZidikheriMna_A_1_e_4);
// Mariam Amiri (A.1.e) is separate - see gMariamAmiri below
// SKIPPED (no parent var): A.1.f.1 Heri Mashanga
// SKIPPED (no parent var): A.1.f.1.1 Ariela
// SKIPPED (no parent var): A.1.f.1.2 Arabel
// SKIPPED (no parent var): A.1.f.2 Lilah Mashanga
// SKIPPED (no parent var): A.1.f.2.1 Anna
// SKIPPED (no parent var): A.1.f.3 Imran Mashanga
p('Sada Rajabu',14,'★ Tawi la Chachika',gRajabuAmiri,{female:true});
p('Binzua Rajabu',14,'★ Tawi la Chachika',gRajabuAmiri,{female:true});
p('Amiri Rajabu',14,'★ Tawi la Chachika',gRajabuAmiri);

// ── VIZAZI VYA SALIM(MBONEA)DAUDI (S.1) ──
// UPDATE gSalimuDL: {born:'1936',died:'2012',spouse:'Amina Abdala Kindoi'}
const gSaidaSalim_S_1_a = p('Saida Salim',13,'★ Tawi la Chachika',gSalimuDL,{born:'1960',spouse:'John Gwambasa',female:true});
const gAronGwambasa_S_1_a_1 = p('Aron Gwambasa',14,'★ Tawi la Chachika',gSaidaSalim_S_1_a);
p('Joshua Bernard',15,'★ Tawi la Chachika',gAronGwambasa_S_1_a_1,{born:'2016'});
p('John Bernard',15,'★ Tawi la Chachika',gAronGwambasa_S_1_a_1,{born:'2018'});
p('Aron Bernard',15,'★ Tawi la Chachika',gAronGwambasa_S_1_a_1,{born:'2019'});
p('Nancy Bernard',15,'★ Tawi la Chachika',gAronGwambasa_S_1_a_1,{born:'2020',female:true});
const gAbelGwambasa_S_1_a_2 = p('Abel Gwambasa',14,'★ Tawi la Chachika',gSaidaSalim_S_1_a,{spouse:'Joyce John'});
p('Alvin Abel Gwambasa',15,'★ Tawi la Chachika',gAbelGwambasa_S_1_a_2,{born:'2020'});
p('Alice Abel Gwambasa',15,'★ Tawi la Chachika',gAbelGwambasa_S_1_a_2,{born:'2014'});
p('Allan Abel Gwambasa',15,'★ Tawi la Chachika',gAbelGwambasa_S_1_a_2,{born:'2014'});
p('Eva Gwambasa',14,'★ Tawi la Chachika',gSaidaSalim_S_1_a,{spouse:'Hotelier',female:true});
const gHalimaDaudiS_S_1_b_1 = p('Halima Daudi Salim',14,'★ Tawi la Chachika',gDaudiSalimu,{female:true});
p('Heri',15,'★ Tawi la Chachika',gHalimaDaudiS_S_1_b_1);
const gAminaDaudiSa_S_1_b_2 = p('Amina Daudi Salim',14,'★ Tawi la Chachika',gDaudiSalimu,{female:true});
p('Ivan',15,'★ Tawi la Chachika',gAminaDaudiSa_S_1_b_2);
const gShamimDaudiS_S_1_b_4 = p('Shamim Daudi Salim',14,'★ Tawi la Chachika',gDaudiSalimu,{born:'1996',female:true});
p('Hamza',15,'★ Tawi la Chachika',gShamimDaudiS_S_1_b_4);
const gSalimDaudiSa_S_1_b_3 = p('Salim Daudi Salim',14,'★ Tawi la Chachika',gDaudiSalimu,{born:'1999'});
p('Daudi Salim',15,'★ Tawi la Chachika',gSalimDaudiSa_S_1_b_3,{female:true});
p('Abduli Daudi Salim',14,'★ Tawi la Chachika',gDaudiSalimu,{born:'2003'});
p('Johnson',14,'★ Tawi la Chachika',gDaudiSalimu);
const gMwanaidiSali_S_1_c = p('Mwanaidi  Salim',13,'★ Tawi la Chachika',gSalimuDL,{female:true});
const gSadaSalim_S_1_c_1 = p('Sada Salim',14,'★ Tawi la Chachika',gMwanaidiSali_S_1_c,{female:true});
p('Hamida',15,'★ Tawi la Chachika',gSadaSalim_S_1_c_1);
const gShabaniSalim_S_1_d = p('Shabani Salim',13,'★ Tawi la Chachika',gSalimuDL,{born:'1964'});
p('Amina Shabani Salim',14,'★ Tawi la Chachika',gShabaniSalim_S_1_d,{female:true});
const gShufaaSallim_S_1_e = p('Shufaa Sallim',13,'★ Tawi la Chachika',gSalimuDL,{born:'1966',spouse:'Police officer',female:true});
p('Cecilia Komba',14,'★ Tawi la Chachika',gShufaaSallim_S_1_e);
const gMajabuSalim_S_1_f = p('Majabu Salim',13,'★ Tawi la Chachika',gSalimuDL,{born:'1968',female:true});
const gMeela_S_1_f_1 = p('Meela',14,'★ Tawi la Chachika',gMajabuSalim_S_1_f,{born:'1988'});
p('Leila',14,'★ Tawi la Chachika',gMajabuSalim_S_1_f,{female:true});
p('Lilah',14,'★ Tawi la Chachika',gMajabuSalim_S_1_f);
p('Salim Abdala',14,'★ Tawi la Chachika',gAbdallahSalimu);
p('Lulu Abdala Salim',14,'★ Tawi la Chachika',gAbdallahSalimu,{female:true});
p('Asna Abdala Salim',14,'★ Tawi la Chachika',gAbdallahSalimu);
const gHamisaMbaga_S_1_h = p('Hamisa Mbaga',13,'★ Tawi la Chachika',gSalimuDL,{born:'1977',spouse:'Elisante Urio',female:true});
p('Asina Elisante Urio',14,'★ Tawi la Chachika',gHamisaMbaga_S_1_h,{female:true});
const gRuthElisante_S_1_h_2 = p('Ruth Elisante Urio',14,'★ Tawi la Chachika',gHamisaMbaga_S_1_h,{female:true});
p('Saad Said Shoo',15,'★ Tawi la Chachika',gRuthElisante_S_1_h_2);

// ── VIZAZI VYA KHALIFA(NGURUTA) DAUDI (K.1) ──
const gDaudiKhalifa_K_1_a = p('Daudi Khalifa -Pambe',13,'★ Tawi la Chachika',gHalifaDL,{born:'1970',female:true});
const gKelvinDaudiP_K_1_a_1 = p('Kelvin Daudi Pambe',14,'★ Tawi la Chachika',gDaudiKhalifa_K_1_a,{born:'1992'});
p('Scholastica Kevin Mbaga',15,'★ Tawi la Chachika',gKelvinDaudiP_K_1_a_1,{female:true});
// SKIPPED (no parent var): K.1.b.2 Eddy Daudi Pambe
// SKIPPED (no parent var): K.1.c.3 Susan Daudi Pambe
// SKIPPED (no parent var): K.1.d.4 Merry-Beresha Daudi Pambe
// SKIPPED (no parent var): K.1.d.4.1 Emmanuel Daudi
// SKIPPED (no parent var): K.1.d.4.2 Precious Toshi
// SKIPPED (no parent var): K.1.d.4.3 Criss Jacob
const gDaudiKhalifa_K_1_b = p('Daudi Khalifa',13,'★ Tawi la Chachika',gHalifaDL,{spouse:'Mary Daud Khalifa',female:true});
p('Eddy Daudi Pambe',14,'★ Tawi la Chachika',gDaudiKhalifa_K_1_b);
p('Amiri Daud Khalifa',14,'★ Tawi la Chachika',gDaudiKhalifa_K_1_b);
p('Arden Daudi Khalifa',14,'★ Tawi la Chachika',gDaudiKhalifa_K_1_b);
p('Asinani Daudi Khalifa',14,'★ Tawi la Chachika',gDaudiKhalifa_K_1_b,{female:true});
const gYusuphKhalif_K_1_c = p('Yusuph Khalifa',13,'★ Tawi la Chachika',gHalifaDL,{born:'1988',spouse:'Fatuma Mwendabanu'});
p('Salim Yusuph Khalifa',14,'★ Tawi la Chachika',gYusuphKhalif_K_1_c);
p('Hemedi Yusuph Khalifa',14,'★ Tawi la Chachika',gYusuphKhalif_K_1_c);
const gMavuraNasser_K_1_d = p('Mavura Nasser Khalifa',13,'★ Tawi la Chachika',gHalifaDL,{born:'1976',spouse:'Mwanahamisi Mashauri'});
p('Alicia Nasser Khalifa',14,'★ Tawi la Chachika',gMavuraNasser_K_1_d,{born:'2009',female:true});
p('Sophia Mavura Nasser',14,'★ Tawi la Chachika',gMavuraNasser_K_1_d,{born:'2017',female:true});
const gElpinaHalifa_K_1_e = p('Elpina Halifa',13,'★ Tawi la Chachika',gHalifaDL,{born:'1984',female:true});
p('Merry',14,'★ Tawi la Chachika',gElpinaHalifa_K_1_e);
p('Godson',14,'★ Tawi la Chachika',gElpinaHalifa_K_1_e);

// ── VIZAZI VYA RUKIA(NAMANGI)DAUDI (R.1) ──
// UPDATE gRukiaDL: {born:'1946',died:'2010',spouse:'Mussa Makinda'}
const gZalihaMussa_R_1_a = p('Zaliha Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1960',spouse:'Simon Fundisha',female:true});
const gRukiaSimonFu_R_1_a_1 = p('Rukia Simon Fundisha',14,'★ Tawi la Chachika',gZalihaMussa_R_1_a,{born:'1982',died:'2020',spouse:'Daudi',female:true});
const gAminaDaudi_R_1_a_1_1 = p('Amina Daudi',15,'★ Tawi la Chachika',gRukiaSimonFu_R_1_a_1,{female:true});
p('Mohamed',15,'★ Tawi la Chachika',gRukiaSimonFu_R_1_a_1);
p('Shani',15,'★ Tawi la Chachika',gRukiaSimonFu_R_1_a_1);
const gPaulinSimonF_R_1_a_2 = p('Paulin Simon Fundisha',14,'★ Tawi la Chachika',gZalihaMussa_R_1_a);
p('Happy',15,'★ Tawi la Chachika',gPaulinSimonF_R_1_a_2,{female:true});
const gElizabethSim_R_1_a_3 = p('Elizabeth  Simon Fundisha',14,'★ Tawi la Chachika',gZalihaMussa_R_1_a,{female:true});
p('Kevin',15,'★ Tawi la Chachika',gElizabethSim_R_1_a_3);
const gKabakaSimonF_R_1_a_4 = p('Kabaka Simon Fundisha',14,'★ Tawi la Chachika',gZalihaMussa_R_1_a);
p('Victoria Jackson Simon',15,'★ Tawi la Chachika',gKabakaSimonF_R_1_a_4,{female:true});
p('Gloria Jackson Simon',15,'★ Tawi la Chachika',gKabakaSimonF_R_1_a_4,{female:true});
const gKadadaSimonF_R_1_a_5 = p('Kadada Simon Fundisha',14,'★ Tawi la Chachika',gZalihaMussa_R_1_a,{spouse:'Selemani',female:true});
p('Mery Kilango',15,'★ Tawi la Chachika',gKadadaSimonF_R_1_a_5,{female:true});
p('Kelvin Kilango',15,'★ Tawi la Chachika',gKadadaSimonF_R_1_a_5);
p('Anna Kilango',15,'★ Tawi la Chachika',gKadadaSimonF_R_1_a_5,{female:true});
const gZeraMussa_R_1_b = p('Zera Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1962',died:'2009',female:true});
const gMussaYahaya_R_1_b_1 = p('Mussa Yahaya',14,'★ Tawi la Chachika',gZeraMussa_R_1_b,{born:'1989'});
p('Haisam',15,'★ Tawi la Chachika',gMussaYahaya_R_1_b_1);
p('Hadia',15,'★ Tawi la Chachika',gMussaYahaya_R_1_b_1,{female:true});
p('Iddi Yahaya',14,'★ Tawi la Chachika',gZeraMussa_R_1_b);
const gMakindaMussa_R_1_c = p('Makinda Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1965',died:'2007'});
p('Mohamed Makinda',14,'★ Tawi la Chachika',gMakindaMussa_R_1_c);
p('Fadhili Makinda',14,'★ Tawi la Chachika',gMakindaMussa_R_1_c);
const gDaudiMussa_R_1_d = p('Daudi Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1967',female:true});
const gAliDaudi_R_1_d_1 = p('Ali Daudi',14,'★ Tawi la Chachika',gDaudiMussa_R_1_d);
p('Shani Daudi',14,'★ Tawi la Chachika',gDaudiMussa_R_1_d,{female:true});
p('Nasri Daudi',14,'★ Tawi la Chachika',gDaudiMussa_R_1_d,{female:true});
const gZainaMussa_R_1_e = p('Zaina Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1970',female:true});
p('Azidikheri',14,'★ Tawi la Chachika',gZainaMussa_R_1_e);
p('Mussa',14,'★ Tawi la Chachika',gZainaMussa_R_1_e);
p('Nasra',14,'★ Tawi la Chachika',gZainaMussa_R_1_e,{female:true});
p('Babu?????',14,'★ Tawi la Chachika',gZainaMussa_R_1_e);
p('Maghembe',14,'★ Tawi la Chachika',gZainaMussa_R_1_e);
const gRidhwani_R_1_f = p('Ridhwani(Aron) Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1973',spouse:'Mama Shani'});
p('Juma Ridhwani',14,'★ Tawi la Chachika',gRidhwani_R_1_f);
p('Ibra Ridhwani',14,'★ Tawi la Chachika',gRidhwani_R_1_f);
p('Shani Ridhwani',14,'★ Tawi la Chachika',gRidhwani_R_1_f);
const gMwedadiMussa_R_1_g = p('Mwedadi Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1975',spouse:'Mama Rukia',female:true});
p('Rukia Mwedadi',14,'★ Tawi la Chachika',gMwedadiMussa_R_1_g,{female:true});
p('Zainabu Mwedadi',14,'★ Tawi la Chachika',gMwedadiMussa_R_1_g,{female:true});
p('Anasia Mwedadi',14,'★ Tawi la Chachika',gMwedadiMussa_R_1_g,{female:true});
const gSanuraMussa_R_1_h = p('Sanura Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1978',spouse:'Yusufu Selemani',female:true});
p('Hawa Yusufu',14,'★ Tawi la Chachika',gSanuraMussa_R_1_h,{female:true});
p('Selemani Yusufu',14,'★ Tawi la Chachika',gSanuraMussa_R_1_h);
p('Asina Yusufu',14,'★ Tawi la Chachika',gSanuraMussa_R_1_h,{female:true});
const gFadhilaMussa_R_1_i = p('Fadhila Mussa',13,'★ Tawi la Chachika',gRukiaDL,{born:'1979',spouse:'Zorawanga',female:true});
p('Sifuni Mussa',14,'★ Tawi la Chachika',gFadhilaMussa_R_1_i);

// ── VIZAZI VYA HEMEDI (LIANA) DAUDI (H.1) ──

// Issa Hemedi already exists as gDrIssaHem above
// {born:'1959',spouse:'Chiku & Hanifa',note:'Doctor/Banker'});
// Hemedi Issa (same as above - under gDrIssaHem)
// SKIPPED (no parent var): H.1.1.2 Lulu Issa Hemedi
// Nasra Issa Hemedi - already under gDrIssaHem as 'Bi Nasra Issa Hemedi'
const gSaidiHemedi_H_1_b = p('Saidi Hemedi',13,'★ Tawi la Chachika',gHemediDL,{spouse:'Herieth Mtae',note:'Proffesor'});
const gNancySaidHem_H_1_b_1 = p('Nancy Said Hemedi',14,'★ Tawi la Chachika',gSaidiHemedi_H_1_b,{female:true});
p('Ibra Said Hemedi',14,'★ Tawi la Chachika',gSaidiHemedi_H_1_b);
const gMwajumaHemed_H_1_c = p('Mwajuma Hemedi',13,'★ Tawi la Chachika',gHemediDL,{female:true});
p('Abu',14,'★ Tawi la Chachika',gMwajumaHemed_H_1_c);
p('Hemedi',14,'★ Tawi la Chachika',gMwajumaHemed_H_1_c);
const gDaudiHemedi_H_1_d = p('Daudi Hemedi',13,'★ Tawi la Chachika',gHemediDL,{spouse:'Faraja Msindai',note:'Director',female:true});
p('Neema Daudi',14,'★ Tawi la Chachika',gDaudiHemedi_H_1_d,{born:'1995',note:'Advocate',female:true});
const gHusseinHemed_H_1_e = p('Hussein Hemedi',13,'★ Tawi la Chachika',gHemediDL,{born:'1969',spouse:'Merry Mahenda'});
p('Lulu Hussein',14,'★ Tawi la Chachika',gHusseinHemed_H_1_e,{born:'2007',female:true});
p('Nassri Hussein',14,'★ Tawi la Chachika',gHusseinHemed_H_1_e,{born:'2008'});
p('Maida Hussein',14,'★ Tawi la Chachika',gHusseinHemed_H_1_e,{born:'2011',female:true});
p('mayra Hussein',14,'★ Tawi la Chachika',gHusseinHemed_H_1_e,{born:'2008'});
p('Nayra Hussein',14,'★ Tawi la Chachika',gHusseinHemed_H_1_e,{born:'2020',female:true});
p('Nasser Hussein',14,'★ Tawi la Chachika',gHusseinHemed_H_1_e,{born:'2021'});
const gMwedadiHemed_H_1_f = p('Mwedadi Hemedi',13,'★ Tawi la Chachika',gHemediDL,{born:'1974',spouse:'Saraphina Mughwayi/Sondy',female:true});
p('Hemedi Mwedadi',14,'★ Tawi la Chachika',gMwedadiHemed_H_1_f,{born:'2001'});
p('Hanny Mwedadi',14,'★ Tawi la Chachika',gMwedadiHemed_H_1_f,{born:'2004',female:true});
p('Hasani Mwedadi',14,'★ Tawi la Chachika',gMwedadiHemed_H_1_f,{born:'2012'});
p('Sheila Mwedadi',14,'★ Tawi la Chachika',gMwedadiHemed_H_1_f,{born:'2014',female:true});
p('Nasibu Mwedadi',14,'★ Tawi la Chachika',gMwedadiHemed_H_1_f,{born:'2023'});
const gZulekhaHemed_H_1_g = p('Zulekha Hemedi',13,'★ Tawi la Chachika',gHemediDL,{born:'1976',spouse:'Mwanzao Millinga',female:true});
p('George Millinga',14,'★ Tawi la Chachika',gZulekhaHemed_H_1_g,{born:'2007'});
p('Faraja Millinga',14,'★ Tawi la Chachika',gZulekhaHemed_H_1_g,{born:'2010',female:true});
const gShakilaHemed_H_1_h = p('Shakila Hemedi',13,'★ Tawi la Chachika',gHemediDL,{born:'1978',female:true});
p('Peter',14,'★ Tawi la Chachika',gShakilaHemed_H_1_h);
p('Hemedi Shakila',14,'★ Tawi la Chachika',gShakilaHemed_H_1_h);

// ── VIZAZI VYA FADHILI DAUDI (F.1) ──
// UPDATE gFadhiliDL: {born:'1944',spouse:'Elizabeth John Omari',note:'Retired diplomat'}
const gLeila_F_1_b = p('Leila(Joyce) Fadhili',13,'★ Tawi la Chachika',gFadhiliDL,{spouse:'Jerome Katekyeza',female:true});
p('Chedi(Marcel) Humberto',14,'★ Tawi la Chachika',gLeila_F_1_b);
p('Kisenge(Anthony) Humberto',14,'★ Tawi la Chachika',gLeila_F_1_b);
p('Verian(Naila) Jerome',14,'★ Tawi la Chachika',gLeila_F_1_b,{female:true});
p('Mariama(Elizabeth) Jerome',14,'★ Tawi la Chachika',gLeila_F_1_b,{female:true});
p('Jerome Jr Jerome',14,'★ Tawi la Chachika',gLeila_F_1_b);
p('Ava Rose John Mbaga',14,'★ Tawi la Chachika',gJohnFadhili,{female:true});
p('Leila Elizabeth John Mbaga',14,'★ Tawi la Chachika',gJohnFadhili,{female:true});
const gRoseFadhili_F_1_e = p('Rose Fadhili',13,'★ Tawi la Chachika',gFadhiliDL,{spouse:'Wellington Hurpban',female:true});
p('Sienna Wellington',14,'★ Tawi la Chachika',gRoseFadhili_F_1_e,{female:true});
p('Myles Wellington',14,'★ Tawi la Chachika',gRoseFadhili_F_1_e);
const gPamelaFadhil_F_1_f = p('Pamela Fadhili',13,'★ Tawi la Chachika',gFadhiliDL,{spouse:'Reuben Quist',female:true});

// ── VIZAZI VYA NASIBU DAUDI (N.1) ──
// Nasibu spouse info added above
// Children of Amina Nasibu:
const gIddiMuhadN = p('Iddi Muhad',14,'★ Tawi la Chachika',gAminaNasibuDL);
const gNuruMuhadN = p('Nuru Muhad',14,'★ Tawi la Chachika',gAminaNasibuDL,{female:true});
p('Legend Iddi',15,'★ Tawi la Chachika',gIddiMuhadN,{born:'2016'});
p('Kelly Nuru',15,'★ Tawi la Chachika',gNuruMuhadN,{born:'2020',female:true});
// Children of Zakia Nasibu:
const gMariamZakia = p('Mariam Mwarami Kahabi',14,'★ Tawi la Chachika',gZakiaNasibuDL,{born:'1995',female:true});
p('Aiman',15,'★ Tawi la Chachika',gMariamZakia);
p('Aslam',15,'★ Tawi la Chachika',gMariamZakia);
// Children of Safarani Nasibu:
p('Muhsin Ally Selemani',14,'★ Tawi la Chachika',gZafaraniNasibuDL);
p('Nasibu Ally Selemani',14,'★ Tawi la Chachika',gZafaraniNasibuDL);
// Children of Shamim Nasibu:
p('Sabri Ally Sekei',14,'★ Tawi la Chachika',gShamimNasibuDL);
p('Nasibu Ally Sekei',14,'★ Tawi la Chachika',gShamimNasibuDL);
// Children of Shamsa Nasibu:
p('Elvida James Allen Mtahiko',14,'★ Tawi la Chachika',gShamsaNasibuDL,{female:true});
p('Joyce James Allen Mtahiko',14,'★ Tawi la Chachika',gShamsaNasibuDL,{female:true});
p('Monica James Allen Mtahiko',14,'★ Tawi la Chachika',gShamsaNasibuDL,{female:true});
// Children of Mwedadi Nasibu (new var):
p('Jafari Mwedadi Nasibu',14,'★ Tawi la Chachika',gMwedadiNasibu);
p('Bi Jasina Mwedadi Nasibu',14,'★ Tawi la Chachika',gMwedadiNasibu,{female:true});
// ── VIZAZI VYA MWANAHAWA DAUDI (M.1) ──
// UPDATE gMwanahawaDL: {spouse:'Saleh Masasi'}
const gHassanMassas_M_1_a = p('Hassan Massasi',13,'★ Tawi la Chachika',gMwanahawaDL);
p('Zulekha Hassan',14,'★ Tawi la Chachika',gHassanMassas_M_1_a,{female:true});
const gHusseinMassa_M_1_b = p('Hussein Massasi',13,'★ Tawi la Chachika',gMwanahawaDL);
p('Saleh Hussein',14,'★ Tawi la Chachika',gHusseinMassa_M_1_b);
p('Hawa Hussein',14,'★ Tawi la Chachika',gHusseinMassa_M_1_b,{female:true});
const gZulekhaMassa_M_1_c = p('Zulekha Massasi',13,'★ Tawi la Chachika',gMwanahawaDL,{spouse:'Toure',female:true});
p('Madina Toure',14,'★ Tawi la Chachika',gZulekhaMassa_M_1_c,{female:true});
p('Saleh Toure',14,'★ Tawi la Chachika',gZulekhaMassa_M_1_c);
p('Jenebu Toure',14,'★ Tawi la Chachika',gZulekhaMassa_M_1_c,{female:true});
const gDaudiMassasi = p('Daudi Massasi',13,'★ Tawi la Chachika',gMwanahawaDL);
p('Islam Daudi Massasi',14,'★ Tawi la Chachika',gDaudiMassasi);
p('Abutwalib Massasi',13,'★ Tawi la Chachika',gMwanahawaDL);

// ── VIZAZI VYA BILIHUDA DAUDI (B.1) ──
const gWemaMbaga_B_1_a = p('Wema Mbaga',13,'★ Tawi la Chachika',gBilidaDL,{born:'1984',female:true});
p('Nabeel',14,'★ Tawi la Chachika',gWemaMbaga_B_1_a);

// ── VIZAZI VYA HARUNI DAUDI (H.1) ──
// ── HARUNI DAUDI LIANA watoto ──
const gAminaHaruni_H_1_a = p('Amina Haruni',13,'★ Tawi la Chachika',gHaruniDL,{born:'1985',spouse:'Ally Issa',note:'Teacher',female:true});
p('Haruni Sadick Mbura',14,'★ Tawi la Chachika',gAminaHaruni_H_1_a,{born:'2010'});
p('Hasna Ally Mbaga',14,'★ Tawi la Chachika',gAminaHaruni_H_1_a,{born:'2020',female:true});
const gDaudiHaruni_H_1_b = p('Daudi Haruni',13,'★ Tawi la Chachika',gHaruniDL,{born:'1988',spouse:'Zamda Mrisho',female:true});
const gHaruniDaudi_H_1_b_1 = p('Haruni Daudi',14,'★ Tawi la Chachika',gDaudiHaruni_H_1_b);
const gShabaniHarun_H_1_c = p('Shabani Haruni',13,'★ Tawi la Chachika',gHaruniDL,{born:'1993'});
p('Abu',14,'★ Tawi la Chachika',gShabaniHarun_H_1_c);
p('Hemedi Shabani',14,'★ Tawi la Chachika',gShabaniHarun_H_1_c);
// ── MAREKEBISHO: watu waliokosekana kwa nambari isiyo sawa ──
// Watoto wa Amina Amiri (A.1.f)
const gAminaAmiri_A_1_f = p('Amina Amiri',13,'★ Tawi la Chachika',gAmiriDL,{female:true});
const gHeriMashanga_A_1_f_1 = p('Heri Mashanga',14,'★ Tawi la Chachika',gAminaAmiri_A_1_f);
p('Ariela Heri',15,'★ Tawi la Chachika',gHeriMashanga_A_1_f_1,{female:true});
p('Arabel',15,'★ Tawi la Chachika',gHeriMashanga_A_1_f_1,{female:true});
const gLilahMashanga_A_1_f_2 = p('Lilah Mashanga',14,'★ Tawi la Chachika',gAminaAmiri_A_1_f,{female:true});
p('Anna',15,'★ Tawi la Chachika',gLilahMashanga_A_1_f_2,{female:true});
p('Imran Mashanga',14,'★ Tawi la Chachika',gAminaAmiri_A_1_f);

// Watoto wa Khalifa - nambari ziliruka (K.1.b.2, K.1.c.3, K.1.d.4)
// K.1.b children - Daudi Khalifa (second one)
// gDaudiKhalifa_K_1_b — see definition aboved Khalifa'});  // duplicate removed
const gMerryBeresha_K_1_d_4 = p('Merry-Beresha Daudi Pambe',14,'★ Tawi la Chachika',gDaudiKhalifa_K_1_b,{born:'1996',female:true});
p('Emmanuel Daudi',15,'★ Tawi la Chachika',gMerryBeresha_K_1_d_4,{born:'2014'});
p('Precious Toshi',15,'★ Tawi la Chachika',gMerryBeresha_K_1_d_4,{born:'2017',female:true});
p('Criss Jacob',15,'★ Tawi la Chachika',gMerryBeresha_K_1_d_4,{born:'2022'});

// Lulu Issa Hemedi (typo H.1.1.2 should be H.1.a.2)
// Parent is gIssaHemedi_H_1_a

// ════════════════════════════════════════════════════════
// WATOTO WA DAUDI LIANA — MATAWI MAPYA (kutoka doc 2024)
// ════════════════════════════════════════════════════════

// ── AZIZA DAUDI LIANA (Gen 12) ──
const gAzizaDL = p('Bi Aziza Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{female:true,spouse:'Dr Rajabu Mavura'});
const gMaimunaMavura = p('Maimuna Mavura',13,'★ Tawi la Chachika',gAzizaDL,{female:true,spouse:'Mkwawa'});
const gSeifMkwawa = p('Seif Issa Mkwawa',14,'★ Tawi la Chachika',gMaimunaMavura,{note:'CRDB'});
const gAbtwahibMavura = p('Abtwahi Mavura',13,'★ Tawi la Chachika',gAzizaDL);
p('Anwary Abtwahi Mavura',14,'★ Tawi la Chachika',gAbtwahibMavura);
p('Warda Abtwahi Mavura',14,'★ Tawi la Chachika',gAbtwahibMavura,{female:true});
p('Tarik Abtwahi Mavura',14,'★ Tawi la Chachika',gAbtwahibMavura);
p('Bi Razia Mavura',13,'★ Tawi la Chachika',gAzizaDL,{female:true});
const gDaudiMavura = p('Daudi Mavura',13,'★ Tawi la Chachika',gAzizaDL);
p('Tanisa Daudi Mavura',14,'★ Tawi la Chachika',gDaudiMavura,{female:true});
p('Samir Daudi Mavura',14,'★ Tawi la Chachika',gDaudiMavura);
const gAbdalaMavura = p('Abdala Mavura',13,'★ Tawi la Chachika',gAzizaDL);
p('Rahma Abdala Mavura',14,'★ Tawi la Chachika',gAbdalaMavura,{female:true});
p('Munira Abdala Mavura',14,'★ Tawi la Chachika',gAbdalaMavura,{female:true});
p('Rajabu Abdala Mavura',14,'★ Tawi la Chachika',gAbdalaMavura);
p('Nuhaila Abdala Mavura',14,'★ Tawi la Chachika',gAbdalaMavura,{female:true});
p('Nusairy Abdala Mavura',14,'★ Tawi la Chachika',gAbdalaMavura);
const gIssaMavura = p('Issa Mavura',13,'★ Tawi la Chachika',gAzizaDL);
p('Naina Issa Mavura',14,'★ Tawi la Chachika',gIssaMavura,{female:true});
p('Almira Issa Mavura',14,'★ Tawi la Chachika',gIssaMavura,{female:true});

// ── ANASIA DAUDI LIANA (Gen 12) ──
const gAnasiaD = p('Bi Anasia Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1950',female:true,spouse:'Symekher'});
const gSamwelSym = p('Samwel Lifumo Symekher',13,'★ Tawi la Chachika',gAnasiaD,{spouse:'Annete Mwangi',note:'Technician/Peasant'});
p('Tunu Kakai Symekher',14,'★ Tawi la Chachika',gSamwelSym,{born:'2008',female:true});
p('Mbonea Mwapemba',14,'★ Tawi la Chachika',gSamwelSym,{born:'2015'});
const gLeahSym = p('Leah Symekher',13,'★ Tawi la Chachika',gAnasiaD,{born:'1977',female:true,spouse:'John Masanda'});
p('Jarden John Masanda',14,'★ Tawi la Chachika',gLeahSym);
p('Jonathan John Masanda',14,'★ Tawi la Chachika',gLeahSym);
p('Jemma John Masanda',14,'★ Tawi la Chachika',gLeahSym,{female:true});
const gDaudSym = p('Daud Symekher',13,'★ Tawi la Chachika',gAnasiaD,{born:'1980',spouse:'Rosemary Jepchirchir'});
p('Beresha Daudi Symekher',14,'★ Tawi la Chachika',gDaudSym,{born:'2011'});
p('Ninai Daudi Symekher',14,'★ Tawi la Chachika',gDaudSym,{born:'2013',female:true});
p('Opemba Kigen Daudi',14,'★ Tawi la Chachika',gDaudSym,{born:'2018'});

// ── ASINA DAUDI LIANA (Gen 12) ──
const gAsinaD = p('Bi Asina / Asna Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{female:true,spouse:'Omari Muhaji'});
p('Rukia Muhaji',13,'★ Tawi la Chachika',gAsinaD,{female:true});
const gMdoeMuhaji = p('Mdoe Muhaji',13,'★ Tawi la Chachika',gAsinaD);
p('Muhaji Mdoe',14,'★ Tawi la Chachika',gMdoeMuhaji);
p('Omari Mdoe',14,'★ Tawi la Chachika',gMdoeMuhaji);
p('Asina Mdoe',14,'★ Tawi la Chachika',gMdoeMuhaji,{female:true});
p('Daudi Mdoe',14,'★ Tawi la Chachika',gMdoeMuhaji);
const gAminaMuhaji = p('Amina Muhaji',13,'★ Tawi la Chachika',gAsinaD,{female:true,spouse:'Ally'});
p('Twaha Ally',14,'★ Tawi la Chachika',gAminaMuhaji);
p('Alma Ally',14,'★ Tawi la Chachika',gAminaMuhaji,{female:true});
p('Asina Ally',14,'★ Tawi la Chachika',gAminaMuhaji,{female:true});
const gLaylaM = p('Leyla Muhaji',13,'★ Tawi la Chachika',gAsinaD,{female:true});
p('Adam',14,'★ Tawi la Chachika',gLaylaM);
const gNuruMuhaji = p('Nuru Muhaji',13,'★ Tawi la Chachika',gAsinaD,{female:true});
p('Abdulkarim Adam',14,'★ Tawi la Chachika',gNuruMuhaji);
p('Abdrahim Adam',14,'★ Tawi la Chachika',gNuruMuhaji);

// ── ZANIA DAUDI LIANA (Gen 12) — update with family info ──
// gZaniaDL already exists, add her children
const gWakondya = p('Wakondya Matiku',13,'★ Tawi la Chachika',gZaniaDL,{born:'1973',spouse:'Beatrice Matiku'});
p('Humphrey Matiku',14,'★ Tawi la Chachika',gWakondya,{born:'2000'});
p('Hudson Matiku',14,'★ Tawi la Chachika',gWakondya,{born:'2010'});
const gSodeMatiku = p('Sode Daudi Matiku',13,'★ Tawi la Chachika',gZaniaDL);
p('Zanella Sode Matiku',14,'★ Tawi la Chachika',gSodeMatiku,{female:true});
const gSylviaM = p('Sylvia Fumi Matiku',13,'★ Tawi la Chachika',gZaniaDL,{female:true,spouse:'Asupya Nalingigwa'});
p('Ashley Andetta Nalingigwa',14,'★ Tawi la Chachika',gSylviaM,{born:'2006',female:true});
p('Abihudi Asupya Nalingigwa',14,'★ Tawi la Chachika',gSylviaM,{born:'2008'});
p('Aniyah Amona Nalingigwa',14,'★ Tawi la Chachika',gSylviaM,{born:'2010',female:true});
const gKaringisi = p('Karingisi Sylvanus Matiku',13,'★ Tawi la Chachika',gZaniaDL);
p('Aikondya Ilakoze Matiku',14,'★ Tawi la Chachika',gKaringisi,{born:'2012',female:true});
p('Sayuni Mandy Matiku',14,'★ Tawi la Chachika',gKaringisi,{born:'2017',female:true});
const gGayaM = p('Gaya Angela Matiku',13,'★ Tawi la Chachika',gZaniaDL,{female:true});
p('Jason Matiku',14,'★ Tawi la Chachika',gGayaM);

// ── ASINANI DAUDI LIANA (Gen 12) — update with family info ──
// gAsinaniDL already exists, add her children
const gRamadhaniNuru = p('Ramadhani Nuru',13,'★ Tawi la Chachika',gAsinaniDL,{born:'1976',spouse:'Hilda Mahuto'});
p('Ryan Ramadhani',14,'★ Tawi la Chachika',gRamadhaniNuru);
p('Rania Ramadhani',14,'★ Tawi la Chachika',gRamadhaniNuru,{female:true});
const gAshaNuru = p('Asha Nuru',13,'★ Tawi la Chachika',gAsinaniDL,{born:'1978',female:true,spouse:'Omari Lweno'});
p('Maisara Omari Lweno',14,'★ Tawi la Chachika',gAshaNuru,{born:'2005',female:true});
p('Juma Omari Lweno',14,'★ Tawi la Chachika',gAshaNuru,{born:'2008'});
p('Nurdin Omari Lweno',14,'★ Tawi la Chachika',gAshaNuru,{born:'2013'});
const gDaudiNuru = p('Daudi Nuru',13,'★ Tawi la Chachika',gAsinaniDL,{born:'1982',spouse:'Lulu Sumari'});
p('Allya Daudi Nuru',14,'★ Tawi la Chachika',gDaudiNuru,{female:true});
p('Allyan Daudi Nuru',14,'★ Tawi la Chachika',gDaudiNuru);

// ── ZUHURA DAUDI LIANA (Gen 12) ──
const gZuhuraD = p('Bi Zuhura Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{born:'1963',female:true,spouse:'Jalibu Mwenemilao'});
const gSingwaMilao = p('Singwa Milao',13,'★ Tawi la Chachika',gZuhuraD,{born:'1987',spouse:'Adam Jawewa'});
p('Abida Adam',14,'★ Tawi la Chachika',gSingwaMilao,{female:true});
p('Azma Adam',14,'★ Tawi la Chachika',gSingwaMilao,{female:true});
p('Alaina Adam',14,'★ Tawi la Chachika',gSingwaMilao,{female:true});
const gKaleyMilao = p('Kaley Milao',13,'★ Tawi la Chachika',gZuhuraD,{born:'1989',female:true,spouse:'Miraji Kikwete'});
p('Ithan Miraji',14,'★ Tawi la Chachika',gKaleyMilao);
p('Jibril Miraji',14,'★ Tawi la Chachika',gKaleyMilao);
p('Mrisho Miraji',14,'★ Tawi la Chachika',gKaleyMilao);

// ── ZEITUNI DAUDI LIANA (Gen 12) ──
const gZeituniD = p('Bi Zeituni Daudi Liana',12,'★ Tawi la Chachika',gDaudiL,{female:true});
// ── Vizazi vya ndani — Amiri na Salim (gen 15) ──

const gMwedadiL = p('Mwedadi / Mlavwasi Liana',11,'★ Tawi la Chachika',gLiana);
const gHemediKL = p('Hemedi / Kakindo Liana',11,'★ Tawi la Chachika',gLiana,{note:'Alioa Mwanamisi/Namvua Isae wa Kighare. Makao yake yalikuwa Moshi.'});
const gLeonardL = p('Mwalimu Leonard / Ngayo Liana',11,'★ Tawi la Chachika',gLiana,{note:'Mwalimu — alihudumu katika elimu.'});
const gHasaniL = p('Hasani / Larema Liana',11,'★ Tawi la Chachika',gLiana);
const gRamadhaniL = p('Ramadhani / Kanana Liana',11,'★ Tawi la Chachika',gLiana,{note:'Mwalimu Ramadhani Kanana.'});
p('Mapande Liana',11,'★ Tawi la Chachika',gLiana,{note:'Alifariki kabla ya kupata mtoto.'});
p('Bi Mjwii Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Sanabu / Zainabu / Teendwa Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Namvua Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Nangera Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Kimwede Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Namkeshe / Zuhura Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Nakio Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Mwanaidi / Namadhani Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Wezie Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Nambeke Liana',11,'★ Tawi la Chachika',gLiana,{female:true});
p('Bi Namshitu Liana',11,'★ Tawi la Chachika',gLiana,{female:true});

// ── Mwedadi Liana Gen 12 ──
const gFadhiliMw = p('Fadhili Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
const gSaleheMw = p('Afande Salehe Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{note:'Afande — alihudumu katika jeshi.'});
const gAdamMw = p('Adam Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
const gDhahiriMw = p('Dhahiri Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
const gSubiraMw = p('Subira / Liana Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
const gNgurutaMw = p('Nguruta Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
const gRamadhaniMw = p('Ramadhani Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
p('Liana Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
p('Mustafa / Kisedge Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
p('Saidi / Liana Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL);
p('Bi Mwamini Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{female:true});
p('Bi Frazia Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{female:true});
p('Bi Rehema Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{female:true});
p('Bi Saidati Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{female:true});
p('Bi Zuhura Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{female:true});
p('Bi Mwanahawa Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{female:true});
p('Bi Mariamu Mwedadi Liana',12,'★ Tawi la Chachika',gMwedadiL,{female:true});
// Mwedadi Gen 13
p('Kanendwa Fadhili Mwedadi',13,'★ Tawi la Chachika',gFadhiliMw);
p('Mwedadi Fadhili Mwedadi',13,'★ Tawi la Chachika',gFadhiliMw);
p('Saidi Fadhili Mwedadi',13,'★ Tawi la Chachika',gFadhiliMw);
p('Leonard Fadhili Mwedadi',13,'★ Tawi la Chachika',gFadhiliMw);
p('Bi Mwanaidi Fadhili Mwedadi',13,'★ Tawi la Chachika',gFadhiliMw,{female:true});
p('Bi Halima Fadhili Mwedadi',13,'★ Tawi la Chachika',gFadhiliMw,{female:true});
p('Mwedadi Salehe Mwedadi',13,'★ Tawi la Chachika',gSaleheMw);
p('Iddi Salehe Mwedadi',13,'★ Tawi la Chachika',gSaleheMw);
p('Hemedi Salehe Mwedadi',13,'★ Tawi la Chachika',gSaleheMw);
p('Bi Mwanaidi Salehe Mwedadi',13,'★ Tawi la Chachika',gSaleheMw,{female:true});
p('Huseni / Mwedadi Adam Mwedadi',13,'★ Tawi la Chachika',gAdamMw);
p('Mussa Adamu Mwedadi',13,'★ Tawi la Chachika',gAdamMw);
p('Bi Mwanaidi Adamu Mwedadi',13,'★ Tawi la Chachika',gAdamMw,{female:true});
p('Bi Safia Adamu Mwedadi',13,'★ Tawi la Chachika',gAdamMw,{female:true});
p('Yusufu / Issa Dhahiri Mwedadi',13,'★ Tawi la Chachika',gDhahiriMw);
p('Bi Mariamu Dhahiri Mwedadi',13,'★ Tawi la Chachika',gDhahiriMw,{female:true});
p('Mwedadi Subira Mwedadi',13,'★ Tawi la Chachika',gSubiraMw);
p('Herman Subira Mwedadi',13,'★ Tawi la Chachika',gSubiraMw);
p('Mandela Subira Mwedadi',13,'★ Tawi la Chachika',gSubiraMw);
p('David Subira Mwedadi',13,'★ Tawi la Chachika',gSubiraMw);
p('Mwedadi Nguruta Mwedadi',13,'★ Tawi la Chachika',gNgurutaMw);
p('Mwedadi Ramadhani Mwedadi',13,'★ Tawi la Chachika',gRamadhaniMw);
p('Zahoro Ramadhani Mwedadi',13,'★ Tawi la Chachika',gRamadhaniMw);

// ── Hemedi Kakindo Liana Gen 12 ──
const gAbduHem = p('Alhaj Abdu / Liana Hemedi Liana',12,'★ Tawi la Chachika',gHemediKL,{note:'Alhaj.'});
const gZulfikaHem = p('Dhulfika / Kisenge Hemedi Liana',12,'★ Tawi la Chachika',gHemediKL);
p('Meraji / Kadeghe Hemedi Liana',12,'★ Tawi la Chachika',gHemediKL);
p('Bi Ziada / Nankondo Hemedi Liana',12,'★ Tawi la Chachika',gHemediKL,{female:true});
p('Bi Halima / Latoa Hemedi Liana',12,'★ Tawi la Chachika',gHemediKL,{female:true});
p('Bi Zuhura Hemedi Liana',12,'★ Tawi la Chachika',gHemediKL,{female:true});
p('Bi Aisha Hemedi Liana',12,'★ Tawi la Chachika',gHemediKL,{female:true});
// Hemedi Gen 13
p('Hemedi Abdu Hemedi Liana',13,'★ Tawi la Chachika',gAbduHem);
p('Bi Zahara Abdu Hemedi',13,'★ Tawi la Chachika',gAbduHem,{female:true});
p('Bi Asia Abdu Hemedi',13,'★ Tawi la Chachika',gAbduHem,{female:true});
p('Hafidhi Zulkifil Hemedi',13,'★ Tawi la Chachika',gZulfikaHem);
p('Hasani Zulkifl Hemedi',13,'★ Tawi la Chachika',gZulfikaHem);
p('Bi Mwanahamisi Zulkifl Hemedi',13,'★ Tawi la Chachika',gZulfikaHem,{female:true});

// ── Mwalimu Leonard / Ngayo Liana Gen 12 ──
const gStanleyL = p('Stanley / Liana Leonard Liana',12,'★ Tawi la Chachika',gLeonardL);
const gAnoldL = p('Anold / Omari Leonard Liana',12,'★ Tawi la Chachika',gLeonardL);
const gDuncanL = p('Duncan / Kisenge Leonard Liana',12,'★ Tawi la Chachika',gLeonardL);
p('Robert / Kilonzi Leonard Liana',12,'★ Tawi la Chachika',gLeonardL);
p('Bi Elizabeth / Nankondo Leonard',12,'★ Tawi la Chachika',gLeonardL,{female:true});
p('Bi Julieth / Namshamba Leonard',12,'★ Tawi la Chachika',gLeonardL,{female:true});
p('Bi Flora / Itendera Leonard',12,'★ Tawi la Chachika',gLeonardL,{female:true});
p('Bi Mercy / Thangadi Leonard',12,'★ Tawi la Chachika',gLeonardL,{female:true});
// Leonard Gen 13
p('Leonard / Godwin Stanley Leonard',13,'★ Tawi la Chachika',gStanleyL);
p('Paulo Stanley Leonard',13,'★ Tawi la Chachika',gStanleyL);
p('Bi Edna Stanley Leonard',13,'★ Tawi la Chachika',gStanleyL,{female:true});
p('Leonardo Anold Leonard',13,'★ Tawi la Chachika',gAnoldL);
p('Bi Edna Anold Leonard',13,'★ Tawi la Chachika',gAnoldL,{female:true});
p('Bi Gladness Anold Leonard',13,'★ Tawi la Chachika',gAnoldL,{female:true});
p('Dickson Duncan Leonard',13,'★ Tawi la Chachika',gDuncanL);
p('Denis Duncan Leonard',13,'★ Tawi la Chachika',gDuncanL);
p('Felix / Hassani Duncan Leonard',13,'★ Tawi la Chachika',gDuncanL);

// ── Ramadhani / Kanana Liana Gen 12 ──
const gLianaRam = p('Liana / Hashim Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL);
const gKisengeRam = p('Kisenge Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL);
const gSaidiRam = p('Saidi Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL);
const gShabaniRam = p('Shabani Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL);
const gMustafaRam = p('Mustafa Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL);
p('Mohamedi Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL);
p('Bi Mwajuma Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL,{female:true});
p('Bi Zuhura Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL,{female:true});
p('Bi Mariamu Ramadhani Liana',12,'★ Tawi la Chachika',gRamadhaniL,{female:true});
// Ramadhani Gen 13
p('Hamisi Kisenge Ramadhani',13,'★ Tawi la Chachika',gKisengeRam);
p('Ramadhani Kisenge Ramadhani',13,'★ Tawi la Chachika',gKisengeRam);
p('Bi Mwajuma Kisenge Ramadhani',13,'★ Tawi la Chachika',gKisengeRam,{female:true});
p('Bi Leila Kisenge Ramadhani',13,'★ Tawi la Chachika',gKisengeRam,{female:true});
p('Ramadhani Saidi Ramadhani',13,'★ Tawi la Chachika',gSaidiRam);
p('Bi Hadija Saidi Ramadhani',13,'★ Tawi la Chachika',gSaidiRam,{female:true});
p('Bi Zuhura Saidi Ramadhani',13,'★ Tawi la Chachika',gSaidiRam,{female:true});
p('Bi Sofia Saidi Ramadhani',13,'★ Tawi la Chachika',gSaidiRam,{female:true});
p('Zuhura Shabani Ramadhani',13,'★ Tawi la Chachika',gShabaniRam,{female:true});
p('Lukuman Mustafa Ramadhani',13,'★ Tawi la Chachika',gMustafaRam);
p('Bi Hadija Mustafa Ramadhani',13,'★ Tawi la Chachika',gMustafaRam,{female:true});
p('Bi Shamim Mustafa Ramadhani',13,'★ Tawi la Chachika',gMustafaRam,{female:true});

// ── Hasani / Larema Liana Gen 12 (habari ndogo) ──

p('Kivaria Liana',11,'★ Tawi la Chachika',gLiana,{note:'Habari zake hazijulikani.'});

// Mfumwa Mavura's children (Gen 12)
const gYusufuMav = p('Yusufu Mavura Liana',12,'★ Tawi la Chachika',gMavura);
const gBakariMav = p('Bakari / Mkakari Mavura',12,'★ Tawi la Chachika',gMavura);
const gIddiMav = p('Iddi / Kiyoya Mavura',12,'★ Tawi la Chachika',gMavura);
const gAllyMav = p('Ally / Majaliwa Mavura',12,'★ Tawi la Chachika',gMavura);
const gRamadhaniMav = p('Ramadhani / Mashauri Mavura',12,'★ Tawi la Chachika',gMavura);
const gJumaMav = p('Juma / Mohamedi / Kisenge Mavura',12,'★ Tawi la Chachika',gMavura);
const gHamisiMav = p('Hamisi / Liana Mavura',12,'★ Tawi la Chachika',gMavura);
const gHemediMav = p('Hemedi / Mlemba Mavura',12,'★ Tawi la Chachika',gMavura);
p('Bi Nkutua Mavura',12,'★ Tawi la Chachika',gMavura,{female:true});
p('Bi Natia Mavura',12,'★ Tawi la Chachika',gMavura,{female:true});
p('Bi Nankuku Mavura',12,'★ Tawi la Chachika',gMavura,{female:true});
p('Bi Mwanamisi Mavura',12,'★ Tawi la Chachika',gMavura,{female:true});
p('Bi Hadija / Rhoda Mavura',12,'★ Tawi la Chachika',gMavura,{female:true});

// ── Kizazi 13: Watoto wa Bakari/Mkakari Mavura ──
const gSaidiMavB = p('Saidi / Kachenje Bakari Mavura',13,'★ Tawi la Chachika',gBakariMav);
const gTwahaMavB = p('Twaha / Mcharo Bakari Mavura',13,'★ Tawi la Chachika',gBakariMav);
const gMavuraMavB = p('Mavura / Salehe Bakari Mavura',13,'★ Tawi la Chachika',gBakariMav);
const gRajabuMavB = p('Rajabu / Mavura Bakari Mavura',13,'★ Tawi la Chachika',gBakariMav);
p('Issa Bakari Mavura',13,'★ Tawi la Chachika',gBakariMav);
p('Bi Mwantumu Bakari Mavura',13,'★ Tawi la Chachika',gBakariMav,{female:true});
p('Bi Amina Bakari Mavura',13,'★ Tawi la Chachika',gBakariMav,{female:true});

// ── Kizazi 13: Watoto wa Iddi/Kiyoya Mavura ──
const gSadikiIddi = p('Sadiki Iddi Mavura',13,'★ Tawi la Chachika',gIddiMav);
const gIbrahimuIddi = p('Dr Ibrahimu / Mashinde Iddi Mavura',13,'★ Tawi la Chachika',gIddiMav);
p('Bi Mwanasha Iddi Mavura',13,'★ Tawi la Chachika',gIddiMav,{female:true});
p('Bi Fatuma Iddi Mavura',13,'★ Tawi la Chachika',gIddiMav,{female:true});

// ── Kizazi 13: Watoto wa Ally/Majaliwa Mavura ──
const gAbuduAly = p('Abuu / Alex Ally Mavura',13,'★ Tawi la Chachika',gAllyMav);
const gHashimuAly = p('Mwalimu Hashimu / Kadeghe Ally Mavura',13,'★ Tawi la Chachika',gAllyMav);
const gYasiniAly = p('Mwalimu Yasini / Mashinde Ally Mavura',13,'★ Tawi la Chachika',gAllyMav);
const gMustafaAly = p('Afande Mustafa / Sekiete Ally Mavura',13,'★ Tawi la Chachika',gAllyMav);
p('Yahaya Ally Mavura',13,'★ Tawi la Chachika',gAllyMav);
const gRahimuAly = p('Rahimu Ally Mavura',13,'★ Tawi la Chachika',gAllyMav);
p('Bi Asumina Ally Mavura',13,'★ Tawi la Chachika',gAllyMav,{female:true});
p('Bi Zubeda Ally Mavura',13,'★ Tawi la Chachika',gAllyMav,{female:true});
p('Bi Zena Ally Mavura',13,'★ Tawi la Chachika',gAllyMav,{female:true});
p('Bi Fatina Ally Mavura',13,'★ Tawi la Chachika',gAllyMav,{female:true});
p('Bi Namvua Ally Mavura',13,'★ Tawi la Chachika',gAllyMav,{female:true});

// ── Kizazi 13: Watoto wa Ramadhani/Mashauri Mavura ──
const gIdrisaRam = p('Idrisa Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Mwalimu Abubakari Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Dr Nurdin Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Mabrook Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Daudi Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
const gHemediRam = p('Hemedi Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Rahmatu Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Hassani Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Mashinde Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav);
p('Bi Amina Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav,{female:true});
p('Bi Zainabu Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav,{female:true});
p('Bi Shufaa Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav,{female:true});
p('Bi Tabu Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav,{female:true});
p('Bi Mwanaidi Ramadhani Mavura',13,'★ Tawi la Chachika',gRamadhaniMav,{female:true});

// ── Kizazi 13: Watoto wa Juma/Kisenge Mavura ──
p('Issa Juma Mavura',13,'★ Tawi la Chachika',gJumaMav);
const gMussaJuma = p('Mussa / Mkothi Juma Mavura',13,'★ Tawi la Chachika',gJumaMav);
p('Kasimu Juma Mavura',13,'★ Tawi la Chachika',gJumaMav);
p('Bi Bilhuda Juma Mavura',13,'★ Tawi la Chachika',gJumaMav,{female:true});
p('Bi Fatuma Juma Mavura',13,'★ Tawi la Chachika',gJumaMav,{female:true});
p('Bi Maridhia Juma Mavura',13,'★ Tawi la Chachika',gJumaMav,{female:true});

// ── Kizazi 13: Watoto wa Hamisi/Liana Mavura ──
p('Mapande Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav);
p('Athumani Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav);
p('Wahabi Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav);
p('Bi Mariamu Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav,{female:true});
p('Bi Halima Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav,{female:true});
p('Bi Mwanaidi Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav,{female:true});
p('Bi Samia Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav,{female:true});
p('Bi Kudura Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav,{female:true});
p('Bi Rukaya Hamisi Mavura',13,'★ Tawi la Chachika',gHamisiMav,{female:true});

// ── Kizazi 13: Watoto wa Hemedi/Mlemba Mavura ──
p('Riziwani Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav);
p('Sultani Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav);
p('Mwedadi Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav);
p('Siraji Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav);
p('Mavura Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav);
p('Bi Mwanaidi Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav,{female:true});
p('Bi Maimuna Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav,{female:true});
p('Bi Jaina Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav,{female:true});
p('Bi Mwajabu Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav,{female:true});
p('Bi Ashura Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav,{female:true});
p('Bi Arafa Hemedi Mavura',13,'★ Tawi la Chachika',gHemediMav,{female:true});

// ── Kizazi 14: Watoto wa Rajabu Bakari ──
p('Bakari Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB);
p('Hudi Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB);
p('Juma Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB);
p('Yusufu Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB);
p('Iddi Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB);
p('Ali Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB);
p('Bi Fatuma Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB,{female:true});
p('Bi Mariamu Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB,{female:true});
p('Bi Mwanaidi Rajabu Bakari',14,'★ Tawi la Chachika',gRajabuMavB,{female:true});

// ── Kizazi 14: Watoto wa Saidi Bakari ──
p('Dr Bakari Saidi Bakari',14,'★ Tawi la Chachika',gSaidiMavB);
p('Afande Yusufu Saidi Bakari',14,'★ Tawi la Chachika',gSaidiMavB);
p('Bi Farida Saidi Bakari',14,'★ Tawi la Chachika',gSaidiMavB,{female:true});
p('Bi Sheilah Saidi Bakari',14,'★ Tawi la Chachika',gSaidiMavB,{female:true});
p('Bi Mwanaidi Saidi Bakari',14,'★ Tawi la Chachika',gSaidiMavB,{female:true});
p('Bi Mariamu Saidi Bakari',14,'★ Tawi la Chachika',gSaidiMavB,{female:true});
p('Bakari Twaha Bakari',14,'★ Tawi la Chachika',gTwahaMavB);
p('Bakari Salehe Bakari',14,'★ Tawi la Chachika',gMavuraMavB);
p('Mahudi Salehe Bakari',14,'★ Tawi la Chachika',gMavuraMavB);

// ── Kizazi 14: Watoto wa Ally Mavura children ──
p('Ali Abuu Mavura',14,'★ Tawi la Chachika',gAbuduAly);
p('Joseph Abuu Mavura',14,'★ Tawi la Chachika',gAbuduAly);
p('Pik Abuu Mavura',14,'★ Tawi la Chachika',gAbuduAly);
p('Mahamedi Abuu Mavura',14,'★ Tawi la Chachika',gAbuduAly);
p('Bi Mwajuma Abuu Mavura',14,'★ Tawi la Chachika',gAbuduAly,{female:true});
p('Bi Bernadeta Abuu Mavura',14,'★ Tawi la Chachika',gAbuduAly,{female:true});
p('Ali Hashimu Mavura',14,'★ Tawi la Chachika',gHashimuAly);
p('Rajabu Hashimu Mavura',14,'★ Tawi la Chachika',gHashimuAly);
p('Hemedi Hashimu Mavura',14,'★ Tawi la Chachika',gHashimuAly);
p('Saidi Hashimu Mavura',14,'★ Tawi la Chachika',gHashimuAly);
p('Ali Yasini Mavura',14,'★ Tawi la Chachika',gYasiniAly);
p('Hasani Yasini Mavura',14,'★ Tawi la Chachika',gYasiniAly);
p('Hemedi Yasini Mavura',14,'★ Tawi la Chachika',gYasiniAly);
p('Bi Farida Yasini Mavura',14,'★ Tawi la Chachika',gYasiniAly,{female:true});
p('Ali Mustafa Mavura',14,'★ Tawi la Chachika',gMustafaAly);
p('Bi Mwajuma Mustafa Mavura',14,'★ Tawi la Chachika',gMustafaAly,{female:true});
p('Ali Rahimu Mavura',14,'★ Tawi la Chachika',gRahimuAly);
p('Bi Mwanasha Rahimu Mavura',14,'★ Tawi la Chachika',gRahimuAly,{female:true});

// ── Kizazi 14: Ramadhani Mavura children ──
p('Togolani Idrisa Ramadhani',14,'★ Tawi la Chachika',gIdrisaRam);
p('Bi Hadija Idrisa Ramadhani',14,'★ Tawi la Chachika',gIdrisaRam,{female:true});
p('Bi Magdalena Idrisa Ramadhani',14,'★ Tawi la Chachika',gIdrisaRam,{female:true});
p('Bi Jay-Maria Idrisa Ramadhani',14,'★ Tawi la Chachika',gIdrisaRam,{female:true});
p('Ramadhani Hemedi Ramadhani Mavura',14,'★ Tawi la Chachika',gHemediRam);
p('Ibrahim Hemedi Ramadhani Mavura',14,'★ Tawi la Chachika',gHemediRam);

// ── Kizazi 14: Juma Mavura children ──
p('Kisenge Mussa Juma',14,'★ Tawi la Chachika',gMussaJuma);
p('Shabani Mussa Juma',14,'★ Tawi la Chachika',gMussaJuma);
p('Bi Mwajabu Mussa Juma',14,'★ Tawi la Chachika',gMussaJuma,{female:true});
p('Bi Swaumu Mussa Juma',14,'★ Tawi la Chachika',gMussaJuma,{female:true});

// ── Kizazi 14: Iddi Mavura children ──
p('Iddi Sadiki Iddi Mavura',14,'★ Tawi la Chachika',gSadikiIddi);
p('Fadhili Sadiki Iddi Mavura',14,'★ Tawi la Chachika',gSadikiIddi);
p('Bi Zainabu Sadiki Iddi Mavura',14,'★ Tawi la Chachika',gSadikiIddi,{female:true});
p('Bi Amina Sadiki Iddi Mavura',14,'★ Tawi la Chachika',gSadikiIddi,{female:true});
p('Iddi Ibrahimu Iddi Mavura',14,'★ Tawi la Chachika',gIbrahimuIddi);
p('Semboja Ibrahimu Iddi Mavura',14,'★ Tawi la Chachika',gIbrahimuIddi);
p('Bi Fatuma Ibrahimu Iddi Mavura',14,'★ Tawi la Chachika',gIbrahimuIddi,{female:true});
p('Bi Zeinabu Ibrahimu Iddi Mavura',14,'★ Tawi la Chachika',gIbrahimuIddi,{female:true});

// Yusufu Mavura's children (Gen 13)  -  ★ Alhaji Issa Mlao is here!
const gAlhajiIssa = p('Alhaji Issa Mlao Mavura',13,'★ Tawi la Chachika',gYusufuMav,{
  note:'★ MWANDISHI wa kitabu kikuu cha historia ya Wambaga (2020). Jina lake kamili: Alhaji Issa Mlao Yusufu Mavura. Yeye ni mzao wa Chachika (chifu wa kwanza wa Usangi) kupitia Ghuhia → Liana → Mavura → Yusufu → Alhaji Issa. Historia aliyoiandika ni hazina ya ukoo wote wa Wambaga.'});
p('Ahmedi Yusufu Mavura',13,'★ Tawi la Chachika',gYusufuMav);
p('Fadhili Yusufu Mavura',13,'★ Tawi la Chachika',gYusufuMav);
p('Awadhi Yusufu Mavura',13,'★ Tawi la Chachika',gYusufuMav);
p('Kasimu Yusufu Mavura',13,'★ Tawi la Chachika',gYusufuMav);
p('Prof Walidi Yusufu Mavura',13,'★ Tawi la Chachika',gYusufuMav,{note:'Profesa.'});

// Issa/Mlao Liana's children (Gen 12)
const gMfumwaAthum = p('Mfumwa Athumani Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{
  note:'Alitawazwa Chifu Mkuu wa Wambaga wote wa Usangi mwaka 1985 kwa njia ya mila za Kipare. Alioa binti ya Kiagho Varisanga (tawi la Bangalala)  -  kuunganisha matawi mawili makuu.',
  location:'Usangi'});
p('Kiondo Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana);
p('Kisenge Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana);

// ══════════════════════════════════════════════════════════════════════
// TAWI LA CHACHIKA  -  MRONGA  -  EXTENDED
// ══════════════════════════════════════════════════════════════════════

const gMangare = p('Mangare Mronga',10,'★ Tawi la Chachika',gMronga,{location:'Mangare, Mkindi'});
const gMpoa = p('Mpoa Mronga',10,'★ Tawi la Chachika',gMronga);

// Mangare's children (Gen 11)
const gCharokiwaM = p('Charokiwa Mangare',11,'★ Tawi la Chachika',gMangare);
const gKisengeM = p('Kisenge Mangare',11,'★ Tawi la Chachika',gMangare);
const gMahunaM = p('Mahuna Mangare',11,'★ Tawi la Chachika',gMangare);
const gKiureM = p('Kiure Mangare',11,'★ Tawi la Chachika',gMangare);
const gMkindi = p('Mkindi Mangare',11,'★ Tawi la Chachika',gMangare,{location:'Mkindi'});
const gTehenaM = p('Tehena / Musa Mangare',11,'★ Tawi la Chachika',gMangare,{note:'Habari za uzao wake hazikuandikwa.'});
const gHassaniM = p('Hassani Mangare',11,'★ Tawi la Chachika',gMangare);
const gSelemaniM = p('Selemani Mangare',11,'★ Tawi la Chachika',gMangare);
p('Bi Mwaro Mangare',11,'★ Tawi la Chachika',gMangare,{female:true});
p('Bi Esteri / Nangera Mangare',11,'★ Tawi la Chachika',gMangare,{female:true});
p('Bi Nankondo Mangare',11,'★ Tawi la Chachika',gMangare,{female:true});
p('Bi Mtende Mangare',11,'★ Tawi la Chachika',gMangare,{female:true});

// Mkindi children (Gen 12)
p('Mkulungu Mkindi',12,'★ Tawi la Chachika',gMkindi);
p('Shabani Mkindi',12,'★ Tawi la Chachika',gMkindi);
// [Mkindi watoto wamehamia sehemu ya Mangare hapa chini]

// ══════════════════════════════════════════════════════════════════════
// TAWI LA CHACHIKA  -  LUNGA  -  EXTENDED
// ══════════════════════════════════════════════════════════════════════

const gKibakaya = p('Kibakaya Lunga',10,'★ Tawi la Chachika',gLunga,{location:'Kibakaya'});
p('Bi Mtundu Lunga',10,'★ Tawi la Chachika',gLunga,{female:true,
  note:'Aliolewa na Kanyempwe (Tekina)  -  mama wa Tekina Kanyempwe.'});

// Kibakaya children (Gen 11)
const gSaidiKib = p('Saidi Kibakaya Lunga',11,'★ Tawi la Chachika',gKibakaya);
const gMussaKib = p('Mussa / Mlungwana Kibakaya Lunga',11,'★ Tawi la Chachika',gKibakaya);
const gTimotheoK = p('Mwalimu Timotheo Kibakaya Lunga',11,'★ Tawi la Chachika',gKibakaya);
const gSelemaniKib = p('Selemani Kibakaya Lunga',11,'★ Tawi la Chachika',gKibakaya);
p('Bi Ester Kibakaya',11,'★ Tawi la Chachika',gKibakaya,{female:true});
p('Bi Nakulangwa Kibakaya',11,'★ Tawi la Chachika',gKibakaya,{female:true});
p('Bi Halima Kibakaya',11,'★ Tawi la Chachika',gKibakaya,{female:true});

// Timotheo Kibakaya children (Gen 12)
const gRogersT = p('Rogers / Kibakaya Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK);
const gJimmyT = p('Jimmy / Kahema Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK);
const gWistonT = p('Wiston / Liana Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK);
const gMosesT = p('Moses / Ngulue Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK);
const gGeorgeT = p('George / Martine Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK);
const gYateraT = p('Yatera / Oliver Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK);
p('Bi Mary Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK,{female:true});
p('Bi Eline Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK,{female:true});
p('Bi Rose Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK,{female:true});
p('Bi Emma Timotheo Kibakaya',12,'★ Tawi la Chachika',gTimotheoK,{female:true});

// ══════════════════════════════════════════════════════════════════════
// TAWI LA CHACHIKA  -  MBURIA  -  EXTENDED
// ══════════════════════════════════════════════════════════════════════

const gMburiaC = p('Mburia Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Watoto wake: Nziamwe na Kadari - wote wawili ni watoto wa Mburia (si wa Kadari). Uzao wa Kadari unaendelea kupitia Lewanga na Salimu hadi kizazi cha 14.'});
const gNziamweMb = p('Nziamwe Mburia Chachika',10,'★ Tawi la Chachika',gMburiaC);
const gTerindwaN = p('Terindwa Nziamwe Mburia',11,'★ Tawi la Chachika',gNziamweMb);
p('Mkomba Nziamwe Mburia',11,'★ Tawi la Chachika',gNziamweMb);
const gKadariMb = p('Kadari Mburia',10,'★ Tawi la Chachika',gMburiaC,{note:'Mtoto wa Mburia Chachika. Baba wa Lewanga.'});
const gLewanga = p('Lewanga Kadari',11,'★ Tawi la Chachika',gKadariMb);

// Lewanga children (Gen 12)
const gJuaeliL = p('Juaeli Lewanga Kadari',12,'★ Tawi la Chachika',gLewanga);
const gSalimuL = p('Salimu / Kaburu Lewanga Kadari',12,'★ Tawi la Chachika',gLewanga);
p('Bi Nandera Lewanga',12,'★ Tawi la Chachika',gLewanga,{female:true});
p('Bi Nakivona Lewanga',12,'★ Tawi la Chachika',gLewanga,{female:true});

// Salimu Lewanga children (Gen 13)  -  highly prolific
const gHashimuS = p('Hashimu Salimu',13,'★ Tawi la Chachika',gSalimuL);
const gRasuliS = p('Rasuli / Ali Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL);
const gAziziS = p('Azizi Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL);
const gKhalidiS = p('Halidi / Khalidi Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL);
p('Abdalah Salimu',13,'★ Tawi la Chachika',gSalimuL);
p('Abubakari Salimu',13,'★ Tawi la Chachika',gSalimuL);
p('Faraji Salimu',13,'★ Tawi la Chachika',gSalimuL);
p('Selemani Salimu',13,'★ Tawi la Chachika',gSalimuL);

// Hashimu Salimu children (Gen 14)
p('Shabani Hashimu',14,'★ Tawi la Chachika',gHashimuS);
p('Abdulrazak Hashimu',14,'★ Tawi la Chachika',gHashimuS);
p('Bi Mariamu Hashimu',14,'★ Tawi la Chachika',gHashimuS,{female:true});
p('Bi Mwajuma Hashimu',14,'★ Tawi la Chachika',gHashimuS,{female:true});
p('Bi Rukia Hashimu',14,'★ Tawi la Chachika',gHashimuS,{female:true});
p('Bi Hadija Hashimu',14,'★ Tawi la Chachika',gHashimuS,{female:true});

// ══════════════════════════════════════════════════════════════════════
// TAWI LA CHACHIKA  -  MAGIRI  -  EXTENDED
// ══════════════════════════════════════════════════════════════════════

const gNgombeG = p("Ng'ombehema Magiri",10,'★ Tawi la Chachika',gMagiriC);
const gMadenkera = p('Madenkera Magiri',10,'★ Tawi la Chachika',gMagiriC);
p('Kiraghinja Magiri',10,'★ Tawi la Chachika',gMagiriC,{note:'Alifariki bila watoto.'});
p('Mkomba Madenkera Magiri',11,'★ Tawi la Chachika',gMadenkera);

const gMzimu = p('Mzimu Ngombehema',11,'★ Tawi la Chachika',gNgombeG);
const gSimioniMz = p('Simioni Mzimu Ngombehema',12,'★ Tawi la Chachika',gMzimu);
const gEpaM = p('Epaphrdito / Epa Mzimu Ngombehema',12,'★ Tawi la Chachika',gMzimu);
const gGadieliM = p('Gadieli Mzimu Ngombehema',12,'★ Tawi la Chachika',gMzimu);
p('Bi Mwajuma Mzimu',12,'★ Tawi la Chachika',gMzimu,{female:true});

// ══════════════════════════════════════════════════════════════════════
// TAWI LA CHASIMBA  -  MAGWERO  -  EXTENDED (Munga → Suedi → Kanali Yunusi)
// ══════════════════════════════════════════════════════════════════════

const gMungaMag = p('Munga Magwero',11,'Tawi la Chasimba',gMagwero,{note:'Mtoto wa kwanza wa Magwero Kengia Chasimba.'});
const gNyataM = p('Nyata / Juma Magwero',11,'Tawi la Chasimba',gMagwero);
p('Musa Magwero',11,'Tawi la Chasimba',gMagwero);
p('Isumaili Magwero',11,'Tawi la Chasimba',gMagwero);
p('Kimweri Magwero',11,'Tawi la Chasimba',gMagwero);

// Munga Magwero children (Gen 12)
const gSuediMag = p('Suedi Munga Magwero',12,'Tawi la Chasimba',gMungaMag,{
  note:'Baba wa Kanali Yunusi (Gen 13).'});
p('Bashari Munga Magwero',12,'Tawi la Chasimba',gMungaMag);
p('Mlavi Munga Magwero',12,'Tawi la Chasimba',gMungaMag);
p('Shadda Munga Magwero',12,'Tawi la Chasimba',gMungaMag);
p('Akili Munga Magwero',12,'Tawi la Chasimba',gMungaMag);
p('Hasani Munga Magwero',12,'Tawi la Chasimba',gMungaMag);
p('Burhani Munga Magwero',12,'Tawi la Chasimba',gMungaMag);

// Suedi Munga son
p('Kanali Yunusi Suedi Magwero',13,'Tawi la Chasimba',gSuediMag,{
  note:'Kanali  -  afisa wa jeshi. Kizazi cha 13 cha ukoo wa Wambaga (kutoka Bagha).'});


// ══════════════════════════════════════════
// BRANCHES CONFIG
// ══════════════════════════════════════════


// ════════════════════════════════════════════
// MASHINDE / KASIMU LIANA — Watoto (Kiz.12)
// ════════════════════════════════════════════
const gSalimuMash = p('Salimu / Nzinyangwa Mashinde Liana',12,'★ Tawi la Chachika',gMashindeL);
const gSeleMash = p('Selemani / Laurence Mashinde Liana',12,'★ Tawi la Chachika',gMashindeL,{note:'Alihamia Makuyuni Korogwe.',location:'Makuyuni, Korogwe'});
const gAllyMash = p('Ally Mashinde Liana',12,'★ Tawi la Chachika',gMashindeL);
p('Bi Nandera Mashinde Liana',12,'★ Tawi la Chachika',gMashindeL,{female:true});

// Kizazi 13 — Watoto wa Salimu Mashinde
p('Mavura Salimu Mashinde',13,'★ Tawi la Chachika',gSalimuMash);
p('Mndewa Salimu Mashinde',13,'★ Tawi la Chachika',gSalimuMash);
p('Bi Fatina Salimu Mashinde',13,'★ Tawi la Chachika',gSalimuMash,{female:true});
p('Bi Naki Salimu Mashinde',13,'★ Tawi la Chachika',gSalimuMash,{female:true});
p('Bi Nankondo / Stella Salimu Mashinde',13,'★ Tawi la Chachika',gSalimuMash,{female:true});

// Kizazi 13 — Watoto wa Selemani Mashinde
p('Faidan Selemani Mashinde',13,'★ Tawi la Chachika',gSeleMash);
p('Nathan Selemani Mashinde',13,'★ Tawi la Chachika',gSeleMash);
p('Dolfet Selemani Mashinde',13,'★ Tawi la Chachika',gSeleMash);
p('Bi Hawa Selemani Mashinde',13,'★ Tawi la Chachika',gSeleMash,{female:true});
p('Bi Monica Selemani Mashinde',13,'★ Tawi la Chachika',gSeleMash,{female:true});

// Kizazi 13 — Watoto wa Ally Mashinde
p('Athumani Ally Mashinde',13,'★ Tawi la Chachika',gAllyMash);
p('Mohamedi / Mavura Ally Mashinde',13,'★ Tawi la Chachika',gAllyMash);

// ════════════════════════════════════════════
// HASANI / LAREMA LIANA — Watoto (Kiz.12)
// ════════════════════════════════════════════
const gAyubuHas = p('Ayubu / Liana Hasani Liana',12,'★ Tawi la Chachika',gHasaniL,{born:'20/5/1928'});
const gHamisiHas = p('Hamisi / Ngereka Hasani Liana',12,'★ Tawi la Chachika',gHasaniL);
const gAsadHas = p('Arahmani / Kisenge / Asad Hasani Liana',12,'★ Tawi la Chachika',gHasaniL);
const gIzhakiHas = p('Izhaki / Mashauri Hasani Liana',12,'★ Tawi la Chachika',gHasaniL);
const gYateraHas = p('Yatera / Awadh / Saidi Hasani Liana',12,'★ Tawi la Chachika',gHasaniL);
const gJafaryHas = p('Jafary / Juma Hasani Liana',12,'★ Tawi la Chachika',gHasaniL);
p('Bi Mwanamisi / Nankondo Hasani Liana',12,'★ Tawi la Chachika',gHasaniL,{female:true});
p('Bi Halima Hasani Liana',12,'★ Tawi la Chachika',gHasaniL,{female:true});

// Kizazi 13 — Watoto wa Ayubu Hasani
p('Hasani / Larema Ayubu Hasani',13,'★ Tawi la Chachika',gAyubuHas);
p('Bi Asma / Tabu / Mariamu Ayubu Hasani',13,'★ Tawi la Chachika',gAyubuHas,{female:true});
p('Bi Tunu / Mwanaiza Ayubu Hasani',13,'★ Tawi la Chachika',gAyubuHas,{female:true});

// Kizazi 13 — Watoto wa Hamisi Hasani
p('Nasser / Hasani Hamisi Hasani',13,'★ Tawi la Chachika',gHamisiHas);
p('Nurdin / Babuu Hamisi Hasani',13,'★ Tawi la Chachika',gHamisiHas);
p('Bi Hope Hamisi Hasani',13,'★ Tawi la Chachika',gHamisiHas,{female:true});
p('Bi Shaina / Mandom Hamisi Hasani',13,'★ Tawi la Chachika',gHamisiHas,{female:true});

// Kizazi 13 — Watoto wa Arahmani/Asad Hasani
p('Aziz / Leonardo Arahmani Hasani',13,'★ Tawi la Chachika',gAsadHas);
p('Yasini / Simioni Arahmani Hasani',13,'★ Tawi la Chachika',gAsadHas);

// Kizazi 13 — Watoto wa Izhaki Hasani
p('Issa Izhaki Hasani',13,'★ Tawi la Chachika',gIzhakiHas);
p('Bi Maida / Namkari Izhaki Hasani',13,'★ Tawi la Chachika',gIzhakiHas,{female:true});

// Kizazi 13 — Watoto wa Yatera Hasani
p('Hasani Yatera Hasani',13,'★ Tawi la Chachika',gYateraHas);
p('Bi Zulfa Yatera Hasani',13,'★ Tawi la Chachika',gYateraHas,{female:true});
p('Bi Mariamu Yatera Hasani',13,'★ Tawi la Chachika',gYateraHas,{female:true});

// Kizazi 13 — Watoto wa Jafary Hasani
p('Hasani Jafary Hasani',13,'★ Tawi la Chachika',gJafaryHas);
p('Tariq Jafary Hasani',13,'★ Tawi la Chachika',gJafaryHas);
p('Ahmedi Jafary Hasani',13,'★ Tawi la Chachika',gJafaryHas);

// ════════════════════════════════════════════
// YUSUFU MAVURA — Watoto waliokosekana (Kiz.12→13)
// ════════════════════════════════════════════
const gAhmediYus = p('Ahmedi / Mavura Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav);
const gFadhiliYus = p('Fadhili / Kimomwe Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav);
const gAwadhiYus = p('Awadhi / Mavura Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav);
const gKassimuYus = p('Kassimu / Mashinde Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav);
const gAlhajiYus = p('Alhaji Issa / Mlao Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav);
const gWalidiYus = p('Prof Walidi / Mnaya Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav);
p('Bi Rafia / Kodawa Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav,{female:true});
p('Bi Safina / Kishughudu Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav,{female:true});
p('Bi Asia / Kodawa Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav,{female:true});
p('Bi Hajat Rozina / Nanduli Yusufu Mavura',12,'★ Tawi la Chachika',gYusufuMav,{female:true});

// Kizazi 13 — Watoto wa Ahmedi Yusufu
const gYusufuAhm = p('Yusufu / Kicherumbe Ahmedi Yusufu',13,'★ Tawi la Chachika',gAhmediYus);
const gYunusiAhm = p('Yunusi / Onesmo Ahmedi Yusufu',13,'★ Tawi la Chachika',gAhmediYus);
const gAbubakariAhm = p('Abubakari / Mkakari Ahmedi Yusufu',13,'★ Tawi la Chachika',gAhmediYus);
const gDaudiAhm = p('Daudi / Timotheo Ahmedi Yusufu',13,'★ Tawi la Chachika',gAhmediYus);
p('Bi Zeituni / Kipwele Ahmedi Yusufu',13,'★ Tawi la Chachika',gAhmediYus,{female:true});

// Kizazi 13 — Watoto wa Awadhi Yusufu
p('Yusufu Awadhi Yusufu Mavura',13,'★ Tawi la Chachika',gAwadhiYus);
p('Bi Amina Mkubwa Awadhi Yusufu',13,'★ Tawi la Chachika',gAwadhiYus,{female:true});
p('Bi Amina Mdogo Awadhi Yusufu',13,'★ Tawi la Chachika',gAwadhiYus,{female:true});

// Kizazi 13 — Watoto wa Kassimu Yusufu
const gYusufuKas = p('Yusufu / Kanyempwe Kassimu Yusufu',13,'★ Tawi la Chachika',gKassimuYus);
const gAliKas = p('Ali Kassimu Yusufu Mavura',13,'★ Tawi la Chachika',gKassimuYus);
const gBakariKas = p('Bakari Kassimu Yusufu Mavura',13,'★ Tawi la Chachika',gKassimuYus);
p('Bi Tabu / Nema Kassimu Yusufu',13,'★ Tawi la Chachika',gKassimuYus,{female:true});
p('Bi Mwanaidi / Beresha Kassimu Yusufu',13,'★ Tawi la Chachika',gKassimuYus,{female:true});
p('Bi Fatuma / Mwaro Kassimu Yusufu',13,'★ Tawi la Chachika',gKassimuYus,{female:true});
p('Bi Mwajuma Kassimu Yusufu',13,'★ Tawi la Chachika',gKassimuYus,{female:true});

// Kizazi 13 — Watoto wa Fadhili Yusufu
const gYusufuFad = p('Yusufu Fadhili Yusufu',13,'★ Tawi la Chachika',gFadhiliYus);
const gNasibuFad = p('Nasibu Fadhili Yusufu',13,'★ Tawi la Chachika',gFadhiliYus);
const gNasoroFad = p('Afande Nasoro Fadhili Yusufu',13,'★ Tawi la Chachika',gFadhiliYus);
p('Azizi Fadhili Yusufu',13,'★ Tawi la Chachika',gFadhiliYus);
p('Bi Mwajabu Fadhili Yusufu',13,'★ Tawi la Chachika',gFadhiliYus,{female:true});
p('Bi Mwalimu Mwanaidi Fadhili Yusufu',13,'★ Tawi la Chachika',gFadhiliYus,{female:true});
p('Bi Mwalimu Sharifa Fadhili Yusufu',13,'★ Tawi la Chachika',gFadhiliYus,{female:true});

// Kizazi 13 — Watoto wa Alhaji Issa/Mlao Yusufu
const gLianaIssaYus = p('Liana / Athumani Issa Yusufu',13,'★ Tawi la Chachika',gAlhajiYus);
const gMahamediIssaYus = p('Mahamedi / Mlanga Issa Yusufu',13,'★ Tawi la Chachika',gAlhajiYus);
const gYusufuIssaYus = p('Yusufu / Kicherumbe Issa Yusufu',13,'★ Tawi la Chachika',gAlhajiYus);
p('Bi Zena / Ezena Issa Yusufu',13,'★ Tawi la Chachika',gAlhajiYus,{female:true});
p('Bi Farida / Namvua Issa Yusufu',13,'★ Tawi la Chachika',gAlhajiYus,{female:true});

// Kizazi 13 — Watoto wa Prof Walidi Yusufu
p('Yusufu / Kicherumbe Mnaya Yusufu',13,'★ Tawi la Chachika',gWalidiYus);
p('Bi Eng Beresha Mnaya Yusufu',13,'★ Tawi la Chachika',gWalidiYus,{female:true});

// Kizazi 14 — Watoto wa Ahmedi Yusufu children
p('Bi Saida Yusufu Ahmedi Yusufu',14,'★ Tawi la Chachika',gYusufuAhm,{female:true});
p('Bi Vicky Yusufu Ahmedi Yusufu',14,'★ Tawi la Chachika',gYusufuAhm,{female:true});
p('Hamisi Yunusi Ahmedi Yusufu',14,'★ Tawi la Chachika',gYunusiAhm);
p('Hamad Yunusi Ahmedi Yusufu',14,'★ Tawi la Chachika',gYunusiAhm);
p('Bi Nasra Yunusi Ahmedi Yusufu',14,'★ Tawi la Chachika',gYunusiAhm,{female:true});
p('Bi Rispa Abubakari Ahmedi Yusufu',14,'★ Tawi la Chachika',gAbubakariAhm,{female:true});
p('Bi Fidea Abubakari Ahmedi Yusufu',14,'★ Tawi la Chachika',gAbubakariAhm,{female:true});
p('Bi Esha Abubakari Ahmedi Yusufu',14,'★ Tawi la Chachika',gAbubakariAhm,{female:true});
p('Bi Matha Abubakari Ahmedi Yusufu',14,'★ Tawi la Chachika',gAbubakariAhm,{female:true});
p('Bi Halima Daudi Ahmedi Yusufu',14,'★ Tawi la Chachika',gDaudiAhm,{female:true});
p('Bi Rukia Daudi Ahmedi Yusufu',14,'★ Tawi la Chachika',gDaudiAhm,{female:true});
p('Bi Zaituni Daudi Ahmedi Yusufu',14,'★ Tawi la Chachika',gDaudiAhm,{female:true});
p('Bi Laura Daudi Ahmedi Yusufu',14,'★ Tawi la Chachika',gDaudiAhm,{female:true});
p('Bi Lisa Daudi Ahmedi Yusufu',14,'★ Tawi la Chachika',gDaudiAhm,{female:true});

// Kizazi 14 — Kassimu Yusufu children
p('Mashinde Yusufu Kassimu Yusufu',14,'★ Tawi la Chachika',gYusufuKas);
p('Saidi Yusufu Kassimu Yusufu',14,'★ Tawi la Chachika',gYusufuKas);
p('Samir Ali Kassimu Yusufu',14,'★ Tawi la Chachika',gAliKas);
p('Nabil Ali Kassimu Yusufu',14,'★ Tawi la Chachika',gAliKas);
p('Bi Hawa Bakari Kassimu Yusufu',14,'★ Tawi la Chachika',gBakariKas,{female:true});

// Kizazi 14 — Fadhili Yusufu children
p('Fadhili Yusufu Fadhili Yusufu',14,'★ Tawi la Chachika',gYusufuFad);
p('Bi Aisha Yusufu Fadhili',14,'★ Tawi la Chachika',gYusufuFad,{female:true});
p('Bi Fatuma Yusufu Fadhili',14,'★ Tawi la Chachika',gYusufuFad,{female:true});
p('Bi Batuli Yusufu Fadhili',14,'★ Tawi la Chachika',gYusufuFad,{female:true});
p('Hamadi Nasibu Fadhili',14,'★ Tawi la Chachika',gNasibuFad);
p('Bi Safia Nasibu Fadhili',14,'★ Tawi la Chachika',gNasibuFad,{female:true});
p('Bi Risper Nasibu Fadhili',14,'★ Tawi la Chachika',gNasibuFad,{female:true});
p('Mnaya Nasoro Fadhili',14,'★ Tawi la Chachika',gNasoroFad);
p('Lukuman Nasoro Fadhili',14,'★ Tawi la Chachika',gNasoroFad);
p('Bi Hawa Nasoro Fadhili',14,'★ Tawi la Chachika',gNasoroFad,{female:true});

// Kizazi 14 — Alhaji Issa Yusufu children
p('Faridi Liana Issa Yusufu',14,'★ Tawi la Chachika',gLianaIssaYus);
p('Nasri / Mlao Mahamedi Issa Yusufu',14,'★ Tawi la Chachika',gMahamediIssaYus);
p('Mnaya / Ayman Mahamedi Issa Yusufu',14,'★ Tawi la Chachika',gMahamediIssaYus);
p('Faisl / Mlao Yusufu Issa Yusufu',14,'★ Tawi la Chachika',gYusufuIssaYus);
p('Fahad Yusufu Issa Yusufu',14,'★ Tawi la Chachika',gYusufuIssaYus);

// ════════════════════════════════════════════
// MLAO / ISAE LIANA — Watoto zaidi (Kiz.12→13→14)
// ════════════════════════════════════════════
// gMlaoLiana has: gMfumwaAthum (no children yet), plus Hamza and Kisenge missing
const gHamzaIsae = p('Hamza / Kiondo Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana);
const gKisengeIsae = p('Kisenge / Isumaili Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana);
p('Bi Amina Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Hedi Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Nadhani / Mwanaidi Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Mwanahawa / Varirwe Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Mwanamisi Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Husina Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Nuru / Nakiete Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Batuli / Kitente Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Tabu / Nanzia Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Zaina / Angelina Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});
p('Bi Mwantumu Issa Liana',12,'★ Tawi la Chachika',gMlaoLiana,{female:true});

// Kizazi 13 — Athumani Issa Liana children
const gDrIssaAthu = p('Dr Issa / Mlao Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum,{note:'Mfumwa Athumani alitawazwa chifu wa Wambaga wote wa Usangi 1985.'});
p('Jafari / Kiagho Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum);
const gDaudiAthu = p('Daudi / Kihara Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum);
p('Selemani / Sele Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum);
p('Mavura / Ahmedi Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum);
p('Bi Halima / Namkari Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum,{female:true});
p('Bi Zaina / Nambojo Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum,{female:true});
p('Bi Mwajuma / Nanduli Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum,{female:true});
p('Bi Mariamu / Kaogo Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum,{female:true});
p('Bi Ashura Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum,{female:true});
p('Bi Mwajabu Athumani Liana',13,'★ Tawi la Chachika',gMfumwaAthum,{female:true});

// Kizazi 13 — Hamza/Kiondo children
const gAdamuHam = p('Adamu / Mweshehe Hamza Issa',13,'★ Tawi la Chachika',gHamzaIsae);
const gHemediHam = p('Hemedi / Kakindo Hamza Issa',13,'★ Tawi la Chachika',gHamzaIsae);
const gHoseniHam = p('Hoseni Hamza Issa',13,'★ Tawi la Chachika',gHamzaIsae);
p('Ali / Makoko Hamza Issa',13,'★ Tawi la Chachika',gHamzaIsae);
p('Bi Salima / Mwanamisi Hamza Issa',13,'★ Tawi la Chachika',gHamzaIsae,{female:true});
p('Bi Safia Hamza Issa',13,'★ Tawi la Chachika',gHamzaIsae,{female:true});
p('Bi Halima / Namkari Hamza Issa',13,'★ Tawi la Chachika',gHamzaIsae,{female:true});

// Kizazi 13 — Kisenge/Isumaili children
const gIssaKis = p('Issa / Mweshehe Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae);
const gHassaniKis = p('Hassani Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae);
const gMussaKis = p('Mussa Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae);
const gIssaIIKis = p('Issa II Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae);
p('Bi Juwaria Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae,{female:true});
p('Bi Binzua Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae,{female:true});
p('Bi Kodawa / Amina Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae,{female:true});
p('Bi Warda Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae,{female:true});
p('Bi Mwajuma Kisenge Issa',13,'★ Tawi la Chachika',gKisengeIsae,{female:true});

// Kizazi 14 — Athumani children
p('Kicherumbe / Yusufu Mlao Athumani',14,'★ Tawi la Chachika',gDrIssaAthu);
p('George / Issa Mlao Athumani',14,'★ Tawi la Chachika',gDrIssaAthu);
p('Bi Jamila / Elizabeth Daudi Athumani',14,'★ Tawi la Chachika',gDaudiAthu,{female:true});
p('Bi Nakio / Amina Daudi Athumani',14,'★ Tawi la Chachika',gDaudiAthu,{female:true});

// Kizazi 14 — Hamza/Kisenge children
p('Hamza Hemedi Hamza Issa',14,'★ Tawi la Chachika',gHemediHam);
p('Amrani Hemedi Hamza Issa',14,'★ Tawi la Chachika',gHemediHam);
p('Kauthari Hoseni Hamza Issa',14,'★ Tawi la Chachika',gHoseniHam);
p('Bi Aisha Hoseni Hamza Issa',14,'★ Tawi la Chachika',gHoseniHam,{female:true});
p('Bi Amina Hoseni Hamza Issa',14,'★ Tawi la Chachika',gHoseniHam,{female:true});
p('Bi Aisha Adamu Hamza Issa',14,'★ Tawi la Chachika',gAdamuHam,{female:true});
p('Bi Nema Adamu Hamza Issa',14,'★ Tawi la Chachika',gAdamuHam,{female:true});

// Kizazi 14 — Kisenge/Isumaili children
p('Kisenge / Burhani Issa Kisenge',14,'★ Tawi la Chachika',gIssaKis);
p('Bi Neema Issa Kisenge',14,'★ Tawi la Chachika',gIssaKis,{female:true});
p('Bi Sharifa Issa Kisenge',14,'★ Tawi la Chachika',gIssaKis,{female:true});
p('Hamilton Hassani Kisenge',14,'★ Tawi la Chachika',gHassaniKis);
p('Harith Hassani Kisenge',14,'★ Tawi la Chachika',gHassaniKis);
p('Bi Haillyness Hassani Kisenge',14,'★ Tawi la Chachika',gHassaniKis,{female:true});
p('Isumaili Mussa Kisenge',14,'★ Tawi la Chachika',gMussaKis);
p('Isumaili Issa Kisenge II',14,'★ Tawi la Chachika',gIssaIIKis);
p('Athumani Issa Kisenge II',14,'★ Tawi la Chachika',gIssaIIKis);
p('Bi Nasma Issa Kisenge II',14,'★ Tawi la Chachika',gIssaIIKis,{female:true});

// ════════════════════════════════════════════
// RAMADHANI/KANANA LIANA — Watoto wa kumi zaidi
// ════════════════════════════════════════════
// gRamadhaniL already has 9 children — add kizazi 14

// ════════════════════════════════════════════════════════════════════
// YATERA GHUHIA — Kizazi 11 (watoto) → 12 → 13
// ════════════════════════════════════════════════════════════════════
const gYetiroY = p('Yetiro / Ghuhia / Abdallah Yatera',11,'★ Tawi la Chachika',gYateraG,{died:'1954'});
const gAbdulrahY = p('Abdulrahmani / Mwarabu Yatera',11,'★ Tawi la Chachika',gYateraG);
const gAllenY = p('Dr Allen / Ally Yatera',11,'★ Tawi la Chachika',gYateraG);
const gAthumaniY = p('Athumani / Irema Yatera',11,'★ Tawi la Chachika',gYateraG);
const gJumaY = p('Juma Yatera',11,'★ Tawi la Chachika',gYateraG);
const gRajabuY = p('Rajabu / Sekiete Yatera',11,'★ Tawi la Chachika',gYateraG);
const gBarakaeliY = p('Barakaeli Yatera',11,'★ Tawi la Chachika',gYateraG);
p('Kilesua Yatera',11,'★ Tawi la Chachika',gYateraG);
p('Bi Mdawa Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Mwanaidi / Namaheri Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Apasiana Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Tabu Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Bahati Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Nakio Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Nakunda Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Makaniki Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});
p('Bi Ruth Yatera',11,'★ Tawi la Chachika',gYateraG,{female:true});

// Kizazi 12 — Watoto wa Yetiro
const gNoahY = p('Noah Yetiro Yatera',12,'★ Tawi la Chachika',gYetiroY);
const gJeremiahY = p('Jeremiah / Mashashi Yetiro Yatera',12,'★ Tawi la Chachika',gYetiroY);
const gEndeniY = p('Mchungaji Endeni / Ndaghine Yetiro Yatera',12,'★ Tawi la Chachika',gYetiroY);
p('Bi Vasena Yetiro Yatera',12,'★ Tawi la Chachika',gYetiroY,{female:true});
p('Bi Naomi Yetiro Yatera',12,'★ Tawi la Chachika',gYetiroY,{female:true});
p('Bi Elipina Yetiro Yatera',12,'★ Tawi la Chachika',gYetiroY,{female:true});
p('Bi Susana Yetiro Yatera',12,'★ Tawi la Chachika',gYetiroY,{female:true});

// Kizazi 12 — Watoto wa Abdulrahmani
p('Nuhu / Yatera Abdulrahmani Yatera',12,'★ Tawi la Chachika',gAbdulrahY);
p('Adamu Abdulrahmani Yatera',12,'★ Tawi la Chachika',gAbdulrahY);
p('Bi Hamida Abdulrahmani Yatera',12,'★ Tawi la Chachika',gAbdulrahY,{female:true});
p('Bi Dhahirina Abdulrahmani Yatera',12,'★ Tawi la Chachika',gAbdulrahY,{female:true});
p('Bi Safiyuna Abdulrahmani Yatera',12,'★ Tawi la Chachika',gAbdulrahY,{female:true});
p('Bi Mariamu / Kisweda Abdulrahmani Yatera',12,'★ Tawi la Chachika',gAbdulrahY,{female:true});

// Kizazi 12 — Watoto wa Allen/Ally Yatera
p('Julius / Yatera Allen Yatera',12,'★ Tawi la Chachika',gAllenY);
p('Mbonea Allen Yatera',12,'★ Tawi la Chachika',gAllenY);
p('Ndaghine Allen Yatera',12,'★ Tawi la Chachika',gAllenY);
p('Gilliard / Ndelichio Allen Yatera',12,'★ Tawi la Chachika',gAllenY);
p('James / Kichawele Allen Yatera',12,'★ Tawi la Chachika',gAllenY);

// Kizazi 12 — Watoto wa Athumani/Irema
const gAbdiAthu = p('Abdi / Yatera Athumani Yatera',12,'★ Tawi la Chachika',gAthumaniY);
const gMadavaAthu = p('Madava / Ramadhani Athumani Yatera',12,'★ Tawi la Chachika',gAthumaniY);
const gAdamAthu = p('Adam Athumani Yatera',12,'★ Tawi la Chachika',gAthumaniY);
const gBakariAthu = p('Bakari Athumani Yatera',12,'★ Tawi la Chachika',gAthumaniY);

// Kizazi 12 — Watoto wa Juma Yatera
p('Yasini Juma Yatera',12,'★ Tawi la Chachika',gJumaY);
p('Ndaghine Juma Yatera',12,'★ Tawi la Chachika',gJumaY);
p('Abdallah Juma Yatera',12,'★ Tawi la Chachika',gJumaY);
p('Hamisi Juma Yatera',12,'★ Tawi la Chachika',gJumaY);
p('Bi Mwanahawa Juma Yatera',12,'★ Tawi la Chachika',gJumaY,{female:true});
p('Bi Halima Juma Yatera',12,'★ Tawi la Chachika',gJumaY,{female:true});
p('Bi Farida Juma Yatera',12,'★ Tawi la Chachika',gJumaY,{female:true});

// Kizazi 12 — Watoto wa Rajabu/Sekiete
p('Ndaghine Rajabu Yatera',12,'★ Tawi la Chachika',gRajabuY);
p('Kejo Rajabu Yatera',12,'★ Tawi la Chachika',gRajabuY);
p('Bi Nakithe Rajabu Yatera',12,'★ Tawi la Chachika',gRajabuY,{female:true});
p('Bi Kapwile Rajabu Yatera',12,'★ Tawi la Chachika',gRajabuY,{female:true});
p('Bi Mariamu / Kipwele Rajabu Yatera',12,'★ Tawi la Chachika',gRajabuY,{female:true});

// Kizazi 12 — Watoto wa Barakaeli
p('Enea / Yatera Barakaeli Yatera',12,'★ Tawi la Chachika',gBarakaeliY);
const gEliaBarY = p('Elia / Seushi Barakaeli Yatera',12,'★ Tawi la Chachika',gBarakaeliY);
const gJaphetBarY = p('Japhet / Ndaghine Barakaeli Yatera',12,'★ Tawi la Chachika',gBarakaeliY);
p('Bi Mary / Kiweda Barakaeli Yatera',12,'★ Tawi la Chachika',gBarakaeliY,{female:true});
p('Bi Patience / Mshinwa Barakaeli Yatera',12,'★ Tawi la Chachika',gBarakaeliY,{female:true});
p('Bi Evaline / Nakith Barakaeli Yatera',12,'★ Tawi la Chachika',gBarakaeliY,{female:true});
p('Bi Joice / Nampombe Barakaeli Yatera',12,'★ Tawi la Chachika',gBarakaeliY,{female:true});

// Kizazi 13 — Watoto wa Noah Yetiro
p('Edwad Noah Yetiro Yatera',13,'★ Tawi la Chachika',gNoahY);
p('Bi Natalia Noah Yetiro Yatera',13,'★ Tawi la Chachika',gNoahY,{female:true});
p('Bi Gloria Noah Yetiro Yatera',13,'★ Tawi la Chachika',gNoahY,{female:true});
p('Bi Mirabeli Noah Yetiro Yatera',13,'★ Tawi la Chachika',gNoahY,{female:true});

// Kizazi 13 — Watoto wa Jeremiah Yetiro
p('Yetiro Jeremiah Yetiro Yatera',13,'★ Tawi la Chachika',gJeremiahY);
p('Bi Ena / Nancy Jeremiah Yetiro Yatera',13,'★ Tawi la Chachika',gJeremiahY,{female:true});
p('Bi Vaileth Jeremiah Yetiro Yatera',13,'★ Tawi la Chachika',gJeremiahY,{female:true});
p('Bi Nashera Jeremiah Yetiro Yatera',13,'★ Tawi la Chachika',gJeremiahY,{female:true});

// Kizazi 13 — Watoto wa Endeni Yetiro
p('Yetiro Endeni Yetiro Yatera',13,'★ Tawi la Chachika',gEndeniY);
p('Geofry Endeni Yetiro Yatera',13,'★ Tawi la Chachika',gEndeniY);
p('Bi Ena Endeni Yetiro Yatera',13,'★ Tawi la Chachika',gEndeniY,{female:true});

// Kizazi 13 — Watoto wa Athumani children
p('Juma Abdi Athumani Yatera',13,'★ Tawi la Chachika',gAbdiAthu);
p('Sudi Abdi Athumani Yatera',13,'★ Tawi la Chachika',gAbdiAthu);
p('Bi Jamila Abdi Athumani Yatera',13,'★ Tawi la Chachika',gAbdiAthu,{female:true});
p('Bi Amina Abdi Athumani Yatera',13,'★ Tawi la Chachika',gAbdiAthu,{female:true});
p('Irema Madava Athumani Yatera',13,'★ Tawi la Chachika',gMadavaAthu);
p('Chedaiwe Madava Athumani Yatera',13,'★ Tawi la Chachika',gMadavaAthu);
p('Bi Nashera / Halima Madava Athumani Yatera',13,'★ Tawi la Chachika',gMadavaAthu,{female:true});
p('Bi Salome Madava Athumani Yatera',13,'★ Tawi la Chachika',gMadavaAthu,{female:true});
p('Athumani Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu);
p('Kilongo Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu);
p('Isumaili Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu);
p('Izungo Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu);
p('Bi Aisha Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu,{female:true});
p('Bi Nema Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu,{female:true});
p('Bi Nashera Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu,{female:true});
p('Bi Amina Adamu Athumani Yatera',13,'★ Tawi la Chachika',gAdamAthu,{female:true});
p('Athumani Bakari Athumani Yatera',13,'★ Tawi la Chachika',gBakariAthu);
p('Anold Bakari Athumani Yatera',13,'★ Tawi la Chachika',gBakariAthu);
p('Rajabu / Nguluma Bakari Athumani Yatera',13,'★ Tawi la Chachika',gBakariAthu);
p('Barakaeli Bakari Athumani Yatera',13,'★ Tawi la Chachika',gBakariAthu);
p('Bi Mary Bakari Athumani Yatera',13,'★ Tawi la Chachika',gBakariAthu,{female:true});
p('Bi Rehema Bakari Athumani Yatera',13,'★ Tawi la Chachika',gBakariAthu,{female:true});

// Kizazi 13 — Watoto wa Elia Barakaeli
p('Baraka Elia Barakaeli Yatera',13,'★ Tawi la Chachika',gEliaBarY);
p('Ahadi Elia Barakaeli Yatera',13,'★ Tawi la Chachika',gEliaBarY);
p('Bi Christina Elia Barakaeli Yatera',13,'★ Tawi la Chachika',gEliaBarY,{female:true});
p('Bi Paulina Elia Barakaeli Yatera',13,'★ Tawi la Chachika',gEliaBarY,{female:true});

// Kizazi 13 — Watoto wa Japhet Barakaeli
p('Baraka Japhet Barakaeli Yatera',13,'★ Tawi la Chachika',gJaphetBarY);
p('Barakaeli Japhet Barakaeli Yatera',13,'★ Tawi la Chachika',gJaphetBarY);
p('Danieli Japhet Barakaeli Yatera',13,'★ Tawi la Chachika',gJaphetBarY);
p('Bi Christina Japhet Barakaeli Yatera',13,'★ Tawi la Chachika',gJaphetBarY,{female:true});
p('Bi Peninarose Japhet Barakaeli Yatera',13,'★ Tawi la Chachika',gJaphetBarY,{female:true});
p('Bi Maureen Japhet Barakaeli Yatera',13,'★ Tawi la Chachika',gJaphetBarY,{female:true});

// ════════════════════════════════════════════════════════════════════
// KICHAWELE GHUHIA — Kizazi 11 → 12 → 13
// ════════════════════════════════════════════════════════════════════
const gRashidiKich = p('Rashidi Kichawele Ghuhia',11,'★ Tawi la Chachika',gKichaweleG);
p('Sekondo Kichawele Ghuhia',11,'★ Tawi la Chachika',gKichaweleG,{note:'Alikufa vitani.'});
p('Bi Cheghele Kichawele Ghuhia',11,'★ Tawi la Chachika',gKichaweleG,{female:true});
p('Bi Teendwa Kichawele Ghuhia',11,'★ Tawi la Chachika',gKichaweleG,{female:true});

// Kizazi 12 — Watoto wa Rashidi Kichawele
const gYusufuKich = p('Yusufu / Kichawele Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
p('Ezekieli / Malaika Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
const gShabaniKich = p('Shabani / Mlambo Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
const gEzekieliKich = p('Ezekieli / Malaika Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
const gIssaKich = p('Issa / Kichawele Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
const gHalidiKich = p('Halidi Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
p('Yunusi / Yatera Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
const gRamadhaniKich = p('Ramadhani / Kagulu Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
const gRahimuKich = p('Rahimu / Chelangwa Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);
p('Yasini Rashidi Kichawele',12,'★ Tawi la Chachika',gRashidiKich);

// Kizazi 13 — Watoto wa Yusufu Rashidi
const gHaruniKich = p('Haruni / Rashidi Yusufu Rashidi Kichawele',13,'★ Tawi la Chachika',gYusufuKich);
p('Juma / Mndorwe Yusufu Rashidi Kichawele',13,'★ Tawi la Chachika',gYusufuKich);
p('Yasini Mwarabu Yusufu Rashidi Kichawele',13,'★ Tawi la Chachika',gYusufuKich);
p('Amiri / Kiandiko Yusufu Rashidi Kichawele',13,'★ Tawi la Chachika',gYusufuKich);
p('Bi Mwajuma / Nyorido Yusufu Rashidi',13,'★ Tawi la Chachika',gYusufuKich,{female:true});
p('Bi Mwalimu Ridhaa / Nakio Yusufu Rashidi',13,'★ Tawi la Chachika',gYusufuKich,{female:true});
p('Bi Zeina / Tamari Yusufu Rashidi',13,'★ Tawi la Chachika',gYusufuKich,{female:true});
p('Bi Halima / Mdawa Yusufu Rashidi',13,'★ Tawi la Chachika',gYusufuKich,{female:true});
p('Bi Zeinabu / Namahungo Yusufu Rashidi',13,'★ Tawi la Chachika',gYusufuKich,{female:true});

// Kizazi 13 — Watoto wa Ezekieli
p('Rashidi Ezekieli Rashidi Kichawele',13,'★ Tawi la Chachika',gEzekieliKich);
p('Meshack Ezekieli Rashidi Kichawele',13,'★ Tawi la Chachika',gEzekieliKich);
p('Jafari Ezekieli Rashidi Kichawele',13,'★ Tawi la Chachika',gEzekieliKich);
p('Godfrey / Godson Ezekieli Rashidi Kichawele',13,'★ Tawi la Chachika',gEzekieliKich);
p('Bi Mwajuma Ezekieli Rashidi Kichawele',13,'★ Tawi la Chachika',gEzekieliKich,{female:true});
p('Bi Leah Ezekieli Rashidi Kichawele',13,'★ Tawi la Chachika',gEzekieliKich,{female:true});
p('Bi Nankondo Ezekieli Rashidi Kichawele',13,'★ Tawi la Chachika',gEzekieliKich,{female:true});

// Kizazi 13 — Watoto wa Issa Rashidi
p('Rashidi Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich);
p('Mussa Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich);
p('Bi Mwantumu Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich,{female:true});
p('Bi Mwantumu Mdogo Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich,{female:true});
p('Bi Shamimu Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich,{female:true});
p('Bi Fatuma Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich,{female:true});
p('Bi Kilala / Halima Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich,{female:true});
p('Bi Mwajuma Issa Rashidi Kichawele',13,'★ Tawi la Chachika',gIssaKich,{female:true});

// Kizazi 13 — Watoto wa Shabani Rashidi
p('Rashidi Shabani Rashidi Kichawele',13,'★ Tawi la Chachika',gShabaniKich);
p('Jamali Shabani Rashidi Kichawele',13,'★ Tawi la Chachika',gShabaniKich);
p('Juma Shabani Rashidi Kichawele',13,'★ Tawi la Chachika',gShabaniKich);
p('Hoseni Shabani Rashidi Kichawele',13,'★ Tawi la Chachika',gShabaniKich);

// Kizazi 13 — Watoto wa Halidi Rashidi
p('Rashidi Halidi Rashidi Kichawele',13,'★ Tawi la Chachika',gHalidiKich);
p('Abdallah Halidi Rashidi Kichawele',13,'★ Tawi la Chachika',gHalidiKich);
p('Hamadi Halidi Rashidi Kichawele',13,'★ Tawi la Chachika',gHalidiKich);
p('Ramadhani Halidi Rashidi Kichawele',13,'★ Tawi la Chachika',gHalidiKich);
p('Bi Mayasa Halidi Rashidi Kichawele',13,'★ Tawi la Chachika',gHalidiKich,{female:true});
p('Bi Saidati Halidi Rashidi Kichawele',13,'★ Tawi la Chachika',gHalidiKich,{female:true});
p('Bi Hadija Halidi Rashidi Kichawele',13,'★ Tawi la Chachika',gHalidiKich,{female:true});

// Kizazi 13 — Watoto wa Ramadhani/Kagulu
p('Rashidi Ramadhani Rashidi Kichawele',13,'★ Tawi la Chachika',gRamadhaniKich);
p('Akramu Ramadhani Rashidi Kichawele',13,'★ Tawi la Chachika',gRamadhaniKich);
p('Bi Mwantumu Ramadhani Rashidi Kichawele',13,'★ Tawi la Chachika',gRamadhaniKich,{female:true});
p('Bi Nashera Ramadhani Rashidi Kichawele',13,'★ Tawi la Chachika',gRamadhaniKich,{female:true});
p('Bi Mariamu Ramadhani Rashidi Kichawele',13,'★ Tawi la Chachika',gRamadhaniKich,{female:true});

// Kizazi 13 — Watoto wa Rahimu Rashidi
p('Athumani Rahimu Rashidi Kichawele',13,'★ Tawi la Chachika',gRahimuKich);
p('Alli Rahimu Rashidi Kichawele',13,'★ Tawi la Chachika',gRahimuKich);
p('Senkondo Rahimu Rashidi Kichawele',13,'★ Tawi la Chachika',gRahimuKich);
p('Bi Nashera Rahimu Rashidi Kichawele',13,'★ Tawi la Chachika',gRahimuKich,{female:true});

// Kizazi 14 — Watoto wa Haruni Yusufu
p('Yusufu Haruni Yusufu Rashidi Kichawele',14,'★ Tawi la Chachika',gHaruniKich);
p('Shabani Haruni Yusufu Rashidi Kichawele',14,'★ Tawi la Chachika',gHaruniKich);

// ════════════════════════════════════════════════════════════════════
// NDAGHINE GHUHIA — Kizazi 11 → 12 → 13 → 14
// ════════════════════════════════════════════════════════════════════
const gYonathanN = p('Yonathan Ndaghine Ghuhia',11,'★ Tawi la Chachika',gNdaghineG);
p('Bi Perepetua Ndaghine Ghuhia',11,'★ Tawi la Chachika',gNdaghineG,{female:true});
p('Bi Nahana Ndaghine Ghuhia',11,'★ Tawi la Chachika',gNdaghineG,{female:true});
p('Bi Nandera Ndaghine Ghuhia',11,'★ Tawi la Chachika',gNdaghineG,{female:true});

// Kizazi 12 — Watoto wa Yonathan
const gNicholausY = p('Nicholaus Yonathan Ndaghine',12,'★ Tawi la Chachika',gYonathanN);
const gEliusY = p('Elius Yonathan Ndaghine',12,'★ Tawi la Chachika',gYonathanN);
const gLukasY = p('Lukas Yonathan Ndaghine',12,'★ Tawi la Chachika',gYonathanN);
const gMcharoY = p('Mcharo / Anderson Yonathan Ndaghine',12,'★ Tawi la Chachika',gYonathanN);
p('Bi Noimi Yonathan Ndaghine',12,'★ Tawi la Chachika',gYonathanN,{female:true});
p('Bi Mwalimu Frismila Yonathan Ndaghine',12,'★ Tawi la Chachika',gYonathanN,{female:true});

// Kizazi 13 — Watoto wa Nicholaus
p('Bi Nishighia Nicholaus Yonathan',13,'★ Tawi la Chachika',gNicholausY,{female:true});
p('Bi Elizaberth Nicholaus Yonathan',13,'★ Tawi la Chachika',gNicholausY,{female:true});

// Kizazi 13 — Watoto wa Elius
p('John Elius Yonathan Ndaghine',13,'★ Tawi la Chachika',gEliusY);
p('Nyangarika Elius Yonathan Ndaghine',13,'★ Tawi la Chachika',gEliusY);
p('Bi Nathikiwa Elius Yonathan Ndaghine',13,'★ Tawi la Chachika',gEliusY,{female:true});

// Kizazi 13 — Watoto wa Lukas
const gBarakaeliLY = p('Barakaeli / Mhando Lukas Yonathan',13,'★ Tawi la Chachika',gLukasY);
p('Amini Lukas Yonathan Ndaghine',13,'★ Tawi la Chachika',gLukasY);
p('Salimu / Saimon Lukas Yonathan Ndaghine',13,'★ Tawi la Chachika',gLukasY);
p('Bi Tamari Lukas Yonathan',13,'★ Tawi la Chachika',gLukasY,{female:true});
p('Bi Joice Lukas Yonathan',13,'★ Tawi la Chachika',gLukasY,{female:true});

// Kizazi 13 — Watoto wa Mcharo/Anderson
p('Yetiro Anderson Yonathan Ndaghine',13,'★ Tawi la Chachika',gMcharoY);
p('Onesphoro Anderson Yonathan Ndaghine',13,'★ Tawi la Chachika',gMcharoY);
p('Bi Tamari Anderson Yonathan Ndaghine',13,'★ Tawi la Chachika',gMcharoY,{female:true});

// Kizazi 14 — Watoto wa Barakaeli Lukas
p('George Barakaeli Lukas Yonathan',14,'★ Tawi la Chachika',gBarakaeliLY);
p('Grandwilly Barakaeli Lukas Yonathan',14,'★ Tawi la Chachika',gBarakaeliLY);
p('Bi Golder Barakaeli Lukas Yonathan',14,'★ Tawi la Chachika',gBarakaeliLY,{female:true});

// ════════════════════════════════════════════════════════════════════
// KISENGE GHUHIA — Kizazi 11 → 12
// ════════════════════════════════════════════════════════════════════
p('Mapande Kisenge Ghuhia',11,'★ Tawi la Chachika',gKisengeG,{note:'Kizazi chake hakijulikani — tunaendelea kutafuta.'});
p('Bi Kipwele Kisenge Ghuhia',11,'★ Tawi la Chachika',gKisengeG,{female:true});
p('Bi Nanko Kisenge Ghuhia',11,'★ Tawi la Chachika',gKisengeG,{female:true});

// ════════════════════════════════════════════════════════════════════
// NGURUTA GHUHIA — Kizazi 11
// ════════════════════════════════════════════════════════════════════
p('Hassani / Senzia Nguruta Ghuhia',11,'★ Tawi la Chachika',gNgurutaG,{note:'Alikufa vitani.'});
p('Bi Mchikirwa / Mwanaidi Nguruta Ghuhia',11,'★ Tawi la Chachika',gNgurutaG,{female:true});
p('Bi Namshali / Mwanamkuu Nguruta Ghuhia',11,'★ Tawi la Chachika',gNgurutaG,{female:true});

// ════════════════════════════════════════════════════════════════════
// WATOTO WA MANGARE MRONGA — Vizazi vyote
// ════════════════════════════════════════════════════════════════════

// ── 1. CHAROKIWA MANGARE (Gen 12) ──
p('Bi Namramba Charokiwa Mangare',12,'★ Tawi la Chachika',gCharokiwaM,{female:true});

// ── 2. KISENGE MANGARE (Gen 12) ──
const gLawenaK = p('Lawena Kisenge Mangare',12,'★ Tawi la Chachika',gKisengeM);
const gNdoileK = p('Ndoile / Jakobo Kisenge Mangare',12,'★ Tawi la Chachika',gKisengeM);
const gAbdallahK = p('Abdallah Kisenge Mangare',12,'★ Tawi la Chachika',gKisengeM);

// Watoto wa Lawena Kisenge (Gen 13)
const gRajabuL = p('Rajabu Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK);
const gRamadhaniL2 = p('Ramadhani Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK);
p('Bi Mbweza Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK,{female:true});
p('Bi Lydia Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK,{female:true});
p('Bi Mwanaidi Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK,{female:true});
p('Bi Nakuhoja Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK,{female:true});
p('Bi Eliena Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK,{female:true});
p('Bi Nasemba Lawena Kisenge',13,'★ Tawi la Chachika',gLawenaK,{female:true});

// Watoto wa Ndoile/Jakobo (Gen 13)
const gDanieliND = p('Danieli / Mtango Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK);
const gRafaeliND = p('Rafaeli / Charokiwa Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK);
const gCharlesND = p('Charles / Laumbe Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK);
const gSydneyND = p('Sydney / Mahuna Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK);
const gFrancisND = p('Francis / Kiure Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK);
const gCharokiwaND = p('Charokiwa / Bryson Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK);
p('Bi Nzota / Hadija Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Beresha / Mwanamisi Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Nashati / Mwantumu Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Nanguji / Aziza Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Nanzia Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Namcheja / Ruth Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Tabia / Nankondo Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Naisae / Mary Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Namvua / Rose Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});
p('Bi Mwanaidi / Lida Ndoile Kisenge',13,'★ Tawi la Chachika',gNdoileK,{female:true});

// Watoto wa Abdallah Kisenge (Gen 13)
p('Kisenge Abdallah Kisenge',13,'★ Tawi la Chachika',gAbdallahK);
p('Chanjie Abdallah Kisenge',13,'★ Tawi la Chachika',gAbdallahK);

// Watoto wa Ramadhani Lawena (Gen 14)
p('Hakim Ramadhani Lawena',14,'★ Tawi la Chachika',gRamadhaniL2);
p('Athumani Ramadhani Lawena',14,'★ Tawi la Chachika',gRamadhaniL2);
p('Ndoile Ramadhani Lawena',14,'★ Tawi la Chachika',gRamadhaniL2);
p('Mwedadi Ramadhani Lawena',14,'★ Tawi la Chachika',gRamadhaniL2);
p('Abdallah Ramadhani Lawena',14,'★ Tawi la Chachika',gRamadhaniL2);

// Watoto wa Rajabu Lawena (Gen 14)
p('Abdulaziz Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL);
p('Heri Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL);
p('Nuhu Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL);
p('Hassani Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL);
p('Nadhiri Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL);
p('Bakari Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL);
p('Bi Nakija Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL,{female:true});
p('Bi Nakio Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL,{female:true});
p('Bi Fatuma Rajabu Lawena',14,'★ Tawi la Chachika',gRajabuL,{female:true});

// Watoto wa Danieli Ndoile (Gen 14)
p('Efraim Danieli Ndoile',14,'★ Tawi la Chachika',gDanieliND);
p('Geofrey Danieli Ndoile',14,'★ Tawi la Chachika',gDanieliND);
p('Bi Zawadi Danieli Ndoile',14,'★ Tawi la Chachika',gDanieliND,{female:true});
p('Bi Monica Danieli Ndoile',14,'★ Tawi la Chachika',gDanieliND,{female:true});
p('Bi Rhoda Danieli Ndoile',14,'★ Tawi la Chachika',gDanieliND,{female:true});
p('Bi Mary Danieli Ndoile',14,'★ Tawi la Chachika',gDanieliND,{female:true});

// Watoto wa Rafaeli Ndoile (Gen 14)
p('Herbert Rafaeli Ndoile',14,'★ Tawi la Chachika',gRafaeliND);
p('Lwisa Rafaeli Ndoile',14,'★ Tawi la Chachika',gRafaeliND);
p('Bi Mary / Rebecca Rafaeli Ndoile',14,'★ Tawi la Chachika',gRafaeliND,{female:true});
p('Bi Yulia / Juliana Rafaeli Ndoile',14,'★ Tawi la Chachika',gRafaeliND,{female:true});

// Watoto wa Charles Ndoile (Gen 14)
const gWhiteC = p('White Charles Ndoile',14,'★ Tawi la Chachika',gCharlesND);
p('Wiliviti Charles Ndoile',14,'★ Tawi la Chachika',gCharlesND);
p('Livingstone / Lawena Charles Ndoile',14,'★ Tawi la Chachika',gCharlesND);
p('Bi Witness Charles Ndoile',14,'★ Tawi la Chachika',gCharlesND,{female:true});
p('Bi Sarah Charles Ndoile',14,'★ Tawi la Chachika',gCharlesND,{female:true});

// Watoto wa Francis Ndoile (Gen 14)
p('Abdallah Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND);
p('Osca Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND);
p('Highness Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND);
p('Bi Angela Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND,{female:true});
p('Bi Paulina Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND,{female:true});
p('Bi Floranice Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND,{female:true});
p('Bi Martha Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND,{female:true});
p('Bi Sarah Francis Ndoile',14,'★ Tawi la Chachika',gFrancisND,{female:true});

// Watoto wa Sydney Ndoile (Gen 14)
p('Ndoile Sydney Ndoile',14,'★ Tawi la Chachika',gSydneyND);
p('Magastone Sydney Ndoile',14,'★ Tawi la Chachika',gSydneyND);
p('Mchili Sydney Ndoile',14,'★ Tawi la Chachika',gSydneyND);
p('Rays Sydney Ndoile',14,'★ Tawi la Chachika',gSydneyND);
p('Bi Viola Sydney Ndoile',14,'★ Tawi la Chachika',gSydneyND,{female:true});
p('Bi Ritta Sydney Ndoile',14,'★ Tawi la Chachika',gSydneyND,{female:true});
p('Bi Joice Sydney Ndoile',14,'★ Tawi la Chachika',gSydneyND,{female:true});

// Watoto wa White Charles (Gen 15)
p('Charles White Charles Ndoile',15,'★ Tawi la Chachika',gWhiteC);
p('David White Charles Ndoile',15,'★ Tawi la Chachika',gWhiteC);
p('Bi Glory / Namarigo White Charles',15,'★ Tawi la Chachika',gWhiteC,{female:true});
p('Bi Queen / Zuhura White Charles',15,'★ Tawi la Chachika',gWhiteC,{female:true});

// ── 3. MAHUNA MANGARE (Gen 12→14) ──
const gMzimuMah = p('Mzimu Mahuna Mangare',12,'★ Tawi la Chachika',gMahunaM);
const gMashindeMAH = p('Mashinde Mahuna Mangare',12,'★ Tawi la Chachika',gMahunaM);
const gKiwengeMah = p('Kiwenge Mahuna Mangare',12,'★ Tawi la Chachika',gMahunaM);
const gJumaMah = p('Juma Mahuna Mangare',12,'★ Tawi la Chachika',gMahunaM);
const gAllyMah = p('Ally / Andrea Mahuna Mangare',12,'★ Tawi la Chachika',gMahunaM);
const gHemediMah = p('Hemedi Mahuna Mangare',12,'★ Tawi la Chachika',gMahunaM);

// Watoto wa Mzimu Mahuna (Gen 13)
const gRamadhaniMz = p('Ramadhani Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah);
const gSalimuMz = p('Salimu Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah);
const gIddiMz = p('Iddi Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah);
const gOmariMz = p('Omari Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah);
p('Bi Nampingu Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah,{female:true});
p('Bi Teendwa Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah,{female:true});
p('Bi Natia Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah,{female:true});
p('Bi Mwajuma Mzimu Mahuna',13,'★ Tawi la Chachika',gMzimuMah,{female:true});

// Watoto wa Mashinde Mahuna (Gen 13)
p('Iddi Mashinde Mahuna',13,'★ Tawi la Chachika',gMashindeMAH);
p('Rajabu Mashinde Mahuna',13,'★ Tawi la Chachika',gMashindeMAH);

// Watoto wa Kiwenge Mahuna (Gen 13)
p('Juma Kiwenge Mahuna',13,'★ Tawi la Chachika',gKiwengeMah);

// Watoto wa Juma Mahuna (Gen 13)
p('Badi Juma Mahuna',13,'★ Tawi la Chachika',gJumaMah);
p('Mataka Juma Mahuna',13,'★ Tawi la Chachika',gJumaMah);
p('Buda Juma Mahuna',13,'★ Tawi la Chachika',gJumaMah);
p('Mkindi Juma Mahuna',13,'★ Tawi la Chachika',gJumaMah);

// Watoto wa Ally/Andrea Mahuna (Gen 13)
p('Mahuna Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah);
p('Aliamini Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah);
p('Yusufu Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah);
p('Iddi Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah);
p('Mussa / Mahuna Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah);
p('Athumani Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah);
p('Bi Amina Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah,{female:true});
p('Bi Batuli Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah,{female:true});
p('Bi Bilhuda Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah,{female:true});
p('Bi Hadija Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah,{female:true});
p('Bi Mariamu Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah,{female:true});
p('Bi Asha Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah,{female:true});
p('Bi Zainabu Ally Mahuna',13,'★ Tawi la Chachika',gAllyMah,{female:true});

// Watoto wa Hemedi Mahuna (Gen 13)
p('Kasimu Hemedi Mahuna',13,'★ Tawi la Chachika',gHemediMah);
p('Kiure Hemedi Mahuna',13,'★ Tawi la Chachika',gHemediMah);
p('Hassani Hemedi Mahuna',13,'★ Tawi la Chachika',gHemediMah);
p('Mkindi Hemedi Mahuna',13,'★ Tawi la Chachika',gHemediMah);
p('Mgaya Hemedi Mahuna',13,'★ Tawi la Chachika',gHemediMah);
p('Bi Aisha Hemedi Mahuna',13,'★ Tawi la Chachika',gHemediMah,{female:true});

// Watoto wa Omari Mzimu (Gen 14)
const gKassimuOM = p('Kasimu Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz);
const gShekheOM = p('Shekhe Abdallah Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz);
p('Maliki Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz);
p('Awadhi Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz);
p('Riziki Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz);
p('Rashidi Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz);
p('Mustafa Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz);
p('Bi Fatuma Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz,{female:true});
p('Bi Hamida Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz,{female:true});
p('Bi Amina Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz,{female:true});
p('Bi Jaina Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz,{female:true});
p('Bi Fatina Omari Mzimu',14,'★ Tawi la Chachika',gOmariMz,{female:true});

// Watoto wa Ramadhani Mzimu (Gen 14)
p('Abubakari Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz);
p('Myoya Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz);
p('Bashiri Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz);
p('Mramba Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz);
p('Kachenje Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz);
p('Bi Safina Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz,{female:true});
p('Bi Zuhura Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz,{female:true});
p('Bi Amina Ramadhani Mzimu',14,'★ Tawi la Chachika',gRamadhaniMz,{female:true});

// Watoto wa Salimu Mzimu (Gen 14)
p('Babu Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz);
p('Kichawele Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz);
p('Shekirigwi Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz);
p('Mramba Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz);
p('Bi Halima Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz,{female:true});
p('Bi Safilina Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz,{female:true});
p('Bi Hawa Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz,{female:true});
p('Bi Ledaiwe Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz,{female:true});
p('Bi Natia Salimu Mzimu',14,'★ Tawi la Chachika',gSalimuMz,{female:true});

// Watoto wa Iddi Mzimu (Gen 14)
p('Yahaya Iddi Mzimu',14,'★ Tawi la Chachika',gIddiMz);
p('Bi Asinani Iddi Mzimu',14,'★ Tawi la Chachika',gIddiMz,{female:true});
p('Bi Amina Iddi Mzimu',14,'★ Tawi la Chachika',gIddiMz,{female:true});
p('Bi Fatuma Iddi Mzimu',14,'★ Tawi la Chachika',gIddiMz,{female:true});
p('Bi Bahati Iddi Mzimu',14,'★ Tawi la Chachika',gIddiMz,{female:true});

// Watoto wa Kasimu Omari (Gen 15)
p('Omari Kasimu Omari Mzimu',15,'★ Tawi la Chachika',gKassimuOM);
p('Iddi Kasimu Omari Mzimu',15,'★ Tawi la Chachika',gKassimuOM);
p('Ramadhani Kasimu Omari Mzimu',15,'★ Tawi la Chachika',gKassimuOM);
p('Hamisi Kasimu Omari Mzimu',15,'★ Tawi la Chachika',gKassimuOM);
p('Bi Mwanaidi Kasimu Omari Mzimu',15,'★ Tawi la Chachika',gKassimuOM,{female:true});
p('Bi Amina Kasimu Omari Mzimu',15,'★ Tawi la Chachika',gKassimuOM,{female:true});
p('Bi Salima Kasimu Omari Mzimu',15,'★ Tawi la Chachika',gKassimuOM,{female:true});

// Watoto wa Shekhe Omari (Gen 15)
p('Omari Abdallah Omari Mzimu',15,'★ Tawi la Chachika',gShekheOM);
p('Saidi Abdallah Omari Mzimu',15,'★ Tawi la Chachika',gShekheOM);
p('Iddi Abdallah Omari Mzimu',15,'★ Tawi la Chachika',gShekheOM);
p('Bi Mwajuma Abdallah Omari Mzimu',15,'★ Tawi la Chachika',gShekheOM,{female:true});
p('Bi Aziza Abdallah Omari Mzimu',15,'★ Tawi la Chachika',gShekheOM,{female:true});
p('Bi Ramla Abdallah Omari Mzimu',15,'★ Tawi la Chachika',gShekheOM,{female:true});
p('Bi Mwanaidi Abdallah Omari Mzimu',15,'★ Tawi la Chachika',gShekheOM,{female:true});

// ── 4. KIURE MANGARE (Gen 12→14) ──
const gKadegheKi = p('Kadeghe Kiure Mangare',12,'★ Tawi la Chachika',gKiureM);
const gIsaeKi = p('Isae Kiure Mangare',12,'★ Tawi la Chachika',gKiureM);
const gSekieteKi = p('Sekiete Kiure Mangare',12,'★ Tawi la Chachika',gKiureM);
p('Bi Namshitu Kiure Mangare',12,'★ Tawi la Chachika',gKiureM,{female:true});

// Watoto wa Kadeghe Kiure (Gen 13)
const gAllyKad = p('Ally Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi);
const gSelemaniKad = p('Selemani Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi);
p('Ramadhani Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi);
p('Hemedi / Muhadi Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi);
p('Rajabu / Mahuna Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi);
p('Bi Aziza / Helena Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi,{female:true});
p('Bi Hawa Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi,{female:true});
p('Bi Beresha Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi,{female:true});
p('Bi Mwajuma Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi,{female:true});
p('Bi Namshali Kadeghe Kiure',13,'★ Tawi la Chachika',gKadegheKi,{female:true});

// Watoto wa Isae Kiure (Gen 13)
p('Juma Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Rashidi Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Ramadhani Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Halifa Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Saidi Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Yusufu Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Mahamadi Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Muhamad Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Rasuli Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi);
p('Bi Mwantumu Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi,{female:true});
p('Bi Namvua Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi,{female:true});
p('Bi Mwanaidi Isae Kiure',13,'★ Tawi la Chachika',gIsaeKi,{female:true});

// Watoto wa Sekiete Kiure (Gen 13)
p('Bakari Sekiete Kiure',13,'★ Tawi la Chachika',gSekieteKi);
const gHatibSek = p('Hatibu Sekiete Kiure',13,'★ Tawi la Chachika',gSekieteKi);
p('Saidi Sekiete Kiure',13,'★ Tawi la Chachika',gSekieteKi);
p('Bi Mwanavita Sekiete Kiure',13,'★ Tawi la Chachika',gSekieteKi,{female:true});

// Watoto wa Selemani Kadeghe (Gen 14)
const gArahmaniSK = p('Abdulrahmani / Arahmani Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad);
const gAbdallahSK = p('Abdallah Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad);
const gImamSK = p('Imam Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad);
const gHuseniSK = p('Huseni Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad);
const gMsamiSK = p('Msami Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad);
const gMarzukuSK = p('Marzuku Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad);
p('Hassani Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad);
p('Bi Maridhia Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad,{female:true});
p('Bi Aminina Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad,{female:true});
p('Bi Mwanasha Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad,{female:true});
p('Bi Rukia Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad,{female:true});
p('Bi Mariamu Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad,{female:true});
p('Bi Nankondo Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad,{female:true});
p('Bi Amina Selemani Kadeghe',14,'★ Tawi la Chachika',gSelemaniKad,{female:true});

// Watoto wa Ally Kadeghe (Gen 14)
p('Muhidini Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad);
p('Meraji Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad);
p('Kiure Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad);
p('Hafidhi Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad);
p('Sekiete Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad);
p('Bi Mariamu Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad,{female:true});
p('Bi Zena Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad,{female:true});
p('Bi Amina Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad,{female:true});
p('Bi Aina Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad,{female:true});
p('Bi Mwajuma Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad,{female:true});
p('Bi Fatuma Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad,{female:true});
p('Bi Faidha Ally Kadeghe',14,'★ Tawi la Chachika',gAllyKad,{female:true});

// Watoto wa Hatibu Sekiete (Gen 14)
p('Ayubu Hatibu Sekiete',14,'★ Tawi la Chachika',gHatibSek);
p('Kadeghe Hatibu Sekiete',14,'★ Tawi la Chachika',gHatibSek);
p('Busura Hatibu Sekiete',14,'★ Tawi la Chachika',gHatibSek);
p('Bi Mariamu Hatibu Sekiete',14,'★ Tawi la Chachika',gHatibSek,{female:true});
p('Bi Zaina Hatibu Sekiete',14,'★ Tawi la Chachika',gHatibSek,{female:true});

// Watoto wa Arahmani Selemani (Gen 15)
p('Selemani Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK);
p('Issa Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK);
p('Ally Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK);
p('Yusufu Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK);
p('Hemedi Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK);
p('Ngaina Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK);
p('Swalehe Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK);
p('Bi Mwajuma Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK,{female:true});
p('Bi Zeituni Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK,{female:true});
p('Bi Amina Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK,{female:true});
p('Bi Batuli Arahmani Selemani',15,'★ Tawi la Chachika',gArahmaniSK,{female:true});

// Watoto wa Abdallah Selemani (Gen 15)
p('Selemani Abdallah Selemani Kadeghe',15,'★ Tawi la Chachika',gAbdallahSK);
p('Chali Abdallah Selemani',15,'★ Tawi la Chachika',gAbdallahSK);
p('Kiure Abdallah Selemani',15,'★ Tawi la Chachika',gAbdallahSK);
p('Luqumani Abdallah Selemani',15,'★ Tawi la Chachika',gAbdallahSK);
p('Bi Nadia Abdallah Selemani',15,'★ Tawi la Chachika',gAbdallahSK,{female:true});

// Watoto wa Imam Selemani (Gen 15)
p('Ndekiro Imam Selemani',15,'★ Tawi la Chachika',gImamSK);
p('Mudasiru Imam Selemani',15,'★ Tawi la Chachika',gImamSK);
p('Bi Mwajuma Imam Selemani',15,'★ Tawi la Chachika',gImamSK,{female:true});
p('Bi Ngasada Imam Selemani',15,'★ Tawi la Chachika',gImamSK,{female:true});

// Watoto wa Huseni Selemani (Gen 15)
p('Selemani Huseni Selemani',15,'★ Tawi la Chachika',gHuseniSK);
p('Bi Tausi Huseni Selemani',15,'★ Tawi la Chachika',gHuseniSK,{female:true});
p('Bi Mwajuma Huseni Selemani',15,'★ Tawi la Chachika',gHuseniSK,{female:true});
p('Bi Shamim Huseni Selemani',15,'★ Tawi la Chachika',gHuseniSK,{female:true});
p('Bi Sofia Huseni Selemani',15,'★ Tawi la Chachika',gHuseniSK,{female:true});

// Watoto wa Msami Selemani (Gen 15)
p('Selemani Msami Selemani',15,'★ Tawi la Chachika',gMsamiSK);
p('Hamisi Msami Selemani',15,'★ Tawi la Chachika',gMsamiSK);
p('Bi Mwajuma Msami Selemani',15,'★ Tawi la Chachika',gMsamiSK,{female:true});

// Watoto wa Marzuku Selemani (Gen 15)
p('Bi Batuli Marzuku Selemani',15,'★ Tawi la Chachika',gMarzukuSK,{female:true});
p('Bi Zeinabu Marzuku Selemani',15,'★ Tawi la Chachika',gMarzukuSK,{female:true});

// ── 5. MKINDI MANGARE (tayari ana var gMkindi) ──
const gMkulunguMk = p('Mkulungu Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi);
const gShabaniMk = p('Shabani Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi);
const gAthumaniMk = p('Athumani / Kighuma / Majaliwa Mkindi',12,'★ Tawi la Chachika',gMkindi);
const gSelemaniMk = p('Selemani / Chayoa Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi);
const gAllyMk = p('Ally / Kichikiro Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi);
const gIddiMk = p('Iddi Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi);
const gYusufuMk = p('Yusufu / Matata Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi);
p('Bi Mwanasha Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi,{female:true});
p('Bi Hana / Namvua Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi,{female:true});
p('Bi Majuma / Natia Mkindi Mangare',12,'★ Tawi la Chachika',gMkindi,{female:true});

// Watoto wa Mkulungu Mkindi (Gen 13)
const gStephanoMk = p('Stephano Mkulungu Mkindi',13,'★ Tawi la Chachika',gMkulunguMk);
p('Bi Mwantumu Mkulungu Mkindi',13,'★ Tawi la Chachika',gMkulunguMk,{female:true});
p('Bi Nakija Mkulungu Mkindi',13,'★ Tawi la Chachika',gMkulunguMk,{female:true});
p('Bi Penina Mkulungu Mkindi',13,'★ Tawi la Chachika',gMkulunguMk,{female:true});

// Watoto wa Shabani Mkindi (Gen 13)
const gMuhidiniSh = p('Muhidini Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk);
const gAyubuSh = p('Ayubu Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk);
p('Oliver Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk);
p('Mkindi Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk);
p('Musa Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk);
p('Bi Zawadi Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk,{female:true});
p('Bi Mwezine Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk,{female:true});
p('Bi Zuhura Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk,{female:true});
p('Bi Fatuma Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk,{female:true});
p('Bi Maimuna Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk,{female:true});
p('Bi Ester Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk,{female:true});
p('Bi Nakuthela Shabani Mkindi',13,'★ Tawi la Chachika',gShabaniMk,{female:true});

// Watoto wa Athumani Mkindi (Gen 13)
const gRamadhaniAt = p('Ramadhani / Douglas Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
const gAbdiAt = p('Mwalimu Abdi Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
const gSadikiAt = p('Sadiki / Mkindi Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
const gAbdallahAt = p('Abdallah / Yonatha Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
p('Daudi Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
const gHijaAt = p('Hija / Charokiwa Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
const gHajiAt = p('Haji / Mahuna Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
const gSudiAt = p('Sudi / Mika Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk);
p('Bi Zeinabu / Nakunda Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk,{female:true});
p('Bi Zeituni / Nakuthela Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk,{female:true});
p('Bi Mwajuma Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk,{female:true});
p('Bi Uthahia / Namhedhi Athumani Mkindi',13,'★ Tawi la Chachika',gAthumaniMk,{female:true});

// Watoto wa Selemani Mkindi (Gen 13)
const gMusaSel = p('Musa Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk);
const gAliaminiSel = p('Aliamini Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk);
p('Amiri Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk);
const gFadhiliSel = p('Fadhili Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk);
const gKarimuSel = p('Karimu Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk);
const gYasiniSel = p('Dr Yasini Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk);
p('Bi Hawa Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk,{female:true});
p('Bi Hadija Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk,{female:true});
p('Bi Zuhura Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk,{female:true});
p('Bi Sikudhani / Mtaro Selemani Mkindi',13,'★ Tawi la Chachika',gSelemaniMk,{female:true});

// Watoto wa Ally Mkindi (Gen 13)
p('Zuberi Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
const gHabibuAly = p('Habibu Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
const gHalifaAly = p('Halifa Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
const gOmariAly = p('Omari Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
p('Mwalimu Nasibu Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
p('Mustafa Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
const gCharokiwaAly = p('Charokiwa / Yunusi Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
const gZiliAly = p('Zili / Njeta Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
p('Juma Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
const gMustafaAly2 = p('Mustafa II Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk);
p('Bi Zuhura Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk,{female:true});
p('Bi Rafia Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk,{female:true});
p('Bi Husna Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk,{female:true});
p('Bi Nangera Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk,{female:true});
p('Bi Mwanasha Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk,{female:true});
p('Bi Rose Ally Mkindi',13,'★ Tawi la Chachika',gAllyMk,{female:true});

// Watoto wa Iddi Mkindi (Gen 13)
p('Hashimu Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk);
p('Haruni Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk);
p('Nurdini Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk);
p('Hafidhu Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk);
p('Mwejuma / Naneke Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk);
p('Kisenge Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk);
p('Bi Hajjat Amina Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});
p('Bi Asia Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});
p('Bi Rukia Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});
p('Bi Ridhaa Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});
p('Bi Mwanaidi Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});
p('Bi Kali Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});
p('Bi Zera / Namkeshe Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});
p('Bi Hidaya Iddi Mkindi',13,'★ Tawi la Chachika',gIddiMk,{female:true});

// Watoto wa Yusufu Mkindi (Gen 13)
p('Adini Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk);
p('Swalehe Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk);
p('Bi Zeina Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Mariamu Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Zamza Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Maimuna Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Sarifa Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Mbweza Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Zukra Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Fatuma Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});
p('Bi Mwajuma Yusufu Mkindi',13,'★ Tawi la Chachika',gYusufuMk,{female:true});

// Watoto wa Stephano Mkulungu (Gen 14)
p('Azirieli Stephano Mkulungu',14,'★ Tawi la Chachika',gStephanoMk);
p('Afitieli Stephano Mkulungu',14,'★ Tawi la Chachika',gStephanoMk);
p('Tumaini Stephano Mkulungu',14,'★ Tawi la Chachika',gStephanoMk);
p('John Stephano Mkulungu',14,'★ Tawi la Chachika',gStephanoMk);
p('Ezra Stephano Mkulungu',14,'★ Tawi la Chachika',gStephanoMk);
p('Athumani Stephano Mkulungu',14,'★ Tawi la Chachika',gStephanoMk);
p('Shabani Stephano Mkulungu',14,'★ Tawi la Chachika',gStephanoMk);

// Watoto wa Muhidini Shabani (Gen 14)
p('Abasi Muhidini Shabani Mkindi',14,'★ Tawi la Chachika',gMuhidiniSh);
p('Hamza Muhidini Shabani Mkindi',14,'★ Tawi la Chachika',gMuhidiniSh);
p('Bi Hadija Muhidini Shabani',14,'★ Tawi la Chachika',gMuhidiniSh,{female:true});
p('Bi Farida Muhidini Shabani',14,'★ Tawi la Chachika',gMuhidiniSh,{female:true});
p('Bi Shamimu Muhidini Shabani',14,'★ Tawi la Chachika',gMuhidiniSh,{female:true});
p('Bi Yasimini Muhidini Shabani',14,'★ Tawi la Chachika',gMuhidiniSh,{female:true});
p('Bi Arafa Muhidini Shabani',14,'★ Tawi la Chachika',gMuhidiniSh,{female:true});

// Watoto wa Ayubu Shabani (Gen 14)
p('Shabani / Chabalo Ayubu Shabani Mkindi',14,'★ Tawi la Chachika',gAyubuSh);
p('Hassani Ayubu Shabani Mkindi',14,'★ Tawi la Chachika',gAyubuSh);
p('Huseni Ayubu Shabani Mkindi',14,'★ Tawi la Chachika',gAyubuSh);
p('Bi Ashura Ayubu Shabani Mkindi',14,'★ Tawi la Chachika',gAyubuSh,{female:true});
p('Bi Hadija Ayubu Shabani Mkindi',14,'★ Tawi la Chachika',gAyubuSh,{female:true});

// Watoto wa Ramadhani Athumani (Gen 14)
const gAlhajiAbdR = p('Alhaji Abdallah / Shabani Ramadhani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt);
p('Athumani Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt);
p('Hamadi Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt);
p('Nuhu Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt);
p('Selemani Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt);
p('Bi Mariamu Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt,{female:true});
p('Bi Nema Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt,{female:true});
p('Bi Mwajuma Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt,{female:true});
p('Bi Asinati Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt,{female:true});
p('Bi Amina Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt,{female:true});
p('Bi Asia Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt,{female:true});
p('Bi Zuhura Ramadhani Athumani Mkindi',14,'★ Tawi la Chachika',gRamadhaniAt,{female:true});

// Watoto wa Abdi Athumani (Gen 14)
const gAminiAbdi = p('Amini Abdi Athumani Mkindi',14,'★ Tawi la Chachika',gAbdiAt);
p('Athumani Abdi Athumani Mkindi',14,'★ Tawi la Chachika',gAbdiAt);
const gMerajiAbdi = p('Meraji / Mkulungu Abdi Athumani Mkindi',14,'★ Tawi la Chachika',gAbdiAt);
p('Bi Zuhura Abdi Athumani Mkindi',14,'★ Tawi la Chachika',gAbdiAt,{female:true});

// Watoto wa Sadiki Athumani (Gen 14)
p('Habibu Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt);
p('Bakari Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt);
p('Athumani Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt);
p('Twalbu Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt);
p('Bi Mariamu Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});
p('Bi Fatuma Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});
p('Bi Hadija Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});
p('Bi Zuhura Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});
p('Bi Halima Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});
p('Bi Mwanaidi Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});
p('Bi Mwanaima Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});
p('Bi Agness Sadiki Athumani Mkindi',14,'★ Tawi la Chachika',gSadikiAt,{female:true});

// Watoto wa Abdallah Athumani (Gen 14)
p('Majaliwa Abdallah Athumani Mkindi',14,'★ Tawi la Chachika',gAbdallahAt);
p('Bi Zuhura I Abdallah Athumani',14,'★ Tawi la Chachika',gAbdallahAt,{female:true});
p('Bi Mwajabu Abdallah Athumani',14,'★ Tawi la Chachika',gAbdallahAt,{female:true});
p('Bi Asina Abdallah Athumani',14,'★ Tawi la Chachika',gAbdallahAt,{female:true});
p('Bi Zaina Abdallah Athumani',14,'★ Tawi la Chachika',gAbdallahAt,{female:true});
p('Bi Mariamu Abdallah Athumani',14,'★ Tawi la Chachika',gAbdallahAt,{female:true});
p('Bi Hawa Abdallah Athumani',14,'★ Tawi la Chachika',gAbdallahAt,{female:true});

// Watoto wa Hija Athumani (Gen 14)
p('Ramadhani Hija Athumani Mkindi',14,'★ Tawi la Chachika',gHijaAt);
p('Majaliwa Hija Athumani Mkindi',14,'★ Tawi la Chachika',gHijaAt);
p('Bi Zuhura Hija Athumani',14,'★ Tawi la Chachika',gHijaAt,{female:true});

// Watoto wa Haji Athumani (Gen 14)
p('Bi Asia Haji Athumani Mkindi',14,'★ Tawi la Chachika',gHajiAt,{female:true});

// Watoto wa Sudi Athumani (Gen 14)
p('Shabani Sudi Athumani Mkindi',14,'★ Tawi la Chachika',gSudiAt);
p('Bi Zuhura Sudi Athumani',14,'★ Tawi la Chachika',gSudiAt,{female:true});
p('Bi Mariamu Sudi Athumani',14,'★ Tawi la Chachika',gSudiAt,{female:true});
p('Bi Zaina Sudi Athumani',14,'★ Tawi la Chachika',gSudiAt,{female:true});

// Watoto wa Musa Selemani Mkindi (Gen 14)
const gAliMusaSel = p('Ali Musa Selemani Mkindi',14,'★ Tawi la Chachika',gMusaSel);
p('Selemani Musa Selemani Mkindi',14,'★ Tawi la Chachika',gMusaSel);
const gAwadhiMusaSel = p('Awadhi / Karunde Musa Selemani Mkindi',14,'★ Tawi la Chachika',gMusaSel);
p('Bi Mwanasha / Sofia Musa Selemani',14,'★ Tawi la Chachika',gMusaSel,{female:true});
p('Bi Swaiba Musa Selemani',14,'★ Tawi la Chachika',gMusaSel,{female:true});
p('Bi Naky Musa Selemani',14,'★ Tawi la Chachika',gMusaSel,{female:true});

// Watoto wa Aliamini Selemani (Gen 14)
p('Ally Aliamini Selemani Mkindi',14,'★ Tawi la Chachika',gAliaminiSel);
p('Imamu Aliamini Selemani Mkindi',14,'★ Tawi la Chachika',gAliaminiSel);
p('Twaha Aliamini Selemani Mkindi',14,'★ Tawi la Chachika',gAliaminiSel);
p('Shedafa Aliamini Selemani Mkindi',14,'★ Tawi la Chachika',gAliaminiSel);
p('Bi Mwanasha Aliamini Selemani',14,'★ Tawi la Chachika',gAliaminiSel,{female:true});

// Watoto wa Fadhili Selemani (Gen 14)
const gIbrahimuFad = p('Ibrahimu Fadhili Selemani Mkindi',14,'★ Tawi la Chachika',gFadhiliSel);
p('Rahibu Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel);
p('Selemani Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel);
p('Abdallah Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel);
p('Alli Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel);
p('Bi Mwajuma Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel,{female:true});
p('Bi Hadija Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel,{female:true});
p('Bi Zainabu Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel,{female:true});
p('Bi Aisha Fadhili Selemani',14,'★ Tawi la Chachika',gFadhiliSel,{female:true});

// Watoto wa Karimu Selemani (Gen 14)
p('Selemani Karimu Selemani Mkindi',14,'★ Tawi la Chachika',gKarimuSel);
p('Bi Farida Karimu Selemani',14,'★ Tawi la Chachika',gKarimuSel,{female:true});
p('Bi Mwanaidi Karimu Selemani',14,'★ Tawi la Chachika',gKarimuSel,{female:true});
p('Bi Mwanasha Karimu Selemani',14,'★ Tawi la Chachika',gKarimuSel,{female:true});
p('Bi Mariamu / Namacheja Karimu Selemani',14,'★ Tawi la Chachika',gKarimuSel,{female:true});

// Watoto wa Dr Yasini Selemani (Gen 14)
p('Selemani I Yasini Selemani Mkindi',14,'★ Tawi la Chachika',gYasiniSel);
p('Selemani II Yasini Selemani Mkindi',14,'★ Tawi la Chachika',gYasiniSel);
p('Bi Nakiete Yasini Selemani',14,'★ Tawi la Chachika',gYasiniSel,{female:true});
p('Bi Rehema Yasini Selemani',14,'★ Tawi la Chachika',gYasiniSel,{female:true});

// Watoto wa Habibu Ally Mkindi (Gen 14)
p('Ally Subira Habibu Ally Mkindi',14,'★ Tawi la Chachika',gHabibuAly);
p('Yusufu / Kanyempwe Habibu Ally Mkindi',14,'★ Tawi la Chachika',gHabibuAly);
p('Bi Rehema / Mwanamina Habibu Ally',14,'★ Tawi la Chachika',gHabibuAly,{female:true});
p('Bi Mwanaidi / Beresha Habibu Ally',14,'★ Tawi la Chachika',gHabibuAly,{female:true});
p('Bi Shufaa / Mwanasha Habibu Ally',14,'★ Tawi la Chachika',gHabibuAly,{female:true});

// Watoto wa Halifa Ally Mkindi (Gen 14)
p('Ally Halifa Ally Mkindi',14,'★ Tawi la Chachika',gHalifaAly);
p('Selemani Halifa Ally Mkindi',14,'★ Tawi la Chachika',gHalifaAly);
p('Shabani Halifa Ally Mkindi',14,'★ Tawi la Chachika',gHalifaAly);
p('Mweshehe / Issa Halifa Ally Mkindi',14,'★ Tawi la Chachika',gHalifaAly);
p('Kakindo / Hemedi Halifa Ally Mkindi',14,'★ Tawi la Chachika',gHalifaAly);
p('Mwedadi Halifa Ally Mkindi',14,'★ Tawi la Chachika',gHalifaAly);
p('Bi Mwalimu Mwanamina Halifa Ally',14,'★ Tawi la Chachika',gHalifaAly,{female:true});
p('Bi Ndemwilisa / Hedi Halifa Ally',14,'★ Tawi la Chachika',gHalifaAly,{female:true});

// Watoto wa Omari Ally Mkindi (Gen 14)
p('Ali Omari Ally Mkindi',14,'★ Tawi la Chachika',gOmariAly);
p('Shabani Omari Ally Mkindi',14,'★ Tawi la Chachika',gOmariAly);
p('Musa Omari Ally Mkindi',14,'★ Tawi la Chachika',gOmariAly);
p('Selemani Omari Ally Mkindi',14,'★ Tawi la Chachika',gOmariAly);
p('Bi Mwanamina Omari Ally',14,'★ Tawi la Chachika',gOmariAly,{female:true});
p('Bi Hadija Omari Ally',14,'★ Tawi la Chachika',gOmariAly,{female:true});
p('Bi Zeinabu Omari Ally',14,'★ Tawi la Chachika',gOmariAly,{female:true});
p('Bi Nakiete Omari Ally',14,'★ Tawi la Chachika',gOmariAly,{female:true});
p('Bi Aisha Omari Ally',14,'★ Tawi la Chachika',gOmariAly,{female:true});
p('Bi Mwantumu Omari Ally',14,'★ Tawi la Chachika',gOmariAly,{female:true});

// Watoto wa Charokiwa Ally Mkindi (Gen 14)
p('Shomari Charokiwa Ally Mkindi',14,'★ Tawi la Chachika',gCharokiwaAly);
p('Athumani Charokiwa Ally Mkindi',14,'★ Tawi la Chachika',gCharokiwaAly);
p('Bi Hadija Charokiwa Ally',14,'★ Tawi la Chachika',gCharokiwaAly,{female:true});

// Watoto wa Zili Ally Mkindi (Gen 14)
p('Ali Zili Ally Mkindi',14,'★ Tawi la Chachika',gZiliAly);
p('Bi Amina Zili Ally',14,'★ Tawi la Chachika',gZiliAly,{female:true});
p('Bi Safiyuna Zili Ally',14,'★ Tawi la Chachika',gZiliAly,{female:true});

// Watoto wa Mustafa II Ally Mkindi (Gen 14)
p('Ali Mustafa II Ally Mkindi',14,'★ Tawi la Chachika',gMustafaAly2);

// Alhaji Abdallah Ramadhani (Gen 15)
p('Tariq Abdallah Ramadhani Mkindi',15,'★ Tawi la Chachika',gAlhajiAbdR);
p('Bi Tazmeen / Sabitina Abdallah Ramadhani',15,'★ Tawi la Chachika',gAlhajiAbdR,{female:true});

// Amini Abdi (Gen 15)
p('Abdi Amini Abdi Athumani Mkindi',15,'★ Tawi la Chachika',gAminiAbdi);
p('Shabani Amini Abdi Athumani',15,'★ Tawi la Chachika',gAminiAbdi);

// Meraji Abdi (Gen 15)
p('Bi Zeinabu Meraji Abdi Athumani',15,'★ Tawi la Chachika',gMerajiAbdi,{female:true});

// Ali Musa Selemani (Gen 15)
p('Musa Ali Musa Selemani',15,'★ Tawi la Chachika',gAliMusaSel);
p('Bi Aziza Ali Musa Selemani',15,'★ Tawi la Chachika',gAliMusaSel,{female:true});
p('Bi Paulina Ali Musa Selemani',15,'★ Tawi la Chachika',gAliMusaSel,{female:true});
p('Bi Elimweka Ali Musa Selemani',15,'★ Tawi la Chachika',gAliMusaSel,{female:true});

// Awadhi Musa Selemani (Gen 15)
p('Musa Awadhi Musa Selemani',15,'★ Tawi la Chachika',gAwadhiMusaSel);
p('Rajabu Awadhi Musa Selemani',15,'★ Tawi la Chachika',gAwadhiMusaSel);
p('Aliamini Awadhi Musa Selemani',15,'★ Tawi la Chachika',gAwadhiMusaSel);

// Ibrahimu Fadhili (Gen 15)
p('Selemani Ibrahimu Fadhili Selemani',15,'★ Tawi la Chachika',gIbrahimuFad);
p('Abdallah Ibrahimu Fadhili Selemani',15,'★ Tawi la Chachika',gIbrahimuFad);
p('Ally Ibrahimu Fadhili Selemani',15,'★ Tawi la Chachika',gIbrahimuFad);
p('Rajabu Ibrahimu Fadhili Selemani',15,'★ Tawi la Chachika',gIbrahimuFad);

// ── 6. HASSANI MANGARE (Gen 12→13) ──
const gShabaniHM = p('Shabani Hassani Mangare',12,'★ Tawi la Chachika',gHassaniM);
p('Diwani Hassani Mangare',12,'★ Tawi la Chachika',gHassaniM);
p('Mthime Hassani Mangare',12,'★ Tawi la Chachika',gHassaniM);
p('Ali / Kanyempwe Hassani Mangare',12,'★ Tawi la Chachika',gHassaniM);
p('Bi Tabu Hassani Mangare',12,'★ Tawi la Chachika',gHassaniM,{female:true});
p('Bi Amina Hassani Mangare',12,'★ Tawi la Chachika',gHassaniM,{female:true});
p('Bi Aziza Hassani Mangare',12,'★ Tawi la Chachika',gHassaniM,{female:true});

// ── 7. SELEMANI MANGARE (Gen 12→13) ──
const gHemediSM = p('Hemedi / Mangare Selemani Mangare',12,'★ Tawi la Chachika',gSelemaniM);
p('Hassani / Senkondo Selemani Mangare',12,'★ Tawi la Chachika',gSelemaniM);
p('Bi Mwanaidi Selemani Mangare',12,'★ Tawi la Chachika',gSelemaniM,{female:true});
p('Bi Hadija Selemani Mangare',12,'★ Tawi la Chachika',gSelemaniM,{female:true});
p('Bi Rabia Selemani Mangare',12,'★ Tawi la Chachika',gSelemaniM,{female:true});
p('Bi Amina Selemani Mangare',12,'★ Tawi la Chachika',gSelemaniM,{female:true});

// ════════════════════════════════════════════════════════════════════
// MPOA MRONGA — Kizazi 11 hadi 15
// ════════════════════════════════════════════════════════════════════

// Kizazi 11 — Watoto wa Mpoa
const gNgainaMpoa = p('Ngaina Mpoa Mronga',11,'★ Tawi la Chachika',gMpoa);
const gMavuraMpoa = p('Mavura Mpoa Mronga',11,'★ Tawi la Chachika',gMpoa);

// Kizazi 12 — Watoto wa Ngaina
const gLukwaroNg = p('Lukwaro Ngaina Mpoa',12,'★ Tawi la Chachika',gNgainaMpoa);
p('Johari Ngaina Mpoa',12,'★ Tawi la Chachika',gNgainaMpoa);
const gAthumaniNg = p('Athumani Ngaina Mpoa',12,'★ Tawi la Chachika',gNgainaMpoa);
const gMghereNg = p('Mghere Ngaina Mpoa',12,'★ Tawi la Chachika',gNgainaMpoa);

// Kizazi 12 — Watoto wa Mavura
const gAbdallahMav = p('Abdallah / Kagoswe Mavura Mpoa',12,'★ Tawi la Chachika',gMavuraMpoa);

// Kizazi 13 — Watoto wa Lukwaro
p('Rajabu Lukwaro Ngaina Mpoa',13,'★ Tawi la Chachika',gLukwaroNg);
p('Juma Lukwaro Ngaina Mpoa',13,'★ Tawi la Chachika',gLukwaroNg);
p('Ramadhani Lukwaro Ngaina Mpoa',13,'★ Tawi la Chachika',gLukwaroNg);

// Kizazi 13 — Watoto wa Athumani Ngaina
p('Hamisi Athumani Ngaina Mpoa',13,'★ Tawi la Chachika',gAthumaniNg);
p('Ramadhani Athumani Ngaina Mpoa',13,'★ Tawi la Chachika',gAthumaniNg);
p('Mavura Athumani Ngaina Mpoa',13,'★ Tawi la Chachika',gAthumaniNg);
p('Ngaina Athumani Ngaina Mpoa',13,'★ Tawi la Chachika',gAthumaniNg);

// Kizazi 13 — Watoto wa Mghere Ngaina
p('Salehe Mghere Ngaina Mpoa',13,'★ Tawi la Chachika',gMghereNg);
p('Hemedi Mghere Ngaina Mpoa',13,'★ Tawi la Chachika',gMghereNg);
p('Mahamudu Mghere Ngaina Mpoa',13,'★ Tawi la Chachika',gMghereNg);

// Kizazi 13 — Watoto wa Abdallah/Kagoswe
const gMahamediAbd = p('Mahamedi Abdallah Mavura Mpoa',13,'★ Tawi la Chachika',gAbdallahMav);
const gHemediAbd = p('Hemedi / Kadingili Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav);
const gMaulidiAbd = p('Maulidi Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav);
const gFadhilahiAbd = p('Fadhilahi / Maghembe Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav);
const gRajabuAbd = p('Dr Rajabu / Ngaina Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav);
p('Ikuji Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav);
p('Bi Hadija Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav,{female:true});
p('Bi Namwaka / Mwanamisi Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav,{female:true});
p('Bi Namvua Abdallah Mavura',13,'★ Tawi la Chachika',gAbdallahMav,{female:true});

// Kizazi 14 — Watoto wa Mahamedi Abdallah
const gAmiriMah = p('Mwalimu Amiri Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd);
p('Abdallah Mahamedi Abdallah Mavura',14,'★ Tawi la Chachika',gMahamediAbd);
p('Ahmadu / Kachenje Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd);
p('Athumani Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd);
p('Mwalimu Abdi / Njule Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd);
p('Bi Mwalimu Zeinabu / Saina Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd,{female:true});
p('Bi Asumina Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd,{female:true});
p('Bi Fatuma Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd,{female:true});
p('Bi Huwaida Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd,{female:true});
p('Bi Jubi Mahamedi Abdallah',14,'★ Tawi la Chachika',gMahamediAbd,{female:true});

// Kizazi 14 — Watoto wa Hemedi/Kadingili
p('Abdul Hemedi Abdallah Mavura',14,'★ Tawi la Chachika',gHemediAbd);
p('Riziki Hemedi Abdallah Mavura',14,'★ Tawi la Chachika',gHemediAbd);
p('Habibu Hemedi Abdallah Mavura',14,'★ Tawi la Chachika',gHemediAbd);
p('Salimu Hemedi Abdallah Mavura',14,'★ Tawi la Chachika',gHemediAbd);
p('Lukwaro Hemedi Abdallah Mavura',14,'★ Tawi la Chachika',gHemediAbd);
p('Ali Hemedi Abdallah Mavura',14,'★ Tawi la Chachika',gHemediAbd);
p('Bi Mwalimu Mwajuma Hemedi Abdallah',14,'★ Tawi la Chachika',gHemediAbd,{female:true});
p('Bi Mwalimu Mwanahamisi Hemedi Abdallah',14,'★ Tawi la Chachika',gHemediAbd,{female:true});
p('Bi Hawa / Kitete Hemedi Abdallah',14,'★ Tawi la Chachika',gHemediAbd,{female:true});
p('Bi Halima / Nashera Hemedi Abdallah',14,'★ Tawi la Chachika',gHemediAbd,{female:true});
p('Bi Fatuma Hemedi Abdallah',14,'★ Tawi la Chachika',gHemediAbd,{female:true});
p('Bi Shemza Hemedi Abdallah',14,'★ Tawi la Chachika',gHemediAbd,{female:true});
p('Bi Amina Hemedi Abdallah',14,'★ Tawi la Chachika',gHemediAbd,{female:true});

// Kizazi 14 — Watoto wa Maulidi
p('Abdallah Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd);
p('Rashidi Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd);
p('Kachenje Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd);
p('Ramadhani Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd);
p('Lukwaro Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd);
p('Mahamudu Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd);
p('Bi Fatuma Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd,{female:true});
p('Bi Cheshije Maulidi Abdallah',14,'★ Tawi la Chachika',gMaulidiAbd,{female:true});

// Kizazi 14 — Watoto wa Fadhilahi
p('Abdallah Fadhilahi Abdallah Mavura',14,'★ Tawi la Chachika',gFadhilahiAbd);
p('Mweta Fadhilahi Abdallah Mavura',14,'★ Tawi la Chachika',gFadhilahiAbd);
p('Bi Fatuma Fadhilahi Abdallah Mavura',14,'★ Tawi la Chachika',gFadhilahiAbd,{female:true});

// Kizazi 14 — Watoto wa Dr Rajabu/Ngaina
p('Abtwaha / Kachenje Rajabu Abdallah',14,'★ Tawi la Chachika',gRajabuAbd);
p('Dr Daudi Rajabu Abdallah',14,'★ Tawi la Chachika',gRajabuAbd);
p('Dr Abdallah Rajabu Abdallah',14,'★ Tawi la Chachika',gRajabuAbd);
p('Issa Rajabu Abdallah',14,'★ Tawi la Chachika',gRajabuAbd);
p('Bi Maimuna Rajabu Abdallah',14,'★ Tawi la Chachika',gRajabuAbd,{female:true});
p('Bi Razia / Majabu Rajabu Abdallah',14,'★ Tawi la Chachika',gRajabuAbd,{female:true});

// Kizazi 15 — Watoto wa Amiri Mahamedi
p('Mohamedi I Amiri Mahamedi Abdallah',15,'★ Tawi la Chachika',gAmiriMah);
p('Mohamedi II Amiri Mahamedi Abdallah',15,'★ Tawi la Chachika',gAmiriMah);
p('Bi Rehema Amiri Mahamedi Abdallah',15,'★ Tawi la Chachika',gAmiriMah,{female:true});
p('Bi Swaumu Amiri Mahamedi Abdallah',15,'★ Tawi la Chachika',gAmiriMah,{female:true});
p('Bi Mwanasha Amiri Mahamedi Abdallah',15,'★ Tawi la Chachika',gAmiriMah,{female:true});

// ════════════════════════════════════════════════════════════════════
// LUNGA / KIBAKAYA — Vizazi vilivyokosekana
// ════════════════════════════════════════════════════════════════════

// Saidi Kibakaya (Gen 12)
const gAhmediSK = p('Ahmedi / Kibakaya Saidi Kibakaya',12,'★ Tawi la Chachika',gSaidiKib);
const gAyubuSK = p('Ayubu / Lathima Saidi Kibakaya',12,'★ Tawi la Chachika',gSaidiKib);
const gFaluhumu = p('Faluhumu / Kibakaya Saidi Kibakaya',12,'★ Tawi la Chachika',gSaidiKib);
p('Aziza / Makadhani Saidi Kibakaya',12,'★ Tawi la Chachika',gSaidiKib);
p('Hashimu Saidi Kibakaya',12,'★ Tawi la Chachika',gSaidiKib);
p('Bi Abituni Saidi Kibakaya',12,'★ Tawi la Chachika',gSaidiKib,{female:true});
p('Bi Mwanaumu Saidi Kibakaya',12,'★ Tawi la Chachika',gSaidiKib,{female:true});

// Mussa Kibakaya (Gen 12)
const gMustafaMK = p('Mustafa / Kibakaya Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib);
const gJumaMK = p('Juma / Ali Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib);
const gNasriMK = p('Dr Nasri / Kisenge Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib);
const gNasibuMK = p('Nasibu / Kibakaya Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib);
const gYunusiMK = p('Yunusi / Lutheko Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib);
p('Bi Mariamu Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib,{female:true});
p('Bi Asia Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib,{female:true});
p('Bi Sofia Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib,{female:true});
p('Bi Neema Mussa Kibakaya',12,'★ Tawi la Chachika',gMussaKib,{female:true});

// Selemani Kibakaya (Gen 12)
const gSaidiSKib = p('Saidi Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib);
const gKisengeSKib = p('Kisenge Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib);
p('Inua Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib);
p('Bi Sofia Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib,{female:true});
p('Bi Amina Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib,{female:true});
p('Bi Salma Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib,{female:true});
p('Bi Mwanaidi Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib,{female:true});
p('Bi Makathani Selemani Kibakaya',12,'★ Tawi la Chachika',gSelemaniKib,{female:true});

// Gen 13 — Saidi Kibakaya's children
const gAhmediSK2 = p('Musa Ahmedi Saidi Kibakaya',13,'★ Tawi la Chachika',gAhmediSK);
p('Nurdini Ahmedi Saidi Kibakaya',13,'★ Tawi la Chachika',gAhmediSK);
p('Bi Mwajabu Ahmedi Saidi Kibakaya',13,'★ Tawi la Chachika',gAhmediSK,{female:true});
p('Bi Mwanahawa Ahmedi Saidi Kibakaya',13,'★ Tawi la Chachika',gAhmediSK,{female:true});
p('Bi Zahirina Ahmedi Saidi Kibakaya',13,'★ Tawi la Chachika',gAhmediSK,{female:true});
p('Bi Natujwa Ahmedi Saidi Kibakaya',13,'★ Tawi la Chachika',gAhmediSK,{female:true});

p('Timotheo / Kidandathi Faluhumu Saidi',13,'★ Tawi la Chachika',gFaluhumu);
p('Bakari Faluhumu Saidi Kibakaya',13,'★ Tawi la Chachika',gFaluhumu);
p('Bi Tatu Faluhumu Saidi',13,'★ Tawi la Chachika',gFaluhumu,{female:true});
p('Bi Mwajabu Faluhumu Saidi',13,'★ Tawi la Chachika',gFaluhumu,{female:true});

// Gen 13 — Mussa Kibakaya's children
p('Saidi Mustafa Mussa Kibakaya',13,'★ Tawi la Chachika',gMustafaMK);
const gMuhsiniMK = p('Muhsini / Martini Mustafa Mussa Kibakaya',13,'★ Tawi la Chachika',gMustafaMK);
p('Timotheo / Kida / Ali Mustafa Mussa',13,'★ Tawi la Chachika',gMustafaMK);
p('Bi Mwanahawa Mustafa Mussa',13,'★ Tawi la Chachika',gMustafaMK,{female:true});
p('Bi Amina Mustafa Mussa Kibakaya',13,'★ Tawi la Chachika',gMustafaMK,{female:true});
p('Bi Zeinabu Mustafa Mussa Kibakaya',13,'★ Tawi la Chachika',gMustafaMK,{female:true});

p('Ali / Timotheo Juma Mussa Kibakaya',13,'★ Tawi la Chachika',gJumaMK);
p('Shabani Juma Mussa Kibakaya',13,'★ Tawi la Chachika',gJumaMK);
p('Bi Tatu Juma Mussa Kibakaya',13,'★ Tawi la Chachika',gJumaMK,{female:true});
p('Bi Shamim / Amina Juma Mussa',13,'★ Tawi la Chachika',gJumaMK,{female:true});

p('Musa I Nasri Mussa Kibakaya',13,'★ Tawi la Chachika',gNasriMK);
p('Musa II Nasri Mussa Kibakaya',13,'★ Tawi la Chachika',gNasriMK);
p('Bi Salma Nasri Mussa Kibakaya',13,'★ Tawi la Chachika',gNasriMK,{female:true});

p('Abubakar Nasibu Mussa Kibakaya',13,'★ Tawi la Chachika',gNasibuMK);
p('Ali Nasibu Mussa Kibakaya',13,'★ Tawi la Chachika',gNasibuMK);

p('Bi Zeinabu Yunusi Mussa Kibakaya',13,'★ Tawi la Chachika',gYunusiMK,{female:true});
p('Bi Yusra Yunusi Mussa Kibakaya',13,'★ Tawi la Chachika',gYunusiMK,{female:true});

// Gen 13 — Selemani Kibakaya's children
p('Selemani Saidi Selemani Kibakaya',13,'★ Tawi la Chachika',gSaidiSKib);
p('Bi Nakiete Saidi Selemani Kibakaya',13,'★ Tawi la Chachika',gSaidiSKib,{female:true});
p('Selemani Kisenge Selemani Kibakaya',13,'★ Tawi la Chachika',gKisengeSKib);

// Gen 13 — Timotheo children
p('Musa Rogers Timotheo Kibakaya',13,'★ Tawi la Chachika',gRogersT);
p('Bi Irene Rogers Timotheo',13,'★ Tawi la Chachika',gRogersT,{female:true});
p('Bi Ester Rogers Timotheo',13,'★ Tawi la Chachika',gRogersT,{female:true});
p('Bi Debo Rogers Timotheo',13,'★ Tawi la Chachika',gRogersT,{female:true});

p('Hendry Jimmy Timotheo Kibakaya',13,'★ Tawi la Chachika',gJimmyT);
p('David Jimmy Timotheo Kibakaya',13,'★ Tawi la Chachika',gJimmyT);
p('Fred Jimmy Timotheo Kibakaya',13,'★ Tawi la Chachika',gJimmyT);
p('Bi Eva Jimmy Timotheo',13,'★ Tawi la Chachika',gJimmyT,{female:true});
p('Bi Jackline Jimmy Timotheo',13,'★ Tawi la Chachika',gJimmyT,{female:true});

p('Timotheo Wiston Timotheo Kibakaya',13,'★ Tawi la Chachika',gWistonT);
p('Carlos Wiston Timotheo Kibakaya',13,'★ Tawi la Chachika',gWistonT);

p('Timotheo Ngulue Timotheo Kibakaya',13,'★ Tawi la Chachika',gMosesT);
p('Bi Evaline Ngulue Timotheo',13,'★ Tawi la Chachika',gMosesT,{female:true});

p('Bi Mariamu George Timotheo Kibakaya',13,'★ Tawi la Chachika',gGeorgeT,{female:true});

p('Musa Yatera Timotheo Kibakaya',13,'★ Tawi la Chachika',gYateraT);
p('Kurwa Yatera Timotheo Kibakaya',13,'★ Tawi la Chachika',gYateraT);
p('Dotto Yatera Timotheo Kibakaya',13,'★ Tawi la Chachika',gYateraT);

// Gen 14 — Musa Ahmedi
p('Ahamedi Musa Ahmedi Saidi Kibakaya',14,'★ Tawi la Chachika',gAhmediSK2);
p('Bakari Musa Ahmedi Saidi Kibakaya',14,'★ Tawi la Chachika',gAhmediSK2);
p('Bi Neema Musa Ahmedi',14,'★ Tawi la Chachika',gAhmediSK2,{female:true});
p('Bi Hawa Musa Ahmedi',14,'★ Tawi la Chachika',gAhmediSK2,{female:true});

// Gen 14 — Muhsini Mustafa
p('Bi Amina Muhsini Mustafa Musa',14,'★ Tawi la Chachika',gMuhsiniMK,{female:true});

// ════════════════════════════════════════════════════════════════════
// SEKALATI CHACHIKA
// ════════════════════════════════════════════════════════════════════
const gSekalatiC = p('Sekalati Chachika',9,'★ Tawi la Chachika',gChachika,{location:'Kisaka'});
const gMadiwaS = p('Madiwa Sekalati Chachika',10,'★ Tawi la Chachika',gSekalatiC);

// Gen 11 — Watoto wa Madiwa
const gKisakaM = p('Kisaka Madiwa Sekalati',11,'★ Tawi la Chachika',gMadiwaS);
p('Mramba / Kireri Madiwa Sekalati',11,'★ Tawi la Chachika',gMadiwaS);
p('Bi Mariamu Madiwa Sekalati',11,'★ Tawi la Chachika',gMadiwaS,{female:true});
p('Bi Nampombe Madiwa Sekalati',11,'★ Tawi la Chachika',gMadiwaS,{female:true});

// Gen 12 — Watoto wa Kisaka Madiwa
const gRamadhaniKis = p('Ramadhani / Makuna Kisaka Madiwa',12,'★ Tawi la Chachika',gKisakaM);
const gAliKis = p('Ally / Sekekoha Kisaka Madiwa',12,'★ Tawi la Chachika',gKisakaM);
const gIddiKis = p('Iddi / Nguruta Kisaka Madiwa',12,'★ Tawi la Chachika',gKisakaM);
const gAthumaniKis = p('Athumani / Baridi Kisaka Madiwa',12,'★ Tawi la Chachika',gKisakaM);
const gMohamediKis = p('Mohamedi / Posho Kisaka Madiwa',12,'★ Tawi la Chachika',gKisakaM);
p('Bi Mwanaidi Kisaka Madiwa',12,'★ Tawi la Chachika',gKisakaM,{female:true});
p('Bi Amina Kisaka Madiwa',12,'★ Tawi la Chachika',gKisakaM,{female:true});

// Gen 13 — Watoto wa Ramadhani Kisaka
const gAhmediRK = p('Ahmedi Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis);
const gNasibuRK = p('Nasibu / Kisaka Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis);
const gHabibuRK = p('Habibu Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis);
p('Bi Mamndoa Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis,{female:true});
p('Bi Arafa Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis,{female:true});
p('Bi Sakina Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis,{female:true});
p('Bi Rozina Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis,{female:true});
p('Bi Hawa Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis,{female:true});
p('Bi Habiba Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis,{female:true});
p('Bi Mwamvita Ramadhani Kisaka',13,'★ Tawi la Chachika',gRamadhaniKis,{female:true});

// Gen 13 — Ali Kisaka
const gIzhakaAK = p('Izhaka Ali Kisaka',13,'★ Tawi la Chachika',gAliKis);
const gAbdallahAK = p('Abdallah / Kibiloto Ali Kisaka',13,'★ Tawi la Chachika',gAliKis);
const gIdrisaAK = p('Idrisa / Mramba Ali Kisaka',13,'★ Tawi la Chachika',gAliKis);
const gSekieteAK = p('Sekiete Ali Kisaka',13,'★ Tawi la Chachika',gAliKis);
const gFadhiliAK = p('Fadhili Ali Kisaka',13,'★ Tawi la Chachika',gAliKis);
p('Mlavi Ali Kisaka',13,'★ Tawi la Chachika',gAliKis);
p('Bi Mwalimu Nasra Ali Kisaka',13,'★ Tawi la Chachika',gAliKis,{female:true});
p('Bi Mwajuma Ali Kisaka',13,'★ Tawi la Chachika',gAliKis,{female:true});
p('Bi Hawa Ali Kisaka',13,'★ Tawi la Chachika',gAliKis,{female:true});

// Gen 13 — Iddi Kisaka
const gMselemIK = p('Mselem Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis);
const gBurhaniIK = p('Burhani / Mselem Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis);
const gMohamediIK = p('Mohamedi / Kombe Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis);
p('Alli Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis);
p('Kisaka Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis);
p('Bi Mariamu Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Mwanaidi Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Hawa Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Shufaa Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Fatuma Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Risala Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Kadogo Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Shamsia / Kidori Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});
p('Bi Farida Iddi Kisaka',13,'★ Tawi la Chachika',gIddiKis,{female:true});

// Gen 13 — Athumani Kisaka
const gAsirajiAK = p('Asiraji / Kisaka Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis);
const gAllyAthK = p('Ally Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis);
const gAdinaniAK = p('Adinani / Sekiete Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis);
const gAbdilahiAK = p('Abdilahi / Kisamo Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis);
p('Bi Hawa Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis,{female:true});
p('Bi Nzerina Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis,{female:true});
p('Bi Hanifa / Nakwaja Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis,{female:true});
p('Bi Zeituni / Mariamu Athumani Kisaka',13,'★ Tawi la Chachika',gAthumaniKis,{female:true});

// Gen 13 — Mohamedi Kisaka
const gMselemMK = p('Mselem Mohamedi Kisaka',13,'★ Tawi la Chachika',gMohamediKis);
p('Zuli Mohamedi Kisaka',13,'★ Tawi la Chachika',gMohamediKis);
p('Bi Failuna / Namana Mohamedi Kisaka',13,'★ Tawi la Chachika',gMohamediKis,{female:true});
p('Bi Mwajuma Mohamedi Kisaka',13,'★ Tawi la Chachika',gMohamediKis,{female:true});

// Gen 14 — Ahmedi Ramadhani
const gRamadhaniARK = p('Ramadhani Ahmedi Ramadhani Kisaka',14,'★ Tawi la Chachika',gAhmediRK);
const gSelemaniARK = p('Selemani / Kado Ahmedi Ramadhani',14,'★ Tawi la Chachika',gAhmediRK);
const gAliARK = p('Ali Ahmedi Ramadhani Kisaka',14,'★ Tawi la Chachika',gAhmediRK);
p('Abdallah Ahmedi Ramadhani',14,'★ Tawi la Chachika',gAhmediRK);
p('Iddi Ahmedi Ramadhani',14,'★ Tawi la Chachika',gAhmediRK);
p('Zuli Ahmedi Ramadhani',14,'★ Tawi la Chachika',gAhmediRK);
p('Bi Mwajuma Ahmedi Ramadhani',14,'★ Tawi la Chachika',gAhmediRK,{female:true});
p('Bi Pauline Ahmedi Ramadhani',14,'★ Tawi la Chachika',gAhmediRK,{female:true});

// Gen 14 — Nasibu Ramadhani
p('Ramadhani Nasibu Ramadhani Kisaka',14,'★ Tawi la Chachika',gNasibuRK);
p('Bi Mwezine Nasibu Ramadhani',14,'★ Tawi la Chachika',gNasibuRK,{female:true});
p('Bi Mwajuma Nasibu Ramadhani',14,'★ Tawi la Chachika',gNasibuRK,{female:true});
p('Bi Zeinabu Nasibu Ramadhani',14,'★ Tawi la Chachika',gNasibuRK,{female:true});

// Gen 14 — Habibu Ramadhani
p('Bi Halima Habibu Ramadhani Kisaka',14,'★ Tawi la Chachika',gHabibuRK,{female:true});

// Gen 14 — Ali Kisaka's children
p('Ramadhani Izhaka Ali Kisaka',14,'★ Tawi la Chachika',gIzhakaAK);
p('Ali Abdallah Ali Kisaka',14,'★ Tawi la Chachika',gAbdallahAK);
p('Abdi Abdallah Ali Kisaka',14,'★ Tawi la Chachika',gAbdallahAK);
p('Safi Idrisa Ali Kisaka',14,'★ Tawi la Chachika',gIdrisaAK);
p('Bi Rehema Idrisa Ali Kisaka',14,'★ Tawi la Chachika',gIdrisaAK,{female:true});
p('Ramadhani Sekiete Ali Kisaka',14,'★ Tawi la Chachika',gSekieteAK);
p('Ali Fadhili Kisaka',14,'★ Tawi la Chachika',gFadhiliAK);

// Gen 14 — Iddi Kisaka's children
p('Bi Mwanamisi Mselem Iddi',14,'★ Tawi la Chachika',gMselemIK,{female:true});
p('Bi Latifa Mselem Iddi',14,'★ Tawi la Chachika',gMselemIK,{female:true});
p('Bi Sofia Mselem Iddi',14,'★ Tawi la Chachika',gMselemIK,{female:true});
p('Iddi Burhani Iddi Kisaka',14,'★ Tawi la Chachika',gBurhaniIK);
p('Izadini Burhani Iddi Kisaka',14,'★ Tawi la Chachika',gBurhaniIK);
p('Maliki Burhani Iddi Kisaka',14,'★ Tawi la Chachika',gBurhaniIK);
p('Ramadhani Burhani Iddi Kisaka',14,'★ Tawi la Chachika',gBurhaniIK);
p('Iddi Mohamedi Iddi Kisaka',14,'★ Tawi la Chachika',gMohamediIK);
p('Bi Leda Mohamedi Iddi',14,'★ Tawi la Chachika',gMohamediIK,{female:true});

// Gen 14 — Athumani Kisaka children
p('Athumani Asiraji Athumani Kisaka',14,'★ Tawi la Chachika',gAsirajiAK);
p('Fadhili / Mangi Asiraji Athumani',14,'★ Tawi la Chachika',gAsirajiAK);
p('Bi Halima Asiraji Athumani',14,'★ Tawi la Chachika',gAsirajiAK,{female:true});
p('Bi Rauza Asiraji Athumani',14,'★ Tawi la Chachika',gAsirajiAK,{female:true});
p('Athumani Ali Athumani Kisaka',14,'★ Tawi la Chachika',gAllyAthK);
p('Bi Halima Ali Athumani',14,'★ Tawi la Chachika',gAllyAthK,{female:true});
p('Bi Nzerina Ali Athumani',14,'★ Tawi la Chachika',gAllyAthK,{female:true});
p('Athumani Adinani Athumani Kisaka',14,'★ Tawi la Chachika',gAdinaniAK);
p('Hamadi Adinani Athumani',14,'★ Tawi la Chachika',gAdinaniAK);
p('Mahamedi Adinani Athumani',14,'★ Tawi la Chachika',gAdinaniAK);
p('Yusufu Adinani Athumani',14,'★ Tawi la Chachika',gAdinaniAK);
p('Athumani Abdilahi Athumani Kisaka',14,'★ Tawi la Chachika',gAbdilahiAK);
p('Bi Halima Abdilahi Athumani',14,'★ Tawi la Chachika',gAbdilahiAK,{female:true});

// Gen 14 — Mohamedi Kisaka children
p('Mohamedi Mselem Mohamedi Kisaka',14,'★ Tawi la Chachika',gMselemMK);
p('Iddi Mselem Mohamedi Kisaka',14,'★ Tawi la Chachika',gMselemMK);

// Gen 15 — Sekalati
const gJafariRARK = p('Jafari Ramadhani Ahmedi Ramadhani',15,'★ Tawi la Chachika',gRamadhaniARK);
p('Bi Sabitina Ramadhani Ahmedi',15,'★ Tawi la Chachika',gRamadhaniARK,{female:true});
p('Bi Jazila Ramadhani Ahmedi',15,'★ Tawi la Chachika',gRamadhaniARK,{female:true});
p('Asiraji Selemani Ahmedi Ramadhani',15,'★ Tawi la Chachika',gSelemaniARK);
p('Mohamedi Selemani Ahmedi',15,'★ Tawi la Chachika',gSelemaniARK);
p('Bi Sofia Selemani Ahmedi',15,'★ Tawi la Chachika',gSelemaniARK,{female:true});
const gKarimuAA = p('Karimu Ali Ahmedi Ramadhani',15,'★ Tawi la Chachika',gAliARK);
p('Bi Sabitina Ali Ahmedi',15,'★ Tawi la Chachika',gAliARK,{female:true});

// ════════════════════════════════════════════════════════════════════
// IBURA CHACHIKA
// ════════════════════════════════════════════════════════════════════
const gIburaC = p('Ibura Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Hatibu Mshanga — ukoo wake unajulikana kama akina Mshanga.'});
const gMshangaIb = p('Mshanga Ibura Chachika',10,'★ Tawi la Chachika',gIburaC);
p('Mrindoko Ibura Chachika',10,'★ Tawi la Chachika',gIburaC);

// Gen 11 — Watoto wa Mshanga
const gHatibuMsh = p('Hatibu Mshanga Ibura',11,'★ Tawi la Chachika',gMshangaIb);
const gMusaMsh = p('Musa / Barabara Mshanga Ibura',11,'★ Tawi la Chachika',gMshangaIb);
p('Bi Nanzia Mshanga Ibura',11,'★ Tawi la Chachika',gMshangaIb,{female:true});

// Gen 12 — Watoto wa Hatibu
const gMshangaH = p('Mshanga Hatibu Mshanga',12,'★ Tawi la Chachika',gHatibuMsh);
const gMsafiriH = p('Msafiri Hatibu Mshanga',12,'★ Tawi la Chachika',gHatibuMsh);
p('Bi Zeinabu / Mwagha Hatibu Mshanga',12,'★ Tawi la Chachika',gHatibuMsh,{female:true});
p('Bi Rukia / Navoneiwa Hatibu Mshanga',12,'★ Tawi la Chachika',gHatibuMsh,{female:true});
p('Bi Mariamu / Namshamba Hatibu Mshanga',12,'★ Tawi la Chachika',gHatibuMsh,{female:true});

// Gen 12 — Watoto wa Musa
p('Bi Zubeda Musa Mshanga',12,'★ Tawi la Chachika',gMusaMsh,{female:true});
p('Bi Zaia / Namdori Musa Mshanga',12,'★ Tawi la Chachika',gMusaMsh,{female:true});

// Gen 13 — Watoto wa Msafiri
p('Hatibu Msafiri Mshanga',13,'★ Tawi la Chachika',gMsafiriH);
p('Bi Fatuma Msafiri Mshanga',13,'★ Tawi la Chachika',gMsafiriH,{female:true});

// ════════════════════════════════════════════════════════════════════
// IGOMBE / LUKWARO CHACHIKA
// ════════════════════════════════════════════════════════════════════
const gIgombeC = p('Igombe / Lukwaro Chachika',9,'★ Tawi la Chachika',gChachika,{note:'Ukoo wake: Omari — wanaishi Gadi Shunguri.'});
const gLukwaroIg = p('Lukwaro Igombe Chachika',10,'★ Tawi la Chachika',gIgombeC);
p('Semvua Igombe Chachika',10,'★ Tawi la Chachika',gIgombeC);
p('Bi Komideth Igombe Chachika',10,'★ Tawi la Chachika',gIgombeC,{female:true});

// Gen 11 — Watoto wa Lukwaro
const gTereyoyaL = p('Tereyoya / Zabloni Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg);
const gKinyoriL = p('Kinyori / Salimu Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg);
const gOnesL = p('Onesphoro / Kimbwereza Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg);
const gOmariL = p('Omari Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg);
p('Selemani Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg);
p('Bi Ruth Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Makaniki Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Ledaiwe Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Natujwa Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Majabu Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Aikasia Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Elihaika Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Makenya Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});
p('Bi Nandera Lukwaro Igombe',11,'★ Tawi la Chachika',gLukwaroIg,{female:true});

// Gen 12 — Tereyoya
p('Bi Sylivester / Mwambi Tereyoya Lukwaro',12,'★ Tawi la Chachika',gTereyoyaL,{female:true});

// Gen 12 — Kinyori
p('Lukwaro Kinyori Lukwaro Igombe',12,'★ Tawi la Chachika',gKinyoriL);
p('Kihara Kinyori Lukwaro',12,'★ Tawi la Chachika',gKinyoriL);
p('Chelangwa Kinyori Lukwaro',12,'★ Tawi la Chachika',gKinyoriL);
p('Bi Rukia Kinyori Lukwaro',12,'★ Tawi la Chachika',gKinyoriL,{female:true});
p('Bi Asumina Kinyori Lukwaro',12,'★ Tawi la Chachika',gKinyoriL,{female:true});
p('Bi Mwamini Kinyori Lukwaro',12,'★ Tawi la Chachika',gKinyoriL,{female:true});
p('Bi Mariamu Kinyori Lukwaro',12,'★ Tawi la Chachika',gKinyoriL,{female:true});
p('Bi Nampee Kinyori Lukwaro',12,'★ Tawi la Chachika',gKinyoriL,{female:true});

// Gen 12 — Onesphoro
p('Elimo / Willy Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('Heri Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('Tumaini / Jpho Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('Semvua / Charles Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('David / Segongo Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('Erick / Abdallah Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('Ndaghine / Samweli Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('Eli / Lukwaro Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL);
p('Upendo / Mthuthe Onesphoro Lukwaro',12,'★ Tawi la Chachika',gOnesL,{female:true});

// Gen 12 — Omari
p('Gadi Omari Lukwaro Igombe',12,'★ Tawi la Chachika',gOmariL);
p('Bi Tabu / Kinanja Omari Lukwaro',12,'★ Tawi la Chachika',gOmariL,{female:true});
p('Bi Halima Omari Lukwaro',12,'★ Tawi la Chachika',gOmariL,{female:true});

// ════════════════════════════════════════════════════════════════════
// MBURIA — Watoto waliokosekana
// ════════════════════════════════════════════════════════════════════
// Nziamwe watoto
p('Mkosho Terindwa Nziamwe Mburia',12,'★ Tawi la Chachika',gTerindwaN);
p('Bi Nankondo Terindwa Nziamwe',12,'★ Tawi la Chachika',gTerindwaN,{female:true});
p('Bi Namkari Terindwa Nziamwe',12,'★ Tawi la Chachika',gTerindwaN,{female:true});
p('Bi Mtawa Terindwa Nziamwe',12,'★ Tawi la Chachika',gTerindwaN,{female:true});
p('Bi Mamdu Terindwa Nziamwe',12,'★ Tawi la Chachika',gTerindwaN,{female:true});

// Juaeli Lewanga children (Gen 13)
const gAminJ = p('Aminieli Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
const gKazaJ = p('Kazaeli Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
const gZebJ = p('Zebedayo Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
const gAmaniJ = p('Amani Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
const gRodJ = p('Rodrick / Igundu Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
const gAlexJ = p('Mpayo / Alexander Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
const gElinazaJ = p('Elinaza Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
const gItikijaJ = p('Itikija / Bakari Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL);
p('Bi Upendo Juaeli Lewanga',13,'★ Tawi la Chachika',gJuaeliL,{female:true});

// Salimu Lewanga more children
p('Bi Amina Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Mwalimu Hawa Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Azama Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Zamda Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Neema Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Ashura Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Zakia Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Husna Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});
p('Bi Hadija Salimu Lewanga',13,'★ Tawi la Chachika',gSalimuL,{female:true});

// Rasuli Salimu children (Gen 14)
const gHudiR = p('Hudi Rasuli Salimu Lewanga',14,'★ Tawi la Chachika',gRasuliS);
const gFaqihR = p('Faqih / Madava Rasuli Salimu',14,'★ Tawi la Chachika',gRasuliS);
const gHafidhiR = p('Hafidhi / Kichikiro Rasuli Salimu',14,'★ Tawi la Chachika',gRasuliS);

// Azizi Salimu children (Gen 14)
const gJumaAz = p('Juma Azizi Salimu Lewanga',14,'★ Tawi la Chachika',gAziziS);
p('Selemani Azizi Salimu',14,'★ Tawi la Chachika',gAziziS);
p('Bi Fatuma Azizi Salimu',14,'★ Tawi la Chachika',gAziziS,{female:true});
p('Bi Jamila Azizi Salimu',14,'★ Tawi la Chachika',gAziziS,{female:true});
p('Bi Mariamu Azizi Salimu',14,'★ Tawi la Chachika',gAziziS,{female:true});

// Khalidi Salimu children (Gen 14)
const gHajiKh = p('Haji Khalidi Salimu',14,'★ Tawi la Chachika',gKhalidiS);
const gHashimuKh = p('Hashimu Khalidi Salimu',14,'★ Tawi la Chachika',gKhalidiS);
p('Salimu Khalidi Salimu',14,'★ Tawi la Chachika',gKhalidiS);
p('Florian Khalidi Salimu',14,'★ Tawi la Chachika',gKhalidiS);
p('Bi Salha Khalidi Salimu',14,'★ Tawi la Chachika',gKhalidiS,{female:true});
p('Bi Mwajuma Khalidi Salimu',14,'★ Tawi la Chachika',gKhalidiS,{female:true});

// Juaeli children (Gen 14)
const gCharlesAm = p('Charles Aminieli Juaeli Lewanga',14,'★ Tawi la Chachika',gAminJ);
p('Immanueli Aminieli Juaeli Lewanga',14,'★ Tawi la Chachika',gAminJ);
p('Bi Dora Aminieli Juaeli',14,'★ Tawi la Chachika',gAminJ,{female:true});
p('Bi Anna Aminieli Juaeli',14,'★ Tawi la Chachika',gAminJ,{female:true});
p('Bi Joice Aminieli Juaeli',14,'★ Tawi la Chachika',gAminJ,{female:true});
p('Bi Rose Aminieli Juaeli',14,'★ Tawi la Chachika',gAminJ,{female:true});

p('Juaeli Kazaeli Juaeli Lewanga',14,'★ Tawi la Chachika',gKazaJ);
p('Cleopa Kazaeli Juaeli',14,'★ Tawi la Chachika',gKazaJ);
p('Bi Rose Kazaeli Juaeli',14,'★ Tawi la Chachika',gKazaJ,{female:true});
p('Bi Amina Kazaeli Juaeli',14,'★ Tawi la Chachika',gKazaJ,{female:true});

p('Joeli Zebedayo Juaeli Lewanga',14,'★ Tawi la Chachika',gZebJ);
p('Bi Dora Zebedayo Juaeli',14,'★ Tawi la Chachika',gZebJ,{female:true});

p('Michaeli Amani Juaeli Lewanga',14,'★ Tawi la Chachika',gAmaniJ);
p('Bi Dora Amani Juaeli',14,'★ Tawi la Chachika',gAmaniJ,{female:true});

p('Saidi Rodrick Juaeli Lewanga',14,'★ Tawi la Chachika',gRodJ);
p('Torongei Rodrick Juaeli',14,'★ Tawi la Chachika',gRodJ);
p('Bi Zeinabu Rodrick Juaeli',14,'★ Tawi la Chachika',gRodJ,{female:true});
p('Bi Veronica Rodrick Juaeli',14,'★ Tawi la Chachika',gRodJ,{female:true});

p('Juaeli Alexander Juaeli Lewanga',14,'★ Tawi la Chachika',gAlexJ);
p('Danieli Alexander Juaeli',14,'★ Tawi la Chachika',gAlexJ);
p('Bi Elizabert Alexander Juaeli',14,'★ Tawi la Chachika',gAlexJ,{female:true});
p('Bi Janeth Alexander Juaeli',14,'★ Tawi la Chachika',gAlexJ,{female:true});
p('Bi Dora Alexander Juaeli',14,'★ Tawi la Chachika',gAlexJ,{female:true});

p('Bi Dora Elinaza Juaeli Lewanga',14,'★ Tawi la Chachika',gElinazaJ,{female:true});

p('Timotheo Itikija Juaeli Lewanga',14,'★ Tawi la Chachika',gItikijaJ);
p('Juaeli Itikija Juaeli',14,'★ Tawi la Chachika',gItikijaJ);
p('Bi Ikuji / Dora Itikija Juaeli',14,'★ Tawi la Chachika',gItikijaJ,{female:true});

// Gen 15 — Mburia
p('Martin Charles Aminieli Juaeli',15,'★ Tawi la Chachika',gCharlesAm);
p('Aminieli / Agry Charles Aminieli',15,'★ Tawi la Chachika',gCharlesAm);
p('Bi Pili Charles Aminieli Juaeli',15,'★ Tawi la Chachika',gCharlesAm,{female:true});

p('Comfort Faqih Rasuli Salimu',15,'★ Tawi la Chachika',gFaqihR);
p('Bi Kipwele Faqih Rasuli',15,'★ Tawi la Chachika',gFaqihR,{female:true});
p('Ally Hudi Rasuli Salimu',15,'★ Tawi la Chachika',gHudiR);
p('Mohamedi Hudi Rasuli',15,'★ Tawi la Chachika',gHudiR);
p('Amini Hudi Rasuli',15,'★ Tawi la Chachika',gHudiR);
p('Abuu Hafidhi Rasuli Salimu',15,'★ Tawi la Chachika',gHafidhiR);
p('Abubakari Hafidhi Rasuli',15,'★ Tawi la Chachika',gHafidhiR);
p('Kelly Juma Azizi Salimu Lewanga',15,'★ Tawi la Chachika',gJumaAz);
p('Rajabu Shabani Hashimu Salimu',15,'★ Tawi la Chachika',gHashimuS);

// Shabani Hashimu (Gen 15)
p('Rajabu Shabani Hashimu',15,'★ Tawi la Chachika',gHashimuS);

// Khalidi children (Gen 15)
p('Haji Khalidi Salimu Lewanga',14,'★ Tawi la Chachika',gHajiKh);
p('Salimu Haji Khalidi',15,'★ Tawi la Chachika',gHajiKh);
p('Florian Haji Khalidi',15,'★ Tawi la Chachika',gHajiKh);
p('Bi Salha Haji Khalidi',15,'★ Tawi la Chachika',gHajiKh,{female:true});
p('Bi Mwajuma Haji Khalidi',15,'★ Tawi la Chachika',gHajiKh,{female:true});

p('Shabani Hashimu Khalidi Salimu',15,'★ Tawi la Chachika',gHashimuKh);
p('Abdulrazak Hashimu Khalidi',15,'★ Tawi la Chachika',gHashimuKh);
p('Bi Mariamu Hashimu Khalidi',15,'★ Tawi la Chachika',gHashimuKh,{female:true});
p('Bi Mwajuma Hashimu Khalidi',15,'★ Tawi la Chachika',gHashimuKh,{female:true});
p('Bi Rukia Hashimu Khalidi',15,'★ Tawi la Chachika',gHashimuKh,{female:true});
p('Bi Hadija Hashimu Khalidi',15,'★ Tawi la Chachika',gHashimuKh,{female:true});

// ════════════════════════════════════════════════════════════════════
// MAGIRI — Vizazi vilivyokosekana
// ════════════════════════════════════════════════════════════════════
// Madenkera Magiri

// Simioni Mzimu children (Gen 13)
const gItikijaS = p('Itikija / Mzimu Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz);
const gGurachS = p('Gurachedi / Kazeni Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz);
const gDanieliS = p('Danieli / Daudi Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz);
const gMosesS = p('Moses / Eliewaha Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz);
const gDavidS = p('David / Issa / Mweshehe Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz);
p('Bi Nivoneia / Namraro Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz,{female:true});
p('Bi Elina / Antuja Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz,{female:true});
p('Bi Mary / Mwajabu Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz,{female:true});
p('Bi Upendo / Niwaeli Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz,{female:true});
p('Bi Monica / Amina Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz,{female:true});
p('Bi Anjela / Ikoko Simioni Mzimu',13,'★ Tawi la Chachika',gSimioniMz,{female:true});

// Epaphrdito/Epa Mzimu children (Gen 13)
p('Peter Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);
p('Sifuni Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);
p('Enizie Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);
p('Mkomba Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);
p('Elinami Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);
p('Mbonea Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);
p('Mbazi Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);
p('David Epaphrdito Mzimu',13,'★ Tawi la Chachika',gEpaM);

// Gadieli Mzimu children (Gen 13)
const gWalterG = p('Walter Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM);
const gFrankG = p('Frank Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM);
const gCharlesG = p('Charles Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM);
p('Issa / Mwishehe Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM);
p('Bi Grace Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM,{female:true});
p('Bi Alice Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM,{female:true});
p('Bi Dora Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM,{female:true});
p('Bi Dyness Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM,{female:true});
p('Bi Joyce Gadieli Mzimu',13,'★ Tawi la Chachika',gGadieliM,{female:true});

// Gen 14 — Magiri
p('Simioni Itikija Simioni Mzimu',14,'★ Tawi la Chachika',gItikijaS);
p('David Itikija Simioni Mzimu',14,'★ Tawi la Chachika',gItikijaS);
p('Eppa Itikija Simioni Mzimu',14,'★ Tawi la Chachika',gItikijaS);

p('Simioni Gurachedi Simioni Mzimu',14,'★ Tawi la Chachika',gGurachS);
p('Gadieli Gurachedi Simioni',14,'★ Tawi la Chachika',gGurachS);
p('Bi Beatrice / Bite Gurachedi Simioni',14,'★ Tawi la Chachika',gGurachS,{female:true});
p('Bi Maria Gurachedi Simioni',14,'★ Tawi la Chachika',gGurachS,{female:true});

p('Simioni Danieli Simioni Mzimu',14,'★ Tawi la Chachika',gDanieliS);
p('Gadieli Danieli Simioni Mzimu',14,'★ Tawi la Chachika',gDanieliS);
p('Bi Zawadi Danieli Simioni',14,'★ Tawi la Chachika',gDanieliS,{female:true});

p('Salimu Walter Gadieli Mzimu',14,'★ Tawi la Chachika',gWalterG);
p('Bi Beatrice Walter Gadieli',14,'★ Tawi la Chachika',gWalterG,{female:true});

p('Bi Beatrice Frank Gadieli Mzimu',14,'★ Tawi la Chachika',gFrankG,{female:true});

p('Salimu Stanley Gadieli Mzimu',14,'★ Tawi la Chachika',gCharlesG);
p('Bi Beatrice Stanley Gadieli',14,'★ Tawi la Chachika',gCharlesG,{female:true});

// ════════════════════════════════════════════════════════════════════
// MPOMBEYAGONJA — Vizazi 12, 13, 14 (vilivyokosekana)
// ════════════════════════════════════════════════════════════════════

// ── Watoto wa Alli Iddi Alli (Gen 12) ──
p('Alli Iddi Alli Masudi',12,'★ Tawi la Mpombeyagonja',gIddiA);
p('Hasani Iddi Alli Masudi',12,'★ Tawi la Mpombeyagonja',gIddiA);
p('Juma Iddi Alli Masudi',12,'★ Tawi la Mpombeyagonja',gIddiA);
p('Juma Mdogo Iddi Alli Masudi',12,'★ Tawi la Mpombeyagonja',gIddiA);
p('Bi Mwajuma / Nahuja Iddi Alli',12,'★ Tawi la Mpombeyagonja',gIddiA,{female:true});
p('Bi Mwanaidi Iddi Alli',12,'★ Tawi la Mpombeyagonja',gIddiA,{female:true});

// ── Watoto wa Abtwalbe Juma Masudi (Gen 12) ──
p('Ali / Mbure Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe);
p('Abuu Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe);
p('Chedi Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe);
p('Bisa Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe);
p('Hasani Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe);
p('Bi Amina Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe,{female:true});
p('Bi Nuni Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe,{female:true});
p('Bi Mariamu Abtwalbe Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbtwalbe,{female:true});

// ── Watoto wa Athumani/Kinonga Juma Masudi (Gen 12) ──
p('Heri Athumani Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAthJuma);
p('Liliani Athumani Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAthJuma);
p('Imrani / Halifa Athumani Juma',12,'★ Tawi la Mpombeyagonja',gAthJuma);

// ── Watoto wa Idrisa Juma Masudi (Gen 12) ──
p('Mahamedi Idrisa Juma Masudi',12,'★ Tawi la Mpombeyagonja',gIdrisaJ);

// ── Mtoto wa Abdala/Deghere Juma (Gen 12) ──
p('Juma Abdala Juma Masudi',12,'★ Tawi la Mpombeyagonja',gAbdalaJ);

// ── Watoto wa Yunusi Hoseni (Gen 12) ──
p('Ali / Mbure Yunusi Hoseni',12,'★ Tawi la Mpombeyagonja',gYunusiH);
p('Bi Halima / Nyagahwa Yunusi Hoseni',12,'★ Tawi la Mpombeyagonja',gYunusiH,{female:true});
p('Bi Mariamu Yunusi Hoseni',12,'★ Tawi la Mpombeyagonja',gYunusiH,{female:true});

// ── Watoto wa Hudi Hoseni (Gen 12) ──
p('Hoseni Hudi Hoseni Masudi',12,'★ Tawi la Mpombeyagonja',gHudiH);
p('Hasani Hudi Hoseni Masudi',12,'★ Tawi la Mpombeyagonja',gHudiH);
p('Bi Mwanamisi / Namdu Hudi Hoseni',12,'★ Tawi la Mpombeyagonja',gHudiH,{female:true});

// ── Watoto wa Athumani Hoseni (Gen 12) ──
// [Ali / Mbure tayari amewekwa chini ya gAthH line 357]

// ── Watoto wa Bashiri Hoseni (Gen 12) ──
const gKhalifaBash = p('Khalifa Bashiri Hoseni Masudi',12,'★ Tawi la Mpombeyagonja',gBashiriH);
p('Hoseni / Mapalala Bashiri Hoseni',12,'★ Tawi la Mpombeyagonja',gBashiriH);
p('Bi Zubeda Bashiri Hoseni',12,'★ Tawi la Mpombeyagonja',gBashiriH,{female:true});
p('Bi Zawadi Bashiri Hoseni',12,'★ Tawi la Mpombeyagonja',gBashiriH,{female:true});

// ── Watoto wa Hakimu Hoseni (Gen 12) ──
p('Msafiri Hakimu Hoseni',12,'★ Tawi la Mpombeyagonja',gHakimuH);

// ── Watoto wa Azidiheri Mohamedi (Gen 12) ──
// [Bi Salma Azidiheri already at line 206]

// ── Watoto wa Saidi Mohamedi (Gen 12) ──

// ── Watoto wa Awadhi Hasani (Gen 12) ──

// ── Watoto wa Rahimu Swedi (Gen 12) ──
p('Swedi Rahimu Swedi Athumani',12,'★ Tawi la Mpombeyagonja',gRahimuSw);
p('Iddi Rahimu Swedi Athumani',12,'★ Tawi la Mpombeyagonja',gRahimuSw);
p('Bi Hedi Rahimu Swedi',12,'★ Tawi la Mpombeyagonja',gRahimuSw,{female:true});
p('Bi Amina Rahimu Swedi',12,'★ Tawi la Mpombeyagonja',gRahimuSw,{female:true});

// ── Watoto wa Daudi Swedi (Gen 12) ──
p('Ramadhani Daudi Swedi',12,'★ Tawi la Mpombeyagonja',gDaudiSw);
p('Azidiheri Daudi Swedi',12,'★ Tawi la Mpombeyagonja',gDaudiSw);
p('Bi Mwezine Daudi Swedi',12,'★ Tawi la Mpombeyagonja',gDaudiSw,{female:true});
p('Bi Asia Daudi Swedi',12,'★ Tawi la Mpombeyagonja',gDaudiSw,{female:true});

// ── Watoto wa Haruni Swedi (Gen 12) ──
p('Musa Haruni Swedi',12,'★ Tawi la Mpombeyagonja',gHaruniSw);
p('Hasani Haruni Swedi',12,'★ Tawi la Mpombeyagonja',gHaruniSw);
p('Shwaibu Haruni Swedi',12,'★ Tawi la Mpombeyagonja',gHaruniSw);

// ── Mtoto wa Mavura Swedi (Gen 12) ──
p('Ramadhani Mavura Swedi',12,'★ Tawi la Mpombeyagonja',gMavuraSw);

// ── Watoto wa Issa Swedi (Gen 12) ──
p('Swedi Issa Swedi Athumani',12,'★ Tawi la Mpombeyagonja',gIssaSw);
p('Hasani Issa Swedi',12,'★ Tawi la Mpombeyagonja',gIssaSw);
p('Bi Fatuma Issa Swedi',12,'★ Tawi la Mpombeyagonja',gIssaSw,{female:true});
p('Bi Tatu Issa Swedi',12,'★ Tawi la Mpombeyagonja',gIssaSw,{female:true});

// ── Watoto wa Masudi Ramadhani (Gen 12) ──
p('Ibrahimu Masudi Ramadhani',12,'★ Tawi la Mpombeyagonja',gMasudiRam);
p('Ramadhani / Kutua Masudi Ramadhani',12,'★ Tawi la Mpombeyagonja',gMasudiRam);
p('Swedi Masudi Ramadhani',12,'★ Tawi la Mpombeyagonja',gMasudiRam);
p('Lelo Masudi Ramadhani',12,'★ Tawi la Mpombeyagonja',gMasudiRam);
p('Bi Mwezine Masudi Ramadhani',12,'★ Tawi la Mpombeyagonja',gMasudiRam,{female:true});

// ── Watoto wa Riadi/Shabani Ramadhani (Gen 12) ──
p('Mwezine Riadi / Shabani Ramadhani',12,'★ Tawi la Mpombeyagonja',gRiadiR);
p('Mkavenamla Riadi Ramadhani',12,'★ Tawi la Mpombeyagonja',gRiadiR);
p('Nangasu Riadi Ramadhani',12,'★ Tawi la Mpombeyagonja',gRiadiR);

// ── Mtoto wa Mkulungu Ramadhani (Gen 12) ──
p('Bi Nahuja / Mwezine Mkulungu Ramadhani',12,'★ Tawi la Mpombeyagonja',gMkulunguR,{female:true});

// ── Mtoto wa Mwejuma Ramadhani (Gen 12) ──
p('Swedi Mwejuma Ramadhani',12,'★ Tawi la Mpombeyagonja',gMwejumaR);

// ── Watoto wa Athumani Isumaili (Gen 12) ──
p('Ali Athumani Isumaili',12,'★ Tawi la Mpombeyagonja',gAthumaniIs);
p('Ramadhani Athumani Isumaili',12,'★ Tawi la Mpombeyagonja',gAthumaniIs);
p('Bi Mwajuma Athumani Isumaili',12,'★ Tawi la Mpombeyagonja',gAthumaniIs,{female:true});
p('Bi Fatina Athumani Isumaili',12,'★ Tawi la Mpombeyagonja',gAthumaniIs,{female:true});
p('Bi Zainabu Athumani Isumaili',12,'★ Tawi la Mpombeyagonja',gAthumaniIs,{female:true});
p('Bi Mahadia Athumani Isumaili',12,'★ Tawi la Mpombeyagonja',gAthumaniIs,{female:true});

// ── Watoto wa Hoseni Issa (Gen 12) ──
p('Isa Hoseni Issa Mwejuma',12,'★ Tawi la Mpombeyagonja',gHoseniIs);
p('Abasi Hoseni Issa',12,'★ Tawi la Mpombeyagonja',gHoseniIs);
p('Hamdani / Chayoa Hoseni Issa',12,'★ Tawi la Mpombeyagonja',gHoseniIs);

// ── Watoto wa Athumani Issa (Gen 12) ──
p('Saidi / Bule Athumani Issa',12,'★ Tawi la Mpombeyagonja',gAthIs);
p('Bi Zawadi / Nakimo Athumani Issa',12,'★ Tawi la Mpombeyagonja',gAthIs,{female:true});
p('Bi Sofia / Mwanasha Athumani Issa',12,'★ Tawi la Mpombeyagonja',gAthIs,{female:true});

// ── Watoto wa Abdala Issa (Gen 12) ──
p('Chayoa / Sekro Abdala Issa Mwejuma',12,'★ Tawi la Mpombeyagonja',gAbdalaIs);
p('Bi Neema / Sofia Abdala Issa',12,'★ Tawi la Mpombeyagonja',gAbdalaIs,{female:true});

// ── Watoto wa Masudi Adam (Gen 12) ──
const gSwediMasudiA = p('Swedi Masudi Adamu',12,'★ Tawi la Mpombeyagonja',gMasudiAdam);
p('Eliamini Masudi Adamu',12,'★ Tawi la Mpombeyagonja',gMasudiAdam);
p('Ramadhani / Kutua Masudi Adamu',12,'★ Tawi la Mpombeyagonja',gMasudiAdam);

// ── Watoto wa Tegurwa (watoto hawakuandikwa) ──
// Tegurwa Kitagha — habari za uzao wake hazikuandikwa kwenye document

// ═══════════════════════════════════════════
// KINENEKEJO — Vizazi 13-15 vilivyokosekana  
// ═══════════════════════════════════════════
// (Kinenekejo max gen ni 12 — tutaongeza baadaye)

// ════════════════════════════════════════════════════════════════════
// KINENEKEJO — Gen 12-13 (vilivyokosekana)
// ════════════════════════════════════════════════════════════════════

// ── Watoto wa Abdala Kinenekejo (Gen 12) ──
p('Haji Abdala Kinenekejo',12,'Tawi la Kinenekejo',gAbdalaK);
p('Timotheo Abdala Kinenekejo',12,'Tawi la Kinenekejo',gAbdalaK);
p('Geofrey Abdala Kinenekejo',12,'Tawi la Kinenekejo',gAbdalaK);
p('David Abdala Kinenekejo',12,'Tawi la Kinenekejo',gAbdalaK);

// ── Watoto wa Haji Kinenekejo (Gen 12) — hawakuandikwa ──

// ── Watoto wa Rashidi Kinenekejo (Gen 12 — already has gRamadR) ──
// gRamadR (Ramadhani Rashidi) tayari ana watoto 7
// Missing: Selemani, Habibu, Hamadi, Kinenekejo, wanawake
const gSelemaniRash = p('Selemani Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK);
p('Habibu Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK);
p('Hamadi Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK);
p('Kinenekejo Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK);
p('Bi Hawa Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK,{female:true});
p('Bi Zeituni Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK,{female:true});
p('Bi Wida Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK,{female:true});
p('Bi Chausiku Rashidi Kinenekejo',12,'Tawi la Kinenekejo',gRashidiK,{female:true});

// ── Selemani Rashidi watoto (Gen 13) ──
p('Rashidi Selemani Rashidi',13,'Tawi la Kinenekejo',gSelemaniRash);
p('Abdallah Selemani Rashidi',13,'Tawi la Kinenekejo',gSelemaniRash);

// ── gRamadR children already exist but give vars to missing ones ──
const gRashidiRam = p('Rashidi Ramadhani Rashidi',13,'Tawi la Kinenekejo',gRamadR);
const gFadhiliRam = p('Fadhili Ramadhani Rashidi',13,'Tawi la Kinenekejo',gRamadR);
const gAbduRam = p('Abdu Ramadhani Rashidi',13,'Tawi la Kinenekejo',gRamadR);
const gYunusiRam = p('Yunusi Ramadhani Rashidi',13,'Tawi la Kinenekejo',gRamadR);
const gKassimuRam = p('Kasimu / Kinyurura Ramadhani Rashidi',13,'Tawi la Kinenekejo',gRamadR);
p('Bi Rafia Ramadhani Rashidi',13,'Tawi la Kinenekejo',gRamadR,{female:true});
p('Bi Hadija Ramadhani Rashidi',13,'Tawi la Kinenekejo',gRamadR,{female:true});

// ── Juma Rajabu watoto (Gen 12) ──
const gJumaRaj2 = p('Juma Rajabu Juma Kinenekejo',12,'Tawi la Kinenekejo',gRajabuJ);
p('Haruni Rajabu Juma',12,'Tawi la Kinenekejo',gRajabuJ);
p('Hakimu Rajabu Juma',12,'Tawi la Kinenekejo',gRajabuJ);
p('Simbano Rajabu Juma',12,'Tawi la Kinenekejo',gRajabuJ);
p('Bi Aina Rajabu Juma',12,'Tawi la Kinenekejo',gRajabuJ,{female:true});
p('Bi Zera Rajabu Juma',12,'Tawi la Kinenekejo',gRajabuJ,{female:true});
p('Bi Mwanasha Rajabu Juma',12,'Tawi la Kinenekejo',gRajabuJ,{female:true});

// ── Gen 13 Juma Rajabu ──
p('Rajabu Juma Rajabu Juma',13,'Tawi la Kinenekejo',gJumaRaj2);

// ════════════════════════════════════════════════════════════════════
// KAGULU — Gen 12+ (vilivyokosekana)
// ════════════════════════════════════════════════════════════════════
// gTitoM, gShabaniML, gTufike, gPeterT, gJumaSh wanao watoto
// Angida Kagulu — hana watoto (document haisemi)

// Gen 12 — Angida watoto (document haisemi)

// Gen 12 — Salehe Mlavi watoto (document haisemi zaidi)

// ════════════════════════════════════════════════════════════════════
// KILANGO — Gen 12+ (vilivyokosekana)
// ════════════════════════════════════════════════════════════════════

// gJumaVar watoto (Gen 10→11)
// gJumJum (Jumanne) tayari ana watoto 2
// gVarJum (Varinoi) tayari ana watoto 2
// Gen 11 — Jumanne Juma watoto
p('Juma Jumanne Juma Varinoi',11,'Tawi la Kilango',gJumJum);
p('Bi Maria Jumanne Juma Varinoi',11,'Tawi la Kilango',gJumJum,{female:true});

// Gen 11 — Varinoi Juma watoto
const gKhalidiVJ = p('Khalidi Varinoi Juma Kilango',11,'Tawi la Kilango',gVarJum);
p('Buga Varinoi Juma Kilango',11,'Tawi la Kilango',gVarJum);

// Mlau Kilango watoto (Gen 9)
const gDavidMlau = p('David Mlau Varinoi Kilango',9,'Tawi la Kilango',gMlauK);
const gJumaMlau = p('Juma Mlau Varinoi Kilango',9,'Tawi la Kilango',gMlauK);
p('Bi Nangondo Mlau Varinoi',9,'Tawi la Kilango',gMlauK,{female:true});

// Omari Ngwaru (already has 11 children)
// Boniface, Safieli, Japhate, Philimoni, Vicent, Abeli, Wiliam, Gadi, Methew, Jackson, Stephene
// All already in data? Let me check — yes they're there via gOmariNg

// Shai Kilango watoto

// Magwala Varinoi
p('Miraji Varinoi Kilango',9,'Tawi la Kilango',gVarinoi);
p('Bi Niindae Varinoi Kilango',9,'Tawi la Kilango',gVarinoi,{female:true});

// Mlau Varinoi children
const gMlauVar = p('Mlau Varinoi Kilango',9,'Tawi la Kilango',gVarinoi);

// Mlau Varinoi watoto
p('David Mlau Varinoi Kilango',10,'Tawi la Kilango',gMlauVar);
p('Juma Mlau Varinoi Kilango',10,'Tawi la Kilango',gMlauVar);
p('Bi Nangondo Mlau Varinoi',10,'Tawi la Kilango',gMlauVar,{female:true});

// ════════════════════════════════════════════════════════════════════
// LUHWA KENGIA — Kizazi 11 hadi 13
// ════════════════════════════════════════════════════════════════════

// Kizazi 11 — Watoto wa Luhwa
const gKiureLuh = p('Kiure Luhwa Kengia',11,'Tawi la Chasimba',gLuhwaK);
const gKimomweLuh = p('Kimomwe Luhwa Kengia',11,'Tawi la Chasimba',gLuhwaK);
p('Senkondo Luhwa Kengia',11,'Tawi la Chasimba',gLuhwaK);

// Kizazi 12 — Watoto wa Kiure Luhwa
const gSenkondoKL = p('Senkondo Kiure Luhwa',12,'Tawi la Chasimba',gKiureLuh);
const gNyangarika = p('Nyangarika Kiure Luhwa',12,'Tawi la Chasimba',gKiureLuh);
const gKachenjeLuh = p('Kachenje Kiure Luhwa',12,'Tawi la Chasimba',gKiureLuh);
p('Mapande Kiure Luhwa',12,'Tawi la Chasimba',gKiureLuh);
p('Mlungwana Kiure Luhwa',12,'Tawi la Chasimba',gKiureLuh);

// Kizazi 12 — Watoto wa Kimomwe Luhwa
p('Mberwa Kimomwe Luhwa',12,'Tawi la Chasimba',gKimomweLuh);
p('Shauritanga Kimomwe Luhwa',12,'Tawi la Chasimba',gKimomweLuh);

// Kizazi 13 — Watoto wa Nyangarika
const gJumaNyang = p('Juma Nyangarika Kiure Luhwa',13,'Tawi la Chasimba',gNyangarika);

// Kizazi 13 — Watoto wa Kachenje
const gMahamediKach = p('Mahamedi / Shikirini Kachenje',13,'Tawi la Chasimba',gKachenjeLuh);
p('Matata Kachenje Kiure Luhwa',13,'Tawi la Chasimba',gKachenjeLuh);
p('Mberwa Kachenje Kiure Luhwa',13,'Tawi la Chasimba',gKachenjeLuh);
p('Shauri Kachenje Kiure Luhwa',13,'Tawi la Chasimba',gKachenjeLuh);

// Kizazi 14 — Watoto wa Juma Nyangarika
p('Abihu / Nyangarika Juma Nyangarika',14,'Tawi la Chasimba',gJumaNyang);
p('Yusufu / Joseph Juma Nyangarika',14,'Tawi la Chasimba',gJumaNyang);
p('Hamisi / Senkondo / Machupa Juma Nyangarika',14,'Tawi la Chasimba',gJumaNyang);
p('Azizi / Justine Juma Nyangarika',14,'Tawi la Chasimba',gJumaNyang);
p('Msafiri / Kachenje Juma Nyangarika',14,'Tawi la Chasimba',gJumaNyang);
p('Dr Adam / Ngusaru Juma Nyangarika',14,'Tawi la Chasimba',gJumaNyang);
p('Jaji Kasimu / Filipo Juma Nyangarika',14,'Tawi la Chasimba',gJumaNyang);

// Kizazi 14 — Watoto wa Mahamedi Kachenje
p('Kahema Mahamedi Kachenje',14,'Tawi la Chasimba',gMahamediKach);
p('Bakari Mahamedi Kachenje',14,'Tawi la Chasimba',gMahamediKach);
p('Kachenje Mahamedi Kachenje',14,'Tawi la Chasimba',gMahamediKach);
p('Bi Nanzia Mahamedi Kachenje',14,'Tawi la Chasimba',gMahamediKach,{female:true});
p('Bi Bilihuda Mahamedi Kachenje',14,'Tawi la Chasimba',gMahamediKach,{female:true});
p('Bi Mwajabu Mahamedi Kachenje',14,'Tawi la Chasimba',gMahamediKach,{female:true});

// ════════════════════════════════════════════════════════════════════
// SAVURI / SAGHURI KENGIA — Kizazi 11 hadi 12
// ════════════════════════════════════════════════════════════════════

// Kizazi 11 — Watoto wa Savuri
const gSalimuSav = p('Salimu Savuri Kengia',11,'Tawi la Chasimba',gSavuriK);
p('Senzia Savuri Kengia',11,'Tawi la Chasimba',gSavuriK);

// Kizazi 12 — Watoto wa Salimu Savuri
p('Abdallah Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav);
p('Mlavwasi Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav);
p('Juma Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav);
p('Kajia Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav);
p('Mazina Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav);
p('Madenkera Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav);
p('Bi Nandera Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav,{female:true});
p('Bi Mwanaidi Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav,{female:true});
p('Bi Mwanasha Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav,{female:true});
p('Bi Nahanaeli Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav,{female:true});
p('Bi Amina Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav,{female:true});
p('Bi Namkeshe Salimu Savuri',12,'Tawi la Chasimba',gSalimuSav,{female:true});

// Watoto wa Rafaeli Majani
p('Majani Rafaeli Majani Mrighwa',10,'Tawi la Chikira',gRafaeliMaj);
p('Bi Sirieli / Masawe Rafaeli Majani',10,'Tawi la Chikira',gRafaeliMaj,{female:true});

// ════════════════════════════════════════════════════════════════════
// BANGALALA — Vizazi vilivyokosekana
// ════════════════════════════════════════════════════════════════════

// ── Ngomasere Sekanyonge (Gen 9) ──
const gKitaghaNgom = p('Kitagha Ngomasere Sekanyonge',9,'Tawi la Bangalala',gNgomasere);

// ── Maleko Sekanyonge (Gen 9) ──
p('Ali Maleko Sekanyonge',9,'Tawi la Bangalala',gMalekoS);

// Watoto wa Ali Maleko (Gen 10)
p('Juma Ali Maleko',10,'Tawi la Bangalala',gMalekoS);
p('Mselem Ali Maleko',10,'Tawi la Bangalala',gMalekoS);

// ── Kasala Sekanyonge (Gen 9) ──
const gHajiKasala = p('Haji Kasala Sekanyonge',9,'Tawi la Bangalala',gKasalaS);
p('Ali Kasala Sekanyonge',9,'Tawi la Bangalala',gKasalaS);

// Watoto wa Haji Kasala (Gen 10)
p('Juma Mbaga / Iddi Kasala',10,'Tawi la Bangalala',gHajiKasala);
p('Iddi Haji Kasala',10,'Tawi la Bangalala',gHajiKasala);
p('Sadiki Haji Kasala',10,'Tawi la Bangalala',gHajiKasala);
p('Bi Mburuja Haji Kasala',10,'Tawi la Bangalala',gHajiKasala,{female:true});
p('Bi Namvua Haji Kasala',10,'Tawi la Bangalala',gHajiKasala,{female:true});

// ── Kimalo Sekanyonge (Gen 9) ──
const gKajiaKim = p('Kajia Kimalo Sekanyonge',9,'Tawi la Bangalala',gKimaloS);

// Watoto wa Kajia Kimalo (Gen 10)
const gRamadKajia = p('Ramadhani Kajia Kimalo',10,'Tawi la Bangalala',gKajiaKim);

// Watoto wa Ramadhani Kajia (Gen 11)
p('Abubakari Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia);
p('Burhani Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia);
p('Rosheni Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia);
p('Hasani Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia);
p('Ali Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia);
p('Zilhija Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia);
p('Bi Hamida Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia,{female:true});
p('Bi Azania Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia,{female:true});
p('Bi Ashura Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia,{female:true});
p('Bi Shamim Ramadhani Kajia',11,'Tawi la Bangalala',gRamadKajia,{female:true});

// ── Kipwili Sekanyonge (Gen 9) ──
const gMakenyaKip = p('Makenya Kipwili Sekanyonge',9,'Tawi la Bangalala',gKipwiliS);
const gTereyoyaKip = p('Tereyoya Kipwili Sekanyonge',9,'Tawi la Bangalala',gKipwiliS);
const gIsumailiKip = p('Isumaili Kipwili Sekanyonge',9,'Tawi la Bangalala',gKipwiliS);
p('Bi Itendera Kipwili Sekanyonge',9,'Tawi la Bangalala',gKipwiliS,{female:true});

// Watoto wa Makenya Kipwili (Gen 10)
p('Hamadi Makenya Kipwili',10,'Tawi la Bangalala',gMakenyaKip);
p('Amiri Makenya Kipwili',10,'Tawi la Bangalala',gMakenyaKip);
p('Selamani Makenya Kipwili',10,'Tawi la Bangalala',gMakenyaKip);
p('Thabiti Makenya Kipwili',10,'Tawi la Bangalala',gMakenyaKip);

// Watoto wa Tereyoya Kipwili (Gen 10)
p('Hemedi Tereyoya Kipwili',10,'Tawi la Bangalala',gTereyoyaKip);
p('Hasani Tereyoya Kipwili',10,'Tawi la Bangalala',gTereyoyaKip);
p('Mudi Tereyoya Kipwili',10,'Tawi la Bangalala',gTereyoyaKip);
p('Kimario Tereyoya Kipwili',10,'Tawi la Bangalala',gTereyoyaKip);
p('Jumanne Tereyoya Kipwili',10,'Tawi la Bangalala',gTereyoyaKip);
p('Mahuna Tereyoya Kipwili',10,'Tawi la Bangalala',gTereyoyaKip);
p('Bi Asinati Tereyoya Kipwili',10,'Tawi la Bangalala',gTereyoyaKip,{female:true});

// Watoto wa Isumaili Kipwili (Gen 10)
p('Ramadhani Isumaili Kipwili',10,'Tawi la Bangalala',gIsumailiKip);
p('Kiure Isumaili Kipwili',10,'Tawi la Bangalala',gIsumailiKip);
p('Fadhili Isumaili Kipwili',10,'Tawi la Bangalala',gIsumailiKip);

// ── Kimario Sekanyonge (Gen 9) ──
p('Bi Namramba Kimario Sekanyonge',9,'Tawi la Bangalala',gKimarioS,{female:true});
p('Bi Namshitu Kimario Sekanyonge',9,'Tawi la Bangalala',gKimarioS,{female:true});

// ── Kabora Sekanyonge (Gen 9) ──
const gMalekoKab = p('Maleko Kabora Sekanyonge',9,'Tawi la Bangalala',gKaboraS);
p('Selemani Kabora Sekanyonge',9,'Tawi la Bangalala',gKaboraS);
const gKilaghaiKab = p('Kilaghai Kabora Sekanyonge',9,'Tawi la Bangalala',gKaboraS);

// Watoto wa Kilaghai Kabora (Gen 10)
const gHuseniKilag = p('Huseni / Ndaleghe Kilaghai Kabora',10,'Tawi la Bangalala',gKilaghaiKab);
const gMusaKilag = p('Musa Kilaghai Kabora',10,'Tawi la Bangalala',gKilaghaiKab);
const gIbrahimuKilag = p('Ibrahimu Kilaghai Kabora',10,'Tawi la Bangalala',gKilaghaiKab);
p('Bi Nendiwe Kilaghai Kabora',10,'Tawi la Bangalala',gKilaghaiKab,{female:true,
  note:'Aliolewa na Tito Mlavi wa Kirongaya.'});
p('Bi Mwanaidi Kilaghai Kabora',10,'Tawi la Bangalala',gKilaghaiKab,{female:true});

// Watoto wa Huseni Kilaghai (Gen 11)
p('Sangiwa Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag);
const gMalekoHK = p('Maleko Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag);
const gJumaHK = p('Juma Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag);
const gAfuaniHK = p('Afuani / Kilaghai Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag);
p('Bi Azama Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag,{female:true});
p('Bi Aisha Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag,{female:true});
p('Bi Asha Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag,{female:true});
p('Bi Asia Huseni Kilaghai',11,'Tawi la Bangalala',gHuseniKilag,{female:true});

// Watoto wa Musa Kilaghai (Gen 11)
p('Kilaghai Musa Kilaghai',11,'Tawi la Bangalala',gMusaKilag);
p('Bi Swaiba Musa Kilaghai',11,'Tawi la Bangalala',gMusaKilag,{female:true});
p('Bi Pili Musa Kilaghai',11,'Tawi la Bangalala',gMusaKilag,{female:true});
p('Bi Zahara Musa Kilaghai',11,'Tawi la Bangalala',gMusaKilag,{female:true});
p('Bi Hamida Musa Kilaghai',11,'Tawi la Bangalala',gMusaKilag,{female:true});
p('Bi Aisha Musa Kilaghai',11,'Tawi la Bangalala',gMusaKilag,{female:true});
p('Bi Mwajuma Musa Kilaghai',11,'Tawi la Bangalala',gMusaKilag,{female:true});

// Watoto wa Ibrahimu Kilaghai (Gen 11)
p('Bashiri Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag);
const gRajabuIK = p('Rajabu Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag);
p('Selemani Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag);
p('Bahati Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag);
p('Bi Mariamu Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag,{female:true});
p('Bi Mwajuma Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag,{female:true});
p('Bi Amina Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag,{female:true});
p('Bi Mwanasha Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag,{female:true});
p('Bi Mwanahamisi Ibrahimu Kilaghai',11,'Tawi la Bangalala',gIbrahimuKilag,{female:true});

// ── Njarita Mnyalo (Gen 9) ──
const gSalehNjar = p('Salehe Njarita Mnyalo',9,'Tawi la Bangalala',gNjaritaB);
const gJumaNjar = p('Juma Njarita Mnyalo',9,'Tawi la Bangalala',gNjaritaB);

// Watoto wa Salehe Njarita (Gen 10)
p('Halifa Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar);
p('Shabani Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar);
p('Mashombo Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar);
p('Varisanga Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar);
p('Bi Binzua Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar,{female:true});
p('Bi Mwajabu Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar,{female:true});
p('Bi Aziza Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar,{female:true});
p('Bi Asia Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar,{female:true});
p('Bi Zuhura Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar,{female:true});
p('Bi Husna Salehe Njarita',10,'Tawi la Bangalala',gSalehNjar,{female:true});

// Watoto wa Juma Njarita (Gen 10)
p('Muhidini Juma Njarita',10,'Tawi la Bangalala',gJumaNjar);
p('Ayubu Juma Njarita',10,'Tawi la Bangalala',gJumaNjar);
p('Varisanga Juma Njarita',10,'Tawi la Bangalala',gJumaNjar);
p('Daudi Juma Njarita',10,'Tawi la Bangalala',gJumaNjar);
p('Bashari Juma Njarita',10,'Tawi la Bangalala',gJumaNjar);
p('Bi Namtero Juma Njarita',10,'Tawi la Bangalala',gJumaNjar,{female:true});
p('Bi Halima Juma Njarita',10,'Tawi la Bangalala',gJumaNjar,{female:true});

// ── Juma Varisanga (Gen 9) ──
p('Musa / Varisanga Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB);
p('Yusufu / Kicherumbe Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB);
p('Bi Zukra / Nakio Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB,{female:true});
p('Bi Mwajuma / Kipwele Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB,{female:true});
p('Bi Zaina / Nambojo Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB,{female:true});
p('Bi Mariamu Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB,{female:true});
p('Bi Arafa / Mwaro Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB,{female:true});
p('Bi Mwanaidi / Beresha Juma Varisanga',10,'Tawi la Bangalala',gJumaVarisB,{female:true});

// ── Kiagho Varisanga children (Gen 11) ──
p('Senkoro Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho);
p('Bi Zuhura Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{female:true});
p('Bi Mwanaidi Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{female:true});
p('Bi Amina Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{female:true});
p('Bi Mwanahamisi Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{female:true});
p('Bi Hadia Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{female:true});
p('Bi Mwanaisha Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{female:true});
p('Bi Ezena / Kinambora Kiagho Varisanga',10,'Tawi la Bangalala',gKiagho,{female:true,
  note:'Aliolewa na Mfumwa Athumani Issa Liana.'});

// ── Lichmen Maliare Gen 12 (Kizazi cha Kumi) ──
// Atwai Lichmen watoto
const gIddiAtwai = p('Iddi Atwai Lichmen',12,'Tawi la Bangalala',gAtwiL);
p('Ramadhani Atwai Lichmen',12,'Tawi la Bangalala',gAtwiL);
p('Bi Sofia Atwai Lichmen',12,'Tawi la Bangalala',gAtwiL,{female:true});
p('Bi Zeituni Atwai Lichmen',12,'Tawi la Bangalala',gAtwiL,{female:true});
p('Bi Sajira Atwai Lichmen',12,'Tawi la Bangalala',gAtwiL,{female:true});
p('Bi Vick Atwai Lichmen',12,'Tawi la Bangalala',gAtwiL,{female:true});

// Jafari/Juma Lichmen watoto
const gBobleyJ = p('Bobley / Ali Jafari Lichmen',12,'Tawi la Bangalala',gJafariL);
p('Amary / Mohamedi Jafari Lichmen',12,'Tawi la Bangalala',gJafariL);
p('Aladini / Mohamedi Jafari Lichmen',12,'Tawi la Bangalala',gJafariL);
p('Ali Jafari Lichmen',12,'Tawi la Bangalala',gJafariL);
p('Mwinyi Jafari Lichmen',12,'Tawi la Bangalala',gJafariL);
p('Bi Maua Jafari Lichmen',12,'Tawi la Bangalala',gJafariL,{female:true});

// Huseni/Kilaghai Lichmen watoto (Gen 12 - mtoto wa Afuani)
p('Hoseni Afuani Huseni Kilaghai',12,'Tawi la Bangalala',gAfuaniHK);

// Maleko Huseni watoto
p('Ali Maleko Huseni Kilaghai',12,'Tawi la Bangalala',gMalekoHK);
p('Bi Mwajabu Maleko Huseni Kilaghai',12,'Tawi la Bangalala',gMalekoHK,{female:true});

// Juma Huseni watoto
p('Ayman / Huseni Juma Huseni',12,'Tawi la Bangalala',gJumaHK);
p('Ibrahim Juma Huseni',12,'Tawi la Bangalala',gJumaHK);
p('Imrani Juma Huseni',12,'Tawi la Bangalala',gJumaHK);
p('Bi Asia Juma Huseni',12,'Tawi la Bangalala',gJumaHK,{female:true});
p('Bi Alma / Sabitina Juma Huseni',12,'Tawi la Bangalala',gJumaHK,{female:true});
p('Bi Ihlas Juma Huseni',12,'Tawi la Bangalala',gJumaHK,{female:true});

// Rajabu Ibrahim Kilaghai watoto
p('Ibrahim Rajabu Ibrahim Kilaghai',12,'Tawi la Bangalala',gRajabuIK);
p('Bi Halima Rajabu Ibrahim',12,'Tawi la Bangalala',gRajabuIK,{female:true});
p('Bi Hadija Rajabu Ibrahim',12,'Tawi la Bangalala',gRajabuIK,{female:true});

// ════════════════════════════════════════════════════════════════════
// LUVIGHO — Vizazi vilivyokosekana (Gen 9-12)
// ════════════════════════════════════════════════════════════════════
// Current: gLuvigho(Gen8) → gMashombo(Gen9) → gMadava(Gen10) → gMapande(Gen11) → Joseph(Gen12)
// Missing: Ngoka branch → Mazina → Kiravu → Ngomoi branch

const gNgokaLuv = p('Ngoka Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Sembike Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Mngendi Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Kichumbi Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Nziamwe Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Lusango I Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Kubane Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Mbike Luvigho',9,'Tawi la Luvigho',gLuvigho);
p('Lusango II Luvigho',9,'Tawi la Luvigho',gLuvigho);

// Ngoka → Mazina → Kiravu → Ngomoi
const gMazinaLuv = p('Mazina Ngoka Luvigho',10,'Tawi la Luvigho',gNgokaLuv);
const gKiravuLuv = p('Kiravu Mazina Ngoka',11,'Tawi la Luvigho',gMazinaLuv);
const gNgomoi = p('Ngomoi Kiravu Mazina',12,'Tawi la Luvigho',gKiravuLuv);

// Ngomoi watoto (Gen 13)
p('Shikirini Ngomoi Kiravu',13,'Tawi la Luvigho',gNgomoi);
p('Mwalimu Ngomoi Kiravu',13,'Tawi la Luvigho',gNgomoi);
p('Kiravu Ngomoi Kiravu',13,'Tawi la Luvigho',gNgomoi);
p('Muhina Ngomoi Kiravu',13,'Tawi la Luvigho',gNgomoi);
p('Nyonga Ngomoi Kiravu',13,'Tawi la Luvigho',gNgomoi);
p('Mrindoko Ngomoi Kiravu',13,'Tawi la Luvigho',gNgomoi);
p('Kimanya Ngomoi Kiravu',13,'Tawi la Luvigho',gNgomoi);

// Mashombo → Madava → Mapande → Joseph (already in data)
// Just fix: gLuvigho has gMashombo but Ngoka etc were missing above
