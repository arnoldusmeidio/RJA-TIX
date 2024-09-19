export const Square = ({ booked = false, selected = false }) => {
  return (
    // Komponen kursi memakai logic berdasarkan kondisi booked dan selected
    <div
      className={`w-5 transition-all h-5 border border-black/50 rounded-t-lg shadow-md ${
        booked ? "bg-red-600 shadow-inner border-0 " : "bg-fourth"
      } ${
        selected ? "bg-third p-1 border-0 shadow-black/30 shadow-lg" : null
      }`}
    />
  );
};
