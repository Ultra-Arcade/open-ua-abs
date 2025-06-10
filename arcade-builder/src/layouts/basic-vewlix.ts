// Basic Vewlix Layout Configuration
// Extracted from BasicArcadeLayout.svelte

export default {
  id: 'basic-vewlix',
  name: 'Basic Vewlix',
  
  // Real panel dimensions (mm)
  dimensions: {
    mmWidth: 380,
    mmHeight: 220,
    pxWidth: 600,
    pxHeight: 347, // Calculated as 600 * (220/380) = 347
  },
  
  elements: {
    // Joystick position and radius from SVG
    joystick: { 
      x: 103.9315, 
      y: 90.1081, 
      r: 12, 
      id: "StickTop" 
    },
    
    // Buttons with positions and IDs from SVG
    buttons: [
      { x: 280.0815, y: 92.1956, r: 15, id: "_3K" },  // 3K button
      { x: 286.0815, y: 52.7081, r: 15, id: "_3P" },  // 3P button
      { x: 245.0816, y: 92.1956, r: 15, id: "HK" },   // HK button
      { x: 251.0815, y: 52.6956, r: 15, id: "HP" },   // HP button
      { x: 210.0815, y: 92.1956, r: 15, id: "MK" },   // MK button
      { x: 216.0815, y: 52.7081, r: 15, id: "MP" },   // MP button
      { x: 175.0815, y: 107.0456, r: 15, id: "LK" },  // LK button
      { x: 181.0815, y: 67.5581, r: 15, id: "LP" }    // LP button
    ],
    
    // Screw positions from SVG (6 mounting points)
    screws: [
      { x: 189.9233, y: 27.5667, r: 1.6, id: "Screw" },
      { x: 189.9233, y: 192.5667, r: 1.6, id: "Screw_0" },
      { x: 356.4232, y: 192.5667, r: 1.6, id: "Screw_1" },
      { x: 356.4232, y: 27.5667, r: 1.6, id: "Screw_2" },
      { x: 23.4232, y: 27.5667, r: 1.6, id: "Screw_3" },
      { x: 23.4232, y: 192.5667, r: 1.6, id: "Screw_4" }
    ]
  },
  
  // Button legend mappings for each platform
  buttonLegends: {
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
  },
  
  // Helper function to determine legend position (above or below button)
  getLegendPosition: (buttonId: string): string => {
    // Position legends above buttons in the top row, below buttons in the bottom row
    const topRowButtons = ['_3P', 'HP', 'MP', 'LP'];
    return topRowButtons.includes(buttonId) ? 'above' : 'below';
  }
};