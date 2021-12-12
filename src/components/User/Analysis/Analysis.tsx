import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'

import ChatDashboard from 'components/User/Chat/styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

import { pushToTheBottom } from 'components/User/Chat/utils'

const AnalysisContainer = styled.section`
    height: 100%;
`

const Analysis = () => {
    const analysisRef = useRef<HTMLDivElement>(null)
    const [analysis, setAnalysis] = useState<Analysis[]>([])
    const [hasMoreAnalysis, setHasMoreAnalysis] = useState(true)
    const getAnalysis = async (
        limit: number,
        offset: number,
        e: React.UIEvent<HTMLDivElement> | undefined
    ) => {
        const url = '/api/user/communication/getAnalysis'
        if (e) {
            const target = e.target as any
            if (target.scrollTop <= 0 && hasMoreAnalysis) {
                const response = await utils.axios.post(url, {
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
        if (!e) {
            const response = await utils.axios.post(url, {
                limit,
                offset
            })
            if (response) {
                const { analysis } = response.data
                setAnalysis(analysis)
                pushToTheBottom(analysisRef)
            }
        }
    }
    useEffect(() => {
        getAnalysis(20, 0, undefined)
    }, [])
    return (
        <AnalysisContainer>
            <ChatDashboard.Content withAnalysis>
                <ChatDashboard.Messages
                    ref={analysisRef}
                    onScroll={e => getAnalysis(20, analysis.length, e)}
                >
                    {analysis.map(({ id, type, content, createdAt, views }, index) => {
                        const nextAnalysis = analysis[index + 1]
                        return (
                            <Composed.Analysis
                                key={id}
                                analysis={{
                                    id,
                                    type,
                                    content,
                                    createdAt,
                                    views
                                }}
                                nextAnalysis={nextAnalysis}
                            />
                        )
                    })}
                </ChatDashboard.Messages>
            </ChatDashboard.Content>
        </AnalysisContainer>
    )
}

export default Analysis
