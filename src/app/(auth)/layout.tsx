import Image from "next/image";
import Logo from "@/components/shared/Logo";
import { bannerImage } from "@/lib/data";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-10 p-6 md:p-10">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>

      <div className="relative isolate hidden overflow-hidden lg:block">
        <Image
          src={bannerImage}
          alt="Floodlit stadium at night"
          fill
          priority
          sizes="50vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary ring-1 ring-primary/40">
            Book. Play. Repeat.
          </span>
          <h2 className="text-3xl font-bold tracking-tight">
            Your next game starts here.
          </h2>
          <p className="mt-3 max-w-md text-white/80">
            Turfs, courts, pools and gyms near you. Lock in your slot in
            seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default layout;
