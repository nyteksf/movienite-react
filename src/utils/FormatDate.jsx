export const FormatDate = ({ date }) => {
    if (!date) return "Unknown Release Date";
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "June",
      "July",
      "Aug.",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const [year, month, day] = date.split("-");
    return <>{`${months[parseInt(month) - 1]} ${day}, ${year}`}</>;
  };
  