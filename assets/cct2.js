const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID =  urlParams.get('id_mt')
// const ID_GILET =  urlParams.get('id_gilet')
// console.log(ID)
// console.log(ID_GILET)


var qrcode = new QRCode("qrcode");

function makeCode (elText) {    
  qrcode.makeCode(elText.value);
}


const GetHeader = () => {
    const myHeaders = new Headers()
    // myHeaders.set('Accept', 'application/json')
    // myHeaders.set('Content-Type', 'multipart/form-data')
    myHeaders.set('Access-Control-Allow-Origin', 'no-cors')
    myHeaders.set('Cache-Control', 'no-cache')
    myHeaders.set('Pragma', 'no-cache')
    myHeaders.set('Expires', '0')
    myHeaders.set('mode', 'no-cors')

  }
  let DATA = {};

fetch(
    "https://webapp.e-transport.cd/api/controller.php?fetch_car_details_for_card=&id=" + ID,
    { headers: GetHeader }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      DATA = setData(res)
      generateData(setData(res))
      btnDownload.style.display = 'inline';
      qrcode.makeCode(setData(res).numeroId);
      // JsBarcode("#barcode", "#E_TRANS_BNM6", {
      //     format: "CODE128",
      //     lineColor: "#000",
      //     fontSize : "50",
      //     width: 9,
      //     height: 100,
      //     displayValue: false
      //   });
    })
.catch((error) => {
      console.error('Error:', error)
})


//btn
let btnGenerateFront = document.querySelector('#btn-generate-front');
let btnClearFront = document.querySelector('#btn-clear-front');
let btnDownload = document.querySelector('#btn-download')
btnDownload.style.display = 'none';

//identityData holders
let genre = document.querySelector('#genre');
let marque = document.querySelector('#marque');
let plaque = document.querySelector('#plaque');
let noChasis = document.querySelector('#no-chasis');
let couleur = document.querySelector('#couleur');
let etat = document.querySelector('#etat');
let proprietaire = document.querySelector('#proprietaire');
let adresse = document.querySelector('#adresse');
let dateControle = document.querySelector('#date-controle');
let garage = document.querySelector('#garage');
let noPvExpertise = document.querySelector('#no-pv-expertise');
let qrCode = document.querySelector('#qrcode')
let codeBar = document.querySelector('#barcode')


//back
let numeroId = document.querySelector('#numero-id')
let dateDelivrance = document.querySelector('#date-delivrance')
let dateExpiration = document.querySelector('#date-expiration')


const card ={
    genre:"JEEP / TRANS DES PERSONNES",
    marque :"SUZUKI",
    plaque :"A2564B",
    noChasis :"00586",
    couleur :"BLANCHE",
    etat: "BON",
    proprietaire :"TOMMY ABRAHAM M. ",
    adresse :"PANZI, IBANDA",
    dateControle :"01/02/2023",
    garage :" TP INDUSTRIEL",
    noPvExpertise :"00243991097363",
    numeroId: "MT5986234582548",
    dateDelivrance:  "02/02/2023",
    dateExpiration : "01/02/2024"
}
const identityData ={
    genre:"JEEP / TRANS DES PERSONNES",
    marque :"SUZUKI",
    plaque :"A2564B",
    noChasis :"00586",
    couleur :"BLANCHE",
    etat: "BON",
    proprietaire :"TOMMY ABRAHAM M. ",
    adresse :"PANZI, IBANDA",
    dateControle :"01/02/2023",
    garage :" TP INDUSTRIEL",
    noPvExpertise :"00243991097363",
    numeroId: "MT5986234582548",
    dateDelivrance:  "02/02/2023",
    dateExpiration : "01/02/2024"
}

//handeler

// JsBarcode(".barcode").init();
// JsBarcode('#barcode','154245454').init();


// btnGenerateFront && btnGenerateFront.addEventListener('click', ()=>{
//   console.log(100)
//     generateData(identityData)
//     qrcode.makeCode(identityData.numeroId);
//     JsBarcode("#barcode", "#BINMULINDI6", {
//         format: "CODE128",
//         lineColor: "#000",
//         fontSize : "50",
//         width: 9,
//         height: 100,
//         displayValue: false
//       });
//     btnDownload.style.display = 'inline';
// });

// btnClearFront.addEventListener('click', ()=>{
//     clearData()
//     btnDownload.style.display = 'none';
// })

function setData(data){
  const fetchedData = new Object ()
    //car
    fetchedData.genre= data.car.genre + " / " + data.car.type_mt 
    fetchedData.marque = data.car.marque_modele_mt
    fetchedData.plaque = data.car.num_plaque_mt
    fetchedData.noChasis = data.car.num_chassis_mt
    fetchedData.couleur = data.car.couleur_mt
    
    //owner
    fetchedData.proprietaire =  data.owner.nom_cond + " " + data.owner.prenom_cond
    fetchedData.adresse =  data.owner.commune_cond + "/" + data.owner.quartier_cond
    
    //docs
    data.docs.forEach(doc => {
        if (doc.nom_document === 'CCT') {
          fetchedData.dateControle = doc.date_controle_document
          fetchedData.garage = doc.nom_garage
          fetchedData.noPvExpertise = doc.num_pv_expertise_document
          fetchedData.etat = doc.etat_vehicule
          fetchedData.dateDelivrance=  spliteDate(doc.date_controle_document)
          fetchedData.dateExpiration =  spliteDate(doc.date_exp_doc)
        }
    });
    //docs
    fetchedData.numeroId=  data.car.code_unique_mt
    



return fetchedData;
}

function generateData(data){

    //back
    // codeBar.jsbarcodeValue = "@BIMMULINDI6"
    // console.log(data)
    dateDelivrance.innerHTML = ": " + data.dateDelivrance
    dateExpiration.innerHTML = ": " + data.dateExpiration

    genre.innerHTML = " : " + data.genre
    marque.innerHTML = " : " + data.marque
    plaque.innerHTML = " : " + data.plaque
    noChasis.innerHTML = " : " + data.noChasis
    couleur.innerHTML = " : " + data.couleur
    etat.innerHTML = " : " + data.etat
    proprietaire.innerHTML = " : " + data.proprietaire
    adresse.innerHTML = " : " + data.adresse
    dateControle.innerHTML = " : " + data.dateControle
    garage.innerHTML = " : " + data.garage
    noPvExpertise.innerHTML = " : " + data.noPvExpertise
    qrCode.style.height = '100%';
    qrCode.src = data.qrCode
    // document.getElementById('output').innerHTML = '';
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
    qrCode.style.height = '100%';
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
        function takeshot() {
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
                    download(canvas,"front" + DATA.plaque)
                })
            html2canvas(back).then(
                function (canvas) {
                    download(canvas,"back" + DATA.plaque)
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
    lnk.href = canvas.toDataURL("image/png;base64");
  
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


  const spliteDate = (date) => {
    // console.log(date)
    // return date
    const dateN = date.split('-');
    return dateN[2] + '/' + dateN[1] + '/' + dateN[0];
}
//html to image

// function takeshot(){
// //     htmlToImage.toJpeg(document.getElementById('card-front'), { quality: 0.95 })
// //   .then(function (dataUrl) {
// //     var link = document.createElement('a');
// //     link.download = 'my-image-name.jpeg';
// //     link.href = dataUrl;
// //     link.click();
// //   });

//   //png
//   htmlToImage.toPng(document.getElementById('card-front'))
//   .then(function (dataUrl) {
//     // download(dataUrl, 'my-node.png');
//     var link = document.createElement('a');
//     link.download = 'my-image-name.png';
//     link.href = dataUrl;
//     link.click();
//     console.log(dataUrl.canvasWidth)
//   });
// }


//Qarcode generator
