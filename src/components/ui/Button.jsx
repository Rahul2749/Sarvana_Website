import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  href, 
  className = '',
  disabled = false,
  ...props
}) => {
  const btnRef = useRef(null);
  const classes = `btn btn-${variant} btn-${size} ${className}`;

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--mouse-x', `${x}px`);
    btnRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  if (href) {
    return (
      <Link
        ref={btnRef}
        to={href}
        className={classes}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        {...props}
      >
        <span className="btn-content">{children}</span>
      </Link>
    );
  }

  return (
    <button 
      ref={btnRef}
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;
