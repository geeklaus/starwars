import { getFakeValue, getNameField } from "./Utils.js";
import axios from 'axios'


class Answer {
	constructor(correctUnkownUrl, incorrectUnknownArray, unknownType) {
		this.correctUnkownUrl = correctUnkownUrl
		this.incorrectUnknownArray = incorrectUnknownArray
		this.unknownType = unknownType
	}

	async getAllAnswers() {
		const response = await axios.get(this.correctUnkownUrl)

		let result = []

		result.push(response.data[getNameField(this.unknownType)])

		for (let index in this.incorrectUnknownArray) {
			result.push(
				this.incorrectUnknownArray[index][getNameField(this.unknownType)]
			)	
		}

		let fakeAnswerAmount = (3 - this.incorrectUnknownArray.length)
		for (let i = 0; i < fakeAnswerAmount; i++ ) {
			result.push(getFakeValue(this.unknownType, i))
		}
		return result
	}
}

export {Answer}