// import { LangTransState, ActionTransState, language, FromLanguage } from '@/app/@types/types.d';
import { LangTransState, ActionTransState, language, FromLanguage } from '@/@types/types.d';
import { AUTO_LANGUAGE } from '@/constants';
import { useReducer } from 'react';


/*
// 1. create a initial state
const initialState: LangTransState = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false,
}

// 2. create a reducer 
// function reducer(state: typeof initialState, action) {
function reducer(state: LangTransState, action: ActionTransState) {
    const { type } = action;

    if (type === 'INTERCHANGE_LANGUAGES') {

        // logica del estado dentro del reducer, porque lo evitamos en los componentes
        // if(state.fromLanguage === 'Auto' || state.fromLanguage === 'auto') return state
        if(state.fromLanguage === AUTO_LANGUAGE) return state

        const loading = state.fromText != '';

        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage,
            result: '',
            loading
        }
    }

    if (type === 'SET_FROM_LANGUAGE') {

        if(state.fromLanguage === action.payload) return state

        const loading = state.fromText != '';

        return {
            ...state,
            fromLanguage: action.payload,
            result: '',
            loading
        }
    }

    if (type === 'SET_TO_LANGUAGE') {

        if(state.toLanguage === action.payload) return state
        const loading = state.fromText != '';

        return {
            ...state,
            toLanguage: action.payload,
            result: '',
            loading
        }
    }

    if (type === 'SET_FROM_TEXT') {

        const loading = action.payload !='';

        return {
            ...state,
            loading,
            fromText: action.payload,
            result: ''
        }
    }

    if (type === 'SET_RESULT') {
        return {
            ...state,
            loading: false,
            result: action.payload
        }
    }

    return state
}

export default function useStore() {
    //3. use hook useReducer
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState)

    console.log({ fromLanguage })

    const intergangeLanguages = () => dispatch({ type: "INTERCHANGE_LANGUAGES" })

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({ type: "SET_FROM_LANGUAGE",payload })
    }
   
    const setToLenguage = (payload: language) => {
        dispatch({ type: "SET_TO_LANGUAGE",payload })
    }

    const setFromText = (payload: string) => {
        dispatch({ type: "SET_FROM_TEXT",payload })
    }

    const setResult = (payload: string) => {
        dispatch({ type: "SET_RESULT",payload })
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        intergangeLanguages,
        setFromLanguage,
        setToLenguage,
        setFromText,
        setResult
    }
}
*/

// 1. Create a initialState
const initialState: LangTransState = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
  }
  
  // 2. Create a reducer
  function reducer (state: LangTransState, action: ActionTransState) {
    const { type } = action
  
    if (type === 'INTERCHANGE_LANGUAGES') {
      // lógica del estado dentro del reducer
      // porque lo evitamos en los componentes
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      let  _fromLanguage;
      let _toLanguage;

      if( state.toLanguage === state.fromLanguage){
        _toLanguage =  state.fromLanguage
        _fromLanguage = state.toLanguage 
      }
      console.log(_toLanguage)
      console.log(_fromLanguage)

  
      const loading = state.fromText !== ''
  
      return {
        ...state,
        loading,
        result: '',
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    }
  
    if (type === 'SET_FROM_LANGUAGE') {
      if (state.fromLanguage === action.payload) return state
  
      const loading = state.fromText !== ''
  
      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading
      }
    }
  
    if (type === 'SET_TO_LANGUAGE') {
      if (state.toLanguage === action.payload) return state
      const loading = state.fromText !== ''
  
      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading
      }
    }
  
    if (type === 'SET_FROM_TEXT') {
      const loading = action.payload !== ''
  
      return {
        ...state,
        loading,
        fromText: action.payload,
        result: ''
      }
    }
  
    if (type === 'SET_RESULT') {
      return {
        ...state,
        loading: false,
        result: action.payload
      }
    }
  
    return state
  }
  
  export function useStore () {
    // 3. usar el hook useReducer
    const [{
      fromLanguage,
      toLanguage,
      fromText,
      result,
      loading
    }, dispatch] = useReducer(reducer, initialState)
  
    const interchangeLanguages = () => {
      dispatch({ type: 'INTERCHANGE_LANGUAGES' })
    }
  
    const setFromLanguage = (payload: FromLanguage) => {
      dispatch({ type: 'SET_FROM_LANGUAGE', payload })
    }
  
    const setToLanguage = (payload: language) => {
      dispatch({ type: 'SET_TO_LANGUAGE', payload })
    }
  
    const setFromText = (payload: string) => {
      dispatch({ type: 'SET_FROM_TEXT', payload })
    }
  
    const setResult = (payload: string) => {
      dispatch({ type: 'SET_RESULT', payload })
    }
  
    return {
      fromLanguage,
      toLanguage,
      fromText,
      result,
      loading,
      interchangeLanguages,
      setFromLanguage,
      setToLanguage,
      setFromText,
      setResult
    }
  }



        // console.log("'***************'")
      // console.log("State state")
      // console.log(state)
      // console.log("'***************'")
      // console.log("action action")
      // console.log(action)
      // console.log("'***************'")
      // console.log("state.toLanguage")
      // console.log(state.toLanguage)
      // console.log("'***************'")
      // console.log("state.fromLanguage")
      // console.log(state.fromLanguage)