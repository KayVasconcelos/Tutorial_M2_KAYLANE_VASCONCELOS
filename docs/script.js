$(document).ready(function() {
    var image = $("#image");
    
    image.hover(function() {
      
      $(this).animate({ width: "400px", height: "400px" }, 200);
    }, function() {
      
      $(this).animate({ width: "500px", height: "500px" }, 200);
    });
  });
 
$(document).ready(function() {
    alert('BEM VINDE!');
});