
export const convertTimeStampToString = (timestamp, isShowTime = false) => {
    if (!timestamp) return '';
    const now = new Date(); // Lấy thời gian hiện tại
    const createdDate = new Date(timestamp * 1000); // Chuyển timestamp từ giây sang milliseconds

    // Lấy số ngày từ 00:00 ngày hiện tại và 00:00 ngày tạo
    const diffInTime = now.setHours(0, 0, 0, 0) - createdDate.setHours(0, 0, 0, 0);
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24); // Chuyển đổi sự khác biệt thành số ngày

    if (diffInDays < 1) {
        return localStorage.getItem("i18nextLng") === 'vi' ? 'Hôm nay' : 'Today';
    } else {
        return `${Math.floor(diffInDays)}`;
    }
};
