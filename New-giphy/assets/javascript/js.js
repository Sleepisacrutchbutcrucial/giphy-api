console.log("hello world");

function findGiphs(search) {

    return $.ajax({ url: "https://api.giphy.com/v1/gifs/search?apiKey=WmumnQ0W7kZkC2CUvxWCuQTyKXN9mAob&limit=10&q=" + search })


}

function renderButtons(topics) {
    $("#buttons").append(
        topics.map(function (topic) {
            return $("<button>").attr("data-search", topic).text(topic);
        })
    )
}
$("#addTopic").submit(function (e) {
    e.preventDefault();
    var el = $("#addTopic input");
    renderButtons([el.val()]);
    //resets imput on submit btn
    el.val("");
})
var initTopics = ["penguin", "wolf"];
renderButtons(initTopics);

$("#buttons").on("click", "button", function (e) {

    findGiphs(e.target.dataset.search).done(function (response) {

        var data = response.data;

        var list = data.map(function (item) {

            var animatedURL = item.images.original.url;

            var stillURL = item.images.original_still.url;
            return $("<img>").attr("src", stillURL)
                .on("click", function (event) {

                    var image = $(event.target);
                    var isAnimated = image.attr("src") === animatedURL;

                    if (isAnimated) {
                        image.attr('src', stillURL);

                    } else {
                        image.attr('src', animatedURL);

                    }
                })
        });

        $("#container").html(list);

    });

})

