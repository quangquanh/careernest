import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div id="error-page">
            <Result
                status="404"
                title="Page Not Found!"
                subTitle={'Cannot found your URL!'}
                extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
            />
        </div>
    );
}