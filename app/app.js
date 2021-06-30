const contentInput = document.querySelectorAll(".contentInput");
const currentDeptInput = document.querySelector(".currentDeptInput");
const pastDeptInput = document.querySelector(".pastDeptInput");
const percentWithoutPenaltyInput = document.querySelector(".percentWithoutPenaltyInput");
const tarifInput = document.querySelector(".tarifInput");
const penaltyPercentRateInput = document.querySelector(".penaltyPercentRateInput");
const avgPercent = document.querySelector(".avgPercent");
const checkbox = document.querySelector(".checkbox");
const checkRemind = document.querySelector(".checkRemind");
const amountRefund = document.querySelector(".amountRefund");
const finalResult = document.querySelector(".finalResult");
const errorBox = document.querySelector(".errorBox");
const calculateButton = document.querySelectorAll(".calculateButton");
const calculateRefundButton = document.querySelector(".calculateRefundButton");
const resetValues = document.querySelector(".resetValues");
let currentDept;
let pastDept;
let percentWithoutPenalty;
let avgPercentRate;
let penaltyPercentRate;
let penaltyPercentAmount;
let amountOfPercentRefund;
let strTemp;
let tarifName;
let tarif = [];
let badTarif = [];
let timeout;
let timeoutTwo;

//tarifInput.textContent = 'КК. ТП 7.23 RUB';

function getTarifData() {
   fetch("./db/tarif.json").then((response) => response.json()).then((data) => {
      tarif = data;
   })
}

function getBadTarifData() {
   fetch("./db/badTarif.json").then((response) => response.json()).then((data) => {
      badTarif = data;
   })
}

function findPercent() {
   tarifName = tarifInput.value;
   if (checkbox.checked === true) {
      penaltyPercentRate = 73;
   }
   else {
      for (i = 0; i < tarif.length;) {
         if (tarifName != tarif[i].name) {
            i++;
         }
         else {
            penaltyPercentRate = tarif[i].penaltyRate;
            console.log(penaltyPercentRate);
            break;
         }
      }
   }
   penaltyPercentRateInput.textContent = penaltyPercentRate;
}

function checkRate() {
   if (checkbox.checked == false) {
      tarifName = tarifInput.value;
      for (i = 0; i < badTarif.length;) {
         if (tarifName != badTarif[i].name) {
            i++;
         }
         else {
            clearTimeout(timeoutTwo);
            checkRemind.style.backgroundColor = "antiquewhite";
            checkRemind.style.paddingTop = "3px";
            checkRemind.style.paddingBottom = "3px";
            checkRemind.style.borderTop = "2px black solid";
            checkRemind.style.borderBottom = "2px black solid";
            timeoutTwo = setTimeout(correctContent, 5000);
            console.log("penaltyPercentRate");
            break;
         }
      }
   }
}

function reset() {
   correctContent();
   currentDeptInput.value = "";
   pastDeptInput.value = "";
   percentWithoutPenaltyInput.value = "";
   tarifInput.value = "";
   avgPercent.textContent = 0;
   penaltyPercentRateInput.textContent = 0;
   amountRefund.textContent = 0;
   checkbox.checked = false;
}

function checked() {
   penaltyPercentRateInput.textContent = 73;
}

function showRate() {
   if (tarifInput.value == "" && checkbox.checked == false) {
      penaltyPercentRateInput.textContent = 0;
   }
   else if (tarifInput.value == "" && checkbox.checked == true) {
      penaltyPercentRateInput.textContent = 73;
   }
   else if (tarifInput.value != "" && checkbox.checked == true) {
      penaltyPercentRateInput.textContent = 73;
   }
   else if (tarifInput.value != "" && checkbox.checked == false) {
      findPercent();
   }
}

function deleteSpace(arg) {
   exceprions = [" ", "-", ",", '"'];
   arg = arg.toString();
   strTemp = arg;
   for (i = 0; i < strTemp.length; i++) {
      for (j = 0; j < exceprions.length; j++) {
         strTemp = strTemp.replace(exceprions[j], "");
      }
   }
   strTemp = parseFloat(strTemp);
   arg = strTemp;
}

function errorContent() {
   finalResult.style.opacity = 0;
   errorBox.style.opacity = 1;
   errorBox.style.zIndex = 1;
   for (i = 0; i < contentInput.length; i++) {
      contentInput[i].style.borderColor = "red";
   }
}

function correctContent() {
   finalResult.style.opacity = 1;
   errorBox.style.opacity = 0;
   errorBox.style.zIndex = -10;
   for (i = 0; i < contentInput.length; i++) {
      contentInput[i].style.borderColor = "";
   }
   checkRemind.style.backgroundColor = "";
   checkRemind.style.paddingTop = "5px";
   checkRemind.style.paddingBottom = "5px";
   checkRemind.style.borderTop = "";
   checkRemind.style.borderBottom = "";
}

function error() {
   errorContent();
   clearTimeout(timeout);
   timeout = setTimeout(correctContent, 5000);
}

function calculateRefund() {
   if (currentDeptInput.value == "" || pastDeptInput.value == "" || percentWithoutPenaltyInput.value == "" || (tarifInput.value == "" && checkbox.checked == false)) {
      clearTimeout(timeout);
      console.log("empty");
      error();
   }
   else {
      correctContent();
      findPercent();
      checkRate();
      currentDept = currentDeptInput.value;
      pastDept = pastDeptInput.value;
      percentWithoutPenalty = percentWithoutPenaltyInput.value;
      deleteSpace(currentDept);
      currentDept = strTemp;
      deleteSpace(pastDept);
      pastDept = strTemp;
      deleteSpace(percentWithoutPenalty);
      percentWithoutPenalty = strTemp;
      avgPercentRate = Number((percentWithoutPenalty * 100 * 365 / 31 / pastDept).toFixed(2));
      penaltyPercentAmount = Number((currentDept * (penaltyPercentRate - avgPercentRate) / 100 / 365 * 31).toFixed(2));
      amountOfPercentRefund = Math.ceil((penaltyPercentAmount + 100) / 100) * 100;
      amountRefund.textContent = amountOfPercentRefund.toString();
      currentDeptInput.value = currentDept;
      pastDeptInput.value = pastDept;
      percentWithoutPenaltyInput.value = percentWithoutPenalty;
      avgPercent.textContent = avgPercentRate;
      penaltyPercentRateInput.textContent = penaltyPercentRate;
   }
}
calculateButton.forEach(calculateButton => {
   calculateButton.addEventListener('click', function (event) {
      let x = event.clientX - event.target.offsetLeft;
      let y = event.clientY - event.target.offsetTop;
      let ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      this.appendChild(ripples);
      setTimeout(() => {
         ripples.remove();
      }, 1000);
   })
})
calculateRefundButton.addEventListener('click', calculateRefund);
calculateRefundButton.addEventListener('click', checkRate);
resetValues.addEventListener('click', reset);
checkbox.addEventListener('click', showRate);
reset();
getTarifData();
getBadTarifData();
// Tried to export json->text->text-file. Formating is ok, but couldn't export to needed folder.
//
//let txtprep = [];
//let txtstr = "";
//
//function textPrepare(){
//   for (i=0;i<badTarif.length;i++){
//      txtprep.push(badTarif[i].name + ";"+"\n");
//   }
//   for (j=0;j<txtprep.length;j++){
//      txtstr = txtstr.concat(txtprep[j]);
//   }
//   console.log(txtprep);
//Second json just to try to create common getData(). Did'nt work somehow.
//   console.log(txtstr);
//}
