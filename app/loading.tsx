export default function Loading() {
  return (
    <div className="bg-white">
      {/* Subtle instant navigation progress indicator */}
      <div
        aria-hidden="true"
        className="h-[2.5px] w-full animate-pulse bg-gradient-to-r from-[#E5092F] via-[#7137D8] to-[#8B5CF6]"
      />

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <div className="h-3 w-36 animate-pulse rounded bg-[#E8E8EC]" />
          <div className="h-10 w-full max-w-xl animate-pulse rounded-xl bg-[#F7F7F9]" />
          <div className="h-5 w-full max-w-lg animate-pulse rounded-lg bg-[#F7F7F9]" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-56 animate-pulse rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9]" />
          <div className="h-56 animate-pulse rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9]" />
          <div className="hidden h-56 animate-pulse rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] lg:block" />
        </div>
      </div>
    </div>
  );
}
