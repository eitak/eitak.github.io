$.getScript('js/model.js');

var dudeSpeed = 50;
var pokemonSpeed = 30;
var sprites = {};
var pokeSprites = {
    charmader:  [2,6,1,4,0,3,5,7],
    snorlax: [2,6,1,4,0,5,3,7]
};

function preloadSprites(game) {
    game.load.spritesheet('dudette', 'assets/sprites/dudette.png', 27, 27);
    game.load.spritesheet('charmander', 'assets/sprites/charmander.png', 19, 17);
    game.load.spritesheet('snorlax', 'assets/sprites/snorlax.png', 27, 27);
    game.load.spritesheet('wigglytuff', 'assets/sprites/wigglytuff.png', 19, 20);
    game.load.spritesheet('pikachu', 'assets/sprites/pikachu.png', 17, 18);
    game.load.spritesheet('bulbasaur', 'assets/sprites/bulbasaur.png', 19, 16);
}

function getDudette(game, cursors) {
    var dudette = game.add.sprite(150, 100, 'dudette');
    dudette.model = heroModel;

    dudette.animations.add('walk-down', [0,3,6,3], 5, true);
    dudette.animations.add('stand-down', [3]);

    dudette.animations.add('walk-up', [1,4,7,4], 5, true);
    dudette.animations.add('stand-up', [4]);

    dudette.animations.add('walk-left', [2,5,8,5], 5, true);
    dudette.animations.add('stand-left', [5]);

    dudette.animations.add('walk-right', [9,10,11,10], 5, true);
    dudette.animations.add('stand-right',[10]);

    game.physics.enable(dudette, Phaser.Physics.ARCADE);
    dudette.immovable = true;
    dudette.body.collideWorldBounds = true;

    dudette.update = function() {
        dudette.body.velocity.x = 0;
        dudette.body.velocity.y = 0;

        if (cursors.left.isDown) {
            dudette.moveLeft();
        } else if (cursors.right.isDown) {
            dudette.moveRight();
        } else if (cursors.up.isDown) {
            dudette.moveUp();
        } else if (cursors.down.isDown) {
            dudette.moveDown();
        } else {
            dudette.animations.play('stand-' + dudette.body.currDir);
        }
    };

    addDirections(dudette, dudeSpeed);
    return dudette;
}

function getPokemon(game) {
    var pokemon = [
        [game.add.sprite(200, 200, 'charmander'), [2,6,1,4,0,3,5,7], 'charmander'],
        [game.add.sprite(500, 300, 'snorlax'), [2,6,1,4,0,5,3,7], 'snorlax'],
        [game.add.sprite(600, 100, 'pikachu'), [1,4,2,3,6,7,0,5], 'pikachu'],
        [game.add.sprite(0, 0, 'bulbasaur'), [5,6,1,4,2,3,0,7], 'bulbasaur'],
        [game.add.sprite(100, 1000, 'wigglytuff'), [2,6,1,4,0,5,3,7], 'wigglytuff']
    ];

    $.each(pokemon, function(index, data) {
        var pokemonChar = data[0];
        var dirs = data[1];
        var name = data[2];

        pokemonChar.animations.add('walk-down', [dirs[0],dirs[1]], 5, true);
        pokemonChar.animations.add('stand-down', [dirs[0]]);

        pokemonChar.animations.add('walk-up', [dirs[2],dirs[3]], 5, true);
        pokemonChar.animations.add('stand-up', [dirs[2]]);

        pokemonChar.animations.add('walk-left', [dirs[4],dirs[5]], 5, true);
        pokemonChar.animations.add('stand-left', [dirs[4]]);

        pokemonChar.animations.add('walk-right', [dirs[6],dirs[7]], 5, true);
        pokemonChar.animations.add('stand-right',[dirs[6]]);

        game.physics.enable(pokemonChar, Phaser.Physics.ARCADE);
        pokemonChar.body.collideWorldBounds = true;
        pokemonChar.immovable = true;

        pokemonChar.steps = 0;

        pokemonChar.update = function() {
            pokemonChar.body.velocity.x = 0;
            pokemonChar.body.velocity.y = 0;

            var direction;
            if (pokemonChar.steps < 100) {
                direction = pokemonChar.body.currDir;
                pokemonChar.steps += 1;
            } else {
                direction = directions[Math.floor(Math.random()*directions.length)];
                pokemonChar.steps = 0;
            }

            if (direction == 'up') {
                pokemonChar.moveUp();
            } else if (direction == 'down') {
                pokemonChar.moveDown();
            } else if (direction == 'right') {
                pokemonChar.moveRight();
            } else if (direction == 'left') {
                pokemonChar.moveLeft();
            }
        };
        addDirections(pokemonChar, pokemonSpeed);
        pokemonChar.model = getPokemonModel(name);
    });

    return pokemon.map(function(x) {return x[0]});
}

function addDirections(sprite, speed) {
    sprite.moveLeft = function () {
        sprite.animations.play('walk-left');
        sprite.body.velocity.x = -1 * speed;
        sprite.body.currDir = 'left';
    };
    sprite.moveRight = function () {
        sprite.animations.play('walk-right');
        sprite.body.velocity.x = speed;
        sprite.body.currDir = 'right';
    };
    sprite.moveUp = function () {
        sprite.animations.play('walk-up');
        sprite.body.velocity.y = -1 * speed;
        sprite.body.currDir = 'up';
    };
    sprite.moveDown = function () {
        sprite.animations.play('walk-down');
        sprite.body.velocity.y = speed;
        sprite.body.currDir = 'down';
    }
}