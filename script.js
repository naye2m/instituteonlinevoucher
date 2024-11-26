var presentCustomer;
var t1, t2, t3, t4, pCust;


function ValidateEmail(inp) {
    return inp;
    return inp.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? inp : ValidateEmail(confirm("wanna give a valid mail?") ? prompt("Please enter a valid email address", "institute.bd+customer@gmail.com") : "institute.bd+customer@gmail.com");
}

function Customer(name, emailAdd = "", address = "", buyingFor = 'Customer', invoiceNumber = "", phone = 0, _discountAmount = 0) {
    //chenges in this constructor should be also modified in server side //spreadsheet//DB//codescript//

    this.name = name.toUpperCase();
    this.address = address.toUpperCase();
    this.emailAdd = ValidateEmail(emailAdd).toLowerCase();
    this.fetchingFormData = '';
    this.time = new Date();
    // this.items = new Array();
    this.items = {};
    this.itemCount = Object.keys(this.items).length;
    this.buyingFor = ""; // institutt?self?
    this.invoiceNumber = invoiceNumber ? this.invoiceNumber : ""; //code here ''this
    this._discountAmount = _discountAmount;
    this.buyingFor = buyingFor; //
    this.grandTotal = 0;
    this.subtotal = 0;
    // this.qrjs = null; 
    this.phone = phone;
    nameEle[0].innerHTML = `<p class="s14" style="padding-top: 11pt;padding-left: 16pt;text-indent: 0pt;text-align: left;">${this.buyingFor} : <span class="h4">${this.name}, ${this.address}</span><span class="s15">.</span></p>`;
    /////////////////////////////////////////////////////////////////////////////
    // this.totalAmount = items.forEach(item => {
    //     let tempAmount += item[3];

    // }); //need here
    //todo this._discountAmount = _discountAmount ? typeof _discountAmount === 'number' ? this.totalAmount -= _discountAmount: 2: "No discount." ; //need here

    //  this.discountAmount = x;
    //  const age = 17;
    // const age = 17;
    // console.log(
    //     age < 17 
    //         ? "You cannot drive."
    //         : age == 17
    //             ? "Go to driving school." 
    //             : "You can drive."
    // );
    // final



    // basic function 
    presentCustomer = this;


    // return true;
}
//??test console.log(document.getElementsByClassName("v-secondary")[0]) ////////////////////////////////
// document.getElementsByClassName("v-secondary")[1].innerHTML = "no text selected";
// document.getElementsByClassName("v-secondary")[1].innerHTML = document.getElementsByClassName("v-secondary")[0].innerHTML;
var cusTable0 = document.getElementsByTagName("table")[0];
var cusTable1 = document.getElementsByTagName("table")[1];
var cusTable0Body = cusTable0.tBodies[0]; /////////////////////////////////////////////
var cusTableVisu = document.getElementById("visualizerTbl"); /////////////////////////////////////////////
// var cusTableBodyVisu = cusTableVisu.tBodies[0]; /////////////////////////////////////////////
var nameEle = document.getElementsByClassName('nameDiv');


Customer.prototype.createTbl = function (para1, para2) {

    this.subtotal = 0;
    cusTable0Body.innerHTML = '';
    // cusTableBodyVisu.innerHTML = '';
    let tmpCount = 0;
    for (let itemNam in this.items) {
        let tmpRow = cusTable0Body.insertRow();
        // let tmpRowVisu = cusTableBodyVisu.insertRow();
        item = this.items[itemNam];
        tmpCount++;
        tmpRow.innerHTML = `<tr class="_cc${itemNam}"> 
        <td>${tmpCount}</td>
        <td class="discription">${item[1]}<br><span class="pdis silent x-small disc">${item[2]}</span></td>
        <td>${item[4]}</td>
        <td class="warranty">${item[5]}</td>
        <td class="total">${item[6]}/-</td>
        </tr>`;
        // tmpRowVisu.innerHTML = `<tr class="_cc${itemNam}">
        // <td class="name">${item[1]}</td>
        // <td class="dis">${item[2]}</td>
        // <td class="war">${item[5]}</td>
        // <td class="itemUnitPrice">${item[3]}</td>
        // <td class="qty">${item[4]}</td>
        // <td class="total">${item[6]}</td>
        // <td class="action"><button onclick="console.log(presentCustomer.deleteItem('${item[1]}'));">Remove</button></td>
        // </tr>`;
        // cusTable0Body.insertRow(tmpRow);
        this.subtotal += item[6];
        // console.log(item);//xheking item is ok
    }
    tmpCount = 0;
    this.grandTotal = this.subtotal - this._discountAmount;
    // cusTable0Body.innerHTML = _val1;
    cusTable0.tFoot.innerHTML = `<tr>
    <td class="QRSTD" id="td34" colspan="3" rowspan="4">
              <div class="QRScon" id="qrcode-container">
                <canvas class="QRS" id="qrcode" class="qrcode"></canvas>
              </div>
            </td>
    <td>subtotal</td>
    <td>${this.subtotal}</td>
    </tr>
    <tr>
    <td>${this._discountAmount != 0 ? "less" : "No less"}</td> 
                                <td>${this._discountAmount == 0 ? "-" : this._discountAmount}</td>
                                </tr>
                                <tr>
                                <td>Grand Total</td>
                                <td class="double-underline">${this.grandTotal}</td>
                                </tr>`;
    // cusTable1.innerHTML = cusTable0.innerHTML;
    // document.getElementById("visTot").innerText = this.grandTotal;
};

Customer.prototype.deleteItem = function (paraItem) {

    if (this.items[paraItem]) {
        // this.items.splice([paraItem]);
        delete this.items[paraItem];
        this.itemCount = Object.keys(this.items).length;
        console.log(this.items[paraItem]);
        this.final();
        return paraItem + " deleted";
    } else {
        alert(paraItem + "is not a valid");
        return paraItem + " isn't available";
    }

}
// Customer.prototype.deleteFromBtn = function(btn:HTMLElement) {
Customer.prototype.deleteFromBtn = function (btn) {
    console.log(btn);
    let tmp = [...btn.classList];
    this.deleteItem(tmp[0].substr(3));
}
Customer.prototype.final = function () {
    let pdis = document.getElementsByClassName("pdis");
    // for (let i = 0; i = pdis.length; i++) {
    //     pdis[i].classList.add("hide");
    // }

    this.createTbl();
    if (this.itemCount > 7) {
        for (let i = 0; i < pdis.length; i++) {
            pdis[i].classList.add("hide");
            // pdis[i].classList.add("hide");
        }
        // console.log("a");
    } else {
        // console.log("b", this.itemCount);
        for (let i = 0; i < pdis.length; i++) {
            pdis[i].classList.remove("hide");
            // pdis[i].classList.add("hide");
        }
    }
    // document.getElementsByClassName("v-secondary")[1].innerHTML = document.getElementsByClassName("v-secondary")[0].innerHTML;

    // ** test t1 start ////////////////////
    // let tmpfetchingFormDat = {
    //     ...this
    // };
    // // tmpfetchingFormDat.items.forEach(function (val) {
    // //     val.pop()
    // // });
    // delete tmpfetchingFormDat.fetchingFormData;
    // // // //??test console.log(tmpfetchingFormDat);
    // //** test t1 end * ///////////////////////////
    // let tmpfetchingFormDat = {
    //     ...this
    // };
    // tmpfetchingFormDat.options = "var='beta'&";
    // tmpfetchingFormDat.GSoptions = ["Logger.log('ok')", { op: "scopes" }];
    // delete tmpfetchingFormDat.fetchingFormData;
    // tmpfetchingFormDat.items = Object.values(presentCustomer.items);
    // tmpfetchingFormDat.options = [true, "v1", "0401300723","NAY"];
    // // console.log(Object.keys(tmpfetchingFormDat));
    // tmpfetchingFormDat = Object.values(tmpfetchingFormDat);
    // //??["name","address","emailAdd","time","items","itemCount","buyingFor","invoiceNumber","_discountAmount","grandTotal","subtotal","phone","options"]
    // //** test t1 block end * ///////////////////////////
    // // //`todo modifier need here
    // // /////////////////////////////////////////////////////
    // // let tmp = { ...tmpfetchingFormDat };
    // // t2 = [];
    // // for (let key in tmp) {
    // //     t2.push(tmp[key]);
    // // }
    // // //??testconsole.log("aa", tmpfetchingFormDat);
    // // //!!  on server side
    // // tmpfetchingFormDat = {};
    // //  t1 = ['name','address','emailAdd',  'time', 'items', 'itemCount', 'buyingFor', 'invoiceNumber', '_discountAmount', 'grandTotal', 'subtotal', 'phone']
    // // t1 = ['name', 'address', 'emailAdd', 'time', 'items', 'itemCount', 'buyingFor', 'invoiceNumber', '_discountAmount', 'grandTotal', 'subtotal', 'phone', 'options', 'GSoptions']
    // // var j = [... tmpfetchingFormDat];
    // // //** for (let index = 0; index < t1.length; index++) {
    // // //**        tmpfetchingFormDat[t1[index]] = j[index];
    // // //**    }
    // // //**    console.log(tmpfetchingFormDat);
    // // let [namesORkeys,valueArr,tmpVar] = [t1,j,{}];
    // // for (let i = 0; i < namesORkeys.length; i++) {
    // //     tmpVar[namesORkeys[i]] = valueArr[i];
    // // }
    // // tmpfetchingFormDat = {...tmpVar};


    // // ////////////////////////////////////////////////////////////
    // //??TEST??  console.log("tmp", tmpfetchingFormDat)
    // tmpfetchingFormDat = JSON.stringify(tmpfetchingFormDat);
    // //??test console.log(tmpfetchingFormDat);
    // this.fetchingFormData = window.btoa(tmpfetchingFormDat);
    // // document.getElementById("rowdat").value = 'bAsEbin' +  this.fetchingFormData ;

    // // console.log('fetcfh dat',tmpfetchingFormDat);
    // // document.getElementById("rowdat").value = this.fetchingFormData;
    // todo make tag customer/office copy 
    document.getElementsByClassName("copyOF")[0].innerHTML = "&#x2688;Customer Copy";
    // document.getElementsByClassName("copyOF")[1].innerHTML = "&#x2688;Office Copy"; 

};

// add item to customer
Customer.prototype.addItem = function (itemName, itemDescription, itemWarranty, itemPrice, totalItem) {
    if (this.items[itemName]) {
        // console.log(1, this.itemCount);
        alert(itemName + ' is already added');
        return "already added";
    } else if (this.itemCount > 14) {



        alert(`too many!${this.itemCount} items`)
        return "overflow too mutch item ";

        // for (let i = 0; i < pdis.length; i++) {
        //     pdis[i].classList.add("hide");
        //     // pdis[i].classList.add("hide");
        // }
        console.log(2, this.itemCount)
    }
    //  else if (this.itemCount <= 7 ) {
    //     console.log(3, this.itemCount);
    //     for (let i = 0; i < pdis.length; i++) {
    //         pdis[i].classList.remove("hide");
    //         // pdis[i].classList.add("hide");
    //     }

    // } else {
    //     console.log(4, this.itemCount)
    // }
    let totalAmount = totalItem * itemPrice;
    let itemSirial = this.itemCount + 1;
    // console.log(itemSirial);
    // node constructor function
    // let nodeElm = `<tr class="_${itemSirial}"> 
    // <td>${itemSirial}</td>
    // <td class="discription">${itemDescription}</td>
    // <td>${totalItem}</td>
    // <td class="warranty">${itemWarranty}</td>
    // <td class="total">${totalAmount}/-</td>
    // </tr>`;

    this.items[itemName] = [itemSirial, itemName, itemDescription, itemPrice, totalItem, itemWarranty, totalAmount];
    this.itemCount = Object.keys(this.items).length;

    // this.itemCount++;
    this.final();

}

// generate QR code

// newCustomer.prototype.generateQrCode = function() {
// var qr = new QRCode(document.getElementById("qrcode"), {
// text: this.fetchingFormData,
// width: 200,
// height: 200
// });
// }

// QRcode js settings
// var qrcode = new QRCode("test", {
//     text: "http://jindo.dev.naver.com/collie",
//     width: 128,
//     height: 128,
//     colorDark: "#000000",
//     colorLight: "#ffffff",
//     correctLevel: QRCode.CorrectLevel.H
// })
//item constructor

function newItem(name, price, qty, itemSirialNo) {
    this.sirial = presentCustomer.items.length + 1;
    this.name = name;
    this.price = price;
    this.qty = qty;

    this.itemSirialNo = itemSirialNo;

    presentCustomer.addItem(this.name, this.price, this.qty);
}
// const fetchingForm = rawDataForm; //?? make it constant
// // const fetchingForm = document.forms['formName']
// fetchingForm.addEventListener('submit', e => {
//     e.preventDefault()
//     //** fetch(scriptURL, {
//     //**         method: 'POST',
//     //**         body: new FormData(fetchingForm),
//     //**         // headers: {
//     //**         //     "Content-Type": "application/json",
//     //**         //     // 'Content-Type': 'application/x-www-form-urlencoded',
//     //**         //   }
//     //**     })
//     //**     .then(response => alert("Thank you! your fetchingForm is submitted successfully."))
//     //**     // .then(response => console.log(response))
//     //**     // .then(() => {
//     //**     //     window.location.reload();
//     //**     // })
//     //**     .catch(error => console.error('Error!', error.message))
//     logJSONData(); //cheked file
// })
// var tt, tmpda, tmpSRes = [];
// async function logJSONData() {
//     const ttr = await fetch(scriptURL, {
//         method: 'POST',
//         body: new FormData(fetchingForm)
//     })
//         // .then(response =>  response.json())
//         .then(response => {
//             tt = response;
//             console.log('ok!', response);
//             // setTimeout(() => {console.log('waiting')},500);
//             // setTimeout(() => {console.log("waiting")},5000);
//             return response.json()
//         }, err => console.error("logjsonData line 7 then1", err))
//         .then(response => {
//             tt = response;
//             tmpda = { ...response };
//             console.log('hi', response);
//             return t2 = response
//         }, err => console.error("logjsonData line 7 then1", err))
//         .then(e => e.error ? console.log('error 🥱:', e.error) : e, err => console.log('error:', err.message))
//         .then(response => {
//             let tmp = {
//                 result: response.result, 
//                 mailRemains: response.mailRemains, 
//                 cRow: response.row - 1, 
//                 resDat: response.resDat};
//             return tmpSRes = {...tmp}
//         }, err => console.error("logjson", err))
//         .then(response => {
//             //QR DATA
//             generateQRCode(`https://naye2m.github.io/instituteonlinevoucher/?id=${tmpSRes.resDat[0]}&row=${tmpSRes.cRow}&me=qr&v=1#hi`); 
//             //alert
//             alert(JSON.stringify(tmpSRes));
//             //print
//             window.print();
//         }, err => console.log('error:', err))
//         // .then(e => {console.log('res:', e); 
//         // let tmp = {}, tmpkey =["result", "mailRemains", "Crow", "response" ]; 
//         //     for (let i = 0; i < tmpSRes; i++) {
//         //         tmp[tmpkey[i]] = tmpSRes[i]
//         //     }
//         //     tmpSRes = {...tmp}
//     // })
//         //** .then(r2 => console.log('ok!',tt = r2),err => console.error("logjsonData line 8 then2", err))
//         //** .then(j => {
//         //**     console.log(j);
//         //**     return window.print
//         //** }, err => console.error("logjsonData line9 then3", err))
//         .catch(err => console.error("logjsonData line10 then4", err))
//         .finally(() => { alert("Complete"); console.log(tmpda);});

//* // const response = await fetch(scriptURL, {
// **    method: 'POST',
// **    body: new FormData(fetchingForm)
// **})
//** */ .then(response => console.log('ok!', response))
//** /////// const response = await fetch(scriptURL, {
//** */     method: 'POST',
//** */     body: new FormData(fetchingForm)
//** */ })
//** */ .then(response => console.log('ok!', response))
//** */ .catch(err => console.error('error', err.message));
//** */ const jsonData = await response;
//** */ console.log(jsonData);//not accu
//** */     // fetch(scriptURL, {
// **  //     method: 'POST',
// **  //     body: new FormData(fetchingForm)
// **  // })
// **  // .then(response => alert("Thank you! your fetchingForm is submitted successfully."))
// **  // .then(response => console.log(response))
// **  // // .then(() => {
// **  // //     window.location.reload();
// **  // // })
// **  // .catch(error => console.error('Error!', error.message))
// }

// var qrcode = new QRCode("qrcode", {
//     text: "http://jindo.dev.naver.com/collie",
//     width: 128,
//     height: 128,
//     colorDark : "#000000",
//     colorLight : "#ffffff",
//     correctLevel : QRCode.CorrectLevel.H
// });

var qrcodeContainer = document.getElementsByClassName("QRS")[0];
//  qrcodeContainer2 = document.getElementsByClassName("QRS")[1];
function generateQRCode(website) {
    // let website = document.getElementById("website").value;
    if (website) {
        // let qrcodeContainer = document.getElementById("qrcode");
        let qrcodeContainer = document.getElementsByClassName("QRS")[0];
        // let qrcodeContainer1 = document.getElementsByClassName("QRS")[1];
        qrcodeContainer.innerHTML = "";
        new QRious({
            element: qrcodeContainer,
            size: 120,
            level: 'H',
            padding: 0,
            value: website
        });
        //     qrcodeContainer1.innerHTML = "";
        //   new QRious({
        //     element: qrcodeContainer1,
        //     size: 120,
        //     level: 'H',
        //     value: website
        //   });
        /*With some styles*/
        //   let qrcodeContainer2 = document.getElementById("qrcode-2"); 
        //   qrcodeContainer2.innerHTML = "";
        //   new QRious({
        //     element: qrcodeContainer2, 
        //     background: '#ffffff',
        //     backgroundAlpha: 1,
        //     foreground: '#5868bf',
        //     foregroundAlpha: 1,
        //     value: website
        //   });
        //   document.getElementById("qrcode-container").style.display = "block";
        document.getElementsByClassName("QRScon")[0].style.display = "block";
        //   document.getElementsByClassName("QRScon")[1].style.display = "block";
    } else {
        alert("Please enter a valid URL");
    }
    // qrcodeContainer2.innerHTML = qrcodeContainer.innerHTML;
}

//** /////////// HTML    ST///////////////////
function addCust() {
    try {
        var [...tA] = [...document.getElementsByClassName("custConstractor")];
        console.log(tA = tA.map(e => e.value));
        let [cusName, address, email, phone, custype] = tA;
        phone = "+88" + phone;
        console.log(tA);
        // console.log(cusName.value)
        console.log(cusName, email, address, custype, "", phone);
        // if 
        pCust = new Customer(cusName, email, address, custype, "", phone);

        // let tA = [...document.getElementsByClassName("custConstractor")]
        // tA.forEach((e) => console.log(e.value))
        return true;
    } catch (e) {
        alert(e.message);
        alert("check everything.");
        return false;
    }
}

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
// console.log(product);
// // shirt
function printToPage(){
// loading printpage
const ASurl = "https://script.google.com/macros/s/AKfycbyuQK9UNNjKpz-9SjvWB4KNeaCM1jF-coKq9AQiIDcwMhjTst26jl2m8aFtjQLNYE2f/exec"; // Super (fixed online validation) v16
var serRes;
if (queryString && urlParams.get('id')) {
    fetch(ASurl + queryString)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response['dat']['jsonDat']
        })
        .then((response) => {
            console.log(1, response);
            return JSON.parse(response)["jsonFetchetfromWeb"];
        }).then((response) => console.log(serRes = response))
        .catch((error) => console.log(error))
        .finally(e => {
            // window.location.search = '';
            printONdoc(serRes);
        })
}
function printONdoc(nm) {
    var nn = new Customer(nm.name, nm.emailAdd, nm.address, nm.buyingFor, nm.invoiceNumber, nm.phone, nm._discountAmount);
    presentCustomer.items = {};
    // nm.items.map(e => presentCustomer.addItem(e[1], e[2], e[5], e[3], e[4]))//iff arr
    // Object.values(nm).map(e => presentCustomer.addItem(e[1], e[2], e[5], e[3], e[4]))//?iff Obj
    console.log(Object.values(nm.items).map(e => presentCustomer.addItem(e[1], e[2], e[5], e[3], e[4])))
    document.getElementById("loader").style.display = "none";
}
}
if (!queryString || !urlParams.get('id')) {
    document.body.innerHTML = "<p style=' font-family: sutonnyOMJban, \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif;position: fixed;font-size: 32pt;bottom: 50%;display: contents;padding: 50vh;'>Scan correct QR Code</br>Error: Cant find <strong>Id</strong>entification</p>";
}

printToPage();

// check if demo page to show
var Is_Demo = new URLSearchParams(window.location.search).get("demo")?.toLowerCase() == 'true';
if (Is_Demo)
    window.location.replace("?id=1r655P4ooSv2T5uDyJ8JBhtdi2bDdJ0ik&inv=NAY275241119&row=274&me=em");
// end demo

