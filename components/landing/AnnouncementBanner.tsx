export function AnnouncementBanner() {
  const text = "First 200 NYC users get founding member pricing.";

  return (
    <div className="fixed top-0 left-0 right-0 z-[1001] bg-black py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="font-headline text-[0.6rem] sm:text-[0.7rem] font-semibold tracking-[0.03em] text-white mx-8"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
