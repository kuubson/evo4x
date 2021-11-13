import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'

import CDashboard from 'components/User/Chat/styled/Dashboard'

import CComposed from 'components/User/Chat/composed'

import utils from 'utils'

import { pushToTheBottom } from 'components/User/Chat/utils'

const AnalysisContainer = styled.section`
    height: 100%;
`

const Analysis = () => {
    const analysisRef = useRef()
    const [analysis, setAnalysis] = useState([])
    useEffect(() => {
        const getAnalysis = async () => {
            const url = '/api/user/getAnalysis'
            const response = await utils.axios.post(url, {
                limit: 20,
                offset: 0
            })
            if (response) {
                const { analysis } = response.data
                setAnalysis(analysis)
                pushToTheBottom(analysisRef)
            }
        }
        getAnalysis()
    }, [])
    return (
        <AnalysisContainer>
            <CDashboard.Content withAnalysis>
                <CDashboard.Messages ref={analysisRef}>
                    {analysis.map(({ id, type, content, createdAt, user }, index) => {
                        const nextMessage = analysis[index + 1]
                        return (
                            <CComposed.Message
                                key={id}
                                message={{
                                    type,
                                    content,
                                    createdAt,
                                    user
                                }}
                                nextMessage={nextMessage}
                                withAnalysis
                            />
                        )
                    })}
                </CDashboard.Messages>
            </CDashboard.Content>
        </AnalysisContainer>
    )
}

export default Analysis
