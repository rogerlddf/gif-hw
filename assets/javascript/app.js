 var topics = ["Jay Z", "Kanye West", "50 Cent"];

     function displayGifs() {
     $('#gifs-view').find('*').not('.active').remove();

    var searchTerm = $(this).text().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=VhUpHYUEXh5tHH8BsuMddk7jdYP6tSpO&q=" + searchTerm + "&limit=25" ;

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          console.log(response);
          // Creating a div to hold the movie
           for (var i = 0; i < 25; i++) {
        
           

          var gifDiv = $("<div class='gif-blk carousel-item'>");

          // var rating = response.Rated;

          

          // Creating an element to have the rating displayed
          var rateDiv = $("<div>");
          rateDiv.addClass("rate-lbl");
          rateDiv.text("Rating: " + response.data[i].rating);

          // Displaying the rating
          gifDiv.append(rateDiv);

          // Retrieving the URL for the image
          var imgURL = response.data[i].images.original.url;
          var stillUrl = response.data[i].images.original_still.url;

          // Creating an element to hold the image
          var image = $("<img>");
          image.attr("src", stillUrl);
          image.attr("data-still", stillUrl);
          image.attr("data-animate", imgURL);
          image.attr("data-state", "still");
          image.addClass("gif");


          // Appending the image
          gifDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#gifs-view").prepend(gifDiv);
          }

        });


      }


   var renderBtns = function(){
$("#buttons-cont").empty();

  for (var i = 0; i < topics.length; i++){
    var buttonGif = $("<button>");
    buttonGif.addClass("gif-btn");
    buttonGif.attr("id", "input");
    buttonGif.append(topics[i]);
    buttonGif.attr("data-search", topics[i]);
    $("#buttons-cont").append(buttonGif);
  }

  }

   $("#add-topic").on("click", function(event) {

    var input = $("#search-input").val().trim();
    topics.push(input);
            
    renderBtns();
    return false;

    });

    function imageChangeState() {          

      var state = $(this).attr("data-state");
      var animateImage = $(this).attr("data-animate");
      var stillImage = $(this).attr("data-still");

      if(state == "still") {
          $(this).attr("src", animateImage);
          $(this).attr("data-state", "animate");
      }

      else if(state == "animate") {
          $(this).attr("src", stillImage);
          $(this).attr("data-state", "still");
      }   
  }

  $(document).on("click", ".gif", imageChangeState);
  $(document).on("click", "#input", displayGifs);


    // $(".gif-btn").on("click", function() {
     

    //  });

      renderBtns();
      displayGifs();