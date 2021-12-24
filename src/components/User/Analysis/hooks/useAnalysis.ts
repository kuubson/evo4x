import { useRef, useEffect, useState } from 'react'

import analysisHelpers from '../helpers'

const useAnalysis = () => {
    const analysisRef = useRef<HTMLDivElement>(null)
    const [analysis, setAnalysis] = useState<Analysis[]>([])
    const [hasMoreAnalysis, setHasMoreAnalysis] = useState(true)
    const getAnalysis = ({ event, limit, offset }: MessagesOrAnalysisGetterProps) => {
        analysisHelpers.getAnalysis({
            event,
            limit,
            offset,
            analysisRef,
            setAnalysis,
            hasMoreAnalysis,
            setHasMoreAnalysis
        })
    }
    useEffect(() => {
        getAnalysis({
            event: undefined,
            limit: 20,
            offset: 0
        })
    }, [])
    return {
        analysisRef,
        analysis,
        getAnalysis
    }
}

export default useAnalysis
