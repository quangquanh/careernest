import slugify from 'slugify';
import { path } from '../../utils/constant';

export function formatCompanyToHTML(companies) {
    if (!Array.isArray(companies)) return "";

    const companyItemsHTML = companies
        .map((company, index) => {
            const slug = slugify(company?.name || '', { lower: true, strict: true });
            const href = `${path.RECRUITMENT}/detail/${company?.id}/${slug}`;

            return `
<div style="
    font-size:12px;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
" 
onmouseover="this.style.backgroundColor='white'" 
onmouseout="this.style.backgroundColor='transparent'"
>
    <a href="${href}" target="_blank" style="font-weight:bold; text-decoration:none; color:black;">
        ${index + 1}. ${company?.name}
    </a>
    <p>📍 ${company?.city}</p>
</div>`;
        })
        .join("");

    return `
<div>
    ${companyItemsHTML}
    <p style="font-style: italic; margin-top: 12px;font-size:13px;">👉 Bấm vào tên công ty để xem chi tiết</p>
</div>`;
}
