<script lang="ts">
  import LayoutRenderer from './layout/LayoutRenderer.svelte';
  import LayoutSelector from './layout/LayoutSelector.svelte';
  import ArtworkUploader from './controls/ArtworkUploader.svelte';
  import ColorSelector from './controls/ColorSelector.svelte';
  import LegendSelector from './controls/LegendSelector.svelte';
  import { isLayoutInverted, toggleLayoutInversion, isImageInverted, toggleImageInversion, customArtwork } from '../stores/arcade-store';
</script>

<style>
  .arcade-builder {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
  }
  
  .control-column {
    flex: 1;
    min-width: 300px;
    max-width: 500px;
  }
  
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: center;
    }
    
    .control-column {
      width: 100%;
    }
  }
  
  .control-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .control-header h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }
  
  .invert-button {
    padding: 6px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .invert-button:hover {
    background-color: #2980b9;
  }
  
  .invert-button.purple {
    background-color: #9b59b6;
  }
  
  .invert-button.purple:hover {
    background-color: #8e44ad;
  }
  
  .invert-icon {
    display: inline-block;
    transform: scaleX(-1);
    font-size: 16px;
  }
</style>

<div class="arcade-builder">
  <LayoutRenderer />
  
  <div class="controls">
    <div class="control-column">
      <div class="control-header">
        <h2>Layout Selection</h2>
        <button
          class="invert-button"
          on:click={toggleLayoutInversion}
          title="Flip layout horizontally"
        >
          <span class="invert-icon">⇄</span>
          {$isLayoutInverted ? 'Reset Layout' : 'Flip Layout'}
        </button>
      </div>
      <LayoutSelector />
      
      <div class="control-header">
        <h2>Panel Artwork</h2>
        <button
          class="invert-button purple"
          on:click={toggleImageInversion}
          disabled={!$customArtwork}
          title="Flip image horizontally"
        >
          <span class="invert-icon">⇄</span>
          {$isImageInverted ? 'Revert Image' : 'Flip Image'}
        </button>
      </div>
      <ArtworkUploader />
    </div>
    
    <div class="control-column">
      <ColorSelector />
      <LegendSelector />
    </div>
  </div>
</div>