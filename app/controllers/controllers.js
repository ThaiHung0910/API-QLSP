/*
Các method của axios - thường có 4 (default, có thể khác nếu backend quy định khác)
- GET : lấy danh sách, lấy chi tiết
- POST : tạo mới
- PUT: cập nhật
- DELETE: xóa

:... --> param

*/

// Function

var tenSp = document.getElementById("TenSP");
var giaSp = document.getElementById("GiaSP");
var hinhSp = document.getElementById("HinhSP");
var moTaSp = document.getElementById("MoTaSP");
var btnAddProduct = document.getElementById("btnAddProduct");
var btnUpdateProduct = document.getElementById("btnUpdateProduct");
var inputForm = document.querySelectorAll(".form-group input");
// Tao global var de luu id cho method update
var idEdited = null;

function turnOnLoading() {
  document.getElementById("spinner").style.display = "block";
}

function turnOffLoading() {
  document.getElementById("spinner").style.display = "none";
}

function resetForm() {
  for (var i = 0; i < inputForm.length; i++) {
    inputForm[i].value = "";
  }
}

function getValueProduct() {
  var errorInput = document.querySelectorAll("span.sp-thongbao");
  var isValid = true;
  for (var i = 0; i < inputForm.length; i++) {
    var inputId = inputForm[i].id;
    var errorId = errorInput[i].id;
    var inputValue = inputForm[i].value;
    switch (inputId) {
      case "GiaSP":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkNumber(inputValue, errorId);
        break;
      case "HinhSP":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkImage(inputValue, errorId);
        break;
      default:
        isValid &= checkEmptyValue(inputValue, errorId);
    }
  }
  if (isValid) {
    return {
      name: tenSp.value,
      price: giaSp.value,
      img: hinhSp.value,
      desc: moTaSp.value,
    };
  }
}

function renderProducts(productArray) {
  var content = "";
  // for (var i = 0; i < productArray.length; i++)
  for (var i = productArray.length - 1; i >= 0; i--) {
    var product = productArray[i];
    content += `
                <tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>
                      <img class="img" src="${product.img}" alt="Image not found">
                  </td>
                  <td>${product.desc}</td>
                  <td>
                  
                  <button onclick="editProduct(${product.id})" class="btn btn-success">Edit</button>                  
                  <button onclick="deleteProduct(${product.id})" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
          `;
  }
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function fetchProductsList() {
  turnOnLoading();
  axios({
    url: "https://6597f7c2668d248edf23d04d.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      renderProducts(res.data);
      console.log("RES: ", res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("ERR: ", err);
      turnOffLoading();
    });
}
fetchProductsList();

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    turnOnLoading();
    axios({
      url: `https://6597f7c2668d248edf23d04d.mockapi.io/product/${id}`,
      method: "DELETE",
    })
      .then(function (res) {
        fetchProductsList();
        console.log("RES: ", res.data);
      })
      .catch(function (err) {
        turnOffLoading();
        console.log("ERR: ", err);
      });
  }
}

function createProduct() {
  var product = getValueProduct();

  if (product) {
    turnOnLoading();
    axios({
      url: "https://6597f7c2668d248edf23d04d.mockapi.io/product",
      method: "POST",
      // thêm method data
      data: product,
    })
      .then(function (res) {
        fetchProductsList();
        // Tat modal sau khi them thanh cong
        $("#myModal").modal("hide");
        console.log("RES: ", res.data);
        resetForm();
      })
      .catch(function (err) {
        turnOffLoading();
        console.log("ERR: ", err);
      });
  }
}

function editProduct(id) {
  btnAddProduct.style.display = "none";
  btnUpdateProduct.style.display = "block";
  idEdited = id;
  axios({
    url: `https://6597f7c2668d248edf23d04d.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      var product = res.data;
      console.log("RES: ", res.data);
      tenSp.value = product.name;
      giaSp.value = product.price;
      hinhSp.value = product.img;
      moTaSp.value = product.desc;
      $("#myModal").modal("show");
    })
    .catch(function (err) {
      console.log("ERR: ", err);
    });
}

function updateProduct() {
  var product = getValueProduct();

  if (product) {
    turnOnLoading();
    axios({
      url: `https://6597f7c2668d248edf23d04d.mockapi.io/product/${idEdited}`,
      method: "PUT",
      data: product,
    })
      .then(function (res) {
        fetchProductsList();
        // // Tat modal sau khi them thanh cong
        $("#myModal").modal("hide");
        console.log("RES: ", res.data);
      })
      .catch(function (err) {
        turnOffLoading();
        console.log("ERR: ", err);
      });
  }
}

document.getElementById("btnThemSP").addEventListener("click", function () {
  resetForm();
  btnAddProduct.style.display = "block";
  btnUpdateProduct.style.display = "none";
});
