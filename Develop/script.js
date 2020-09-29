//using moment to get the current day in dd/mm/yy format
const currentDay = moment().format("dddd, MMMM Do YYYY");
console.log(currentDay);
//using moment to get the current hour in 24 hrs format
// const currentHour = parseInt(moment().format("H")); 
const currentHour = 15;
//function to convert time from 24 hrs format to 12 hrs format and returning just the hour as a number
function convert12To24Hour(num) {
    return parseInt(moment(num, ["h A"]).format("HH"))
}

//function to save the content of text area in local storage 
function savetextContent(event){
    const textarea = $(event.currentTarget.parentElement).find("textarea")[0]; //finding first textarea in the parent element of button 
    const hour = $(event.currentTarget.parentElement).find("div")[0].textContent;//finding textcontent of first div in the parent element of button
    const id = convert12To24Hour(hour);
    const value = $(textarea).val();
    localStorage.setItem("item-" + currentDay + '-' + id, value) //setting value of text area to local storage
}

//function to get items from the local storage and compare each textcontent of div class with currenthour and add classes past,present and future to the textarea
function loadTimeBlocks() {
    const $textArea = $("textarea");

    $textArea.each(function(key, value) {
        const hour = $(value.parentElement).find("div")[0].textContent; //finding textcontent of first div in the parent element of textarea 
        const id = convert12To24Hour(hour);
        const text = localStorage.getItem("item-" + currentDay + '-' + id) || ""; //getting content stored in local storage 
        $(value).val(text)
    
        if(id < currentHour){
            $(value).addClass("past");     
        }

        if(id > currentHour){
            $(value).addClass("future");
        }
    
        if(id == currentHour){
            $(value).addClass("present");
        } 
    });
}

$(document).ready(function() {  

  loadTimeBlocks(); // calling  function loadTimeBlocks
  $("#currentDay").html(currentDay); //adding html content to p tag with an id of currentday
  $("button").on("click", savetextContent);//adding on click eventlistener to buttons

});
  



