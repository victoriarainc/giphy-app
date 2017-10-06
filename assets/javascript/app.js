var topics = ["cabbage", "pizza", "tacos", "beer", "whiskey", "coffee", "ice cream", "peanut butter",
	"sushi", "honey", "leaves", "nuts", "vodka", "wine", "cake", "hot dog"]

// initial function to populate the DOM with buttons from topics array, pull relevant gifs from giphy
$(document).ready(function() {
	for (var i = 0; i < topics.length; i++) {
		$("<button>").text(topics[i]).attr("data-value", topics[i]).addClass("buttonStyle btn btn-lg").appendTo("#topicButtons");
	}
})

$(document).on("click", ".buttonStyle", clickedAButton);

$(document).on("click", ".gifImg", doSomethingWithGif);

$(document).on("click", "#gifBtnText", addANewSearchBtn);

function clickedAButton() {
	$("#gifsDiv").empty();

		var choice = $(this).attr("data-value"); 
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" 
			+ choice + "&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(cheese){
			console.log(cheese);
			for (var i = 0; i < 10; i++) {				
				var imgRatingDiv = $("<div>").addClass("imgRating");
				var imgTag = $("<img>");

				$("<p>").text("Rating: " + cheese.data[i].rating).addClass("ratingInfo").appendTo(imgRatingDiv);

				imgTag.addClass("gifImg");
				imgTag.attr("src", cheese.data[i].images.fixed_width_still.url);
				imgTag.attr("data-state", "still");
				imgTag.attr("data-stillURL", cheese.data[i].images.fixed_width_still.url);
				imgTag.attr("data-animURL", cheese.data[i].images.fixed_width.url);
				imgTag.appendTo(imgRatingDiv);

				imgRatingDiv.appendTo("#gifsDiv");
			}
		})
}

// function that swaps gif state and url for still and animate
function doSomethingWithGif() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		state = $(this).attr("data-state", "animate");
		$(this).attr("src", $(this).attr("data-animURL"));
	}

	else if (state === "animate") {
		state = $(this).attr("data-state", "still");
		$(this).attr("src", $(this).attr("data-stillURL"));
	}
}

// pushes new words to topics, renders it to the DOM 
function addANewSearchBtn() {
	event.preventDefault();
	topics.push($("#newTextBtn").val());
	$("#topicButtons").empty();

	for (var i = 0; i < topics.length; i++) {
		$("<button>").text(topics[i]).attr("data-value", topics[i]).addClass("buttonStyle btn btn-lg")
			.appendTo("#topicButtons");
	}
}