<script lang="ts">
  import { selectedLegend, customLegends, legendColor, activeLayout } from '../../stores/arcade-store';
  
  // Props
  export let position: { x: number; y: number };
  export let radius: number;
  export let color: string;
  export let id: string;
  export let legendPosition: string = 'below'; // 'above' or 'below'
  export let showLegend: boolean = true;
  export let legend: string | null = null;
  
  // Make the legend reactive to store changes
  $: {
    if (legend !== null) {
      actualLegend = legend;
    } else if ($selectedLegend === 'No Legend') {
      actualLegend = null;
    } else if ($selectedLegend === 'Custom') {
      actualLegend = $customLegends[id] || '';
    } else {
      actualLegend = $activeLayout.buttonLegends[$selectedLegend]?.[id] || '';
    }
  }
  
  let actualLegend: string | null = null;
</script>

<style>
  .arcade-btn {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    border: 2px solid #222;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    transition: box-shadow 0.2s;
  }
  
  .button-legend {
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    text-shadow: 0 0 2px #000, 0 0 2px #000;
    z-index: 3;
    pointer-events: none;
    text-align: center;
    width: 30px;
    transform: translateX(-50%);
  }
  
  .legend-above {
    top: -16px;
  }
  
  .legend-below {
    bottom: -16px;
  }
</style>

<div
  class="arcade-btn"
  style="
    left: {position.x - radius}px; 
    top: {position.y - radius}px; 
    width: {radius*2}px; 
    height: {radius*2}px; 
    background: {color.toLowerCase()};
  "
  title="{id} Button"
  data-id={id}
>
  {#if showLegend && actualLegend}
    <div
      class="button-legend legend-{legendPosition}"
      style="left: 50%; color: {$legendColor.toLowerCase()};"
    >
      {actualLegend}
    </div>
  {/if}
</div>