import React, { Component } from 'react'

class Summary extends Component {
    render() {
        return (
            <div className="summary">
                <div className="content-title">
                    <h3>Summary</h3>
                </div>
                <div className="content-subtitle">
                    <p>{this.props.summary[0]}</p>
                </div>
                <div className="content-main">
                    <p>{this.props.summary[1]}</p>
                </div>
                <div className="content-detail">
                    <div className="content-info">
                        <ul>
                            <li><span>Number of Words:</span> <span> 20000</span></li>
                            <li><span>Summation Time:</span> <span> 10s</span></li>
                            <li><span>Summation Type:</span> <span> Abstractive</span></li>
                        </ul>
                    </div>
                    <div className="content-save">
                        <svg className="save-icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="25pt"
                            height="25pt" viewBox="0 0 899.883379 900.002773" preserveAspectRatio="xMidYMid meet">
                            <metadata>
                                Created by Potrace Professional 1.1m
                        </metadata>
                            <g transform="translate(-250.117730,900.000000) rotate(-360.00) scale(0.095238,-0.095238)"
                                fill="#000000" stroke="none">
                                <path d="M3554 9440 c-17 -5 -67 -17 -110 -27 -43 -10 -117 -35 -163 -56 -332
                    -149 -561 -433 -637 -790 -18 -83 -25 -7548 -8 -7638 58 -292 181 -508 388
                    -679 121 -99 281 -181 420 -213 43 -10 96 -22 117 -27 50 -13 7528 -13 7578 0
                    21 5 74 17 117 27 168 39 379 158 499 282 125 130 234 313 274 461 49 180 46
                    -8 46 3421 l0 3220 -26 91 c-63 216 -194 397 -607 834 -284 300 -647 647 -847
                    809 -191 155 -314 227 -458 269 l-91 26 -3230 -1 c-1777 -1 -3244 -5 -3262 -9z
                    m6084 -370 c55 -19 142 -78 172 -117 14 -18 37 -55 51 -80 l25 -48 0 -1370 0
                    -1370 -28 -58 c-35 -74 -104 -143 -177 -177 l-58 -28 -2435 -2 c-2243 -3
                    -2440 -2 -2489 14 -103 34 -177 100 -225 204 l-27 57 -3 1317 c-2 854 1 1337
                    8 1374 5 32 21 79 34 105 31 63 121 143 189 169 55 21 75 21 2491 22 1881 0
                    2443 -2 2472 -12z m1126 -4378 c80 -37 145 -100 183 -174 l31 -61 0 -1911 0
                    -1911 -27 -57 c-37 -77 -105 -144 -186 -181 l-65 -29 -3350 0 -3350 0 -65 29
                    c-81 37 -149 104 -186 181 l-27 57 0 1911 0 1911 30 58 c48 93 103 143 205
                    185 l59 25 3345 -3 3344 -2 59 -28z" />
                                <path d="M8082 8719 c-4 -4 -7 -576 -7 -1271 l0 -1263 546 0 546 0 -3 1267 -3
                    1268 -536 3 c-295 1 -540 -1 -543 -4z" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

        )
    }
}
export default Summary;