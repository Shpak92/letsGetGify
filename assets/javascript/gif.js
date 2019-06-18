$(document).ready(function() {
    //Creating array to populate animals
    var animals = [
        "cats", "dogs", "rhinos", "mouse", "snakes", "rabbits", 
        "frogs", "lions", "tigers"
    ];   
    // To add the buttons to the page
    function addAnimals (animalArray, gifClass, dataAdd)
    {
        $(dataAdd).empty();
        
        for (var i = 0; i < animalArray.length; i++) {
            var newAnimal = $("<button>");
            newAnimal.addClass(gifClass);
            newAnimal.attr("data-type", animalArray[i]);
            newAnimal.text(animalArray[i]);
            $(dataAdd).append(newAnimal);
        }
    }
    
    $(document).on("click",".gifBtn", function()
    {
    $("#gifsPhotos").empty();
    $(".gifBtn").removeClass("active");
    $(this).addClass("active");
   
    var animal =$(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search";
    var api_key = "X2qWALsGzhililYQYOjsLJF69wvVarZw";
    var giphySearch = queryURL + "?" + "q=" + animal + "&api_key="+ api_key;  

    $.ajax({
        url: giphySearch,
        method: "GET"
      })
    .then(function(response) {
        var results = response.data;
        console.log(results);

        
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");

            var rating = results[0].rating;

            var p= $("<p>").text("Rating: " + rating);


          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var gifImage = $("<img>");
          gifImage.attr("src", still);
          gifImage.attr("data-still", still);
          gifImage.attr("data-animate", animated);
          gifImage.attr("data-state", "still");
          gifImage.addClass("clickGif");

          animalDiv.append(p);
          animalDiv.append(gifImage);

          $("#gifsPhotos").append(gifImage);
            }
          });
        });
        $(document).on("click", ".clickGif", function() {


    var gifMotion = $(this).attr("data-state");

    if (gifMotion === "still")
    {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      $("#add-gif").on("click", function(event)
      {
        event.preventDefault();
        var newAnimalGif = $("input").eq(0).val();
    
        if (newAnimalGif.length > 2) {
          animals.push(newAnimalGif);
        
        }
        
        addAnimals(animals, "gifBtn", "#gifBtn");

        });

        addAnimals(animals, "gifBtn", "#gifBtn");
        });


    

      
