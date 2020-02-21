import { actionCreatorFactory } from 'typescript-fsa'
import { State } from './reducer'

const actionCreator = actionCreatorFactory()

export const updateState = actionCreator<State>('ACTIONS_UPDATE_STATE')
