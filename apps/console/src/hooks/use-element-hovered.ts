import * as React from 'react';

function useElementIsHovered<T extends HTMLElement | null = HTMLElement>(
  ref: React.RefObject<T>,
  clearOnInteraction = false,
): boolean {
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const onMouseEnter = () => {
      setIsHovered(true);
    };

    const onMouseLeave = () => {
      setIsHovered(false);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', onMouseEnter);
      element.addEventListener('mouseleave', onMouseLeave);
      if (clearOnInteraction) {
        element.addEventListener('click', onMouseLeave);
      }

      return () => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
        if (clearOnInteraction) {
          element.removeEventListener('click', onMouseLeave);
        }
      };
    }
  }, [clearOnInteraction, ref]);

  return isHovered;
}

export {useElementIsHovered};
