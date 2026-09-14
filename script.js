const CODE_SITE = "ECO2025"; const CODE_MODIF = "1234";
let editIndex = null; let editType = null;
let agents = JSON.parse(localStorage.getItem("ec_agents") || `[{"code":"EC_00054","nom":"SANGARE","prenom":"MOINA","section":"ENTRETIEN"},{"code":"EC_01231","nom":"SYLLA","prenom":"MOUSTAPHA","section":"Lavage"}]`);
let articles = JSON.parse(localStorage.getItem("ec_articles") || `[{"fam":"PRODUITS CHIMIQUES","code":"PCH001","des":"ISOPROPANOL 70°","unite":"LITRES","alerte":150,"init":423.9},{"fam":"HYGIENE","code":"HGN001","des":"TORCHON DE TABLE","unite":"PIECE","alerte":20,"init":57}]`);
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

function cloturerJournee() {
    if (!checkCode()) return;
    if (entrees.length === 0 && sorties.length === 0) return alert("Rien à clôturer aujourd'hui");
    if (!confirm("Clôturer la journée du " + getToday() + "? Tout va partir en ARCHIVE et tu pourras commencer demain. Le STOCK FINAL garde tout.")) return;
    historique.entrees = historique.entrees.concat(entrees);
    historique.sorties = historique.sorties.concat(sorties);
    entrees = []; sorties = [];
    save();
    alert("Journée clôturée! Va dans ARCHIVE JOURNALIERE pour voir.");
}

function voirHistorique() { tab('historique', document.querySelectorAll('.nav button')[5]); }
function renderHistorique() {
    let d = document.getElementById('hDate').value;
    let eList = d ? historique.entrees.filter(x => x.date === d) : historique.entrees;
    let sList = d ? historique.sorties.filter(x => x.date === d) : historique.sorties;
    document.getElementById('tHistEntrees').innerHTML = eList.map(e => `<tr><td>${e.date}</td><td>${e.code}</td><td>${e.des}</td><td>${e.qte}</td><td>${e.four}</td></tr>`).join('') || '<tr><td colspan=5>Aucune archive</td></tr>';
    document.getElementById('tHistSorties').innerHTML = sList.map(s => `<tr><td>${s.date}</td><td>${s.code}</td><td>${s.qte}</td><td>${s.mat}</td><td>${s.nom}</td><td>${s.section}</td></tr>`).join('') || '<tr><td colspan=6>Aucune archive</td></tr>';
}

function editArticle(i) { if (!checkCode()) return; let a = articles[i]; aFam.value = a.fam; aCode.value = a.code; aDes.value = a.des; aUnite.value = a.unite; aAlerte.value = a.alerte; aInit.value = a.init; editIndex = i; editType = 'article'; btnArticle.innerText = '✏️ Modifier Article'; btnCancelArticle.style.display = 'block'; titleArticle.innerText = 'MODIFIER ARTICLE - ' + a.code; tab('articles', document.querySelectorAll('.nav button')[3]); }
function saveArticle() { if (editType === 'article') { if (!checkCode()) return; let old = articles[editIndex].code; articles[editIndex] = { fam: aFam.value.toUpperCase(), code: aCode.value.toUpperCase(), des: aDes.value.toUpperCase(), unite: aUnite.value.toUpperCase(), alerte: parseFloat(aAlerte.value) || 0, init: parseFloat(aInit.value) || 0 }; if (old !== articles[editIndex].code) { entrees.forEach(e => { if (e.code === old) e.code = articles[editIndex].code }); sorties.forEach(s => { if (s.code === old) s.code = articles[editIndex].code }); historique.entrees.forEach(e => { if (e.code === old) e.code = articles[editIndex].code }); historique.sorties.forEach(s => { if (s.code === old) s.code = articles[editIndex].code }); } cancelEdit(); save(); return; } let o = { fam: aFam.value, code: aCode.value.toUpperCase().trim(), des: aDes.value.toUpperCase().trim(), unite: aUnite.value.toUpperCase().trim(), alerte: parseFloat(aAlerte.value) || 0, init: parseFloat(aInit.value) || 0 }; if (!o.code || !o.des) return alert("CODE+DES"); articles.unshift(o); save(); aCode.value = ''; aDes.value = ''; }
function delArt(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { articles.splice(i, 1); save(); } }

function editEntree(i) { if (!checkCode()) return; let e = entrees[i]; eCode.value = e.code; eQte.value = e.qte; eUnite.value = e.unite; eFour.value = e.four; editIndex = i; editType = 'entree'; btnEntree.innerText = '✏️ Modifier Entrée'; btnCancelEntree.style.display = 'block'; titleEntree.innerText = 'MODIFIER ENTREE DU JOUR - ' + e.code; tab('entrees', document.querySelectorAll('.nav button')[1]); }
function saveEntree() { if (editType === 'entree') { if (!checkCode()) return; entrees[editIndex] = { date: getToday(), code: eCode.value, des: articles.find(a => a.code === eCode.value)?.des || eCode.value, qte: parseFloat(eQte.value) || 0, unite: eUnite.value, four: eFour.value.toUpperCase() }; cancelEdit(); save(); return; } let code = eCode.value; let art = articles.find(a => a.code === code); let o = { date: getToday(), code, des: art ? art.des : code, qte: parseFloat(eQte.value) || 0, unite: eUnite.value, four: eFour.value.toUpperCase() }; if (!o.qte) return alert("Qte"); entrees.unshift(o); save(); eQte.value = ''; }
function delEntree(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { entrees.splice(i, 1); save(); } }

function editAgent(i) { if (!checkCode()) return; let a = agents[i]; agCode.value = a.code; agNom.value = a.nom; agPrenom.value = a.prenom; agSection.value = a.section; editIndex = i; editType = 'agent'; btnAgent.innerText = '✏️ Modifier Agent'; btnCancelAgent.style.display = 'block'; titleAgent.innerText = 'MODIFIER AGENT - ' + a.code; tab('agents', document.querySelectorAll('.nav button')[4]); }
function saveAgent() { if (editType === 'agent') { if (!checkCode()) return; agents[editIndex] = { code: agCode.value.toUpperCase(), nom: agNom.value.toUpperCase(), prenom: agPrenom.value.toUpperCase(), section: agSection.value.toUpperCase() }; cancelEdit(); save(); return; } let o = { code: agCode.value.toUpperCase().trim(), nom: agNom.value.toUpperCase().trim(), prenom: agPrenom.value.toUpperCase().trim(), section: agSection.value.toUpperCase().trim() }; if (!o.code || !o.nom) return alert("CODE+NOM"); agents.unshift(o); save(); agCode.value = ''; agNom.value = ''; agPrenom.value = ''; }
function delAgent(i) { if (!checkCode()) return; if (confirm("Supprimer?")) { agents.splice(i, 1); save(); } }
function cancelEdit() { editIndex = null; editType = null; btnArticle.innerText = '+ Ajouter Article'; btnEntree.innerText = '+ Ajouter pour Aujourd\'hui'; btnAgent.innerText = '+ Ajouter Agent'; btnCancelArticle.style.display = 'none'; btnCancelEntree.style.display = 'none'; btnCancelAgent.style.display = 'none'; titleArticle.innerText = 'BASE ARTICLES - Ajout en haut seulement'; titleEntree.innerText = 'ENTREES DU JOUR - ' + formatToday(); titleAgent.innerText = 'LISTE AGENTS'; }

function addSortie() { let code = sCode.value; let art = articles.find(a => a.code === code); let ag = agents.find(a => a.code === sMat.value); let o = { date: getToday(), code, des: art ? art.des : code, qte: parseFloat(sQte.value) || 0, unite: sUnite.value, mat: sMat.value, nom: ag ? ag.nom : sNom.value, prenom: ag ? ag.prenom : sPrenom.value, section: ag ? ag.section : sSection.value, ref: sRef.value }; if (!o.qte) return alert("Qte"); sorties.unshift(o); save(); }
function delSortie(i) { if (!checkCode()) return; if (confirm("Supprimer sortie?")) { sorties.splice(i, 1); save(); } }

function render() {
    document.getElementById('dateJour').innerText = "Aujourd'hui: " + formatToday() + " | " + getToday();
    let dEl = document.getElementById('dateEntree'); if (dEl) dEl.innerText = formatToday();
    let ds = document.getElementById('dateSortie'); if (ds) ds.innerText = formatToday();

    let selE = document.getElementById('eCode'); let selS = document.getElementById('sCode'); let selM = document.getElementById('sMat');
    if (selE) {
        selE.innerHTML = articles.map(a => `<option value="${a.code}">${a.code} - ${a.des}</option>`).join(''); selS.innerHTML = selE.innerHTML; selM.innerHTML = agents.map(a => `<option value="${a.code}">${a.code} - ${a.nom} ${a.prenom}</option>`).join(''); if (articles[0]) { eUnite.value = articles[0].unite; sUnite.value = articles[0].unite; }
        selE.onchange = () => { let a = articles.find(x => x.code === selE.value); if (a) eUnite.value = a.unite; }; selS.onchange = () => { let a = articles.find(x => x.code === selS.value); if (a) sUnite.value = a.unite; }; selM.onchange = () => { let ag = agents.find(x => x.code === selM.value); if (ag) { sNom.value = ag.nom; sPrenom.value = ag.prenom; sSection.value = ag.section; } };
    }

    tArticles.innerHTML = articles.map((a, i) => `<tr><td>${a.fam}</td><td><b>${a.code}</b></td><td>${a.des}</td><td>${a.unite}</td><td>${a.alerte}</td><td>${a.init}</td><td class="action"><button class="btn-icon edit-btn" onclick="editArticle(${i})">✏️</button><button class="btn-icon del-btn" onclick="delArt(${i})">🗑️</button></td></tr>`).join('');
    tEntrees.innerHTML = entrees.map((e, i) => `<tr><td>${e.date}</td><td>${e.code}</td><td>${e.des}</td><td>${e.qte}</td><td>${e.unite}</td><td>${e.four}</td><td class="action"><button class="btn-icon edit-btn" onclick="editEntree(${i})">✏️</button><button class="btn-icon del-btn" onclick="delEntree(${i})">🗑️</button></td></tr>`).join('');
    tAgents.innerHTML = agents.map((a, i) => `<tr><td><b>${a.code}</b></td><td>${a.nom}</td><td>${a.prenom}</td><td>${a.section}</td><td class="action"><button class="btn-icon edit-btn" onclick="editAgent(${i})">✏️</button><button class="btn-icon del-btn" onclick="delAgent(${i})">🗑️</button></td></tr>`).join('');
    tSorties.innerHTML = sorties.map((s, i) => `<tr><td>${s.date}</td><td>${s.code}</td><td>${s.qte}</td><td>${s.mat}</td><td>${s.nom}</td><td>${s.section}</td><td><button class="btn-icon del-btn" onclick="delSortie(${i})">🗑️</button></td></tr>`).join('');

    let f = sStock.value.toLowerCase(); let ac = 0;
    // STOCK FINAL calcule TOUT: historique + aujourd'hui
    tStock.innerHTML = articles.filter(a => !f || a.code.toLowerCase().includes(f) || a.des.toLowerCase().includes(f)).map(a => {
        let entToday = entrees.filter(e => e.code === a.code).reduce((s, e) => s + e.qte, 0);
        let entHist = historique.entrees.filter(e => e.code === a.code).reduce((s, e) => s + e.qte, 0);
        let sorToday = sorties.filter(s => s.code === a.code).reduce((s, e) => s + e.qte, 0);
        let sorHist = historique.sorties.filter(s => s.code === a.code).reduce((s, e) => s + e.qte, 0);
        let ent = entToday + entHist; let sor = sorToday + sorHist;
        let dispo = a.init + ent - sor; if (dispo <= a.alerte) ac++;
        let etat = dispo <= a.alerte ? '<span class="red">A COMMANDER</span>' : '<span class="green">EN STOCK</span>';
        return `<tr><td>${a.fam}</td><td>${a.code}</td><td>${a.des}</td><td>${a.alerte}</td><td>${a.init}</td><td style="background:#e8f5e9">${ent.toFixed(2)}</td><td style="background:#ffebee">${sor.toFixed(2)}</td><td><b>${dispo.toFixed(2)}</b></td><td>${etat}</td></tr>`;
    }).join('');
    alertBox.innerHTML = `📅 Aujourd'hui ${getToday()} - Pas besoin de taper date, c'est automatique | ${entrees.length} entrées aujourd'hui | ${historique.entrees.length} entrées archivées | ${ac} à commander | Clôture = archive`;
    renderHistorique();
}
function exportExcel() { let csv = "DATE,CODE,DESIGNATION,QTE,TYPE,FOURNISSEUR/MAT\n"; historique.entrees.concat(entrees).forEach(e => { csv += `${e.date},${e.code},${e.des},${e.qte},ENTREE,${e.four}\n`; }); historique.sorties.concat(sorties).forEach(s => { csv += `${s.date},${s.code},${s.des},${s.qte},SORTIE,${s.mat}\n`; }); let blob = new Blob([csv], { type: 'text/csv' }); let a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ECOCAJOU-JOURNALIER-' + getToday() + '.csv'; a.click(); }
render();