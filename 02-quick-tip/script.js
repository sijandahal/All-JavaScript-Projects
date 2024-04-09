const finalBillAmount = document.querySelector(".bill__input");
const tipsRangeSlider = document.querySelector(".range__slider");
const splitRangeSlider = document.querySelector(".split__range__slider");
let tipAmountDisplay = document.querySelector(".range__amount");
let totalAmountDisplay = document.querySelector(".total__amount");
let eachBillAmountDisplay = document.querySelector(".split__bill__amount");
let eachTipAmountDisplay = document.querySelector(".split__tip__amount");
let totalPersonDisplay = document.querySelector(".split__person");


let totalBill;
let tipPercentage;
let totalAmount;
let splitCountPersons;
let splitTotalBill;
let splitTotalTip;

//Event Listener on Input

finalBillAmount.addEventListener("input", finalTotalAmount);
tipsRangeSlider.addEventListener("change", finalTotalAmount);
splitRangeSlider.addEventListener("change", finalTotalAmount);

function finalTotalAmount() {
  totalBill = parseInt(finalBillAmount.value);
  if (totalBill < 0 ) {
    alert("Please enter Postive Bill Amount");
    document.getElementById("billAmount").value = 0;
    tipsRangeSlider.disabled = true
    splitRangeSlider.disabled = true
  }

  else {
    tipsRangeSlider.disabled = false
    splitRangeSlider.disabled = false
    tipPercentage = parseInt(tipsRangeSlider.value);
    splitCountPersons = parseInt(splitRangeSlider.value);
  
    tipAmountDisplay.textContent = `${tipPercentage}%`;
  
    if (typeof totalBill != undefined && totalBill >= 0) {
      totalAmount = (tipPercentage / 100) * totalBill + totalBill;
      console.log(totalAmount);
      totalAmountDisplay.textContent = totalAmount.toFixed(2);
    } else {
      totalAmountDisplay.textContent = "Enter a positive amount";
    }
  
  //bottomhalf calculation
  
    splitTotalBill = totalBill / splitCountPersons;
    eachBillAmountDisplay.textContent = `$${splitTotalBill.toFixed()}`
  
    if (splitCountPersons <= 1) {
      totalPersonDisplay.textContent =  `${splitCountPersons}`;
    } else totalPersonDisplay.textContent = `${splitCountPersons}`;
  
    splitTotalTip = ((tipPercentage / 100) * totalBill) / splitCountPersons;
    console.log(splitTotalTip)
    eachTipAmountDisplay.textContent = `${splitTotalTip.toFixed(2)}`;


    
  }
  }
  