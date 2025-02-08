const ctx = document.getElementById("myChart");
const colors = [
  "#ea5545",
  "#f46a9b",
  "#ef9b20",
  "#edbf33",
  "#ede15b",
  "#bdcf32",
  "#87bc45",
  "#27aeef",
  "#b33dc6",
];

const getBudget = async () => {
  const res = await axios.get("/budget");
  return {
    labels: res?.data?.myBudget.map((d) => d.title),
    data: res?.data.myBudget.map((d) => d.budget),
  };
};

const { labels, data } = await getBudget();
const config = {
  type: "doughnut",
  data: {
    labels,
    datasets: [
      {
        data,
        label: "Budget",
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  },
};

new Chart(ctx, config);
