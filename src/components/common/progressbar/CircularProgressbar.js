import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgressBar(props) {

    var pathColor = props.pathColor ? props.pathColor : "#2D638C";
    var trailColor = props.trailColor ? props.trailColor : "#9FBED6" ;
    var strokeWidth = props.strokeWidth ? props.strokeWidth : 13;

    return (

        <CircularProgressbarWithChildren value={props.value}  strokeWidth={strokeWidth}
            styles={buildStyles({
                rotation: 1,
                strokeLinecap: 'butt',
                pathTransitionDuration: 0.5,
                pathColor: pathColor,
                trailColor:trailColor,
                path: {
                    stroke: '#3e98c7',
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                }
            })}
            >
            <div className='circle-text'>
                {props.text}
            </div>
        </CircularProgressbarWithChildren>


    )
}