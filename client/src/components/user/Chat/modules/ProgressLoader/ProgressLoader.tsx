import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/macro'

import * as Dashboard from './styled/Dashboard'

const ProgressLoaderContainer = styled.div`
    margin-right: 10px;
    display: flex;
    flex-direction: column;
`

interface IProgressLoader {
    percentage: number
}

const ProgressLoader: React.FC<IProgressLoader> = ({ percentage }) => {
    const circle = useRef<SVGCircleElement>(null)
    const dimension = 50
    const strokeWidth = 2
    const radius = dimension / 2 - strokeWidth * 2
    useEffect(() => {
        if (circle) {
            const radius = circle.current!.r.baseVal.value
            const circumference = radius * 2 * Math.PI
            circle.current!.style.strokeDasharray = `${circumference} ${circumference}`
            const offset = circumference - (percentage / 100) * circumference
            circle.current!.style.strokeDashoffset = offset.toString()
        }
    }, [percentage])
    return (
        <ProgressLoaderContainer>
            <Dashboard.RingsContainer dimension={dimension}>
                <Dashboard.Rings dimension={dimension}>
                    <Dashboard.Ring
                        ref={circle}
                        r={radius}
                        cx={dimension / 2}
                        cy={dimension / 2}
                        strokeDashoffset={radius * 2 * Math.PI}
                    />
                    <Dashboard.Ring
                        strokeOpacity="0.3"
                        r={radius}
                        cx={dimension / 2}
                        cy={dimension / 2}
                    />
                </Dashboard.Rings>
                <Dashboard.Percentage>{percentage.toFixed(0)}%</Dashboard.Percentage>
            </Dashboard.RingsContainer>
        </ProgressLoaderContainer>
    )
}

export default ProgressLoader
