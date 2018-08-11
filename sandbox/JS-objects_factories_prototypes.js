let animal = {
  animalType: 'animal',

  describe () {
    return `An ${this.animalType} with ${this.furColor} fur, 
      ${this.legs} legs, and a ${this.tail} tail.`;
  }
};

let mouseFactory = function mouseFactory () {
  let secret = 'secret agent';

  // return Object.assign({}, animal, { //more simple, flattens prototypes and prevents strange/unwanted changes (see "CRAP" message below)
  return Object.assign(Object.create(animal), { //probably more efficient
    animalType: 'mouse',
    furColor: 'brown',
    legs: 4,
    tail: 'long, skinny',
    profession () {
      return secret;
    }
  });
};


let ninjaFactory = () => {
  let secret = 'Im a ninja'

  return {
    skills: {
      swords: true,
      knives: false,
      stars: true
    },
    saying () {
      return secret
    },
    setSecret (newSecret) {
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


let mouseNinja = () => {
  return Object.assign(mouseFactory(), ninjaFactory())
}

let mouseSamurai = () => {
  return Object.assign(mouseFactory(), samuraiFactory())
}

let nin = mouseNinja()
animal.describe = () => "CRAP! Should have made animal a factory so nobody could edit base functionality..."
let sam = mouseSamurai()

console.log("nin", nin)

console.log(nin.describe())
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

