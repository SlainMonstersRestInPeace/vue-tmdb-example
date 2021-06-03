<template lang="pug">
.rating-meter.position-absolute
  .rating.text-white.position-absolute {{displayedRating}}
  canvas.d-block(ref="canvasRef" width="36" height="36")
</template>

<script>
export default {
  name: "RatingMeter",
  props: {
    rating: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    normalizedRating() {
      return this.rating / 10;
    },
    displayedRating() {
      return `${(this.normalizedRating * 100).toFixed(0)}%`
    }
  },

  mounted() {
    const cvs = this.$refs.canvasRef;

    if (cvs && cvs.getContext) {
      const ctx = cvs.getContext('2d');

      this.drawInnerCircle(cvs, ctx);
      this.drawRating(cvs, ctx);
    }
  },
  methods: {
    lerpHsl(t, hue0, hue1, s = 1, l = 1) {
      var hue = (t * (hue1 - hue0)) + hue0;

      return `hsl(${hue}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`
    },
    greenToRed(t, s = 1, l = 1) {
      return this.lerpHsl(t, 0, 120, s, l);
    },
    drawInnerCircle(cvs, ctx) {
      const lineWidth = 2;
      const R = (cvs.width / 2) - lineWidth - 1;
      const cx = cvs.width / 2;
      const cy = cvs.width / 2;

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = this.greenToRed(this.normalizedRating, 1, 0.25);
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.stroke();
    },
    drawRating(cvs, ctx) {
      const lineWidth = 3;
      const C = 2 * Math.PI;
      const start = (3/4) * C;
      const end = start + this.normalizedRating * C;
      const R = (cvs.width / 2) - lineWidth;
      const cx = cvs.width / 2;
      const cy = cvs.width / 2;

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = this.greenToRed(this.normalizedRating, 1, 0.4);
      ctx.beginPath();
      ctx.arc(cx, cy, R, start, end);
      ctx.stroke();
    }
  }
}
</script>

<style lang="scss" scoped>
$rating-meter-width: 0px;

.rating-meter {
  background: #081C22;
  border-radius: 100%;
  overflow: hidden;
  top: -19px;
}

.rating {
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  top: 9px;
  left: 7px;
}
</style>