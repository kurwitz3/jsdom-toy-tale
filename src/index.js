let addToy = false;
const div = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  GetToys()
  addToys()
  addLikes()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function GetToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(resp => toyClass(resp))

}

function toyClass(toys){
  toys.forEach(toy => {
    const newDiv = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const pTag = document.createElement('p')
    const button = document.createElement('button')
    const editButton = document.createElement('button')
    button.setAttribute('class','like-btn')
    editButton.setAttribute('class','edit-btn')
    newDiv.setAttribute('class', 'card')
    img.setAttribute('class','toy-avatar')
    newDiv.setAttribute('id',`${toy.id}`)
    pTag.setAttribute('class','likes')
    h2.innerText = toy.name
    img.src = toy.image
    button.innerText = ' Like <3'
    editButton.innerText = 'Edit'
    pTag.innerText = `${toy.likes} likes`
    newDiv.appendChild(h2)
    newDiv.appendChild(img)
    newDiv.appendChild(pTag)
    newDiv.appendChild(button)
    newDiv.appendChild(editButton)
    div.appendChild(newDiv)
    editButton.addEventListener('click',(e) => editToy(e,toy,h2))


  })
}
function editToy(e,toy,h2){
  // Add input field
  // Change edit button to say save
  if(e.target.innerText === 'Edit'){
  e.target.innerText = 'save'
  h2.innerHTML = `<input type='text' value='${toy.name}'></input>`
  }
  else{
    e.target.innerText = 'Edit' 
    h2.firstElementChild.value
    let formData = {
      'name':h2.firstElementChild.value
    }
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    fetch(`http://localhost:3000/toys/${toy.id}`,configObj)
    //.then(resp => resp.json())
    //.then(resp => 
    toy.name = h2.firstElementChild.value
    h2.innerHTML = toy.name

  }
}

function addToys(){
const form = document.getElementById('toy-form')
  form.addEventListener('submit',function(e){
    e.preventDefault()
    
    let formData = {
      'name':e.target.name.value,
      'image': e.target.image.value,
      'likes': 0
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    fetch('http://localhost:3000/toys',configObj)
    .then(resp => resp.json())
    .then(resp => newToy(resp))
  })
}

function newToy(toy){
  const createNewDiv = document.createElement('div')
  const newH2 = document.createElement('h2')
  const newImg = document.createElement('img')
  const newpTag = document.createElement('p')
  const newButton = document.createElement('button')
  newButton.setAttribute('class','like-btn')
  createNewDiv.setAttribute('class', 'card')
  newImg.setAttribute('class','toy-avatar')
  newpTag.setAttribute('class','likes')
  newH2.innerText = toy.name
  newImg.src = toy.image
  newButton.innerText = ' Like <3'
  newpTag.innerText = `${toy.likes} likes`
  createNewDiv.appendChild(newH2)
  createNewDiv.appendChild(newImg)
  createNewDiv.appendChild(newpTag)
  createNewDiv.appendChild(newButton)
  div.appendChild(createNewDiv)

}
function addLikes(){
const likeButton = document.querySelectorAll('.like-btn')
  document.addEventListener('click',function(e){
    if(e.target && e.target.className == 'like-btn'){
    let id = parseInt(e.target.parentElement.id)
    let likes = document.querySelectorAll('.likes')
      likes.forEach(toy => {
        if(parseInt(toy.parentElement.id) === id){
          let num = parseInt(toy.innerText)
          num++
          toy.innerText = `${num} likes`
             
          let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
             
          body: JSON.stringify({'likes': num})
          };
            fetch(`http://localhost:3000/toys/${id}`,configObj)
            .then(resp => resp.json())
            .then(data => console.log(data))
        }
      })
    }
  })
}