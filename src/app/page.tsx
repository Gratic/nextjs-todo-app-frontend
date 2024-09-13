import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Image
        src="/minecraft.jpg"
        width={225}
        height={225}
        alt="Minecraft image"
      />
    </div>
  );
}
