document.addEventListener("DOMContentLoaded", function () {
    const slideshow = document.querySelector('.slideshow-container');
    slideshow.classList.add('loop');
});

// Handlebars.registerHelper('formatDate', function (date, format) {
//     var m = moment(date);
//     return m.format(format);
// });

function show_hide() {
    var click = document.getElementById("list-items");
    if (click.style.display === "none") {
       click.style.display = "block";
    } else {
       click.style.display = "none";
    }
 }