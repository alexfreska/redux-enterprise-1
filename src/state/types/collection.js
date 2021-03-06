/* eslint-disable */
// Collection
import { createAction } from 'redux-actions'
import Normalized from 'nrmlzd'
import { scopeReductionFactory } from './utils'
import { createDefinition } from './utils'

const generate = createDefinition({
  set: (state, { payload }) => Normalized.fromArray(payload),
  reset: (state) => Normalized.create(),
  create: (state, { payload }) => Normalized.upsert(state, payload),
  upsert: (state, { payload }) => Normalized.upsert(state, payload),
  remove: (state, { payload: id }) => Normalized.remove(state, id),
}, {
  get: (state) => state,
  items: (state) => Normalized.toArray(state),
  ids: (state) => state.ids,
  byId: (state, { id }) => state.data[id] || null,
}, Normalized.create())

export default {
  generate
}
