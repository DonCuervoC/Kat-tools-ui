/* eslint-disable no-unused-vars */
import {type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from "@/constants"


export type language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage =  typeof AUTO_LANGUAGE;
export type FromLanguage = language | AutoLanguage;

export interface LangTransState { // languages translator state
    fromLanguage: FromLanguage
    toLanguage: language
    fromText: string
    result: string
    loading: boolean
}


export type ActionTransState =
    | { type: 'SET_FROM_LANGUAGE', payload: fromLanguage }
    | { type: 'INTERCHANGE_LANGUAGES' }
    | { type: 'SET_TO_LANGUAGE', payload: language }
    | { type: 'SET_FROM_TEXT', payload: string }
    | { type: 'SET_RESULT', payload: string }
// | { type: 'SET_FROM_TEXT', payload: string, result: string, loading: boolean }
// | { type: 'SET_RESULT', payload: string, result: string, loading: boolean }



export enum SectionType {
    From = 'from',
    To = 'to'

}