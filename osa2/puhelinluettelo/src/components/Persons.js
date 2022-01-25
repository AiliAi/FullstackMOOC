

const Persons = ({ data, handleDelete }) => {

    return (
        <li style={{ padding: '0.3em 0' }}>
            {data.name} {data.number}
            <button onClick={handleDelete} value={data.id}>delete</button>
        </li>
    )
};

export default Persons;