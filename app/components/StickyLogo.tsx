import Image from "next/image"; 

export default function StickyLogo() {
  return (
    <div className="fixed p-10 z-50 flex justify-center items-center">
      <Image
        src="/scrll_logo.svg"
        alt="Scrrll Logo"
        width={200}
        height={200}
        className="object-contain"
      />
    </div>
  );
}