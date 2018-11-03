// @flow
import type { System } from '../../types'

export const UPDATE_SYSTEM: 'System/UPDATE_SYSTEM' = 'System/UPDATE_SYSTEM'

export const Actions = {
  UPDATE_SYSTEM,
}

export type UpdateSystem = {
  type: typeof UPDATE_SYSTEM,
  system: System,
}

export type Action = UpdateSystem
