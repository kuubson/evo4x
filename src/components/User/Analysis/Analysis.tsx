import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import ChatDashboard from 'components/User/Chat/styled/Dashboard'

import Composed from './composed'

import analysisHelpers from './helpers'

const AnalysisContainer = styled.section`
    height: 100%;
`

const Analysis = () => {
    const analysisRef = useRef<HTMLDivElement>(null)
    const [analysis, setAnalysis] = useState<Analysis[]>([])
    const [hasMoreAnalysis, setHasMoreAnalysis] = useState(true)
    const getAnalysis = async ({ event, limit, offset }: MessagesOrAnalysisGetterProps) =>
        analysisHelpers.getAnalysis({
            event,
            limit,
            offset,
            analysisRef,
            setAnalysis,
            hasMoreAnalysis,
            setHasMoreAnalysis
        })
    useEffect(() => {
        getAnalysis({
            event: undefined,
            limit: 20,
            offset: 0
        })
    }, [])
    const renderAnalysis = () =>
        analysis.map(({ id, type, content, createdAt, views }, index) => {
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
        })
    return (
        <AnalysisContainer>
            <ChatDashboard.Content withAnalysis>
                <ChatDashboard.Messages
                    ref={analysisRef}
                    onScroll={event =>
                        getAnalysis({
                            event,
                            limit: 20,
                            offset: analysis.length
                        })
                    }
                >
                    {renderAnalysis()}
                </ChatDashboard.Messages>
            </ChatDashboard.Content>
        </AnalysisContainer>
    )
}

export default Analysis
