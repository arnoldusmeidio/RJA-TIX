// Komponen untuk menunjukan nomor kursi yg dipilih

export default function SeatNumber({
  row,
  column,
}: {
  row: number;
  column: number;
}) {
  return <div>{`${row}.${column}`}</div>;
}
