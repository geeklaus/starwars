import {QuestionData} from './QuestionData.js'
import { Question } from './Question.js'
import { Answer } from './Answer.js'


// const questionData = new QuestionData('people', 'planets')
const questionData = new QuestionData('planets', 'people')

for (let i = 0; i < 100; i++) {
	const question = questionData.getData()
	
}


//const question = questionData.getData()