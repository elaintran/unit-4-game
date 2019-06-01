$(document).ready(function() {
    var characterList = [
        {
            name: "character1",
            hp: 100,
            attackPower: 5,
            counterAttackPower: 15,
        }, {
            name: "character2",
            hp: 110,
            attackPower: 10,
            counterAttackPower: 20,
        }, {
            name: "character3",
            hp: 120,
            attackPower: 20,
            counterAttackPower: 25,
        }, {
            name: "character4",
            hp: 130,
            attackPower: 30,
            counterAttackPower: 30,
        }
    ];

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
// })