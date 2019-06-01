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

    var characterChosen = false;
    var enemyChosen = false;

    //place characters in character select
    function gameCharacters() {
        for (var i = 0; i < characterList.length; i++) {
            var choice = $("<div>");
            choice.addClass("choice");
            choice.append("<img src='" + characterList[i].image + "'><p>" + characterList[i].name +
            "</p><span>HP " + characterList[i].hp +"</span>");
            $(".character-select").append(choice);
        }
    }
    gameCharacters();

    $(".choice").on("click", function() {
        //select your character
        if (characterChosen === false && enemyChosen === false) {
            characterChosen = true;
            $(this).addClass("active");
            $(".textbox p").remove();
            $(".textbox").prepend("<p>* Please select the tetrimino you wish to defeat.</p>");
        //select enemy
        } else if (characterChosen === true && enemyChosen === false) {
            enemyChosen = true;
            $(this).addClass("active");
            $(".textbox p").remove();
            var questions = $("<div>");
            questions.addClass("questions");
            questions.append("<div class='answer-container'><i class='fas fa-caret-right continue-caret'></i><p class='continue'>Continue</p></div><div class='answer-container'><i class='fas fa-caret-right restart-caret'></i><p class='restart'>Restart</p></div>");
            $(".textbox").prepend(questions);
            $(".textbox").prepend("<p>* Are you sure you would like to continue with this match up?</p>");
            $(".continue").hover(function() {
                $(".continue-caret").show();
            }, function() {
                $(".continue-caret").hide();
            })
            $(".restart").hover(function() {
                $(".restart-caret").show();
            }, function() {
                $(".restart-caret").hide();
            })
        }
    })


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