<script lang="ts">
  import { customArtwork, handleArtworkUpload, resetArtwork } from '../../stores/arcade-store';
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
  
  .file-upload {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .file-input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .custom-file-upload {
    display: inline-block;
    padding: 8px 12px;
    cursor: pointer;
    background-color: #4a90e2;
    color: white;
    border-radius: 4px;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .custom-file-upload:hover {
    background-color: #3a80d2;
  }
  
  .file-name {
    margin-left: 10px;
    font-size: 14px;
    color: #555;
  }
  
  .reset-button {
    padding: 8px 12px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .reset-button:hover:not(:disabled) {
    background-color: #c0392b;
  }
  
  .reset-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .artwork-info {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }
  
  .using-custom {
    color: #27ae60;
    font-weight: bold;
  }
</style>

<div class="control-section">
  <h3>Panel Artwork</h3>
  <div class="file-upload">
    <div class="file-input-wrapper">
      <label for="artwork-upload" class="custom-file-upload">
        Choose Image
      </label>
      <input
        type="file"
        id="artwork-upload"
        accept="image/*"
        on:change={handleArtworkUpload}
        style="display: none;"
      />
      <span class="file-name">
        {$customArtwork ? 'Custom artwork selected' : 'No file chosen'}
      </span>
    </div>
    
    <button
      class="reset-button"
      on:click={resetArtwork}
      disabled={!$customArtwork}
    >
      Reset to Default
    </button>
    
    <p class="artwork-info">
      {#if $customArtwork}
        <span class="using-custom">✓ Using custom artwork</span>
      {:else}
        Upload your own artwork to personalize your arcade panel.
        <br>Recommended size: 600×347 pixels or similar aspect ratio.
      {/if}
    </p>
  </div>
</div>