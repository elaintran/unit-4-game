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
            var choice = $("<div>");
            choice.addClass("choice choice-hover");
            
            var character = $("<div>");
            character.attr("id", characterList[i].id);
            
            var characterImage = $("<img>");
            characterImage.attr("src", characterList[i].image);
            
            var characterName = $("<p>");
            characterName.text(characterList[i].name);
            
            var characterHP = $("<span>");
            characterHP.text("HP " + characterList[i].hp);
            
            character.append(characterImage).append(characterName).append(characterHP);
            choice.append(character);
            $(".character-select").append(choice);
        }
    }
    gameCharacters();

    // $(".choice").hover(function() {
    //     $(".player-container").show();
    // })

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

            var pointerContainer = $("<div>");
            pointerContainer.addClass("pointer-container");
            
            var pointer = $("<div>");
            pointer.addClass("pointer");

            var characterNumber = $("<span>");
            characterNumber.text("P1");

            var pointerDown = $("<i>");
            pointerDown.addClass("fas fa-caret-down");

            pointer.append(characterNumber).append(pointerDown);
            pointerContainer.append(pointer);
            $(this).prepend(pointerContainer);

            $(".textbox p").remove();
            $(".textbox").prepend("<p>* Please select the tetrimino you wish to defeat.</p>");
        //then select enemy
        } else if (characterChosen === true && enemyChosen === false) {
            enemyChosen = true;
            $(this).addClass("enemy-character");
            //push object into enemy object
            enemyID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === enemyID) {
                    enemyObject = characterList[index];
                }
            })
            enemyName = enemyObject.name;

            var pointerContainer = $("<div>");
            pointerContainer.addClass("pointer-container");
            
            var pointer = $("<div>");
            pointer.addClass("pointer");

            var characterNumber = $("<span>");
            characterNumber.text("CPU");

            var pointerDown = $("<i>");
            pointerDown.addClass("fas fa-caret-down");

            pointer.append(characterNumber).append(pointerDown);
            pointerContainer.append(pointer);
            $(this).prepend(pointerContainer);

            $(".textbox p").remove();
            if (turn === 1) {
                var questions = $("<div>");
                questions.addClass("questions");
                
                var continueButton = $("<span>");
                continueButton.addClass("continue");
                continueButton.text("Continue");
                
                var restartButton = $("<span>");
                restartButton.addClass("restart");
                restartButton.text("Restart");
                
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
        var options = $("<div>");
        options.addClass("options");
        
        var optionItems = $("<div>");
        optionItems.addClass("option-items");
        
        var attackButton = $("<span>");
        attackButton.addClass("attack");
        attackButton.text("Attack");
        
        var restartButton = $("<span>");
        restartButton.addClass("restart");
        restartButton.text("Restart");
        
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
        if (characterObject.hp > 0 && enemyObject.hp < 0) {
            enemyRemaining--;
            win();
            turn++;
        } else if (characterObject.hp <= 0 && enemyObject.hp > 0) {
            lose();   
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
        $(".textbox").css("width", "100%");
        $(".textbox p").remove();
        //change ending message
        if (enemyRemaining > 0) {
            $(".textbox").prepend("<p>* " + enemyName + " have been defeated!</p><p>* Please select the next tetrimino you wish to defeat.</p>");
        } else {
            $(".textbox").prepend("<p>* You defeated all of the tetriminos!</p><p>* Would you like to play again?</p>");
            $("div").removeClass("active");
            $("div").removeClass("choice-hover");
        }
    }

    function lose() {
        playerHpElement.text("HP 0");
        $(".textbox p").remove();
        $(".textbox").prepend("<p>* You have been defeated!</p><p>* Press restart to try again.</p>");
    }
 })