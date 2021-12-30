import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/macro'

import StyledProgressLoader from '../styled/ProgressLoader'

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
            <StyledProgressLoader.RingsContainer dimension={dimension}>
                <StyledProgressLoader.Rings dimension={dimension}>
                    <StyledProgressLoader.Ring
                        ref={circle}
                        r={radius}
                        cx={dimension / 2}
                        cy={dimension / 2}
                        strokeDashoffset={radius * 2 * Math.PI}
                    />
                    <StyledProgressLoader.Ring
                        strokeOpacity="0.3"
                        r={radius}
                        cx={dimension / 2}
                        cy={dimension / 2}
                    />
                </StyledProgressLoader.Rings>
                <StyledProgressLoader.Percentage>
                    {percentage.toFixed(0)}%
                </StyledProgressLoader.Percentage>
            </StyledProgressLoader.RingsContainer>
        </ProgressLoaderContainer>
    )
}

export default ProgressLoader
