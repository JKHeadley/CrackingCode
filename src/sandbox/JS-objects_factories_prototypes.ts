export {}

type Animal = {
    animalType: string,
    describe: () => string
}

let animal = {
    animalType: 'animal',

    describe () {
        return `An ${this.animalType} with ${this.furColor} fur, 
      ${this.legs} legs, and a ${this.tail} tail.`;
    }
};

type Mouse = Animal & {
    furColor: string,
    legs: number,
    tail: string,
    profession: () => string
}

let mouseFactory = function mouseFactory (): Mouse {
    let secret = 'secret agent';

    // return Object.assign({}, animal, { //more simple, flattens prototypes and prevents strange/unwanted changes (see "CRAP" message below)
    return Object.assign(Object.create(animal), <Mouse>{ //probably more efficient
        animalType: 'mouse',
        furColor: 'brown',
        legs: 4,
        tail: 'long, skinny',
        profession () {
            return secret;
        }
    });
};

type Ninja = {
    skills: {},
    saying: () => string,
    setSecret: (string) => void
}


let ninjaFactory = () => {
    let secret = 'Im a ninja'

    return <Ninja>{
        skills: {
            swords: true,
            knives: false,
            stars: true
        },
        saying () {
            return secret
        },
        setSecret (newSecret: string) {
            secret = newSecret
        }
    }
}

let samuraiFactory = () => {
    const ninja = ninjaFactory()
    ninja.setSecret('Im a samurai')
    const samurai = Object.assign({}, ninja, {
        skills: {
            staff: true
        },
        master: 'of time'
    })

    samurai.skills = Object.assign(samurai.skills, ninja.skills)

    return samurai
}


let mouseNinja = (): Mouse & Ninja => {
    return Object.assign(mouseFactory(), ninjaFactory())
}

let mouseSamurai = () => {
    return Object.assign(mouseFactory(), samuraiFactory())
}

let nin = mouseNinja()


console.log("TYPE:", mouseFactory.name)
// animal.describe = () => "CRAP! Should have made animal a factory so nobody could edit base functionality..."
let sam = mouseSamurai()

console.log("nin", nin.legs)

console.log(nin.describe.apply({ legs: 5 }))
console.log(sam.describe())
console.log(nin.profession())
console.log(nin.saying())
nin.setSecret("UHOH")
console.log(nin.saying())
console.log(sam.saying())
nin.__proto__.animalType = 'bear'
console.log(sam.animalType)
console.log(nin.animalType)
console.log(sam.__proto__)
console.log(Object.getOwnPropertyNames(sam))
console.log(Object.keys(sam))