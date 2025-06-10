<script lang="ts">
  import { LEGEND_OPTIONS, COLORS, selectedLegend, customLegends, legendColor, activeLayout } from '../../stores/arcade-store';
  import type { LegendOption } from '../../stores/arcade-store';
</script>

<style>
  .control-section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .control-section h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #333;
  }
  
  .legend-controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .legend-selector {
    margin-bottom: 10px;
  }
  
  .custom-legends {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 15px;
  }
  
  .legend-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .legend-color-selector {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  label {
    font-size: 14px;
    color: #555;
  }
  
  select {
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    font-size: 14px;
  }
  
  input {
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    font-size: 14px;
    width: 60px;
  }
</style>

<div class="control-section">
  <h3>Button Legend</h3>
  <div class="legend-controls">
    <div class="legend-selector">
      <label for="button-legend">Legend Style:</label>
      <select id="button-legend" bind:value={$selectedLegend}>
        {#each LEGEND_OPTIONS as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
    
    <div class="legend-color-selector">
      <label for="legend-color">Legend Color:</label>
      <select id="legend-color" bind:value={$legendColor}>
        {#each COLORS as color}
          <option value={color}>{color}</option>
        {/each}
      </select>
    </div>
    
    {#if $selectedLegend === 'Custom'}
      <div>
        <p>Custom Button Labels:</p>
        <div class="custom-legends">
          {#each $activeLayout.elements.buttons as button}
            <div class="legend-item">
              <label for={"custom-legend-" + button.id}>{button.id} Label:</label>
              <input
                type="text"
                id={"custom-legend-" + button.id}
                bind:value={$customLegends[button.id]}
                maxlength="4"
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>