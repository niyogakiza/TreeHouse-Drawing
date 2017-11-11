//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
//Draw lines declaration
var context =$canvas[0].getContext("2d");//$canvas[0] this get the first element in canvas
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls ").on("click","li",function(){
    //Deselect siblings elements
    $(this).siblings().removeClass("selected");
    //Select clicked element
    $(this).addClass("selected");
    //cache current color
    color = $(this).css("background-color");
});
//When new color is pressed
// language=JQuery-CSS
$("#revealColorSelect").click(function(){
    changeColor();
    $("#colorSelect").toggle();
});
//Update the new color
function changeColor(){
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    // rgb syntax is the same as writing in hex
    $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}
//When color sliders change
// language=JQuery-CSS
$("input[type=range]").change(changeColor);
//When add color is pressed
$("#addNewColor").click(function(){
    //Append the color to the controls ul
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    // language=JQuery-CSS
    $(".controls ul").append($newColor);
    //Select new color
    $newColor.click();
});

$canvas.mousedown(function(e){
lastEvent = e;
mouseDown = true;
}).mousemove(function(e){
    //Draw Lines
    if(mouseDown){
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.stroke();
        lastEvent = e;
    }
}).mouseup(function(){
    mouseDown = false;
}).mouseleave(function(){
    $canvas.mouseup();
});


