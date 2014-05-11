function addTree(game, x, y) {
    var tree = game.add.tileSprite(x, y, 36, 48, 'tree');
    game.physics.enable(tree, Phaser.Physics.ARCADE);
    tree.body.collideWorldBounds = true;
    tree.body.immovable = true;
    tree.body.collideWorldBounds = true;
    tree.body.immovable = true;

    return tree;
}