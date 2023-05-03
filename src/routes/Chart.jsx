import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { getUsers } from "../redux/features/usersSlice";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
  const users = useSelector(getUsers);

  const [labels, DataValues] = useMemo(() => {
    const skillsCounterObj = {};

    users.forEach(user =>
      user.skills.forEach(skill => {
        if (!skillsCounterObj[skill]) skillsCounterObj[skill] = 1;
        else skillsCounterObj[skill] += 1;
      })
    );

    return [Object.keys(skillsCounterObj), Object.values(skillsCounterObj)];
  }, [users]);

  const data = {
    labels: labels,
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: DataValues,
      },
    ],
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ paddingTop: "2rem" }}>
        <Bar
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Most skills that People have",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </Container>
    </div>
  );
}
