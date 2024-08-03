export default function Container({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div id="container" className="flex h-screen flex-col">
      <div className="fixed left-0 top-0 z-[9999] hidden h-screen w-screen items-center justify-center bg-white md:flex">
        <p>現在このデバイスはサポートされていません</p>
      </div>
      {children}
    </div>
  );
}
