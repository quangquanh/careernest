import { grey, green, blue, red, orange } from '@ant-design/colors';

export const path = {
    HOME: '/',
    REGISTER__CANDIDATE: '/register-candidate',
    FORGOT__PASSWORD: '/forgot-password',

    ACCOUNT: '/account',
    ACCOUNT__OVERVIEW: 'overview',
    ACCOUNT__PROFILE: 'profile',
    ACCOUNT__MY__JOB: 'my-job',
    ACCOUNT__GET__JOB__VIA__MAIL: 'get-job-via-email',

    CV: '/cv',
    CV__MANAGE: 'management',
    CV__CREATE: 'create',
    CV__UPDATE: 'update',
    CV__DETAIL: 'detail',
    CV__REVIEW__BY__AI: 'review-by-ai',

    RECRUITMENT: '/recruitment',
    RECRUITMENT__LOGIN: 'login',
    RECRUITMENT__DETAIL: 'detail/:id/:slug',

    SYSTEM: '/system',
    SYSTEM__LOGIN: 'login',
    SYSTEM__DASHBOARD: 'dashboard',
    SYSTEM__COMPANY: 'company',
    SYSTEM__JOB: 'job',
    SYSTEM__SKILL: 'skill',
    SYSTEM__ROLE: 'role',
    SYSTEM__USER: 'user',

    JOB: '/job',
    DETAIL__JOB: 'detail/:id/:slug',

    BLOG: '/blog',

    CHAT: '/chat',
    DETAIL__CHAT: 'detail',

    INTERVIEW__BY__AI: '/interview-by-AI',

    ROADMAP__BY__AI: '/roadmap-by-AI',

    FIND__JOB: '/find-job',
}

export const ALL_PERMISSIONS = {
    COMPANIES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/companies', module: "COMPANIES" },
        CREATE: { method: "POST", apiPath: '/api/v1/companies', module: "COMPANIES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/companies', module: "COMPANIES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/companies/{id}', module: "COMPANIES" },
    },
    JOBS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/jobs', module: "JOBS" },
        CREATE: { method: "POST", apiPath: '/api/v1/jobs', module: "JOBS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/jobs', module: "JOBS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/jobs/{id}', module: "JOBS" },
    },
    PERMISSIONS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        CREATE: { method: "POST", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/permissions/{id}', module: "PERMISSIONS" },
    },
    RESUMES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/resumes', module: "RESUMES" },
        CREATE: { method: "POST", apiPath: '/api/v1/resumes', module: "RESUMES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/resumes', module: "RESUMES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/resumes/{id}', module: "RESUMES" },
    },
    ROLES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/roles', module: "ROLES" },
        CREATE: { method: "POST", apiPath: '/api/v1/roles', module: "ROLES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/roles', module: "ROLES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/roles/{id}', module: "ROLES" },
    },
    USERS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/users', module: "USERS" },
        CREATE: { method: "POST", apiPath: '/api/v1/users', module: "USERS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/users', module: "USERS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/users/{id}', module: "USERS" },
    },
}

export const colorMethod = (method) => {
    switch (method) {
        case "POST":
            return green[6]
        case "PUT":
            return orange[6]
        case "GET":
            return blue[6]
        case "DELETE":
            return red[6]
        default:
            return grey[10];
    }
}