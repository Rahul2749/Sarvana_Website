import { Link } from 'react-router-dom';
import './FloatingAction.css';

const FloatingAction = () => {
  return (
    <div className="floating-action-container">
      <Link to="/franchise" className="floating-action-btn">
        Apply For Franchise
      </Link>
    </div>
  );
};

export default FloatingAction;
