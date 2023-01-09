const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 960 //innerWidth
canvas.height = 640 // innerHeight

const startGameButton = document.querySelector('#startGameButton')
const modalElement = document.querySelector('#modalElement')



class Sprite {
    constructor({ position, imageSrc, frameRate = 1 }) {
        this.position = position
        this.image= new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }
        this.image.src= imageSrc
        this.loaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 20
    }
    draw() {
        if (!this.loaded)
        return
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height,
        }

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
        //this.currentFrame++
        this.elapsedFrames++

        if (this.elapsedFrames % this.frameBuffer === 0) {
        if (this.currentFrame < this.frameRate - 1) this.currentFrame++
        else this.currentFrame = 0
        }
    }
}

const wizardKeep = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: 'img/wizardKeepMapwFloor.png'
})


class Player extends Sprite {
    constructor( { imageSrc, frameRate }) {
        super({ imageSrc, frameRate })
        this.position = {
            x: 60,
            y: 60,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }

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

const player = new Player({ 
    imageSrc: 'img/Run-Sheet.png',
    frameRate: 6,
})

function animate() {
    window.requestAnimationFrame(animate)
    //c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    wizardKeep.draw()  


    player.draw()  
    player.update()

    // create end game here
   // if (this.position.x + this.width >= canvas.width) {
        //console.log('You escaped')
   // }
   
}

//animate()
startGameButton.addEventListener('click', () => {
    //console.log('start')
    animate()
    modalElement.style.display = 'none'
})


// movement 

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


