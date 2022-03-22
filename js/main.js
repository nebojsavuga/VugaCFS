let firebaseUrl = "https://vuga-tuning-centar-default-rtdb.europe-west1.firebasedatabase.app/Cenovnik/.json";

let request = new XMLHttpRequest();

request.onreadystatechange = function(){
    if(this.readyState == 4){
        if(this.status == 200){
            
            let services = JSON.parse(request.responseText)
            const typesSet = new Set();

            const typesOfServices = new Array();
            const namesOfServices = new Array();
            const costsOfServices = new Array();
            let typesOfServicesChoiceDiv = document.getElementById("vrsteUslugeIzbor");
            let newButtons = new Array();

            let pricingDiv = document.getElementById("pricing");
            let tableDiv = document.getElementById("tableDiv");

            // petlja za ucitavanje elemenata iz dobijenog json objekta i njihovo stavljanje u odredjene nizove
            let  u = 0
            for(let service in services){
                typesOfServices.push(services[service]["Tip_Usluge"]);
                namesOfServices.push(services[service]["Naziv_Usluge"]);
                costsOfServices.push(services[service]["Cena_Usluge"]);
                
                if(!typesSet.has(services[service]["Tip_Usluge"])){
                    typesSet.add(services[service]["Tip_Usluge"]);

                    let newButton = document.createElement('button');
                    newButton.innerHTML = services[service]["Tip_Usluge"];
                    newButton.classList.add('serviceButton');
                    if(u == 0){
                        newButton.style.color = "red";
                        newButton.style.border = "3px solid red";
                        var firstType = services[service]["Tip_Usluge"];
                        u = 1;
                    }
                    
                    newButtons.push(newButton);

                    typesOfServicesChoiceDiv.appendChild(newButton);
                }
            }
            createTable(typesOfServices, namesOfServices, costsOfServices, firstType, tableDiv);

            // petlja za oznacavanje selektovanog buttona
            for(let i =0;i<newButtons.length;i++){
                newButtons[i].addEventListener("mouseover", function(){
                    newButtons[i].style.color = "red";
                });
                newButtons[i].addEventListener("mouseout", function(){
                    if(newButtons[i].style.border != "3px solid red")
                        newButtons[i].style.color = "black";
                });
                
                newButtons[i].addEventListener("click", function(){

                    for(let j = 0;j<newButtons.length;j++){
                        newButtons[j].style.color = "black";
                        newButtons[j].style.border = "3px solid black";
                    }
                    newButtons[i].style.color = "red";
                    newButtons[i].style.border = "3px solid red";
                    
                    // brisanje prethodne tabele i kreiranje nove
                    deleteTable('tabela');
                    createTable(typesOfServices, namesOfServices, costsOfServices, newButtons[i].innerHTML, tableDiv);
                    
                });
                
            }
            
            
            
        }else{
            console.log("Status error");
        }
    }
}

function createTable(types, names, costs, selectedType, divToAppentTo){

    let tbl = document.createElement("table");
    tbl.setAttribute('id', 'tabela')
    // kreiranje prvog reda tabele headera i postavljanje njegovih vrednosti
    
    let tHead = document.createElement("thead");
    var firstRow = document.createElement("tr");

    var cellNameOfService = document.createElement("th");
    var cellNameText = document.createTextNode("NAZIV USLUGE");
    cellNameOfService.appendChild(cellNameText);

    var cellPriceOfService = document.createElement("th");
    var cellPriceText = document.createTextNode("CENA  (RSD)");
    cellPriceOfService.appendChild(cellPriceText);
    
    firstRow.appendChild(cellNameOfService);
    firstRow.appendChild(cellPriceOfService);
    tHead.appendChild(firstRow);

    tbl.appendChild(tHead);

    let tblBody = document.createElement("tbody");

    for(let i=0;i<types.length;i++){
        if(types[i].toLowerCase() == selectedType.toLowerCase()){
            var row = document.createElement("tr");
            var firstCell = document.createElement("td");
            var secondCell = document.createElement("td");
            var firstCellText = document.createTextNode(names[i]);
            var secondCellText =  document.createTextNode(costs[i]);
            firstCell.appendChild(firstCellText);
            secondCell.appendChild(secondCellText);
            row.appendChild(firstCell);
            row.appendChild(secondCell);

            tblBody.appendChild(row);

            // proverava koji je tip i na osnovu njega ubacuje odgovarajuce podatke u tabelu
        }
    }
    tbl.appendChild(tblBody);
    divToAppentTo.appendChild(tbl);
}

function deleteTable(tableId){
    var tableToDelete = document.getElementById(tableId);
    if(tableToDelete) tableToDelete.parentNode.removeChild(tableToDelete);
}

request.open('GET', firebaseUrl);
request.send();