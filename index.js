const getColorBtn = document.getElementById("get-btn")
const colorPicker = document.getElementById("color-input")
const colorContainerEl = document.getElementById("colors")
const colorSchemeTypeEl = document.getElementById("select-menu")
const clipboardMessageEl = document.getElementById("clipboard-message")
// TODO  : 
// change scheme when i select a new mode
// set a random scheme as deafault when i refresh the page

let myScheme =  []





// CHECK FOR ANY CHANGES IN THE DROPDOWN MENU

colorSchemeTypeEl.addEventListener( "change",(e)=> {
    
    handleDropDownMenu(e.target.value)
})

// GET SCHEME BTN CLICKS

getColorBtn.addEventListener("click", (e)=> {
   
    handleGetSchemeBtn()

})

// CHECK FOR <hr> ELEMENTS CLICK

document.addEventListener("click" , (e)=> {

    
    if ( e.target.dataset.name){
 
        handleCopyToClipboard(e.target.dataset.name)
    }
})



// RENDER A DEFAULT SCHEME WHEN PAGE IS REFRESH

function renderDefault(){

    fetch(`https://www.thecolorapi.com/scheme?hex=000000&mode=monochrome&count=5`, {method: "GET"})
    .then(res => res.json())
    .then(data =>   {  
      
       myScheme = data.colors
       for (let i of myScheme) {
            colorContainerEl.innerHTML += `<hr data-name="${i.hex.value}" style=" background:${i.hex.value}" class="color">
                                       <p class="color-hex">${i.hex.value}</p>`
        }
    })


}


function handleGetSchemeBtn(){
    //CLEAR THE THE COLOR SCHEME
    colorContainerEl.innerHTML = ""
     // GET THE COLOR HEX WITHOUT THE "#" BC THE URL DOESNT WORK WITH THE "#"
    const color =  colorPicker.value.split("#")
    color.shift()
    // GET  THE SELECT MODE IN THE  DROPDOWN MENU
    const mode = colorSchemeTypeEl.options[colorSchemeTypeEl.selectedIndex].text
 
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode.toLowerCase()}&count=5`, {method: "GET"})
    .then(res => res.json())
    .then(data =>   {  myScheme = data.colors 
  
      for (let i=0 ; i<myScheme.length;i++){
      
            colorContainerEl.innerHTML += `<hr data-name="${myScheme[i].hex.value}" style=" background:${myScheme[i].hex.value}" class="color">
                                          <p class="color-hex">${myScheme[i].hex.value}</p>`
     
      }
  })

}


function handleDropDownMenu(mode){

         //CLEAR THE THE COLOR SCHEME
      colorContainerEl.innerHTML = ""
   
        // GET THE COLOR HEX WITHOUT THE "#" BC THE URL DOESNT WORK WITH THE "#"
      const color = colorPicker.value.split("#")
      color.unshift()
    
    
      fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode.toLowerCase()}&count=5`, {method: "GET"})
      .then(res => res.json())
      .then(data => {  
          
          myScheme = data.colors
        
          for (let i of myScheme){
             
                colorContainerEl.innerHTML += `<hr data-name="${i.hex.value}" style=" background:${i.hex.value}" class="color">
                                             <p class="color-hex">${i.hex.value}</p>`
          }
           
      })
}


function handleCopyToClipboard(name){

    navigator.clipboard.writeText(name);
    clipboardMessageEl.innerHTML = `<p>Copied<br>${name}</p>`
  
    clipboardMessageEl.classList.toggle("hidden")
    
    setTimeout( (e)=> {
        
        clipboardMessageEl.classList.toggle("hidden")
        
    }, 1000)

}


renderDefault()

















