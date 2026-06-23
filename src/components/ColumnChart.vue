<template>
  <div ref="container" class="column-container">
    <svg ref="svg" class="overflow-visible fill-current text-gray-500"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "ColumnChart",
  props: {
    data: {
      type: Array,
      default: () => [
        {
          id: "data-1",
          name: "Data 1",
          values: {
            val1: { id: "val1", name: "Val 1", value: 30 },
            val2: { id: "val2", name: "Val 2", value: 10 },
          },
        },
        {
          id: "data-2",
          name: "Data 2",
          values: {
            val1: { id: "val1", name: "Val 1", value: 20 },
            val2: { id: "val2", name: "Val 2", value: 40 },
          },
        },
      ],
    },
    color: {
      type: Object,
      default: () => ({ val1: "#eee", val2: "#ccc" }), // color for each segment
    },
    margin: {
      type: Object,
      default: () => ({ top: 0, right: 0, bottom: 20, left: 0 }),
    },
    max: {
      type: Number,
      default: null, // set fixed max value for y axis
    },
    duration: {
      type: Number,
      default: 300, // time of animation in ms
    },
    ease: {
      type: String,
      default: "easeCubic", // easing used for animation
    },
    refLine: {
      type: Number,
      default: null, // show ref line, e.g. average or median value
    },
    refLineText: {
      type: String,
      default: "", // label on ref line
    },
    showXAxis: {
      type: Boolean,
      default: true,
    },
    showYAxis: {
      type: Boolean,
      default: false,
    },
    yTickValues: {
      type: Array,
      default: null, // values to show on y axis
    },
    xTickValues: {
      type: Array,
      default: null, // values to show on x axis
    },
    paddingInner: {
      type: Number,
      default: 0.1, // padding between bars
    },
    paddingOuter: {
      type: Number,
      default: 0.1, // padding on the sides
    },
    bgColor: {
      type: String,
      default: null, // color for backgrounds of columns
    },
    format: {
      type: Function,
      default: (d) => d, // formatter for y axis values
    },
  },
  data() {
    return {
      width: 500,
      height: 600,
    };
  },
  computed: {
    // use segment ids as keys
    keys() {
      return this.data.length ? Object.keys(this.data[0].values) : [];
    },
    // stack generator
    stack() {
      return d3.stack().keys(this.keys);
    },
    // flatten data array (needed for stack function)
    processedData() {
      return this.data.map((e) => {
        const result = {
          ...e,
        };

        Object.keys(e.values).forEach((key) => {
          result[key] = e.values[key].value;
        });

        return result;
      });
    },
    // generate stack for given data
    // returns array for each series
    series() {
      return this.stack(this.processedData);
    },
    // max value of y axis
    computedMax() {
      if (this.max) return this.max;
      return d3.max(this.series, (d) => d3.max(d, (d) => d[1]));
    },
    x() {
      return d3
        .scaleBand()
        .domain(this.data.map((e) => e.id))
        .range([this.margin.left, this.width - this.margin.right])
        .paddingInner(this.paddingInner)
        .paddingOuter(this.paddingOuter);
    },
    xBg() {
      return d3
        .scaleBand()
        .domain(this.data.map((e) => e.id))
        .range([this.margin.left, this.width - this.margin.right])
        .padding(0);
    },
    y() {
      return d3
        .scaleLinear()
        .domain([0, this.computedMax])
        .nice()
        .range([this.height - this.margin.bottom, this.margin.top]);
    },
  },
  watch: {
    data() {
      this.draw();
    },
  },
  mounted() {
    this.setSize();
    this.createChart();
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.resize();
      });
      this.resizeObserver.observe(this.$refs.container);
    } else {
      // for IE
      window.addEventListener("resize", this.resize);
    }
  },
  beforeUnmount() {
    if (window.ResizeObserver) {
      this.resizeObserver.unobserve(this.$refs.container);
    } else {
      // for IE
      window.removeEventListener("resize", this.resize);
    }
  },
  methods: {
    setSize() {
      const container = this.$refs.container;
      if (container) {
        this.width = container.clientWidth;
        this.height = container.clientHeight;
      }
    },
    resize() {
      const currentWidth = this.width;
      const currentHeight = this.height;
      this.setSize();
      if (currentWidth !== this.width || currentHeight !== this.height) {
        this.updateChart();
      }
    },
    draw(delay = this.duration, duration = this.duration) {
      if (this.bgColor) {
        // draw rects for background color
        this.rectsColorBg
          .selectAll("rect")
          .data(this.data, (d) => d.id) // iterate over categories/layers
          .join("rect")
          .attr("id", (d) => `bg-${d.id}`)
          .attr("fill", this.bgColor)
          .attr("x", (d) => this.x(d.id))
          .attr("y", () => this.y(this.y.domain()[1]))
          .attr("height", this.y(0))
          .attr("width", this.x.bandwidth());
      }

      // draw transparent rectangles for events
      this.rectsBg
        .selectAll("rect")
        .data(this.data, (d) => d.id) // iterate over categories/layers
        .join("rect")
        .attr("id", (d) => `bg-${d.id}`)
        .attr("fill", "transparent")
        .attr("x", (d) => this.xBg(d.id))
        .attr("y", () => this.y(this.computedMax))
        .attr("height", this.y(0))
        .attr("width", this.xBg.bandwidth())
        .on("click", (event, data) => {
          // emit the rectangle of the last dataset (the top one)
          const id = event.target.id;
          // in the form key-SOMETHING. we will replace the key for the ID of thelast dataset
          const [_, ...rest] = id.split("-");
          // hover the rectangle on top...
          const lastKey = this.keys[this.keys.length - 1];
          const lastRectId = [lastKey, ...rest].join("-");
          // console.log(document.getElementById(lastRectId));
          const target = this.rects.select("#" + lastRectId)._groups[0][0];
          this.$emit("select", { target, data });
        })
        .on("mouseover", (event, data) => {
          // emit the rectangle of the last dataset (the top one)
          const id = event.target.id;
          // in the form key-SOMETHING. we will replace the key for the ID of thelast dataset
          const [_, ...rest] = id.split("-");
          // hover the rectangle on top...
          const lastKey = this.keys[this.keys.length - 1];
          const lastRectId = [lastKey, ...rest].join("-");
          // console.log(document.getElementById(lastRectId));
          const target = this.rects.select("#" + lastRectId)._groups[0][0];
          this.$emit("hover", { target, data });
        })
        .on("mouseout", () => {
          this.$emit("hover", null);
        });

      // select the first dataset
      const selection = this.rects
        .selectAll("g")
        .data(this.series, (d) => d.key) // iterate over categories/layers
        .join("g")
        .attr("class", (d) => d.key)
        .attr("id", (d) => d.key)
        .selectAll("rect")
        .data(
          (d) => d,
          (d) => d.data.id
        );

      // calculate delays
      const updating = selection;
      const exiting = selection.exit();
      const updateDelay1 = 0; //exiting.size() ? delay : 0;
      const updateDelay = updateDelay1 + updating.size() ? updateDelay1 : 0;
      const enterDelay = updateDelay + (updating.size() ? delay * 2 : delay);
      // const enterDelayAxis = updateDelay + (updating.size() ? delay : 0);
      const enterDelayAxis = updateDelay;

      this.drawAxis(enterDelayAxis, duration);

      const that = this;

      selection // iterate over points within each category/layer
        .join(
          (enter) =>
            enter
              .append("rect")
              .attr("id", function (d) {
                // the only way I know how to get the id of the parent 🤷‍♂️
                const key = this.parentNode.__data__.key;
                // doesn't really work, it gets lost afterwards... shame
                // d.data.key = key;
                return `${key}-${d.data.id}`;
              })
              .attr("x", (d) => this.x(d.data.id))
              .attr("y", () => this.y(0))
              .attr("height", 0)
              .attr("width", this.x.bandwidth())
              .attr("fill", function (d) {
                const key = this.parentNode.__data__.key;
                return d.data.values[key].color || that.color[key];
              })
              .call((enter) =>
                enter
                  .transition()
                  .duration(duration)
                  .delay(enterDelay)
                  .ease(d3[this.ease])
                  .attr("y", (d) => this.y(d[1]))
                  .attr("height", (d) => this.y(d[0]) - this.y(d[1]))
              ),
          (update) =>
            update
              .transition()
              .duration(duration)
              .delay(updateDelay)
              .ease(d3[this.ease])
              // first animate the height of the bar
              .attr("y", (d) => this.y(d[1]))
              .attr("height", (d) => this.y(d[0]) - this.y(d[1]))
              .attr("fill", function (d) {
                const key = this.parentNode.__data__.key;
                return d.data.values[key].color || that.color[key];
              })
              // and then move into the new position
              .transition()
              .duration(duration)
              .attr("x", (d) => this.x(d.data.id))
              .attr("width", this.x.bandwidth()),
          (exit) =>
            exit
              .transition()
              .duration(duration)
              .ease(d3[this.ease])
              .attr("y", () => this.y(0))
              .attr("height", 0)
              .remove()
        );

      // refLine line
      if (this.refLine !== null) {
        this.ref
          .attr("display", this.refLine !== null ? null : "none")
          .call((g) =>
            g.select("line").attr("x1", this.margin.left).attr("x2", this.width)
          )
          .transition()
          .duration(duration)
          .delay(delay)
          .ease(d3[this.ease])
          .attr("transform", `translate(0,${this.y(this.refLine)})`);
      }
    },
    drawAxis(delay, duration) {
      // AXIS
      this.xAxis
        .attr(
          "transform",
          "translate(-0.5," + (this.height - this.margin.bottom) + ")"
        )
        .transition()
        .duration(duration)
        .delay(delay)
        .ease(d3[this.ease])
        .call(
          d3
            .axisBottom(this.x) //.ticks(this.numTicks)
            .tickFormat((d, i) => {
              return this.data.find((e) => e.id === d)?.name || d;
            })
            .tickValues(this.xTickValues)
        );

      if (!this.showXAxis) {
        this.xAxis.select(".domain").remove();
        this.xAxis.selectAll(".tick line").attr("stroke", "none");
      }

      //.call((g) => g.select(".domain").remove());
      if (this.showYAxis) {
        this.yAxis
          .attr("transform", `translate(${this.width},0)`)
          .transition()
          .duration(duration)
          .delay(delay)
          .ease(d3[this.ease])
          .call(
            d3
              .axisLeft(this.y)
              .tickSize(this.width - this.margin.left - this.margin.right)
              .tickFormat(this.format)
              .tickValues(this.yTickValues)
          );
      }
    },
    updateChart() {
      this.svg.attr("viewBox", [0, 0, this.width, this.height]);
      this.draw(0, 0);
    },
    createChart() {
      if (!this.svg) {
        this.svg = d3
          .select(this.$refs.svg)
          .attr("viewBox", [0, 0, this.width, this.height]);

        this.values = this.svg.append("g").attr("class", "values");

        this.yAxis = this.svg
          .append("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${this.width},0)`);

        if (this.bgColor) {
          this.rectsColorBg = this.svg
            .append("g")
            .attr("class", "bars-color-bg");
        }

        this.rects = this.svg.append("g").attr("class", "bars");

        this.rectsBg = this.svg.append("g").attr("class", "bars-bg");

        this.xAxis = this.svg
          .append("g")
          .attr("class", "x-axis")
          .attr(
            "transform",
            "translate(-0.5," + (this.height - this.margin.bottom) + ")"
          );

        if (!this.showXAxis) {
          this.xAxis.select(".domain").remove();
          this.xAxis.selectAll(".tick line").attr("stroke", "none");
        }

        this.ref = this.svg
          .append("g")
          .attr("class", "ref-line")
          .attr("display", this.refLine !== null ? null : "none");

        this.ref.append("line").attr("stroke", "black");

        this.ref
          .append("text")
          .attr("class", "text-xs")
          .attr("fill", "black")
          .attr("x", this.margin.left)
          .attr("dy", "-4px")
          .text(this.refLineText);

        //first paint with no delay
        this.draw(0);
      }
    },
  },
};
</script>
<style>
.column-container .y-axis .tick line {
  stroke-opacity: 0.2;
  /* stroke-dasharray: 2, 2; */
}
.column-container .y-axis .domain {
  display: none;
}
</style>
