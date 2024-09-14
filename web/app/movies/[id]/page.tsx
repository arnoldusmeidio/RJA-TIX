import GetCinemaShowtimes from "@/components/GetCinemaShowtimes";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <GetCinemaShowtimes params={params} />
    </div>
  );
}
