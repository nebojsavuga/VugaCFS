let firebaseUrlGallery = "https://vuga-tuning-centar-default-rtdb.europe-west1.firebasedatabase.app/Galerija/.json";

let galleryRequest = new XMLHttpRequest();
let contentOverlay = document.getElementById('contentOverlay');
let currentImage;
let navigationBar = document.getElementById("navigationBar");
galleryRequest.onreadystatechange = function(){
    if(this.readyState == 4){
        if(this.status == 200){
            let gallery = JSON.parse(galleryRequest.responseText);
        
           const typesOfServices = new Array();
           const namesOfServices = new Array();
           const images = new Array();
           const typesSet = new Set();

           let serviceChoices = document.getElementById("serviceChoice");

            for(let work in gallery){
                typesOfServices.push(gallery[work]["Tip"]);
                namesOfServices.push(gallery[work]["Naziv_Rada"]);
                images.push(gallery[work]["Slike_Rada"]);
                    
                if(!typesSet.has(gallery[work]["Tip"])){
                        // kreiranje i dodavanje optionsa
                        typesSet.add(gallery[work]["Tip"]);
                        let newOption = new Option(gallery[work]["Tip"], gallery[work]["Tip"]);
                        serviceChoices.add(newOption,undefined);
                }
            }
            let picturesDiv = document.getElementById("slikeGalerija");
            createGallery(typesOfServices[0], picturesDiv, typesOfServices, namesOfServices, images);

           

            serviceChoices.addEventListener('change', function(){
                let selectedValue = serviceChoices.value;
                // bice Zatamnjivanje, Presvlacenje..
                deleteGallery(picturesDiv);
                
                createGallery(selectedValue, picturesDiv, typesOfServices, namesOfServices, images);

            });

        }else{
            console.log("Status error");
        }
    }
}

function createGallery(selectedValue, parentElement, listOfTypes, listOfDesc, listOfPicture){

    for(let i = 0;i<listOfTypes.length;i++){

        if(listOfTypes[i] == selectedValue){
            let imageContainer = document.createElement('div');
            imageContainer.classList.add('imageContainer');
            
            
            let image = document.createElement('img');
            image.classList.add('imgStyle');


            image.src = listOfPicture[i];
            
            image.alt = listOfDesc[i];
            imageContainer.setAttribute("data-imageURL", image.src);
			imageContainer.setAttribute("data-imageDescription", image.alt);
            imageContainer.addEventListener('click', function(e){
                if (window.matchMedia("(min-width: 850px)").matches) {
                    e.stopPropagation();
                    currentImage = this;
                    let imagePlaceholer = document.getElementById('imagePlaceholder');
                    imagePlaceholder.setAttribute("src", currentImage.getAttribute('data-imageURL'));
                    let titlePlaceholder = document.getElementById('titlePlaceholder');
                    titlePlaceholder.innerText = currentImage.getAttribute('data-imageDescription');
                    contentOverlay.style.display='block';
                    navigation = document.getElementById('navigationBar');
                    navigation.style.display = 'none';
                }
            });
            let overlayDiv = document.createElement('div');
            overlayDiv.classList.add('overlay');
            
            let imgDesc = document.createElement('div');
        
            imgDesc.classList.add('text');
        
            imgDesc.innerHTML = listOfDesc[i];

            overlayDiv.appendChild(imgDesc);


            imageContainer.appendChild(image);
            imageContainer.appendChild(overlayDiv);
            imageContainer.addEventListener('click', function(){
                
            });
            parentElement.appendChild(imageContainer);

            

        }
        
    }

}

function deleteGallery(picDiv){
    while (picDiv.firstChild) {
        picDiv.removeChild(picDiv.firstChild);
    }
}
galleryRequest.open('GET', firebaseUrlGallery);
galleryRequest.send();

document.body.addEventListener('click', function(e){
    contentOverlay.style.display = 'none';
    navigationBar.style.display = 'initial';

});
contentOverlay.addEventListener('click', function(e){
    e.stopPropagation();
});

let leftArrow = document.getElementById("leftArrow");
leftArrow.addEventListener('click', function(e){
    
	listajSliku('levo');
});
let rightArrow = document.getElementById("rightArrow");
rightArrow.addEventListener('click', function(e){
	e.stopPropagation();
	listajSliku('desno');
});


function prikaziOverlaySliku(){
	let imagePlaceholer = document.getElementById('imagePlaceholder');
	imagePlaceholder.setAttribute("src", currentImage.getAttribute('data-imageURL'));
	let titlePlaceholder = document.getElementById('titlePlaceholder');
	titlePlaceholder.innerText = currentImage.getAttribute('data-imageDescription');
}
function listajSliku(smer){
	let next = currentImage.nextElementSibling;
	if(smer=='levo'){
		next = currentImage.previousElementSibling;
	}
	if(next!==null){
		currentImage = next;
		prikaziOverlaySliku();
	}
}

