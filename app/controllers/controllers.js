/*
Các method của axios - thường có 4 (default, có thể khác nếu backend quy định khác)
- GET : lấy danh sách, lấy chi tiết
- POST : tạo mới
- PUT: cập nhật
- DELETE: xóa

:... --> param

*/

// Function

var tenSp = document.getElementById('TenSP')
var giaSp = document.getElementById('GiaSP')
var hinhSp = document.getElementById('HinhSP')
var moTaSp = document.getElementById('MoTaSP')
// Tao global var de luu id cho method update
var idEdited = null


function turnOnLoading() {
  document.getElementById('spinner').style.display = 'block'
}

function turnOffLoading() {
  document.getElementById('spinner').style.display = 'none'
}

function resetForm() {
  var inputForm = document.querySelectorAll('input')
  for(var i = 0; i < inputForm.length; i++) {
    inputForm[i].value = ''
  }
}

function renderProducts(productArray) {
  var content = "";
  // for (var i = 0; i < productArray.length; i++)
  for (var i = productArray.length - 1; i >= 0 ; i--) {
    var product = productArray[i];
    content += `
                <tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>
                      <img src="${product.img}" alt="">
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
    turnOnLoading()
    axios({
        url:'https://6597f7c2668d248edf23d04d.mockapi.io/product',
        method: "GET",
      })
        .then(function (res) {
          renderProducts(res.data);
          console.log("RES: ", res.data);
          turnOffLoading()
        })
        .catch(function (err) {
          console.log("ERR: ", err);
          turnOffLoading()
        });
}
fetchProductsList()

function deleteProduct(id) {
  turnOnLoading()
  axios({
    url:`https://6597f7c2668d248edf23d04d.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      fetchProductsList()
      console.log("RES: ", res.data);
    })
    .catch(function (err) {
      turnOffLoading()
      console.log("ERR: ", err);
    });
}

function createProduct() {
  
  turnOnLoading()
  
  var product = {
    name: tenSp.value,
    price: giaSp.value,
    img: hinhSp.value,
    desc: moTaSp.value
  }

  axios({
    url: "https://6597f7c2668d248edf23d04d.mockapi.io/product",
    method: "POST",
    // thêm method data
    data: product
  })
    .then(function (res) {
      fetchProductsList()
      // Tat modal sau khi them thanh cong
      $('#myModal').modal('hide')
      console.log("RES: ", res.data);
      resetForm()
    })
    .catch(function (err) {
      turnOffLoading()
      console.log("ERR: ", err);
    });
}


function editProduct(id) {
  idEdited = id
  axios({
    url: `https://6597f7c2668d248edf23d04d.mockapi.io/product/${id}`,
    method: "GET",
  }) 
    .then(function (res) {
      var product = res.data
      console.log("RES: ", res.data);
      tenSp.value = product.name
      giaSp.value = product.price
      hinhSp.value = product.img
      moTaSp.value = product.desc
      $('#myModal').modal('show')
    })
    .catch(function (err) {
      console.log("ERR: ", err);
    })
}

function updateProduct() {
  turnOnLoading()
  var product = {
    name: tenSp.value,
    price: giaSp.value,
    img: hinhSp.value,
    desc: moTaSp.value
  }
  
  axios({
    url: `https://6597f7c2668d248edf23d04d.mockapi.io/product/${idEdited}`,
    method: "PUT",
    data: product
  })
    .then(function (res) {
      fetchProductsList()
      // // Tat modal sau khi them thanh cong
      $('#myModal').modal('hide')
      console.log("RES: ", res.data);
    })
    .catch(function (err) {
      turnOffLoading()
      console.log("ERR: ", err);
    });
}

