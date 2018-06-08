// a function to dynamically create elements on the dom(page).
function create(value,counter){
  counts++;
    let elementOne=document.createElement("p");
  let content=document.createTextNode(value);
  elementOne.appendChild(content);
  elementOne.setAttribute("id","par"+counter);
  elementOne.setAttribute("class","font");
  elementOne.style.textDecoration=localStorage.getItem("par"+counter);
  let createDiv=document.createElement("div");
  createDiv.setAttribute("id","para"+counter);
  createDiv.setAttribute("class","overflow");
  let createOuterDiv=document.createElement("div");
  createOuterDiv.setAttribute("id","contain"+counter);
  createOuterDiv.setAttribute("class","container");
  createDiv.appendChild(elementOne);
  createOuterDiv.appendChild(createDiv);
  let outerDiv=document.getElementById("contain");
  let insertBefore=document.getElementById("containx");
  outerDiv.insertBefore(createOuterDiv,insertBefore);

  let tick=document.createElement("i");
  tick.setAttribute("class","fas fa-check-circle fa-lg");
  tick.style.color=localStorage.getItem("tick"+counter);
  let tickdiv=document.createElement("div");
  tickdiv.setAttribute("class","tick");
  tickdiv.setAttribute("id","tick"+counter);
  tickdiv.appendChild(tick);
  createOuterDiv.appendChild(tickdiv);

   let cross=document.createElement("i");
  cross.setAttribute("class","far fa-times-circle fa-lg");
  let crossdiv=document.createElement("div");
  crossdiv.setAttribute("class","cross");
  crossdiv.setAttribute("id",counter);
  crossdiv.appendChild(cross);
  createOuterDiv.appendChild(crossdiv);

}

let counts=0;//a variable to count number of times create function(above function) is called.


let click=document.getElementById("button");
let add=localStorage.getItem("count"); // a variable to keep count of the elements created.

if (add==null)  /* An if statement to figure out if the program is running for the first time.If yes then assigned 1 to it to
                keep count and if not  variable is updated and create function is called on a loop to update the dom with
                 information stored in local storage */
  add=1;

else{
 add=localStorage.getItem("count");
  for(let i=1;i<add;i++){
  if(localStorage.getItem("text"+i)!=null )
  create(localStorage.getItem("text"+i),i);


}

}

//to make and update elements in the dom(page) when the add button is clicked
click.addEventListener("click",function(a){
  a.preventDefault();
  let b=document.querySelector("#input").value;
  if(b!==localStorage.getItem("text"+(add-1))&&b!==""&&b.trim().length>0) { /*checks if the previously entered input is same as the current one and
                                                          does not run if it is */
  
   create(b,add);
   clearit(0);  //function called to check the condition in fun
  document.getElementById("input").value="";
  let selectDel=document.getElementById(add);       //to delete selected element on click of cross icon
    selectDel.addEventListener("click",function(){
      counts--;                                     //counts is decremented since element is deleted
      let rem=this.parentNode;
      clearit(600);                                 //
      rem.style.backgroundColor="#fc3a3a";          //changes the color of the selected element

  setTimeout(function(){                            //timeoutfunction to get an effect similar to an animation which deletes the element
    rem.parentNode.removeChild(rem);
  },600) ;

      localStorage.removeItem("text"+this.id);     //removes the info from local storage
    });

    let ticksel=document.getElementById("tick"+add);

    ticksel.addEventListener("click",function(){       // to change the color of check icon when it is clicked and change striking of text
     let striked=this.parentNode.firstChild.firstChild;

      if(this.firstChild.style.color!=="green"){      //changes the color to green if it is not already
      striked.style.textDecoration="line-through";
      this.firstChild.style.color="green";
      localStorage.setItem(this.id,"green");
      localStorage.setItem(striked.id,"line-through");
      }

    else
       {
      striked.style.textDecoration="none";
      this.firstChild.style.color="#A8A8A8";
         localStorage.setItem(this.id,"#A8A8A8");
          localStorage.setItem(striked.id,"none");
       }

    });

  localStorage.setItem("text"+add,b);
  add++;
  localStorage.setItem("count",add);
}

});

let deleted=document.querySelectorAll(".cross");    //code deletes the elements 
for(var i=0;i<deleted.length;i++){


deleted[i].addEventListener("click",function(){
   counts--;
  let remove=this.parentNode;
  remove.style.backgroundColor="#fc3a3a";
  clearit(600);

  setTimeout(function(){
    remove.parentNode.removeChild(remove);
  },600) ;

  localStorage.removeItem("text"+this.id);


});
}
let tickselect=document.querySelectorAll(".tick");


for(let j=0;j<tickselect.length;j++){

  tickselect[j].addEventListener("click",function(){
    let strike=this.parentNode.firstChild.firstChild;
   // alert(strike.id);

    //strike.appendChild(strike);
     console.log(strike);
     if( this.firstChild.style.color!=="green")
    {
      this.firstChild.style.color="green";
      localStorage.setItem(this.id,"green");
      strike.style.textDecoration="line-through";
      localStorage.setItem(strike.id,"line-through");

    }
    else{


      this.firstChild.style.color="#A8A8A8";
      localStorage.setItem(this.id,"#A8A8A8");
      strike.style.textDecoration="none";
       localStorage.setItem(strike.id,"none");
    }

  });
}
//function to to check if the elements in dom is above 1 and display clear all button if it is and hides the button if it is below
function clearit(time){



setTimeout(function(){
  if(counts<2)
  document.getElementById("clear").style.display="none";

else
 document.getElementById("clear").style.display="block";


},time);
}

clearit(0);

let clearAll=document.getElementById("clear");
clearAll.addEventListener("click",function(){
  localStorage.clear();
  counts=0;

  let buttonclear=document.getElementById("clear");
  let timecount=0;
  let getclear=document.querySelectorAll(".container")

//a loop to delete all elements when clear button is clicked.
  for (var i =0;i<getclear.length;i++) {
   timecount=275*(i+1);
    (function (i) {
    setTimeout(function () {

     getclear[i].style.backgroundColor="#fc3a3a";
     },275*(i+0.4));
    })(i);

  (function (i) {
    setTimeout(function () {

     getclear[i].parentNode.removeChild(getclear[i]);
     },275*(i+1));
    })(i);
   }
  //alert(timecount);
  setTimeout(function(){
    buttonclear.style.display="none";
  },timecount);


});