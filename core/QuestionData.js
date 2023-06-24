/*
 Question: unknown, known1

 Example: In which film(unknown) participated Skywalker(known)?

*/
import axios from 'axios'
import { getNameField, getRandomInt,  getRelationField, returnRandomPageNumber } from './Utils.js'
import { Question } from './Question.js'
import { Answer } from './Answer.js'


class QuestionData {

	constructor(knownType, unknownType) {
		this.knownType = knownType
		this.unknownType = unknownType
	}

	async getData() {
		const getAllUnknown = () => {
			try {
				return axios.get('https://swapi.dev/api/' + this.unknownType + '/?page=' + returnRandomPageNumber(this.unknownType))
			} catch (error) {
				console.error(error)
			}
		}
		const getAllKnown = () => {
			try {
				return axios.get('https://swapi.dev/api/' + this.knownType + '/?page=' + returnRandomPageNumber(this.knownType))
			} catch (error) {
				console.error(error)
			}
		}


		const f = async () => {
			const responseArray = await Promise.all([getAllUnknown(), getAllKnown()])

			const unknownArray = responseArray[0].data.results
			const knownArray = responseArray[1].data.results
			
			let relationUrlArray
			let known
			/**
			 * Here we pick up random object from the list of known entities, but
			 * in case the selected object has empty relation to unknown - we will retry
			 */
			do {
				known = this.getRandomElement(knownArray)
				relationUrlArray = known[getRelationField(this.knownType, this.unknownType)]
				if (relationUrlArray.length == 0) console.log(
					"Found " + known[getNameField(this.knownType)] + "with empty related entity"
					)
			} while (relationUrlArray.length == 0)
			
			const knownName = known[getNameField(this.knownType)]
			if (!(relationUrlArray instanceof Array)) {
				relationUrlArray = [relationUrlArray]
			}

			const trueUnkownUrl = this.getRandomElement(relationUrlArray)

			const falseUnknownArray = this.getThreeExluding(unknownArray, relationUrlArray)

			const question = new Question(this.knownType, knownName, this.unknownType)
			const answer = new Answer(trueUnkownUrl, falseUnknownArray, this.unknownType)
			const questionStr = question.generateQuestion()
			const answerArray = await answer.getAllAnswers()
			console.log(questionStr)
			console.log(answerArray)
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

	/**
	 * 
	 * @param {array of related objects from which to select incorrect answers} objectArray 
	 * @param {array of url(s) each of which correspond to correct answer} urlExcludingArray 
	 * @returns {3-element array of objects, each of which is incorrect answer}
	 */
	getThreeExluding(objectArray, urlExcludingArray) {
		const result = []
		/**
		 * Shuffling array of relations, from which we are picking 3 incorrect answers.
		 * We do so in order for randomizing the result.
		 */
		if (objectArray instanceof Array) {
			objectArray.sort(() => Math.random() - 0.5)
		}

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