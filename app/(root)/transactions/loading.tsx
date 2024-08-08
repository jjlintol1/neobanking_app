import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between ">
        <Skeleton className="h-[32px] w-[300px] rounded-md bg-card-light dark:bg-card-dark" />
        <div className="items-center gap-4 hidden sm:flex">
          <Skeleton className="rounded-full size-[20px] bg-card-light dark:bg-card-dark" />
          <Skeleton className="size-[40px] rounded-full bg-card-light dark:bg-card-dark" />
          <div className="lg:flex flex-col items-start hidden">
            <Skeleton className="h-[28px] w-[100px] bg-card-light dark:bg-card-dark" />
            <Skeleton className="h-[20px] w-[150px] bg-card-light dark:bg-card-dark" />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-[56px] w-full bg-card-light dark:bg-card-dark" />
        <Skeleton className="h-[56px] w-full sm:w-[220px] lg:w-[300px] bg-card-light dark:bg-card-dark" />
      </div>
      <div className="mt-10">
        <Skeleton className="h-[400px] w-full bg-card-light dark:bg-card-dark" />
      </div>
      <div className="mt-5 flex w-full items-center justify-center">
        <Skeleton className="h-[40px] w-[150px] bg-card-light dark:bg-card-dark" />
      </div>
    </>
  );
};

export default Loading;
