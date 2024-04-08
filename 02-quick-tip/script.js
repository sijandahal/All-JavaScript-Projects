const finalBillAmount = document.querySelector(".bill__input");
const tipsInPercent = document.querySelector(".range__slider");
let totalTipAmount;
const splitSlider = document.querySelector(".split__range__slider");
let tipAmount = document.querySelector(".range__amount");
let totalAmountafterTips = document.querySelector(".total__amount");
let eachBillAmount = document.querySelector(".split__bill__amount");
let eachTipAmount = document.querySelector(".split__tip__amount");
let totalNumberOfPerson = document.querySelector(".split__person");
let totalBill;
let tipsInPercentValue;
let splitSliderValue;
let total;
let splitTotalBill;
let splitTotalTip;

//Event Listener on Input

finalBillAmount.addEventListener("input", finalTotalAmount);
tipsInPercent.addEventListener("change", finalTotalAmount);
splitSlider.addEventListener("change", finalTotalAmount);

function finalTotalAmount() {
  totalBill = parseInt(finalBillAmount.value);
  totalTipAmount = tipsInPercent.value;
  splitSliderValue = splitSlider.value;
  console.log(totalTipAmount);

  tipAmount.textContent = totalTipAmount + "%";
  eachBillAmount.textContent = splitSliderValue + "$" + " ";
   
  if (typeof totalBill != undefined && totalBill >=0) {
    total = (totalTipAmount / 100) * totalBill + totalBill;
    console.log(total);
    // console.log(total)
    totalAmountafterTips.textContent = total;
    console.log(splitSliderValue);
  }
  else {
    totalAmountafterTips.textContent = "Enter a positive amount"
  }

  splitTotalBill = totalBill / splitSliderValue;
  console.log(splitSliderValue);
  //console.log(splitTotalBill);
  eachBillAmount.textContent = "$" + " " + splitTotalBill;

  splitTotalTip = ((totalTipAmount / 100) * totalBill) / splitSliderValue;
  eachTipAmount.textContent = "$" + " " + splitTotalTip;
}


// function calculateTotalAmount() {
  
  

//   splitSlider.addEventListener("change", () => {

//     updateTotalAmount();
//   });
// }

// function updateTotalAmount() {


// calculateTotalAmount();


// if (splitSliderValue <= 1) {
//   totalNumberOfPerson.textContent = splitSliderValue + " " + "person";
// } else totalNumberOfPerson.textContent = splitSliderValue + " " + "persons";
// console.log(splitSliderValue);