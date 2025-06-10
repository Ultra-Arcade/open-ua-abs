import { writable, derived, get } from 'svelte/store';
import layouts from '../layouts';
import type { Layout } from '../layouts';

// Available color options
export const COLORS = ['White', 'Black', 'Red', 'Green', 'Blue', 'Yellow', 'Pink'];


// Button legend options
export const LEGEND_OPTIONS = ['No Legend', 'PlayStation', 'Xbox', 'Switch', 'Arcade', 'Custom'] as const;
export type LegendOption = typeof LEGEND_OPTIONS[number];

// Store for the active layout ID
export const activeLayoutId = writable<string>(layouts[0].id);

// Derived store for the active layout
export const activeLayout = derived<typeof activeLayoutId, Layout>(
  activeLayoutId,
  $id => layouts.find(layout => layout.id === $id) || layouts[0]
);

// Store for custom artwork
export const customArtwork = writable<string | null>(null);

// Store for image inversion
export const isImageInverted = writable<boolean>(false);

// Store for joystick color
export const joystickColor = writable<string>('White');

// Store for button colors (array of colors for each button)
export const buttonColors = writable<string[]>(Array(8).fill('White'));

// Store for selected legend style
export const selectedLegend = writable<LegendOption>('No Legend');

// Store for layout inversion
export const isLayoutInverted = writable<boolean>(false);

// Store for custom legends (when using custom legend option)
export const customLegends = writable<Record<string, string>>({});

// Store for legend color (when using custom legend option)
export const legendColor = writable<string>('White');

// Initialize custom legends with empty values for all buttons
const initCustomLegends = derived(activeLayout, $layout => {
  const initialCustomLegends: Record<string, string> = {};
  
  $layout.elements.buttons.forEach(btn => {
    initialCustomLegends[btn.id] = '';
  });
  
  customLegends.set(initialCustomLegends);
  
  return initialCustomLegends;
});

// Subscribe to the derived store to ensure initialization runs
initCustomLegends.subscribe(() => {});

// Helper function to get the current legend for a button
export function getButtonLegend(buttonId: string): string | null {
  // Get current values from stores
  const legend = get(selectedLegend);
  
  if (legend === 'No Legend') {
    return null;
  }
  
  if (legend === 'Custom') {
    const legends = get(customLegends);
    return legends[buttonId] || '';
  }
  
  const layout = get(activeLayout);
  return layout.buttonLegends[legend]?.[buttonId] || '';
}


// Function to handle artwork upload
export function handleArtworkUpload(event: Event): void {
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
    customArtwork.set(fileUrl);
    
    // Reset image inversion when uploading a new image
    isImageInverted.set(false);
  }
}

// Function to toggle image inversion
export function toggleImageInversion(): void {
  isImageInverted.update(value => !value);
}

// Function to toggle layout inversion
export function toggleLayoutInversion(): void {
  isLayoutInverted.update(value => !value);
}

// Function to reset to default artwork
export function resetArtwork(): void {
  customArtwork.subscribe(artwork => {
    if (artwork) {
      URL.revokeObjectURL(artwork);
    }
  });
  customArtwork.set(null);
}

// Utility functions for coordinate conversion
export function svgToPx(x: number, y: number, layout: Layout) {
  return {
    x: (x / layout.dimensions.mmWidth) * layout.dimensions.pxWidth,
    y: (y / layout.dimensions.mmHeight) * layout.dimensions.pxHeight
  };
}

export function svgRadiusToPx(radius: number, layout: Layout) {
  return (radius / layout.dimensions.mmWidth) * layout.dimensions.pxWidth;
}