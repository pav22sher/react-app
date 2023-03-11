import React, {useState} from 'react';

const Form = () => {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;

    const [sum, setSum] = useState();
    const [category, setCategory] = useState();
    const onChangeSum = (e) => {
        setSum(e.target.value)
    }
    const onChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const onSendData = (e) => {
        fetch("http://localhost:8080", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user?.id,
                sum: sum,
                category: category
            })
        });
        e.preventDefault();
    }
    return (
        <div>
            <h3>Введите данные операции:</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label">Сумма</label>
                    <input
                        className="form-control"
                        type="number"
                        value={sum}
                        onChange={onChangeSum}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Категория</label>
                    <input
                        className="form-control"
                        type="text"
                        value={category}
                        onChange={onChangeCategory}
                    />
                </div>
                <button className="btn btn-success" onClick={onSendData}>Сохранить</button>
            </form>
        </div>
    );
};

export default Form;