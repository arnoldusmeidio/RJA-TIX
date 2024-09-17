import SelectSeats from "@/components/SelectSeats";
import ShowRemainingSeats from "@/components/ShowRemainingSeats";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <ShowRemainingSeats params={params} />
      <SelectSeats params={params} />
    </div>
  );
}
