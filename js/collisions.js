// collision layer from map - the 213's represent collision blocks (gold coins in map editor) Easier to print array and have collision blocks pushed into canvas then 
//try to create a javaScript map. Especially given all my walls and planned traps
const collisionBlocks1 = [
    213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,
    213,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,213,213,0,0,0,213,213,213,0,0,0,0,0,213,
    213,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,0,213,0,0,0,0,213,213,0,0,213,0,0,213,
    213,0,0,213,213,0,0,0,213,0,0,0,0,0,0,0,0,213,0,0,0,0,213,213,213,0,0,0,0,213,
    213,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,0,0,0,213,0,0,0,213,0,0,0,0,213,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,213,0,0,213,213,213,213,213,0,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,0,0,0,0,213,
    213,213,0,0,0,0,0,0,0,0,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,0,0,0,0,213,
    213,213,0,0,0,0,0,0,0,0,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,0,0,0,0,213,
    213,213,0,0,0,0,0,0,0,0,0,0,0,213,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,213,0,0,213,213,213,213,213,213,213,213,213,213,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,213,0,0,213,213,0,0,213,0,0,0,0,0,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,0,0,0,213,213,0,0,213,0,0,0,0,0,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,0,0,0,213,213,0,0,213,0,0,0,0,0,0,0,0,213,0,0,0,0,213,213,0,0,0,0,0,213,
    213,0,213,0,213,0,0,0,213,0,0,0,0,213,0,0,0,213,0,0,0,0,213,213,0,0,213,0,0,213,
    213,0,0,0,213,0,0,0,213,0,0,0,0,0,0,0,0,0,0,0,0,0,213,213,0,0,0,0,0,0,
    213,0,0,0,213,0,0,0,213,213,0,0,0,0,0,0,0,0,0,0,0,0,213,213,0,0,0,0,0,0,
    213,0,0,0,213,0,0,0,213,213,0,0,0,0,0,0,0,0,0,0,0,213,213,213,0,213,0,0,0,0,
    213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213
    ]

    // want to count to 30 (length of each row) and then begin new row to insert collision block.
    Array.prototype.parse2D = function() {
        const rows = []
        for (let i = 0; i < this.length; i+=30) {
            rows.push(this.slice(i, i + 30))
        }
    
        return rows
    }
    
    const collisionBlocks = []


    // create collision blocks. Was successful until I added Sprites, so left here. The blosk are 32 x 32, same as the 
    //sprite resolution to fit properly on backgorun image. This was a surprise and I had to play with 960x640 res.. had collision blocls drawn in the wrong spaced.
    class CollisionBlock {
        constructor({position}) {
            this.position = position
            this.width = 32
            this.height = 32
        }

    draw() {
        // adjust color to track collision blocks. I needed to see them when drawn. Will change to opacity 0 or simply line out in finished game.
        c.fillStyle = 'rgba(255, 0, 0, 0.3)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
