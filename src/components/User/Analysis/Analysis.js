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
    const [hasMoreAnalysis, setHasMoreAnalysis] = useState(true)
    const getAnalysis = async (limit, offset, e) => {
        const url = '/api/user/communication/getAnalysis'
        if (e && e.target.scrollTop <= 0 && hasMoreAnalysis) {
            const response = await utils.axios.post(url, {
                limit,
                offset
            })
            if (response) {
                const { analysis } = response.data
                setHasMoreAnalysis(analysis.length !== 0)
                const lastScroll = e.target.scrollHeight
                setAnalysis(_analysis => [...analysis, ..._analysis])
                e.target.scrollTop = e.target.scrollHeight - lastScroll
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
        getAnalysis(20, 0)
    }, [])
    return (
        <AnalysisContainer>
            <CDashboard.Content withAnalysis>
                <CDashboard.Messages
                    ref={analysisRef}
                    onScroll={e => getAnalysis(20, analysis.length, e)}
                >
                    {analysis.map(({ id, type, content, createdAt, admin, views }, index) => {
                        const nextMessage = analysis[index + 1]
                        return (
                            <CComposed.Message
                                key={id}
                                message={{
                                    type,
                                    content,
                                    createdAt,
                                    user: admin,
                                    views
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
