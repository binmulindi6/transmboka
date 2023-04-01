//data

const territories = [
    {
        name: 'BUKAVU',
        slug: 'BK'
    },
    {
        name: 'UVIRA',
        slug: 'UV'
    },
    {
        name: 'WALUNGU',
        slug: 'WG'
    },
    {
        name: 'KAMITUGA',
        slug: 'KG'
    },
    {
        name: 'MULENGE',
        slug: 'ML'
    },
]

//vars
const root  = document.querySelector('#root')
const root2  = document.querySelector('#root2')
const inputs = document.getElementById('inputs')

inputs.innerHTML = injectInputs()

const territory = document.querySelector('#territory')
const startNumber = document.querySelector('#starter-number')
const endNumber = document.querySelector('#end-number')

const btnGenerate =  document.querySelector('#btn-generate')
const btnPrint =  document.querySelector('#btn-print')








function injectInputs(){
    let data1 = `

        <select name="territory" id="territory" required>
    `
    territories.map((terri,index) => {
        data1 += `
            <option value="`+ index +`">`+terri.name +`</option>
        `
    })

    data1 += `
        </select>
        <input type="number" placeholder="numero de depart" name="start" id="starter-number" min="1" max="99999" required>
        <input type="number" placeholder="numero de fin" name="" id="end-number" min="1" max="99999" required>
        <button type="submit" id="btn-generate" onclick={generate(event)}>Generate</button>
        <button id="btn-print" onclick="PrintIt()">print</button>
    `
    return data1
}


function generate(e){
    e.preventDefault()
    console.log(territory.value)
    if(
        territory.value.length > 0 && territory.value.length < 6  &&
        startNumber.value.length > 0 && startNumber.value.length < 6  &&
        endNumber.value.length > 0 && endNumber.value.length < 6  
    ){
        root2.innerHTML = LoopBetweenNumbers(startNumber.value, endNumber.value,territory.value)
        generateQRS(startNumber.value, endNumber.value,territory.value)
    }
}

function PrintIt(){
    inputs.style.display = 'none'

	window.print();
    inputs.style.display = 'block'
}

function generateQRS(start,end,territory){
    const x = Number(start)
    const y = Number(end)
    const ter = territories[territory].slug
    for (let index = x; index <= y; index++) {
        new QRCode(document.getElementById('qrcode'+index), ter + plassZeros(index))
    }
}

function plassZeros(number){

    let finalNumber = ''
    //1 digit
    if (number.toString().length === 1) {
        finalNumber = '0000' + number
    }

    //2 digit
    if (number.toString().length === 2) {
        finalNumber = '000' + number
    }

    //3 digit
    if (number.toString().length === 3) {
        finalNumber = '00' + number
    }

    //4 digit
    if (number.toString().length === 4) {
        finalNumber = '0' + number
    }

    //5 digit
    if (number.toString().length === 5) {
        finalNumber = number
    }
    return finalNumber

}

function inject(number,territory,id){
    return`
        <div id="card-front" class="card-container">
            <div class="card-front-header">
                <img class="icons" src="assets/img/flag.png"  alt="flag">
                <div class="card-front-titles">
                    <span class="rep">REPUBLIQUE DEMOCRATIQUE DU CONGO</span>
                    <span class="prov">PROVINCE DU SUD-KIVU</span>
                    <span class="front-min">MINISTERE DES TRANSPORTS ET VOIES DES COMMUNICATIONS</span>
                    <!-- <span class="carte">CARTE D'IDENTITE DES MOTOCYCLISTES N°<span id="numero-carte">0001</span></span> -->
                </div>
                <img class="icons" src="assets/img/armoirie.png"  alt="armoirie">
            </div>               
            <div class="joker">
                    <div class="identity">
                        <span class="territory">`+territory+`</span>
                        <span class="code">`+number+`</span>
                    </div>
                    <div class="qr-container">
                        <div class="qrcode" id="qrcode`+id+`"></div> 
                    </div>
            </div>
        </div>
    `
}

function LoopBetweenNumbers(start, end, territory){
    const x = Number(start)
    const y = Number(end)
    const ter = territories[territory].slug
    const terName = territories[territory].name
    let data = ``   
    // console.log(ter)

    for (let index = x; index <= y; index = index + 4) {
        let div = `
            <div class="root3">
        `
            for (let index2 = index; index2 < index + 4 ; index2++) {
                div += inject(ter + plassZeros(index2),terName,index2)
            }
        div +=  `
            </div>
        `
        
        data += div
    }
    return data
}