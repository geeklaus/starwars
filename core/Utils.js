export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
	//return 5;
}


const typeRelationField = {
	people: {
		planets: "homeworld",
		films: "films",
		starships: "starships"
	},
	films: {
		people: "characters",
		planets: "planets",
		starships: "starships"
	},
	planets: {
		people: "residents",
		films: "films"
	},
	starships: {
		films: "films"
	}
}

export function getRelationField(fromType, toType) {
	return typeRelationField[fromType][toType]
}

const typeNameField = {
	people: "name",
	films: "title",
	planets: "name",
	starships: "name"
}

export function getNameField(type) {
	return typeNameField[type]
}

export const fakeEntities = {
	people: ['Lion King', 'King Kong', 'Packman'],
	films: ['Family guy', 'Saw', 'Megalodon'],
	planets: ['Mars', 'Uranus', 'Earth'],
	starships: ['su-99', 'Ship200', 'TeslaShip']
}

export function getFakeValues(name) {
	return fakeEntities[name]
}

const numberOfPages = {
	people: 9,
	films: 1,
	planets: 6,
	starships: 4
}

export function returnRandomPageNumber(type) {
	const a = getRandomInt(numberOfPages[type]) + 1
	// if (a < 1 || a > 9) {console.log('!!!!!!RANDOM PAGE:' + a)}
	return a
}