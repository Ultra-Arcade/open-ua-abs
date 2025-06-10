<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  
  // Props
  export let value: string = '#ffffff';
  export let size: number = 150;
  export let label: string = '';
  
  // Internal state
  let canvas: HTMLCanvasElement;
  let colorPreview: HTMLDivElement;
  let isDragging = false;
  let ctx: CanvasRenderingContext2D;
  let centerX: number;
  let centerY: number;
  let radius: number;
  
  const dispatch = createEventDispatcher<{ change: string }>();
  
  onMount(() => {
    // Initialize canvas
    ctx = canvas.getContext('2d')!;
    centerX = size / 2;
    centerY = size / 2;
    radius = size / 2 - 5;
    
    // Draw color wheel
    drawColorWheel();
    
    // Set initial color
    updateColorPreview(value);
  });
  
  function drawColorWheel() {
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Set color based on HSL
      const hue = angle;
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      
      gradient.addColorStop(0, '#ffffff'); // White at center
      gradient.addColorStop(0.7, `hsl(${hue}, 100%, 50%)`); // Full saturation
      gradient.addColorStop(1, '#000000'); // Black at edge
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  
  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    handleColorSelect(event);
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      handleColorSelect(event);
    }
  }
  
  function handleMouseUp() {
    isDragging = false;
  }
  
  function handleColorSelect(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate distance from center
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only select color if within the wheel radius
    if (distance <= radius) {
      // Get pixel color at the selected position
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const color = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
      
      // Update color and notify parent
      value = color;
      updateColorPreview(color);
      dispatch('change', color);
    }
  }
  
  function updateColorPreview(color: string) {
    if (colorPreview) {
      colorPreview.style.backgroundColor = color;
    }
  }
  
  // Helper function to convert RGB to HEX
  function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  }
</script>

<style>
  .color-wheel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .color-wheel {
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .color-preview {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .color-value {
    margin-top: 5px;
  }
  
  .color-value input {
    font-size: 14px;
    color: #555;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    width: 80px;
    text-align: center;
  }
  
  label {
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
  }
</style>

<div class="color-wheel-container">
  {#if label}
    <label for="color-value-input">{label}</label>
  {/if}
  
  <canvas
    bind:this={canvas}
    class="color-wheel"
    width={size}
    height={size}
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}
    on:mouseup={handleMouseUp}
    on:mouseleave={handleMouseUp}
  ></canvas>
  
  <div class="color-preview" bind:this={colorPreview}></div>
  <div class="color-value">
    <input
      id="color-value-input"
      type="text"
      bind:value={value}
      on:change={() => {
        updateColorPreview(value);
        dispatch('change', value);
      }}
    />
  </div>
</div>