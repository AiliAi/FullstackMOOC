const Filter = ({ findName, handleFilter }) => {
    return (
        <div>filter shown with
            <input
                value={findName}
                onChange={handleFilter}
            />
        </div>
    )
};

export default Filter;