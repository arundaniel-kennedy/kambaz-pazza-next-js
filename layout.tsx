import Navigation from "./Navigation";

export default function PazzaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div> 
      {/* provider here */}
      <Navigation />
      {children}
    </div>
  );
}