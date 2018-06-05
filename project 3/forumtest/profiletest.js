function deleteGame() {
    $("#deleteGame").on("click", function () {
        var id = $(this).attr("data-id");

        $.ajax({
            url: "/Games/DeleteGame" + id,
            type: "Delete"
        })
    }).then(
        function() {
            console.log("deleted game");
            displayGames();
        }
    )
}


const classHighlight = "highlight";

                    let selection = $(".gameSelection").on("click", function () {
                        const id = $(this).attr("data-id");
                        selection.removeClass(classHighlight);
                        $(this).addClass(classHighlight);
                        console.log(id);
                        $("#addGameBtn").on("click", function () {
                            //Ideally we want to just HIGHLIGHT the current game selection, and then ADD it when we PRESS this button.
                            if ($(".highlight")[0]) {
                                console.log(id);
                                console.log("im highlighted");
                            }
                            // $('#gameSearchModal').modal('hide');
                            // getUserGames();
                            // location.reload();
                        });

                        // $.ajax({
                        //     url: "/Games/InsertGame",
                        //     method: "POST",
                        //     data: {id},
                        //     success: response => {
                        //         console.log(response);
                        //         $('#gameSearchModal').modal('hide');
                        //         getUserGames();
                        //     }
                        // });
                    });