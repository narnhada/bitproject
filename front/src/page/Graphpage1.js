import React, { useState, useEffect } from "react";
import "../css/graph.css";
import { Bar, Doughnut } from "react-chartjs-2";
import Axios from "axios";
import { produce } from "immer";

function Graphpage1() {
  const [dong, setDong] = useState(window.sessionStorage.getItem("dong"));
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [data1, setData1] = useState({
    labels: [],
    datasets: [
      {
        label: dong + " 구매력",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: dong + " 성장성",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [data3, setData3] = useState({
    labels: [],
    datasets: [
      {
        label: dong + " 집객력",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [data4, setData4] = useState({
    labels: [],
    datasets: [
      {
        label: dong + " 상권지표",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const palete2 = [
    "rgb(255,155,255)",
    "rgb(255,55,255)",
    "rgb(55,155,255)",
    "rgb(55,0,255)",
    "rgb(0,0,155)",
    "rgb(0,0,55)",
    "rgb(0,0,0)",
    "rgb(0,255,0)",
    "rgb(55,255,0)",
    "rgb(255,0,155)",
    "rgb(255,55,55)",
    "rgb(255,55,155)",
    "rgb(255,155,255)",
    "rgb(255,255,255)",
  ];
  const palete1 = [
    "rgb(255,255,155)",
    "rgb(255,255,55)",
    "rgb(255,55,155)",
    "rgb(255,55,0)",
    "rgb(155,0,0)",
    "rgb(55,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,255)",
    "rgb(0,55,255)",
    "rgb(155,255,0)",
    "rgb(55,255,55)",
    "rgb(155,255,55)",
    "rgb(255,255,155)",
    "rgb(255,255,255)",
  ];
  const palete = [
    "rgb(155,255,255,)",
    "rgb(55,255,255)",
    "rgb(55,155,255)",
    "rgb(55,0,255)",
    "rgb(0,0,155)",
    "rgb(0,0,55)",
    "rgb(0,0,0)",
    "rgb(0,255,0)",
    "rgb(55,255,0)",
    "rgb(255,0,155)",
    "rgb(255,55,55)",
    "rgb(255,55,155)",
    "rgb(255,155,255)",
    "rgb(255,255,255)",
  ];
  async function makeData() {
    const response = await Axios.get("/json/gu1.json");
    const jsondata = response.data.position;
    const tempLabels = [];
    const tempDatasets = [];
    const tempDatasetbackcol = [];
    for (let i = 0; i < jsondata.length; i++) {
      if (window.sessionStorage.getItem("gu") === jsondata[i].gu) {
        if (window.sessionStorage.getItem("dong") === jsondata[i].dong) {
          tempLabels.push(jsondata[i].gil);
          tempDatasets.push(jsondata[i].totalscore);
        }
      }
    }
    for (let i = 0; i < tempDatasets.length; i++) {
      tempDatasetbackcol.push(palete[i]);
    }
    setData(
      produce((draft) => {
        draft.labels = tempLabels;
        draft.datasets[0]["data"] = tempDatasets;
        draft.datasets[0]["borderColor"] = tempDatasetbackcol;
        draft.datasets[0]["backgroundColor"] = tempDatasetbackcol;
        return draft;
      })
    );
  }
  async function makeData1() {
    const response = await Axios.get("/json/sung1.json");
    const jsondata = response.data.position;
    const tempLabels = [];
    const tempDatasets = [];
    const tempDatasetbackcol = [];
    for (let i = 0; i < jsondata.length; i++) {
      if (window.sessionStorage.getItem("gu") === jsondata[i].gu) {
        if (window.sessionStorage.getItem("dong") === jsondata[i].dong) {
          tempLabels.push(jsondata[i].gil);
          tempDatasets.push(jsondata[i].totalscore);
        }
      }
    }
    for (let i = 0; i < tempDatasets.length; i++) {
      tempDatasetbackcol.push(palete1[i]);
    }
    setData1(
      produce((draft) => {
        draft.labels = tempLabels;
        draft.datasets[0]["data"] = tempDatasets;
        draft.datasets[0]["borderColor"] = tempDatasetbackcol;
        draft.datasets[0]["backgroundColor"] = tempDatasetbackcol;
        return draft;
      })
    );
  }
  async function makeData2() {
    const response = await Axios.get("/json/people.json");
    const jsondata = response.data.position;
    const tempLabels = [];
    const tempDatasets = [];
    const tempDatasetbackcol = [];
    for (let i = 0; i < jsondata.length; i++) {
      if (window.sessionStorage.getItem("gu") === jsondata[i].gu) {
        if (window.sessionStorage.getItem("dong") === jsondata[i].dong) {
          tempLabels.push(jsondata[i].gil);
          tempDatasets.push(jsondata[i].totalscore);
        }
      }
    }
    for (let i = 0; i < tempDatasets.length; i++) {
      tempDatasetbackcol.push(palete2[i]);
    }

    setData2(
      produce((draft) => {
        draft.labels = tempLabels;
        draft.datasets[0]["data"] = tempDatasets;
        draft.datasets[0]["borderColor"] = tempDatasetbackcol;
        draft.datasets[0]["backgroundColor"] = tempDatasetbackcol;
        return draft;
      })
    );
  }
  async function makeData3() {
    const response = await Axios.get("/json/sang.json");
    const jsondata = response.data.position;
    const tempLabels = [];
    const tempDatasets = [];
    const tempDatasetbackcol = [];
    for (let i = 0; i < jsondata.length; i++) {
      if (window.sessionStorage.getItem("gu") === jsondata[i].gu) {
        if (window.sessionStorage.getItem("dong") === jsondata[i].dong) {
          tempLabels.push(jsondata[i].gil);
          tempDatasets.push(jsondata[i].totalscore);
        }
      }
    }
    for (let i = 0; i < tempDatasets.length; i++) {
      tempDatasetbackcol.push(palete[i]);
    }
    setData3(
      produce((draft) => {
        draft.labels = tempLabels;
        draft.datasets[0]["data"] = tempDatasets;
        draft.datasets[0]["borderColor"] = tempDatasetbackcol;
        draft.datasets[0]["backgroundColor"] = tempDatasetbackcol;
        return draft;
      })
    );
  }

  useEffect(() => {
    makeData();
    makeData1();
    makeData2();
    makeData3();
  }, []);
  return (
    <>
      <div className="page1">
        <Bar
          width={300}
          height={100}
          data={data}
          options={{
            title: {
              display: true,
              text: dong + " 구매력",
              fontSize: 20,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                    stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                  },
                },
              ],
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        ></Bar>
        <Bar
          width={300}
          height={100}
          data={data1}
          options={{
            title: {
              display: true,
              text: dong + " 성장성",
              fontSize: 20,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                    stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                  },
                },
              ],
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        ></Bar>
        <Bar
          width={300}
          height={100}
          data={data2}
          options={{
            title: {
              display: true,
              text: dong + " 집객력",
              fontSize: 20,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                    stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                  },
                },
              ],
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        ></Bar>
        <Bar
          width={300}
          height={100}
          data={data3}
          options={{
            title: {
              display: true,
              text: dong + " 상권지표",
              fontSize: 20,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                    stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                  },
                },
              ],
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        ></Bar>

        {/* <Doughnut
          width={300}
          height={200}
          data={data}
          options={{
            title: {
              display: true,
              text: "서울시",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        ></Doughnut> */}
      </div>
    </>
  );
}

export default Graphpage1;
