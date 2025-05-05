import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { postWriteComment } from '../../services/commentService';
import { message, Rate } from 'antd';
import { Avatar, Badge, Button, Pagination, Textarea } from 'flowbite-react';
import { useMutation } from '@tanstack/react-query';
import { HiStar } from "react-icons/hi";
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { useSelector } from "react-redux";
import { useComments } from '../../hooks/useComments';
import CompanyCardSkeleton from '../../components/skeleton/CompanyCardSkeleton';
import { format } from 'date-fns';
import RatingCard from './Ratingcard';
import { useTranslation } from 'react-i18next';

const RecruitmentComment = ({ companyId = null }) => {
    const { t } = useTranslation();

    const user = useSelector(state => state?.user?.info);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const commentRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);

    const { res, isLoading, isFetching, error, refetch } = useComments(+companyId, +currentPage, 6);
    const dataComments = res?.result ?? [];
    const meta = res?.meta ?? {};

    const convertTimeStampToString = (timestamp) => {
        if (!timestamp) return '';
        try {
            const date = new Date(timestamp * 1000);
            return format(date, 'dd/MM/yyyy');
        } catch (error) {
            console.error('Error converting timestamp:', error);
            return '';
        }
    };


    const onPageChange = (page) => {
        setCurrentPage(+page);
    };

    const mutation = useMutation({
        mutationFn: postWriteComment,
        onSuccess: async (res) => {
            if (+res?.statusCode === 201) {
                message.success("Viết đánh giá thành công.");
                setRating(0);
                setHover(0);
                refetch();
                if (commentRef.current)
                    commentRef.current.value = "";
                mutation.reset();
            } else
                message.error('Có lỗi xảy ra!');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleSubmitComment = async () => {
        if (!user?.id) {
            message.warning("Vui lòng đăng nhập trước khi viết đánh giá!");
            return;
        }
        const commentValue = commentRef.current?.value || "";
        await mutation.mutateAsync({ rating, comment: commentValue, company: { id: +companyId } })
    };

    if (!companyId) return null;
    if (error) {
        console.log(error);
        return null;
    }
    if (isFetching || isLoading)
        return (<CompanyCardSkeleton />)
    return (
        <div className="w-full flex flex-col gap-4">
            {dataComments?.length <= 0 ?
                <Badge color="gray" size="sm" className='w-fit uppercase'>
                    {t('company_detail_page.empty_review')}
                </Badge>
                : <RatingCard companyId={companyId} />
            }

            <div className="flex flex-col gap-2">
                {/* Star rating */}
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <HiStar
                            key={star}
                            className={`w-6 h-6 cursor-pointer transition ${(hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                                }`}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                {/* Comment box using useRef */}
                <Textarea
                    className='outline-none p-2'
                    placeholder="Viết đánh giá của bạn..."
                    rows={6}
                    ref={commentRef}
                />

                {/* Submit button */}
                <Button onClick={handleSubmitComment} className="w-fit mt-2" disabled={rating === 0}>
                    {t('company_detail_page.review_button')}
                </Button>
            </div>

            {dataComments?.length > 0 &&
                <div className="overflow-y-auto h-[350px]">
                    {dataComments.map((item, index) => (
                        <article key={item?.id} className="p-6 mb-6 text-base rounded-lg bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex flex-col items-center gap-3">
                                    <p className="flex items-center font-semibold text-sm text-gray-900 dark:text-white">
                                        <Avatar
                                            alt="anonymous_comment"
                                            img=""
                                            size='sm'
                                            rounded
                                            className='mr-3'
                                        />
                                        {localStorage.getItem('i18nextLng') === 'vi' ? "Người đăng ẩn danh " : "Anonymous user "} {index + 1}
                                    </p>
                                    <div className='flex items-center gap-4'>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {convertTimeStampToString(item?.createdAt)}
                                        </p>
                                        <div>
                                            <Rate disabled defaultValue={+item?.rating} />
                                        </div>
                                    </div>
                                </div>
                                <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                </button>
                            </div>
                            <p className='dark:text-white text-sm'>
                                {item?.comment}
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                                <button type="button" className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                                    <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                    </svg>
                                    {localStorage.getItem('i18nextLng') === 'vi' ? "Phản hồi" : "Reply"}
                                </button>
                            </div>
                        </article>
                    ))}
                    <div className="flex overflow-x-auto justify-center mb-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={meta?.pages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    </div>
                </div>
            }


        </div>
    );
};

export default withErrorBoundary(RecruitmentComment);