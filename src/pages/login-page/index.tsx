import React, {useEffect, useState} from 'react';

const LoginPage: React.FunctionComponent = () => {
  const [appConfig, setAppConfig] = useState(() => {
    const storedConfig = localStorage.getItem('appConfig');
    return storedConfig ? JSON.parse(storedConfig) : {defaultLanguage: 'vi'};
  });

  useEffect(() => {
    if (appConfig) {
      localStorage.setItem('appConfig', JSON.stringify(appConfig));
    }
  }, [appConfig]);

  const handleClick = () => {
    setAppConfig((prevConfig: Object) => ({
      ...prevConfig,
      defaultLanguage: 'en',
    }));
  };

  return (
    <div>
      <div className="bg-blue-300" onClick={() => handleClick()}>
        Click here
      </div>
    </div>
  );
};

export default LoginPage;
