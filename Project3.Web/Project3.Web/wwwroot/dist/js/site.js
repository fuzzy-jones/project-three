"use strict";

var Forum = function () {
    function init() {
        initEventHandlers();
    }

    function initEventHandlers() {
        submitThread();
    }

    function submitThread() {
        $("#submitThread").on("click", function (event) {
            event.preventDefault();
            var newThread = {
                Name: $("#modalThreadTitle").val().trim()
            };

            var newPost = {
                Content: $("#modalPost").val().trim()
            };

            console.log(newThread, newPost);

            $("#displayThreads").append("<tr>" + "<td><a class='artTitle' href='#'>" + newThread.Name + "</a></td>" + "<td class='align'>" + "MarioFan4ever" + "</td>" + "<td class='align'>" + "Just now" + "</td>" + "<td class='align'>" + "Just now" + "</td>" + "</tr>");

            // Send the POST request to create new thread.

            // $.ajax("/api/thread/", {
            //     type: "POST",
            //     data: newThread
            // }).then(
            //     function() {
            //         console.log("added new thread");
            //         $.ajax("/api/thread//post", {
            //             type: "POST",
            //             data: newPost
            //         }).then(
            //             function() {
            //                 console.log("added new post");
            //                 // Reload the page
            //                 location.reload();
            //             }
            //         );
            //     }
            // );
        });
    }

    function displayThreads() {
        if ($("#displayThreads")[0]) {
            // get data for  threads
            $.ajax({
                url: "/api/thread/",
                method: "GET",
                success: function success(data) {
                    console.log(data);

                    // empty to displayThreads before adding new content
                    $("#displayThreads").empty();
                    // if the data is not there, then return an error message
                    if (!data) {
                        $("#displayThreads").append("<h2> I'm sorry, but there aren't any threads yet</h2>");
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            $("#displayThreads").append("<tr>" + "<td><a class='artTitle' href='#'>" + data[i].Name + "</a></td>" + "<td class='align'>" + data[i].userName + "</td>" + "<td class='align'>" + data[i].Created + "</td>" + "<td class='align'>" + data[i].LastActivity + "</td>" + "</tr>");
                        }
                    }
                },
                error: function error(xhr, status, _error) {
                    console.log(xhr);
                    console.log(status);
                    console.log(_error);
                }
            });
        }
    }

    return {
        init: init
    };
}();

$(function () {
    Forum.init();
});
"use strict";

var Header = function () {
  function init() {
    initEventHandlers();
  }

  function initEventHandlers() {
    forumDropdown();
    userDropdown();
  }

  function forumDropdown() {
    $("#forumsBtn").on("click", function (event) {
      event.preventDefault();
      document.getElementById("forumsDrpDwn").classList.toggle("show");
    });
  }

  function userDropdown() {
    $("#userBtn").on("click", function (event) {
      event.preventDefault();
      document.getElementById("userDrpDwn").classList.toggle("show");
    });
  }

  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  return {
    init: init
  };
}();

$(function () {
  Header.init();
});

// function showUserMenu() {
//   document.getElementById("userDrpDwn").classList.toggle("show");
// }

// function showForums() {
//   document.getElementById("forumsDrpDwn").classList.toggle("show");
// }
"use strict";
// Just a comment to have something in file so files push
"use strict";
"use strict";

var Profile = function () {

    function init() {
        initEventHandlers();
        getUserGames();
    }

    function initEventHandlers() {
        searchGames();
        checkValue();
        valueModalClose();
    }

    function searchGames() {

        $("#searchGameForm").on("submit", function (e) {
            e.preventDefault();

            var name = $(".gameTitle").val().trim();

            $.ajax({
                url: this.action,
                method: this.method,
                data: { name: name },
                success: function success(response) {
                    // console.log(response);
                    $("#gameReturn").html("");
                    for (var _i = 0; _i < response.length; _i++) {
                        // array for platforms to push into for each games
                        var platformArray = [];
                        // console.log(platformArray);

                        var platforms = response[_i].platforms;
                        // console.log(platforms);

                        for (var _i2 = 0; _i2 < platforms.length; _i2++) {
                            platformArray.push(platforms[_i2]);
                            // console.log(platforms[j].platformName);
                            // $(".platformReturn").append(`
                            // <div class="platformSelection" style="padding-left: 25px; color: black; display: none;">${platforms[j].platformName}</div>
                            // `)
                        }

                        // creating a li to insert into the ul below
                        var list = void 0;
                        for (var _i3 = 0; _i3 < platformArray.length; _i3++) {
                            list += "<li class='platformListItem' platform-name='" + platformArray[_i3].platformName + "'>" + platformArray[_i3].platformName + "</li>";
                        }

                        // append a list of platforms to append into the gamesReturn div
                        $("#gameReturn").append("\n                        <div class=\"gameSelection\" data-id=\"" + response[_i].gameId + "\">" + response[_i].name + "</div>\n                        <div class=\"platformReturn\" style=\"padding-left: 25px; color: black;\">\n                            <ul class=\"platformList\" style=\"display: none;\">\n                                " + list + "\n                            </ul>\n                        </div>\n                        ");
                    }

                    // highlight game selection
                    var gameSelection = $(".gameSelection").on("click", function () {
                        var gameHighlight = "gameHighlight";
                        var id = $(this).attr("data-id");
                        gameSelection.removeClass(gameHighlight);
                        $(this).addClass(gameHighlight);
                        // console.log(id);

                        // show the platforms list that is hidden
                        // $(".platformList").show();
                    });

                    // highlight platform selection

                    // let platformListItem = $(".platformListItem").on("click", function () {
                    //     const platformHighlight = "platformHighlight";
                    //     const platformName = $(this).attr("platform-name");
                    //     platformListItem.removeClass(platformHighlight);
                    //     $(this).addClass(platformHighlight);
                    //     console.log(platformName);
                    // });
                }
            });
        });

        $("#addGameBtn").on("click", function () {
            var id = $(".gameHighlight").attr("data-id");
            // console.log("game highlighted: " + id);
            // let platformChosen = $(".platformHighlight").attr("platform-name");
            //     console.log("platform highlighted: " + platformChosen);
            $.ajax({
                url: "/Games/InsertGame",
                method: "POST",
                data: { id: id },
                success: function success(response) {
                    // console.log(response);
                    $('#gameSearchModal').modal('hide');
                    getUserGames();
                    location.reload();
                }
            });
        });
    }

    function getUserGames() {
        $.ajax({
            url: "/Games/GameInfo",
            method: "GET",
            success: function success(response) {
                // console.log(response);
                $("#displayGames").html("");
                for (var i = 0; i < response.length; i++) {

                    // console.log(response[i].platforms);

                    // everything commented below makes the ebay api work

                    // let gameName = response[i].name;
                    // // console.log(gameName);

                    // let value= [];
                    // // console.log(value);

                    // const settings = {
                    //     "async"      : true,
                    //     "crossDomain": true,
                    //     "url"        : "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?RESPONSE-DATA-FORMAT=JSON&keywords=" + gameName + "&categoryId=139973",
                    //     "method"     : "GET",
                    //     "headers"    : {
                    //         "X-EBAY-SOA-SERVICE-VERSION" : "1.13.0",
                    //         "X-EBAY-SOA-OPERATION-NAME"  : "findCompletedItems",
                    //         "X-EBAY-SOA-SECURITY-APPNAME": "FuzzyJon-RetroGam-PRD-92cc9f5ed-70036e56",
                    //         "Cache-Control"              : "no-cache",
                    //         "Postman-Token"              : "2533f0d4-46b4-4ae3-90c5-bfa1c936774a"
                    //     }
                    // };

                    // $.ajax(settings).done(function (response) {
                    //     const results = JSON.parse(response);
                    //     // console.log(results);
                    //     const items = results.findCompletedItemsResponse[0].searchResult[0].item;
                    //     const priceArray = [];

                    //     for (let i = 0; i < items.length; i++) {
                    //         // console.log(items[i]);
                    //         const sellingState = items[i].sellingStatus[0].sellingState;
                    //         const sellingPrice = items[i].sellingStatus[0].currentPrice[0].__value__;
                    //         // console.log(sellingState);
                    //         // var sum = 0;
                    //         if (sellingState == "EndedWithSales") {
                    //             // console.log("true");
                    //             // console.log(sellingPrice);
                    //             priceArray.push(sellingPrice);
                    //             // console.log(priceArray);
                    //         }
                    //     }
                    //     // console.log(priceArray);

                    //     let sum = 0;

                    //     for (let j = 0; j < priceArray.length; j++) {
                    //         sum += parseInt(priceArray[j]);
                    //     }

                    //     const average = sum / priceArray.length;
                    //     // console.log(sum);
                    //     // console.log("game name: " + gameName + "game price: " + average);

                    //     const averagePrice = average.toFixed(2);
                    //     console.log("game: " + gameName + " / price: $" + averagePrice);

                    //     value.push(averagePrice);
                    //     console.log(value); 

                    // });

                    $("#displayGames").append("\n                        <div class=\"game-grid-container\" data-id=\"" + response[i].gameId + "\">\n                            <div id=\"gameStats\" class=\"row\">\n                                <div class=\"col-sm-3 gameName\">\n                                    <strong>TITLE: </strong>" + response[i].name + "\n                                </div>\n                                <div class=\"col-sm-2 gameValue\">\n                                    <img id=\"coin\" src=\"https://media0.giphy.com/media/yCyVbqru5Ggfu/giphy.gif\">\n                                    <strong>EST. VALUE: </strong> $ ???\n                                </div>\n                                <div class=\"col-sm-2 gameCondition dropdown-toggle\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                    <strong id=\"conditionBtn\" role=\"button\">EST. CONDITION: </strong> GOOD\n                                    <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"dropdownMenuButton\">\n                                    <a class=\"dropdown-item\" href=\"#\">\n                                        <img class=\"lifeHeart\" scr=\"https://pbs.twimg.com/profile_images/554699922138624000/0AopZpk4_400x400.png\">\n                                    </a>\n                                    <a class=\"dropdown-item\" href=\"#\">4 HEARTS</a>\n                                    <a class=\"dropdown-item\" href=\"#\">3 HEARTS</a>\n                                    <a class=\"dropdown-item\" href=\"#\">2 HEARTS</a>\n                                    <a class=\"dropdown-item\" href=\"#\">1 HEART</a>\n                                    </div>\n                                </div>\n                                <div class=\"col-sm-2 gamePlatform\">\n                                    <strong>PLATFORM: </strong>" + response[i].platforms[0].platformName + "\n                                </div>\n                                <div class=\"col-sm-2 actions\">\n                                    <img id=\"edit\" src=\"https://png.icons8.com/metro/1600/edit-property.png\" role=\"button\">\n                                    <img id=\"save\" src=\"https://cdn4.iconfinder.com/data/icons/STROKE/computer_gadgets/png/400/floppy_disk.png\" role=\"button\">\n                                    <img id=\"delete\" src=\"https://png.icons8.com/metro/1600/delete.png\" role=\"button\">\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-2 gameImage\">\n                                    <img class=\"\" src=\"https:" + response[i].cover + "\" alt=\"\" />\n                                </div>\n                                <br>\n                                <div class=\"col-sm-10\">\n                                    <p class='gameSummary'>\n                                    <strong>SUMMARY:</strong>" + response[i].summary + "\n                                    </p>\n                                </div>\n                            </div>\n                        </div>\n                    ");
                }
            }
        });
    }

    function checkValue() {
        $("#searchValueForm").on("submit", function (e) {
            e.preventDefault();

            var title = $(".valueGameTitle").val().trim();
            var platform = $(".valuePlatform").val().trim();
            // console.log(title);
            // console.log(platform);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?RESPONSE-DATA-FORMAT=JSON&keywords=" + title + "," + platform + "&categoryId=139973",
                "method": "GET",
                "headers": {
                    "X-EBAY-SOA-SERVICE-VERSION": "1.13.0",
                    "X-EBAY-SOA-OPERATION-NAME": "findCompletedItems",
                    "X-EBAY-SOA-SECURITY-APPNAME": "FuzzyJon-RetroGam-PRD-92cc9f5ed-70036e56",
                    "Cache-Control": "no-cache",
                    "Postman-Token": "2533f0d4-46b4-4ae3-90c5-bfa1c936774a"
                }
            };

            $.ajax(settings).done(function (response) {
                var results = JSON.parse(response);
                // console.log(results);
                var items = results.findCompletedItemsResponse[0].searchResult[0].item;
                var priceArray = [];

                for (var _i4 = 0; _i4 < items.length; _i4++) {
                    // console.log(items[i]);
                    var sellingState = items[_i4].sellingStatus[0].sellingState;
                    var sellingPrice = items[_i4].sellingStatus[0].currentPrice[0].__value__;
                    // console.log(sellingState);
                    // var sum = 0;
                    if (sellingState == "EndedWithSales") {
                        // console.log("true");
                        // console.log(sellingPrice);
                        priceArray.push(sellingPrice);
                        // console.log(priceArray);
                    }
                }
                // console.log(priceArray);

                var sum = 0;

                for (var j = 0; j < priceArray.length; j++) {
                    sum += parseInt(priceArray[j]);
                }

                var average = sum / priceArray.length;
                // console.log(sum);
                // console.log("game name: " + gameName + "game price: " + average);

                var averageValue = average.toFixed(2);
                // console.log("game: " + title + " / Value: $" + averageValue);

                $('#valueReturn').append("\n                <h5 id=\"estimatedValueText\">ESTIMATED VALUE:</h5>\n                <h5 id=\"estimatedValue\">$" + averageValue + "</h5>\n                ");
            });
        });
    }

    function valueModalClose() {
        // reloads page after closing modal to clear values
        $('#checkValueModal').on('hidden.bs.modal', function () {
            location.reload();
        });
    }

    function gameValue() {
        var gameName = response[i].name;
        // console.log(gameName);

        var value = [];
        // console.log(value);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?RESPONSE-DATA-FORMAT=JSON&keywords=" + gameName + "&categoryId=139973",
            "method": "GET",
            "headers": {
                "X-EBAY-SOA-SERVICE-VERSION": "1.13.0",
                "X-EBAY-SOA-OPERATION-NAME": "findCompletedItems",
                "X-EBAY-SOA-SECURITY-APPNAME": "FuzzyJon-RetroGam-PRD-92cc9f5ed-70036e56",
                "Cache-Control": "no-cache",
                "Postman-Token": "2533f0d4-46b4-4ae3-90c5-bfa1c936774a"
            }
        };

        $.ajax(settings).done(function (response) {
            var results = JSON.parse(response);
            // console.log(results);
            var items = results.findCompletedItemsResponse[0].searchResult[0].item;
            var priceArray = [];

            for (var _i5 = 0; _i5 < items.length; _i5++) {
                // console.log(items[i]);
                var sellingState = items[_i5].sellingStatus[0].sellingState;
                var sellingPrice = items[_i5].sellingStatus[0].currentPrice[0].__value__;
                // console.log(sellingState);
                // var sum = 0;
                if (sellingState == "EndedWithSales") {
                    // console.log("true");
                    // console.log(sellingPrice);
                    priceArray.push(sellingPrice);
                    // console.log(priceArray);
                }
            }
            // console.log(priceArray);

            var sum = 0;

            for (var j = 0; j < priceArray.length; j++) {
                sum += parseInt(priceArray[j]);
            }

            var average = sum / priceArray.length;
            // console.log(sum);
            // console.log("game name: " + gameName + "game price: " + average);

            var averagePrice = average.toFixed(2);
            console.log("game: " + gameName + " / price: $" + averagePrice);

            value.push(averagePrice);
            console.log(value);
        });
    }

    return {
        init: init
    };
}();

$(function () {
    Profile.init();
});
// Just a comment to have something in file so files push
"use strict";
// Just a comment to have something in file so files push
"use strict";