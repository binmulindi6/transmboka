var qrcode = new QRCode("qrcode");

function makeCode (elText) {    
  qrcode.makeCode(elText.value);
}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID =  urlParams.get('id_mt')
console.log(ID)

let CardData = {}

//headers
const GetHeader = () => {
    const myHeaders = new Headers()
    myHeaders.set("Cache-Control", "no-cache")
    myHeaders.set('Access-Control-Allow-Origin', 'no-cors')
    myHeaders.set('Pragma', 'no-cache')
    myHeaders.set('Expires', '0')
    myHeaders.set('mode', 'no-cors')
    return myHeaders

  }

///Fech data

// fetch(
//     "https://webapp.e-transport.cd/api/controller.php?fetch_motard_details_for_card=&id=" + ID,
//     { headers: GetHeader }
//   )
//     .then((res) => res.json())
//     .then((res) => {
//         if(res[0].code_unique_cond){
//             CardData = res[0]
//             console.log(CardData)
//             showData(loadData(CardData))

//         }else{
//             console.log(res)
//         }

//     })
// .catch((error) => {
//       console.error('Error:', error)
// })


//btn
let btnGenerateFront = document.querySelector('#btn-generate-front');
let btnClearFront = document.querySelector('#btn-clear-front');
let btnDownload = document.querySelector('#btn-download')
// btnDownload.style.display = 'none';

//identityData holders
let plaque = document.querySelector('#plaque');
let chassis = document.querySelector('#chassis');
let marque = document.querySelector('#marque');
let poids = document.querySelector('#poids');
let capacite = document.querySelector('#capacite');
let genre = document.querySelector('#genre');
let couleur = document.querySelector('#couleur');
let proprietaire = document.querySelector('#proprietaire');
let adresse = document.querySelector('#adresse');
let idMt = document.querySelector('#id_mt');

//codes
let qrCode = document.querySelector('#qrcode')
// let codeBar = document.querySelector('#barcode')


//back
// let numero = document.querySelector('#numero-id')
let dateDelivrance = document.querySelector('#date-delivrance')
let dateExpiration = document.querySelector('#date-expiration')

const loadData = (data) => {
    
    const identityData ={
        nom: data.nom_cond + " " + data.postnom_cond,
        prenom: data.prenom_cond,
        nationalite: data.nationalite ? data.nationalite : 'Congolaise',
        profession: 'Motocycliste',
        naissance: data.lieu_naiss_cond + ', ' + data.date_naiss_cond,
        adresse: 'Q '+ data.quartier_cond + '/' + data.commune_cond + '/' + data.ville_cond,
        dateDelivrance: data.date_livraison_carte_motard,
        dateExpiration: data.date_exp_carte_motard,
        nn: data.numero_carte_elect,
        numero: data.numero_gilet,
        // img:'/assets/img/avatar.jpg',
        img:'https://webapp.e-transport.cd/upload/profileImg/'+data.photo_cond,
    }

    return identityData
}

function showData(data){
    generateData(data)
    qrcode.makeCode(data.nn);
    // btnDownload.style.display = 'block';
}



const identityData ={
    plaque: "2444AB22",
    chassis: "4875921",
    marque: 'SUZUKI/M12',
    poidsAVide: '9 T',
    capacite: '19 T',
    genre: 'CAMION',
    couleur: 'Noire',
    proprietaire: 'MUTIMULA JEACQUE',
    adresse: 'Panzi, JEAN-MIRUHO',
    idMt: 'M12345678945651'
}

generateData(identityData)

// btnGenerateFront.addEventListener('click', ()=>{
//     generateData(identityData)
//     qrcode.makeCode(identityData.nn);
//     btnDownload.style.display = 'block';
// });

// btnClearFront.addEventListener('click', ()=>{
//     clearData()
//     btnDownload.style.display = 'none';
// })


function generateData(data){

    plaque.innerHTML =  data.plaque
    chassis.innerHTML =  data.chassis
    marque.innerHTML =  data.marque
    poids.innerHTML =  data.poidsAVide
    capacite.innerHTML =  data.capacite
    genre.innerHTML =  data.genre
    couleur.innerHTML =  data.couleur
    proprietaire.innerHTML =  data.proprietaire
    adresse.innerHTML = data.adresse
    idMt.innerHTML = data.idMt

    //qr
    qrcode.makeCode(data.idMt);
}

function clearData(){
    genre.innerHTML = ""
    marque.innerHTML = ""
    plaque.innerHTML = ""
    noChasis.innerHTML = ""
    couleur.innerHTML = ""
    proprietaire.innerHTML = ""
    adresse.innerHTML = ""
    dateControle.innerHTML = ""
    garage.innerHTML = ""
    noPvExpertise.innerHTML = ""
    // qrCode.style.height = '100%';
    qrCode.src = ""

     //back
     numeroId.innerHTML = ""
     dateDelivrance.innerHTML = ""
     dateExpiration.innerHTML = ""
}


//screenshot 

// const cardFront = document.querySelector('#front')

// Define the function 
        // to screenshot the div
        function takeshot(filename = "Card") {
            let front =
                document.getElementById('card-front');
            let back =
                document.getElementById('card-back');
  
            // Use the html2canvas
            // function to take a screenshot
            // and append it
            // to the output div
            html2canvas(front).then(
                function (canvas) {
                    download(canvas,"front" + filename)
                })
            html2canvas(back).then(
                function (canvas) {
                    download(canvas,"back" + filename)
                })
        }



        /* Canvas Donwload */
function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/jpg;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }



//Qarcode generator

