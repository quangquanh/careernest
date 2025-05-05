import { Dropdown } from 'flowbite-react';
import { useTranslation } from 'react-i18next';

const Language = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const flagSrc = i18n.language === 'vi' ? '/flags/flag_VN.svg' : '/flags/flag_UK.svg';

    return (
        <div className="languages">
            <Dropdown
                arrowIcon={false}
                label={<img src={flagSrc} alt="Language" className="w-6 h-6 inline" />}
                inline
            >
                <Dropdown.Item onClick={() => handleChangeLanguage('en')}>
                    <img src="/flags/flag_UK.svg" alt="English" className="w-5 h-5 inline mr-2" />
                    English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleChangeLanguage('vi')}>
                    <img src="/flags/flag_VN.svg" alt="Việt Nam" className="w-5 h-5 inline mr-2" />
                    Việt Nam
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default Language;
