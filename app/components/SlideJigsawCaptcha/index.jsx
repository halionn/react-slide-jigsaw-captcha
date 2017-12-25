/**
 * author: jhl
 * date: 2017-11-08
 * 滑动拼图验证
 * 拖动时进入moving状态；拖动结束后进入短暂的touchEndSpan时间段，显示红叉
 */
import React from 'react'

import './style.scss'
// import bgImg from './images/bg.jpg'
// import jgs from './images/jgs.png'

import { getJigsawImagesUrl, validate } from "../../fetch/jigsaw";
import Validated from './dumbs/Validated'

export default class SlideJigsawCaptcha extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            isMoving: false,
            isTouchEndSpan: false, // 拖动结束的一个短暂时间段，显示红叉
            originX: 0,
            offsetX: 0,
            id: '',
            bgUrl: '',
            jigsawUrl: '',
            validated: false, // 验证是否通过
        }
        // 不变的属性
        this.attr = {
            maxSlidedWidth: 0, // slider可移动的最大距离
        }
    }

    componentWillMount() {
        // 获取拼图
        this.getJigsaw()
    }

    componentDidMount() {
        let ctrlWidth = this.refs.control.clientWidth
        let sliderWidth = this.refs.slider.clientWidth
        this.attr.maxSlidedWidth = ctrlWidth - sliderWidth

    }

    handleTouchStart(e) {
        e.preventDefault()
        this.setState({
            originX: this.getClientX(e)
        })
    }

    handleTouchMove(e) {
        e.preventDefault()
        this.move(e)
    }

    handleTouchEnd(e) {
        e.preventDefault()

        if (this.state.offsetX > 0) {
            this.setState({
                isTouchEndSpan: true,
                isMoving: false
            })

            // 验证坐标
            validate(this.state.id, this.state.offsetX / this.attr.maxSlidedWidth).then(res => {
                if (res.code == 1) { // 验证通过
                    this.setState({
                        validated: true
                    })
                    //TODO 调用验证通过的回调
                } else  { // 验证未通过
                    // 滑块归位
                    setTimeout(() => {
                        this.setState({
                            offsetX: 0,
                            originX: 0,
                            isTouchEndSpan: false
                        })
                    }, 300)

                    // 重新获取验证图
                    this.getJigsaw()
                }
            })
        } else { // 反向拖动、点击但不拖动均无变化
            this.setState({
                isTouchEndSpan: false,
                isMoving: false,
                offsetX: 0,
                originX: 0
            })
        }
    }

    handleRefresh(e) {
        e.preventDefault()
        // 获取拼图
        this.getJigsaw()
    }

    // 获取拼图
    getJigsaw() {
        getJigsawImagesUrl().then(res => {
            this.setState({
                id: res.id,
                bgUrl: res.bgUrl,
                jigsawUrl: res.jigsawUrl
            })
        })
    }

    move(e) {
        let clientX = this.getClientX(e)
        let offsetX = clientX - this.state.originX
        if (offsetX > 0) {
            if (offsetX > this.attr.maxSlidedWidth) {
                // 超过最大移动范围，按极限值算
                offsetX = this.attr.maxSlidedWidth
            }
            this.setState({
                isMoving: true,
                offsetX
            })
        }
    }

    getClientX(e) {
        if (e.type.indexOf('mouse') > -1) {
            return e.clientX;
        }
        if (e.type.indexOf('touch') > -1) {
            return e.touches[0].clientX;
        }
    }

    px2rem(pxValue) {
        return pxValue * 2 / 75
    }

    render() {

        //TODO 改为三元表达式
        let ctrlClassName = 'control'
        if (this.state.isMoving) {
            ctrlClassName = 'control slider-moving'
        } else if (this.state.isTouchEndSpan) {
            ctrlClassName = 'control slider-end'
        }

        if (this.state.validated) {
            return <Validated />
        } else {
            return (<div className="slide-jigsaw-captcha">
                <div className="panel">
                    <img className="bg" src={this.state.bgUrl} />
                    <img className="jigsaw" src={this.state.jigsawUrl} style={{left: `${this.state.offsetX}px`}}/>
                    <div className="refresh" onClick={this.handleRefresh.bind(this)}></div>
                </div>
                <div className={ctrlClassName} ref="control">
                    <div className="slided" style={{width: `${this.state.offsetX}px`}}></div>
                    <div className="slider" ref="slider" style={{left: `${this.state.offsetX}px`}}
                         onTouchStart={this.handleTouchStart.bind(this)}
                         onTouchMove={this.handleTouchMove.bind(this)}
                         onTouchEnd={this.handleTouchEnd.bind(this)}>
                    </div>
                    <div className="tips">
                        <span>{this.state.isMoving || this.state.isTouchEndSpan ? '' : '向右滑动滑块填充拼图'}</span>
                    </div>
                </div>
                <div style={{marginTop: '30px'}}>
                    <p>originX={this.state.originX}</p>
                    <p>offsetX={this.state.offsetX}</p>
                    <p>maxSlidedWidth={this.attr.maxSlidedWidth}</p>
                    <p>matchPercentage={this.state.offsetX / this.attr.maxSlidedWidth}</p>
                </div>
            </div>)
        }
    }

    render2() {

        //TODO 改为三元表达式
        let ctrlClassName = 'control'
        if (this.state.isMoving) {
            ctrlClassName = 'control slider-moving'
        } else if (this.state.isTouchEndSpan) {
            ctrlClassName = 'control slider-end'
        }

        return (<div className="slide-jigsaw-captcha">
            <div className="panel">
                <img className="bg" src={this.state.bgUrl} />
                <img className="jigsaw" src={this.state.jigsawUrl} style={{left: `${this.state.offsetX}px`}}/>
                <div className="refresh"></div>
            </div>
            <div className={ctrlClassName} ref="control">
                <div className="slided" style={{width: `${this.state.offsetX}px`}}></div>
                <div className="slider" ref="slider" style={{left: `${this.state.offsetX}px`}}
                     onTouchStart={this.handleTouchStart.bind(this)}
                     onTouchMove={this.handleTouchMove.bind(this)}
                     onTouchEnd={this.handleTouchEnd.bind(this)}>
                </div>
                <div className="tips">
                    <span>{this.state.isMoving || this.state.isTouchEndSpan ? '' : '向右滑动滑块填充拼图'}</span>
                </div>
            </div>
            <div style={{marginTop: '30px'}}>
                <p>originX={this.state.originX}</p>
                <p>offsetX={this.state.offsetX}</p>
                <p>maxSlidedWidth={this.attr.maxSlidedWidth}</p>
                <p>matchPercentage={this.state.offsetX / this.attr.maxSlidedWidth}</p>
            </div>
        </div>)
    }

}