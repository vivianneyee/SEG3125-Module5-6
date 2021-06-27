
const serviceList = [
  {
    name: "General Medicine",
    price: 18.00
  },
  {
    name: "Dentistry",
    price: 40.00
  },
  {
    name: "Vaccination",
    price: 16.00
  },
  {
    name: "Surgical Care",
    price: 60.00
  },
  {
    name: "Laboratory Tests",
    price: 32.00
  }
];

const employees = [
  {
    name: "Dr. Garcia",
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: true,
    friday: true,
    saturday: true
  },
  {
    name: "Dr. Moore",
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: false,
    friday: false,
    saturday: true
  },
  {
    name: "Dr. Grant",
    monday: false,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false
  }
];

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

var unavailableDates = ["06/29/2020","07/07/2020","07/10/2020"];
const setDateFormat = "mm/dd/yy";
var daysOff = [];

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    var day = date.getDay();

    if (daysOff) {
      return [(day != 0 && day != daysOff[0] && day != daysOff[1])];
    } else {
      return [(day != 0)];
    }
}

function validatePhoneNumber() {
  var phoneNumber = document.getElementById('inputPhoneNumber').value;
  var errorMsg = "invalid phone number";
  phoneNumber = phoneNumber.replace(/\s/g, '');
  phoneNumber = phoneNumber.replace('(', '');
  phoneNumber = phoneNumber.replace(')', '');
  phoneNumber = phoneNumber.replace('-', '');
  if (phoneNumber.length != 10 || Number.isNaN(phoneNumber)) {
    document.getElementById("phoneNumErrMsg").innerHTML = errorMsg;
    return false;
  } else {
    document.getElementById("phoneNumErrMsg").innerHTML = "";
    return true;
  }
}

function disableDatesForExpert() {
  var expert = document.getElementById('selectExpert').value;
  var off = [];
  if (expert != "Choose...") {
    for (let i = 0; i < employees.length; i++) {
      if (expert === employees[i].name) {
        if (!employees[i].monday) {
          off.push(1);
        }
        if (!employees[i].tuesday) {
          off.push(2);
        }
        if (!employees[i].wednesday) {
          off.push(3);
        }
        if (!employees[i].thursday) {
          off.push(4);
        }
        if (!employees[i].friday) {
          off.push(5);
        }
        if (!employees[i].saturday) {
          off.push(6);
        }
      }
    }
  }
  daysOff = off;
}

function getTotals() {
  var service = document.getElementById('selectService').value;
  if (service === "Choose...") {
    document.getElementById('serviceErrMsg').innerHTML = "select a service";
    return;
  } else {
    document.getElementById('serviceErrMsg').innerHTML = "";
  }
  var subtotal = 0;
  var taxes = 0;
  var total = 0;
  for (let i = 0; i < serviceList.length; i++) {
    if (service === serviceList[i].name) {
      subtotal = serviceList[i].price;
    }
  }
  taxes = (subtotal * 0.13);
  total = subtotal + taxes;
  document.getElementById("subtotal").innerHTML = "$" + subtotal;
  document.getElementById("taxes").innerHTML = "$" + taxes.toFixed(2);
  document.getElementById("total").innerHTML = "$" + total.toFixed(2);
}

function checkEmptyFields() {
  var flag = true;
  var errorMsg = "field cannot be empty";
  var name = document.getElementById('inputName');
  var email = document.getElementById('inputEmail');
  var phoneNumber = document.getElementById('inputPhoneNumber');
  var address = document.getElementById('inputAddress');
  var city = document.getElementById('inputCity');
  var province = document.getElementById('inputProvince');
  var postalCode = document.getElementById('inputPostal');
  var animal = document.getElementById('selectAnimal');
  var expert = document.getElementById('selectExpert');
  var date = document.getElementById('datePicker');

  if (name.value === "") {
    document.getElementById('nameErrMsg').innerHTML = errorMsg;
    flag = false;
  } else {
    document.getElementById('nameErrMsg').innerHTML = "";
  }
  if (email.value === "") {
    document.getElementById('emailErrMsg').innerHTML = errorMsg;
    flag = false;
  } else {
    document.getElementById('emailErrMsg').innerHTML = "";
  }
  if (phoneNumber.value === "") {
    document.getElementById('phoneNumErrMsg').innerHTML = errorMsg;
    flag = false;
  } else {
    document.getElementById('phoneNumErrMsg').innerHTML = "";
  }
  if (address.value === "") {
    document.getElementById('addressErrMsg').innerHTML = errorMsg;
    flag = false;
  } else {
    document.getElementById('addressErrMsg').innerHTML = "";
  }
  if (city.value === "") {
    document.getElementById('cityErrMsg').innerHTML = errorMsg;
    flag = false;
  } else {
    document.getElementById('cityErrMsg').innerHTML = "";
  }
  if (province.value === "Choose...") {
    document.getElementById('provinceErrMsg').innerHTML = "select a province";
    flag = false;
  } else {
    document.getElementById('provinceErrMsg').innerHTML = "";
  }
  if (postalCode.value === "") {
    document.getElementById('postalErrMsg').innerHTML = errorMsg;
    flag = false;
  } else {
    document.getElementById('postalErrMsg').innerHTML = "";
  }
  if (animal.value === "Choose...") {
    document.getElementById('animalErrMsg').innerHTML = "select an animal";
    flag = false;
  } else {
    document.getElementById('animalErrMsg').innerHTML = "";
  }
  if (expert.value === "Choose...") {
    document.getElementById('expertErrMsg').innerHTML = "select an expert";
    flag = false;
  } else {
    document.getElementById('expertErrMsg').innerHTML = "";
  }
  if (date.value === "") {
    document.getElementById('dateErrMsg').innerHTML = "select a date";
    flag = false;
  } else {
    document.getElementById('dateErrMsg').innerHTML = "";
  }
  return flag;
}

function proceedToPayment() {
  var validPhone = validatePhoneNumber();
  getTotals();
  var validForm = checkEmptyFields();
  if (validForm && validPhone) {
    document.getElementById("payment").style.display = "flex";
  }
}

function validateCardNum() {
  var cardNum = document.getElementById('inputCardNumber').value;
  var errorMsg = "invalid credit card number";
  cardNum = cardNum.replace(/\s/g, '');
  if (cardNum.length != 16 || Number.isNaN(cardNum)) {
    document.getElementById("cardNumErrMsg").innerHTML = errorMsg;
    return false;
  } else {
    document.getElementById("cardNumErrMsg").innerHTML = "";
    return true;
  }
}

$(document).ready(function() {
  $( "#datePicker" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }
    );
    $(function () {
          $("[rel='tooltip']").tooltip();
      });
})
