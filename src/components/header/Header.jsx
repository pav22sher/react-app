import React from 'react';

const Header = () => {
    const tg = window.Telegram.WebApp;
    let user = tg.initDataUnsafe?.user;
    return (
        <div>
            <div>
                Фамилия: {user?.last_name}
            </div>
            <div>
                Имя: {user?.first_name}
            </div>
            <br/>
            <div>
                Баланс:
            </div>
            <div>
                Доход:
            </div>
            <div>
                Расход:
            </div>
            <br/>
        </div>
    );
};

export default Header;