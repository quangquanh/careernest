import { path } from "./constant";

export const headerMenu = [
    { path: path.HOME, text: 'header.home_page' },
    { path: '/resume', text: 'header.profile_cv' },
    { path: '/find-job/all', text: 'header.find_job' },
    { path: '/interview-by-AI', text: 'AI Interview' },
    { path: '/roadmap-by-AI', text: 'AI Roadmap' },
    { path: path.RECRUITMENT, text: 'Nhà tuyển dụng' },
];

export const dropdownAccount = [
    { path: `${path.ACCOUNT}/${path.ACCOUNT__OVERVIEW}`, text: 'header.dropdown_account.overview' },
    { path: `${path.CHAT}/${path.DETAIL__CHAT}`, text: 'header.dropdown_account.message' },
    { path: `${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`, text: 'header.dropdown_account.my_job' },
    { path: `${path.ACCOUNT}/${path.ACCOUNT__GET__JOB__VIA__MAIL}`, text: 'header.dropdown_account.job_via_email' },

];

export const dropdownAdmin = [
    { path: `${path.SYSTEM}/${path.SYSTEM__DASHBOARD}`, text: 'header.dropdown_admin.dashboard' },
    { path: `${path.ACCOUNT}/${path.ACCOUNT__PROFILE}`, text: 'header.dropdown_admin.account_infor' },
];

export const dropdownRecruitment = [
    { path: `${path.SYSTEM}/${path.SYSTEM__DASHBOARD}`, text: 'header.dropdown_recruiter.dashboard' },
    { path: `${path.CHAT}/${path.DETAIL__CHAT}`, text: 'header.dropdown_recruiter.message' },
];