export default function Pen({ fill = false }: { fill?: boolean }) {
  if (fill) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
      >
        <path d="M194-194h57l371-371-57-56-371 371v56ZM88-88v-206l558-558q11-11 24.5-15.5T698-872q14 0 26.5 4t23.5 15l105 105q11 11 15 24t4 27q0 14-4.5 27T852-646L294-88H88Zm666-609-57-56 57 56ZM594-593l-29-28 57 56-28-28Z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
    >
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
    </svg>
  );
}
