// 1. default topics
var topics = ["art", "nature", "music"];
var topicId;
var newTopic;

// 2. Create button row

function renderButtons() {
  // delete what was there first
  $(".buttons").empty();

  //loop thru array of movies for initial buttons
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>").attr("id", i).text(topics[i]).css({
      "padding": "1%",
      "font-size": "100%"
    });
    $(".buttons").append(button);

  }
  $(".button").css("margin-left", "40%");
}; //closes render buttons

/// 3. GRAB IMAGES --- 
$(".buttons").on("click", function(event) {
  console.log("button clicked");
  // topicId = $(this).attr("id");
  topicId = event.target.id;
  topics[topicId];

  // Construct search variable
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    topics[topicId] + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Ajax request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {
      // store the data in the results variable
      var results = response.data;
      var imageDiv;
      $("#image-here").empty();
      // Looping through each result item from gathered data
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag

        imageDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var image = $("<img>");

        // Setting the src attribute of the image to a property pulled off the result item
        image.attr({
          "src": results[i].images.fixed_height.url,
          "data-still": results[i].images.fixed_height_still.url,
          "data-animate": results[i].images.fixed_height.url,
          "data-state": "animate"
        }).addClass("gif").css("width", "60%");

        // Appending the paragraph and image tag to the animalDiv
        imageDiv.append(p);
        imageDiv.prepend(image).css("float", "left");

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#image-here").prepend(imageDiv);
      } //for loop

      $("img").on("click", function() {
        console.log("add image");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      }); // close still-animate click event

    }) //done function??? 
}); //click event
// I HAD ABOVE TWO AFTER THE DONE-FOR LOOP WITHIN THE FIRST EVENT BUT DIDN'T WORK.  

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// This function handles events where one button is clicked
$("#add-button").on("click", function(event) {
  console.log("add button")
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  newTopic = $("#new-button").val().trim();
  $("#new-button").val("");
  // The movie from the textbox is then added to our array
  topics.push(newTopic);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();

}); //closes  add-button click event

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();