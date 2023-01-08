const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 960 //innerWidth
canvas.height = 640 // innerHeight

class Sprite {
    constructor({ position}) {
        this.position = position
        this.image= new Image()
        this.image.src= 'img/wizardKeepMapwFloor.png'
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    
}

const wizardKeep = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
})


class Player {
    constructor() {
        this.position = {
            x: 20,
            y: 20,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.width = 25
        this.height = 25
        this.sides = {
            bottom: this.position.y + this.height
        }
      

    }

    draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
       


   
    }
}

const player = new Player()





//let bottom = y + 100

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    wizardKeep.draw()
    player.draw()  
    player.update()

    //if (bottom < canvas.height) {
    //y++
    //bottom = y + 100
    //}
}



animate()




// add background image



// movement and events

window.addEventListener('keydown', ({key}) => {
    switch (key) {
         case 'w':
             player.velocity.y = -5
             //keys.w.pressed = true
             
             break
        case 'a':
             player.velocity.x = -5
             //keys.a.pressed = true
                 
             break
         case 's':
             player.velocity.y = 5
             //keys.s.pressed = true
 
             break
         case 'd' :
             player.velocity.x = 5
             //keys.d.pressed = true
             break
         
     }
 })
 
 window.addEventListener('keyup', ({key}) => {
     switch (key) {
         case 'w':
             player.velocity.y = 0
             //keys.w.pressed = false
             
            break
         case 'a':
             player.velocity.x = 0
             //keys.a.pressed = false
                 
             break
         case 's':
             player.velocity.y = 0
             //keys.s.pressed = false
 
             break
         case 'd' :
             player.velocity.x = 0
             //keys.d.pressed = false
             
             break
     }
    })