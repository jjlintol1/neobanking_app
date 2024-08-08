import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex w-full items-center justify-between ">
        <Skeleton className="h-[32px] w-[300px] rounded-md bg-card-light dark:bg-card-dark" />
        <div className="hidden items-center gap-4 sm:flex">
          <Skeleton className="size-[20px] rounded-full bg-card-light dark:bg-card-dark" />
          <Skeleton className="size-[40px] rounded-full bg-card-light dark:bg-card-dark" />
          <div className="lg:flex flex-col items-start hidden">
            <Skeleton className="h-[28px] w-[100px] bg-card-light dark:bg-card-dark" />
            <Skeleton className="h-[20px] w-[150px] bg-card-light dark:bg-card-dark" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:gap-10">
        <div>
          <Skeleton className="h-[24px] w-[100px] bg-card-light dark:bg-card-dark" />
          <Skeleton className="mt-5 h-[100px] w-[200px] bg-card-light dark:bg-card-dark" />
          <div className="mt-5 flex w-full items-center gap-5">
            <Skeleton className="h-[40px] w-[150px] bg-card-light dark:bg-card-dark" />
          </div>
        </div>
        <div className="overflow-hidden md:pl-0">
          <Skeleton className="aspect-video min-h-[150px] w-[90%] bg-card-light dark:bg-card-dark md:min-h-[200px]" />
        </div>
      </div>
      <div className="mt-10 w-full">
        <div className="hidden w-full items-center justify-between md:flex">
          <Skeleton className="h-[28px] w-[100px] bg-card-light dark:bg-card-dark" />
          <Skeleton className="h-[40px] w-[150px] bg-card-light dark:bg-card-dark" />
        </div>
        <Skeleton className="mt-5 h-[200px] w-full bg-card-light dark:bg-card-dark" />
        <div className="mt-5 flex w-full items-center justify-center">
          <Skeleton className="h-[40px] w-[150px] bg-card-light dark:bg-card-dark" />
        </div>
      </div>
    </>
  );
}
