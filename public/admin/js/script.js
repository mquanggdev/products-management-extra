
// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");
if(listButtonStatus.length > 0) {
  let url = new URL(window.location.href);

  listButtonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if(status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });

  const statusCur = url.searchParams.get("status") || "" ;
    const buttonCurrent = document.querySelector(`[button-status = "${statusCur}"]`);
    buttonCurrent.classList.add("active");
}

// End Button Status

// Tìm kiếm
const formSearch = document.querySelector("[form-search]");
if(formSearch){
  formSearch.addEventListener("submit" , (event) => {
  event.preventDefault();
  let url = new URL(window.location.href);
  const keyword = event.target.elements.keyword.value;
  if ( keyword){
    url.searchParams.set("keyword" , keyword);
  }
  else {
    url.searchParams.delete("keyword");
  }
  window.location.href = url.href;
})
}

// end tìm kiếm


// phân trang
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0){
  let url = new URL(window.location.href)
  listButtonPagination.forEach(button => {
    button.addEventListener("click" , () => {
      const currentPage = button.getAttribute("button-pagination");
      url.searchParams.set("page" , currentPage);
      window.location.href = url.href
    })
  })
}

// end phân trang


// Đổi trạng thái
const listButtonStatusChange = document.querySelectorAll("[button-changeStatus]");
if (listButtonStatusChange.length > 0){
  listButtonStatusChange.forEach(button => {
    button.addEventListener("click" , () => {
      const statusChange = button.getAttribute("button-changeStatus");
      const link = button.getAttribute("link");
      const data = {
        status:statusChange
      }
      fetch(link , {
        method:"PATCH",
        headers :{
          "Content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
          if(data.code == 200){
            window.location.reload();
          }
        })
    })
  })
}
// end đổi trạng thái


// Thay đổi trạng thái nhiều sản phẩm
const inputCheckAll = document.querySelector("input[name='checkAll']");
const inputCheckItems = document.querySelectorAll("input[name='checkItem']");
if(inputCheckAll && inputCheckItems.length > 0){
  inputCheckAll.addEventListener("click" , () => {
    inputCheckItems.forEach(input => {
      input.checked = inputCheckAll.checked
    })
  })

  inputCheckItems.forEach(input => {
    input.addEventListener("click" , () => {
      const inputCheckedItems = document.querySelectorAll("input[name = 'checkItem']:checked");
      if(inputCheckedItems.length == inputCheckItems.length){
        inputCheckAll.checked = true;
      }
      else {
        inputCheckAll.checked = false;
      }
    })
  })
  

  const buttonChangeStatus = document.querySelector(".button-ChangeMulti");
  buttonChangeStatus.addEventListener("click" , (event) => {
    const inputCheckedItems = document.querySelectorAll("input[name = 'checkItem']:checked");
    const selectStatus = document.querySelector("#inputGroupSelect04");
    const valueStatus = selectStatus.value
    if ( inputCheckedItems.length > 0 && valueStatus != ""){
      const ids = [] ;
      inputCheckedItems.forEach(input => {
        ids.push(input.value)
       }
      )
      const data = {
        id : ids ,
        status : valueStatus
      }
      const divInputGroup = document.querySelector("#box-changeStatus");
      const linkStatus = divInputGroup.getAttribute("link");
      console.log(linkStatus);
      fetch(linkStatus , {
        method:"PATCH" , 
        headers:{
          "Content-type" :"application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
            window.location.reload();
          }
        })
    }
    else {
      alert("Vui lòng chọn sản phẩm và chọn trường trạng thái!")
    }
  })
}
// end thay đổi trạng thái nhiều sản phẩm

// Xóa sản phẩm - bao gồm xóa vĩnh viễn và xóa mềm
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
  buttonDelete.forEach(item => {
    item.addEventListener("click" , () => {
      const link = item.getAttribute("button-delete");
      fetch(link , {
        method:"PATCH" , 
        headers:{
          "Content-type" :"application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          window.location.reload();
        }
      })
    })
  })
  }
// End Xóa sản phẩm

// xóa nhiều sản phẩm
const buttonDeleteMulti = document.querySelector("[button-deleteMulti]")
if(buttonDeleteMulti){
buttonDeleteMulti.addEventListener("click" , () => {
  const link = buttonDeleteMulti.getAttribute("button-deleteMulti");
  const inputCheckedItems = document.querySelectorAll("input[name = 'checkItem']:checked");
  if ( inputCheckedItems.length > 0){
    const ids = [] ;
    inputCheckedItems.forEach(item => {
      ids.push(item.value)
      }
    )
    fetch(link , {
      method:"PATCH" , 
      headers:{
        "Content-type" :"application/json"
      },
      body:JSON.stringify({id:ids})
    })
    .then(res => res.json())
    .then(data => {
      if(data.code == 200){
        window.location.reload();
      }
    })
  }
  else{
    alert("Vui lòng chọn các sản phẩm cần xóa")
  }
  
})
}
// end xóa nhiều sản phẩm


// Thay đổi vị trí
const listChangePosition = document.querySelectorAll("input[name='position']");
if(listChangePosition.length > 0) {
  listChangePosition.forEach(item => {
    item.addEventListener("change" , ()=> {
      const link = item.getAttribute("link");
      const valuePosition = parseInt(item.value);
      fetch(link , {
        method:"PATCH" , 
        headers:{
          "Content-type" :"application/json"
        },
        body:JSON.stringify({
          position:valuePosition}
        )
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
            console.log(data);
          }
        })
    })
  })
}
// end thay đổi vị trí 

// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  let time = showAlert.getAttribute("show-alert") || 3000;
  time = parseInt(time);

  setTimeout(() => {
    showAlert.classList.add("hidden");
  }, time);
}
// end show-alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End Upload Image


//sort
const sort = document.querySelector("[sort]");
if(sort){
    const url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    sortSelect.addEventListener("change",() =>{
        const [sortKey,sortValue] = sortSelect.value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const valueOptionSelected = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${valueOptionSelected}']`); 
        optionSelected.selected = true;
    }



    const sortClear = document.querySelector("[sort-clear]");
    sortClear.onclick = () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href
    }
}

// end sort

// Thùng rác
const  buttonRestoreSingle = document.querySelectorAll("[button-restoreSingle]");
if(buttonRestoreSingle.length > 0){
  buttonRestoreSingle.forEach(item => {
    item.addEventListener("click" , () => {
      const link = item.getAttribute("button-restoreSingle");
      fetch(link , {
        method:"PATCH" , 
        headers:{
          "Content-type" :"application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          window.location.reload();
        }
      })
    })
  })
}

const buttonPermanentlyDelete = document.querySelectorAll("[button-permanentlyDelete]");
if(buttonPermanentlyDelete.length > 0){
  buttonPermanentlyDelete.forEach(item => {
    item.addEventListener("click" , () => {
      const link = item.getAttribute("button-permanentlyDelete");
      fetch(link , {
        method:"DELETE" , 
        headers:{
          "Content-type" :"application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          window.location.reload();
        }
      })
    })
  })
}

const buttonDeleteAndRestore = document.querySelector(".button-DeleteAndRestore");
if(buttonDeleteAndRestore){
  buttonDeleteAndRestore.addEventListener("click" , () =>{
    const selectTrash = document.querySelector("#selectTrash");
    const inputCheckedItems = document.querySelectorAll("input[name = 'checkItem']:checked");
    if(inputCheckedItems.length > 0 && selectTrash != ""){
      let ids = [];
      const valueSelected = selectTrash.value;
      inputCheckedItems.forEach(item => {
        ids.push(item.value);
      })
      const data = {
        id:ids,
        task:valueSelected
      }
      fetch("/admin/products/trash/deleteAndRestore" , {
            method:"PATCH" , 
            headers:{
              "Content-type" :"application/json"
            },
            body:JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            if(data.code == 200){
              window.location.reload();
            }
          })
        }
    else{
      alert("Vui lòng chọn các sản phẩm cần xóa hoặc khôi phục")
    }
  })
}
// end thùng rác



// Bảng phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions){
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const roles = [] ;

    const listElementRoleId = tablePermissions.querySelectorAll("[role-id]");

    listElementRoleId.forEach(element => {
      const roleId = element.getAttribute("role-id")
      
      const role = {
        id: roleId,
        permissions:[]
      }

      const listInputCheckedPermissions = tablePermissions.querySelectorAll(`input[data-id="${roleId}"]:checked`);

      listInputCheckedPermissions.forEach(input => {
        const permission = input.getAttribute("data-name");
        role.permissions.push(permission);
      });
      roles.push(role);
    })
    const link = document.querySelector("[button-submit]").getAttribute("button-submit");
    fetch(link , {
      method: "PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(roles)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }) 
  })

  // hiển thị mặc định dấu tích
  const dataRecords = document.querySelector("[data-records]")
      if(dataRecords){
        const records = JSON.parse(dataRecords.getAttribute("data-records"));
        records.forEach((record,index) =>{
          const permissions = record.permissions;
          permissions.forEach(permission=>{
            const row = tablePermissions.querySelector(`tr[data-nametr="${permission}"]`);
            console.log(row);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
          })
        })
    } 
}

// end Bảng phân quyền