import { State } from './reducer'
import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()

export const updateState = actionCreator<State>('ACTIONS_UPDATE_STATE')
