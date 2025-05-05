import { Card } from 'flowbite-react';
import { Pie, Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { useStatistic } from '../../hooks/useStatistic';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useUsers } from '../../hooks/useUsers';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
    const { res, error, refetch } = useStatistic();
    const { res: resUsers } = useUsers();

    const dataStatistic = res?.data ?? {};

    const countRoles = (users) => {
        if (users?.length <= 0)
            return [0, 0, 0];  // Trả về mảng với ba phần tử nếu không có user

        // Khởi tạo một đối tượng để đếm số lượng role
        const roleCount = {
            1: 0,
            2: 0,
            3: 0
        };

        // Duyệt qua từng user trong mảng
        users.forEach(user => {
            // Kiểm tra nếu role của user có id là 1, 2, hoặc 3 và tăng số lượng tương ứng
            if (user.role.id === 3) {
                roleCount[3]++;
            } else if (user.role.id === 1) {
                roleCount[1]++;
            } else if (user.role.id === 2) {
                roleCount[2]++;
            }
        });

        // Trả về mảng với thứ tự role.id = 3, 1, 2
        return [roleCount[3], roleCount[1], roleCount[2]];
    };

    const accountData = {
        labels: ['User Accounts', 'Admin Accounts', "Recruiter Accounts"],
        datasets: [
            {
                data: countRoles(resUsers?.data ?? []),
                backgroundColor: ['#d8b4fe', '#86efac', '#deb053'],
                hoverOffset: 4,
            },
        ],
    };

    const postData = {
        labels: ['Active', 'UnActive'],
        datasets: [
            {
                data: [dataStatistic?.totalJobs, 1],
                backgroundColor: ['#60a5fa', '#38bdf8'],
                hoverOffset: 4,
            },
        ],
    };

    const sortJobStatisticByMonth = (jobStatistic = []) =>
        [...jobStatistic].sort((a, b) => a.month - b.month);

    const labels = sortJobStatisticByMonth(dataStatistic?.jobStatistic)?.map(job => job.month) ?? [];
    const values = sortJobStatisticByMonth(dataStatistic?.jobStatistic)?.map(job => job.totalJobs) ?? [];
    const data = {
        labels,
        datasets: [
            {
                label: 'Tổng số Jobs theo tháng',
                data: values,
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ số lượng Jobs theo tháng',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                    color: '#6b7280', // Màu chữ xám
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Số lượng Jobs',
                    color: '#6b7280',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    const stats = [
        { title: 'Total Users', value: dataStatistic?.totalUsers ?? 0, color: 'bg-blue-600' },
        { title: 'Total Jobs', value: dataStatistic?.totalJobs ?? 0, color: 'bg-green-700' },
        { title: 'Total Companies', value: dataStatistic?.totalCompanies ?? 0, color: 'bg-indigo-600' },
        { title: 'Total Candidates', value: dataStatistic?.totalCandidates ?? 0, color: 'bg-orange-700' },
        { title: 'Total Applications', value: dataStatistic?.totalApplications ?? 0, color: 'bg-yellow-600' },

    ];

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className='text-2xl mb-4 font-medium text-slate-800 animate-pulse'>SYSTEM STATISTIC</h1>
            {/* Top stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {stats.map((item, idx) => (
                    <Card key={idx} className={`text-white ${item.color}`}>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl font-bold">
                                <CountUp end={item.value} duration={3} separator="," />
                            </div>
                            <div className="text-md">{item.title}</div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Pie charts */}
            <div className="flex flex-col lg:flex-row gap-10 my-12 items-center justify-center">
                <Card>
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Account Statistic</h2>
                    <Pie data={accountData} />
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Job Statistic</h2>
                    <Pie data={postData} />
                </Card>
            </div>

            {/* Line chart */}
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Biểu đồ Jobs theo tháng</h2>
                    <Line data={data} options={options} />
                </Card>
            </div>
        </div>
    );
}

export default withErrorBoundary(DashboardPage); 