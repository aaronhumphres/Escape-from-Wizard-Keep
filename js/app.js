//canvas game

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//had to adjust settings to accommodate map 32x32 pixels
canvas.width = 960 //innerWidth
canvas.height = 640 // innerHeight

//modal element for start screen and button - this function fires off animate

const startGameButton = document.querySelector('#startGameButton')
const modalElement = document.querySelector('#modalElement')


// create a Sprite class so that I can build all players, monsters without having to create code for each one specifically all over again. Allows me to pull
//specific data and apply to each individual creation after

// use of {} allow me to call elements attached to constructor out of order. {position, imageSrc, frameRate, etc.}
class Sprite {
    constructor({ position, imageSrc, frameRate = 1 }) {
        this.position = position
        this.image= new Image()
        // largers sprites or possible future animations may take time to load. Need to insure they load true before continuing script.
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }
        //allows me to apply different images to each sprite
        this.image.src= imageSrc
        this.loaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrames = 0
        //framerate frequency.. adjust based on sprite. Want player to apper to run "casually"
        this.frameBuffer = 20
    }
    draw() {
        // did image load?
        if (!this.loaded)
        return
        // allows me to crop my sprite image. Some Spites are very large with many images.
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height,
        }
        // creates draw image function
        c.drawImage(
            this.image, 
            cropBox.position.x, 
            cropBox.position.y, 
            cropBox.width, 
            cropBox.height, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
            this.updateFrames()
        }
    
    updateFrames() {
            this.elapsedFrames++

        if (this.elapsedFrames % this.frameBuffer === 0) {
        if (this.currentFrame < this.frameRate - 1) this.currentFrame++
        else this.currentFrame = 0
        }
    }
}
// backgroud image - place at top kleft corner across entire canvas. 
const wizardKeep = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: 'img/wizardKeepMapwFloor.png'
})

// creates a player class with child properties from Sprite above
class Player extends Sprite {
    constructor( { imageSrc, frameRate }) {
        super({ imageSrc, frameRate })
        //this sprites position when drawn at beginning of game
        this.position = {
            x: 60,
            y: 60,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        //player is a simple square before addinging Sprite image
        //this.width = 25
        //this.height = 25
        this.sides = {
            bottom: this.position.y + this.height
        }
      

    }

    //draw() {
    //c.fillStyle = 'red'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    
    //}

    update() {
        //c.fillstyle = 'rgba(0, 0, 255, 0.5)' 
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
   
    }
}
// downloaded Sprite. Is 6 frames long. 
const player = new Player({ 
    imageSrc: 'img/Run-Sheet.png',
    frameRate: 6,
})
// create animate function
function animate() {
    //requestAnimationFrame(animate)
    //assign id to requestAnimationFrame so that I can call it when game is over.
    //I want to show a visual stop to the game.
    const animationId = requestAnimationFrame(animate)
    //c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    wizardKeep.draw()  


    player.draw()  
    player.update()

    // create end game here
    // game will stop when player reaches the end of the canvas.
    if (this.position.x + this.width >= canvas.width) {     
        console.log('YOU ESCAPED!')
        // stops animation
        cancelAnimationFrame(animationId)
        //calls id gameOver to display "YOU ESCAPED"
        document.querySelector('#gameOver').style.disply = 'flex'
    }
   
}

//animate()
startGameButton.addEventListener('click', () => {
    //console.log('start')
    animate()
    modalElement.style.display = 'none'
})


// movement  - easier to simply us letter keys as these are detected events when key is pressed. Simplier than using number assignment

window.addEventListener('keydown', ({key}) => {
    switch (key) {
         case 'w':
             player.velocity.y = -5             
             break
        case 'a':
             player.velocity.x = -5                 
             break
         case 's':
             player.velocity.y = 5 
             break
         case 'd' :
                //if (this.position.x + this.width >= canvas.width) {
                    //console.log('You escaped')
                //}
             player.velocity.x = 5
             break
         
     }
})
 // stops movement when movement key is released
 window.addEventListener('keyup', ({key}) => {
     switch (key) {
         case 'w':
             player.velocity.y = 0             
            break
         case 'a':
             player.velocity.x = 0                 
             break
         case 's':
             player.velocity.y = 0 
             break
         case 'd' :
             player.velocity.x = 0             
             break
     }
})
