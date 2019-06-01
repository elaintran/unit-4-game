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
    var characterName;
    var enemyName;
    var removeIndex;
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
            //var characterName = 
            //push object into character array
            characterID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === characterID) {
                    characterObject.push(characterList[index]);
                    //removeIndex = index;
                    //console.log(characterList);
                }
            })
            characterList.splice(characterList[removeIndex], 1);
            console.log(characterList);
            characterName = characterObject[0].name;
            $(".textbox p").remove();
            $(".textbox").prepend("<p>* Please select the tetrimino you wish to defeat.</p>");
        //then select enemy
        } else if (characterChosen === true && enemyChosen === false) {
            enemyChosen = true;
            $(this).addClass("active");
            //reset object for each enemy
            enemyObject = [];
            //push object into enemy array
            enemyID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === enemyID) {
                    enemyObject.push(characterList[index]);
                    //console.log(characterList[2]);
                    //removeIndex = index;
                    //console.log(removeIndex);
                }
            })
            //console.log(characterList.splice(characterList[1], 1));
            //characterList.splice(characterList[1], 1);
            //console.log(characterList);
            enemyName = enemyObject[0].name;
            $(".textbox p").remove();
            var questions = $("<div>");
            questions.addClass("questions");
            questions.append("<span class='continue'>Continue</span><span class='restart'>Restart</span>");
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
        var options = $("<div>");
        options.addClass("options");
        //options.append("<div class='options-items'><p>Attack</p><p>Restart</p></div>");
        options.append("<div class='options-items'><span>Attack</span><span class='restart'>Restart</span></div>");
        $(".menu").prepend(options);
        $(".textbox").css("width", "77%");
        $(".textbox div").remove();
        $(".textbox p").remove();
        $(".textbox").prepend("<p>* You have challenged the " + enemyName +
        " to a battle!</p>");
        $(".restart").on("click", function() {
            restart();
        })
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

 })