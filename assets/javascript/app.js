var topics = ["cabbage", "pizza", "tacos", "beer", "whiskey", "coffee", "ice cream", "peanut butter",
	"sushi", "honey", "leaves", "nuts", "vodka", "wine", "cake", "hot dog"]

$(document).ready(function() {
	for (var i = 0; i < topics.length; i++) {
		$("<button>").text(topics[i]).attr("data-value", topics[i]).addClass("buttonStyle btn btn-lg").appendTo("#topicButtons");
	}

	$(".buttonStyle").on("click", function() {
		$("#gifsDiv").empty();

		var choice = $(this).attr("data-value"); 
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" 
			+ choice + "&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(cheese){

			console.log(cheese);
			console.log(cheese.data[0].images.fixed_height_still.url);
			
			for (var i = 0; i < 10; i++) {				
				var imgRatingDiv = $("<div>").addClass("imgRating col-md-6");
				var imgTag = $("<img>");

				$("<p>").text("Rating: " + cheese.data[i].rating).addClass("ratingInfo").appendTo(imgRatingDiv);

				imgTag.addClass("gifImg").attr("src", cheese.data[i].images.fixed_width_still.url).
				attr("data-state", "still").attr("data-stillURL", cheese.data[i].images.fixed_width_still.url)
				.attr("data-animURL", cheese.data[i].images.fixed_width.url)
				.appendTo(imgRatingDiv);

				imgRatingDiv.appendTo("#gifsDiv");
			}
		})
	})
})

$(document).on("click", ".gifImg", doSomethingWithGif);

function doSomethingWithGif() {
		var state = $(this).attr("data-state");
		console.log("after click: " + state);

		if (state === "still") {
			state = $(this).attr("data-state", "animate");
			$(this).attr("src", $(this).attr("data-animURL"));
		}

		else if (state === "animate") {
			state = $(this).attr("data-state", "still");
			$(this).attr("src", $(this).attr("data-stillURL"));
		}
}

$(document).on("click", "#gifBtnText", addANewSearchBtn);

function addANewSearchBtn() {
	console.log("hi");
	event.preventDefault();
	topics.push($("#newTextBtn").val());
	$("#topicButtons").empty();

	for (var i = 0; i < topics.length; i++) {
		$("<button>").text(topics[i]).attr("data-value", topics[i]).addClass("buttonStyle btn btn-lg")
			.appendTo("#topicButtons");
	}

	$(".buttonStyle").on("click", function() {
		$("#gifsDiv").empty();

		var choice = $(this).attr("data-value"); 
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" 
			+ choice + "&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(cheese){

			console.log(cheese);
			console.log(cheese.data[0].images.fixed_height_still.url);
			
			for (var i = 0; i < 10; i++) {				
				var imgRatingDiv = $("<div>").addClass("imgRating col-md-6");
				var imgTag = $("<img>");

				$("<p>").text("Rating: " + cheese.data[i].rating).addClass("ratingInfo").appendTo(imgRatingDiv);

				imgTag.addClass("gifImg").attr("src", cheese.data[i].images.fixed_width_still.url).
				attr("data-state", "still").attr("data-stillURL", cheese.data[i].images.fixed_width_still.url)
				.attr("data-animURL", cheese.data[i].images.fixed_width.url)
				.appendTo(imgRatingDiv);

				imgRatingDiv.appendTo("#gifsDiv");
			}
		})
	})
}