<script lang="ts">
  import layouts from '../../layouts';
  import { activeLayoutId } from '../../stores/arcade-store';
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
  
  .layout-selector {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  
  .layout-info {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }
</style>

<div class="control-section">
  <h3>Layout Selection</h3>
  <div class="layout-selector">
    <div>
      <label for="layout-select">Select Layout:</label>
      <select id="layout-select" bind:value={$activeLayoutId}>
        {#each layouts as layout}
          <option value={layout.id}>{layout.name}</option>
        {/each}
      </select>
    </div>
    
    <p class="layout-info">
      Choose from different arcade panel layouts.
      Your customizations will be preserved when switching layouts.
    </p>
  </div>
</div>