//REFACTOR FOR ES6

//ADD ITEMS TO LIST FUNCTION
let id_counter = 0;
let trash = document.getElementsByClassName("remove");
let name = document.querySelectorAll(".input");
let trashArray = Array.from(trash);
// console.log(trash);
// console.log(name);
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function createNewID(){
  return   uuidv4();
}

var submit1 = document.getElementById("add1");
var submit2 = document.getElementById("add2");
var submit3 = document.getElementById("add3");

trashArray.forEach(function(element){
  element.addEventListener('click', function(){
    list_id = element.parentNode.parentNode.id
    const name = element.parentNode.innerText.trim();
    fetch('/delete',{
      method:'delete',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        dataType: "json",
        'name': name,
        'collection_id': list_id
      })
    })
    .then(response => {
      if (response.ok){
          window.location.reload(true)
      }
    })
  });
});

submit1.addEventListener('click', function () {
  add_item(get_input_value('items1'), 'list1')
})

submit2.addEventListener('click', function () {
  add_item(get_input_value('items2'), 'list2')
})

submit3.addEventListener('click', function () {
  add_item(get_input_value('items3'), 'list3')
})


let get_input_value = function(id){
  return document.getElementById(id).value
}


let add_item = function(text, collection){
    let simpleId = createNewID();
    fetch('/add_item', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'simpleId':simpleId,
        'name': text,
        'collection_id':collection
      })
    })
    .then(response => {
      if (response.ok){
          console.log(response)
          window.location.reload(true)
      }

    })
}


let update_item = function(element){

   let simpleId = $(element).find("span")[0].id;
   let name = $(element).find("span")[0].innerText;
   let collection_id =  $(element)[0].parentElement.id

     fetch('/update', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'simpleId': simpleId,
        'name': name,
        'collection_id': collection_id
      })
    })
    .then(response => {
      if (response.ok){
        window.location.reload(true)
      }
    })
}

//mouse enter
$("ul").on("click", "li", function(e){
  $(this).find(".edit").removeClass("hidden")
  edit($(this));
})

//mouse leave
$("ul").on("mouseleave","li",function(event){
  //$(".edit").addClass("hidden");
})

//edit
function edit(element){
  console.log($(element).find("span"))
  $(element).find("span").attr("contentEditable", true).focus();

  $(element).find("button").on("click", function(e){
    update_item(element);
    $(this).addClass("hidden");
  })

}
