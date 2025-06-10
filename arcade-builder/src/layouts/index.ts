import basicVewlix from './basic-vewlix';

// Export all available layouts
const layouts = [
  basicVewlix,
  // Add more layouts here as they are created
];

export default layouts;

// Type definition for layout objects
export type LayoutElement = {
  x: number;
  y: number;
  r: number;
  id: string;
};

export type Layout = {
  id: string;
  name: string;
  dimensions: {
    mmWidth: number;
    mmHeight: number;
    pxWidth: number;
    pxHeight: number;
  };
  elements: {
    joystick: LayoutElement;
    buttons: LayoutElement[];
    screws: LayoutElement[];
  };
  buttonLegends: Record<string, Record<string, string>>;
  getLegendPosition: (buttonId: string) => string;
};