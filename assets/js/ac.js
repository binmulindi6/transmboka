let btnDownload = document.querySelector("#btn-download");
btnDownload.style.display = "none";

let qrCode = document.querySelector("#qrcode");
let codeBar = document.querySelector("#barcode");

let qrCodeValue = document.querySelector("#qrcode-value");
let bodeBarValue = document.querySelector("#codebar-value");

var qrcode = new QRCode("qrcode");

function makeCode(elText) {
  qrcode.makeCode(elText.value);
}

document.addEventListener("DOMContentLoaded", () => {
  if (qrCode && qrcode && qrCodeValue) {
    qrcode.makeCode(qrCodeValue.value);
    codeBar &&
      JsBarcode("#barcode", "tshopo.etax.cd", {
        format: "CODE128",
        lineColor: "#000",
        fontSize: "50",
        width: 9,
        height: 100,
        displayValue: false,
      });
    btnDownload.style.display = "inline";
    qrCode.style.height = "100%";
    // qrCode.src = data.qrCode;
  }
});

// btnGenerateFront &&
//   btnGenerateFront.addEventListener("click", () => {
//     generateData(identityData);
//     qrcode.makeCode(identityData.code_unique_ac);
//     JsBarcode("#barcode", "tshopo.etax.cd", {
//       format: "CODE128",
//       lineColor: "#000",
//       fontSize: "50",
//       width: 9,
//       height: 100,
//       displayValue: false,
//     });
//     btnDownload.style.display = "inline";
//   });

function generateData(data) {
  //back
  codeBar && (codeBar.jsbarcodeValue = data.numeroId);
  // console.log(codeBar)
  dateDelivrance.innerHTML = ": " + new Date().toDateString("fr-FR");
  // dateExpiration.innerHTML = ": " + data.dateExpiration;

  document.querySelector("#code_unique_ac")?.appendChild(data?.code_unique_ac);

  qrCode.style.height = "100%";
  qrCode.src = data.qrCode;
  // document.getElementById('output').innerHTML = '';
}

// const cardFront = document.querySelector('#front')

// Define the function
// to screenshot the div
function takeshot() {
  let front = document.getElementById("card-front");
  let back = document.getElementById("card-back");

  // Use the html2canvas
  // function to take a screenshot
  // and append it
  // to the output div
  front &&
    html2canvas(front).then(function (canvas) {
      download(canvas, "front" + qrCodeValue?.value);
    });
  back &&
    html2canvas(back).then(function (canvas) {
      download(canvas, "back" + qrCodeValue?.value);
    });
}

/* Canvas Donwload */
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement("a"),
    e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}
