$(document).ready(function() {
    var characterList = [
        {
            name: "T Block",
            id: "t-block",
            image: "assets/images/t-block.png",
            hp: 100,
            attackPower: 5,
            counterAttackPower: 15,
        }, {
            name: "S Block",
            id: "s-block",
            image: "assets/images/s-block.png",
            hp: 110,
            attackPower: 10,
            counterAttackPower: 20,
        }, {
            name: "Z Block",
            id: "z-block",
            image: "assets/images/z-block.png",
            hp: 120,
            attackPower: 20,
            counterAttackPower: 25,
        }, {
            name: "O Block",
            id: "o-block",
            image: "assets/images/o-block.png",
            hp: 130,
            attackPower: 30,
            counterAttackPower: 30,
        }
    ];

    var characterChosen = false;
    var enemyChosen = false;
    var characterID;
    var enemyID;
    var characterObject = [];
    var enemyObject = [];

    //place characters in character select screen
    function gameCharacters() {
        for (var i = 0; i < characterList.length; i++) {
            var character = $("<div>");
            character.attr("id", characterList[i].id);
            character.append("<img src='" + characterList[i].image + "'><p>" + characterList[i].name +
            "</p><span>HP " + characterList[i].hp +"</span>");
            var choice = $("<div>");
            choice.addClass("choice");
            choice.append(character);
            $(".character-select").append(choice);
        }
    }
    gameCharacters();

    $(".choice").on("click", function() {
        //select your character first
        if (characterChosen === false && enemyChosen === false) {
            characterChosen = true;
            $(this).addClass("active");
            characterID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === characterID) {
                    characterObject.push(characterList[index]);
                }
            })
            $(".textbox p").remove();
            $(".textbox").prepend("<p>* Please select the tetrimino you wish to defeat.</p>");
        //then select enemy
        } else if (characterChosen === true && enemyChosen === false) {
            enemyChosen = true;
            $(this).addClass("active");
            enemyID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === enemyID) {
                    enemyObject.push(characterList[index]);
                }
            })
            $(".textbox p").remove();
            var questions = $("<div>");
            questions.addClass("questions");
            questions.append("<p class='continue'>Continue</p><p class='restart'>Restart</p>");
            $(".textbox").prepend(questions);
            $(".textbox").prepend("<p>* Are you sure you would like to continue with this match up?</p>");
            //start battle
            $(".continue").on("click", function() {
                gameStart();
            })
            //refresh window
            $(".restart").on("click", function() {
                restart();
            })
        }
    })

    function gameStart() {

    }

    //reloads window
    function restart() {
        location.reload();
    }


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