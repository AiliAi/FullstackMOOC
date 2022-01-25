const Notification = ({ message, errorMessage }) => {
    if (message === null) {
        return null
    }

    return (
        <>
            {!errorMessage ?
                <div className="message">
                    {message}
                </div>
                :
                <div className="errorMessage">
                    {message}
                </div>
            }
        </>
    )
};

export default Notification;