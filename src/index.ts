import { forIn } from 'lodash'
import { Store } from 'redux'
import { attachStateModelsToConsole } from './console.js'
import StateDefinitions from './state/definitions/index.js'
import { createState } from './state/index.js'

const actions = {}
const models = {}
const reducers = {}
const selectors = {}

const isTest = process.env.NODE_ENV === 'test'

const defineState = (schema: Object) => {
  const localModels = {}
  const localReducers = {}
  const localActions = {}
  const localSelectors = {}

  createState(schema).forEach((model) => {
    localModels[model.namespace] = model
    localReducers[model.namespace] = model.reducer
    localActions[model.namespace] = model.actions
    localSelectors[model.namespace] = model.selectors

    models[model.namespace] = model
    reducers[model.namespace] = model.reducer
    actions[model.namespace] = model.actions
    selectors[model.namespace] = model.selectors
  })

  return {
    ...localModels,
    actions: localActions,
    reducers: localReducers,
    selectors: localSelectors,
  }
}

const clearAllState = () => {
  forIn(reducers, (_, key) => {
    delete reducers[key]
  })

  forIn(models, (_, key) => {
    delete models[key]
  })
}

const startRepl = (store: Store) => {
  if ((process && process.title === 'browser') || isTest) {
    const w = isTest ? global : window

    if (!store || !store.dispatch) {
      throw Error('Redux Enterprise: `startRepl` requires a valid store object')
    }

    // @ts-ignore
    w.dispatch = store.dispatch
    attachStateModelsToConsole(models, w)

    if (!isTest) {
      console.log('Redux Enterprise: starting REPL')
    }
  }
  return store
}

export default {
  StateDefinitions,
  clearAllState,
  defineState,
  reducers,
  startRepl,
}

export {
  StateDefinitions,
  clearAllState,
  defineState,
  reducers,
  startRepl,
}
