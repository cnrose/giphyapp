$(document).ready(function(){

	var emotions = ["happy", "excited", "depressed", "perplexed", "angry", "disgusted", "annoyed", "jealous"];

	function makeButtons() {
		$("#buttonArea").empty();

		for (var i = 0; i < emotions.length; i++) {
			var z = $("<button>");
			z.addClass("emotion");
			z.attr("data-name", emotions[i]);
			z.text(emotions[i]);
			$("#buttonArea").append(z);
		};
	};

	function displayGifs() {
		$("#resultsArea").empty();

		var emotion = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=dc6zaTOxFJmzC&limit=10"

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response) {
        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $("<div class='gif'>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating);
        		var emotionImage = $("<img class='gif'>");

        		emotionImage.attr("src", results[i].images.fixed_height_still.url);
        		emotionImage.attr({"data-still" : results[i].images.fixed_height_still.url});
        		emotionImage.attr({"data-state": "still"});

        		emotionImage.attr({"data-animate": results[i].images.fixed_height.url});

        		gifDiv.prepend(emotionImage);
				gifDiv.prepend(p);

        		$("#resultsArea").append(gifDiv);
        	}

        	$(".gif").on("click", function() {
				var state = $(this).attr("data-state");

				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			});
        });
	};

	

	$("#addEmotion").on("click", function(event) {
			event.preventDefault();

			var emotion = $("#emotion-input").val().trim();

			emotions.push(emotion);
			makeButtons();
	});

	$(document).on("click", ".emotion", displayGifs);

	makeButtons();
});