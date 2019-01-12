import { actionCreatorFactory } from 'typescript-fsa'
import { System } from '../../types'
const actionCreator = actionCreatorFactory()

export const updateSystem = actionCreator<System>('ACTIONS_UPDATE_SYSTEM')
