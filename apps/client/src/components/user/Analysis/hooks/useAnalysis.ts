import { useEffect, useRef, useState } from 'react'

import { pushToTheBottom } from 'helpers'

import { axios } from 'utils'

type GetAnalysisResponse = {
   analysis: Analysis[]
}

export const useAnalysis = () => {
   const analysisRef = useRef<HTMLDivElement>(null)
   const [analysis, setAnalysis] = useState<Analysis[]>([])
   const [hasMoreAnalysis, setHasMoreAnalysis] = useState(true)
   const getAnalysis = async ({ event, limit, offset }: MessagesOrAnalysisGetterProps) => {
      const loadCachedAnalysis = () => {
         const savedAnalysis = JSON.parse(sessionStorage.getItem('analysis')!)
         if (savedAnalysis && !!savedAnalysis.length) {
            setAnalysis(savedAnalysis)
            setTimeout(() => pushToTheBottom(analysisRef, true), 0)
         }
      }
      const url = '/api/user/communication/getAnalysis'
      if (event) {
         const target = event.target as any
         if (target.scrollTop <= 0 && hasMoreAnalysis) {
            const response = await axios.post<GetAnalysisResponse>(url, {
               limit,
               offset,
            })
            if (response) {
               const { analysis } = response.data
               setHasMoreAnalysis(analysis.length !== 0)
               const lastScroll = target.scrollHeight
               setAnalysis(_analysis => [...analysis, ..._analysis])
               target.scrollTop = target.scrollHeight - lastScroll
            }
         }
      }
      if (!event) {
         loadCachedAnalysis()
         const response = await axios.post<GetAnalysisResponse>(url, {
            limit,
            offset,
         })
         if (response) {
            const { analysis } = response.data
            sessionStorage.setItem('analysis', JSON.stringify(analysis))
            setAnalysis(analysis)
            pushToTheBottom(analysisRef)
         }
      }
   }
   useEffect(() => {
      getAnalysis({
         event: undefined,
         limit: 20,
         offset: 0,
      })
   }, [])
   return {
      analysisRef,
      analysis,
      getAnalysis,
   }
}
