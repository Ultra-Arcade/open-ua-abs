<script lang="ts">
  // Props
  export let position: { x: number; y: number };
  export let radius: number;
  export let id: string;
</script>

<style>
  .screw {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    border: 1px solid #555;
    background: #777;
    box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
  }
</style>

<div
  class="screw"
  style="
    left: {position.x - radius}px; 
    top: {position.y - radius}px; 
    width: {radius*2}px; 
    height: {radius*2}px;
  "
  title="Mounting Screw"
  data-id={id}
></div>