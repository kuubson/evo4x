import utils from 'utils'

import chatHelpers from 'components/User/Chat/helpers'

type AnalysisGetter = MessagesOrAnalysisGetterProps & {
    analysisRef: React.RefObject<HTMLDivElement>
    setAnalysis: React.Dispatch<React.SetStateAction<Analysis[]>>
    hasMoreAnalysis: boolean
    setHasMoreAnalysis: DispatchBoolean
}

type Response = {
    analysis: Analysis[]
}

const getAnalysis = async ({
    event,
    limit,
    offset,
    analysisRef,
    setAnalysis,
    hasMoreAnalysis,
    setHasMoreAnalysis
}: AnalysisGetter) => {
    const url = '/api/user/communication/getAnalysis'
    if (event) {
        const target = event.target as any
        if (target.scrollTop <= 0 && hasMoreAnalysis) {
            const response = await utils.axios.post<Response>(url, {
                limit,
                offset
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
        const response = await utils.axios.post<Response>(url, {
            limit,
            offset
        })
        if (response) {
            const { analysis } = response.data
            setAnalysis(analysis)
            chatHelpers.pushToTheBottom(analysisRef)
        }
    }
}

export default getAnalysis
