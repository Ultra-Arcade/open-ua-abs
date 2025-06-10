<script lang="ts">
  // Use public path for artwork
  const defaultArt = '/art/default_art.png';
  
  // State for custom artwork
  let customArtwork: string | null = null;
  
  // Function to handle artwork upload
  function handleArtworkUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Create a URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      customArtwork = fileUrl;
    }
  }
  
  // Function to reset to default artwork
  function resetArtwork() {
    if (customArtwork) {
      URL.revokeObjectURL(customArtwork);
      customArtwork = null;
    }
  }

  // Color palette
  const COLORS = ['White', 'Black', 'Red', 'Green', 'Blue', 'Yellow', 'Pink'];

  // Button legend options
  const LEGEND_OPTIONS = ['No Legend', 'PlayStation', 'Xbox', 'Switch', 'Arcade', 'Custom'] as const;
  type LegendOption = typeof LEGEND_OPTIONS[number];
  
  // Button legend mappings for each platform
  const BUTTON_LEGENDS: Record<string, Record<string, string>> = {
    'PlayStation': {
      '_3K': 'L2',
      '_3P': 'L1',
      'HK': 'R2',
      'HP': 'R1',
      'MK': '○',
      'MP': '△',
      'LK': 'X',
      'LP': '□'
    },
    'Xbox': {
      '_3K': 'LT',
      '_3P': 'LB',
      'HK': 'RT',
      'HP': 'RB',
      'MK': 'B',
      'MP': 'Y',
      'LK': 'A',
      'LP': 'X'
    },
    'Switch': {
      '_3K': 'ZL',
      '_3P': 'L',
      'HK': 'ZR',
      'HP': 'R',
      'MK': 'A',
      'MP': 'X',
      'LK': 'B',
      'LP': 'Y'
    },
    'Arcade': {
      '_3K': '3K',
      '_3P': '3P',
      'HK': 'HK',
      'HP': 'HP',
      'MK': 'MK',
      'MP': 'MP',
      'LK': 'LK',
      'LP': 'LP'
    }
  };

  // Real panel dimensions (mm)
  const PANEL_MM_WIDTH = 380;
  const PANEL_MM_HEIGHT = 220;

  // SVG panel dimensions (units) - from SVG viewBox "0 0 380 220"
  // Using exact 1:1 unit drawing precision (coordinates are in mm)
  // These match the width/height attributes in the SVG file
  const SVG_WIDTH = 380;
  const SVG_HEIGHT = 220;

  // Svelte component panel size (in px)
  const PANEL_PX_WIDTH = 600;
  const PANEL_PX_HEIGHT = Math.round(PANEL_PX_WIDTH * (PANEL_MM_HEIGHT / PANEL_MM_WIDTH));

  // PRECISION MAPPING: Direct conversion from SVG coordinates to pixels
  // Since SVG viewBox (0 0 380 220) matches panel dimensions (380mm x 220mm),
  // SVG coordinates are already in mm, so we only need to convert mm to px
  // This ensures exact 1:1 mapping between SVG and rendered layout
  function svgToPx(x: number, y: number) {
    return {
      x: (x / PANEL_MM_WIDTH) * PANEL_PX_WIDTH,
      y: (y / PANEL_MM_HEIGHT) * PANEL_PX_HEIGHT
    };
  }

  // PRECISION MAPPING: Convert SVG radius directly to pixels
  // This maintains the exact proportions of circles from the SVG
  function svgRadiusToPx(radius: number) {
    return (radius / PANEL_MM_WIDTH) * PANEL_PX_WIDTH;
  }

  // PRECISION MAPPING: Screw positions from SVG (6 mounting points)
  // Coordinates and radius (1.6) extracted directly from SVG paths
  // These match the exact positions in the SVG file
  const screwSVGs = [
    { x: 189.9233, y: 27.5667, r: 1.6, id: "Screw" },
    { x: 189.9233, y: 192.5667, r: 1.6, id: "Screw_0" },
    { x: 356.4232, y: 192.5667, r: 1.6, id: "Screw_1" },
    { x: 356.4232, y: 27.5667, r: 1.6, id: "Screw_2" },
    { x: 23.4232, y: 27.5667, r: 1.6, id: "Screw_3" },
    { x: 23.4232, y: 192.5667, r: 1.6, id: "Screw_4" }
  ];
  
  const screws = screwSVGs.map(({ x, y, r, id }) => {
    return {
      ...svgToPx(x, y),
      r: svgRadiusToPx(r),
      id
    };
  });

  // PRECISION MAPPING: Joystick position and radius from SVG (StickTop element)
  // Coordinates (103.9315, 90.1081) and radius (12) extracted directly from SVG path
  const joystickSVG = { x: 103.9315, y: 90.1081, r: 12, id: "StickTop" };
  const joystick = {
    ...svgToPx(joystickSVG.x, joystickSVG.y),
    r: svgRadiusToPx(joystickSVG.r)
  };

  // PRECISION MAPPING: 8 Buttons with positions and IDs from SVG
  // Coordinates and radius (15) extracted directly from SVG paths
  // These match the exact positions in the SVG file
  const buttonSVGs = [
    { x: 280.0815, y: 92.1956, r: 15, id: "_3K" },  // 3K button
    { x: 286.0815, y: 52.7081, r: 15, id: "_3P" },  // 3P button
    { x: 245.0816, y: 92.1956, r: 15, id: "HK" },   // HK button
    { x: 251.0815, y: 52.6956, r: 15, id: "HP" },   // HP button
    { x: 210.0815, y: 92.1956, r: 15, id: "MK" },   // MK button
    { x: 216.0815, y: 52.7081, r: 15, id: "MP" },   // MP button
    { x: 175.0815, y: 107.0456, r: 15, id: "LK" },  // LK button
    { x: 181.0815, y: 67.5581, r: 15, id: "LP" }    // LP button
  ];
  
  // PRECISION MAPPING: All buttons have radius 15 in the SVG
  const BUTTON_RADIUS_PX = svgRadiusToPx(15);

  const buttons = buttonSVGs.map(({ x, y, r, id }) => {
    return {
      ...svgToPx(x, y),
      r: svgRadiusToPx(r),
      id
    };
  });

  // State
  let joystickColor = 'White';
  let buttonColors = Array(8).fill('White');
  let selectedLegend: LegendOption = 'No Legend';
  let customLegends: Record<string, string> = buttonSVGs.reduce((acc: Record<string, string>, btn) => {
    acc[btn.id] = '';
    return acc;
  }, {} as Record<string, string>);

  // Function to get the current legend for a button
  function getButtonLegend(buttonId: string): string | null {
    if (selectedLegend === 'No Legend') {
      return null;
    }
    
    if (selectedLegend === 'Custom') {
      return customLegends[buttonId] || '';
    }
    
    return BUTTON_LEGENDS[selectedLegend]?.[buttonId] || '';
  }

  // Function to determine legend position (above or below button)
  function getLegendPosition(buttonId: string): string {
    // Position legends above buttons in the top row, below buttons in the bottom row
    const topRowButtons = ['_3P', 'HP', 'MP', 'LP'];
    return topRowButtons.includes(buttonId) ? 'above' : 'below';
  }
</script>

<style>
.arcade-panel {
  position: relative;
  width: 600px; /* Using PANEL_PX_WIDTH value */
  height: 347px; /* Using calculated PANEL_PX_HEIGHT value: 600 * (220/380) = 347 */
  background: #222;
  border-radius: 24px; /* Approximates the rounded corners in the SVG outline */
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  /* The SVG outline path defines a rounded rectangle with these dimensions */
  /* M19.9233 220.0667l340 0c5.3077,-0.0034 10.3967,-2.1151 14.1474,-5.8706... */
}
.button-legend {
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
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
.panel-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.joystick, .arcade-btn {
  position: absolute;
  z-index: 2;
  transition: box-shadow 0.2s;
}
.joystick {
  border-radius: 50%;
  border: 3px solid #444;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.arcade-btn {
  border-radius: 50%;
  border: 2px solid #222;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.screw {
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  border: 1px solid #555;
  background: #777;
  box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
}
.controls {
  margin-top: 20px;
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
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

<div class="arcade-panel" style="width: {PANEL_PX_WIDTH}px; height: {PANEL_PX_HEIGHT}px;">
  <img class="panel-bg" src="{customArtwork || defaultArt}" alt="Arcade Panel Artwork" />
  <!-- Joystick -->
  <div
    class="joystick"
    style="left: {joystick.x - joystick.r}px; top: {joystick.y - joystick.r}px; width: {joystick.r*2}px; height: {joystick.r*2}px; background: {joystickColor.toLowerCase()};"
    title="Joystick (StickTop)"
    data-id="{joystickSVG.id}"
  ></div>
  <!-- Buttons -->
  {#each buttons as btn, i}
    <div
      class="arcade-btn"
      style="left: {btn.x - btn.r}px; top: {btn.y - btn.r}px; width: {btn.r*2}px; height: {btn.r*2}px; background: {buttonColors[i].toLowerCase()};"
      title="{btn.id} Button"
      data-id="{btn.id}"
    >
      {#if selectedLegend !== 'No Legend' && getButtonLegend(btn.id)}
        <div
          class="button-legend legend-{getLegendPosition(btn.id)}"
          style="left: 50%;"
        >
          {getButtonLegend(btn.id)}
        </div>
      {/if}
    </div>
  {/each}
  <!-- Screws -->
  {#each screws as screw}
    <div
      class="screw"
      style="left: {screw.x - screw.r}px; top: {screw.y - screw.r}px; width: {screw.r*2}px; height: {screw.r*2}px;"
      title="Mounting Screw"
      data-id="{screw.id}"
    ></div>
  {/each}
</div>

<div class="controls">
  <!-- Artwork Upload Section -->
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
          {customArtwork ? 'Custom artwork selected' : 'No file chosen'}
        </span>
      </div>
      
      <button
        class="reset-button"
        on:click={resetArtwork}
        disabled={!customArtwork}
      >
        Reset to Default
      </button>
      
      <p class="artwork-info">
        {#if customArtwork}
          <span class="using-custom">✓ Using custom artwork</span>
        {:else}
          Upload your own artwork to personalize your arcade panel.
          <br>Recommended size: 600×347 pixels or similar aspect ratio.
        {/if}
      </p>
    </div>
  </div>

  <!-- Controls Section -->
  <div class="control-section">
    <h3>Controls Customization</h3>
    <div>
      <label for="joystick-color">Joystick Color:</label>
      <select id="joystick-color" bind:value={joystickColor}>
        {#each COLORS as color}
          <option value={color}>{color}</option>
        {/each}
      </select>
    </div>
    <div>
      <p>Button Colors:</p>
    {#each buttonColors as color, i}
      <div style="display: inline-block; margin-right: 8px;">
        <label for={"button-color-" + i}>{buttons[i].id} Button:</label>
        <select id={"button-color-" + i} bind:value={buttonColors[i]}>
          {#each COLORS as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>
    {/each}
    </div>
  </div>

  <!-- Button Legend Section -->
  <div class="control-section">
    <h3>Button Legend</h3>
    <div>
      <label for="button-legend">Legend Style:</label>
      <select id="button-legend" bind:value={selectedLegend}>
        {#each LEGEND_OPTIONS as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
    
    {#if selectedLegend === 'Custom'}
      <div style="margin-top: 10px;">
        <p>Custom Button Labels:</p>
        {#each buttons as btn, i}
          <div style="display: inline-block; margin-right: 8px; margin-bottom: 8px;">
            <label for={"custom-legend-" + btn.id}>{btn.id} Label:</label>
            <input
              type="text"
              id={"custom-legend-" + btn.id}
              bind:value={customLegends[btn.id]}
              style="width: 50px;"
              maxlength="4"
            />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>