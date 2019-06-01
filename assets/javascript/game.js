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
    var enemyName;
    var characterObject = {};
    var enemyObject = {};
    var turn = 1;
    var playerHpElement;
    var enemyHpElement;
    var enemyRemaining = characterList.length - 1;

    //place characters in character select screen
    function gameCharacters() {
        for (var i = 0; i < characterList.length; i++) {
            var choice = $("<div>").addClass("choice choice-hover");
            var character = $("<div>").attr("id", characterList[i].id);
            var characterImage = $("<img>").attr("src", characterList[i].image);
            var characterName = $("<p>").text(characterList[i].name);
            var characterHP = $("<span>").text("HP " + characterList[i].hp);
            character.append(characterImage).append(characterName).append(characterHP);
            choice.append(character);
            $(".character-select").append(choice);
        }
    }
    gameCharacters();

    $(".choice").on("click", function() {
        //select your character first
        if (characterChosen === false && enemyChosen === false) {
            characterChosen = true;
            $(this).addClass("player-character");
            //push object into character object
            characterID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === characterID) {
                    characterObject = characterList[index];
                }
            })

            //player selection
            var pointerContainer = $("<div>").addClass("pointer-container");
            var pointer = $("<div>").addClass("pointer");
            var characterNumber = $("<span>").text("P1");
            var pointerDown = $("<i>").addClass("fas fa-caret-down");
            pointer.append(characterNumber).append(pointerDown);
            pointerContainer.append(pointer);
            $(this).prepend(pointerContainer);

            $(".textbox p").remove();
            $(".textbox").prepend("<p>* Please select the tetrimino you wish to defeat.</p>");
        //then select enemy
        } else if (characterChosen === true && enemyChosen === false) {
            enemyChosen = true;
            $(this).addClass("enemy-character");
            $("div").removeClass("choice-hover");
            //push object into enemy object
            enemyID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === enemyID) {
                    enemyObject = characterList[index];
                }
            })
            enemyName = enemyObject.name;

            //enemy selection
            var pointerContainer = $("<div>").addClass("pointer-container");
            var pointer = $("<div>").addClass("pointer");
            var characterNumber = $("<span>").text("CPU");
            var pointerDown = $("<i>").addClass("fas fa-caret-down");
            pointer.append(characterNumber).append(pointerDown);
            pointerContainer.append(pointer);
            $(this).prepend(pointerContainer);

            $(".textbox p").remove();
            //show on first turn only
            if (turn === 1) {
                var questions = $("<div>").addClass("questions");
                var continueButton = $("<span>").addClass("continue").text("Continue");
                var restartButton = $("<span>").addClass("restart").text("Restart");
                questions.append(continueButton).append(restartButton);
                $(".textbox").prepend(questions);
                $(".textbox").prepend("<p>* Are you sure you would like to continue with this match up?</p>");
            } else {
                gameStart();
            }
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
        $(".player-character").insertBefore($(".choice").first());
        $(".enemy-character").insertAfter($(".choice").first());
        
        var options = $("<div>").addClass("options");
        var optionItems = $("<div>").addClass("option-items");
        var attackButton = $("<span>").addClass("attack").text("Attack");
        var restartButton = $("<span>").addClass("restart").text("Restart");
        optionItems.append(attackButton).append(restartButton);
        options.append(optionItems);
        $(".menu").prepend(options);
        
        $(".textbox").css("width", "77%");
        $(".textbox div").remove();
        $(".textbox p").remove();
        $(".textbox").prepend("<p>* You have challenged the " + enemyName + " to a battle!</p>");
        
        $(".attack").on("click", function() {
            attack();
        })
        $(".restart").on("click", function() {
            restart();
        })
    }

    function attack() {
        if (characterObject.hp > 0 && enemyObject.hp > 0) {
            $(".textbox p").remove();
            $(".textbox").append("<p>* You attacked for <span>" + characterObject.attackPower * turn + "</span> damage.</p>");
            $(".textbox").append("<p>* " + enemyName + " attacked for <span>" + enemyObject.counterAttackPower + "</span> damage.</p>");
            characterObject.hp = characterObject.hp - enemyObject.counterAttackPower;
            enemyObject.hp = enemyObject.hp - (characterObject.attackPower * turn);
            //selects player hp
            playerHpElement = $(".player-character").children().children("span");
            playerHpElement.text("HP " + characterObject.hp);
            //selects enemy hp
            enemyHpElement = $(".enemy-character").children().children("span");
            enemyHpElement.text("HP " + enemyObject.hp);
            turn++;
        }
        if (characterObject.hp > 0 && enemyObject.hp <= 0) {
            enemyRemaining--;
            win();
            turn++;
        } else if (characterObject.hp <= 0 && enemyObject.hp > 0) {
            lose();   
        } else if (characterObject.hp <= 0 && enemyObject.hp <= 0) {
            tie();
        }
    }

    //reloads window
    function restart() {
        location.reload();
    }

    function win() {
        enemyHpElement.text("HP 0");
        enemyChosen = false;
        $(".enemy-character").remove();
        $(".options").remove();
        $(".choice").addClass("choice-hover");
        $(".textbox").css("width", "100%");
        $(".textbox p").remove();
        //change ending message
        if (enemyRemaining > 0) {
            $(".textbox").prepend("<p>* " + enemyName + " have been defeated!</p><p>* Please select the next tetrimino you wish to defeat.</p>");
        } else {
            $("div").removeClass("choice-hover");
            var questions = $("<div>").addClass("questions");
            var yesButton = $("<span>").addClass("restart").text("Yes");
            var noButton = $("<span>").addClass("no").text("No");
            questions.append(yesButton).append(noButton);
            $(".textbox").prepend(questions);     
            $(".textbox").prepend("<p>* You defeated all of the tetriminos!</p><p>* Would you like to play again?</p>");
            $(".restart").css("margin", "0 30px");
            $(".no").css("margin", "0 30px");

            $(".no").on("click", function() {
                $(".textbox p").remove();
                $(".textbox div").remove();
                $(".textbox").append("<p>* Congrats on winning and thank you for playing!</p>");
            })
        }
    }

    function lose() {
        playerHpElement.text("HP 0");
        $(".textbox p").remove();
        $(".textbox").prepend("<p>* You have been defeated!</p><p>* Press restart to try again.</p>");
    }

    function tie() {
        playerHpElement.text("HP 0");
        enemyHpElement.text("HP 0")
        $(".textbox p").remove();
        $(".textbox").prepend("<p>* You knocked each other out!</p><p>* Press restart to try again.</p>");
    }
 })