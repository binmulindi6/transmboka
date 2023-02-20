const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID =  urlParams.get('id_cond')
const ID_GILET =  urlParams.get('id_gilet')
console.log(ID)
console.log(ID_GILET)

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

fetch(
    "https://webapp.e-transport.cd/api/controller.php?fetch_motard_details_for_card=&id=" + ID +"&id_gilet=" + ID_GILET,
    { headers: GetHeader }
  )
    .then((res) => res.json())
    .then((res) => {
        if(res[0].code_unique_cond){
            CardData = res[0]
            console.log(CardData)
            showData(loadData(CardData))

        }else{
            console.log(res)
        }

    })
.catch((error) => {
      console.error('Error:', error)
})


//btn
// let btnGenerateFront = document.querySelector('#btn-generate-front');
// let btnClearFront = document.querySelector('#btn-clear-front');
let btnDownload = document.querySelector('#btn-download')
// btnDownload.style.display = 'none';

//identityData holders
let nom = document.querySelector('#nom');
let prenom = document.querySelector('#prenom');
let nationalite = document.querySelector('#nationalite');
let profession = document.querySelector('#profession');
let adresse = document.querySelector('#adresse');
let numero = document.querySelector('#numero-carte');
let nn = document.querySelector('#nn');
let avatar = document.querySelector('#avatar');

//codes
let qrCode = document.querySelector('#qrcode')
// let codeBar = document.querySelector('#barcode')


//back
// let numero = document.querySelector('#numero-id')
let dateDelivrance = document.querySelector('#date-delivrance')
let dateExpiration = document.querySelector('#date-expiration')

const spliteDate = (date) => {
    
    const dateN = date.split('-')
    return dateN[2] + '/' + dateN[1] + '/' + dateN[0]
}

const loadData = (data) => {

    
    const identityData ={
        nom: data.nom_cond + " " + data.postnom_cond,
        prenom: data.prenom_cond,
        nationalite: data.nationalite ? data.nationalite : 'Congolaise',
        profession: 'Motocycliste',
        naissance: data.lieu_naiss_cond + ', ' + spliteDate(data.date_naiss_cond),
        adresse: 'Q '+ data.quartier_cond + '/' + data.commune_cond + '/' + data.ville_cond,
        dateDelivrance: spliteDate(data.date_livraison_carte_motard),
        dateExpiration: spliteDate(data.date_exp_carte_motard),
        nn: data.numero_carte_elect,
        numero: data.numero_gilet,
        // img:'/assets/img/avatar.jpg',
        img:'../../../../upload/profileImg/'+data.photo_cond,
    }

    return identityData
}

function showData(data){
    generateData(data)
    qrcode.makeCode(data.nn);
    btnDownload.style.display = 'block';
}

//handeler

// JsBarcode(".barcode").init();
// JsBarcode('#barcode','154245454').init();



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

    //back
    // codeBar.jsbarcodeValue = data.numeroId
    // console.log(codeBar)
    dateDelivrance.innerHTML = data.dateDelivrance
    dateExpiration.innerHTML = data.dateExpiration

    nom.innerHTML =  data.nom
    prenom.innerHTML =  data.prenom
    nationalite.innerHTML =  data.nationalite
    profession.innerHTML =  data.profession
    naissance.innerHTML =  data.naissance
    adresse.innerHTML =  data.adresse
    numero.innerHTML =  data.numero
    nn.innerHTML =  data.nn
    avatar.src = data.img
    // garage.innerHTML =  data.garage
    // noPvExpertise.innerHTML =  data.noPvExpertise
    // qrCode.style.height = '100%';
    // qrCode.src = data.qrCode
    // // document.getElementById('output').innerHTML = '';
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
            // let back =
            //     document.getElementById('card-back');
  
            // Use the html2canvas
            // function to take a screenshot
            // and append it
            // to the output div
            html2canvas(front).then(
                function (canvas) {
                    download(canvas,CardData.nom_cond + "_" + CardData.postnom_cond)
                })
            // html2canvas(back).then(
            //     function (canvas) {
            //         download(canvas,"back" + filename)
            //     })
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

var qrcode = new QRCode("qrcode");

function makeCode (elText) {    
  qrcode.makeCode(elText.value);
}
