import styled from 'styled-components/macro'

import analysisHooks from './hooks'

import ChatDashboard from 'components/User/Chat/styled/Dashboard'

import Composed from './composed'

const AnalysisContainer = styled.section`
    height: 100%;
`
const Analysis = () => {
    const { analysisRef, analysis, getAnalysis } = analysisHooks.useAnalysis()
    const renderAnalysis = () => {
        return analysis.map((currentAnalysis, index) => {
            const nextAnalysis = analysis[index + 1]
            return (
                <Composed.Analysis
                    key={currentAnalysis.id}
                    analysis={currentAnalysis}
                    nextAnalysis={nextAnalysis}
                />
            )
        })
    }
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
