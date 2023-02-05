
//btn
let btnGenerateFront = document.querySelector('#btn-generate-front');
let btnClearFront = document.querySelector('#btn-clear-front');
let btnDownload = document.querySelector('#btn-download')
btnDownload.style.display = 'none';

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
let codeBar = document.querySelector('#barcode')


//back
// let numero = document.querySelector('#numero-id')
let dateDelivrance = document.querySelector('#date-delivrance')
let dateExpiration = document.querySelector('#date-expiration')


const identityData ={
    nom: 'Abraham Mulindi',
    prenom: 'Tommy',
    nationalite: 'Congolaise',
    profession: 'Motocycliste',
    naissance: 'Nyamulwangula, le 01/02/2022',
    adresse: 'Q Panzi/Ibanda/Bukavu',
    dateDelivrance: '02/02/2022',
    dateExpiration: '02/02/2022',
    nn: "225705386533",
    numero: "225",
    img:'/assets/img/avatar.jpg'
}

//handeler

// JsBarcode(".barcode").init();
// JsBarcode('#barcode','154245454').init();


btnGenerateFront.addEventListener('click', ()=>{
    generateData(identityData)
    qrcode.makeCode(identityData.nn);
    JsBarcode("#barcode", identityData.nn, {
        format: "CODE128",
        lineColor: "#000",
        fontSize : "50",
        width: 9,
        height: 100,
        displayValue: false
      });
    btnDownload.style.display = 'inline';
});

btnClearFront.addEventListener('click', ()=>{
    clearData()
    btnDownload.style.display = 'none';
})


function generateData(data){

    //back
    codeBar.jsbarcodeValue = data.numeroId
    // console.log(codeBar)
    dateDelivrance.innerHTML = ": " + data.dateDelivrance
    dateExpiration.innerHTML = ": " + data.dateExpiration

    nom.innerHTML = " : " + data.nom
    prenom.innerHTML = " : " + data.prenom
    nationalite.innerHTML = " : " + data.nationalite
    profession.innerHTML = " : " + data.profession
    naissance.innerHTML = " : " + data.naissance
    adresse.innerHTML = " : " + data.adresse
    numero.innerHTML = " : " + data.numero
    nn.innerHTML = " : " + data.nn
    avatar.src = data.img
    // garage.innerHTML = " : " + data.garage
    // noPvExpertise.innerHTML = " : " + data.noPvExpertise
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
                    download(canvas,"front" + identityData.plaque)
                })
            html2canvas(back).then(
                function (canvas) {
                    download(canvas,"back" + identityData.plaque)
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

var qrcode = new QRCode("qrcode");

function makeCode (elText) {    
  qrcode.makeCode(elText.value);
}
