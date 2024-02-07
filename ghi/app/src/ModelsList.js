import { useState, useEffect } from "react";

function ModelsList() {
const [list, setList] = useState([]);

const fetchModelData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setList(data.models)
    }
}

useEffect(() => {
    fetchModelData()
}, []);

return (
    <div>
        <>
        <h1>Models</h1>
        </>
        <table className="table table-striped">
            <thead>
                <tr className="table-success">
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {list?.map(model => {
                    return (
                        <tr key={model.id} value={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td><img src={model.picture_url} alt={model.name}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
)
}

export default ModelsList;
