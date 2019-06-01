$(document).ready(function() {
    var characterList = [
        {
            name: "T Block",
            image: "assets/images/t-block.png",
            hp: 100,
            attackPower: 5,
            counterAttackPower: 15,
        }, {
            name: "S Block",
            image: "assets/images/s-block.png",
            hp: 110,
            attackPower: 10,
            counterAttackPower: 20,
        }, {
            name: "Z Block",
            image: "assets/images/z-block.png",
            hp: 120,
            attackPower: 20,
            counterAttackPower: 25,
        }, {
            name: "O Block",
            image: "assets/images/o-block.png",
            hp: 130,
            attackPower: 30,
            counterAttackPower: 30,
        }
    ];

    //place characters in character select
    function gameCharacters() {
        for (var i = 0; i < characterList.length; i++) {
            var choice = $("<div>");
            choice.addClass("choice");
            choice.append("<img src='" + characterList[i].image + "'><p>" + characterList[i].name + "</p>");
            $(".character-select").append(choice);
        }
    }
    gameCharacters();

    $(".choice").on("click", function() {
        $(this).addClass("active");
        //removes text from textbox
        $(".textbox p").remove();
        $(".textbox").prepend("<p>* Please select the tetrimino you wish to defeat.</p>")
    })

//     $(".start").on("click", function() {
//         $(".character-select").hide();
//         $(".start").hide();
//         $(".options").show();
//         $(".textbox").show();
//         $(".textbox").append("<p>* You have been challenged by " + enemyCharacter + ".</p>")
//     })

//     //attack enemy
//     $(".attack").on("click", function() {
//         //clear child elements
//         $(".textbox").empty();
//         $(".textbox").append("<p>* " + characterChosen + " attacked for " + damageNumber +
//                             " damage.</p><p>* " + enemyCharacter + " attacked for " + damageNumber
//                             + " damage.</p>");
//         //change hp bar width
//         //multiply current hp by 100 and divide by total hp
//         //subtract number from current hp bar width
//         var win = false;
//         //if enemy hp is <= 0, win
//         if (win) {
//             $(".textbox").empty();
//             $(".textbox").append("<p>* You have defeated the enemy! Press restart to play again!</p>");
//         } else {
//             $(".textbox").empty();
//             $(".textbox").append("<p>* You have been defeated by the enemy! Press restart to play again!</p>");        
//         }
//     })

//     //restart game
//     $(".restart").on("click", function() {
//         //restart window
//     })
 })