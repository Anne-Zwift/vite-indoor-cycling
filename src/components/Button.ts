// 1. Define the expected shape of the component's input arguments (props)
interface ButtonProps {
  text: string;
  // The onClick handler takes no arguments and returns nothing (void)
  onClick: (event: MouseEvent) => void; 
  styleClasses?: string; // Optional string for extra Tailwind classes
}

/**
 * Creates a reusable button component with defined text and click behavior.
 * @param {ButtonProps} props - The properties for the button component.
 * @returns {HTMLButtonElement} The fully constructed button element.
 */
export function createButton({ text, onClick, styleClasses }: ButtonProps): HTMLButtonElement {
  // 2. The function explicitly returns an HTMLButtonElement
  const button = document.createElement('button');
  
  // Apply base and custom styling
  button.className = `px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
  bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none 
  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${styleClasses || ''}`;
                      
  button.textContent = text;
  
  button.addEventListener('click', onClick);
  
  return button;
}