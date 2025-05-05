-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2025 at 10:35 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `careernest`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `room_name` varchar(255) NOT NULL,
  `time_stamp` datetime(6) DEFAULT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `content`, `room_name`, `time_stamp`, `receiver_id`, `sender_id`) VALUES
(1, '2025-04-13 07:44:45.000000', '', NULL, NULL, 'dạ chào ạ', '10_7', '2025-04-13 14:44:45.000000', 7, 10),
(2, '2025-04-13 07:45:02.000000', '', NULL, NULL, 'cho em hỏi thông tin tuyển dụng ạ', '10_7', '2025-04-13 14:45:02.000000', 7, 10),
(3, '2025-04-13 08:11:39.000000', '', NULL, NULL, 'hi em', '10_7', '2025-04-13 15:11:39.000000', 10, 7),
(4, '2025-04-13 08:39:23.000000', '', NULL, NULL, 'bên cty chị còn tuyển Fresher Java nha em.', '10_7', '2025-04-13 15:39:22.000000', 10, 7),
(5, '2025-04-13 08:41:28.000000', '', NULL, NULL, 'dạ em cảm ơn ạ', '10_7', '2025-04-13 15:41:28.000000', 7, 10),
(6, '2025-04-13 08:41:34.000000', '', NULL, NULL, 'ok em', '10_7', '2025-04-13 15:41:34.000000', 10, 7),
(7, '2025-04-13 10:31:51.000000', '', NULL, NULL, 'da vang a', '10_7', '2025-04-13 17:31:51.000000', 7, 10),
(8, '2025-04-14 05:10:32.000000', '', NULL, NULL, 'hiii ạ', '10_12', '2025-04-14 12:10:32.000000', 12, 10),
(9, '2025-04-14 05:10:41.000000', '', NULL, NULL, 'chào em, sao nè', '10_12', '2025-04-14 12:10:41.000000', 10, 12),
(10, '2025-04-14 05:10:50.000000', '', NULL, NULL, 'cho em hỏi Job mình còn tuyển không ạ', '10_12', '2025-04-14 12:10:50.000000', 12, 10),
(25, '2025-04-25 01:13:51.000000', '', NULL, NULL, 'hiii', '10_7', '2025-04-25 08:13:51.000000', 10, 7),
(26, '2025-04-25 01:14:08.000000', '', NULL, NULL, 'eqwewq', '10_7', '2025-04-25 08:14:08.000000', 7, 10),
(27, '2025-04-25 06:30:07.000000', '', NULL, NULL, 'chào anh chị HR ạ', '10_17', '2025-04-25 13:30:07.000000', 17, 10);

-- --------------------------------------------------------

--
-- Table structure for table `chat_rooms`
--

CREATE TABLE `chat_rooms` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `chat_name` varchar(255) NOT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_rooms`
--

INSERT INTO `chat_rooms` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `chat_name`, `receiver_id`, `sender_id`) VALUES
(6, '2025-04-13 07:44:45.000000', '', NULL, NULL, '10_7', 7, 10),
(7, '2025-04-13 07:44:45.000000', '', NULL, NULL, '10_7', 10, 7),
(8, '2025-04-14 05:10:32.000000', '', NULL, NULL, '10_12', 12, 10),
(9, '2025-04-14 05:10:32.000000', '', NULL, NULL, '10_12', 10, 12),
(10, '2025-04-25 06:30:07.000000', '', NULL, NULL, '10_17', 17, 10),
(11, '2025-04-25 06:30:07.000000', '', NULL, NULL, '10_17', 10, 17);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `comment` mediumtext DEFAULT NULL,
  `rating` float NOT NULL,
  `company_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `comment`, `rating`, `company_id`) VALUES
(2, '2025-04-23 10:26:15.000000', 'hairyan789@gmail.com', NULL, NULL, 'Môi trường làm việc tại Gcalls rất chuyên nghiệp và thân thiện. Đội ngũ lãnh đạo hướng dẫn rất nhiệt tình, sáng tạo và luôn sẵn sàng lắng nghe ý kiến từ nhân viên.', 4, 1),
(3, '2025-04-23 11:19:18.000000', 'hairyan789@gmail.com', NULL, NULL, 'Gcalls không chỉ là nơi làm việc mà còn là nơi học hỏi và phát triển. Mình ấn tượng với văn hóa làm việc năng động và cởi mở ở đây — mọi người luôn hỗ trợ lẫn nhau, không có khoảng cách giữa các cấp. ', 5, 1),
(4, '2025-04-23 11:20:13.000000', 'hairyan789@gmail.com', NULL, NULL, 'Mười điểm không có nhưng kkk !', 4, 1),
(5, '2025-04-23 11:20:45.000000', 'hairyan789@gmail.com', NULL, NULL, 'Khối lượng công việc đôi khi khá cao, deadline gấp nhưng thiếu sự hỗ trợ kịp thời từ cấp trên.', 2, 1),
(6, '2025-04-23 11:20:52.000000', 'hairyan789@gmail.com', NULL, NULL, 'Cần cải thiện quy trình nội bộ và giao tiếp giữa các bộ phận để tránh hiểu lầm và chồng chéo công việc.', 2, 1),
(7, '2025-04-23 11:21:06.000000', 'hairyan789@gmail.com', NULL, NULL, 'Trải nghiệm làm việc không như mong đợi. Thiếu minh bạch trong quy trình và chưa có sự quan tâm đúng mức đến nhân viên.', 1, 1),
(8, '2025-04-23 11:21:28.000000', 'hairyan789@gmail.com', NULL, NULL, 'Môi trường chuyên nghiệp, đồng nghiệp thân thiện và có nhiều cơ hội phát triển bản thân. Mỗi ngày đi làm đều là một trải nghiệm tích cực!', 5, 1),
(10, '2025-05-04 04:47:35.000000', 'hairyan789@gmail.com', NULL, NULL, 'Môi trường làm việc thoải mái, chuyên nghiệp, nhân viên hỗ trợ nhiệt tình. Rất thích nơi làm việc này ạ.', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `expertise` varbinary(255) DEFAULT NULL,
  `founded_year` int(11) DEFAULT NULL,
  `industry` varchar(50) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `list_image` varbinary(255) DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `address`, `city`, `country`, `description`, `email`, `expertise`, `founded_year`, `industry`, `is_active`, `list_image`, `logo_url`, `name`, `phone`, `size`, `website`) VALUES
(1, '2025-03-17 03:43:56.000000', 'admin@gmail.com', '2025-03-27 11:36:11.000000', 'admin@gmail.com', '105 Khu Công nghệ phần mềm, Quận Thủ Đức, TP.Hồ Chí Minh', 'Ho Chi Minh', 'Viet Nam', '<p><span style=\"color: rgb(95, 107, 117);\">Gcalls là giải pháp phần mềm số hoá hệ thống điện thoại của doanh nghiệp, có khả năng tích hợp với nhiều phần mềm khác, giúp doanh nghiệp quản lý tập trung dữ liệu khách hàng và cuộc gọi, dễ dàng đánh giá KPI của đội ngũ bán hàng và CSKH, từ đó tăng doanh thu và nâng cao dịch vụ.</span></p><p><br></p><h2><strong>Giải pháp Tổng Đài Gcalls Sản phẩm Gcalls Plus Webphone và Gcalls Callbox</strong></h2><p><br></p><ol><li>Gcalls Plus Webphone</li><li>Gcalls CallBox</li></ol><p><br></p><h2 class=\"ql-align-justify\"><strong>Lợi ích của giải pháp</strong></h2><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><span style=\"color: rgb(95, 107, 117);\">Gcalls là giải pháp phần mềm số hoá hệ thống điện thoại của doanh nghiệp, có khả năng tích hợp với nhiều phần mềm khác, giúp doanh nghiệp quản lý tập trung dữ liệu khách hàng và cuộc gọi, dễ dàng đánh giá KPI của đội ngũ bán hàng và CSKH, từ đó tăng doanh thu và nâng cao dịch vụ.</span></p><p class=\"ql-align-justify\"><br></p><ol><li class=\"ql-align-justify\">Hiệu suất tăng 30 – 50%</li><li class=\"ql-align-justify\">Quy trình liền mạch</li><li class=\"ql-align-justify\">Nắm giữ mọi thông tin</li><li class=\"ql-align-justify\">Tăng trưởng nhanh chóng</li></ol><p class=\"ql-align-justify\"><br></p><h2 class=\"ql-align-justify\"><strong>Tại sao chọn Gcalls?</strong></h2><p><br></p><p>Khác với điện thoại bàn truyền thống, Gcalls giúp doanh nghiệp thiết lập và mở rộng tổng đài không dây trong vòng 5 phút ở bất kỳ quốc gia nào, lưu trữ mọi lịch sử tương tác, cho phép nhân sự hiểu rõ khách hàng trước khi trò chuyện.</p><p><br></p><p><br></p><h2><strong>Dịch Vụ Gọi OutBound</strong></h2><p><br></p><p><span style=\"color: rgb(95, 107, 117);\">Đội ngũ Outbound được đào tạo bài bản, làm việc online trên&nbsp;</span><span style=\"color: rgb(103, 58, 183);\">phần mềm tổng đài Gcalls</span><span style=\"color: rgb(95, 107, 117);\">. Doanh nghiệp có thể bảo mật dữ liệu bởi tính năng ẩn số điện thoại</span></p><p><br></p><ol><li>Truy cập báo cáo thống kê về khối lượng và chất lượng công việc bất cứ lúc nào và nơi đâu</li><li>Tiết kiệm chi phí và thời gian tuyển dụng - đào tạo</li><li>Đáp ứng nhu cầu theo thời vụ</li><li>Phục vụ nhiều ngôn ngữ khác nhau</li></ol><p><br></p><h2><strong>Dịch vụ thiết kế</strong><strong style=\"color: rgb(103, 58, 183);\">&nbsp;kịch bản cuộc gọi</strong></h2><p><br></p><p><span style=\"color: rgb(95, 107, 117);\">Thiết kế kịch bản cuộc gọi theo mục đích cuộc gọi và sản phẩm dịch vụ của doanh nghiệp. Kịch bản cuộc gọi tốt giúp:</span></p><p><br></p><ol><li>Tăng 50-80% tỷ lệ chuyển đổi</li><li>Giảm 80% lỗi sai sót khi trò chuyện với khách hàng</li><li>Thời gian đào tạo nhanh gấp 3 lần</li><li>Giảm tỷ lệ nghỉ việc 30%</li></ol>', 'sales@gcalls.co', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a6578700000000377040000000374000a4a6176617363726970747400064e6f64654a5374000752656163744a5378, 2013, 'Product', b'1', NULL, 'companies-c4f1563a-65f1-4555-ac8d-68f673bb0fcf', 'Công ty cổ phần Gcalls - Giải pháp tổng đài CSKH & Bán Hàng', '(+84) 8985 870 99', '100-150', 'https://gcalls.co/'),
(2, '2025-03-17 05:28:47.000000', 'admin@gmail.com', '2025-03-31 05:13:54.000000', 'admin@gmail.com', '52 Út Tịch, Phường 4, Tân Bình, Thành phố Hồ Chí Minh', 'Ho Chi Minh', 'Viet Nam', '<p><strong>Tiki</strong>&nbsp;là viết tắt của “Tìm kiếm &amp; Tiết kiệm”, là tên của website&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Th%C6%B0%C6%A1ng_m%E1%BA%A1i_%C4%91i%E1%BB%87n_t%E1%BB%AD\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">thương mại điện tử</a>&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Việt Nam</a>. Thành lập từ tháng 3 năm 2010<a href=\"https://vi.wikipedia.org/wiki/Tiki#cite_note-2\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[2]</sup></a>, Tiki hiện đang là trang thương mại điện tử lọt top 2 tại Việt Nam và top 6 tại khu vực&nbsp;<a href=\"https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_Nam_%C3%81\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Đông Nam Á</a>.</p><h2>Lịch sử</h2><p>Khởi đầu của Tiki chỉ là một&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Website\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">website</a>&nbsp;bán sách trực tuyến. Tháng 3 năm 2012,&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Qu%E1%BB%B9_%C4%91%E1%BA%A7u_t%C6%B0\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Quỹ đầu tư</a>&nbsp;CyberAgent Ventures Inc đã quyết định đầu tư vào Tiki<a href=\"https://vi.wikipedia.org/wiki/Tiki#cite_note-3\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[3]</sup></a>. Với việc đầu tư này, Tiki dần mở rộng thành một sàn thương mại điện tử.</p><p>Giai đoạn năm 2011 – 2012, Tiki trở thành đơn vị kinh doanh sách hàng đầu tại Việt Nam.</p><p>Giai đoạn năm 2013 – 2014, Tiki mở rộng lĩnh vực kinh doanh với rất nhiều ngành hàng khác. Lúc này, ngoài hơn 51.000 đầu sách thì người mua hàng có thể tìm thấy các mặt hàng từ&nbsp;<a href=\"https://vi.wikipedia.org/wiki/V%C4%83n_ph%C3%B2ng_ph%E1%BA%A9m\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">văn phòng phẩm</a>, nhu yếu phẩm đến điện tử, điện gia dụng,… ở Tiki. Ở giai đoạn này, Tiki bắt đầu đưa vào hoạt động hết công sức nhà kho diện tích rộng lên đến 3.000m2, bắt đầu chiếm lĩnh thị trường thương mại điện tử đang phát triển thần tốc ở Việt Nam.</p><p><br></p><p>Năm 2015, Tiki lọt top 5 website thương mại điện tử nổi bật nhất tại Việt Nam, đánh dấu tên tuổi và minh chứng cho sức ảnh hưởng của Tiki trên thị trường thương mại điện tử cũng như đối với người tiêu dùng Việt Nam.</p><p>Năm 2016, Tiki vươn lên trở thành công ty thương mại điện tử lớn thứ 2 Việt Nam, có mặt ở&nbsp;<a href=\"https://vi.wikipedia.org/wiki/T%E1%BB%89nh_th%C3%A0nh_Vi%E1%BB%87t_Nam\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">63 tỉnh thành</a>&nbsp;trên khắp cả nước.</p><p>Tháng 4 năm 2017 sau 7 năm thành lập, Tiki đánh dấu bước chuyển mình khi chuyển sang hình thức&nbsp;<a href=\"https://vi.wikipedia.org/w/index.php?title=Marketplace&amp;action=edit&amp;redlink=1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(221, 51, 51);\">Marketplace</a><a href=\"https://vi.wikipedia.org/wiki/Tiki#cite_note-4\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[4]</sup></a>, thu hút thêm nhà bán hàng gia nhập hệ thống website của Tiki.vn, mở rộng lên hàng chục ngành hàng với hơn 300.000 sản phẩm được bày bán.</p><p>Vào tháng 6 năm 2020, Tiki đã huy động được khoảng 130 triệu USD từ một vòng tài trợ do công ty cổ phần tư nhân Northstar Group<a href=\"https://vi.wikipedia.org/wiki/Tiki#cite_note-5\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[5]</sup></a>&nbsp;có trụ sở tại&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Singapore\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Singapore</a>&nbsp;dẫn đầu. Ban đầu dự kiến chỉ huy động được 75 triệu&nbsp;<a href=\"https://vi.wikipedia.org/wiki/%C4%90%C3%B4_la_M%E1%BB%B9\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">USD</a>&nbsp;nhưng sau đó vòng gọi vốn được tăng quy mô nhờ sự hỗ trợ từ các nhà đầu tư Thương mại điện tử khởi nghiệp&nbsp;<a href=\"https://vi.wikipedia.org/wiki/H%C3%A0n_Qu%E1%BB%91c\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Hàn Quốc</a>.</p><p><br></p><p>Với tốc độ tăng trưởng bình quân 30%, thị trường thương mại điện tử Việt Nam dự báo đạt 15 tỷ đô trong năm 2020 và nếu duy trì tốc độ tăng trưởng như hiện nay, con số doanh thu sẽ lên tới 33 tỷ USD vào năm 2025, xếp thứ ba trong khu vực&nbsp;<a href=\"https://vi.wikipedia.org/wiki/ASEAN\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">ASEAN</a>, sau&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Indonesia\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Indonesia</a>&nbsp;(100 tỷ USD) và&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Th%C3%A1i_Lan\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Thái Lan</a>&nbsp;(43 tỷ USD).<sup>[</sup><a href=\"https://vi.wikipedia.org/wiki/Wikipedia:Ch%C3%BA_th%C3%ADch_ngu%E1%BB%93n_g%E1%BB%91c\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup><em>cần dẫn nguồn</em></sup></a><sup>]</sup></p>', 'sales@tiki.co', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000067704000000067400044a6176617400054e6f53514c74000a506f737467726553514c7400074d6f6e676f44427400055675654a5374000b535052494e4720424f4f5478, 2010, 'Product', b'1', NULL, 'companies-cd52ebf6-9773-4e2b-94f9-674d6df969b3', 'Thương mại điện tử - Tiki', '1900 6035', '200-400', 'https://tiki.vn/'),
(3, '2025-03-17 05:36:46.000000', 'admin@gmail.com', '2025-03-27 11:39:17.000000', 'admin@gmail.com', 'Lầu 19, 20 Saigon Centre, 67 Lê Lợi, phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', 'Ho Chi Minh', 'Viet Nam', '<p><strong>Lazada Việt Nam</strong>&nbsp;là một sàn giao dịch&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Th%C6%B0%C6%A1ng_m%E1%BA%A1i_%C4%91i%E1%BB%87n_t%E1%BB%AD\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">thương mại điện tử</a>, là một phần của&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Lazada_Group\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Lazada Group</a>&nbsp;–&nbsp;<a href=\"https://vi.wikipedia.org/wiki/T%E1%BA%ADp_%C4%91o%C3%A0n\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">tập đoàn</a>&nbsp;thương mại điện tử&nbsp;<a href=\"https://vi.wikipedia.org/wiki/C%C3%B4ng_ty_%C4%91a_qu%E1%BB%91c_gia\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">đa quốc gia</a>&nbsp;và hiện đang có chi nhánh tại&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Indonesia\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Indonesia</a>,&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Philippines\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Philippines</a>,&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Singapore\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Singapore</a>,&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Th%C3%A1i_Lan\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Thái Lan</a>&nbsp;và&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Malaysia\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Malaysia</a>. Tập đoàn Lazada hiện thuộc sở hữu của&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Alibaba_(t%E1%BA%ADp_%C4%91o%C3%A0n)\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">tập đoàn Alibaba</a>.<a href=\"https://vi.wikipedia.org/wiki/Lazada_Vi%E1%BB%87t_Nam#cite_note-2\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[2]</sup></a></p><p><br></p><p>Lazada được điều hành bởi&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Gi%C3%A1m_%C4%91%E1%BB%91c\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">giám đốc</a>&nbsp;kiêm nhà sáng lập&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Ng%C6%B0%E1%BB%9Di_%C4%90%E1%BB%A9c\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">người Đức</a>&nbsp;<a href=\"https://vi.wikipedia.org/w/index.php?title=Maximilian_Bittner&amp;action=edit&amp;redlink=1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(221, 51, 51);\">Maximilian Bittner</a>. Sau đó,&nbsp;<a href=\"https://vi.wikipedia.org/wiki/T%E1%BA%ADp_%C4%91o%C3%A0n_Alibaba\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">tập đoàn Alibaba</a>&nbsp;của tỷ phú&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Ng%C6%B0%E1%BB%9Di_Trung_Qu%E1%BB%91c\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">người Trung Quốc</a>&nbsp;<a href=\"https://vi.wikipedia.org/wiki/M%C3%A3_V%C3%A2n_(th%C6%B0%C6%A1ng_nh%C3%A2n)\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Jack Ma</a>&nbsp;mua lại và hoàn tất thương vụ vào đầu năm 2016.<a href=\"https://vi.wikipedia.org/wiki/Lazada_Vi%E1%BB%87t_Nam#cite_note-3\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[3]</sup></a></p><p><br></p><p>Lazada có mô hình market place – là trung gian trong quy trình mua bán online. Trong tháng 1 năm 2016, Lazada Việt Nam xác nhận rằng công ty hiện đang làm việc với 3000 nhà cung cấp<a href=\"https://vi.wikipedia.org/wiki/Lazada_Vi%E1%BB%87t_Nam#cite_note-4\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[4]</sup></a>&nbsp;với 500.000 sản phẩm khác nhau.</p><p><br></p><p>Năm 2013, Lazada Việt Nam khánh thành nhà kho đầu tiên tại&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Khu_c%C3%B4ng_nghi%E1%BB%87p\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">khu công nghiệp</a>&nbsp;Vĩnh Lộc,&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">thành phố Hồ Chí Minh</a>. Ngay sau đó một trung tâm điều phối được mở tại&nbsp;<a href=\"https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_Nam_B%E1%BB%99\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">Đông Nam Bộ</a>&nbsp;trong năm 2014 nhằm phục vụ cho số lượng&nbsp;<a href=\"https://vi.wikipedia.org/wiki/Kh%C3%A1ch_h%C3%A0ng\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">khách hàng</a>&nbsp;tăng cao tại khu vực này.</p><p><br></p><p>Đến tháng 3 năm 2016, Lazada Việt nam có 35 trung tâm điều phối<a href=\"https://vi.wikipedia.org/wiki/Lazada_Vi%E1%BB%87t_Nam#cite_note-5\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup>[5]</sup></a>&nbsp;và 1 đội ngũ vận chuyển&nbsp;<a href=\"https://vi.wikipedia.org/w/index.php?title=Lazada_Express&amp;action=edit&amp;redlink=1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(221, 51, 51);\">Lazada Express</a>&nbsp;(LEX) do chính công ty cung cấp nhằm hỗ trợ&nbsp;<a href=\"https://vi.wikipedia.org/wiki/V%E1%BA%ADn_t%E1%BA%A3i\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\">vận chuyển</a>&nbsp;trực (FBL) cho nhà bán hàng.<sup>[</sup><a href=\"https://vi.wikipedia.org/wiki/Wikipedia:Ch%C3%BA_th%C3%ADch_ngu%E1%BB%93n_g%E1%BB%91c\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 102, 204);\"><sup><em>cần dẫn nguồn</em></sup></a><sup>]</sup></p>', 'sales@lazada.co', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a65787000000007770400000007740009576f7264707265737374000548544d4c357400054d7953514c7400074d6f6e676f4442740006546573746572740005514120514374000a4a61766173637269707478, 2012, 'Product', b'1', NULL, 'companies-c9171f7c-cbc0-4a89-8089-3f07cd22e051', 'Thương mại điện tử - Lazada', '1900 8891', '150-300', 'https://lazada.vn/'),
(4, '2025-03-17 05:51:20.000000', 'admin@gmail.com', '2025-03-31 09:57:42.000000', 'admin@gmail.com', '18 Lê Văn Lương, phường Trung Hòa, quận Cầu Giấy, Hà Nội', 'Ha Noi', 'Viet Nam', '<p>Ngân hàng TMCP Quân Đội (MB)</p><p><strong>Về chúng tôi</strong></p><p>&nbsp;</p><p>Với tầm nhìn \'Trở thành Doanh nghiệp số, Tập đoàn tài chính dẫn đầu\' cùng mục tiêu \'Top 3 thị trường\' về hiệu quả, hướng đến \'Top đầu châu Á\',&nbsp;MB đã và đang tiếp tục xây dựng, phát triển trong và ngoài nước, nhằm&nbsp;đáp ứng yêu cầu chuyển dịch số, mục tiêu tăng trưởng kinh doanh và nâng cao năng lực cạnh tranh.&nbsp;</p><p>&nbsp;</p><p>Sở hữu đội ngũ hơn 10.000 nhân sự,&nbsp;trong đó có hơn 1000 MBITers - chiếm 10% tổng nhân sự toàn Ngân hàng - nằm trong top đầu các ngân hàng tại Việt Nam về tỉ lệ nhân sự thuộc nhóm Công nghệ và Đổi mới, MB đang không ngừng đầu tư mạnh mẽ cho hệ thống, con người và kinh doanh nền tảng nhằm đem đến những trải nghiệm xuất sắc nhất cho khách hàng, xây dựng môi trường làm việc hạnh phúc, bền vững cho người MB.</p><p>&nbsp;</p><p><strong>Tự hào là Ngân hàng Số số 01 Việt Nam,&nbsp;được phục vụ hơn 30 triệu khách hàng cá nhân và doanh nghiệp.</strong></p><p>&nbsp;</p><p>Việt Nam đang sở hữu 07 ứng dụng có trên 10 triệu người sử dụng (Theo số liệu của Bộ Thông tin và Truyền thông năm 2023), MB là Ngân hàng duy nhất nằm trong danh sách đầy tự hào này. Tính đến hết năm 2024, MB chính thức chinh phục cột mốc 30 triệu khách hàng, tương đương 30% dân số Việt Nam, và đã cùng người dùng thực hiện 6,5 tỷ giao dịch trên kênh Số - giữ vững vị trí Top 1 quy mô NAPAS (Công ty Cổ phần Thanh toán Quốc gia Việt Nam). Trong đó, riêng ứng dụng App MBBank ghi nhận tần suất đỉnh chạm ngưỡng 20 triệu giao dịch/ngày, cùng hệ thống ổn định, an toàn, bảo mật.</p><p>&nbsp;</p><p><strong>Môi trường làm việc bền vững, hạnh phúc</strong></p><p>&nbsp;</p><p>Năm 2024 ghi dấu cột mốc MB30 về văn hoá và con người với 02 giải thưởng danh giá:&nbsp;<em>&nbsp;“Sustainable Workplace Awards – Doanh nghiệp có môi trường làm việc bền vững”&nbsp;</em>do HR Asia Awards (Tạp chí nhân sự uy tín hàng đầu Châu Á) và<em>&nbsp;“Happiness At Work – Doanh nghiệp có Nguồn nhân lực Hạnh phúc”</em>&nbsp;do Anphabe (Tổ chức tư vấn tiên phong về giải pháp Thương hiệu Nhà tuyển dụng và Môi trường làm việc) trao tặng.</p><p>&nbsp;</p><p>Đặc biệt, MB đã chính thức được vinh danh trong hạng mục “Vietnam Best IT Companies 2025” do chính các ứng viên của ITviec bình chọn. Và chúng tôi vẫn đang liên tục tìm kiếm những nhân tố xuất sắc, sáng tạo, đồng thời cam kết mang đến những giá trị, trải nghiệm tốt nhất cho nhân viên khi gia nhập tổ chức của mình.</p>', 'mb247@mbbank.com.vn', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000077704000000077400044a6176617400064f7261636c65740009416e67756c61724a5374000752656163744a5374000a4a61766173637269707474000b535052494e4720424f4f547400074d4f4e474f444278, 2000, 'Product', b'1', NULL, 'companies-e73906d1-9e17-46c4-a030-5e8dcc6e2353', 'MB Bank', '1900 5522', '600+', 'https://www.mbbank.com.vn/'),
(5, '2025-03-17 05:56:34.000000', 'admin@gmail.com', '2025-03-31 05:18:00.000000', 'admin@gmail.com', 'Số 27 Lê Văn Lương, Phường Nhân Chính, Quận Thanh Xuân, Hà Nội.', 'Ha Noi', 'Viet Nam', '<p>LG Electronics Development Vietnam (LGEDV)</p><p><strong>LGEDV</strong>&nbsp;was started in May 2016 as LG Vehicle Component Solutions Development Center Vietnam.&nbsp;</p><p>From 1st Jan 2023, the company embarked on a new journey to be an independent entity under the name LGEDV&nbsp;<strong>(LG Electronics Development Vietnam Company Limited)</strong>&nbsp;- new R&amp;D Subsidiary.</p><p>LGEDV conduct core R&amp;D activities, and various product reliability tests in support of our business in vehicle component, home appliances &amp;air solution, webOS.</p><p>We offer an environment that enables colleagues to demonstrate their capabilities, focus on their work and create value.</p><p>At LG, you\'re encouraged to take a creative and individual approach to challenges with strong emphasis placed on performance and skill—and equal, merit-based opportunities across the board.</p><p>Follow us to stay up to date with the latest job vacancies!</p>', 'lgcarecenter@lge.com', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000077704000000077400034f4f50740003432b2b7400064f7261636c65740006546573746572740008456d626564646564740007416e64726f6964740002432378, 1980, 'Product', b'1', NULL, 'companies-e3cd4f85-60d9-4b6e-aa31-e3e9d3b7072e', 'LG Electronics Development Vietnam', '1900 5522', '500+', 'https://www.lg.com.vn/'),
(6, '2025-03-17 06:01:47.000000', 'admin@gmail.com', '2025-03-31 05:18:56.000000', 'admin@gmail.com', 'Tòa nhà The Mett, 15 Đ. Trần Bạch Đằng, Thủ Thiêm, Thủ Đức, Hồ Chí Minh', 'Ho Chi Minh', 'Viet Nam', '<p>The Bosch Group is a leading global supplier of technology and services</p><p><strong>The Bosch Group</strong>&nbsp;is a leading global supplier of technology and services. Its operations have been divided into four business sectors: Automotive Technology, Industrial Technology, Consumer Goods, and Energy and Building Technology.</p><p>The Bosch Group comprises Robert Bosch GmbH and its roughly 460 subsidiaries and regional companies in some 60 countries. If its sales and service partners are included, then Bosch is represented in roughly 150 countries.</p><p><strong>Bosch Global Software Technologies Company Limited (BGSV)&nbsp;i</strong>s 100% owned subsidiary of Robert Bosch GmbH - one of the world’s leading global suppliers of technology and services, offering end-to-end Engineering, IT, and Business Solutions.&nbsp;</p><p>Starting its operation from 2010 at Etown 2 in HCMC, BGSV is the first software development center of Bosch in Southeast Asia. BGSV nowadays have over 4,000 associates, with a global footprint and presence in the US, Europe, and the Asia Pacific region.&nbsp;</p><p>With our unique ability to offer end-to-end solutions that connect sensors, software, and services, we enable businesses to move from the traditional to digital or improve businesses by introducing a digital element in their products and processes.</p>', 'boschcareer@gmail.com', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000077704000000077400034f4f50740003432b2b7400064f7261636c65740006546573746572740008456d626564646564740007416e64726f6964740002432378, 2001, 'Product', b'1', NULL, 'companies-dd5cf5c8-9c63-4980-9014-b47ac3588eaf', 'Bosch Global Software Technologies', '1900 2214', '400-600', 'hhttps://www.bosch.com.vn/'),
(7, '2025-03-27 08:22:28.000000', 'admin@gmail.com', '2025-03-31 09:38:09.000000', 'admin@gmail.com', 'The Hallmark, 15 Tran Bach Dang, Thu Thiem Ward, Thu Duc City, Ho Chi Minh', 'Ho Chi Minh', 'Singapore', '<h2><strong>Giới thiệu công ty</strong></h2><p><br></p><p>The NAB Innovation Centre Vietnam is owned by NAB - Australia’s largest business bank.</p><p>The NAB Innovation Centre Vietnam (NAB Vietnam) is part of National Australia Bank&nbsp;(NAB) Technology &amp; Enterprise Operations division. The mission of the NAB Vietnam is to connect the talents&nbsp;of Vietnam to NAB and together improve the lives of those in the Vietnam technology community.</p><p><br></p><p>As Australia’s largest business bank,&nbsp;NAB is focused on delivering great experiences for customers. To do this it uses modern technologies, alongside great technology talent including leading software engineers, cloud experts and quality engineers.</p><p><br></p><p><strong>We’re working on interesting projects to help NAB’s 10 million customers:</strong>&nbsp;By joining&nbsp;us,&nbsp;local software engineers will have&nbsp;access to a wide variety of projects and opportunities, working closely with&nbsp;colleagues in Australia and with global partners such as AWS and Microsoft to take advantage of the latest&nbsp;modern&nbsp;technologies.</p><p><br></p><p><strong>We’re investing in you:</strong>&nbsp;We strive&nbsp;to create not only a great place to work, but also the best technology centre for tech engineers to thrive.</p><p><br></p><p><strong>It’s more than just a career!</strong></p><p>We believe in people with ideas and dreams, and we want you to achieve your aspirations. If you have an appetite to learn, grow and elevate others around you, this is the place for you!</p><p><br></p><h2><strong>Chuyên môn của chúng tôi</strong></h2><p><br></p><p>The latest Cloud &amp; Micro-services technologies</p><p><a href=\"https://itviec.com/viec-lam-it/nodejs?click_source=Skill+tag\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 64, 66); background-color: rgb(255, 255, 255);\">NodeJS</a><a href=\"https://itviec.com/viec-lam-it/reactjs?click_source=Skill+tag\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 64, 66); background-color: rgb(255, 255, 255);\">ReactJS</a><a href=\"https://itviec.com/viec-lam-it/java?click_source=Skill+tag\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 64, 66); background-color: rgb(255, 255, 255);\">Java</a><a href=\"https://itviec.com/viec-lam-it/agile?click_source=Skill+tag\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 64, 66); background-color: rgb(255, 255, 255);\">Agile</a><a href=\"https://itviec.com/viec-lam-it/devops?click_source=Skill+tag\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 64, 66); background-color: rgb(255, 255, 255);\">DevOps</a><a href=\"https://itviec.com/viec-lam-it/cloud?click_source=Skill+tag\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 64, 66); background-color: rgb(255, 255, 255);\">Cloud</a></p><p><strong>Languages &amp; Frameworks</strong></p><p>JavaScript ES6, TypeScript, Node.js, React - Redux, Java, Spring Boot, Serverless, .NET</p><p><strong>Cloud Services - AWS, Azure</strong></p><p>Lambda, Postgres, S3, API Gateway, CLI, SNS/SQS, EC2, ECS, Cloud Watch, Splunk, SignalFX, AppDynamics</p><p><strong>DevOps</strong></p><p>Jenkins, Artifactory, SonarQube, GitHub, CloudFormation, Kubernetes, CHEF, Hashicorp Sentinel, Packer, Terraform, Harshicorp Vault, KONG gateway, Venafi</p><p><strong>Collaboration</strong></p><p>Microsoft Outlook, JIRA, Confluence, Microsoft Teams, ServiceNow, Rally</p><p><br></p><h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây?</strong></h2><p><br></p><ol><li><strong>Very competitive remuneration package</strong></li><li><strong>Build products for millions of users in Australia</strong></li><li><strong>Hybrid and flexible working environment</strong></li></ol><p><br></p><p><strong>THE BENEFITS AND PERKS</strong></p><p><br></p><p><strong>1. Generous compensation and benefit&nbsp;package</strong></p><ol><li>Attractive salary and benefits</li><li>20-day annual leave and 7-day sick leave, etc.</li><li>13th month salary and Annual Performance Bonus</li><li>Premium healthcare for yourself and family members</li><li>Monthly allowance for team activities</li><li>Premium welcome kit and frequent appreciation gifts&nbsp;</li><li>Extra&nbsp;benefits for long-term employees</li></ol><p><br></p><p><strong>2. Exciting career and development opportunities&nbsp;</strong></p><ol><li>Large scale products with modern technologies in banking domain</li><li>Clear roadmap for career advancement in&nbsp;both technical and leadership pathways</li><li>Well-structured&nbsp;learning and development programs (technical and soft skills)&nbsp;</li><li>Sponsored certificates in both IT and banking/finance</li><li>Premium&nbsp;account on Udemy&nbsp;</li><li>English learning with native teachers</li><li>Opportunity for traveling &amp; training in Australia</li></ol><p><br></p><p><strong>3. Professional and engaging working environment</strong></p><ol><li>Hybrid working model and good work-life balance&nbsp;</li><li>Well-equipped &amp; modern Agile office with fully stocked pantry</li><li>Special programs to improve your physical and mental health</li><li>Annual company trip and events&nbsp;</li><li>A solid talented team behind you – great people who love what they do</li></ol><p><br></p><p><strong>If this excites you, let\'s have a chat over a cup of coffee!</strong></p>', 'thea.vo@nab.com.au', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000077704000000077400064e4553544a537400044a41564174000752454143544a537400064f7261636c6574000b535052494e4720424f4f547400074d414e4147455274000f4155544f4d4154494f4e205445535478, 2009, 'Product', b'1', NULL, 'companies-3addcaf2-fba1-497e-8fa0-01b3fcb79d51', 'NAB Innovation Centre Vietnam', '02899986866', '800+', 'https://nab.wd3.myworkdayjobs.com'),
(8, '2025-03-27 12:52:37.000000', 'admin@gmail.com', '2025-03-27 12:53:07.000000', 'admin@gmail.com', '15/4 Đặng Lộ Phường 7 Quận Tân BÌnh', 'Can Tho', 'Singapore', '<p><span style=\"color: rgb(18, 18, 18);\">Với tầm nhìn \"Trở thành Doanh nghiệp số, Tập đoàn tài chính dẫn đầu\" cùng mục tiêu \"Top 3 thị trường về hiệu quả, hướng đến Top đầu châu Á”,&nbsp;MB đã và đang tiếp tục xây dựng, phát triển trong và ngoài nước, nhằm&nbsp;đáp ứng yêu cầu chuyển dịch số, mục tiêu tăng trưởng kinh doanh và nâng cao năng lực cạnh tranh.&nbsp;</span></p>', 'hairyan789@gmail.com', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000027704000000027400055655454a5374000752454143544a5378, 2013, 'Product', b'0', NULL, 'companies-c0c2d01a-e150-432b-9233-3aee0a5d1904', 'ABC', '0377586305', '400-500', 'facebook.com');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `benefits` mediumtext DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `level` enum('FRESHER','INTERN','JUNIOR','MIDDLE','SENIOR') DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `requirements` mediumtext DEFAULT NULL,
  `salary` double NOT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `job_type` enum('CONTRACT','FULL_TIME','PART_TIME') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `active`, `benefits`, `description`, `end_date`, `level`, `location`, `name`, `quantity`, `requirements`, `salary`, `start_date`, `company_id`, `job_type`) VALUES
(1, '2025-03-17 06:22:21.000000', 'admin@gmail.com', '2025-05-04 05:33:56.000000', 'admin@gmail.com', b'1', '<p><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></p><p>13th month salary </p><p>+ Incentive bonus (Total remuneration package / year:&nbsp;<strong>up to 16-month salary</strong>)</p><p>+ Annual salary review;<strong>HYBRID WORKING</strong>, flexible working time (Mon - Fri)Support for&nbsp;<strong>lunch, transportation and other allowances&nbsp;</strong>(Coding Expert, Technical leader, phone...);<strong>Premium&nbsp;</strong>health care &amp; accident insurance; <strong>Total 20 days off</strong>&nbsp;(12 days of annual leave &amp; additional 8 days of company holidays: Summer holiday, Mid-Autumn, Christmas, LG and VS DCV Foundation Days);Support fee to get TOEIC &amp; technical certifications (ISTQB, Agile Scrum...);On-site &amp; training opportunities abroad;Company trip, sport clubs (zumba, football, pingpong, badminton,...);Monthly budget for team activities, etc.</p>', '<p><strong>3 Lý do để gia nhập công ty</strong>Competitive salary &amp; up-to 16-month income / yearAttractive allowances &amp; benefitsFlexible working time with many company holidays</p><p><br></p><p><strong>Mô tả công việc</strong></p><p><br></p><p><strong>As an Automotive Software Engineer with one of 2 teams,</strong>&nbsp;you will be responsible:&nbsp;</p><p><strong>*&nbsp;Cluster Team:</strong></p><p>	• Develop automotive high-end products and standard technologies in HMI Applications, HMI frameworks, Protocols to interface with HMI framework and middleware.</p><p>	• Responsible for software development tasks following the ASPICE process standard</p><p>	• Responsible for output quality following project standard• Responsible for development schedule compliance</p><p>	• Generate reports, direct communicate with local managements, head quarter or OEM partner.&nbsp;</p><p><br></p><p>*<strong>&nbsp;Vehicle Network Team:</strong></p><p>	•&nbsp;Researching and developing applications, framework service (middleware) for Car Infotainment, AVN (Audio Video Navigation) and Telematics system in both C/C++ Linux Embedded and Android Framework* (AOSP)</p><p>	• Develop software products with cutting edge automotive technologies* (Bluetooth/Wi-Fi, OTA &amp; SW Update, In-Vehicle Network services: Ethernet, Diagnostic, Car Interface)(*) Bluetooth/Wi-Fi&nbsp;jobs are available for both C/C++ Linux and Android Framework AOSP, the&nbsp;other&nbsp;technologies are only for C/C++ Linux.</p><p>	• Participating in the full Software Development Life Cycle (Agile, ASPICE, NPI) from requirement analysis, creating software design documents (HLD/LLD, detailed design), implementation, testing (UT/IT), and maintenance• Collaborate with team to delivery reliable software on time based on project milestone.</p><p>	• Handle technical problems, and report progress, and work results to the technical leader.• Generate reports, communicate with local managements and head quarter</p>', '2025-05-02 00:00:00.000000', 'FRESHER', 'Ha Noi', 'Automotive Software Engineer (C++, OOP, Embedded)', 2, '<p>* Kinh nghiệm từ 2+ năm với ReactJS (Next.js là một lợi thế) và Node.js. </p><p>* Thành thạo JavaScript/TypeScript. </p><p>* Hiểu rõ về kiến trúc MVC, Microservices. </p><p>* Có kinh nghiệm làm việc với RESTful API hoặc GraphQL. </p><p>* Có kinh nghiệm về State Management (Redux, Zustand, React Query, SWR, v.v.). </p><p>* Thành thạo CSS với SCSS, Tailwind CSS, hoặc Styled-components. </p><p>* Kinh nghiệm với các hệ thống cơ sở dữ liệu SQL hoặc NoSQL. </p><p>* Biết cách triển khai ứng dụng trên AWS, Vercel, Firebase, hoặc DigitalOcean. </p><p>* Hiểu về CI/CD, WebSocket, Docker là một lợi thế. </p><p>* Có tư duy logic, kỹ năng giải quyết vấn đề tốt. </p><p>* Có khả năng làm việc độc lập và theo nhóm trong môi trường remote.</p>', 1500, '2025-03-17 13:55:58.000000', 5, 'FULL_TIME'),
(2, '2025-03-17 06:49:00.000000', 'admin@gmail.com', '2025-04-28 03:49:38.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><ul><li>13th month salary + Incentive bonus (Total remuneration package / year:&nbsp;<strong>up to 16-month salary</strong>) + Annual salary review; 100% salary in probation</li><li><strong>HYBRID WORKING</strong>, flexible working time (Mon - Fri)</li><li>Support for&nbsp;<strong>lunch, transportation and other allowances&nbsp;</strong>(Coding Expert, Technical leader, phone...);</li><li><strong>Premium&nbsp;</strong>health care &amp; accident insurance;</li><li><strong>Total 20 days off</strong>&nbsp;(12 days of annual leave &amp; additional 8 days of company holidays: Summer holiday, Mid-Autumn, Christmas, LG and VS DCV Foundation Days);</li><li>Support fee to get TOEIC &amp; technical certifications (ISTQB, Agile Scrum...);</li><li>On-site &amp; training opportunities abroad;</li><li>Company trip, sport clubs (zumba, football, pingpong, badminton,...);</li><li>Monthly budget for team activities, etc.</li></ul>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ul><li>Competitive salary &amp; up-to 16-month income / year</li><li>Attractive allowances &amp; benefits</li><li>Flexible working time with many company holidays</li><li><br></li></ul><h2><strong>Mô tả công việc</strong></h2><p>As a member of application engineering team in LG CTO VSL, your roles &amp; responsibilities will be as follows:</p><p>&nbsp;</p><p>- Work with the local engineering team, product managers, and program managers at VSL and remote locations (Korea) to build and ship embedded system applications.</p><p>- As a member of application team, design software module, implement, test &amp; release according to agile process.</p><p>- Expected engineering output in the form of source code, engineering documentation, test results, release note.</p><p>- Provide high quality and high performing embedded system applications</p><p>- Senior level engineers are required to perform code reviews of fellow or junior team members.</p><p>- Support leadership team (Product Owner, Scrum leader and cross functional leaders) for the successful outcome of engineering projects.</p>', '2025-05-29 00:00:00.000000', 'MIDDLE', 'Ha Noi', 'Flutter/JavaScript Software Engineer', 2, '<h2><strong>Yêu cầu công việc</strong></h2><p>- Bachelor\'s (or higher) degree in computer science or the relating fields.</p><p>- Have over 3 years of experience in Flutter/ JavaScript, prefer having experience in other languages such as C/C++, Python</p><p>- Have experience using Github, Jenkins, Travis CI tool</p><p>- Intermediate communication skill in English, mostly for the technical communication with the collaborating scrum teams</p><p>- Experience in Agile Scrum methodology.</p>', 2000, '2025-03-17 13:55:58.000000', 5, 'FULL_TIME'),
(3, '2025-03-17 06:55:18.000000', 'admin@gmail.com', '2025-04-28 03:49:55.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><ol><li>13th month salary + Incentive bonus (Total remuneration package / year:&nbsp;<strong>up to 16-month salary</strong>) + Annual salary review;</li><li><strong>HYBRID WORKING</strong>, flexible working time (Mon - Fri)</li><li>Support for&nbsp;<strong>lunch, transportation and other allowances&nbsp;</strong>(Coding Expert, Technical leader, phone...);</li><li><strong>Premium&nbsp;</strong>health care &amp; accident insurance;</li><li><strong>Total 20 days off</strong>&nbsp;(12 days of annual leave &amp; additional 8 days of company holidays: Summer holiday, Mid-Autumn, Christmas,..);</li><li>Support fee to get TOEIC &amp; technical certifications (ISTQB, Agile Scrum...);</li><li>On-site &amp; training opportunities abroad;</li><li>Company trip, sport clubs (football, badminton,...);</li><li>Monthly budget for team activities, etc.</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ol><li>Competitive salary &amp; up-to 16-month income / year</li><li>Attractive allowances &amp; benefits</li><li>Flexible working time with many company holidays</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p>LG Electronics Development Vietnam (LGEDV) Company focuses on smart &amp; ecofriendly automotive components. The Company produces high quality &amp; state of the art in car infotainment systems that deliver both information and entertainment on the go for many of the world‘s biggest automobile brands. We – Software Engineering Team of LGEDV is now seeking 02 Software Engineer (Android, Python) to be a part of our team.</p><p>&nbsp;</p><p>&nbsp;As member of Software Engineering Team,&nbsp;<strong>your main responsibilities will be:</strong></p><ol><li>Set up and configure build environment for Yocto project-built system, Android project-built system based on docker containers</li><li>Provide/Maintain/Improvement build environment(build errors and runtime errors) for developers to build.</li><li>Configure and maintain Git/Gerrit, Jenkins, Artifactory, CI servers, developer servers, etc…</li><li>Maintain configuration management, CI/CD builds, reporting and monitoring tools with grafana and prometheus...</li><li>Planning for future server building system development and report data about the system to the managers.</li></ol>', '2025-05-31 00:00:00.000000', 'SENIOR', 'Ha Noi', 'DevOps Engineer (CI/CD, Python, Yocto)', 3, '<h2><strong>Yêu cầu công việc</strong></h2><p><br></p><p><strong>Basic Qualifications:</strong></p><ol><li>B.S or higher degree in Mechatronic Engineering, Automotive Engineering, Computing Engineering, Information Technology, Computer Science or related majors</li><li>Fluency in<strong>&nbsp;</strong>Python and Shell scripting.</li><li>Has experience in&nbsp;building and operating CI/CD pipeline automation, log analysis and monitoring tools (ELK, Prometheus, Grafana, Fluentd, etc.)</li><li>Having hands-on experiences in using version control tool such as Git, gerrit, repo(comfortable using code review and source code repository management);</li><li>Good understanding of containerization technologies such as Docker, VM</li><li>High responsibility and good team-work</li><li>An analytical mind with problem-solving attitude</li></ol><p><br></p><p><strong>Preferred Qualifications:</strong></p><ol><li>Experience in building and operating CI/CD pipeline automation, log analysis and monitoring For Embedded system(Yocto project-built system, Android project-built system)</li><li>High responsibility and good team-work</li><li>Excellent written and verbal communication skills in English</li></ol>', 2500, '2025-03-17 13:55:58.000000', 5, 'FULL_TIME'),
(4, '2025-03-17 07:43:33.000000', 'admin@gmail.com', '2025-04-21 07:42:15.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><p><strong>Trải nghiệm Thu nhập hấp dẫn với gói đãi ngộ toàn diện:</strong>&nbsp;</p><ol><li>Thưởng&nbsp;thành tích tháng 13; Thưởng thành tích theo kết quả công việc 06 tháng, 1 năm ; Thưởng các&nbsp;dịp lễ tết trong năm ; Thưởng theo danh hiệu cá nhân và tập thể…&nbsp;</li><li>Du lịch nghỉ dưỡng hàng năm</li><li>Khám sức khỏe định kì</li><li>Gói bảo hiểm sức khỏe cá nhân và người thân (MIC)</li><li>Quà tặng và ngày nghỉ sinh nhật hưởng nguyên lương&nbsp;</li></ol><p><br></p><p><strong>Cơ hội nghề nghiệp và phát triển bản thân:</strong>&nbsp;</p><ol><li>Được thử sức với các nền tảng công nghệ mới, tham gia vào những dự án chuyển đổi lớn của ngân hàng&nbsp;</li><li>Có cơ hội học hỏi từ các Chuyên gia, Lãnh đạo nội bộ hàng đầu tại MB trong lĩnh vực IT, Tài chính ngân hàng&nbsp;</li><li>Được trải nghiệm các&nbsp;phương pháp học tập&nbsp;mới và&nbsp;phát triển năng lực theo lộ trình công danh.&nbsp;</li><li>Hưởng các chính sách hỗ trợ, khuyến khích học tập, nâng cao trình độ và phát triển bản thân (chứng chỉ nghề quốc tế...)&nbsp;</li></ol><p><br></p><p><strong>Môi trường làm việc lý tưởng với:</strong>&nbsp;</p><ol><li>Những người cộng sự thân thiện và tài năng&nbsp;</li><li>Cơ sở vật chất, không gian làm việc xanh và hiện đại.</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ol><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường làm việc chuyên nghiệp, thân thiện</li><li>Được làm việc với các hệ thống hiện đại, tiên tiến</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p><br></p><p><strong>Junior Fullstack Developer:</strong></p><ol><li>Lập trình, phát triển các hệ thống, ứng dụng của Ngân hàng.</li><li>Phát triển hoặc phối hợp cùng các nhà cung cấp phát triển và triển khai các giải pháp CNTT.</li><li>Quản lý, phát triển dịch vụ tích hợp với các hệ thống core như: T24, WAY4, BPM, CRM, CIC ...</li><li>Nghiên cứu, thử nghiệm, triển khai áp dụng các xu hướng công nghệ mới vào việc phát triển: GraphQL, Docker Container (K8s), CICD, EventSourcing, CQRS, NoSQL ...</li></ol><ul><li>Duy trì hoạt động của các sản phẩm dịch vụ trong phạm vi quản lý.</li></ul><p><br></p><p><strong>Senior Fullstack Developer:&nbsp;</strong>Bổ sung các nhóm công việc sau:</p><ol><li>Tham gia phân tích nghiệp vụ, đề xuất giải pháp, phương án triển khai nhằm cải tiến, nâng cao hiệu quả của các dự án trong quá trình làm việc.</li><li>Lên timeline công việc, chia tasks cho các thành viên trong nhóm, giám sát và hỗ trợ các thành viên hoàn thành đúng cam kết.</li><li>Dẫn dắt nhóm 03-06 nhân sự, giúp thành viên cùng phát triển và hoàn thành nhiệm vụ được giao.</li></ol>', '2025-05-08 00:00:00.000000', 'JUNIOR', 'Ha Noi', 'Fullstack Engineer (NodeJS, ReactJS, Oracle)', 2, '<h2><strong>Yêu cầu công việc</strong></h2><p><br></p><p><strong>Yêu cầu chung:</strong></p><ol><li>Tốt nghiệp Đại học chính quy các chuyên ngành Công nghệ thông tin, Khoa học máy tính, Điện tử viễn thông, Công nghệ phần mềm, Hệ thống thông tin ...&nbsp;</li><li>Thành thạo tiếng Anh (<em>TOEIC 450 trở lên hoặc tương đương</em>).</li><li>Hiểu biết về quy trình phát triển phần mềm và quen thuộc với tư duy làm việc Agile.</li></ol><p><br></p><p><strong>Đối với ứng viên Junior:</strong></p><ol><li>Tối thiểu 01 năm kinh nghiệm làm việc tại các công ty, dự án về lập trình Fullstack.</li><li>Thành thạo ít nhất 01 trong các ngôn ngữ BackEnd (<em>VD: Java, NodeJS</em>) và FrontEnd frameworks (<em>VD:</em>&nbsp;<em>Angularjs, ReactJS</em>).</li><li>Thành thạo ít nhất 01 trong các loại database: Oracle, SQLserver, PostgreSQL, Mongodb ...</li><li>Hiểu biết về restful, GraqpQL.</li><li>Có kinh nghiệm trong mảng tài chính ngân hàng là một lợi thế.</li></ol>', 2500, '2025-03-17 13:55:58.000000', 4, 'FULL_TIME'),
(5, '2025-03-31 06:02:40.000000', 'admin@gmail.com', '2025-04-21 07:43:05.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><p><br></p><p><strong>Trải nghiệm Thu nhập hấp dẫn với gói đãi ngộ toàn diện:</strong>&nbsp;</p><ol><li>Thưởng&nbsp;thành tích tháng 13; Thưởng thành tích theo kết quả công việc 06 tháng, 1 năm ; Thưởng các&nbsp;dịp lễ tết trong năm ; Thưởng theo danh hiệu cá nhân và tập thể…&nbsp;</li><li>Du lịch nghỉ dưỡng hàng năm</li><li>Khám sức khỏe định kì</li><li>Gói bảo hiểm sức khỏe cá nhân và người thân (MIC)</li><li>Quà tặng và ngày nghỉ sinh nhật hưởng nguyên lương&nbsp;</li></ol><p><br></p><p><strong>Cơ hội nghề nghiệp và phát triển bản thân:</strong>&nbsp;</p><ol><li>Được thử sức với các nền tảng công nghệ mới, tham gia vào những dự án chuyển đổi lớn của ngân hàng&nbsp;</li><li>Có cơ hội học hỏi từ các Chuyên gia, Lãnh đạo nội bộ hàng đầu tại MB trong lĩnh vực IT, Tài chính ngân hàng&nbsp;</li><li>Được trải nghiệm các&nbsp;phương pháp học tập&nbsp;mới và&nbsp;phát triển năng lực theo lộ trình công danh.&nbsp;</li><li>Hưởng các chính sách hỗ trợ, khuyến khích học tập, nâng cao trình độ và phát triển bản thân (chứng chỉ nghề quốc tế...)&nbsp;</li></ol><p><br></p><p><strong>Môi trường làm việc lý tưởng với:</strong>&nbsp;</p><ol><li>Những người cộng sự thân thiện và tài năng&nbsp;</li><li>Cơ sở vật chất, không gian làm việc xanh và hiện đại.</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ol><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường làm việc chuyên nghiệp, thân thiện</li><li>Được làm việc với các hệ thống hiện đại, tiên tiến</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><ol><li>Phân tích dữ liệu chuyên sâu để xây dựng mô hình phục vụ các mảng nghiệp vụ được phân công</li><li>Thiết kế và phát triển các đặc trưng (features) từ dữ liệu, làm giàu kho lưu trữ dữ liệu đặc trưng.</li><li>Giám sát, tối ưu hóa và vận hành việc xây dựng và phát triển mô hình để đáp ứng nhu cầu kinh doanh và hỗ trợ ra quyết định kinh doanh.</li><li>Nghiên cứu và phát triển công cụ, quy trình nhằm tăng hiệu quả hoạt động của phòng/khối.</li><li>Báo cáo trực tiếp lãnh đạo về tiến độ và kết quả các dự án phân tích dữ liệu được giao</li></ol>', '2025-05-04 00:00:00.000000', 'MIDDLE', 'Ha Noi', 'Data Scientist (Data Analyst, Python)', 2, '<h2><strong>Yêu cầu công việc</strong></h2><ol><li>Cử nhân các ngành Kinh tế, Tài chính, Ngân hàng, Khoa học Dữ liệu, Khoa học Máy tính, Thống kê, Toán tin hoặc liên quan</li><li>Ưu tiên chứng chỉ về Khoa học Dữ liệu, Data Engineering, Data Analysis, thành thạo ngôn ngữ lập trình: Python, R, SQL, Matlab và kinh nghiệm với công cụ xử lý dữ liệu lớn: Spark, Hadoop, S3.</li><li>Tối thiểu 3 năm làm việc với dữ liệu lớn, xây dựng mô hình dự đoán và học máy.</li><li>Hiểu biết sâu về thuật toán học máy, khai phá dữ liệu, kinh nghiệm phát triển và áp dụng thuật toán mới.</li><li>Có kỹ năng&nbsp;sử dụng kiến thức thống kê, toán học trong phát triển mô hình, thành thạo công cụ trực quan hóa dữ liệu: Matplotlib, Tableau và có khả năng thiết kế, trình bày và kể chuyện từ dữ liệu.</li><li>Ưu tiên ứng viên có kinh nghiệm quản lý.</li></ol>', 2000, '2025-03-31 05:54:11.000000', 4, 'PART_TIME'),
(6, '2025-03-31 09:33:54.000000', 'admin@gmail.com', '2025-04-21 07:43:13.000000', 'admin@gmail.com', b'1', '<p><strong>Benefits and Career Opportunities</strong></p><p><strong>﻿</strong></p><ol><li>Working in one of the&nbsp;<strong>Best Places to Work</strong>&nbsp;in Vietnam and&nbsp;Top 30 of the&nbsp;<strong>Most Innovative Companies&nbsp;</strong>all over the world</li><li><strong>English-speaking</strong>&nbsp;environment, with opportunity to be part of innovation team and work in global projects</li><li><strong>Onsite opportunities</strong></li><li>Engage in our&nbsp;<strong>diverse training</strong>&nbsp;programs which surely help strengthen both your personal and professionalism</li><li><strong>Flexible&nbsp;</strong>working time and working model</li><li><strong>13th-month</strong>&nbsp;salary bonus + attractive&nbsp;<strong>performance bonus</strong>&nbsp;(you\'ll love it!) + annual performance appraisal</li><li><strong>100% offered&nbsp;salary</strong>&nbsp;and&nbsp;mandatory&nbsp;<strong>social insurances</strong>&nbsp;in 2-month probation</li><li><strong>15++ days</strong>&nbsp;of annual leave&nbsp;+ 1-day of birthday leave</li><li>Premium health insurance for employee and&nbsp;<strong>02 family members</strong></li><li>Lunch and parking allowance</li><li>Good benefits of company activities such as: football, badminton, yoga, Aerobic, team building…</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ol><li>Committed 13th-mth bonus + attractive yearly bonus</li><li>Premium Healthcare for you and 2 family members</li><li>16++ days of paid leave per year</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p><br></p><p><strong>If you would like to apply for this job, please copy and paste the following URL into your browse:&nbsp;<em>bit.ly/3OqIfbQ</em>&nbsp;The direct applications via that link will be prioritized.</strong></p><p><strong>﻿</strong></p><p><strong>Job Description</strong></p><ol><li>Preparing low- and high-level design documents</li><li>Guiding and mentoring team members on Best Practices</li><li>Drive adopting new technologies, ideas, and continuous improvement of processes</li><li>Oversee Continuous Integration/Continuous Deployment</li><li>Ensuring systems availability and scalability</li><li>Define and deploy monitoring, metrics and logging systems</li><li>Operate the platform within our security and privacy guidelines</li><li>Automate stories and tasks wherever it requires</li><li>Ensure code quality with Unit and integration tests</li></ol>', '2025-05-06 00:00:00.000000', 'SENIOR', 'Ho Chi Minh', 'Senior Java Full stack (Spring boot + DevOps)', 2, '<p><strong>Qualifications</strong></p><p><br></p><ol><li>Solid web application development experience using Java and Sprint Boot</li><li>Proficiency in one or more frontend frameworks (Angular or React or etc.,)</li><li>Hands on experience in JavaScript, Bootstrap, HTML5/CSS3, jQuery</li><li>Strong SQL and No-SQL databases design experience (Oracle or MySQL/Cassandra/Mongo)</li><li>Experience in developing and consuming RESTful APIs, SOAP, and JSON data</li><li>Strong experience in consuming cloud services like API Gateway, RabbitMQ, Redis, Logic Apps, Active Directory</li><li>Hands on experience in setting up CI/CD Pipeline using tools like Jenkins, Maven, Artifactory and others</li><li>Hands-on experience in writing Unit, Integration and Functional Tests.</li><li>Solid experience in OOAD, Design patterns and UML.</li><li>Experience in designing Cloud Native and Cloud Agnostic solutions</li><li>Hands-on experience across all phases of SDLC using Agile Methodologies</li><li>Integration, Continuous Delivery, Pair programming and Test-Driven Development (TDD)</li><li>Knowledge on Bosch SEP Process\\ Could Security \\ Application Security</li></ol><p><br></p><p><strong>Recommended Skills:</strong></p><p><br></p><ol><li>Knowledge in the field of Cloud Platform Development/ Operations, system engineering or similar (For e.g., Cloud Foundry, OpenShift etc.)</li><li>Knowledge in Infrastructure as Code, Orchestration tools (e.g., Terraform, Cloud Formation, Ansible etc.)</li><li>Working knowledge with modern security concepts (OAuth, micro segmentation etc.)</li><li>Working knowledge with monitoring/logging tools (e.g., Grafana, Elasticsearch, Splunk, Prometheus etc.)</li><li>Knowledge of public cloud technologies (e.g., Azure, AWS etc.)</li></ol><p><br></p><p><strong>If you would like to apply for this job, please copy and paste the following URL into your browser:&nbsp;<em>bit.ly/3OqIfbQ&nbsp;</em>The direct applications via that link will be prioritized.</strong></p>', 3500, '2025-03-31 09:27:05.000000', 6, 'PART_TIME'),
(7, '2025-03-31 09:36:35.000000', 'admin@gmail.com', '2025-04-21 07:43:21.000000', 'admin@gmail.com', b'1', '<p><strong>Benefits and Career Opportunities</strong></p><p><strong>﻿</strong></p><ol><li>Working in one of the&nbsp;<strong>Best Places to Work</strong>&nbsp;in Vietnam and&nbsp;Top 30 of the&nbsp;<strong>Most Innovative Companies&nbsp;</strong>all over the world</li><li><strong>English-speaking</strong>&nbsp;environment, with opportunity to be part of innovation team and work in global projects</li><li><strong>Onsite opportunities</strong></li><li>Engage in our&nbsp;<strong>diverse training</strong>&nbsp;programs which surely help strengthen both your personal and professionalism</li><li><strong>Flexible&nbsp;</strong>working time and working model</li><li><strong>13th-month</strong>&nbsp;salary bonus + attractive&nbsp;<strong>performance bonus</strong>&nbsp;(you\'ll love it!) + annual performance appraisal</li><li><strong>100% offered&nbsp;salary</strong>&nbsp;and&nbsp;mandatory&nbsp;<strong>social insurances</strong>&nbsp;in 2-month probation</li><li><strong>15++ days</strong>&nbsp;of annual leave&nbsp;+ 1-day of birthday leave</li><li>Premium health insurance for employee and&nbsp;<strong>02 family members</strong></li><li>Lunch and parking allowance</li><li>Good benefits of company activities such as: football, badminton, yoga, Aerobic, team building…</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><p><br></p><ol><li>Committed 13th-mth bonus + attractive yearly bonus</li><li>Premium Healthcare for you and 2 family members</li><li>16++ days of paid leave per year</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p><br></p><ol><li>Develop, maintain and execute automation test cases for major projects, maintenance, and emergency releases</li><li>Design and implement automation tests scripts, debug and define corrective actions</li><li>Identify, analyze and report test results</li><li>Report, track, and monitor defects in the defect tracking system</li><li>Investigate defect reports from production support, isolate their causes, inform development teams for fixing and retest to ensure adequate resolutions.</li><li>Work closely with the PO and development teams to design testing strategies.</li><li>Work on the interpretation of quality assurance issues and problems for technical and non-technical users</li></ol>', '2025-05-02 00:00:00.000000', 'MIDDLE', 'Ho Chi Minh', 'Automation Software Tester (Selenium/Java/Appium)', 2, '<h2><strong>Yêu cầu công việc</strong></h2><p><br></p><ol><li>1-2 years of experience in automation testing for web-based, API and mobile applications with Selenium, Appium (Java, C#)</li><li>At least one programming language or scripting language you are comfortable with (C#, Java)</li><li>Good experience in writing new test cases based on requirements</li><li>Ability to effectively manage time, and arrange and carry out multiple tasks of different priorities</li><li>Experience with cross-browser, cross-platform and responsive testing (Web, API and mobile)</li><li>Familiar with source version control tools.</li><li>Problem-solving and analytical thinking abilities</li><li>Willing to learn and adopt new technologies and testing methodologies.</li></ol>', 1500, '2025-03-31 09:34:15.000000', 6, 'PART_TIME'),
(8, '2025-03-31 09:42:29.000000', 'admin@gmail.com', '2025-04-21 07:43:28.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><p><br></p><p><strong>1. Generous compensation and benefit package</strong>&nbsp;</p><ol><li>Attractive salary and benefits&nbsp;</li><li>20-day annual leave and 7-day sick leave, etc.&nbsp;</li><li>13th month salary and Annual Performance Bonus&nbsp;</li><li>Premium healthcare for yourself and family members&nbsp;</li></ol><p><br></p><p><strong>2. Exciting career and development opportunities </strong>&nbsp;</p><ol><li>Large scale products with modern technologies in banking domain&nbsp;</li><li>Clear roadmap for career advancement in both technical and leadership pathways&nbsp;</li><li>Sponsored certificates in both IT and banking/finance&nbsp;</li><li>Premium account on Udemy</li><li>English learning with native teachers&nbsp;</li></ol><p><br></p><p><strong>3. Professional and engaging working environment</strong>&nbsp;</p><ol><li>Hybrid working model and excellent work-life balance&nbsp;</li><li>Well-equipped &amp; modern Agile office with fully-stocked pantry&nbsp;</li><li>Annual company trip and events&nbsp;</li></ol><p><br></p><p><strong>A DIVERSE AND INCLUSIVE WORKPLACE WORKS BETTER FOR EVERYONE</strong>&nbsp;</p><p>NAB is a place where colleagues of all genders, sexualities and ages, carers and colleagues with disability, and colleagues from all cultures, races and religions have the opportunity to thrive, connect and grow.&nbsp;</p><p><br></p><p><strong>If this excites you, let\'s have a chat over a cup of coffee!</strong>&nbsp;</p>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ol><li>Very competitive remuneration package</li><li>Build products for millions of users in Australia</li><li>Hybrid and flexible working environment</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p><br></p><p>By applying for the above position, you accept and agree that your personal data and any information stated in the attached curriculum vitae (CV) will be used and processed by ITViec and NAB Vietnam for recruitment purposes. The storage and processing of such information will comply with the applicable laws of Vietnam, and the policies and procedures of ITViec and NAB Vietnam regarding personal data, as amended from time to time.</p>', '2025-05-15 00:00:00.000000', 'SENIOR', 'Ho Chi Minh', 'Quality Engineering Manager', 3, '<h2><strong>Yêu cầu công việc</strong></h2><p><br></p><ol><li>12-15 years of quality engineering experience along with people leadership experience of large teams (20 – 30 members) with excellent leadership and organizational skills to simultaneously direct, inspire, coach, and lead multiple quality teams in a dynamically changing environment.&nbsp;</li><li>Strong quality mindset and familiar with implementing shift-left testing approach.&nbsp;</li><li>Expert in testing methodologies and techniques, extensive experience with the quality engineering practices of end-to-end enterprise grade systems.&nbsp;</li><li>Ability to implement domain level strategies to improve the quality of application.&nbsp;</li><li>Knowledge of software development, software design, and overall system architecture.&nbsp;</li><li>Strong programming skills in any programming language. (such as Java, JavaScript, Python)&nbsp;&nbsp;</li><li>Expert in automation architect and framework development<strong> </strong>from scratch using specific domain testing stack. (Such as Selenium, Appium, Espresso, WDIO, Playwright, Rest Assured,&nbsp;&nbsp;</li><li>Solid Cloud and CI/CD Experience - Knowledge of AWS, Azure, Docker &amp; Kubernetes, Jenkins&nbsp;</li><li>Demonstrable problem-solving and decision-making skills along with strong teamwork, collaboration &amp; communication.&nbsp;</li><li>Ability to learn and become an SME in a banking domain or subdomain (s)&nbsp;</li></ol>', 5000, '2025-03-31 09:38:14.000000', 7, 'PART_TIME'),
(9, '2025-03-31 09:46:05.000000', 'admin@gmail.com', '2025-04-21 07:43:38.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><p><br></p><p><strong>1. Generous compensation and benefit package</strong>&nbsp;</p><ol><li>Attractive salary and benefits&nbsp;</li><li>20-day annual leave and 7-day sick leave, etc.&nbsp;</li><li>13th month salary and Annual Performance Bonus&nbsp;</li><li>Premium healthcare for yourself and family members&nbsp;</li></ol><p><br></p><p><strong>2. Exciting career and development opportunities </strong>&nbsp;</p><ol><li>Large scale products with modern technologies in banking domain&nbsp;</li><li>Clear roadmap for career advancement in both technical and leadership pathways&nbsp;</li><li>Sponsored certificates in both IT and banking/finance&nbsp;</li><li>Premium accounts on Udemy/A Cloud Guru/Coursera/LinkedIn, etc.&nbsp;</li><li>English learning with native teachers&nbsp;</li></ol><p><br></p><p><strong>3. Professional and engaging working environment</strong>&nbsp;</p><ol><li>Hybrid working model and excellent work-life balance&nbsp;</li><li>Well-equipped &amp; modern Agile office with fully-stocked pantry&nbsp;</li><li>Annual company trip and events&nbsp;</li></ol><p><br></p><p><strong>A DIVERSE AND INCLUSIVE WORKPLACE WORKS BETTER FOR EVERYONE</strong>&nbsp;</p><p>NAB is a place where colleagues of all genders, sexualities and ages, carers and colleagues with disability, and colleagues from all cultures, races and religions have the opportunity to thrive, connect and grow.&nbsp;</p><p><br></p><p><strong>If this excites you, let\'s have a chat over a cup of coffee!</strong>&nbsp;</p>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><p><br></p><ol><li>Very competitive remuneration package</li><li>Build products for millions of users in Australia</li><li>Hybrid and flexible working environment</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p>By applying for the above position, you accept and agree that your personal data and any information stated in the attached curriculum vitae (CV) will be used and processed by ITViec and NAB Vietnam for recruitment purposes. The storage and processing of such information will comply with the applicable laws of Vietnam, and the policies and procedures of ITViec and NAB Vietnam regarding personal data, as amended from time to time.</p><p>&nbsp;</p><p><strong>ABOUT THE JOB</strong>&nbsp;</p><p><br></p><p>We are seeking motivated Java Engineers (all levels) who are passionate, results focused to take accountability for the delivery of Microservices that will be used by banking front end applications. You will be part of our delivery team and will be responsible for providing technical leadership throughout all phases of the software delivery life cycle as we initiate a transformation of NAB technology.&nbsp;</p><p>At NAB, we believe success comes from our people. We\'re committed to supporting your talent and skills through your career, as you help us build a culture that affects change for our customers and for the community too.&nbsp;</p><p>&nbsp;</p><p><strong>YOUR JOB RESPONSIBILITIES</strong>&nbsp;</p><p><br></p><ol><li>Design, develop, review, implement, and manage Java applications and services for the production and pre-release environments;&nbsp;</li><li>Design, develop, review, implement, and manage continuous integration, build management and deployment scripts, systems, and any code as required;&nbsp;</li><li>Participate in Agile software development, prototyping, and code review with international development teams to build scalable microservices-based products and APIs using Java technologies on AWS Cloud architecture;&nbsp;</li><li>Fully understand the requirements of the customer or business and utilize this knowledge to develop applications that are consistent with this;&nbsp;</li><li>Work with delivery teams to achieve success through development using CI/CD and DevOps practices, processes, and tooling;&nbsp;</li><li>Provide robust coding practices, solid unit/component test coverage, and debugging code.&nbsp;</li><li>Mentor, provide technical direction and engineering leadership for a team of engineers (for Lead)</li><li>Provide leadership to team members (for Lead)</li></ol>', '2025-05-14 00:00:00.000000', 'MIDDLE', 'Ho Chi Minh', 'Middle/Senior/Lead Java Engineer', 3, '<h2><strong>Yêu cầu công việc</strong></h2><p><br></p><p><strong>Must have</strong></p><ol><li><strong>For</strong>&nbsp;<strong>Middle level: 3+ years of experience</strong>&nbsp;as a software engineer in a complex development environment.</li><li><strong>For</strong>&nbsp;<strong>Senior level: 5+ years of experience</strong>&nbsp;as a software engineer in a complex development environment.</li><li><strong>For</strong>&nbsp;<strong>Lead level: 7+ years of experience</strong>&nbsp;as a software engineer in a complex development environment.</li><li>Solid experience in&nbsp;<strong>Java 8+</strong>&nbsp;and&nbsp;<strong>Springboot.</strong></li><li>Experience in <strong>designing &amp; developing RESTful APIs</strong> and complex microservices based system; troubleshooting and debugging in microservice&nbsp;</li><li>Experience in Cloud computing and <strong>AWS or Azure</strong>&nbsp;</li><li>Experience with <strong>unit testing and integration testing</strong>&nbsp;</li><li>Practical experience in Containers (ECS, Kubernetes, Docker) and FaaS (AWS Lambda) technologies&nbsp;</li><li>Good English communication skills (both verbal &amp; written), especially in the global software development environment.&nbsp;</li><li>Experience in Agile development environments;&nbsp;</li><li>Well-versed in writing structured, well-documented, maintainable, and clean code;&nbsp;</li><li>Good problem-solving and analytical skills&nbsp;</li></ol><p><br></p><p><strong>Nice-to-have﻿</strong></p><ol><li>Practical experience in Containers (ECS, Kubernetes, Docker) and FaaS (AWS&nbsp;Lambda) technologies.</li><li>Experience in modern CI/CD pipelines and tools (e.g. Git, Ansible, Jenkins, NPM,&nbsp;Gradle).</li><li>Experience in the Banking or Financial Services industry.</li></ol>', 3000, '2025-03-31 09:42:35.000000', 7, 'CONTRACT'),
(10, '2025-03-31 09:59:53.000000', 'admin@gmail.com', '2025-04-21 07:43:45.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><p><br></p><p><strong>Trải nghiệm Thu nhập hấp dẫn với gói đãi ngộ toàn diện:</strong>&nbsp;</p><p><br></p><ol><li>Thưởng&nbsp;thành tích tháng 13; Thưởng thành tích theo kết quả công việc 06 tháng, 1 năm ; Thưởng các&nbsp;dịp lễ tết trong năm ; Thưởng theo danh hiệu cá nhân và tập thể…&nbsp;</li><li>Du lịch nghỉ dưỡng hàng năm</li><li>Khám sức khỏe định kì</li><li>Gói bảo hiểm sức khỏe cá nhân và người thân (MIC)</li><li>Quà tặng và ngày nghỉ sinh nhật hưởng nguyên lương&nbsp;</li></ol><p><br></p><p><strong>Cơ hội nghề nghiệp và phát triển bản thân:</strong>&nbsp;</p><p><br></p><ol><li>Được thử sức với các nền tảng công nghệ mới, tham gia vào những dự án chuyển đổi lớn của ngân hàng&nbsp;</li><li>Có cơ hội học hỏi từ các Chuyên gia, Lãnh đạo nội bộ hàng đầu tại MB trong lĩnh vực IT, Tài chính ngân hàng&nbsp;</li><li>Được trải nghiệm các&nbsp;phương pháp học tập&nbsp;mới và&nbsp;phát triển năng lực theo lộ trình công danh.&nbsp;</li><li>Hưởng các chính sách hỗ trợ, khuyến khích học tập, nâng cao trình độ và phát triển bản thân (chứng chỉ nghề quốc tế...)&nbsp;</li></ol><p><strong>Môi trường làm việc lý tưởng với:</strong>&nbsp;</p><p><br></p><ol><li>Những người cộng sự thân thiện và tài năng&nbsp;</li><li>Cơ sở vật chất, không gian làm việc xanh và hiện đại.</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ol><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường làm việc chuyên nghiệp, thân thiện</li><li>Được làm việc với các hệ thống hiện đại, tiên tiến</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><ol><li>Lập trình, phát triển các hệ thống, ứng dụng của Ngân hàng.</li><li>Tự phát triển hoặc phối hợp cùng các nhà cung cấp phát triển/ triển khai các giải pháp CNTT.</li><li>Quản lý, phát triển dịch vụ tích hợp với các hệ thống core như: T24, WAY4, BPM, CRM, CIC ...</li><li>Quản lý, phát triển API trên API Gateway phục vụ tích hợp với các đối tác trong nước và quốc tế.</li><li>Nghiên cứu, thử nghiệm, triển khai áp dụng các xu hướng công nghệ mới vào việc phát triển: GraphQL, Docker Container (K8s), CICD, EventSourcing, CQRS, NoSQL ...</li><li>Duy trì hoạt động của các sản phẩm dịch vụ trong phạm vi quản lý</li></ol>', '2025-05-30 00:00:00.000000', 'MIDDLE', 'Ha Noi', 'Backend Engineer (Java, Spring, MongoDb)', 2, '<h2><strong>Yêu cầu công việc</strong></h2><p><br></p><p><strong>Đối với Junior :</strong></p><ol><li>Tốt nghiệp Đại học các chuyên ngành Công nghệ thông tin, Khoa học máy tính, Điện tử viễn thông, Công nghệ phần mềm, Hệ thống thông tin ...</li><li>Tối thiểu 02 năm làm việc thực tế tại các công ty, dự án về lập trình Backend</li><li>Thành thạo 1 trong các ngôn ngữ BE : Java.</li><li>Thành thạo , làm việc tốt với Spring framework: spring core, spring sercuity, spring boots.</li><li>Thành thạo 1 trong các loại database: Oracle, Sqlserver, PostgreSQL, Mongodb.</li><li>Có các kỹ năng lập trình tốt như: phân tích, đưa giải pháp để giải quyết các vấn đề.</li><li>Cẩn thận, kiên nhẫn, đam mê lập trình và sẵn sàng học hỏi các công nghệ mới.</li><li>Có kinh nghiệm trong mảng tài chính, ngân hàng là lợi thế</li></ol><p><br></p><p><strong>Đối với Senior:</strong></p><p><br></p><ol><li>Bao gồm toàn bộ các yêu cầu chung của level junior.</li><li>Có kiến thức tốt về kiến trúc hệ thống. Thông thuộc nhiều thiết kế phần mềm.</li><li>Tối thiểu 02 năm làm việc thực tế tại các công ty, dự án về lập trình Backend</li><li>Tối thiểu 1 - 2 năm kinh nghiệm làm việc với Microservice.</li><li>Có khả năng tuning performance của ứng dụng, hệ thống.</li><li>Có hiểu biết sâu về các kỹ thuật/công nghệ: MySQL, Redis, MongoDB, PostgreSQL, Kafka,…</li><li>Có kinh nghiệm phát triển, sử dụng Cloud, Front-end là 1 lợi thế.</li><li>Tham gia phân tích nghiệp vụ, đề xuất giải pháp, phương án triển khai nhằm cải tiến, nâng cao hiệu quả của các dự án trong quá trình làm việc.</li><li>Lên timeline công việc, chia tasks cho các thành viên trong nhóm, giám sát và hỗ trợ các thành viên hoàn thành đúng cam kết.</li><li>Dẫn dắt nhóm 3-6 người, giúp thành viên cùng phát triển và hoàn thành nhiệm vụ được giao.</li></ol>', 3000, '2025-03-31 09:57:45.000000', 4, 'CONTRACT'),
(11, '2025-03-31 10:15:12.000000', 'admin@gmail.com', '2025-04-21 07:43:51.000000', 'admin@gmail.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><p><br></p><p><strong>Trải nghiệm Thu nhập hấp dẫn với gói đãi ngộ toàn diện:</strong>&nbsp;</p><ul><li>Thưởng&nbsp;thành tích tháng 13; Thưởng thành tích theo kết quả công việc 06 tháng, 1 năm ; Thưởng các&nbsp;dịp lễ tết trong năm ; Thưởng theo danh hiệu cá nhân và tập thể…&nbsp;</li><li>Du lịch nghỉ dưỡng hàng năm</li><li>Khám sức khỏe định kì</li><li>Gói bảo hiểm sức khỏe cá nhân và người thân (MIC)</li><li>Quà tặng và ngày nghỉ sinh nhật hưởng nguyên lương&nbsp;</li></ul><p><br></p><p><strong>Cơ hội nghề nghiệp và phát triển bản thân:</strong>&nbsp;</p><ol><li>Được thử sức với các nền tảng công nghệ mới, tham gia vào những dự án chuyển đổi lớn của ngân hàng&nbsp;</li><li>Có cơ hội học hỏi từ các Chuyên gia, Lãnh đạo nội bộ hàng đầu tại MB trong lĩnh vực IT, Tài chính ngân hàng&nbsp;</li><li>Được trải nghiệm các&nbsp;phương pháp học tập&nbsp;mới và&nbsp;phát triển năng lực theo lộ trình công danh.&nbsp;</li><li>Hưởng các chính sách hỗ trợ, khuyến khích học tập, nâng cao trình độ và phát triển bản thân (chứng chỉ nghề quốc tế...)&nbsp;</li></ol><p><br></p><p><strong>Môi trường làm việc lý tưởng với:</strong>&nbsp;</p><ol><li>Những người cộng sự thân thiện và tài năng&nbsp;</li><li>Cơ sở vật chất, không gian làm việc xanh và hiện đại.</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><p><br></p><ol><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường làm việc chuyên nghiệp, thân thiện</li><li>Được làm việc với các hệ thống hiện đại, tiên tiến</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p><br></p><ol><li>Thực hiện việc nghiên cứu công nghệ mới trong các mảng Cơ sở dữ liệu, Ứng dụng nền tảng, đảm bảo công nghệ mới được áp dụng vào hệ thống nhằm tối ưu thiết kế hệ thống và đảm bảo tính sẵn sàng dịch vụ</li><li class=\"ql-indent-1\">Thực hiện nghiên cứu</li><li class=\"ql-indent-1\">Báo cáo kết quả nghiên cứu</li><li class=\"ql-indent-1\">Xây dựng hướng dẫn áp dụng</li><li>Thực hiện việc xây dựng kịch bản/giải pháp ứng phó/xử lý các sự cố hệ thống mức cao và nghiêm trọng, đảm bảo hệ thống hoạt động ổn định theo tiêu chuẩn RTO và RPO từng thời kỳ</li><li class=\"ql-indent-1\">Thực hiện xây dựng kịch bản/giải pháp</li><li class=\"ql-indent-1\">Báo cáo kết quả xây dựng kịch bản/giải pháp</li></ol>', '2025-05-22 00:00:00.000000', 'FRESHER', 'Ha Noi', 'Platform Solution Specialist (Oracle, Cloud, Database)', 2, '<h2><strong>Yêu cầu công việc</strong></h2><p><br></p><ol><li>Tốt nghiệp Đại học các Chuyên ngành: Công nghệ thông tin, Toán tin, Điện tử Viễn thông…</li><li>Chấp nhận ứng viên sắp hoặc mới tốt nghiệp từ loại Khá trở lên các trường Đại học uy tín</li><li>Có kiến thức về hệ điều hành và kiến trúc hệ thống; Có kiến thức cài đặt/cấu hình/quản trị/tối ưu Ứng dụng/CSDL</li><li>Có các chứng chỉ quản trị là lợi thế: các ứng dụng nền tảng (IBM Websphere, Oracle Weblogic, Jboss, Kafka, Redis…), các CSDL (Oracle, MSSQL, MongoDB, PostgreSQL, MySQL…), các nền tảng cloud (AWS, Azure, GCP...)</li><li>Có khả năng nghiên cứu và cài đặt thử nghiệm các công nghệ mới</li></ol>', 1500, '2025-03-31 10:12:41.000000', 4, 'CONTRACT'),
(12, '2025-03-31 10:19:20.000000', 'admin@gmail.com', '2025-05-04 07:10:27.000000', 'lgcarecenter@lge.com', b'1', '<h2><strong>Tại sao bạn sẽ yêu thích làm việc tại đây</strong></h2><p><br></p><ol><li>13th month salary + Incentive bonus (Total remuneration package / year:&nbsp;<strong>up to 16-month salary</strong>) + Annual salary review;</li><li><strong>HYBRID WORKING</strong>, flexible working time (Mon - Fri)</li><li>Support for&nbsp;<strong>lunch, transportation and other allowances&nbsp;</strong>(Coding Expert, Technical leader, phone...);</li><li><strong>Premium&nbsp;</strong>health care &amp; accident insurance;</li><li><strong>Total 20 days off</strong>&nbsp;(12 days of annual leave &amp; additional 8 days of company holidays: Summer holiday, Mid-Autumn, Christmas, LG and VS DCV Foundation Days);</li><li>Support fee to get TOEIC &amp; technical certifications (ISTQB, Agile Scrum...);</li><li>On-site &amp; training opportunities abroad;</li><li>Company trip, sport clubs (zumba, football, pingpong, badminton,...);</li><li>Monthly budget for team activities, etc.</li></ol>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><p><br></p><ol><li>Competitive salary &amp; up-to 16-month income / year</li><li>Attractive allowances &amp; benefits</li><li>Flexible working time with many company holidays</li></ol><p><br></p><h2><strong>Mô tả công việc</strong></h2><p><strong>As member of Software Engineering Team, your main responsibilities will depend on the job position for which you qualify:</strong></p><p>&nbsp;</p><p><strong>(1) Software Engineer - Integration Build (OpenSource system, C, C++, Python):</strong></p><ol><li>Operation and maintenance of (CI/CD/)CT pipeline based on Jenkins, BlackDuck Hub, Scancode and In-house system(VOSC)</li><li>(Yocto, Android, etc) Extending application and optimization of build-based Open Source Scan</li><li>OSS package verification and optimization</li></ol><p>&nbsp;</p><p><strong>(2) Software Engineer - Integration Build (C, C++, Python):</strong></p><ol><li>Design &amp; set up an initial build environment for a new project and provide/maintain an environment for developers to build.</li><li>Improvements to the Build System and developer development environment.</li><li>Establish a configuration management policy(Code quality and Code Review System) in close collaboration with other department, and set up and operate various tools that can help improvements Code quality and SW stabilize.</li></ol>', '2025-05-28 00:00:00.000000', 'JUNIOR', 'Ha Noi', 'Software Engineer - Integration Build (C, C++, Python)', 2, '<h2><strong>Yêu cầu công việc</strong></h2><p>Job requirements will depend on the position you apply for:</p><p>&nbsp;</p><p><strong>(1) Software Engineer - Integration Build (OpenSource system, C, C++, Python):</strong></p><ol><li>Understanding of open source licenses (e.g., GPL, MIT, Apache)</li><li>Experience in Yocto Build System, Android Build System</li><li>Experience in Git, Jenkins, BlackDuck Hub, Fosslight scanner</li><li>Excellent skills in Python, Shell scripts and Linux System</li><li>Git &amp; Gerrit experience (comfortable using code review and source code repository management)</li><li>Knowledge in containerization technologies such as Docker</li></ol><p>&nbsp;</p><p><strong>(2) Software Engineer - Integration Build (C, C++, Python):</strong></p><ol><li>Experience in Embedded Linux system</li><li>Fluency in&nbsp;<strong>C, C++,&nbsp;</strong>Java<strong>,</strong>&nbsp;Kotlin<strong>, Python</strong>, Shell scripting, Make. CMake.</li><li>Having hands-on experiences in using version control tool such as Git, gerrit(comfortable using code review and source code repository management);</li><li>Knowledge in containerization technologies such as Docker, VM</li></ol>', 2500, '2025-03-31 10:17:17.000000', 5, 'FULL_TIME');
INSERT INTO `jobs` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `active`, `benefits`, `description`, `end_date`, `level`, `location`, `name`, `quantity`, `requirements`, `salary`, `start_date`, `company_id`, `job_type`) VALUES
(13, '2025-05-02 03:08:48.000000', 'admin@gmail.com', NULL, NULL, b'1', '<p>Why&nbsp;<strong>BOSCH</strong>?</p><ol><li>Because we don\'t just follow trends, we&nbsp;<strong>create&nbsp;</strong>them.</li><li>Because we do not just follow trends, we&nbsp;<strong>create&nbsp;</strong>them. Together we turn ideas into reality, working every day to make the world of tomorrow a better place.&nbsp;</li></ol><p><br></p><p>Do you have high standards when it comes to your job? So do we. At Bosch, you will discover more than just work.</p><p><br></p><p><strong>Benefits and Career Opportunities</strong></p><ol><li>Working in one of the&nbsp;<strong>Best Places to Work</strong>&nbsp;in Vietnam and&nbsp;Top 30 of the&nbsp;<strong>Most Innovative Companies&nbsp;</strong>all over the world</li><li><strong>English-speaking</strong>&nbsp;environment, with opportunity to be part of innovation team and work in global projects</li><li><strong>Onsite opportunities</strong></li><li>Engage in our&nbsp;<strong>diverse training</strong>&nbsp;programs which surely help strengthen both your personal and professionalism</li><li><strong>Flexible&nbsp;</strong>working time and working model</li><li><strong>13th-month</strong>&nbsp;salary bonus + attractive&nbsp;<strong>performance bonus</strong>&nbsp;(you\'ll love it!) + annual performance appraisal</li><li><strong>100% offered&nbsp;salary</strong>&nbsp;and&nbsp;mandatory&nbsp;<strong>social insurances</strong>&nbsp;in 2-month probation</li><li><strong>15++ days</strong>&nbsp;of annual leave&nbsp;+ 1-day of birthday leave</li><li>Premium health insurance for employee and&nbsp;<strong>02 family members</strong></li><li>Lunch and parking allowance</li><li>Good benefits of company activities such as: football, badminton, yoga, Aerobic, team building…</li></ol><p><br></p>', '<h2><strong>3 Lý do để gia nhập công ty</strong></h2><ul><li>Committed 13th-mth bonus + attractive yearly bonus</li><li>Premium Healthcare for you and 2 family members</li><li>16++ days of paid leave per year</li></ul><p><br></p><h2><strong>Mô tả công việc</strong></h2><p><br></p><p><strong>Position Overview:</strong></p><p>We are seeking an expert in Android Automotive development to lead the design, implementation, and optimization of In-Vehicle Infotainment (IVI) systems and Cockpit Domain Controllers. The ideal candidate will possess deep expertise in Android Automotive, AOSP (Android Open-Source Project), and integrating multimedia, navigation, connectivity, and vehicle control features in a real-time automotive environment. This role requires experience in driving the technical architecture, coding, and hands-on system integration to deliver innovative automotive solutions. A key part of your responsibilities will include leading the development of high-performance, low-latency Android Automotive systems and collaborating across multi-OS platforms, including QNX Hypervisor integration.</p><p><br></p><p><strong>Key Responsibilities:</strong></p><p><br></p><p><strong>Android Automotive Systems Development</strong></p><ul><li>Lead the development of Android Automotive solutions, customizing AOSP for In-Vehicle Infotainment (IVI) platforms, and integrating multimedia, navigation, and vehicle control features.</li><li>Optimize HMI (Human-Machine Interface) for seamless transitions between infotainment and vehicle systems, enhancing the driver experience.</li></ul><p><br></p><p><strong>Hands-On Development &amp; Debugging</strong></p><p><strong>Platform Architecture &amp; Integration</strong></p><p><strong>Client Engagement &amp; Business Development</strong></p><p><strong>Leadership &amp; Cross-Functional Collaboration</strong></p>', '2025-05-31 00:00:00.000000', 'SENIOR', 'Ho Chi Minh', 'Android Automotive Expert', 1, '<ul><li><strong>Extensive Experience in Android Automotive Development:</strong>&nbsp;At least 8 years of hands-on experience in developing Android Automotive solutions, including deep customization of AOSP for IVI systems and infotainment platforms.</li></ul><p><br></p><ul><li><strong>Real-Time Systems Expertise:&nbsp;</strong>Proven experience in optimizing Android for real-time applications, including the integration of safety-critical systems and the implementation of multi-layered solutions with low-latency performance.</li></ul><p><br></p><ul><li><strong>Hands-On Embedded Systems Development:</strong>&nbsp;Expertise in writing low-level code, device drivers, and firmware for automotive platforms running Android, with experience in BSP development and hardware integration.</li><li><strong>Client-Facing &amp; Proposal Skills:</strong>&nbsp;Experience in client-facing roles, delivering technical presentations, and managing proposals and project bids related to Android Automotive solutions.</li></ul><p><br></p>', 4500, '2025-05-02 03:05:32.000000', 6, 'FULL_TIME'),
(14, '2025-05-04 07:13:43.000000', 'lgcarecenter@lge.com', NULL, NULL, b'1', '<p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Best remuneration</strong><span style=\"color: rgb(18, 18, 18);\">: Periodically review and adjust salary once a year, PI bonus twice a. Allowances for lunch, transportation, and phone charges. Party with the team once a. Workshop travel for the whole company once a year. Bonuses/Gifts for holidays, International Labor Day, International Women\'s Day, etc.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">High-class, modern office</strong><span style=\"color: rgb(18, 18, 18);\">: 5-star standard office with modern equipment, large rest and entertainment areas (game area, karaoke room, reading room, cafe counter, snack bar, etc.) Meet all members\' needs, especially the office has an airy and beautiful view that is among the most beautiful in Hanoi.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Top equipment</strong><span style=\"color: rgb(18, 18, 18);\">: Each employee is equipped with the latest generation LG Gram laptop and modern large LG screen.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Best working time</strong><span style=\"color: rgb(18, 18, 18);\">: Work 8 hours/day (8:00 ~ 17:00), from Monday to Friday. No pressure to work overtime/weekends!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Flexible, youthful working style</strong><span style=\"color: rgb(18, 18, 18);\">: LG CNS Vietnam members are mostly from the 9-10x generation, with a youthful, modern, and fair working style!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Creative environment, valuing individual opinions</strong><span style=\"color: rgb(18, 18, 18);\">: With a young and talented team, we always appreciate the creativity and suggestions that members make.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Opportunities to work/study in Korea and abroad</strong><span style=\"color: rgb(18, 18, 18);\">: With customers and projects mostly from abroad, your opportunities for training and onsite abroad will always be open!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Other</strong><span style=\"color: rgb(18, 18, 18);\">: Happy hours every Friday, Team outing monthly, join clubs like football, badminton, etc...</span></p>', '<p>We are seeking a highly skilled Solution Architect to join our team. This role focuses on solution architecture design, core engine development, and troubleshooting, with a strong emphasis on cloud-based environments and application optimization. The ideal candidate will have expertise in designing robust mechanisms, establishing development standards, and acting as a cloud architect, particularly with AWS.</p><ol><li>Core Engine Development: Design and develop the core engine of solutions, ensuring scalability, performance, and reliability.</li><li>Mechanism Design: Architect and implement innovative mechanisms to support business requirements and technical objectives.</li><li>Development Standards &amp; Guidelines: Establish and enforce development standards, best practices, and guidelines to ensure high-quality code and consistent delivery.</li><li>Cloud Architecture (AWS, GCP or Azure ...): Serve as a cloud architect, designing and implementing solutions on Cloud and more to build scalable and cost-effective systems.</li><li>Troubleshooting: Diagnose and resolve complex technical issues in applications, middleware, and cloud infrastructure</li></ol><p><br></p>', '2025-06-01 00:00:00.000000', 'SENIOR', 'Ha Noi', 'Solution Architect (SWA)', 2, '<p><strong>Technical Expertise:</strong></p><ul><li class=\"ql-indent-1\">7+ years of experience in java or python and related frameworks</li></ul><p><strong>Proficient in at least one of the following</strong>:&nbsp;Java, Python, .NET Core, or related frameworks&nbsp;for building robust applications.</p><ol><li>Strong experience in&nbsp;application optimization, including performance tuning, scalability, and resource efficiency.</li><li>Deep understanding of&nbsp;middleware&nbsp;technologies, including web servers, application servers (e.g., Tomcat), and caching systems (e.g.,&nbsp;Redis).</li><li>Hands-on experience with&nbsp;cloud environments&nbsp;(AWS, GCP or Azure ..) and&nbsp;container orchestration&nbsp;platforms like&nbsp;Kubernetes.</li><li>Problem-Solving: Ability to troubleshoot and resolve complex technical issues efficiently.</li><li>Code Review &amp; Mentorship: Experience reviewing code developed by peers, providing constructive feedback, and ensuring adherence to standards</li></ol><p>[Nice to have]</p><ol><li>UI Architecture Design: Collaborate on designing UI architectures, establishing standards, and ensuring seamless integration with backend systems.</li><li>UI Technology Prototyping: Develop prototypes to evaluate and implement new UI technologies, ensuring alignment with project goals.</li><li>Linux Proficiency: Basic understanding of Linux environments for deployment, debugging, and system administration.</li><li>Adaptability: Ability to quickly learn and adopt new technologies, conduct Proof of Concepts (PoCs), and apply findings to real-world projects.</li><li>Collaboration: Strong communication skills to work effectively with cross-functional teams, including developers, UI/UX designers, and stakeholders.</li></ol><p>&nbsp;</p><p><strong>Opportunity</strong></p><ol><li>Attractive salary and bonus will be discussed after going through CV &amp; Interview</li><li>Topik allowance</li><li>Review capacity annually and adjust salary increases according to work performance.</li><li>Health care: Premium health insurance, Annual health check-up</li><li>Young working environment</li><li>Good career development opportunities with interesting and challenging projects.</li><li>English, Korean, technical, soft skills training courses.</li><li>Opportunity to learn special courses from LG CNS, new technology and security.</li><li>Gifts on holidays (April 30th - May 1st, September 2nd, Tet, etc.)</li><li>Outdoor activities with company support: sports clubs, team building, happy hour parties, birthdays, travel, employee and family events, etc.</li><li>Working hours: 8 hours from Monday - Friday (8 hours/day)</li></ol><p><br></p>', 5500, '2025-05-04 07:11:32.000000', 5, 'FULL_TIME'),
(15, '2025-05-04 07:17:34.000000', 'lgcarecenter@lge.com', NULL, NULL, b'1', '<p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Best remuneration</strong><span style=\"color: rgb(18, 18, 18);\">: Periodically review and adjust salary once a year, PI bonus twice a. Allowances for lunch, transportation, and phone charges. Party with the team once a. Workshop travel for the whole company once a year. Bonuses/Gifts for holidays, International Labor Day, International Women\'s Day, etc.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">High-class, modern office</strong><span style=\"color: rgb(18, 18, 18);\">: 5-star standard office with modern equipment, large rest and entertainment areas (game area, karaoke room, reading room, cafe counter, snack bar, etc.) Meet all members\' needs, especially the office has an airy and beautiful view that is among the most beautiful in Hanoi.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Top equipment</strong><span style=\"color: rgb(18, 18, 18);\">: Each employee is equipped with the latest generation LG Gram laptop and modern large LG screen.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Best working time</strong><span style=\"color: rgb(18, 18, 18);\">: Work 8 hours/day (8:00 ~ 17:00), from Monday to Friday. No pressure to work overtime/weekends!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Flexible, youthful working style</strong><span style=\"color: rgb(18, 18, 18);\">: LG CNS Vietnam members are mostly from the 9-10x generation, with a youthful, modern, and fair working style!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Creative environment, valuing individual opinions</strong><span style=\"color: rgb(18, 18, 18);\">: With a young and talented team, we always appreciate the creativity and suggestions that members make.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Opportunities to work/study in Korea and abroad</strong><span style=\"color: rgb(18, 18, 18);\">: With customers and projects mostly from abroad, your opportunities for training and onsite abroad will always be open!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Other</strong><span style=\"color: rgb(18, 18, 18);\">: Happy hours every Friday, Team outing monthly, join clubs like football, badminton, etc...</span></p>', '<p>We are seeking a skilled Software Engineer with a strong background in Spring Boot and Java to join our dynamic team. The ideal candidate will be responsible for designing and developing scalable applications and managing cloud resources effectively.</p><ol><li>Design and develop applications using Spring Boot and Java.</li><li>Work with databases, SQL, and Python ORM for data management.</li><li>Design and develop infrastructure using Terraform.</li><li>Implement serverless applications with AWS Lambda, SQS, EventBridge, and SES.</li><li>Develop and manage applications on GCP CloudRun.</li><li>Utilize Git, Jira, and Confluence for version control and project management.</li><li>Understand and implement CI/CD pipelines using GitHub Actions.</li></ol><p><br></p>', '2025-06-03 00:00:00.000000', 'FRESHER', 'Ha Noi', 'Crawling Engineer (Java, Python)', 1, '<ol><li>Graduated from University major in information technology or related</li><li>At least one year of experience in same position</li><li>Experience with Git, Jira, and Confluence.</li><li>Understanding and utilization of CI/CD.</li><li>Experience in Python programming.</li><li>Familiarity with Spring Boot and Java code.</li><li>Knowledge of GCP Cloud Run.</li><li>Experience working with Amazon SQS and AWS Lambda.</li><li>Proficiency in Spring Boot and Java design/development.</li><li>Strong knowledge of DB/SQL and Python ORM.</li><li>Experience in Terraform design and development.</li><li>Familiarity with AWS services: Lambda, SQS, EventBridge, SES.</li><li>Experience with GCP CloudRun design and development.</li></ol><p>&nbsp;</p><p>[Preferred]</p><ol><li>Experience in Agile and application lifecycle management.</li><li>Experience with CI/CD and Git applications.</li><li>Experience with Amazon Athena.</li><li>Experience in design and development using Amazon SQS/AWS Lambda.</li><li>Experience in handling parallel processes, threading, and computing resources.</li><li>Knowledge of resource optimization techniques.</li><li>Ability to resolve complex application and cloud resource issues.</li><li>Experience in analyzing and handling open-source library issues.</li><li>Familiarity with Apache Flow.</li></ol><p><br></p><p><strong>Opportunity</strong></p><ol><li>Attractive salary and bonus will be discussed after going through CV &amp; Interview</li><li>Topik allowance</li><li>Review capacity annually and adjust salary increases according to work performance.</li><li>Health care: Premium health insurance, Annual health check-up</li><li>Young working environment</li><li>Good career development opportunities with interesting and challenging projects.</li><li>English, Korean, technical, soft skills training courses.</li><li>Opportunity to learn special courses from LG CNS, new technology and security.</li><li>Gifts on holidays (April 30th - May 1st, September 2nd, Tet, etc.)</li><li>Outdoor activities with company support: sports clubs, team building, happy hour parties, birthdays, travel, employee and family events, etc.</li><li>Working hours: 8 hours from Monday - Friday (8 hours/day)</li></ol><p><br></p>', 1000, '2025-05-04 07:16:18.000000', 5, 'CONTRACT'),
(17, '2025-05-05 04:27:10.000000', 'lgcarecenter@lge.com', NULL, NULL, b'1', '<p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Best remuneration</strong><span style=\"color: rgb(18, 18, 18);\">: Periodically review and adjust salary once a year, PI bonus twice a. Allowances for lunch, transportation, and phone charges. Party with the team once a. Workshop travel for the whole company once a year. Bonuses/Gifts for holidays, International Labor Day, International Women\'s Day, etc.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">High-class, modern office</strong><span style=\"color: rgb(18, 18, 18);\">: 5-star standard office with modern equipment, large rest and entertainment areas (game area, karaoke room, reading room, cafe counter, snack bar, etc.) Meet all members\' needs, especially the office has an airy and beautiful view that is among the most beautiful in Hanoi.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Top equipment</strong><span style=\"color: rgb(18, 18, 18);\">: Each employee is equipped with the latest generation LG Gram laptop and modern large LG screen.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Best working time</strong><span style=\"color: rgb(18, 18, 18);\">: Work 8 hours/day (8:00 ~ 17:00), from Monday to Friday. No pressure to work overtime/weekends!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Flexible, youthful working style</strong><span style=\"color: rgb(18, 18, 18);\">: LG CNS Vietnam members are mostly from the 9-10x generation, with a youthful, modern, and fair working style!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Creative environment, valuing individual opinions</strong><span style=\"color: rgb(18, 18, 18);\">: With a young and talented team, we always appreciate the creativity and suggestions that members make.</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Opportunities to work/study in Korea and abroad</strong><span style=\"color: rgb(18, 18, 18);\">: With customers and projects mostly from abroad, your opportunities for training and onsite abroad will always be open!</span></p><p><span style=\"color: rgb(18, 18, 18);\">-&nbsp;</span><strong style=\"color: rgb(18, 18, 18);\">Other</strong><span style=\"color: rgb(18, 18, 18);\">: Happy hours every Friday, Team outing monthly, join clubs like football, badminton, etc...</span></p>', '<ol><li>Design and build Database in Public Cloud environments such as AWS, GCP, and Azure</li><li>Operate Databases in Public Cloud Environments Such As AWS, GCP, and Azure</li><li>Perform DBMS OBJECT change management such as Table, Index, VIEW, Procecure, etc.</li><li>SQL performance tuning on databases such as Mysql, Mariadb, Postgresql, Oracle, and more</li></ol><p><br></p>', '2025-06-27 00:00:00.000000', 'MIDDLE', 'Ha Noi', 'Data Engineer (DBA)', 2, '<p>[Required]</p><p>Having experience in bellow area</p><ol><li>Experience in designing, building, and operating DBMS (Oracle, RDS, Redshift, BigQuery, etc.) in public cloud environments such as AWS, GCP, and Azure</li><li>Experience in SQL development and performance tuning in database environments such as Mysql, Mariadb, Postgresql, and Oracle</li><li>Graduated from University</li><li>Average Verbal English Communication skill (Ability to perform work in English)</li></ol><p>&nbsp;</p><p>[Nice to have]</p><ol><li>Positive thinking and friendly</li><li>Korean communication</li></ol><p><br></p>', 2000, '2025-05-05 04:25:45.000000', 5, 'FULL_TIME');

-- --------------------------------------------------------

--
-- Table structure for table `job_skill`
--

CREATE TABLE `job_skill` (
  `job_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_skill`
--

INSERT INTO `job_skill` (`job_id`, `skill_id`) VALUES
(5, 7),
(5, 14),
(5, 16),
(6, 28),
(6, 29),
(6, 30),
(6, 32),
(7, 14),
(7, 24),
(8, 33),
(8, 34),
(9, 7),
(9, 11),
(9, 14),
(10, 7),
(10, 11),
(10, 20),
(11, 14),
(11, 20),
(12, 28),
(12, 29),
(12, 31),
(13, 29),
(13, 30),
(13, 31),
(14, 28),
(14, 30),
(14, 31),
(15, 28),
(15, 29),
(15, 31),
(15, 32),
(17, 14),
(17, 29),
(17, 31);

-- --------------------------------------------------------

--
-- Table structure for table `job_user`
--

CREATE TABLE `job_user` (
  `job_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_user`
--

INSERT INTO `job_user` (`job_id`, `user_id`) VALUES
(4, 10),
(1, 10),
(6, 10),
(11, 10),
(5, 10),
(5, 1),
(2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `online_resumes`
--

CREATE TABLE `online_resumes` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `certifications` mediumtext DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `educations` mediumtext DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `languages` mediumtext DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `summary` mediumtext DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `online_resumes`
--

INSERT INTO `online_resumes` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `address`, `certifications`, `date_of_birth`, `educations`, `email`, `full_name`, `languages`, `phone`, `summary`, `title`, `user_id`) VALUES
(46, '2025-05-05 02:36:33.000000', 'hairyan789@gmail.com', '2025-05-05 02:53:32.000000', 'hairyan789@gmail.com', 'Đặng Lộ, P7, Q.Tân Bình Hồ Chí Minh', '<p>+ Amazon Web Service.</p><p>+ HackerRank</p>', '2002-02-07', '<h3><strong style=\"color: rgb(65, 64, 66);\">Industrial University of Ho Chi Minh City</strong></h3><p><br></p><p>+ <strong>Major</strong>: Information Technology</p><p>+ <strong>Time: </strong><span style=\"color: rgb(65, 64, 66);\">10/2020 - 06/2025</span></p><p><span style=\"color: rgb(65, 64, 66);\">+ </span><strong style=\"color: rgb(65, 64, 66);\">GPA</strong><span style=\"color: rgb(65, 64, 66);\">: 3.33</span></p>', 'hairyan789@gmail.com', 'Vũ Hoàng Hải', '<p>+ TOEIC: 800 (2025)</p>', '0377586305', '<p><span style=\"color: rgb(18, 18, 18);\">I\'m a recent graduate from Industrial University of Ho Chi Minh City, majoring in Information Technology. I have experience working with ReactJS (commonly used libraries) and NodeJS (Back End processing). I\'m seeking Web Development jobs that matches my knowledge and skills.&nbsp;</span></p>', 'FRESHER WEB DEVELOPER', 10),
(47, '2025-05-05 02:50:18.000000', 'hairyan789@gmail.com', '2025-05-05 02:51:36.000000', 'hairyan789@gmail.com', 'Đặng Lộ, P7, Q.Tân Bình Hồ Chí Minh', '<p>eqw</p>', '2002-02-07', '<p>eqwe</p>', 'hairyan789@gmail.com', 'Vũ Hoàng Hải', NULL, '0377586305', '<p>eqw</p>', 'ABC XYZ', 10);

-- --------------------------------------------------------

--
-- Table structure for table `online_resumes_skills`
--

CREATE TABLE `online_resumes_skills` (
  `online_resume_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `online_resumes_skills`
--

INSERT INTO `online_resumes_skills` (`online_resume_id`, `skill_id`) VALUES
(46, 1),
(46, 6),
(46, 7),
(46, 8),
(46, 9),
(46, 11),
(46, 17),
(46, 19),
(46, 20);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `api_path` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `api_path`, `method`, `module`, `name`) VALUES
(1, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/companies', 'POST', 'COMPANIES', 'Create a company'),
(2, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/companies', 'PUT', 'COMPANIES', 'Update a company'),
(3, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/companies/{id}', 'DELETE', 'COMPANIES', 'Delete a company'),
(4, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/companies/{id}', 'GET', 'COMPANIES', 'Get a company by id'),
(5, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/companies', 'GET', 'COMPANIES', 'Get companies'),
(6, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/jobs', 'POST', 'JOBS', 'Create a job'),
(7, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/jobs', 'PUT', 'JOBS', 'Update a job'),
(8, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/jobs/{id}', 'DELETE', 'JOBS', 'Delete a job'),
(9, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/jobs/{id}', 'GET', 'JOBS', 'Get a job by id'),
(10, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/jobs', 'GET', 'JOBS', 'Get jobs'),
(11, '2025-03-17 03:23:56.000000', '', NULL, NULL, '/api/v1/permissions', 'POST', 'PERMISSIONS', 'Create a permission'),
(12, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/permissions', 'PUT', 'PERMISSIONS', 'Update a permission'),
(13, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/permissions/{id}', 'DELETE', 'PERMISSIONS', 'Delete a permission'),
(14, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/permissions/{id}', 'GET', 'PERMISSIONS', 'Get a permission by id'),
(15, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/permissions', 'GET', 'PERMISSIONS', 'Get permissions'),
(16, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/resumes', 'POST', 'RESUMES', 'Create a resume'),
(17, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/resumes', 'PUT', 'RESUMES', 'Update a resume'),
(18, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/resumes/{id}', 'DELETE', 'RESUMES', 'Delete a resume'),
(19, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/resumes/{id}', 'GET', 'RESUMES', 'Get a resume by id'),
(20, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/resumes', 'GET', 'RESUMES', 'Get resumes'),
(21, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/roles', 'POST', 'ROLES', 'Create a role'),
(22, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/roles', 'PUT', 'ROLES', 'Update a role'),
(23, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/roles/{id}', 'DELETE', 'ROLES', 'Delete a role'),
(24, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/roles/{id}', 'GET', 'ROLES', 'Get a role by id'),
(25, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/roles', 'GET', 'ROLES', 'Get roles'),
(26, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/users', 'POST', 'USERS', 'Create a user'),
(27, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/users', 'PUT', 'USERS', 'Update a user'),
(28, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/users/{id}', 'DELETE', 'USERS', 'Delete a user'),
(29, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/users/{id}', 'GET', 'USERS', 'Get a user by id'),
(30, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/users', 'GET', 'USERS', 'Get users'),
(31, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/users/saveJob/{userId}/{jobId}', 'POST', 'USERS', 'save job'),
(32, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers', 'POST', 'SUBSCRIBERS', 'Create a subscriber'),
(33, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers', 'PUT', 'SUBSCRIBERS', 'Update a subscriber'),
(34, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers/{id}', 'DELETE', 'SUBSCRIBERS', 'Delete a subscriber'),
(35, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers/{id}', 'GET', 'SUBSCRIBERS', 'Get a subscriber by id'),
(36, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers', 'GET', 'SUBSCRIBERS', 'Get subscribers'),
(37, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/files', 'POST', 'FILES', 'Download a file'),
(38, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/files', 'GET', 'FILES', 'Upload a file'),
(39, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers', 'POST', 'Subscribers', 'create a subscriber'),
(40, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers', 'PUT', 'Subscribers', 'update a subscriber'),
(41, '2025-03-17 03:23:57.000000', '', NULL, NULL, '/api/v1/subscribers', 'DELETE', 'Subscribers', 'delete a subscriber');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `role_id` bigint(20) NOT NULL,
  `permission_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 16),
(2, 17),
(2, 18),
(2, 19),
(2, 20);

-- --------------------------------------------------------

--
-- Table structure for table `resumes`
--

CREATE TABLE `resumes` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('APPROVED','PENDING','REJECTED','REVIEWING') DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `advantage` mediumtext DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `shortcoming` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resumes`
--

INSERT INTO `resumes` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `email`, `status`, `url`, `job_id`, `user_id`, `advantage`, `rating`, `shortcoming`) VALUES
(3, '2025-04-27 12:34:13.000000', 'hairyan789@gmail.com', NULL, NULL, 'hairyan789@gmail.com', 'PENDING', '1745757253784-Vu_Hoang_Hai_CV.pdf', 4, 10, 'Kinh nghiệm làm việc với ReactJS, NodeJS và các database như SQL Server, MySQL, MongoDB. Có kinh nghiệm với cả Front-end và Back-end. Tham gia nhiều dự án thực tế, có kiến thức về quy trình phát triển phần mềm.', 65, 'Thiếu kinh nghiệm làm việc thực tế tại các công ty lớn, chưa có kinh nghiệm làm việc trong lĩnh vực tài chính ngân hàng. Tiếng Anh cần cải thiện để đạt yêu cầu TOEIC 450. Chưa có kinh nghiệm làm việc với các công nghệ mới như GraphQL, Docker Container (K8s), CICD, EventSourcing, CQRS, NoSQL'),
(4, '2025-04-27 13:12:33.000000', 'hairyan789@gmail.com', NULL, NULL, 'hairyan789@gmail.com', 'PENDING', '1745759553229-Vu_Hoang_Hai_CV.pdf', 6, 10, 'Ứng viên có kinh nghiệm làm việc với ReactJS, NodeJS, SQL Server, MySQL, JavaScript, HTML5/CSS3, RESTful, ExpressJS, MongoDB. Có kinh nghiệm với các dự án thực tế như Job Portal - CareerNest, Zing Mp3 Website Cloning, E-commerce MobileStore, Website for booking appointment - BookingCare, CRM website to manage employees. Có kiến thức về Java, PostgreSQL, Docker, MVC, Firebase, Github, Wordpress.', 65, 'Ứng viên là fresher, kinh nghiệm làm việc thực tế còn hạn chế. Mức độ thành thạo một số kỹ năng còn ở mức Intermediate hoặc Beginner. Chưa có kinh nghiệm với Spring Boot, Angular hoặc các công nghệ cloud.'),
(5, '2025-05-04 05:26:56.000000', 'hairyan789@gmail.com', '2025-05-05 07:55:03.000000', 'lgcarecenter@lge.com', 'hairyan789@gmail.com', 'REVIEWING', '1746336416471-Vu_Hoang_Hai_CV.pdf', 2, 10, 'Ứng viên có kinh nghiệm làm việc với ReactJS, NodeJS và các công nghệ liên quan như SQL Server, MySQL, JavaScript, Tailwind, HTML5, CSS, RESTful, ExpressJS, MongoDB. Có kinh nghiệm làm các dự án web như Job Portal, Zing Mp3 Website Cloning, E-commerce MobileStore, Website for booking appointment. Có kiến thức về cả Front-end và Back-end. Đã quen với quy trình làm việc nhóm (2 người) và làm việc độc lập.', 65, 'Ứng viên là sinh viên mới tốt nghiệp, kinh nghiệm làm việc thực tế còn hạn chế (chủ yếu là các dự án cá nhân hoặc dự án nhỏ). Chưa có kinh nghiệm với Flutter hoặc các ngôn ngữ như C/C++, Python. Kỹ năng tiếng Anh ở mức Intermediate có thể là một rào cản trong việc giao tiếp kỹ thuật với các nhóm Scrum cộng tác.'),
(6, '2025-05-05 08:13:56.000000', 'cuutrang0106@gmail.com', NULL, NULL, 'cuutrang0106@gmail.com', 'PENDING', '1746432836869-CV_2025_Nguyen-Minh-Chien.pdf', 2, 3, 'undefined', 50, 'undefined'),
(7, '2025-05-05 08:15:02.000000', 'cuutrang0106@gmail.com', NULL, NULL, 'cuutrang0106@gmail.com', 'PENDING', '1746432902826-CV_2025_Nguyen-Minh-Chien.pdf', 6, 3, 'undefined', 50, 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `name` enum('ADMIN','RECRUITER','USER') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `active`, `description`, `name`) VALUES
(1, '2025-03-17 03:23:57.000000', '', '2025-05-02 03:14:54.000000', 'admin@gmail.com', b'1', 'this account has full permissionss', 'ADMIN'),
(2, '2025-03-17 03:23:57.000000', '', '2025-05-02 03:28:01.000000', 'admin@gmail.com', b'1', 'This account has Recruiter\'s permissionss', 'RECRUITER'),
(3, '2025-03-17 03:23:57.000000', '', NULL, NULL, b'1', 'this account has user\'s permissions', 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `name`) VALUES
(1, '2024-05-26 01:55:22.311996', 'admin@gmail.com', NULL, NULL, 'REACTJS'),
(2, '2024-05-26 01:55:30.793279', 'admin@gmail.com', NULL, NULL, 'REACT NATIVE'),
(3, '2024-05-26 01:55:42.807009', 'admin@gmail.com', NULL, NULL, 'VUEJS'),
(4, '2024-05-26 01:55:52.793264', 'admin@gmail.com', NULL, NULL, 'ANGULAR'),
(5, '2024-05-26 01:56:03.752343', 'admin@gmail.com', NULL, NULL, 'NESTJS'),
(6, '2024-05-26 01:56:22.749917', 'admin@gmail.com', NULL, NULL, 'TYPESCRIPT'),
(7, '2024-05-26 01:56:30.229669', 'admin@gmail.com', NULL, NULL, 'JAVA'),
(8, '2024-05-26 01:56:39.869728', 'admin@gmail.com', NULL, NULL, 'FRONTEND'),
(9, '2024-05-26 01:56:47.205188', 'admin@gmail.com', NULL, NULL, 'BACKEND'),
(10, '2024-05-26 01:56:55.463303', 'admin@gmail.com', NULL, NULL, 'FULLSTACK'),
(11, '2024-05-26 01:57:06.691679', 'admin@gmail.com', NULL, NULL, 'SPRING BOOT'),
(12, '2024-05-26 01:57:06.691679', 'admin@gmail.com', NULL, NULL, 'NEXTJS'),
(13, '2024-05-26 01:57:06.691679', 'admin@gmail.com', NULL, NULL, 'DevOps'),
(14, '2024-05-26 01:57:06.691679', 'admin@gmail.com', NULL, NULL, 'Oracle'),
(15, '2024-05-26 01:57:06.691679', 'admin@gmail.com', NULL, NULL, 'SQL'),
(16, '2025-03-30 07:53:04.000000', 'admin@gmail.com', NULL, NULL, 'PYTHON'),
(17, '2025-03-31 04:43:02.000000', 'admin@gmail.com', NULL, NULL, 'NODEJS'),
(18, '2025-03-31 04:43:14.000000', 'admin@gmail.com', NULL, NULL, 'JAVASCRIPT'),
(19, '2025-03-31 05:08:57.000000', 'admin@gmail.com', NULL, NULL, 'NOSQL'),
(20, '2025-03-31 05:10:56.000000', 'admin@gmail.com', NULL, NULL, 'MONGODB'),
(21, '2025-03-31 05:13:02.000000', 'admin@gmail.com', NULL, NULL, 'POSTGRESQL'),
(22, '2025-03-31 05:15:00.000000', 'admin@gmail.com', NULL, NULL, 'HTML5'),
(23, '2025-03-31 05:15:05.000000', 'admin@gmail.com', NULL, NULL, 'WORDPRESS'),
(24, '2025-03-31 05:15:13.000000', 'admin@gmail.com', NULL, NULL, 'TESTER'),
(25, '2025-03-31 05:15:18.000000', 'admin@gmail.com', NULL, NULL, 'QA QC'),
(26, '2025-03-31 05:15:57.000000', 'admin@gmail.com', NULL, NULL, 'MYSQL'),
(27, '2025-03-31 05:16:28.000000', 'admin@gmail.com', NULL, NULL, 'ANGULARJS'),
(28, '2025-03-31 05:17:06.000000', 'admin@gmail.com', NULL, NULL, 'OOP'),
(29, '2025-03-31 05:17:09.000000', 'admin@gmail.com', NULL, NULL, 'C++'),
(30, '2025-03-31 05:17:25.000000', 'admin@gmail.com', NULL, NULL, 'ANDROID'),
(31, '2025-03-31 05:17:38.000000', 'admin@gmail.com', NULL, NULL, 'EMBEDDED'),
(32, '2025-03-31 05:17:42.000000', 'admin@gmail.com', NULL, NULL, 'C#'),
(33, '2025-03-31 09:37:35.000000', 'admin@gmail.com', NULL, NULL, 'AUTOMATION TEST'),
(34, '2025-03-31 09:37:41.000000', 'admin@gmail.com', NULL, NULL, 'MANAGER');

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `company_id` bigint(20) NOT NULL,
  `value_column` varchar(255) DEFAULT NULL,
  `key_column` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `email`, `name`) VALUES
(6, '2025-04-09 04:49:44.000000', 'hairyan789@gmail.com', '2025-04-12 02:57:02.000000', 'hairyan789@gmail.com', 'hairyan789@gmail.com', 'Vũ Hoàng Hải'),
(7, '2025-05-05 07:55:47.000000', 'cuutrang0106@gmail.com', NULL, NULL, 'cuutrang0106@gmail.com', 'Nguyễn Minh Chiến');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber_skill`
--

CREATE TABLE `subscriber_skill` (
  `subscriber_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriber_skill`
--

INSERT INTO `subscriber_skill` (`subscriber_id`, `skill_id`) VALUES
(6, 1),
(6, 7),
(6, 8),
(6, 29),
(7, 4),
(7, 6),
(7, 32);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `is_blocked` bit(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `refresh_token` mediumtext DEFAULT NULL,
  `status` enum('OFFLINE','ONLINE') DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `main_resume` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `address`, `avatar`, `date_of_birth`, `email`, `first_name`, `gender`, `is_blocked`, `last_name`, `password`, `phone_number`, `refresh_token`, `status`, `company_id`, `role_id`, `main_resume`) VALUES
(1, '2025-03-17 03:23:57.000000', '', '2025-05-05 08:25:23.000000', 'admin@gmail.com', 'Quận Bắc Từ Liêm Hà Nội', 'users-032a7f89-625f-4b01-a420-7ed8a392102e', '2002-01-25', 'admin@gmail.com', 'ADMIN', 'FEMALE', b'0', 'SUPER', '$2a$10$9ThWZooaw00D6hPWutSNEehc1TcPEMrhR1woHHiOvMIeBEFDHtR6i', '0918292819', NULL, 'OFFLINE', NULL, 1, NULL),
(3, '2025-03-28 09:59:30.000000', 'admin@gmail.com', '2025-05-05 08:14:49.000000', 'anonymousUser', 'Tân Sơn, Gò Vấp, TP HCM', 'users-86292b9f-a682-4355-b331-4d8f8fbc609d', '2003-02-05', 'cuutrang0106@gmail.com', 'Chiến', 'MALE', b'0', 'Nguyễn Minh', '$2a$10$nAqo6iQVT2I3CJ41dnFA2OdZt88ZJdOeK5bcDyUDBwHmoknWlgGDK', '0975458467', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdXV0cmFuZzAxMDZAZ21haWwuY29tIiwiZXhwIjoxNzU1MDcyODg5LCJpYXQiOjE3NDY0MzI4ODksInVzZXIiOnsiaWQiOjMsImVtYWlsIjoiY3V1dHJhbmcwMTA2QGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkNoacOqzIFuIiwibGFzdE5hbWUiOiJOZ3V5w6rMg24gTWluaCJ9fQ.VS8kh8JJ5IbQa_JovDkW_t4naQyxIE5ZLOW5o4HOCsfD82_WYIKeDwMEI0a6a--VSh0GhyF3mbAVIN4ggQqF7Q', NULL, NULL, 3, '1746431907361-CV_2025_Nguyen-Minh-Chien.pdf'),
(7, '2025-03-29 06:00:09.000000', 'admin@gmail.com', '2025-05-02 04:37:26.000000', 'sales@gcalls.co', NULL, 'companies-c4f1563a-65f1-4555-ac8d-68f673bb0fcf', NULL, 'sales@gcalls.co', 'Công ty cổ phần Gcalls - Giải pháp tổng đài CSKH & Bán Hàng', NULL, b'0', NULL, '$2a$10$8ACiUltFbC.cSizua0nGCO6UlcnslFxjDntEa4sJ8HQlET8MZ.6vS', '(+84) 8985 870 99', NULL, 'OFFLINE', 1, 2, NULL),
(10, '2025-04-01 12:55:41.000000', 'anonymousUser', '2025-05-05 02:59:49.000000', 'hairyan789@gmail.com', 'Đặng Lộ, P7, Q.Tân Bình Hồ Chí Minh', 'users-9a115b29-57b8-4e5c-b731-cb3f0316b1ba', '2002-02-07', 'hairyan789@gmail.com', 'Hải', 'FEMALE', b'0', 'Vũ Hoàng', '$2a$10$BUJXh21PXiyWKkAWgIKRA.GupiJJ6fq0zw5Od4n1P3VWn5j.8hvOW', '0377586305', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYWlyeWFuNzg5QGdtYWlsLmNvbSIsImV4cCI6MTc1NTA1Mzk4OSwiaWF0IjoxNzQ2NDEzOTg5LCJ1c2VyIjp7ImlkIjoxMCwiZW1haWwiOiJoYWlyeWFuNzg5QGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkjhuqNpIiwibGFzdE5hbWUiOiJWxakgSG_DoG5nIn19.RZHij5qsE5Gxww7ray15WoZNqItwaMwppjPI9sbAfu8FIff2YfKQUf11viFjDc9axc2ROLNmm-23w_zT_bXc-g', 'OFFLINE', NULL, 3, '1745730798752-Vu_Hoang_Hai_CV.pdf'),
(12, '2025-04-14 05:09:26.000000', 'admin@gmail.com', '2025-05-05 08:25:36.000000', 'lgcarecenter@lge.com', NULL, 'companies-e3cd4f85-60d9-4b6e-aa31-e3e9d3b7072e', NULL, 'lgcarecenter@lge.com', 'LG Electronics Development Vietnam', NULL, b'0', NULL, '$2a$10$RTad02txOZHf7njia0Jbh.zIhyoPo3yOexyv/GAkeutZAmEFOtZfW', '1900 5522', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZ2NhcmVjZW50ZXJAbGdlLmNvbSIsImV4cCI6MTc1NTA3MzUzNiwiaWF0IjoxNzQ2NDMzNTM2LCJ1c2VyIjp7ImlkIjoxMiwiZW1haWwiOiJsZ2NhcmVjZW50ZXJAbGdlLmNvbSIsImZpcnN0TmFtZSI6IkxHIEVsZWN0cm9uaWNzIERldmVsb3BtZW50IFZpZXRuYW0iLCJsYXN0TmFtZSI6bnVsbH19.DAiq2QxmMpDr_HEDdF2vSjMNrEA97ivokWEkPz7KM0iEzyavAem6pfyZzTva0a1fdzCFW1WZsVvRpG4MQVX29Q', 'OFFLINE', 5, 2, NULL),
(13, '2025-04-25 06:28:16.000000', 'admin@gmail.com', NULL, NULL, NULL, 'companies-cd52ebf6-9773-4e2b-94f9-674d6df969b3', NULL, 'sales@tiki.co', 'Thương mại điện tử - Tiki', NULL, b'0', NULL, '$2a$10$MG9htyOrL0eD04b51pssUuubAr.Cs6lysynwDRjmQEdsfUY9YbV1.', '1900 6035', NULL, NULL, 2, 2, NULL),
(14, '2025-04-25 06:28:27.000000', 'admin@gmail.com', NULL, NULL, NULL, 'companies-c9171f7c-cbc0-4a89-8089-3f07cd22e051', NULL, 'sales@lazada.co', 'Thương mại điện tử - Lazada', NULL, b'0', NULL, '$2a$10$3ge3iMqhAD2pAVN1a6DVUePPoL.NX/fyehluFdEIwO.vQtAXa0gEu', '1900 8891', NULL, NULL, 3, 2, NULL),
(15, '2025-04-25 06:28:45.000000', 'admin@gmail.com', NULL, NULL, NULL, 'companies-e73906d1-9e17-46c4-a030-5e8dcc6e2353', NULL, 'mb247@mbbank.com.vn', 'MB Bank', NULL, b'0', NULL, '$2a$10$RCufLvOHCI1AX61pQSHXp.3sSbQHEjdYIgZBXq.ywZ6IvCMSxmlqq', '1900 5522', NULL, NULL, 4, 2, NULL),
(16, '2025-04-25 06:29:14.000000', 'admin@gmail.com', NULL, NULL, NULL, 'companies-3addcaf2-fba1-497e-8fa0-01b3fcb79d51', NULL, 'thea.vo@nab.com.au', 'NAB Innovation Centre Vietnam', NULL, b'0', NULL, '$2a$10$t1yx3RapOzpOk0L/MtWdpugnLAJm06yFyZkG50gdSyqeKU5fO29OO', '02899986866', NULL, NULL, 7, 2, NULL),
(17, '2025-04-25 06:29:44.000000', 'admin@gmail.com', NULL, NULL, NULL, 'companies-dd5cf5c8-9c63-4980-9014-b47ac3588eaf', NULL, 'boschcareer@gmail.com', 'Bosch Global Software Technologies', NULL, b'0', NULL, '$2a$10$Fnp.4Pnm7j7IztkK9zQkl.R6V246MLaHFLp9uN/QYgUcYURIBSEYy', '1900 2214', NULL, NULL, 6, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `work_experiences`
--

CREATE TABLE `work_experiences` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) NOT NULL,
  `description` mediumtext DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `online_resume_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `work_experiences`
--

INSERT INTO `work_experiences` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `company_name`, `description`, `end_date`, `location`, `start_date`, `online_resume_id`) VALUES
(40, '2025-05-05 02:49:26.000000', 'hairyan789@gmail.com', '2025-05-05 02:53:32.000000', 'hairyan789@gmail.com', 'Gcalls Call Center Solutions Company', '<ol><li>&nbsp;Designed a REST API call in NodeJS that allows clients to simultaneously update multiple interdependent elements within a large SQL Server database, resulting in significant performance increases for both client and server.</li><li>Used a topological sorting algorithm on a DAG in order to correctly resolve data dependencies.</li></ol>', '2024-10-13', 'Thu Duc, HCM City', '2024-08-15', 46);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKand7mh9iu4kt3n1tn2w9i9of0` (`receiver_id`),
  ADD KEY `FKgiqeap8ays4lf684x7m0r2729` (`sender_id`);

--
-- Indexes for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5dcbwunakaptlbc6yv3l761w4` (`receiver_id`),
  ADD KEY `FKfxo72oqicfmlla9x4hjeqhvpq` (`sender_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5rk3exlcapww4w6xgqyqhllcx` (`company_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrtmqcrktb6s7xq8djbs2a2war` (`company_id`);

--
-- Indexes for table `job_skill`
--
ALTER TABLE `job_skill`
  ADD KEY `FKdh76859joo68p6dbj9erh4pbs` (`skill_id`),
  ADD KEY `FKje4q8ajxb3v5bel11dhbxrb8d` (`job_id`);

--
-- Indexes for table `job_user`
--
ALTER TABLE `job_user`
  ADD KEY `FK56yof04f6w0b0yj3s3h4jjnlr` (`user_id`),
  ADD KEY `FKbsunxxvebg5ayakiaat8fcjq9` (`job_id`);

--
-- Indexes for table `online_resumes`
--
ALTER TABLE `online_resumes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK79cuptge8g888jw99scgogt2e` (`user_id`);

--
-- Indexes for table `online_resumes_skills`
--
ALTER TABLE `online_resumes_skills`
  ADD KEY `FK5pctut43jnragn1uqswpbieey` (`skill_id`),
  ADD KEY `FKolaptlhpotsbxjvl7g8vgo2j8` (`online_resume_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD KEY `FK6mg4g9rc8u87l0yavf8kjut05` (`permission_id`),
  ADD KEY `FK3vhflqw0lwbwn49xqoivrtugt` (`role_id`);

--
-- Indexes for table `resumes`
--
ALTER TABLE `resumes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjdec9qbp2blbpag6obwf0fmbd` (`job_id`),
  ADD KEY `FK340nuaivxiy99hslr3sdydfvv` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`company_id`,`key_column`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriber_skill`
--
ALTER TABLE `subscriber_skill`
  ADD KEY `FKly8pe7rx11g3v97b1oq0vjs2r` (`skill_id`),
  ADD KEY `FKjflpvmqmxox8edvsldr12hqjc` (`subscriber_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKin8gn4o1hpiwe6qe4ey7ykwq7` (`company_id`),
  ADD KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`);

--
-- Indexes for table `work_experiences`
--
ALTER TABLE `work_experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKhqraamtfn65vpta77516iqyl7` (`online_resume_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `online_resumes`
--
ALTER TABLE `online_resumes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `resumes`
--
ALTER TABLE `resumes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `work_experiences`
--
ALTER TABLE `work_experiences`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `FKand7mh9iu4kt3n1tn2w9i9of0` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKgiqeap8ays4lf684x7m0r2729` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD CONSTRAINT `FK5dcbwunakaptlbc6yv3l761w4` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKfxo72oqicfmlla9x4hjeqhvpq` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK5rk3exlcapww4w6xgqyqhllcx` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `FKrtmqcrktb6s7xq8djbs2a2war` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `job_skill`
--
ALTER TABLE `job_skill`
  ADD CONSTRAINT `FKdh76859joo68p6dbj9erh4pbs` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `FKje4q8ajxb3v5bel11dhbxrb8d` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`);

--
-- Constraints for table `job_user`
--
ALTER TABLE `job_user`
  ADD CONSTRAINT `FK56yof04f6w0b0yj3s3h4jjnlr` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKbsunxxvebg5ayakiaat8fcjq9` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`);

--
-- Constraints for table `online_resumes`
--
ALTER TABLE `online_resumes`
  ADD CONSTRAINT `FK79cuptge8g888jw99scgogt2e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `online_resumes_skills`
--
ALTER TABLE `online_resumes_skills`
  ADD CONSTRAINT `FK5pctut43jnragn1uqswpbieey` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `FKolaptlhpotsbxjvl7g8vgo2j8` FOREIGN KEY (`online_resume_id`) REFERENCES `online_resumes` (`id`);

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `FK3vhflqw0lwbwn49xqoivrtugt` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FK6mg4g9rc8u87l0yavf8kjut05` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

--
-- Constraints for table `resumes`
--
ALTER TABLE `resumes`
  ADD CONSTRAINT `FK340nuaivxiy99hslr3sdydfvv` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKjdec9qbp2blbpag6obwf0fmbd` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`);

--
-- Constraints for table `social_links`
--
ALTER TABLE `social_links`
  ADD CONSTRAINT `FK8igikoy412qilax26n8a78m3k` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `subscriber_skill`
--
ALTER TABLE `subscriber_skill`
  ADD CONSTRAINT `FKjflpvmqmxox8edvsldr12hqjc` FOREIGN KEY (`subscriber_id`) REFERENCES `subscribers` (`id`),
  ADD CONSTRAINT `FKly8pe7rx11g3v97b1oq0vjs2r` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKin8gn4o1hpiwe6qe4ey7ykwq7` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `work_experiences`
--
ALTER TABLE `work_experiences`
  ADD CONSTRAINT `FKhqraamtfn65vpta77516iqyl7` FOREIGN KEY (`online_resume_id`) REFERENCES `online_resumes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
