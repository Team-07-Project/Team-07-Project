import { css } from "@emotion/react";
import { btnStyles } from "./btnStylesMap";

const Button = ({
  as: Component = "button",
  variant = "primary",
  size = "md",
  children,
  disabled,
  onClick,
  ...resProps
}) => (
  <Component
    css={ButtonStyle({ size, variant, disabled })}
    disabled={Component === "button" ? disabled : undefined}
    {...resProps}
    onClick={onClick}
  >
    {children}
  </Component>
);

export default Button;

const getVariantStyle = (variant, disabled) =>
  disabled
    ? css`
        ${btnStyles.variants.disabled}
      `
    : css`
        ${btnStyles.variants[variant]}
      `;

export const ButtonStyle = (props) => css`
  ${getVariantStyle(props.variant, props.disabled)};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${btnStyles.minWidth[props.size]};
  height: ${btnStyles.height[props.size]};
  padding: ${btnStyles.padding[props.size]};
  font-size: ${btnStyles.fontSize[props.size]};
  font-weight: ${btnStyles.fontWeight[props.size]};
  border-radius: ${btnStyles.radius[props.size]};
`;
