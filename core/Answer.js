import { fakeEntities, getNameField, returnRandomPageNumber } from "./Utils.js";
import axios from 'axios'


class Answer {
	constructor(correctUnkownUrl, incorrectUnknownArray, unknownType) {
		this.correctUnkownUrl = correctUnkownUrl
		this.incorrectUnknownArray = incorrectUnknownArray
		this.unknownType = unknownType
	}

	getAllAnswers() {


		const getAllUnknown = () => {
			try {
				return axios.get(this.correctUnkownUrl)
			} catch (error) {
				console.error(error)
			}
		}

		let correctAnswer 

		getAllUnknown().then((response) => {
			correctAnswer = response.data[getNameField(this.unknownType)]

			console.log(correctAnswer)
			}
		)
		let incorrectUnknownArrayOfNames = []

		for (let index in this.incorrectUnknownArray) {
			incorrectUnknownArrayOfNames.push(
				this.incorrectUnknownArray[index][getNameField(this.unknownType)]
				)	
		}

		let numberOfAdditionalIncorectAnswers = (3 - incorrectUnknownArrayOfNames.length)
		
		for (let i = 0; i < numberOfAdditionalIncorectAnswers; i++ ) {
			incorrectUnknownArrayOfNames.push(fakeEntities[this.unknownType][i])
		}

		return [correctAnswer, ...incorrectUnknownArrayOfNames]
	}

	

	
}

export {Answer}