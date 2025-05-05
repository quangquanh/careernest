import slugify from 'slugify';

export function formatJobsToHTML(jobs) {
    if (!Array.isArray(jobs)) return "";

    const jobItemsHTML = jobs
        .map((job, index) => {
            const slug = slugify(job?.name || '', { lower: true, strict: true });
            const href = `/job/detail/${job?.id}/${slug}`;

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
        ${index + 1}. ${job?.name}
    </a>
    <p>🪙 ${job?.salary}</p>
    <p>🎓 ${job?.level}</p>
    <p>📍 ${job?.location}</p>
</div>`;
        })
        .join("");

    return `<div>${jobItemsHTML}</div>`;
}
