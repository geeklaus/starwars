export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
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
	starshipts: "name"
}

export function getNameField(type) {
	return typeNameField[type]
}

const fakeEntities = {
	people: ['Lion King', 'King Kong', 'Packman'],
	films: ['Family guy', 'Saw', 'Megalodon']
}

export function getFakeValues(name) {
	return fakeEntities[name]
}
