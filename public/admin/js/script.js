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
  const pageCurrent = url.searchParams.get("page") || 1;
  const pageCurrentActive = document.querySelector(`[button-pagination = '${pageCurrent}']`);
  pageCurrentActive.parentNode.classList.add("active");
}

// end phân trang


// Đổi trạng thái
const listButtonStatusChange = document.querySelectorAll("[button-changeStatus]");
if (listButtonStatusChange.length > 0){
  console.log(listButtonStatusChange.length);
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
}

// end thay đổi trạng thái nhiều sản phẩm