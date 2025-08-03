declare module "vanta/dist/vanta.globe.min" {
  export default function GLOBE(options: {
    el: HTMLElement;
    THREE?: any;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
    spacing?: number;
  }): {
    destroy(): void;
    resize(): void;
  };
}

declare module "vanta" {
  export const GLOBE: any;
}
