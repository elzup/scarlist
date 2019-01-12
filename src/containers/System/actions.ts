import { System } from '../../types'

import { UPDATE_SYSTEM } from './actionTypes'
import { UpdateSystem } from './actionTypes'

export function updateSystem(system: System): UpdateSystem {
  return {
    type: UPDATE_SYSTEM,
    system,
  }
}
