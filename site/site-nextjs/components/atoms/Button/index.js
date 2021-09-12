import styled from "styled-components";

const _Button = styled.div``;

export default function Button({
  theme = "primary",
  children,
  onClick = null,
}) {
  const params = {};

  if (typeof onClick === "function") {
    params.onClick = onClick;
  }

  return <div {...params}>{children}</div>;
}
