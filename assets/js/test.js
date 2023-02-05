const btnInject = document.querySelector('#btn-inject')

const root = document.getElementById('root')

let cardFrontData = {
    numeroId: "MT24525655625",
    docs : [
    'DOC1',
    'DOC2',
    'DOC3',
    'DOC4',

]}


btnInject.addEventListener('click', ()=>{
    root.innerHTML = injectCard(cardFrontData)
    JsBarcode("#barcode", cardFrontData.numeroId, {
        format: "CODE128",
        lineColor: "#000",
        fontSize : "50",
        width: 9,
        height: 100,
        displayValue: false
      });
})


function checkDocs(data) {
    let str = "";
    data.docs.forEach(doc => {
        str += `<li>` + doc + `</li>` 
    });
    console.log(str)
    return str
}


function injectCard(data) {
    return ` 
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
                            `+ checkDocs(data) +`
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
                        jsbarcode-value=`+ data.numeroId +`
                        jsbarcode-textmargin="0"
                        jsbarcode-fontoptions="bold">
                    </svg>-->

                </div>
            </div>
    `;
}