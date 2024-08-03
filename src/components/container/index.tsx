export default function Container({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div id="container">{children}</div>;
}
