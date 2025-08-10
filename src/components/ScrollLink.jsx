import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToElement } from '../utilities/scrollToElement';

export default function ScrollLink({ id, to, children, className, onClick, behavior = 'auto' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    // Handle route-based navigation (e.g., /dashboard, /contact)
    if (to && to !== '/') {
      navigate(to);
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (onClick) onClick();
      return;
    }
    // Handle landing page section scrolling
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      try {
        scrollToElement(id, behavior);
      } catch (error) {
        console.warn(error.message);
      }
    }
    if (onClick) onClick();
  };

  return (
    <Link
      to={to || `/#${id}`}
      className={className}
      onClick={handleClick}
      aria-label={`Navigate to ${children}`}
    >
      {children}
    </Link>
  );
}