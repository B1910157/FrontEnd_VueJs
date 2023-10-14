<template>
    <div>
        <!-- Biểu đồ tròn -->
        <canvas id="pieChart" width="400" height="400"></canvas>

        <!-- Biểu đồ cột -->
        <canvas id="barChart" width="400" height="400"></canvas>
        <canvas id="lineChart" width="400" height="400"></canvas>

    </div>
</template>
  
<script>
// Import Chart.js
import Chart from 'chart.js/auto';

export default {
    mounted() {
        // Lấy tham chiếu đến các thẻ canvas
        const pieChartCanvas = document.getElementById('pieChart');
        const barChartCanvas = document.getElementById('barChart');

        // Vẽ biểu đồ tròn
        new Chart(pieChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                ],
            },
        });
        // Vẽ biểu đồ đường
        const lineChartCanvas = document.getElementById('lineChart');
        new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        label: 'My Line Dataset',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false, // Để vẽ đường không đổ màu
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });


        // Vẽ biểu đồ cột
        new Chart(barChartCanvas, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    },
};
</script>
  