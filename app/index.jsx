import React from 'react'
import { render } from 'react-dom'

// 通用样式
import './static/styles/common.scss'

import SlideJigsawCaptcha from './components/SlideJigsawCaptcha'


render(
    <SlideJigsawCaptcha />,
    document.getElementById('root')
)

// render(
//     <Validated />,
//     document.getElementById('root')
// )
