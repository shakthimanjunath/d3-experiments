import React from "react";
import * as d3 from "d3";
import * as scale from "d3-scale";
import ReactDOM from "react-dom";
function translate(x, y) {
    return `translate(${x}, ${y})`;
}

class Slice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isHovered: false };
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    onMouseOver() {
        this.setState({ isHovered: true });
    }

    onMouseOut() {
        this.setState({ isHovered: false });
    }

    render() {
        let {
            value,
            label,
            fill,
            innerRadius = 0,
            outerRadius,
            cornerRadius,
            padAngle,
            ...props
        } = this.props;
        if (this.state.isHovered) {
            outerRadius *= 1.1;
        }
        let arc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(cornerRadius)
            .padAngle(padAngle);
        return (
            <g
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                {...props}
            >
                <path d={arc(value)} fill={fill} />
                <text
                    transform={translate(...arc.centroid(value))}
                    dy=".35em"
                    className="label"
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
        let { innerRadius, outerRadius, cornerRadius, padAngle } = this.props;
        return (
            <Slice
                key={i}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                cornerRadius={cornerRadius}
                padAngle={padAngle}
                value={value}
                label={value.data}
                fill={this.colorScale[i]}
            />
        );
    }
}
