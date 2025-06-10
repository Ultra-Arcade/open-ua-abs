<script lang="ts">
  import { activeLayout, customArtwork, joystickColor, buttonColors, svgToPx, svgRadiusToPx, isImageInverted, isLayoutInverted } from '../../stores/arcade-store';
  import Joystick from '../elements/Joystick.svelte';
  import ArcadeButton from '../elements/ArcadeButton.svelte';
  import Screw from '../elements/Screw.svelte';
  
  // Default artwork path
  const defaultArt = '/art/default_art.png';
  
  // Function to calculate inverted X position
  function getInvertedX(x: number): number {
    if (!$isLayoutInverted) return x;
    const panelWidth = $activeLayout.dimensions.pxWidth;
    return panelWidth - x;
  }
</script>

<style>
  .arcade-panel {
    position: relative;
    background: #222;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    margin-bottom: 20px;
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
</style>

<div class="arcade-panel" style="width: {$activeLayout.dimensions.pxWidth}px; height: {$activeLayout.dimensions.pxHeight}px;">
  <img
    class="panel-bg"
    src="{$customArtwork || defaultArt}"
    alt="Arcade Panel Artwork"
    style="transform: translate(-50%, -50%) scaleX({$isImageInverted ? -1 : 1});"
  />
  
  <!-- Joystick -->
  <Joystick
    position={{
      x: getInvertedX(svgToPx(
        $activeLayout.elements.joystick.x,
        $activeLayout.elements.joystick.y,
        $activeLayout
      ).x),
      y: svgToPx(
        $activeLayout.elements.joystick.x,
        $activeLayout.elements.joystick.y,
        $activeLayout
      ).y
    }}
    radius={svgRadiusToPx($activeLayout.elements.joystick.r, $activeLayout)}
    color={$joystickColor}
    id={$activeLayout.elements.joystick.id}
  />
  
  <!-- Buttons -->
  {#each $activeLayout.elements.buttons as button, i}
    <ArcadeButton
      position={{
        x: getInvertedX(svgToPx(button.x, button.y, $activeLayout).x),
        y: svgToPx(button.x, button.y, $activeLayout).y
      }}
      radius={svgRadiusToPx(button.r, $activeLayout)}
      color={$buttonColors[i]}
      id={button.id}
      legendPosition={$activeLayout.getLegendPosition(button.id)}
    />
  {/each}
  
  <!-- Screws -->
  {#each $activeLayout.elements.screws as screw}
    <Screw
      position={{
        x: getInvertedX(svgToPx(screw.x, screw.y, $activeLayout).x),
        y: svgToPx(screw.x, screw.y, $activeLayout).y
      }}
      radius={svgRadiusToPx(screw.r, $activeLayout)}
      id={screw.id}
    />
  {/each}
</div>