/*
 Question: unknown, known1

 Example: In which film(unknown) participated Skywalker(known)?

*/
import axios from 'axios'
import { getNameField, getRandomInt,  getRelationField } from './Utils.js'
import { Question } from './Question.js'


class QuestionData {

	constructor(knownType, unknownType) {
		this.knownType = knownType
		this.unknownType = unknownType
	}

	async getData() {
		const getAllUnknown = () => {
			try {
				return axios.get('https://swapi.dev/api/' + this.unknownType)
			} catch (error) {
				console.error(error)
			}
		}
		const getAllKnown = () => {
			try {
				return axios.get('https://swapi.dev/api/' + this.knownType)
			} catch (error) {
				console.error(error)
			}
		}


		const f = async () => {
			const promise = await Promise.all([getAllUnknown(), getAllKnown()]).then(
				(responseArray) => {
					const unknownArray = responseArray[0].data.results
					const knownArray = responseArray[1].data.results

					const known = this.getRandomElement(knownArray)
					const knownName = known[getNameField(this.knownType)]

					let relationUrlArray = known[getRelationField(this.knownType, this.unknownType)]
					if (!(relationUrlArray instanceof Array)) {
						relationUrlArray = [relationUrlArray]
					}

					const trueUnkownUrl = this.getRandomElement(relationUrlArray)

					const falseUnknownArray = this.getThreeExluding(unknownArray, relationUrlArray)

					const question = new Question(this.knownType, knownName, this.unknownType)
					console.log(question.generateQuestion())
				}
			)
		}
		f()

		return this.question
	}

	getRandomElement(array) {
		if (array instanceof Array) {
			return array.at(getRandomInt(array.length))
			// return array.at(getRandomInt(array.length))

		}
	}

	getThreeExluding(objectArray, urlExcludingArray) {
		const result = []
		for (var i in objectArray) {
			if (result.length == 3) break

			if (!urlExcludingArray.includes(objectArray[i].url)) {
				result.push(objectArray[i])
			}
		}
		
		return result
	}
}

export {QuestionData}