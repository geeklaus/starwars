export class Question {
	constructor(knownType, knownName, unknownType) {
		this.knownType = knownType
		this.knownName = knownName
		this.unknownType = unknownType
	}

	generateQuestion() {
		const template = questionTemplates[this.knownType][this.unknownType]

		return template.replace(/%s/, this.knownName)
	}
}

const questionTemplates = {
	people: {
		films: 'In which film was character with name %s',
		planets: 'On which planet was the charecter %s',
		starships: 'Which starship the charecter %s owns'
	},

	planets: {
		films: 'In which film it was a planet %s ',
		people: 'Who visited the planet %s'
	},

	films: {
		people: 'Who was the hero of the film %s',
		planets: 'Which of the planets was in the film %s',
		starships: 'Which of the starships was in the film %s'
	},
	starships: {
		films: 'In which film there was starship %s'
	}
}