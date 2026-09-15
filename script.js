const CODE_SITE = "ECO2025"; const CODE_MODIF = "1234";
let editIndex = null; let editType = null;

// CATALOGUE COMPLET - C'EST ÇA QUI FAIT LA GRANDE LISTE
const CATALOGUE = {
    "PCH001": { des: "ISOPROPANOL 70°", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
    "PCH002": { des: "HUILE DE COCO", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
    "PCH003": { des: "SAVON LIQUIDE", unite: "LITRES", fam: "PRODUITS CHIMIQUES" },
    "PCH006": { des: "JAVEL GRAIN", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
    "PCH007": { des: "POUDRE DE SAVON (omo)", unite: "KILOGRAMME", fam: "PRODUITS CHIMIQUES" },
    "HGN001": { des: "TORCHON DE TABLE", unite: "PIECE", fam: "HYGIENE" },
    "HGN007": { des: "PELLE PLASTIQUE", unite: "PIECE", fam: "HYGIENE" },
    "HGN008": { des: "EPONGE", unite: "PCE", fam: "HYGIENE" },
    "BUR014": { des: "RAMETTE A4 BRISTOL POUR CARTE DPM", unite: "PCE", fam: "BUREAUTIQUE" },
    "EMB002": { des: "SAC BÖRÖ", unite: "PAQUET", fam: "EMBALLAGE" },
    "EMB001": { des: "SAC POUBELLE 100L", unite: "PAQUET", fam: "EMBALLAGE" },
    "EPI001": { des: "GANTS LATEX", unite: "PAIRE", fam: "EPI" },
};

let agents = JSON.parse(localStorage.getItem("ec_agents") || `[{"code":"EC_00054","nom":"SANGARE","prenom":"MOINA","section":"ENTRETIEN"},{"code":"EC_01231","nom":"SYLLA","prenom":"MOUSTAPHA","section":"Lavage"}]`);

let savedArts = JSON.parse(localStorage.getItem("ec_articles") || "[]");
let articles = savedArts.length > 0 ? savedArts : [];
// FUSION AUTO : ajoute tout le catalogue s'il manque (corrige ton problème capture 1 vs 2)
Object.keys(CATALOGUE).forEach(code => {
    if (!articles.find(a => a.code === code)) {
        let c = CATALOGUE[code];
        articles.push({ fam: c.fam, code: code, des: c.des, unite: c.unite, alerte: 20, init: 0 });
    }
});
if (articles.length === 0) { articles.push({ fam: "PRODUITS CHIMIQUES", code: "PCH001", des: "ISOPROPANOL 70°", unite: "LITRES", alerte: 150, init: 423.9 }); }

let entrees = JSON.parse(localStorage.getItem("ec_entrees") || `[]`);
let sorties = JSON.parse(localStorage.getItem("ec_sorties") || `[]`);
let historique = JSON.parse(localStorage.getItem("ec_historique") || `{"entrees":[],"sorties":[]}`);

function getToday() { return new Date().toISOString().slice(0, 10); }
function formatToday() { let d = new Date(); return d.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }); }
function login() { if (document.getElementById('siteCode').value === CODE_SITE) { localStorage.setItem("ec_logged", "1"); document.getElementById('loginScreen').style.display = 'none'; document.getElementById('app').style.display = 'block'; render(); } else alert("Code ECO2025"); }
function logout() { localStorage.removeItem("ec_logged"); location.reload(); }
if (localStorage.getItem("ec_logged") === "1") { document.getElementById('loginScreen').style.display = 'none'; document.getElementById('app').style.display = 'block'; }
function checkCode() { let c = prompt("Code modification (1234):"); return c === CODE_MODIF; }
function save() { localStorage.setItem("ec_agents", JSON.stringify(agents)); localStorage.setItem("ec_articles", JSON.stringify(articles)); localStorage.setItem("ec_entrees", JSON.stringify(entrees)); localStorage.setItem("ec_sorties", JSON.stringify(sorties)); localStorage.setItem("ec_historique", JSON.stringify(historique)); render(); }
function tab(id, el) { document.querySelectorAll('.page').forEach(p => p.style.display = 'none'); document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active')); document.getElementById(id).style.display = 'block'; el.classList.add('active'); }
function cloturerJournee() { if (!checkCode()) return; if (entrees.length === 0 && sorties.length === 0) return alert("Rien à clôturer"); if (!confirm("Clôturer " + getToday() + "?")) return; historique.entrees = historique.entrees.concat(entrees); historique.sorties = historique.sorties.concat(sorties); entrees = []; sorties = []; save(); alert("Journée clôturée!"); }
function voirHistorique() { tab('historique', document.querySelectorAll('.nav button')[5]); }
function renderHistorique() { let d = document.getElementById('hDate').value; let eList = d ? historique.entrees.filter(x => x.date === d) : historique.entrees; let sList = d ? historique.sorties.filter(x => x.date === d) : historique.sorties; document.getElementById('tHistEntrees').innerHTML = eList.map(e => `<tr><td>${e.date}</td><td>${e.code}</td><td>${e.des}</td><td>${e.qte}</td><td>${e.four}</td></tr>`).join('') || '<tr><td colspan=5>Aucune archive</td></tr>'; document.getElementById('tHistSorties').innerHTML = sList.map(s => `<tr><td>${s.date}</td><td>${s.code}</td><td>${s.qte}</td><td>${s.mat}</td><td>${s.nom}</td><td>${s.section}</td></tr>`).join('') || '<tr><td colspan=6>Aucune archive</td></tr>'; }

function editArticle(i) { if (!checkCode()) return; let a = articles[i]; aFam.value = a.fam; aCode.value = a.code; aDes.value = a.des; aUnite.value = a.unite; aAlerte.value = a.alerte; aInit.value = a.init; editIndex = i; editType = 'article'; btnArticle.innerText = '✏️ Modifier Article'; btnCancelArticle.style.display = 'block'; titleArticle.innerText = 'MODIFIER ARTICLE - ' + a.code; tab('articles', document.querySelectorAll('.nav button')[3]); }
function saveArticle() { if (editType === 'article') { if (!checkCode()) return; articles[editIndex] = { fam: aFam.value.toUpperCase(), code: aCode.value.toUpperCase(), des: aDes.value.toUpperCase(), unite: aUnite.value.toUpperCase(), alerte: parseFloat(aAlerte.value) || 0, init: parseFloat(aInit.value) || 0 }; cancelEdit(); save(); return; } let o = { fam: aFam.value, code: aCode.value.toUpperCase().trim(), des: aDes.value.toUpperCase().trim(), unite: aUnite.value.toUpperCase().trim(), alerte: parseFloat(aAlerte.value) || 0, init: parseFloat(aInit.value) || 0 }; if (!o.code || !o.des) return alert("CODE+DES"); articles.unshift(o); save(); aCode.value = ''; aDes.value = ''; }
function delArt(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { articles.splice(i, 1); save(); } }

function editEntree(i) { if (!checkCode()) return; let e = entrees[i]; eCode.value = e.code; eQte.value = e.qte; eUnite.value = e.unite; eFour.value = e.four; editIndex = i; editType = 'entree'; btnEntree.innerText = '✏️ Modifier Entrée'; btnCancelEntree.style.display = 'block'; titleEntree.innerText = 'MODIFIER ENTREE DU JOUR - ' + e.code; tab('entrees', document.querySelectorAll('.nav button')[1]); }
function saveEntree() { if (editType === 'entree') { if (!checkCode()) return; entrees[editIndex] = { date: getToday(), code: eCode.value, des: articles.find(a => a.code === eCode.value)?.des || CATALOGUE[eCode.value]?.des || eCode.value, qte: parseFloat(eQte.value) || 0, unite: eUnite.value, four: eFour.value.toUpperCase() }; cancelEdit(); save(); return; } let code = eCode.value; let art = articles.find(a => a.code === code) || CATALOGUE[code]; let o = { date: getToday(), code, des: art ? art.des : code, qte: parseFloat(eQte.value) || 0, unite: eUnite.value || art?.unite || '', four: eFour.value.toUpperCase() }; if (!o.qte) return alert("Qte"); entrees.unshift(o); save(); eQte.value = ''; }
function delEntree(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { entrees.splice(i, 1); save(); } }

function editAgent(i) { if (!checkCode()) return; let a = agents[i]; agCode.value = a.code; agNom.value = a.nom; agPrenom.value = a.prenom; agSection.value = a.section; editIndex = i; editType = 'agent'; btnAgent.innerText = '✏️ Modifier Agent'; btnCancelAgent.style.display = 'block'; titleAgent.innerText = 'MODIFIER AGENT - ' + a.code; tab('agents', document.querySelectorAll('.nav button')[4]); }
function saveAgent() { if (editType === 'agent') { if (!checkCode()) return; agents[editIndex] = { code: agCode.value.toUpperCase(), nom: agNom.value.toUpperCase(), prenom: agPrenom.value.toUpperCase(), section: agSection.value.toUpperCase() }; cancelEdit(); save(); return; } let o = { code: agCode.value.toUpperCase().trim(), nom: agNom.value.toUpperCase().trim(), prenom: agPrenom.value.toUpperCase().trim(), section: agSection.value.toUpperCase().trim() }; if (!o.code || !o.nom) return alert("CODE+NOM"); agents.unshift(o); save(); agCode.value = ''; agNom.value = ''; agPrenom.value = ''; }
function delAgent(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { agents.splice(i, 1); save(); } }
function cancelEdit() { editIndex = null; editType = null; btnArticle.innerText = '+ Ajouter Article'; btnEntree.innerText = '+ Ajouter pour Aujourd\'hui'; btnAgent.innerText = '+ Ajouter Agent'; btnCancelArticle.style.display = 'none'; btnCancelEntree.style.display = 'none'; btnCancelAgent.style.display = 'none'; titleArticle.innerText = 'BASE ARTICLES - Ajouter en haut seulement'; titleEntree.innerText = 'ENTREES DU JOUR - ' + formatToday(); titleAgent.innerText = 'LISTE AGENTS'; }
function addSortie() { let code = sCode.value; let art = articles.find(a => a.code === code) || CATALOGUE[code]; let ag = agents.find(a => a.code === sMat.value); let o = { date: getToday(), code, des: art ? art.des : code, qte: parseFloat(sQte.value) || 0, unite: sUnite.value || art?.unite || '', mat: sMat.value, nom: ag ? ag.nom : sNom.value, prenom: ag ? ag.prenom : sPrenom.value, section: ag ? ag.section : sSection.value, ref: sRef.value }; if (!o.qte) return alert("Qte"); sorties.unshift(o); save(); }
function delSortie(i) { if (!checkCode()) return; if (confirm("Supprimer sortie?")) { sorties.splice(i, 1); save(); } }

function render() {
    document.getElementById('dateJour').innerText = "Aujourd'hui: " + formatToday() + " | " + getToday();
    let dEl = document.getElementById('dateEntree'); if (dEl) dEl.innerText = formatToday();
    let ds = document.getElementById('dateSortie'); if (ds) ds.innerText = formatToday();
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
        let ent = entToday + entHist; let sor = sorToday + sorHist; let dispo = a.init + ent - sor; if (dispo <= a.alerte) ac++;
        let etat = dispo <= a.alerte ? '<span class="red">A COMMANDER</span>' : '<span class="green">EN STOCK</span>';
        return `<tr><td>${a.fam}</td><td>${a.code}</td><td>${a.des}</td><td>${a.alerte}</td><td>${a.init}</td><td style="background:#e8f5e9">${ent.toFixed(2)}</td><td style="background:#ffebee">${sor.toFixed(2)}</td><td><b>${dispo.toFixed(2)}</b></td><td>${etat}</td></tr>`;
    }).join('');
    alertBox.innerHTML = `📅 ${getToday()} - Liste complète ${articles.length} articles | ${entrees.length} entrées aujourd'hui | ${ac} à commander`;
    renderHistorique();
}
function exportExcel() { let csv = "DATE,CODE,DESIGNATION,QTE,TYPE\n"; historique.entrees.concat(entrees).forEach(e => { csv += `${e.date},${e.code},${e.des},${e.qte},ENTREE\n`; }); let blob = new Blob([csv], { type: 'text/csv' }); let a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ECOCAJOU-' + getToday() + '.csv'; a.click(); }

// AUTO REMPLISSAGE DANS ARTICLE QUAND TU TAPES CODE
document.addEventListener('DOMContentLoaded', () => {
    let inputCode = document.getElementById('aCode');
    if (inputCode) {
        inputCode.addEventListener('input', function () {
            let code = this.value.toUpperCase().trim();
            let data = CATALOGUE[code];
            if (data) {
                aDes.value = data.des;
                aUnite.value = data.unite;
                aFam.value = data.fam;
                aDes.style.background = "#d8f5d8";
                aUnite.style.background = "#d8f5d8";
                setTimeout(() => { aDes.style.background = "#fff"; aUnite.style.background = "#fff"; }, 800);
            }
        });
    }
});
render();