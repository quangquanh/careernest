import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDocument } from 'pdfjs-dist';
import './pdfWorker';
import * as marked from 'marked';
import { filterJobs } from "../../services/jobService";
import { toast } from "react-toastify";
import { formatJobsToHTML } from "./formatJobToMarkdown";
import { getAllCompanies } from "../../services/companyService";
import { formatCompanyToHTML } from "./formatCompanyToHTML";

// Thay API key của bạn ở đây (lưu ý: ai cũng có thể xem khi bundle)
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GOOGLE_GEMINI_API_KEY}`);
const generationConfig = {
    temperature: 0.6, // Giảm độ ngẫu nhiên
    topP: 0.85,       // Điều chỉnh topP để giảm độ phức tạp
    topK: 50,         // Giảm số lượng kết quả đầu ra
    maxOutputTokens: 2048, // Giảm độ dài tối đa của phản hồi
    responseMimeType: "text/plain",
};

// Khởi tạo mô hình Gemini
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `Bạn là trợ lý AI giúp người dùng tìm việc trên nền tảng CareerNest.
    Khi người dùng hỏi thông tin như: tìm thông tin công việc/việc làm/job tại đâu, hay công việc về lĩnh vực/công nghệ gì, theo cấp bậc/level nào, thì chỉ về cho tôi những từ khóa
     đó theo định dạng chuỗi (lưu ý chỉ trả về đúng chuỗi này và đừng bỏ trong bất kì cặp dấu nháy nào cả!): keyword:x,location:y,level:[],findJob:true(location hãy chuyển về viết thường và không dấu, viết cách các từ nhé, 
    còn level mặc định là mảng rỗng, nếu có giá trị thì viết hoa toàn bộ chữ cái và bỏ vào cặp dấu '' nhé). Nếu người dùng chỉ hỏi 
    tôi muốn tìm công việc, hãy bảo người dùng cung cấp từ khóa. vị trí muốn làm việc, cấp bậc.
    Khi người dùng quan tâm đến 1 lĩnh vực, vị trí nào đó và người dùng hỏi, bạn hãy đề xuất những kĩ năng cần đạt được để
    người dùng học hỏi. Nếu người dùng chỉ hỏi tôi muốn hỏi đáp về lĩnh vực, hãy bảo người dùng cung cấp tên lĩnh vực đó.
    Đồng thời bạn có thể giúp người dùng review CV khi người dùng hỏi, phân tích điểm mạnh, điểm yếu. Gợi ý cải thiện CV để tăng tỷ lệ pass phỏng vấn, và 
    dựa trên thông tin CV nói cho người dùng biết phù hợp với những vị trí việc làm nào. Hãy thêm kí hiệu ngăn cách các phần trả lời.
    Nếu người dùng hỏi câu hỏi về công ty, chẳng hạn: đang có những công ty nào, thì trả về giúp tôi định dạng kiểu chuỗi findCompany:true. 
    Nếu người dùng muốn nhờ bạn đóng vai nhà tuyển dụng mục đích để phỏng vấn thử. Bạn hãy hỏi người dùng muốn phỏng vấn vị 
    trí nào, sau đó lên các câu hỏi (khoảng 5 câu) để hỏi người dùng. Khi đã hỏi và người dùng trả lời đủ 5 câu thì bạn hãy 
    đưa ra đánh giá, nhận xét về buổi phỏng vấn này nha.Lưu ý là response bạn trả về ở dạng <ol> </ol> và nhiều thẻ <li></li>
     bên trong.
    Nếu người dùng muốn viết 1 thư xin việc (cover letter), bạn hãy hỏi người dùng: vị trí ứng tuyển, nhập số năm kinh nghiệm
     của bản thân. Sau đó hãy tự động viết thư xin việc phù hợp mà không cần hỏi thêm (viết ngắn gọn, không quá dài dòng).
     bất kì thông tin bổ sung nào.
    Nếu người dùng muốn bạn phân tích mức độ phù hợp của bản thân với nét văn hóa làm việc của 1 công ty bất kỳ, người dùng 
     sẽ cung cấp cho bạn thông tin như: phong cách làm việc, giá trị cá nhân, ưu tiên nghề nghiệp, tính cách, trải nghiệm trước 
     đây,... Sau đó hãy dựa vào tất cả thông tin bạn có thể tìm được từ các nguồn trên mạng, từ các trang đánh giá công ty,
      cùng với thông tin người dùng cung cấp hãy trả lời cho người dùng nhé.
    Nhớ rằng: nếu người dùng hỏi những câu hỏi ở ngoài lề, không trong phạm vi của web CareerNest, thì bạn vẫn có thể trả lời theo hiểu biết của bạn.`,
});

function parseTextToObject(text) {
    const result = {};

    // Tách các cặp key:value nhưng không bị split bên trong dấu []
    const pairs = text.match(/[^,]+:\s*(?:\[[^\]]*\]|[^,]*)/g);

    pairs.forEach(pair => {
        const [key, rawValue] = pair.split(':').map(s => s.trim());

        if (!rawValue) {
            result[key] = '';
        } else if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
            // Parse mảng
            try {
                result[key] = JSON.parse(rawValue.replace(/'/g, '"'));
            } catch (e) {
                result[key] = rawValue;
            }
        } else if (rawValue === 'true' || rawValue === 'false') {
            // Parse boolean
            result[key] = rawValue === 'true';
        } else {
            result[key] = rawValue;
        }
    });

    return result;
}

export async function askGemini(prompt) {
    if (!prompt) return;

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);

        let text = result.response.text();


        if (text.includes("findJob:true")) {
            let obj = parseTextToObject(text);

            try {
                let res = await filterJobs({ page: 1, pageSize: 50, name: obj?.keyword, location: [obj?.location], level: obj?.level });
                text = res?.result?.length > 0 ? formatJobsToHTML(res.result) : 'Xin lỗi, không tìm thấy công việc bạn đang tìm.';
            } catch (error) {
                console.log(error);
                toast.error(error?.message ?? 'Có lỗi xảy ra!');
            }
        }

        if (text.includes("findCompany:true")) {
            try {
                let res = await getAllCompanies();
                text = res?.result?.length > 0 ? formatCompanyToHTML(res.result) : 'Xin lỗi, không tìm thấy công việc bạn đang tìm.';
            } catch (error) {
                console.log(error);
                toast.error(error?.message ?? 'Có lỗi xảy ra!');
            }
        }

        return marked.parse(text);
    } catch (err) {
        console.error("Lỗi khi gọi Gemini:", err);
        return "Đã xảy ra lỗi!";
    }
}

export async function extractTextFromPDF(file) {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = async () => {
            const typedArray = new Uint8Array(fileReader.result);
            const pdf = await getDocument({ data: typedArray }).promise;

            let textContent = '';

            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const content = await page.getTextContent();
                content.items.forEach((item) => {
                    textContent += item.str + ' ';
                });
            }

            resolve(textContent);
        };

        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(file);
    });
}

export async function askGeminiWithPDF(pdfFile, input = "review giúp tôi cv này") {
    try {
        // Trích xuất văn bản từ PDF
        const extractedText = await extractTextFromPDF(pdfFile);

        // Kết hợp văn bản input và văn bản trích xuất từ PDF
        const combinedPrompt = `${input}\n\nDocument Text:\n${extractedText}`;

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(combinedPrompt);

        const text = result.response.text();

        return marked.parse(text);
    } catch (err) {
        console.error("Lỗi khi gọi Gemini:", err);
        return "Đã xảy ra lỗi!";
    }
}
