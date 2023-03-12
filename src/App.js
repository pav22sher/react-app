import './App.css';
import React, {useEffect, useState} from "react";

function App() {
    let baseUrl = "https://railway-telegram-production.up.railway.app/api/operation-history";
    let tg = window.Telegram.WebApp;
    let user = tg.initDataUnsafe?.user;
    let userId = user?.id;
    userId = user?.id ? user?.id : 1;

    const [totalSum, setTotalSum] = useState(0);
    const [inSum, setInSum] = useState(0);
    const [outSum, setOutSum] = useState(0);
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [operations, setOperations] = useState([]);

    const onSendData = (e) => {
        e.preventDefault();
        if (!sum || !category) {
            alert("Заполните данные!");
            return;
        }
        fetch(baseUrl + "/api/operation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                sum: sum,
                category: category
            })
        }).then(() => {
            setSum('');
            setCategory('');
            loadInfo();
            loadHistory();
        });
    }

    function loadInfo() {
        fetch(baseUrl + '/api/info?userId=' + userId)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTotalSum(data.totalSum);
                setInSum(data.inSum);
                setOutSum(data.outSum);
            })
    }

    function loadHistory() {
        fetch(baseUrl + '/api/operation-history?userId=' + userId)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setOperations(data)
            })
    }

    useEffect(() => {
        loadInfo();
        loadHistory();
    }, []);

    return (
        <div className="App">
            <div>Фамилия: {user?.last_name}</div>
            <div>Имя: {user?.first_name}</div>
            <br/>
            <div>Баланс: {totalSum} руб.</div>
            <div>Доход: {inSum} руб.</div>
            <div>Расход: {outSum} руб.</div>
            <br/>
            <h3>Введите данные операции:</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label">Сумма</label>
                    <input
                        className="form-control"
                        type="number"
                        value={sum}
                        onChange={(e) => setSum(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Категория</label>
                    <input
                        className="form-control"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button className="btn btn-success" onClick={onSendData}>Сохранить</button>
            </form>
            <h3>Последнии 5 операций:</h3>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Когда</th>
                    <th scope="col">Сумма</th>
                    <th scope="col">Категория</th>
                </tr>
                </thead>
                <tbody>
                {operations.map(
                    (operation, i) =>
                        <tr key={i}>
                            <td>{operation.id}</td>
                            <td>{operation.createdAt}</td>
                            <td>{operation.sum}</td>
                            <td>{operation.category}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
