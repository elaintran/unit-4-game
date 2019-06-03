$(document).ready(function() {
    var characterList = [
        {
            name: "T Block",
            id: "t-block",
            image: "assets/images/t-block.png",
            hp: 100,
            attackPower: 8,
            counterAttackPower: 20,
        }, {
            name: "S Block",
            id: "s-block",
            image: "assets/images/s-block.png",
            hp: 110,
            attackPower: 10,
            counterAttackPower: 18,
        }, {
            name: "Z Block",
            id: "z-block",
            image: "assets/images/z-block.png",
            hp: 120,
            attackPower: 12,
            counterAttackPower: 16,
        }, {
            name: "O Block",
            id: "o-block",
            image: "assets/images/o-block.png",
            hp: 130,
            attackPower: 14,
            counterAttackPower: 14,
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
            //reassign object into character object
            characterID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === characterID) {
                    characterObject = characterList[index];
                }
            })
            //player selection pointer
            addPointer("P1", this);
            //update textbox
            $(".textbox p").remove();
            $(".textbox").append("<p>* Please select the tetrimino you wish to defeat.</p>");
        //then select enemy
        } else if (characterChosen === true && enemyChosen === false) {
            enemyChosen = true;
            $(this).addClass("enemy-character");
            $("div").removeClass("choice-hover");
            //reassign object into enemy object
            enemyID = $(this).children()[0].id;
            $.each(characterList, function(index) {
                if (characterList[index].id === enemyID) {
                    enemyObject = characterList[index];
                }
            })
            enemyName = enemyObject.name;
            //enemy selection pointer
            addPointer("CPU", this);
            //update textbox
            $(".textbox p").remove();
            //show on first turn only
            if (turn === 1) {
                var questions = $("<div>").addClass("questions");
                var continueButton = $("<span>").addClass("continue").text("Continue");
                var restartButton = $("<span>").addClass("restart").text("Restart");
                questions.append(continueButton).append(restartButton);
                $(".textbox").append("<p>* Are you sure you would like to continue with this match up?</p>").append(questions);
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

    function addPointer(characterType, element) {
        var pointerContainer = $("<div>").addClass("pointer-container");
        var pointer = $("<div>").addClass("pointer");
        var characterNumber = $("<span>").text(characterType);
        var pointerDown = $("<i>").addClass("fas fa-caret-down");
        pointer.append(characterNumber).append(pointerDown);
        pointerContainer.append(pointer);
        $(element).prepend(pointerContainer);
    }

    function gameStart() {
        //display player character first
        $(".player-character").insertBefore($(".choice").first());
        //display enemy character second
        $(".enemy-character").insertAfter($(".choice").first());
        //creates battle menu
        var options = $("<div>").addClass("options");
        var optionItems = $("<div>").addClass("option-items");
        var menuButtonOne = $("<div>").addClass("menu-button");
        var menuButtonTwo = $("<div>").addClass("menu-button");
        var attackButton = $("<span>").text("Attack");
        var restartButton = $("<span>").text("Restart");
        //check width for mobile and browser view
        function checkWidth() {
            if ($(window).width() > 606) {
                attackButton.addClass("attack");
                restartButton.addClass("restart");
                menuButtonOne.removeClass("attack");
                menuButtonTwo.removeClass("restart");
                $(".textbox").css("width", "77%");
            } else {
                attackButton.removeClass("attack");
                restartButton.removeClass("restart");
                menuButtonOne.addClass("attack");
                menuButtonTwo.addClass("restart");
                $(".textbox").css("width", "100%");
            }
        }
        checkWidth();
        //runs only on resize so need to call function first
        $(window).resize(checkWidth);
        menuButtonOne.append(attackButton);
        menuButtonTwo.append(restartButton);
        optionItems.append(menuButtonOne).append(menuButtonTwo);
        options.append(optionItems);
        $(".menu").append(options);
        //update textbox
        $(".textbox div").remove();
        $(".textbox p").remove();
        $(".textbox").append("<p>* You have challenged the " + enemyName + " to a battle!</p>");
        //battle options
        $(".attack").on("click", function() {
            attack();
        })
        $(".restart").on("click", function() {
            restart();
        })
    }

    function attack() {
        //if both still alive
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
        $(".enemy-character").remove();
        $(".options").remove();
        $(".choice").addClass("choice-hover");
        //override the other window resize
        function checkWidth() {
            $(".textbox").css("width", "100%");
        }
        checkWidth();
        $(window).resize(checkWidth);
        $(".textbox p").remove();
        //change ending message
        if (enemyRemaining > 0) {
            //continue fighting if enemies remaining
            enemyChosen = false;
            $(".textbox").append("<p>* " + enemyName + " have been defeated!</p><p>* Please select the next tetrimino you wish to defeat.</p>");
        } else {
            $("div").removeClass("choice-hover");
            //end game textbox
            var questions = $("<div>").addClass("questions");
            var yesButton = $("<span>").addClass("restart").text("Yes");
            var noButton = $("<span>").addClass("no").text("No");
            questions.append(yesButton).append(noButton);
            $(".textbox").append("<p>* You are the Tetris master!</p><p>* Would you like to play again?</p>").append(questions);     
            $(".restart").css("margin", "0 30px");
            $(".no").css("margin", "0 30px");
            $(".restart").on("click", function() {
                restart();
            })
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
        $(".textbox").append("<p>* You have been defeated!</p><p>* Press restart to try again.</p>");
    }

    function tie() {
        playerHpElement.text("HP 0");
        enemyHpElement.text("HP 0")
        $(".textbox p").remove();
        $(".textbox").append("<p>* You knocked each other out!</p><p>* Press restart to try again.</p>");
    }
 })