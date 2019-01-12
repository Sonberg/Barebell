<script>
import {
    Line,
    mixins,
    generateChart
} from 'vue-chartjs'

import Chart from 'chart.js'

const {
    reactiveProp
} = mixins

import {
    max,
    min
} from 'lodash'

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
                ctx = this.chart.ctx,
                x = activePoint.tooltipPosition().x,
                topY = this.chart.scales['y-axis-0'].top,
                bottomY = this.chart.scales['y-axis-0'].bottom;

            x = x === this.chart.width ? this.chart.width - 1 : x;
            x = x === 0 ? 1 : x;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#5661b3';
            ctx.stroke();
            ctx.restore();
        }
    }
});

const LineWithLine = generateChart('line-with-line', 'LineWithLine')

export default {
    extends: LineWithLine,
    mixins: [reactiveProp],
    props: ['chart-data'],
    data: () => ({
        active: []
    }),
    computed: {
        options() {
            let suggestedMin = 100
            let suggestedMax = 180;

            return {
                maintainAspectRatio: false,
                onHover: this.setActive,
                tooltips: {
                    enabled: false,
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            suggestedMin,
                            suggestedMax
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                animation: {
                    duration: 0
                }
            }
        }
    },
    methods: {
        setActive(e) {
            let tooltip = this.$data._chart.tooltip;
            let index = tooltip._active && tooltip._active[0] && tooltip._active[0]._index;
            
            if (index => 0) {
                this.$emit('hover', index)
            }
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>
