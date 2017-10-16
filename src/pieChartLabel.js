import React from "react";
import * as d3 from "d3";
import * as scale from "d3-scale";
import ReactDOM from "react-dom";
function translate(x, y) {
    return `translate(${x}, ${y})`;
}

class Slice extends React.Component {
    render() {
        let { value, label, fill, innerRadius = 0, outerRadius } = this.props;
        let arc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        return (
            <g>
                <path d={arc(value)} fill={fill} />
                {/* https://github.com/d3/d3/wiki/SVG-Shapes#arc_centroid */}
                <text
                    transform={`translate(${arc.centroid(value)})`}
                    dy=".35em"
                    textAnchor="middle"
                    fill="black"
                >
                    {label}
                </text>
            </g>
        );
    }
}

export default class Pie extends React.Component {
    constructor(props) {
        super(props);
        this.colorScale = scale.schemeCategory20;
        this.renderSlice = this.renderSlice.bind(this);
    }

    render() {
        let { x, y, data } = this.props;
        let pie = d3.pie();

        return (
            <g transform={`translate(${x}, ${y})`}>
                {/* Render a slice for each data point */}
                {pie(data).map(this.renderSlice)}
            </g>
        );
    }

    renderSlice(value, i) {
        return (
            <Slice
                key={i}
                outerRadius={this.props.radius}
                value={value}
                label={value.data}
                fill={this.colorScale[i]}
            />
        );
    }
}
