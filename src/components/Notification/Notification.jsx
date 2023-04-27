import './notific.css';

const Notification = ({ text }) => {
    return (
        <div className="notification">
            <p className="notification__message">{text}</p>
            <button className="btn notification__button">UNDO</button>
        </div>
    );
};
export default Notification;
