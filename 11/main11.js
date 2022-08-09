var quantStorage = "quantity11";
var resultStorage = "results11";
var aliasStorage = "alias";

var price = 25;
//var tel = "5213317816346";
//var suspIndex = 1;
var nPartidos = 11;

var quantity = localStorage.getItem(quantStorage);
var name = localStorage.getItem(aliasStorage);
var combinations = false;
var aux;
var id = 0;
var touchIcon = true;

var res = Array(nPartidos).fill("_");

function start(){
    recovername();
    if (localStorage.getItem("tutorial")){
        //document.getElementById("touchIconDiv").style.color = "#00000000";
        //document.getElementById("touchIconDiv2").style.color = "#00000000";
    }
    for (var w = 0; w<suspIndex.length; w++){
        if (suspIndex[w]<=res.length)
            res[suspIndex[w]] = 'X';
    }
    var lista = document.getElementById("lista");
    var container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    if (quantity)
        document.querySelector('#botonenviar span').textContent = quantity;
    var results = localStorage.getItem(resultStorage);
    if (results){
        results = results.split("*");
        for (var i = 0; i < quantity; i++){
            if (results[i] && results[i] != undefined){

                var fila = lista.insertRow(i);

                //Resultados
                if (results[i].split("\xa0\xa0")[0][0]!="L" && results[i].split("\xa0\xa0")[0][0]!="E" && results[i].split("\xa0\xa0")[0][0]!="V")
                    results[i] = results[i].slice(1);

                for (var j =0; j < nPartidos; j++) {
                    cell1 = fila.insertCell(j)
                    if (suspIndex.includes(j))
                        cell1.innerHTML += 'X';
                    else
                    cell1.innerHTML += results[i].split("\xa0\xa0")[j];
                    cell1.style.width = "6.3%";
                    if (results[i].split("\xa0\xa0")[j].length == 2)
                        cell1.style.fontSize = "small";
                    if (results[i].split("\xa0\xa0")[j].length == 3)
                        cell1.style.fontSize = "x-small";
                }

                //Nombre
                var cell2 = fila.insertCell(nPartidos);
                cell2.innerHTML += results[i].split("\xa0\xa0")[nPartidos];
                cell2.style.fontSize = "small";
                cell2.style.overflow = "hidden";
                cell2.style.overflowY = "hidden";
                cell2.style.border = "none";
               //cell2.style.fontWeight = 'bold';
                cell2.className = "cellname";
                cell2.scrollTo(80,0);

                if(results[i].split("\xa0\xa0")[nPartidos].length > 15)
                    cell2.style.fontSize = "xx-small";
                else if(results[i].split("\xa0\xa0")[nPartidos].length > 11)
                    cell2.style.fontSize = "x-small";

                //Boton borrar
                var cell3 = fila.insertCell(nPartidos+1);
                cell3.innerHTML += '<ion-icon name="close-circle" class="deleteIcon"></ion-icon>';
                cell3.style.width = "6.3%";
                cell3.id = "x" + i;
                cell3.className = "deleter"
                cell3.addEventListener('click', function(){remove(this);  this.replaceWith(this.cloneNode(true));});
            } 
            else
                break;
        }
        id = i;
    document.getElementById("botonenviar").style.filter = "none";
    document.getElementById("total").innerHTML = "Total: $" + quantity*price +"\n";
    }
    else{
        document.getElementById("botonenviar").style.filter = "grayscale(1)";
    }
}

function updatelista(modo){

    var lista = document.getElementById("lista");
    var lastIndex = lista.getElementsByTagName("tr").length;

    if (modo == 1){ //Agregar
        if (aux == undefined)
            aux=0;
        
        var fila = lista.insertRow(lastIndex);

        for (var j =0; j < nPartidos; j++) {
            cell1 = fila.insertCell(j)
            cell1.innerHTML += res[j];
            cell1.style.width = "7%";
            if (res[j].length == 2)
                cell1.style.fontSize = "small";
            if (res[j].length == 3)
                cell1.style.fontSize = "x-small";
        }

        if (aux>1){
            var cellname = fila.insertCell(nPartidos);
            cellname.innerHTML += name + " (" + aux + ")";}
        else{
            var cellname = fila.insertCell(nPartidos);
            cellname.innerHTML += name;}

        cellname.style.fontSize = "small";
        cellname.style.overflow = "hidden";
        cellname.style.overflowY = "hidden";
        cellname.className = "cellname";
        cellname.scrollTo(80,0);

        if(name.length > 15)
            cellname.style.fontSize = "xx-small";
        else if(name.length > nPartidos)
            cellname.style.fontSize = "x-small";

        var cell3 = fila.insertCell(nPartidos+1);
        cell3.innerHTML += '<ion-icon name="close-circle" class="deleteIcon"></ion-icon>';
        cell3.style.width = "6.3%";
        cell3.id = "x" + id;
        cell3.className = "deleter";
        cell3.addEventListener('click', function(){remove(this); this.replaceWith(this.cloneNode(true));});
        id++;
        aux = 1;
    }
    else if (modo == 2){ //Eliminar
        id = 0;
        deleters = lista.getElementsByClassName("deleter");
        for (var i = 0; i < lastIndex ;i++) {
            deleters[i].id = "x" + id;
            id++;
        }

    }
    document.getElementById("total").innerHTML = "Total: $" + quantity*price;
}

function selection(element){        //Pinta la casilla y actualiza el texto de la quiniela.

    var index = parseInt(element.id.slice(1)) - 1;
    if (suspIndex.includes(index)) return;
    var container = document.getElementById("text");
    if (element.className != "opcion-active"){
        if (!combinations){
            validation(element);
            res[index] = element.id.slice(0,1);
            }
        else{
            res[index] += element.id.slice(0,1);
            res[index] = res[index].split('_').join('');
        }
        element.className = "opcion-active";
    }
    else{
        if(combinations){
        element.className = "opcion";
        console.log(res[index].length);
        if (res[index] != "_" && res[index].length>1)
            res[index] = res[index].split(element.id.slice(0,1)).join('');
        else    
            res[index] = "_";
        }
    }
    costoactual();
    container.innerHTML = res.join("\xa0\xa0");
    if (res.join("\xa0\xa0").length>35){
        container.className = "text-sm";
    }
    else{
        container.className = "text-lg";
    }

    //Se actualizan los iconos de ayuda
    if (touchIcon){
        touchIcon = false;
        document.getElementById("touchIconDiv").style.display = "none";
    }
    if ((!quantity || quantity == 0) && !res.includes("_"))
        document.getElementById("touchIconDiv2").style.display = "block";
    else
         document.getElementById("touchIconDiv2").style.display = "none";

}

function validation(element){    //Despinta todas las casillas y asigna el index con el número de la casilla seleccionada.
    var index = parseInt(element.id.slice(1));
    document.getElementById("L"+index).className = "opcion";
    document.getElementById("E"+index).className = "opcion";
    document.getElementById("V"+index).className = "opcion";
}

function number(){              //Actualiza el número del boton "Enviar"
    quantity = localStorage.getItem(quantStorage);
    if (quantity)
        localStorage.setItem(quantStorage, ++quantity);
    else{
        localStorage.setItem(quantStorage, 1);
        quantity = localStorage.getItem(quantStorage);}
    document.querySelector('#botonenviar span').textContent = quantity;
    localStorage.setItem(aliasStorage, name);

    if (quantity == "" || !quantity || quantity == 0 || quantity == "0")
        document.getElementById("imgwsp").style.filter = "grayscale(1)";
    else
        document.getElementById("botonenviar").style.filter = "none";
}

function result(){              //Actualiza el localstorage cuando se añade una nueva quiniela
    results = localStorage.getItem(resultStorage);
    name = document.getElementById("nombre").value;
    name  = name.split('*').join('');
    if (results){
        if (aux > 1)
        localStorage.setItem(resultStorage, results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" + "*");
        else
            localStorage.setItem(resultStorage, results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
    }
    else
    {
        if (aux > 1)
        localStorage.setItem(resultStorage,res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" +  "*");
        else    
            localStorage.setItem(resultStorage,res.join("\xa0\xa0") + "\xa0\xa0" + name+ "*");
    }       
}

function save(){                //Se añade la quiniela actual a la lista 
    if(id < 150){
        document.getElementById("touchIconDiv2").style.display = "none";
        localStorage.setItem("tutorial",true);
        name = document.getElementById("nombre").value;
        if (res.join("\xa0\xa0").includes("_"))
            alert("Debes llenar todos los partidos");
        else if (!name){
            alert("Debes elegir un nombre");
            document.getElementById("nombre").focus();
            return 0;}
        else{
            if (combinations)
                calculate();
            else
                number();
            result();
            updatelista(1);
            clean();}
    }
    else
        alert("Envía tus quinielas guardadas antes de agregar más");
}

function clean(){               //Boton para limpiar la quinela
    document.getElementById("touchIconDiv2").style.display = "none";
    res = Array(nPartidos).fill("_");
    for (var w = 0; w<suspIndex.length; w++){
        if (suspIndex[w]<=res.length)
            res[suspIndex[w]] = 'X';
    }
    var container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    spans = document.querySelectorAll(".quiniela span");
    for (var i=0; i<nPartidos*3;i++)
        spans[i].className = "opcion";
    document.getElementById("costo").innerHTML = "Costo: $0";
    document.getElementById("numquinielas").innerHTML = "0 Quiniela(s)";
    container.className = "text-lg";
}

//UPDATElista

function recovername(){
    name = localStorage.getItem(aliasStorage);
    if (name !=  null && name !="null")
        document.getElementById("nombre").value = name;
}

function clearname(){
    document.getElementById("nombre").value = "";
}

function allowcombination(){
    if (!combinations) 
    {
        combinations = true;
        document.getElementById("checkcombinaciones").className = "boton allowcomb-active"
    }
    else
    {
        combinations= false;
        document.getElementById("checkcombinaciones").className = "boton allowcomb"
        clean();
    }
}

function calculate(){
    aux = 1;
    for (var i=0;i<nPartidos;i++){
        aux*= res[i].length;
    }
    quantity = localStorage.getItem(quantStorage);
    if (quantity){
        localStorage.setItem(quantStorage, parseInt(quantity)+aux);
        quantity = localStorage.getItem(quantStorage);}
    else{
        localStorage.setItem(quantStorage, aux);
        quantity = localStorage.getItem(quantStorage);}
    document.querySelector('#botonenviar span').textContent = quantity;
    if (quantity == "" || !quantity || quantity == 0 || quantity == "0")
        document.getElementById("imgwsp").style.filter = "grayscale(1)";
    else
        document.getElementById("botonenviar").style.filter = "none";
    localStorage.setItem(aliasStorage, name);
}

function random(){
    clean();

    if (touchIcon){
        touchIcon = false;
        document.getElementById("touchIconDiv").style.display = "none";
    }
    if (!quantity || quantity == 0)
        document.getElementById("touchIconDiv2").style.display = "block";

    var container = document.getElementById("text");
    var partidos = document.getElementsByClassName("partido");
    for (var i = 0; i < nPartidos; i++){
        if(suspIndex.includes(i)) continue;
        var r = getRandomInt(0,2);
        partidos[i].getElementsByTagName("span")[r].className = "opcion-active";
        res[i] = ["L","E","V"][r];
        }
    container.innerHTML = res.join("\xa0\xa0");
    costoactual();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function costoactual(){
    if (true){
        var aux2 = 1;
        for (var i=0;i<nPartidos;i++){
             aux2*= res[i].length;
        }
        document.getElementById("costo").innerHTML = "Costo: $" + aux2*price;
        document.getElementById("numquinielas").innerHTML = aux2 + " Quiniela(s)";
    }
}

function remove(e){
    lista = document.getElementById("lista");
    eindex = e.id.slice(1);
    tr = lista.getElementsByTagName("tr")[eindex];

    lista.deleteRow(eindex);

    results = localStorage.getItem(resultStorage);
    results = results.split("*");

    removing = results[eindex].split("\xa0\xa0");
    if (removing[0][0]!="L" && removing[0][0]!="E" && removing[0][0]!="V")
        removing[0] = removing[0].slice(1);
    var aux3 = 1;
    for (var i=0;i<nPartidos;i++)
        aux3*= removing[i].length;
    quantity -= aux3;
    localStorage.setItem(quantStorage,quantity);
    results.splice(eindex,1);
    results = results.join("*");
    localStorage.setItem(resultStorage,results);

    document.querySelector('#botonenviar span').textContent = quantity;
    document.getElementById("total").innerHTML = "Total: $" + quantity*price +"\n";

    if (!quantity){
        document.getElementById("botonenviar").style.filter = "grayscale(1)";
    }

    if ((!quantity || quantity == 0) && !res.includes("_"))
        document.getElementById("touchIconDiv2").style.display = "block";
    else
         document.getElementById("touchIconDiv2").style.display = "none";

    updatelista(2);

}

function removeLastLine(){
    if(resultsx.lastIndexOf("\n")>0) {
        return resultsx.substring(0, resultsx.lastIndexOf("\n"));
    } else {
        return resultsx;
    }
}

function deleteall(){
    if(confirm("Se borrará todo"))
        {localStorage.setItem("quantity","");
        localStorage.setItem("results","");
        localStorage.setItem("tutorial","");
        localStorage.setItem(quantStorage,"");
        localStorage.setItem(resultStorage,"");
        location.reload();}
}

function send(){                //Envia la quiniela al whatsapp 
    if (!quantity || quantity < 1){
        //save();
        alert("La lista está vacía\r\nPresiona [AGREGAR] para añadir una quiniela");
        document.getElementById("touchIconDiv2").style.display = "block";
    }
    if (quantity > 0){
    var whatsapptext = res.join("%20%20")
    whatsapptext = encodeURI(localStorage.getItem(resultStorage));
    whatsapptext = whatsapptext.split('*').join('%0D').replace(/#/g,"");
    window.location.href = "https://wa.me/"+tel+"?text="+whatsapptext;}
}

window.addEventListener("load",start,false);