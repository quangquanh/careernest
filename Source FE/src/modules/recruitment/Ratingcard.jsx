import { Button, Card } from "flowbite-react";
import { useComments } from "../../hooks/useComments";
import CompanyCardSkeleton from "../../components/skeleton/CompanyCardSkeleton";
import { useMemo, useState } from "react";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import { Rate } from 'antd';
import ModalReviewCommentByAI from "./ModalReviewCommentByAI";

const RatingCard = ({ companyId = null }) => {
    const { res, isLoading, isFetching, error } = useComments(+companyId, 1, 500);
    const [openModal, setOpenModal] = useState(false);

    const getAverageRating = (comments) => {
        const totalComments = comments.length;
        if (totalComments === 0) return 0; // Nếu không có comment, trả về 0

        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        return (totalRating / totalComments).toFixed(1);
    }

    const getRatingStatistics = (comments) => {
        const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const totalComments = comments.length;

        // Duyệt qua tất cả các comment một lần để đếm rating
        comments.forEach(comment => {
            if (ratingCount[comment.rating] !== undefined) {
                ratingCount[comment.rating]++;
            }
        });

        // Nếu không có comment nào, trả về mảng rỗng
        if (totalComments === 0) {
            return [];
        }

        // Tính tỷ lệ phần trăm cho mỗi rating và trả về kết quả
        return Object.keys(ratingCount).map(star => {
            const percent = (ratingCount[star] / totalComments) * 100;
            return { star: parseInt(star), percent: parseFloat(percent.toFixed(2)) };
        });
    }
    // Sử dụng useMemo để tính toán rating statistics chỉ khi comments thay đổi
    const ratingStatistics = useMemo(() => getRatingStatistics(res?.result || []), [res?.result]);

    if (res?.meta?.total <= 0) return null;
    if (error) {
        console.log(error);
        return null;
    }
    if (isFetching || isLoading)
        return (<CompanyCardSkeleton />)
    return (
        <>
            <Card className="p-6 w-full max-w-4xl rounded-lg shadow-md dark:shadow-lg dark:bg-slate-800">
                <div className="flex flex-row items-center justify-between gap-8">

                    {/* Left Side */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="text-5xl font-bold text-gray-900 dark:text-white">{getAverageRating(res?.result)}</div>
                        <div className="flex text-orange-400 text-2xl mt-2">
                            <Rate disabled defaultValue={getAverageRating(res?.result)} />
                        </div>
                        <div className="text-md text-gray-600 dark:text-gray-300 mt-2 font-medium text-center">
                            {res?.meta?.total} {localStorage.getItem('i18nextLng') === 'vi' ? " đánh giá" : " reviews"}

                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col w-2/3 space-y-3">
                        {ratingStatistics.map((item) => (
                            <div key={item.star} className="flex items-center gap-2">
                                <span className="w-4 text-sm font-semibold dark:text-gray-300">{item.star}</span>
                                <span className="text-orange-400">&#9733;</span>
                                {/* Progress Custom */}
                                <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-orange-400 rounded-full"
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                                <span className="w-10 text-sm text-right dark:text-gray-300 font-semibold">{item.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    size="xs"
                    color="light"
                    className="w-fit p-3 mx-auto mt-3 text-blue-800"
                    onClick={() => setOpenModal(true)}
                >
                    {localStorage.getItem('i18nextLng') === 'vi' ? "AI đánh giá công ty" : "Evaluate company by AI"}
                    <span className="absolute animate-bounce top-0 right-0 mt-0 -mr-1 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-md shadow">
                        New
                    </span>
                </Button>
            </Card>

            {openModal &&
                <ModalReviewCommentByAI
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    dataComments={res?.result ?? []}
                />
            }
        </>

    );
}

export default withErrorBoundary(RatingCard);