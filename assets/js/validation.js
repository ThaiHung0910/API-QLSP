function getElement(element) {
  return document.getElementById(element);
}

var message = ["Vui lòng không bỏ trống", "Vui lòng chỉ nhập số", "Vui lòng nhập đúng định dạng hình ảnh"];

function checkEmptyValue(value, errorId) {
  if (value) {
    getElement(errorId).style.display = "none";
    getElement(errorId).innerHTML = "";
    return true;
  } else {
    getElement(errorId).style.display = "block";
    getElement(errorId).innerHTML = message[0];
    return false;
  }
}

function checkNumber(value, errorId) {
  var regexValue = /^-{0,1}\d*\.{0,1}\d+$/
  if(regexValue.test(value)) {
    getElement(errorId).style.display = 'none'
     getElement(errorId).innerHTML = ''
    return true
  } else {
    getElement(errorId).style.display = 'block'
    getElement(errorId).innerHTML = message[1]
    return false
  }
}

function checkImage(value, errorId) {
    var regex1 = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    var regex2 = /\.(jpeg|jpg|gif|png)$/
    if(regex1.test(value) || (regex2.test(value))) {
      getElement(errorId).style.display = 'none'
       getElement(errorId).innerHTML = ''
      return true
    } else {
      getElement(errorId).style.display = 'block'
      getElement(errorId).innerHTML = message[2]
      return false
    }
}


