import { Square } from "./Square";

export default function Grid({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) {
  const renderRows = () => {
    const rowElements = [];

    for (let i = 0; i < rows; i++) {
      const columnElements = [];
      for (let j = 0; j < columns; j++) {
        columnElements.push(<Square key={`${i}-${j}`} />);
      }
      rowElements.push(
        // kolom kursi
        <div key={`row-${i}`} className="flex gap-2">
          {columnElements}
        </div>
      );
    }

    return (
      // baris kursi
      <div className="flex flex-col items-center gap-2 px-2 overflow-x-auto">
        {rowElements}
      </div>
    );
  };

  return <div className="w-full ">{renderRows()}</div>;
}
