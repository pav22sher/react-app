import React from 'react';

const Table = () => {
    return (
        <div>
            <h3>История операций:</h3>
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
                <tr>
                    <th>1</th>
                    <td>01.01.2023</td>
                    <td>-200</td>
                    <td>Еда</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>01.01.2023</td>
                    <td>2000</td>
                    <td>зп</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;