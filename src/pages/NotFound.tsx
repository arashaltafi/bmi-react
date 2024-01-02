import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="h1">{t('not_found')}</h1>
    </div>
  )
}

export default NotFound