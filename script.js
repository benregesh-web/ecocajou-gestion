const CODE_SITE = "ECO2025"; const CODE_MODIF = "1234"; let editIndex = null; let editType = null; let firebaseReady = false;
const CATALOGUE = {
  "PCH001": { des: "ISOPROPANOL 70°", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH002": { des: "HUILE DE COCO", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH003": { des: "SAVON LIQUIDE", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH004": { des: "SOUDE CAUSTIQUE", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
  "PCH005": { des: "GAZ NATUREL COMPRIME", unite: "PIECE", fam: "PRODUITS CHIMIQUES" },
  "PCH006": { des: "JAVEL GRAIN", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
  "PCH007": { des: "POUDRE DE SAVON (omo)", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
  "PCH008": { des: "POUDRE SAVON (kbkr)", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
  "PCH009": { des: "JAVEL LIQUIDE", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH010": { des: "HUILE DE MOTEUR", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH011": { des: "HUILE DE FREIN", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH012": { des: "ARGON", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
  "PCH013": { des: "OXYGENE CO2", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
  "PCH014": { des: "CARBURANT  GAZOIL", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH015": { des: "ESSENCE SUPER", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
  "PCH016": { des: "GRAISSE ALIMENTAIRE", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },

  "HGN001": { des: "TORCHON DE TABLE", unite: "PIECE", fam: "HYGIENE" },
  "HGN002": { des: "SERPILLERE", unite: "", fam: "HYGIENE" },
  "HGN003": { des: "PAPIER D'HYGIENE", unite: "", fam: "HYGIENE" },
  "HGN004": { des: "BALAIS A MANCHE", unite: "", fam: "HYGIENE" },
  "HGN005": { des: "BALAIS TRADITIONNEL", unite: "", fam: "HYGIENE" },
  "HGN006": { des: "SEAU", unite: "", fam: "HYGIENE" },
  "HGN007": { des: "PELLE PLASTIQUE", unite: "", fam: "HYGIENE" },
  "HGN008": { des: "EPONGE", unite: "", fam: "HYGIENE" },
  "HGN009": { des: "EPONGE METALLIQUE", unite: "", fam: "HYGIENE" },
  "HGN010": { des: "BROSSE DE NETOYAGE", unite: "", fam: "HYGIENE" },
  "HGN011": { des: "PELLE METALLIQUE", unite: "", fam: "HYGIENE" },
  "HGN012": { des: "SAC DE POUBELLE 100", unite: "", fam: "HYGIENE" },
  "HGN013": { des: "RACLETTE", unite: "", fam: "HYGIENE" },
  "HGN014": { des: "SAC POUBELLE 50", unite: "", fam: "HYGIENE" },
  "HGN015": { des: "SAC POUBELLE 130", unite: "", fam: "HYGIENE" },
  "HGN016": { des: "SAC POUBELLE 240", unite: "", fam: "HYGIENE" },
  "HGN017": { des: "PANIER A LINGE ", unite: "", fam: "HYGIENE" },
  "HGN018": { des: "BAC A LINGE ", unite: "", fam: "HYGIENE" },

  "EPI001": { des: "CHAUSSON ", unite: "PAIRE", fam: "EPI" },
  "EPI002": { des: "GANT DE MENAGE", unite: "PAIRE", fam: "EPI" },
  "EPI003": { des: "BLOUSE JETABLE", unite: "", fam: "EPI" },
  "EPI004": { des: "CHARLOTTE", unite: "", fam: "EPI" },
  "EPI005": { des: "CACHE-NEZ VISITEUR", unite: "", fam: "EPI" },
  "EPI006": { des: "BLOUSE ADMINISTRATION ", unite: "", fam: "EPI" },
  "EPI007": { des: "BOUCHON D'OREILLE", unite: "", fam: "EPI" },
  "EPI008": { des: "LUNETTE DE PROTECTION", unite: "", fam: "EPI" },
  "EPI009": { des: "CASQUE DE PROTECTION", unite: "", fam: "EPI" },
  "EPI010": { des: "BOTTE ORDINAIRE", unite: "", fam: "EPI" },
  "EPI011": { des: "CHAUSSURE DE SECURITE BOTTE PVC", unite: "", fam: "EPI" },
  "EPI012": { des: "CHAUSURE DE SECURITE", unite: "", fam: "EPI" },
  "EPI013": { des: "BABOUCHE", unite: "", fam: "EPI" },
  "EPI014": { des: "TENUE BLEU NUIT", unite: "", fam: "EPI" },
  "EPI015": { des: "TENUE BLANC", unite: "", fam: "EPI" },
  "EPI016": { des: "TENUE VERT", unite: "", fam: "EPI" },
  "EPI017": { des: "TENUE KAKI", unite: "", fam: "EPI" },
  "EPI018": { des: "TENUE MARRON", unite: "", fam: "EPI" },
  "EPI019": { des: "TENUE GRIS", unite: "", fam: "EPI" },
  "EPI020": { des: "TENUE BLEU CIEL", unite: "", fam: "EPI" },
  "EPI021": { des: "TENUE ROSE", unite: "", fam: "EPI" },
  "EPI022": { des: "TENUE VIOLET", unite: "", fam: "EPI" },
  "EPI023": { des: "GANT DE FOUR", unite: "", fam: "EPI" },

  "ERO001": { des: "SCOSH", unite: "ROULEAU", fam: "ERO" },
  "ERO002": { des: "SCOSH ADHESIF", unite: "ROULEAU", fam: "ERO" },
  "ERO003": { des: "PISSETTE 500ml", unite: "", fam: "ERO" },
  "ERO004": { des: "DABA", unite: "", fam: "ERO" },
  "ERO005": { des: "COUTEAN PELLING", unite: "", fam: "ERO" },
  "ERO006": { des: "AIGUILLE", unite: "", fam: "ERO" },
  "ERO007": { des: "PILE AAA 1,5", unite: "", fam: "ERO" },
  "ERO008": { des: "PILE AA 1,5", unite: "", fam: "ERO" },
  "ERO009": { des: "CORDE", unite: "", fam: "ERO" },
  "ERO010": { des: "MACHETTE", unite: "", fam: "ERO" },
  "ERO011": { des: "PALETTE DE SUPPORT PLASTIQUE", unite: "", fam: "ERO" },
  "ERO012": { des: "RATEAU", unite: "", fam: "ERO" },
  "ERO013": { des: "PALETTE DE SUPPORT NOIX BRUTE", unite: "", fam: "ERO" },
  "ERO014": { des: "BOL PLASTIQUE", unite: "", fam: "ERO" },
  "ERO015": { des: "BOL METALLIQUE", unite: "", fam: "ERO" },
  "ERO016": { des: "PILE DE TORCHE 1,5V", unite: "", fam: "ERO" },
  "ERO017": { des: "CALCULATRICE", unite: "", fam: "ERO" },
  "ERO018": { des: "PELLE BECHE (bout rond)", unite: "", fam: "ERO" },
  "ERO019": { des: "PELLE BECHE (bout carrée)", unite: "", fam: "ERO" },
  "ERO020": { des: "BROUETTE", unite: "", fam: "ERO" },
  "ERO021": { des: "BANDE ADHESIF REFLECHI 50 M", unite: "", fam: "ERO" },
  "ERO022": { des: "BANDE ADHESIF REFLECHI 30 M", unite: "", fam: "ERO" },
  "ERO023": { des: "BANDEROLE D'INTERDICTION", unite: "", fam: "ERO" },
  "ERO024": { des: "BASSINE GBAGBO", unite: "", fam: "ERO" },
  "ERO025": { des: "BASSINE ALLUMINIUM", unite: "", fam: "ERO" },
  "ERO026": { des: "BACHE BLEU (4*5)", unite: "", fam: "ERO" },
  "ERO027": { des: "PIOCHE", unite: "", fam: "ERO" },

  "EMB001": { des: "BIG BAG", unite: "", fam: "EMBALLAGE" },
  "EMB002": { des: "SAC BÔRÔ", unite: "", fam: "EMBALLAGE" },
  "EMB003": { des: "SAC JUTES BIO", unite: "", fam: "EMBALLAGE" },
  "EMB004": { des: "SAC JUTES CONVENTIONNEL", unite: "", fam: "EMBALLAGE" },
  "EMB005": { des: "CARTON CASHEW 453*235*340", unite: "", fam: "EMBALLAGE" },
  "EMB006": { des: "CARTON CASHEW 453*236*385", unite: "", fam: "EMBALLAGE" },
  "EMB007": { des: "PLASTIQUE SOUS VIDE", unite: "", fam: "EMBALLAGE" },
  "EMB008": { des: "BACHE EN POLYANE", unite: "", fam: "EMBALLAGE" },

  "BUR001": { des: "TABOURET INOX GRAND", unite: "", fam: "BUREAU" },
  "BUR002": { des: "MARKERS", unite: "", fam: "BUREAU" },
  "BUR003": { des: "STYLO ORDINAIRE", unite: "", fam: "BUREAU" },
  "BUR004": { des: "STYLO DETECTABLE", unite: "", fam: "BUREAU" },
  "BUR005": { des: "RAMETTE A4", unite: "", fam: "BUREAU" },
  "BUR006": { des: "TABOURET INOX PETIT", unite: "", fam: "BUREAU" },
  "BUR007": { des: "CAHIER 300 PAGES", unite: "", fam: "BUREAU" },
  "BUR008": { des: "CAHIER ETUDIANT 300", unite: "", fam: "BUREAU" },
  "BUR009": { des: "TABLE RONDE PLASTIQUE", unite: "", fam: "BUREAU" },
  "BUR010": { des: "CHAISE PLASTIQUE", unite: "", fam: "BUREAU" },
  "BUR011": { des: "CARNET DE CAISSE", unite: "", fam: "BUREAU" },
  "BUR012": { des: "CAHIER 100", unite: "", fam: "BUREAU" },
  "BUR013": { des: "TRACEUSE", unite: "", fam: "BUREAU" },
  "BUR014": { des: "RAMETTE A4 BRISTOL POUR CARTE DPM", unite: "", fam: "BUREAU" },

};

let agents = JSON.parse(localStorage.getItem("ec_agents") || `[{"code":"EC_00054","nom":"SANGARE","prenom":"MOINA","section":"ENTRETIEN"}]`);
let savedArts = JSON.parse(localStorage.getItem("ec_articles") || "[]"); let articles = savedArts.length > 0 ? savedArts : [];
Object.keys(CATALOGUE).forEach(code => { if (!articles.find(a => a.code === code)) { let c = CATALOGUE[code]; articles.push({ fam: c.fam, code: code, des: c.des, unite: c.unite, alerte: 20, init: 0 }); } });
let entrees = JSON.parse(localStorage.getItem("ec_entrees") || `[]`); let sorties = JSON.parse(localStorage.getItem("ec_sorties") || `[]`); let historique = JSON.parse(localStorage.getItem("ec_historique") || `{"entrees":[],"sorties":[]}`);
function checkFirebase() { if (window.firebaseDB && window.firebaseRef) { if (!firebaseReady) { firebaseReady = true; loadFromFirebase(); } return true; } return false; }
async function loadFromFirebase() { try { const db = window.firebaseDB; const ref = window.firebaseRef; const get = window.firebaseGet; const s = await get(ref(db, 'ecocajou')); if (s.exists()) { const d = s.val(); if (d.agents) agents = d.agents; if (d.articles) articles = d.articles; if (d.entrees) entrees = d.entrees; if (d.sorties) sorties = d.sorties; if (d.historique) historique = d.historique; localStorage.setItem("ec_agents", JSON.stringify(agents)); localStorage.setItem("ec_articles", JSON.stringify(articles)); localStorage.setItem("ec_entrees", JSON.stringify(entrees)); localStorage.setItem("ec_sorties", JSON.stringify(sorties)); localStorage.setItem("ec_historique", JSON.stringify(historique)); render(); } } catch (e) { } }
async function syncToFirebase() { if (!window.firebaseDB) return; try { const db = window.firebaseDB; const ref = window.firebaseRef; const set = window.firebaseSet; await set(ref(db, 'ecocajou'), { agents, articles, entrees, sorties, historique, lastUpdate: new Date().toISOString() }); } catch (e) { } }
let firebaseInterval = setInterval(() => { if (checkFirebase()) clearInterval(firebaseInterval); }, 500);
function getToday() { return new Date().toISOString().slice(0, 10); }
function formatToday() { return new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }); }
function login() { if (document.getElementById('siteCode').value === CODE_SITE) { localStorage.setItem("ec_logged", "1"); document.getElementById('loginScreen').style.display = 'none'; document.getElementById('app').style.display = 'block'; render(); } else alert("Code ECO2025"); }
function logout() { localStorage.removeItem("ec_logged"); location.reload(); }
if (localStorage.getItem("ec_logged") === "1") { document.getElementById('loginScreen').style.display = 'none'; document.getElementById('app').style.display = 'block'; }
function checkCode() { return prompt("Code modification (1234):") === CODE_MODIF; }
function save() { localStorage.setItem("ec_agents", JSON.stringify(agents)); localStorage.setItem("ec_articles", JSON.stringify(articles)); localStorage.setItem("ec_entrees", JSON.stringify(entrees)); localStorage.setItem("ec_sorties", JSON.stringify(sorties)); localStorage.setItem("ec_historique", JSON.stringify(historique)); syncToFirebase(); render(); }
function tab(id, el) { document.querySelectorAll('.page').forEach(p => p.style.display = 'none'); document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active')); document.getElementById(id).style.display = 'block'; el.classList.add('active'); }
function cloturerJournee() { if (!checkCode()) return; if (entrees.length === 0 && sorties.length === 0) return alert("Rien à clôturer"); if (!confirm("Clôturer " + getToday() + "?")) return; historique.entrees = historique.entrees.concat(entrees); historique.sorties = historique.sorties.concat(sorties); entrees = []; sorties = []; save(); alert("Journée clôturée!"); }
function voirHistorique() { tab('historique', document.querySelectorAll('.nav button')[5]); }
function renderHistorique() { let d = document.getElementById('hDate').value; let eList = d ? historique.entrees.filter(x => x.date === d) : historique.entrees; let sList = d ? historique.sorties.filter(x => x.date === d) : historique.sorties; document.getElementById('tHistEntrees').innerHTML = eList.map(e => `<tr><td>${e.date}</td><td>${e.code}</td><td>${e.des}</td><td>${e.qte}</td><td>${e.four}</td></tr>`).join('') || '<tr><td colspan=5>Aucune archive</td></tr>'; document.getElementById('tHistSorties').innerHTML = sList.map(s => `<tr><td>${s.date}</td><td>${s.code}</td><td>${s.qte}</td><td>${s.mat}</td><td>${s.nom}</td><td>${s.section}</td></tr>`).join('') || '<tr><td colspan=6>Aucune archive</td></tr>'; }

// ==== ARTICLES AVEC LISTE DEROULANTE CODE ====
function editArticle(i) { if (!checkCode()) return; let a = articles[i]; aFam.value = a.fam; aCode.value = a.code; aDes.value = a.des; aUnite.value = a.unite; aAlerte.value = a.alerte; aInit.value = a.init; editIndex = i; editType = 'article'; btnArticle.innerText = '✏️ Modifier Article'; btnCancelArticle.style.display = 'block'; titleArticle.innerText = 'MODIFIER ARTICLE - ' + a.code; tab('articles', document.querySelectorAll('.nav button')[3]); }
function saveArticle() {
  let codeVal = document.getElementById('aCode').value;
  if (!codeVal) return alert("Choisis un CODE");
  if (editType === 'article') {
    if (!checkCode()) return;
    articles[editIndex] = { fam: aFam.value.toUpperCase(), code: codeVal.toUpperCase(), des: aDes.value.toUpperCase(), unite: aUnite.value.toUpperCase(), alerte: parseFloat(aAlerte.value) || 0, init: parseFloat(aInit.value) || 0 };
    cancelEdit(); save(); return;
  }
  let o = { fam: aFam.value, code: codeVal.toUpperCase().trim(), des: aDes.value.toUpperCase().trim(), unite: aUnite.value.toUpperCase().trim(), alerte: parseFloat(aAlerte.value) || 0, init: parseFloat(aInit.value) || 0 };
  if (!o.des) return alert("DESIGNATION vide");
  if (articles.find(x => x.code === o.code)) return alert("Ce CODE existe déjà");
  articles.unshift(o); save();
  aCode.value = ''; aDes.value = ''; aUnite.value = '';
}
function delArt(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { articles.splice(i, 1); save(); } }
function editEntree(i) { if (!checkCode()) return; let e = entrees[i]; eCode.value = e.code; eQte.value = e.qte; eUnite.value = e.unite; eFour.value = e.four; editIndex = i; editType = 'entree'; btnEntree.innerText = '✏️ Modifier Entrée'; btnCancelEntree.style.display = 'block'; titleEntree.innerText = 'MODIFIER ENTREE - ' + e.code; tab('entrees', document.querySelectorAll('.nav button')[1]); }
function saveEntree() { if (editType === 'entree') { if (!checkCode()) return; entrees[editIndex] = { date: getToday(), code: eCode.value, des: articles.find(a => a.code === eCode.value)?.des || CATALOGUE[eCode.value]?.des || eCode.value, qte: parseFloat(eQte.value) || 0, unite: eUnite.value, four: eFour.value.toUpperCase() }; cancelEdit(); save(); return; } let code = eCode.value; let art = articles.find(a => a.code === code) || CATALOGUE[code]; let o = { date: getToday(), code, des: art ? art.des : code, qte: parseFloat(eQte.value) || 0, unite: eUnite.value || art?.unite || '', four: eFour.value.toUpperCase() }; if (!o.qte) return alert("Qte"); entrees.unshift(o); save(); eQte.value = ''; }
function delEntree(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { entrees.splice(i, 1); save(); } }
function editAgent(i) { if (!checkCode()) return; let a = agents[i]; agCode.value = a.code; agNom.value = a.nom; agPrenom.value = a.prenom; agSection.value = a.section; editIndex = i; editType = 'agent'; btnAgent.innerText = '✏️ Modifier Agent'; btnCancelAgent.style.display = 'block'; titleAgent.innerText = 'MODIFIER AGENT - ' + a.code; tab('agents', document.querySelectorAll('.nav button')[4]); }
function saveAgent() { if (editType === 'agent') { if (!checkCode()) return; agents[editIndex] = { code: agCode.value.toUpperCase(), nom: agNom.value.toUpperCase(), prenom: agPrenom.value.toUpperCase(), section: agSection.value.toUpperCase() }; cancelEdit(); save(); return; } let o = { code: agCode.value.toUpperCase().trim(), nom: agNom.value.toUpperCase().trim(), prenom: agPrenom.value.toUpperCase().trim(), section: agSection.value.toUpperCase().trim() }; if (!o.code || !o.nom) return alert("CODE+NOM"); agents.unshift(o); save(); agCode.value = ''; agNom.value = ''; agPrenom.value = ''; }
function delAgent(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { agents.splice(i, 1); save(); } }
function cancelEdit() { editIndex = null; editType = null; btnArticle.innerText = '+ Ajouter Article'; btnEntree.innerText = '+ Ajouter pour Aujourd\'hui'; btnAgent.innerText = '+ Ajouter Agent'; btnCancelArticle.style.display = 'none'; btnCancelEntree.style.display = 'none'; btnCancelAgent.style.display = 'none'; titleArticle.innerText = 'BASE ARTICLES'; titleEntree.innerText = 'ENTREES DU JOUR - ' + formatToday(); titleAgent.innerText = 'LISTE AGENTS'; if (document.getElementById('aCode')) document.getElementById('aCode').value = ''; }
function addSortie() { let code = sCode.value; let art = articles.find(a => a.code === code) || CATALOGUE[code]; let ag = agents.find(a => a.code === sMat.value); let o = { date: getToday(), code, des: art ? art.des : code, qte: parseFloat(sQte.value) || 0, unite: sUnite.value || art?.unite || '', mat: sMat.value, nom: ag ? ag.nom : sNom.value, prenom: ag ? ag.prenom : sPrenom.value, section: ag ? ag.section : sSection.value, ref: sRef.value }; if (!o.qte) return alert("Qte"); sorties.unshift(o); save(); }
function delSortie(i) { if (!checkCode()) return; if (confirm("Supprimer sortie?")) { sorties.splice(i, 1); save(); } }

function render() {
  document.getElementById('dateJour').innerText = "Aujourd'hui: " + formatToday() + " | " + getToday();
  let dEl = document.getElementById('dateEntree'); if (dEl) dEl.innerText = formatToday();
  let ds = document.getElementById('dateSortie'); if (ds) ds.innerText = formatToday();

  // ==== LISTE CODE FILTRÉE PAR FAMILLE ====
  let selA = document.getElementById('aCode');
  let selFam = document.getElementById('aFam');

  function updateCodeListByFamille() {
    let fam = selFam.value;
    // Codes du catalogue de cette famille
    let codesFiltres = Object.keys(CATALOGUE).filter(c => CATALOGUE[c].fam === fam);
    // + codes des articles déjà créés de cette famille qui ne sont pas dans catalogue
    articles.forEach(a => {
      if (a.fam === fam && !codesFiltres.includes(a.code)) {
        codesFiltres.push(a.code);
      }
    });
    codesFiltres.sort();
    let currentCode = selA.value;
    selA.innerHTML = `<option value="">-- CODE ${fam} (${codesFiltres.length}) --</option>` + codesFiltres.map(c => {
      let d = CATALOGUE[c] || articles.find(x => x.code === c);
      return `<option value="${c}">${c} - ${d ? d.des : c}</option>`;
    }).join('');
    // Si on éditait un article, on le remet
    if (currentCode && codesFiltres.includes(currentCode)) selA.value = currentCode;
    // Vider designation/unite si changement de famille
    if (selA.value === "") {
      document.getElementById('aDes').value = "";
      document.getElementById('aUnite').value = "";
    }
  }

  if (selA && selFam) {
    // 1. Au démarrage, on filtre selon la famille actuelle
    if (selA.options.length === 0) {
      updateCodeListByFamille();
    }
    // 2. Quand tu changes FAMILLE → on refiltre CODE
    selFam.onchange = () => {
      updateCodeListByFamille();
    };
    // 3. Quand tu choisis CODE → DESIGNATION + UNITE auto
    selA.onchange = () => {
      let code = selA.value;
      let data = CATALOGUE[code] || articles.find(a => a.code === code);
      if (data) {
        document.getElementById('aDes').value = data.des;
        document.getElementById('aUnite').value = data.unite;
        document.getElementById('aFam').value = data.fam; // au cas où
        document.getElementById('aDes').style.background = "#d8f5d8";
        document.getElementById('aUnite').style.background = "#d8f5d8";
        setTimeout(() => {
          document.getElementById('aDes').style.background = "#e8f5e9";
          document.getElementById('aUnite').style.background = "#e8f5e9";
        }, 600);
      } else {
        document.getElementById('aDes').value = "";
        document.getElementById('aUnite').value = "";
      }
    };
  }

  let selE = document.getElementById('eCode'); let selS = document.getElementById('sCode'); let selM = document.getElementById('sMat');
  if (selE) {
    selE.innerHTML = articles.map(a => `<option value="${a.code}">${a.code} - ${a.des}</option>`).join('');
    selS.innerHTML = selE.innerHTML;
    selM.innerHTML = agents.map(a => `<option value="${a.code}">${a.code} - ${a.nom} ${a.prenom}</option>`).join('');
    if (articles[0]) { eUnite.value = articles[0].unite; sUnite.value = articles[0].unite; }
    selE.onchange = () => { let a = articles.find(x => x.code === selE.value) || CATALOGUE[selE.value]; if (a) eUnite.value = a.unite; };
    selS.onchange = () => { let a = articles.find(x => x.code === selS.value) || CATALOGUE[selS.value]; if (a) sUnite.value = a.unite; };
    selM.onchange = () => { let ag = agents.find(x => x.code === selM.value); if (ag) { sNom.value = ag.nom; sPrenom.value = ag.prenom; sSection.value = ag.section; } };
  }
  tArticles.innerHTML = articles.map((a, i) => `<tr><td>${a.fam}</td><td><b>${a.code}</b></td><td>${a.des}</td><td>${a.unite}</td><td>${a.alerte}</td><td>${a.init}</td><td class="action"><button class="btn-icon edit-btn" onclick="editArticle(${i})">✏️</button><button class="btn-icon del-btn" onclick="delArt(${i})">🗑️</button></td></tr>`).join('');
  tEntrees.innerHTML = entrees.map((e, i) => `<tr><td>${e.date}</td><td>${e.code}</td><td>${e.des}</td><td>${e.qte}</td><td>${e.unite}</td><td>${e.four}</td><td class="action"><button class="btn-icon edit-btn" onclick="editEntree(${i})">✏️</button><button class="btn-icon del-btn" onclick="delEntree(${i})">🗑️</button></td></tr>`).join('');
  tAgents.innerHTML = agents.map((a, i) => `<tr><td><b>${a.code}</b></td><td>${a.nom}</td><td>${a.prenom}</td><td>${a.section}</td><td class="action"><button class="btn-icon edit-btn" onclick="editAgent(${i})">✏️</button><button class="btn-icon del-btn" onclick="delAgent(${i})">🗑️</button></td></tr>`).join('');
  tSorties.innerHTML = sorties.map((s, i) => `<tr><td>${s.date}</td><td>${s.code}</td><td>${s.qte}</td><td>${s.mat}</td><td>${s.nom}</td><td>${s.section}</td><td><button class="btn-icon del-btn" onclick="delSortie(${i})">🗑️</button></td></tr>`).join('');
  let f = sStock.value.toLowerCase(); let ac = 0;
  tStock.innerHTML = articles.filter(a => !f || a.code.toLowerCase().includes(f) || a.des.toLowerCase().includes(f)).map(a => {
    let entToday = entrees.filter(e => e.code === a.code).reduce((s, e) => s + e.qte, 0);
    let entHist = historique.entrees.filter(e => e.code === a.code).reduce((s, e) => s + e.qte, 0);
    let sorToday = sorties.filter(s => s.code === a.code).reduce((s, e) => s + e.qte, 0);
    let sorHist = historique.sorties.filter(s => s.code === a.code).reduce((s, e) => s + e.qte, 0);
    let ent = entToday + entHist; let sor = sorToday + sorHist; let dispo = a.init + ent - sor;
    if (dispo <= a.alerte) ac++;
    let etat = dispo <= a.alerte ? '<span class="red">A COMMANDER</span>' : '<span class="green">EN STOCK</span>';
    return `<tr><td>${a.fam}</td><td>${a.code}</td><td>${a.des}</td><td>${a.alerte}</td><td>${a.init}</td><td style="background:#e8f5e9">${ent.toFixed(2)}</td><td style="background:#ffebee">${sor.toFixed(2)}</td><td><b>${dispo.toFixed(2)}</b></td><td>${etat}</td></tr>`;
  }).join('');
  alertBox.innerHTML = `📅 ${getToday()} - ${articles.length} articles | ${entrees.length} entrées | ${ac} à commander ${firebaseReady ? '' : '⏳ Connexion...'}`;
  renderHistorique();
}
function exportExcel() { let csv = "DATE,CODE,DESIGNATION,QTE,TYPE\n"; historique.entrees.concat(entrees).forEach(e => { csv += `${e.date},${e.code},${e.des},${e.qte},ENTREE\n`; }); let blob = new Blob([csv], { type: 'text/csv' }); let a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ECOCAJOU-' + getToday() + '.csv'; a.click(); }
render();

// === EXPORT LISTE AGENTS - ECOCAJOU ===
function exportAgentsExcel() {
  let rows = document.querySelectorAll("#tAgents tr");
  if (rows.length == 0) { alert("Aucun agent à exporter"); return; }
  let csv = "CODE;NOM;PRENOMS;SECTION\n";
  rows.forEach(r => {
    let cols = r.querySelectorAll("td");
    if (cols.length >= 4) csv += `${cols[0].innerText};${cols[1].innerText};${cols[2].innerText};${cols[3].innerText}\n`;
  });
  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  let a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = "LISTE_AGENTS_ECOCAJOU_" + new Date().toISOString().slice(0, 10) + ".csv"; a.click();
}

// --- IMPORTER LISTE AGENTS - VERSION FINALE CORRECTE ---
function importerAgentsExcel(event) {
  let file = event.target.files[0];
  if (!file) return;
  let reader = new FileReader();
  reader.onload = function (e) {
    try {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: 'array' });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      let allRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

      let headerIndex = -1;
      for (let i = 0; i < allRows.length; i++) {
        let rowStr = allRows[i].join(" ").toUpperCase();
        if (rowStr.includes("CODE") && rowStr.includes("NOM")) {
          headerIndex = i;
          break;
        }
      }
      if (headerIndex == -1) { alert("Entête CODE/NOM non trouvé!"); return; }

      let headers = allRows[headerIndex].map(h => h.toString().trim().toUpperCase());
      let idxCode = headers.indexOf("CODE");
      let idxNom = headers.indexOf("NOM");
      let idxPrenoms = headers.findIndex(h => h.includes("PRENOM"));
      let idxSection = headers.findIndex(h => h.includes("SECTION") || h.includes("SERVICE"));

      let count = 0;
      for (let i = headerIndex + 1; i < allRows.length; i++) {
        let r = allRows[i];
        if (!r || r.length == 0) continue;
        let code = (r[idxCode] || "").toString().trim().toUpperCase();
        let nom = (r[idxNom] || "").toString().trim().toUpperCase();
        let prenom = (r[idxPrenoms] || "").toString().trim().toUpperCase();
        let section = (r[idxSection] || "").toString().trim().toUpperCase();

        if (!nom && !prenom) continue;
        if (code && agents.some(a => a.code == code)) continue;

        // CORRECTION ICI : on met prenom au singulier comme ton code l'attend
        agents.push({ code: code || "AG" + Date.now() + count, nom, prenom, section: section || "ADMINISTRATION" });
        count++;
      }

      save(); // <-- TRÈS IMPORTANT : c'est save() qui affiche, pas localStorage direct
      alert(count + " agents importés avec succès!");
      render();

    } catch (err) {
      alert("Erreur: " + err.message);
      console.error(err);
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = "";
}