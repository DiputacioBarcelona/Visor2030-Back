<template>
  <div
    class="ot-tooltip pointer-events-none absolute z-50"
    :class="{
      'opacity-100 ': info.show,
      'opacity-0 ': !info.show,
      'transition-transform': transitionClass,
    }"
  >
    <!-- slot for inner content -->
    <!-- class="bg-black bg-opacity-80 text-white rounded-lg text-xs" -->
    <div
      ref="slot"
      :class="{
        'rounded-full p-1 pr-6': rounded,
        'px-3 py-2': !rounded,
        [innerClass]: true,
      }"
    >
      <slot>
        <div>
          <div class="text-xs text-gray-500">{{ info.data.name }}</div>
          <div class="text-base font-semibold">
            {{ info.data.value }}
          </div>
        </div>
      </slot>
    </div>
    <!-- tooltip arrow -->
    <div
      ref="arrow"
      :class="{
        [arrowClass]: true,
        'ot-tooltip-arrow': placement === 'top',
        'ot-tooltip-arrow-left': placement === 'right',
      }"
    ></div>
  </div>
</template>

<script>
// https://popper.js.org/docs/v2/constructors/
import { createPopper } from "@popperjs/core";
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => ({ show: false, target: null, data: {} }),
    },
    placement: {
      type: String,
      default: "top",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    innerClass: {
      type: String,
      default: "rounded-lg border border-gray-300 bg-white/95 text-sm",
    },
    arrowClass: {
      type: String,
      default: "border-gray-300",
    },
    followMouse: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: [Array, Function],
      default: () => [0, 5], // [skidding, distance]
    },
  },
  data() {
    return {
      width: 100,
      // used to make tooltip follow the mouse instead of positioned on an element
      virtualElement: {
        getBoundingClientRect: this.generateGetBoundingClientRect(),
      },
      transitionClass: false,
      timeout: null,
    };
  },
  watch: {
    "info.target"() {
      this.createPopper();
    },
    "info.show"() {
      if (!this.followMouse) {
        if (this.info.show)
          this.timeout = setTimeout(() => (this.transitionClass = true), 50);
        else {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => (this.transitionClass = false), 50);
        }
      }
    },
  },
  mounted() {
    this.createPopper();
    // position virtual element to make tooltip follow the mouse
    if (this.followMouse) this.positionVirtualElement();
  },
  methods: {
    // configure and create new popper instance
    createPopper() {
      if (this.followMouse) {
        this.instance = createPopper(this.virtualElement, this.$el, {
          placement: this.placement,
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "arrow",
              options: {
                element: this.$refs.arrow,
                padding: 5,
              },
            },
            {
              name: "offset",
              options: {
                offset: this.offset,
              },
            },
          ],
        });
      } else if (this.info.target) {
        this.instance = createPopper(this.info.target, this.$el, {
          placement: this.placement,
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "arrow",
              options: {
                element: this.$refs.arrow,
                padding: 5,
              },
            },
            {
              name: "offset",
              options: {
                offset: this.offset,
              },
            },
          ],
        });
      }
    },
    generateGetBoundingClientRect(x = 0, y = 0) {
      return () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
      });
    },
    // for mouse follow
    positionVirtualElement() {
      document.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
        this.virtualElement.getBoundingClientRect =
          this.generateGetBoundingClientRect(x, y);
        this.instance.update();
      });
    },
  },
};
</script>

<style>
.ot-tooltip {
  z-index: 30;
  max-width: 24rem;
}
/* .ot-tooltip .ot-tooltip-arrow {
  @apply border-gray-300;
} */

/* top */
.ot-tooltip .ot-tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
}
.ot-tooltip .ot-tooltip-arrow-left {
  border-width: 5px 5px 5px 0;
  border-top-color: transparent !important;
  border-left-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
}
</style>
