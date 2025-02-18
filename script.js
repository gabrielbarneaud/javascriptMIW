let libProd = ['choisir','PC','imprimante','moniteur','câble'];
let prxProd = ['', 1000,80,150,20];

function moins(n) {
    if(document.forms[0].quantity[n].value == 1) sup(n);
    if(document.forms[0].quantity[n].value > 1 && document.forms[0].product[n].value !== '') document.forms[0].quantity[n].value--;
}
function pluus(n) {
    if(document.forms[0].product[n].value === '') return;
    document.forms[0].quantity[n].value++;
}
function sup(n) {
    document.forms[0].quantity[n].value = '';
    document.forms[0].price[n].value = '';
    document.forms[0].product[n].value = '';
}
function affMontant() {
    let mtHT = 0;
    let quantities = document.forms[0].quantity;
    let prices = document.forms[0].price;
    for (let i = 0; i < quantities.length; i++) {
        mtHT = Number(mtHT) + (quantities[i].value*prices[i].value);
    }
    document.getElementById('mtHT').value = mtHT.toFixed(2);
    document.getElementById('mtTVA').value = (mtHT*0.196).toFixed(2);
    document.getElementById('mtTTC').value = (mtHT*1.196).toFixed(2);
}
function validationCmd() {
     let inputs = document.forms[0].getElementsByTagName('input');
     let labels = document.forms[0].getElementsByTagName('label');
     let valid = true;
     let ch='';
     if(document.getElementById('mtHT').value <= 0.00){
         valid = false;
         ch += '\naucun prix sélectionné';
     }else {
         for (let i = 0; i < inputs.length; i++) {
             if (!inputs[i].checkValidity()) {
                 valid = false;
                 ch += '\n' + labels[i].innerHTML.replace(' : ', '') + ' invalide';
             }
         }
     }
    valid ? alert('Formulaire correct !') : alert('Formulaire incorrect : '+ch);
}
function affLigne(n) {
    document.forms[0].price[n].value = document.forms[0].product[n].value;
    document.forms[0].product[n].value !== '' ? document.forms[0].quantity[n].value = 1 : document.forms[0].quantity[n].value = '';
}
function creerLigneProduit(index) {
    let select = `<select name="product" onchange="affLigne(${index})">`;
    for (let i = 0; i < libProd.length; i++) {
        select+= `<option value="${prxProd[i]}">${libProd[i]}</option>`;
    }
    return select+
        `<input name="price" type="number" value="" placeholder="Prix" readonly>
         <input name="quantity" type="number" value="" placeholder="Quantité" readonly >
         <button type="button" onclick="pluus(${index})">+</button>
         <button type="button" onclick="moins(${index})">-</button>
         <button type="button" onclick="sup(${index})">x</button>
         <br>`;
}
function afficheForm() {
    let ch = `<form name="formulaireCommande">
            <fieldset>
                <legend>Identification</legend>
                <label for="name">Nom : </label><input id="name" type="text" placeholder="Granet" required>
                <label for="firstname">Prénom : </label><input id="firstname" type="text" placeholder="Vincent" required><br>
                <label for="adress">Adresse : </label><input id="adress" type="text" required><br>
                <label for="zipcode">Code Postal : </label><input name="zipcode" id="zipcode" type="text" pattern="\\d{5}" placeholder="06000" required>
                <label for="city">Ville : </label><input id="city" type="text" placeholder="Nice" required><br>
                <label for="phone">Téléphone : </label><input id="phone" type="tel" pattern="^(\\d{2}[ ]){4}\\d{2}$|^(\\d{2}[-]){4}\\d{2}$" placeholder="04 93 48 45 48" required>
                <label for="email">E-mail : </label><input id="email" type="email" pattern="^\[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z_]+?\\.[a-zA-Z0-9]{2,4}$" placeholder="v.granet@hotmail.com" required>
            </fieldset>
            <fieldset onclick="affMontant()">
                <legend>Sélection des produits</legend>`+
                creerLigneProduit(0)+
                creerLigneProduit(1)+
                creerLigneProduit(2)+
        `</fieldset>
            <fieldset class="result">
                <legend>Résultat</legend>
                <label for="mtHT">Mt HT : </label><input id="mtHT" type="number" readonly><br>
                <label for="mtTVA">Mt TVA (19,6%) : </label><input id="mtTVA" type="number" readonly><br>
                <label for="mtTTC">Mt TTC : </label><input id="mtTTC" type="number" readonly>
            </fieldset><div class="controls">
            <button type="button" onclick="validationCmd()">Validation</button>
            <button type="reset">Reset</button>
            </div>
        </form>`;
    document.getElementsByTagName('body')[0].innerHTML = ch;
}
afficheForm();