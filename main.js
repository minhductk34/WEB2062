/**
1. Xây dựng chức năng hiển thị (2 điểm)
Hiển thị danh sách sản phẩm theo dạng table
2. Xây dựng chức năng xóa (2 điểm)
Xóa sản phẩm: 1đ
Xóa có confirm và hiển thị thông báo sau khi xóa thành công : 1đ
3. Xây dựng chức năng thêm mới (2 điểm)
Thêm sản phẩm : 1 đ
Hiển thị thông báo sau khi thêm : 0.5đ
Validate form: 0.5đ
4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
Cập nhật sản phẩm: 1đ
Hiển thị thông báo sau khi cập nhật: 0.5đ
Validate form: 0.5đ
5. Xây dựng chức năng đăng nhập (1 điểm) 
Đăng nhập thành công : 0.5đ
Thông báo sau khi đăng nhập thành công: 0.5đ
6. Xây dựng giao diện sử dụng bootstrap hoặc tailwindcss (1 điểm)
*/
const url = "http://localhost:3300/products";
const tbody = document.querySelector("tbody");
const btnAdd = document.querySelector(".btn-add");
const content = document.querySelector(".content");
console.log(tbody);

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const html = data
      .map((pro) => {
        return /*html*/ `
        <tr>
          <td>${pro.id}</td>
          <td>${pro.name}</td>
          <td>${pro.price}</td>
          <td><button class ="btn-update btn-primary" data-id="${pro.id}">Edit</button>  <button class ="btn-delete btn-danger" data-id="${pro.id}">Delete</button> </td>
        </tr>`;
      })
      .join(" ");
    tbody.innerHTML = html;

    //delete
    const btnDelete = document.querySelectorAll(".btn-delete");
    console.log(btnDelete);
    for (const btn of btnDelete) {
      btn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete? ")) {
          const id = btn.dataset.id;
          remove(id);
        }
      });
    }

    //update

    const btnUpdate = document.querySelectorAll(".btn-update");

    for (const btn of btnUpdate) {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        fetch(`${url}/${id}`)
          .then((res) => res.json())
          .then((data) => {
            content.innerHTML = /*html*/ `
            <form class="mt-4">
            <div class="form-group">
              <label for="name">Name Product</label>
              <input type="text" class="form-control" id="name" placeholder="Enter product name" value="${data.name}">
            </div>
            <div class="form-group">
              <label for="price">Price Product</label>
              <input type="number" class="form-control" id="price" placeholder="Enter product price" value="${data.price}">
            </div>
            <button type="submit" class="btn btn-primary">Edit Product</button>
          </form>
`;

            const btnSubmit = document.querySelector(".btn-submit");
            const pro_name = document.querySelector("#name");
            const pro_price = document.querySelector("#price");
            btnSubmit.addEventListener("click", (e) => {
              e.preventDefault();
              if (pro_name.value == "") {
                alert("Please type a name Product");
                pro_name.focus();
                return false;
              } else if (pro_price.value == "") {
                alert("Please type a price Product");
                pro_price.focus();
                return false;
              } else if (
                isNaN(Number(pro_price.value)) ||
                Number(pro_price.value) <= 0
              ) {
                alert("Please type a number > 0");
                pro_price.focus();
                return false;
              }
              const new_pro = {
                id: id,
                name: pro_name.value,
                price: pro_price.value,
              };
              console.log(new_pro);
              updatePro(new_pro, id);
            });
          })
          .catch((err) => console.log(err));
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

//remove
const remove = function (id) {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      alert("Delete deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};
//add
btnAdd.addEventListener("click", () => {
  content.innerHTML = /*html*/ `
    <form class="mt-4">
    <div class="form-group">
        <label for="name">Name Product</label>
        <input type="text" class="form-control" id="name" placeholder="Enter product name">
    </div>
    <div class="form-group">
        <label for="price">Price Product</label>
        <input type="number" class="form-control" id="price" placeholder="Enter product price">
    </div>
    <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
`;
  const btnSubmit = document.querySelector(".btn-submit");
  const pro_name = document.querySelector("#name");
  const pro_price = document.querySelector("#price");
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (pro_name.value == "") {
      alert("Please type a name Product");
      pro_name.focus();
      return false;
    } else if (pro_price.value == "") {
      alert("Please type a price Product");
      pro_price.focus();
      return false;
    } else if (isNaN(Number(pro_price.value)) || Number(pro_price.value) <= 0) {
      alert("Please type a number > 0");
      pro_price.focus();
      return false;
    }
    const new_pro = {
      name: pro_name.value,
      price: pro_price.value,
    };
    // console.log(new_pro);
    addPro(new_pro);
  });
});

//add

const addPro = function (data) {
  fetch(url, {
    method: "POST",
    Headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Successfully added");
    })
    .catch((err) => console.log(err));
};

//update
const updatePro = function (data, id) {
  fetch(`${url}/${id}`, {
    method: "PUT",
    Headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Successfully added");
    })
    .catch((err) => console.log(err));
};
