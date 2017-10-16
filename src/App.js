import React, { Component } from "react";
import "./App.css";
import BarChart from "./barChart";
import Pie from "./pieChart";
import PieLabel from "./pieChartLabel";
import Donut from "./donut";
import DonutLabel from "./donutLabel";
import LineChart from "./lineChart";

class App extends Component {
    render() {
        let minViewportSize = Math.min(window.innerWidth, window.innerHeight); //pie chart
        let radius = minViewportSize * 0.9 / 6; //pie chart
        var data = [5, 2, 7, 1, 1, 3, 4, 9];
        return (
            <div className="App">
                <svg width="100%" height={550}>
                    {/* We'll create this component in a minute */}
                    <Pie
                        x={window.innerWidth / 4}
                        y={window.innerHeight / 4}
                        radius={radius}
                        data={data}
                    />
                </svg>
                <svg width="100%" height={550}>
                    {/* We'll create this component in a minute */}
                    <PieLabel
                        x={window.innerWidth / 4}
                        y={window.innerHeight / 4}
                        radius={radius}
                        data={data}
                    />
                </svg>
                <svg width="100%" height="550">
                    <Donut
                        x={window.innerWidth / 4}
                        y={window.innerHeight / 4}
                        innerRadius={radius * 0.35}
                        outerRadius={radius}
                        cornerRadius={7}
                        padAngle={0.01}
                        data={data}
                    />
                </svg>
                <svg width="100%" height="550">
                    <DonutLabel
                        x={window.innerWidth / 4}
                        y={window.innerHeight / 4}
                        innerRadius={radius * 0.35}
                        outerRadius={radius}
                        cornerRadius={7}
                        padAngle={0.01}
                        data={data}
                    />
                </svg>

                <div className="barChart">
                    <BarChart data={data} size={[500, 500]} />
                    <hr />
                </div>
            </div>
        );
    }
}
export default App;
