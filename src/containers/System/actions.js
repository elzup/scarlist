// @flow
import type { System } from '../../types'

import { UPDATE_SYSTEM } from './actionTypes'
import type { UpdateSystem } from './actionTypes'

export function updateSystem(system: System): UpdateSystem {
  return {
    type: UPDATE_SYSTEM,
    system,
  }
}
