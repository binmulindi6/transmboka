const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID =  urlParams.get('id_mt')
console.log(ID)


const btnInject = document.querySelector('#btn-inject')


const btnsContainer = document.querySelector('#btns')
const docDispo = document.querySelector('#doc-dispo')

const frontRoot = document.getElementById('frontRoot')

function makeCode (elText) {    
  qrcode.makeCode(elText.value);
}


let SAMEDOCS = new Array();
let SEPARATEDOCS = new Array();

// console.log(product);

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
//headers
const PostHeader = () => {
    const myHeaders = new Headers()
    myHeaders.set('Accept', 'application/json')
    myHeaders.set('Content-Type', 'multipart/form-data')
    myHeaders.set('Access-Control-Allow-Origin', 'no-cors')
    myHeaders.set('Cache-Control', 'no-cache')
    myHeaders.set('Pragma', 'no-cache')
    myHeaders.set('Expires', '0')
    myHeaders.set('mode', 'no-cors')

  }

///Fech data

fetch(
    "https://webapp.e-transport.cd/api/controller.php?fetch_car_details_for_card=&id=" + ID,
    { headers: GetHeader }
  )
    .then((res) => res.json())
    .then((res) => {
    //   console.log(res)
      //chck
      if (res.docs.length > 0) {
          const data = (checkData(res))
            // console.log(data)
            manageDataSeparation(data)
            btnsContainer.innerHTML =  generateBtns()
            const showBtns = document.querySelectorAll('.show-btn')
            addActive(showBtns)
            // console.log(showBtns)
            // console.log({SAMEDOCS : SAMEDOCS})
            // console.log({SEPARATEDOCS : SEPARATEDOCS})
        } else {
            docDispo.innerHTML = `Pas de Document pour Impression`
        }

    })
.catch((error) => {
      console.error('Error:', error)
})

function addActive(nodeList) {
    nodeList.forEach(btn=>{
        btn.addEventListener('click', ()=> {
            console.log(btn)
            nodeList.forEach(btnn => {
                // btnn.classList.remove('active')
                btnn.style.backgroundColor = '#626262' 
            })
            btn.style.backgroundColor = '#2180f4' 
            // ('active')
        })
    })
}

function setPrinted(){

}



function sameDocsHandeler(index){
    clearCard()
    InjectData(SAMEDOCS[index])
}
function checkHandler(event){
    clearCard()
    InjectData(SEPARATEDOCS[event])
}


function generateBtns(){

    let buttons = ''
    if(SAMEDOCS.length > 0){
        let sameDocsNoms = ''
        SAMEDOCS.forEach((doc,index) => {
            doc.docs.forEach(doc=> {
                sameDocsNoms += doc.nom_document + ", " 
            })
            buttons += `
                <button  class='show-btn' id="btnSameDoc ` + (index + 1) +`" onClick="
                    sameDocsHandeler(`+ index +`)
                ">`+ sameDocsNoms  +` </button>
            `
            sameDocsNoms = ''
        })

    }
    
    // SAMEDOCS.docs.forEach(doc=> {
    //     nomDocs+= doc.nom_document + ", " 
    // })

    // buttons += `
    //     <button id="btnSameDoc" onClick="
    //         sameDocsHandeler()
    //     ">`+ nomDocs  +` </button>
    // `

    if(SEPARATEDOCS.length > 0){
        SEPARATEDOCS.forEach((doc,index)=>{
            buttons += `<button class='show-btn' id="btnSeparateDoc` + (index + 1) +`" onClick={checkHandler(`+index+`)}>`+ doc.docs.nom_document  +` </button>`
        })
    }

    return buttons;


}

function manageDataSeparation(data){
    console.log('here')
    if(data.docs.sameDocs.length > 0){
        data.docs.sameDocs.forEach(doc => {
            SAMEDOCS.push({
                cardIdentity: data.cardIdentity,
                docs:doc
            })
        })
    }
    if(data.docs.separateDocs.length > 0){
        data.docs.separateDocs.forEach(doc => {
            SEPARATEDOCS.push({
                cardIdentity: data.cardIdentity,
                docs:doc
            })
        })
    }
}


function checkData(data){
    //get identity
    const cardIdentity = new Object()
    //car
    cardIdentity.genre= data.car.genre
    cardIdentity.marque = data.car.marque_modele_mt
    cardIdentity.plaque = data.car.num_plaque_mt
    cardIdentity.noChasis = data.car.num_chassis_mt
    cardIdentity.couleur = data.car.couleur_mt
    
    //IDMT
    cardIdentity.numeroId=  data.car.code_unique_mt

    //owner
    cardIdentity.proprietaire =  data.owner.nom_cond + " " + data.owner.prenom_cond
    cardIdentity.adresse =  data.owner.commune_cond + "/" + data.owner.quartier_cond

    //get docs 
    let docs = new Object()
    checkDocs(data.docs)
    docs.sameDocs = checkDocs(data.docs).sameDocs
    docs.separateDocs = checkDocs(data.docs).separateDocs

    return {cardIdentity,docs}

}

function checkDocs(data){
    // console.log(docs)
    // console.log(data)
    let docs = data

    //to store docs with same enre_date
    // let sameDocs = new Array()
    let sameDocs = new Array()
    
    //to store docs with different enre_date
    let separateDocs = new Array()


    if(docs.length > 0){ 

        for (let index = 0; index < data.length; index++) {

            let doc1 = new Array()
                doc1.push(data[index])
            
                if(
                    docs.find(it=>{
                        return it.date_enreg_banq === doc1[0].date_enreg_banq && it.nom_document !== doc1[0].nom_document
                    })
                ){
                    // console.log(10)
                    let doc11 = docs.filter(it=>{
                        return it.date_enreg_banq === doc1[0].date_enreg_banq && it.nom_document !== doc1[0].nom_document
                    })
                    doc1 = doc1.concat(doc11)
                    sameDocs.push(doc1)
                    // console.log(doc1)
                    
                    docs = docs.filter(it=>{
                        return it.date_enreg_banq !== doc1[0].date_enreg_banq
                    })
                    // console.log(docs)
                }

                // docs.forEach((doc)=>{
                //     // console.log(docs[index])
                //     if (doc.nom_document !== doc1[0].nom_document && doc.date_enreg_banq === doc1[0].date_enreg_banq) {
                //         doc1.push(doc)
                //     }
                // })
                // // console.log(doc1)
                // doc1.length > 0 && sameDocs.push(doc1)
            // }

            // if(sameDocs.length > 0) { 
            //     docs = docs.filter(it=>{
            //         // console.log(it.date_enreg_banq)
            //         // console.log(sameDocs[sameDocs.length - 1][0].date_enreg_banq)
            //         return it.date_enreg_banq !== sameDocs[sameDocs.length - 1][0].date_enreg_banq
            //     })
            //     // console.log(docs)
            // }
        }
        
        // console.log(sameDocs)

        // console.log(sameDocs) 
        
        // // debugger


        // console.log('---------')
        // let docs2 = data
        // // console.log(docs2)
        //  for (let index = 0; index < data.length; index++) {
            
        //    let doc2 = data[index]
           
        //         if(
        //             !docs2.find(it=>{
        //                 return it.date_enreg_banq === doc2.date_enreg_banq && it.nom_document !== doc2.nom_document
        //             })
        //             ){
        //                 docs2 = docs2.filter(it=>{
        //                     return it.date_enreg_banq !== doc2.date_enreg_banq
        //                 })
        //                 separateDocs.push(doc2)
        //                 // console.log(doc2)
        //             }
        //             // docs2.length > 0 && separateDocs.push(docs2)
        //             // console.log(docs2)
        // }
        
        
        separateDocs = docs
        // console.log(separateDocs)
       


        




    //     let sameDocs = docs.filter((doc,index) => {
    //         if(docs[index + 1] && docs[index - 1]){
    //             return doc.date_enreg_banq === docs[index + 1].date_enreg_banq && doc.date_enreg_banq === docs[index - 1].date_enreg_banq || docs[index + 1].date_enreg_banq && doc.date_enreg_banq === docs[index - 1].date_enreg_banq
    //         }
    //         if(docs[index + 1]){
    //             return doc.date_enreg_banq === docs[index + 1].date_enreg_banq
    //         }
    //         if(docs[index - 1]){
    //             return doc.date_enreg_banq === docs[index - 1].date_enreg_banq
    //         }
    //     })
    //     let separateDocs = docs.filter((doc,index) => {
    //         if(docs[index + 1] && docs[index - 1]){
    //             return doc.date_enreg_banq !== docs[index + 1].date_enreg_banq && doc.date_enreg_banq !== docs[index - 1].date_enreg_banq 
    //         }
    //         if(docs[index + 1]){
    //             return doc.date_enreg_banq !== docs[index + 1].date_enreg_banq
    //         }
    //         if(docs[index - 1]){
    //             return doc.date_enreg_banq !== docs[index - 1].date_enreg_banq
    //         }

    //     })
    return {sameDocs, separateDocs}
    }else{

        sameDocs.push(data)
        return {sameDocs}
    }
    // return{sameDocs: [docs]}

    
}

let cardData = {
    numeroId: "MT24525655625",
    genre:": JEEP / TRANS DES PERSONNES",
    marque :": SUZUKI",
    plaque :": A2564B",
    noChasis :": 00586",
    couleur :": BLANCHE",
    proprietaire :": TOMMY ABRAHAM M. ",
    adresse :": PANZI, IBANDA",
    dateControle :'02/02/2023',
    garage :": TP INDUSTRIEL",
    noPvExpertise :": 00243991097363",
    numeroId: ": MT5986234582548",
    dateDelivrance:  ": 02/02/2023",
    dateExpiration : ": 01/02/2024",
    docs : [
        'DOC1',
        'DOC2',
        'DOC3',
        'DOC4',
    ]

}


////takeShoot

function takeshot(docs) {
    console.log(docs)
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
            download(canvas,"front " + SAMEDOCS[0].cardIdentity.proprietaire)
        })
    html2canvas(back).then(
        function (canvas) {
            download(canvas,"back " + SAMEDOCS[0].cardIdentity.proprietaire)
        })
    clearCard()
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

function InjectData(data){
    frontRoot.innerHTML = injectCardFront(data)
    backRoot.innerHTML = injectCardBack(data)
    var qrcode = new QRCode("qrcode");
    let qrCode = document.querySelector('#qrcode')
    qrcode.makeCode(data.cardIdentity.numeroId);
    qrCode.style.height = '100%';
    // qrCode.src = data.qrCode

    JsBarcode("#barcode", data.cardIdentity.numeroId, {
        format: "CODE128",
        lineColor: "#000",
        fontSize : "50",
        width: 9,
        height: 100,
        displayValue: false
      });
}

function clearCard() {
    frontRoot.innerHTML = ''
    backRoot.innerHTML = ''
}

function checkDataDocs(data) {
    
    let str = "";
    if (data.length > 0) {
        data.forEach(doc => {
            str += `<li>` + doc.nom_complet_document + `</li>` 
        });
        return str
    }
    return str += `<li>` + data.nom_complet_document + `</li>` 

    
}
function checkDates(data) {
    console.log(data)
    if (data.length > 0) {
        return {dateDelivrance: data[0].date_enreg_banq, dateExpiration: data[0].date_exp_doc}
    }
    return {dateDelivrance: data.date_enreg_banq, dateExpiration: data.date_exp_doc}
}

function checkTypeDocs(data) {
    // console.log(data)
    if (data.length > 0 ) {
        const CCT = data.find(doc => {
            return doc.nom_document === 'CCT'
        })
        if(CCT){
            return{state: true, garage:CCT.nom_garage, dateControle:CCT.date_controle_document, noPvExpertise:CCT.num_pv_expertise_document, }
        }else{
            return{state:false}
        }
    }else{
        if(data.nom_document === 'CCT'){
            const CCT = data
            return{state: true, garage:CCT.nom_garage, dateControle:CCT.date_controle_document, noPvExpertise:CCT.num_pv_expertise_document, }
        }else{
            return{state:false}
        }
    }
    return{state:false}
}


function injectCardFront(data) {
    let docIds = []
    if(data.docs.length > 0){
        data.docs.forEach(doc=>{
            docIds.push(doc.id_mt_document)
        })
        console.log(docIds)
    } else {
        docIds.push(data.docs.id_mt_document)
    }


    return ` 
    <button id="btn-download"onclick="takeshot(`+(docIds)+`)" >Download</button>
    <br>
    <div id="card-back" class="card-container">
                <div class="container header">
                    <img class="icons" src="/assets/img/flag.png"  alt="flag">
                    <div class="titles">
                        <span class="rep">REPUBLIQUE DEMOCRATIQUE DU CONGO</span>
                        <span class="prov">PROVINCE DU SUD-KIVU</span>
                        <span class="min">Ministère des Transport et Voies de Communication</span>
                    </div>
                    <img class="icons" src="/assets/img/armoirie.png"  alt="armoirie">
                </div>
                <div class="container card-body">
                    <div class="text">
                        <span>DOCUMENTS DE BORDS POUR LES VEHICULES</span>
                    <div class="list">
                        <ul>
                            `+ checkDataDocs(data.docs) +`
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="container footer">
                    <!-- <div class="dates">
                        <div class="dates-content"><span>Date de délivrance :</span> <span id="date-delivrance"></span></div>
                        <div class="dates-content">
                            <span>Date d'éxpiration :</span> <span id="date-expiration"></span>
                        </div>
                    </div> -->
                    <svg id="barcode" class="barcode"></svg>
                    
                    <!--<svg id="barcode" class="barcode"
                        jsbarcode-fontsize="40"
                        jsbarcode-height="100"
                        jsbarcode-width="10"
                        jsbarcode-format="upc"
                        jsbarcode-value=`+ data.cardIdentity.numeroId +`
                        jsbarcode-textmargin="0"
                        jsbarcode-fontoptions="bold">
                    </svg>-->

                </div>
            </div>
    `;
}

function injectCardBack(data){
    let identity = `
                <div id="card-front" class="card-front-container">
                <div class="card-front-title">
                    <span>IDENTIFICATION DU VEHICULE</span>
                </div>                
                <div class="joker">
                    <div class="card-front-body">
                        <table class="identity" >
                            <tr class="identity-data">
                                <td class="identity-title">GENRE </td> <td id="genre" class="identity-data-content">: `+ data.cardIdentity.genre +`</tdtd>
                            </tr>
                            <tr class="identity-data">
                                <td class="identity-title">MARQUE </td> <td id="marque" class="identity-data-content">: ` + data.cardIdentity.marque+ `</td>
                            </tr>
                            <tr class="identity-data">
                                <td class="identity-title">PLAQUE </td> <td id="plaque" class="identity-data-content">: `+ data.cardIdentity.plaque +`</td>
                            </tr>
                            <tr class="identity-data">
                                <td class="identity-title">NO DE CHASIS </td> <td id="no-chasis" class="identity-data-content">: `+data.cardIdentity.noChasis+`</td>
                            </tr>
                            <tr class="identity-data">
                                <td class="identity-title">COULEUR </td> <td id="couleur" class="identity-data-content">: `+data.cardIdentity.couleur+`</td>
                            </tr>
                            <tr class="identity-data">
                                <td class="identity-title">PROPRIETAIRE </td> <td id="proprietaire" class="identity-data-content">: `+ data.cardIdentity.proprietaire+`</td>
                            </tr>
                            <tr class="identity-data">
                                <td class="identity-title">ADRESSE </td> <td id="adresse" class="identity-data-content">: `+data.cardIdentity.adresse+`</td>
                            </tr>`
    let document = ''
    if (checkTypeDocs(data.docs).state === true) {
        
        document = `
        <tr class="identity-data">
        <td class="identity-title">DATE DE CONTROLE </td> <td id="date-controle" class="identity-data-content">: `+checkTypeDocs(data.docs).dateControle+`</td>
        </tr>
        <tr class="identity-data">
        <td class="identity-title">GARAGE </td> <td id="garage" class="identity-data-content">: `+checkTypeDocs(data.docs).garage+`</td>
        </div>
        
        <tr class="identity-data">
        <td class="identity-title">No PV D'EXPERTISE </td> <td id="no-pv-expertise" class="identity-data-content">: `+checkTypeDocs(data.docs).noPvExpertise+`</td>
        </tr>`
        
    }
    let qrfield = `
                        </table>
                            <div class="qr-container">
                                <!-- <img id="qr-code" src="" alt=""> -->
                                <div id="qrcode"></div>
                            </div>
                        </div>
                        <hr id="line">
                        <table>
                            <tr class="dates-content" ><td>DATE DE DELIVRANCE </td> <td id="date-delivrance" class="identity-data-content">: `+checkDates(data.docs).dateDelivrance+`</td></tr>
                                <tr class="dates-content">
                                    <td>DATE D'EXPIRATION </td> <td id="date-expiration" class="identity-data-content">: `+checkDates(data.docs).dateExpiration+`</td>
                                </tr>
                        </table>
                    </div>
                </div>
    `

    if(checkTypeDocs(data.docs).state === true) { return identity + document + qrfield}
    return identity  + qrfield


}


function injectCardBack2(data){
    return`
    <div id="card-front" class="card-container">
    <div class="card-front-title">
        <span>IDENTIFICATION DU VEHICULE</span>
    </div>                
    <div class="joker">
        <div class="card-front-body">
            <table class="identity" >
                <tr class="identity-data">
                    <td class="identity-title">GENRE </td> <td id="genre" class="identity-data-content">`+ data.genre +`</tdtd>
                </tr>
                <tr class="identity-data">
                    <td class="identity-title">MARQUE </td> <td id="marque" class="identity-data-content">` + data.marque+ `</td>
                </tr>
                <tr class="identity-data">
                    <td class="identity-title">PLAQUE </td> <td id="plaque" class="identity-data-content">`+ data.plaque +`</td>
                </tr>
                <tr class="identity-data">
                    <td class="identity-title">NO DE CHASSIS </td> <td id="no-chasis" class="identity-data-content">`+data.noChasis+`</td>
                </tr>
                <tr class="identity-data">
                    <td class="identity-title">COULEUR </td> <td id="couleur" class="identity-data-content">`+data.couleur+`</td>
                </tr>
                <tr class="identity-data">
                    <td class="identity-title">PROPRIETAIRE </td> <td id="proprietaire" class="identity-data-content">`+ data.proprietaire+`</td>
                </tr>`
                + data.dateControle !== null && `
                    <tr class="identity-data">
                        <td class="identity-title">ADRESSE </td> <td id="adresse" class="identity-data-content">`+data.adresse+`</td>
                    </tr>
                    <tr class="identity-data">
                        <td class="identity-title">DATE DE CONTROLE </td> <td id="date-controle" class="identity-data-content"></td>
                    </tr>
                    <tr class="identity-data">
                        <td class="identity-title">GARAGE </td> <td id="garage" class="identity-data-content"></td>
                    </div>
                    
                    <tr class="identity-data">
                        <td class="identity-title">No PV D'EXPERTISE </td> <td id="no-pv-expertise" class="identity-data-content"></td>
                    </tr>`+`
            </table>
            <div class="qr-container">
                <!-- <img id="qr-code" src="" alt=""> -->
                <div id="qrcode"></div>
            </div>
        </div>
        <hr id="line">
        <table>
            <tr class="dates-content" ><td>DATE DE DELIVRANCE </td> <td id="date-delivrance" class="identity-data-content">`+data.dateDelivrance+`</td></tr>
                <tr class="dates-content">
                    <td>DATE D'EXPIRATION </td> <td id="date-expiration" class="identity-data-content">`+data.dateExpiration+`</td>
                </tr>
        </table>
        </div>
    </div>
    `

}