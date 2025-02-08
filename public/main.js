const ctx = document.getElementById("myChart");

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
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
};

new Chart(ctx, config);
