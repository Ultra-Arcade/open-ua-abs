<script lang="ts">
  import { COLORS, joystickColor, buttonColors, activeLayout } from '../../stores/arcade-store';
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
  
  .color-controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .joystick-color {
    margin-bottom: 10px;
  }
  
  .button-colors {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
  
  .color-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
</style>

<div class="control-section">
  <h3>Controls Customization</h3>
  <div class="color-controls">
    <div class="joystick-color">
      <label for="joystick-color">Joystick Color:</label>
      <select id="joystick-color" bind:value={$joystickColor}>
        {#each COLORS as color}
          <option value={color}>{color}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <p>Button Colors:</p>
      <div class="button-colors">
        {#each $activeLayout.elements.buttons as button, i}
          <div class="color-item">
            <label for={"button-color-" + i}>{button.id} Button:</label>
            <select id={"button-color-" + i} bind:value={$buttonColors[i]}>
              {#each COLORS as color}
                <option value={color}>{color}</option>
              {/each}
            </select>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>