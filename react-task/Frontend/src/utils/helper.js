export const helper = {
  rowColor: (value) => {
    let color =
      value === "Node.js" ? "#FFFF33" : value === "PHP" ? "#008000" : "#808080";
    return color;
  },
  formateDate: (date) => {
    const dateObject = new Date(date);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

   
    let formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateObject
    );
   
    return formattedDate;
  },
};
