import { store } from 'redux/store'

import { setApiFeedback as setApiFeedbackAction } from 'redux/reducers/apiFeedback'

export const setApiFeedback = (apiFeedback: string) => {
   store.dispatch(setApiFeedbackAction(apiFeedback))
}
