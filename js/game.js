var game = new Phaser.Game(300, 300, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });
var score = new Phaser.Game(50,300, Phaser.AUTO, 'score', { preload: preloadScore, create: createScore });
var cursors;
var dudette;
var pokemon = [];
var allSprites = [];
var map, layer;
var currDir = 'down';
var directions = ['left', 'right', 'up', 'down'];

function preload() {
    game.load.tilemap('map', 'assets/tilemaps/grass.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('slice50_50', 'assets/tilemaps/tiles/slice50_50.png');

    game.load.image('tree', 'assets/tilemaps/trees/tree1.png');
    game.load.image('house1', 'assets/tilemaps/houses/house1.png');
    game.load.image('house2', 'assets/tilemaps/houses/house2.png');

    preloadSprites(game);
}

function create() {
    cursors = game.input.keyboard.createCursorKeys();
    map = game.add.tilemap('map');
    layer = map.createLayer('Tile Layer 1');
    game.physics.setBoundsToWorld();
    map.addTilesetImage('slice50_50');


    game.world.setBounds(0, 0, 500, 500);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    dudette = getDudette(game, cursors);
    dudette.animations.play('stand-'+currDir, 5, true);
    pokemon = getPokemon(game);

    var house1 = game.add.tileSprite(200, 30, 59, 70, 'house1');
    game.physics.enable(house1, Phaser.Physics.ARCADE);
    house1.body.collideWorldBounds = true;
    house1.body.immovable = true;
    house1.body.collideWorldBounds = true;
    house1.body.immovable = true;

    var house2 = game.add.tileSprite(40, 200, 59, 70, 'house2');
    game.physics.enable(house2, Phaser.Physics.ARCADE);
    house2.body.collideWorldBounds = true;
    house2.body.immovable = true;
    house2.body.collideWorldBounds = true;
    house2.body.immovable = true;

    allSprites = [
        addTree(game, 30,30),
        addTree(game, 70, 50),
        addTree(game, 100, 100),
        addTree(game, 300, 300),
        addTree(game, 250, 300),
        addTree(game, 330, 250),
        dudette,
        house1,
        house2].concat(pokemon);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(dudette);
}

function update() {
    $.each(allSprites, function(index, sprite) {
        if (sprite.update) {
            sprite.update();
        }
    });

    game.physics.arcade.collide(dudette, pokemon, function(hero, pokeSprite) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.A) && hero.model.pokemon.length < 6) {
            hero.model.pokemon.push(pokeSprite.model);
            pokeSprite.kill();
            pokemon.splice(pokemon.indexOf(pokeSprite), 1);
            allSprites.splice(allSprites.indexOf(pokeSprite), 1);
            caughtPokemon();
        }
    });

    for (var i=0; i<allSprites.length; i++) {
        for (var j=i+1; j<allSprites.length; j++) {
            game.physics.arcade.collide(allSprites[i], allSprites[j]);
        }
    }

    if (pokemon.length == 0) {
        pokemon = getPokemon(game);
        allSprites = allSprites.concat(pokemon);
    }
}

function preloadScore() {
    score.load.tilemap('score', 'assets/tilemaps/score.json', null, Phaser.Tilemap.TILED_JSON);
    score.load.image('slice59_59', 'assets/tilemaps/tiles/slice59_59.png');

    preloadSprites(score);
    score.spriteHeight = 10;
}

function createScore() {
    var scoremap = score.add.tilemap('score');
    var layer = scoremap.createLayer('Tile Layer 1');
    scoremap.addTilesetImage('slice59_59');

}

function caughtPokemon() {
    var caught = dudette.model.pokemon[dudette.model.pokemon.length-1]
    var sprite = score.add.sprite(10, score.spriteHeight, caught.name, 6);
    score.spriteHeight += sprite.height + 10;
}