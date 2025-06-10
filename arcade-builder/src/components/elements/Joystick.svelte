<script lang="ts">
  // Props
  export let position: { x: number; y: number };
  export let radius: number;
  export let color: string;
  export let id: string = "StickTop";
</script>

<style>
  .joystick {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    border: 3px solid #444;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    transition: box-shadow 0.2s;
  }
</style>

<div
  class="joystick"
  style="
    left: {position.x - radius}px; 
    top: {position.y - radius}px; 
    width: {radius*2}px; 
    height: {radius*2}px; 
    background: {color.toLowerCase()};
  "
  title="Joystick"
  data-id={id}
></div>