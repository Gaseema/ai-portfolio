# Reusable Voice Orb System

This project includes a comprehensive, reusable voice orb system that can be easily integrated into any page or component. The system consists of three main parts:

## Components

### 1. `InteractiveVoiceOrb` - The Core Component

The base orb component with all visual features and animations.

```tsx
import InteractiveVoiceOrb from "@/components/InteractiveVoiceOrb";

<InteractiveVoiceOrb
  isActive={true}
  isListening={false}
  isPulsing={false}
  size="medium"
  showFrequencyBars={true}
  showParticles={true}
  enableHover={true}
  onClick={() => console.log("Orb clicked!")}
/>;
```

**Props:**

- `isActive` - Shows wavy border rings and enhanced animations
- `isListening` - Shows frequency bars and listening glow
- `isPulsing` - Triggers pulse animation
- `size` - 'small' | 'medium' | 'large'
- `showFrequencyBars` - Display audio visualizer bars
- `showParticles` - Show orbiting particles
- `enableHover` - Enable hover effects
- `disabled` - Disable interactions
- `onClick` - Click handler

### 2. `SmartVoiceOrb` - The All-in-One Solution

Combines the orb with the hook for a complete solution.

```tsx
import SmartVoiceOrb from "@/components/SmartVoiceOrb";

<SmartVoiceOrb
  size="medium"
  showFrequencyBars={true}
  showParticles={true}
  onQuestionSelect={(question) => console.log("Question:", question)}
  onInputSubmit={(value) => console.log("Input:", value)}
  enableKeyboardReaction={true}
  withMotion={true}
  motionProps={{
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8 },
  }}
/>;
```

**Additional Props:**

- `onQuestionSelect` - Callback when a question is selected
- `onInputSubmit` - Callback when input is submitted
- `enableKeyboardReaction` - React to keyboard presses
- `activeByDefault` - Set orb as active by default to show wavy borders (default: true)
- `withMotion` - Wrap with Framer Motion
- `motionProps` - Motion animation properties

### 3. `useVoiceOrb` - The State Management Hook

For full control over orb behavior and state.

```tsx
import { useVoiceOrb } from "@/hooks/useVoiceOrb";
import InteractiveVoiceOrb from "@/components/InteractiveVoiceOrb";

const {
  isOrbActive,
  isOrbListening,
  orbPulse,
  orbRef,
  handleQuestionClick,
  handleInputSubmit,
  handleInputFocus,
  handleInputBlur,
  activateOrb,
  pulseOrb,
} = useVoiceOrb({
  onQuestionSelect: (question) => console.log("Question:", question),
  onInputSubmit: (value) => console.log("Input:", value),
  enableKeyboardReaction: true,
  disabled: false,
});

<InteractiveVoiceOrb
  ref={orbRef}
  isActive={isOrbActive}
  isListening={isOrbListening}
  isPulsing={orbPulse}
  size="medium"
/>;
```

**Hook Options:**

- `onInputFocus` - Callback when input gains focus
- `onInputBlur` - Callback when input loses focus
- `onQuestionSelect` - Callback when a question is selected
- `onInputSubmit` - Callback when input is submitted
- `enableKeyboardReaction` - React to keyboard presses (default: true)
- `disabled` - Disable all interactions (default: false)

**Hook Returns:**

- **State:** `isOrbActive`, `isOrbListening`, `orbPulse`, `orbRef`
- **Setters:** `setIsOrbActive`, `setIsOrbListening`, `setOrbPulse`
- **Handlers:** `handleQuestionClick`, `handleInputSubmit`, `handleInputFocus`, `handleInputBlur`
- **Manual Controls:** `activateOrb(duration)`, `pulseOrb(duration)`

## Usage Examples

### Simple Integration

```tsx
// Easiest way - just drop it in
<SmartVoiceOrb
  onQuestionSelect={(q) => setQuestion(q)}
  onInputSubmit={(v) => submitQuery(v)}
/>
```

### Custom Control

```tsx
// Full control over behavior
const orb = useVoiceOrb({
  onQuestionSelect: handleQuestion,
  enableKeyboardReaction: !isModalOpen,
});

<InteractiveVoiceOrb
  {...orb}
  size="large"
  showParticles={isSpecialMode}
/>

// Manual triggers
<button onClick={() => orb.activateOrb(5000)}>
  Activate Orb
</button>
```

### With Form Integration

```tsx
const orb = useVoiceOrb({
  onInputSubmit: (value) => {
    // Handle form submission
    submitForm(value);
  },
});

<form>
  <input
    onFocus={orb.handleInputFocus}
    onBlur={orb.handleInputBlur}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        orb.handleInputSubmit(e.currentTarget.value);
      }
    }}
  />
  <InteractiveVoiceOrb
    ref={orb.orbRef}
    isListening={orb.isOrbListening}
    isPulsing={orb.orbPulse}
  />
</form>;
```

## Features

### Visual States

- **Default:** Gentle rotation with subtle glow
- **Active:** Wavy borders, enhanced colors, particles
- **Listening:** Frequency bars, pulsing glow
- **Pulsing:** Scale animation for feedback

### Animations

- Smooth rotation and floating highlight
- Wavy border animations when active
- Frequency visualizer bars when listening
- Orbiting particles when active
- Responsive hover effects
- Keyboard reaction animations

### Responsive Design

- Three size options (small, medium, large)
- Mobile-optimized animations
- Scalable for different screen sizes

### Accessibility

- Keyboard interaction support
- Focus management
- Disabled state support
- ARIA-friendly structure

## Example Page

Visit `/orb-examples` to see all the orb variations in action with interactive demos and code examples.

## Customization

All animations, colors, and effects can be customized through the CSS-in-JS styles in `InteractiveVoiceOrb.tsx`. The component uses CSS custom properties for easy theming:

```css
/* Example customizations */
.orb-surface {
  background: linear-gradient(135deg, #your-colors);
}

.wavy-border-ring {
  border-color: rgba(your-color, 0.4);
}
```

This reusable system makes it easy to add the engaging voice orb interaction to any part of your application!
