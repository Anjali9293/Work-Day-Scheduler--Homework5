const Today = moment().format("dddd, MMMM Do YYYY");
const currentHour = parseInt(moment().format("H")); 

function convert12To24Hour(num) {
    return parseInt(moment(num, ["h A"]).format("HH"))
}

function savetextContent(event){
    const textarea = $(event.currentTarget.parentElement).find("textarea")[0];
    const hour = $(event.currentTarget.parentElement).find("div")[0].textContent;
    const id = convert12To24Hour(hour);
    const value = $(textarea).val();
    localStorage.setItem("item-" + Today + '-' + id, value)
}

function loadTimeBlocks() {
    const $textArea = $("textarea");

    $textArea.each(function(key, value) {
        const hour = $(value.parentElement).find("div")[0].textContent;
        const id = convert12To24Hour(hour);
        const text = localStorage.getItem("item-" + Today + '-' + id) || "";
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

  loadTimeBlocks();
  $("#currentDay").html(Today);
  $("button").on("click", savetextContent);

});
  



