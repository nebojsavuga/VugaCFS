let firebaseUrlDesc = "https://vuga-tuning-centar-default-rtdb.europe-west1.firebasedatabase.app/.json";

let requestDesc = new XMLHttpRequest();

requestDesc.onreadystatechange = function(){
    if(this.readyState == 4){
        if(this.status == 200){

            let data = JSON.parse(requestDesc.responseText);

            
            let descText = document.getElementById("opis");
            descText.innerHTML = data["opis1"];

            let tintDesc = document.getElementById("opisZatamnjivanje");
            tintDesc.innerHTML = data["opis2"];

            let foilDesc = document.getElementById("opisPresvlacenje");
            foilDesc.innerHTML = data["opis3"];

            let tuningDesc = document.getElementById("opisUgradnja");
            tuningDesc.innerHTML = data["opis4"];

        }else{
            console.log("Status error");
        }
    }
}


requestDesc.open('GET', firebaseUrlDesc);
requestDesc.send();