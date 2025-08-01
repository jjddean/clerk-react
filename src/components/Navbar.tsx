import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import AuthButtons from './AuthButtons';

interface SubMenuItem {
  label: string;
  path: string;
  protected: boolean;
}

interface MenuItem {
  label: string;
  path?: string;
  submenu?: SubMenuItem[];
  protected: boolean;
}

const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();

  // Close dropdown when route changes
  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname]);

  const menuItems: MenuItem[] = [
    { label: 'Home', path: '/', protected: false },
    { 
      label: 'Services', 
      path: '/services',
      protected: false
    },
    { 
      label: 'Solutions', 
      path: '/solutions',
      protected: false
    },
    { 
      label: 'Platform', 
      path: '/platform',
      protected: false
    },
    { 
      label: 'Resources', 
      path: '/resources',
      protected: false
    },
    { 
      label: 'About', 
      path: '/about',
      protected: false
    },
    { 
      label: 'Contact', 
      path: '/contact',
      protected: false
    },
    { 
      label: 'Dashboard', 
      protected: true,
      submenu: [
        { label: 'Overview', path: '/dashboard', protected: true },
        { label: 'Shipments', path: '/shipments', protected: true },
        { label: 'Payments', path: '/payments', protected: true },
        { label: 'Compliance', path: '/compliance', protected: true },
        { label: 'Reports', path: '/reports', protected: true },
        { label: 'Account', path: '/account', protected: true },
      ] 
    },
  ];

  const toggleSubmenu = (label: string) => {
    if (activeMenu === label) {
      setActiveMenu(null);
    } else {
      setActiveMenu(label);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FreightSync
        </Link>

        <ul className="nav-menu">
          {menuItems.map((item) => {
            // For protected items, only show when signed in
            if (item.protected) {
              return (
                <SignedIn key={item.label}>
                  <li className="nav-item">
                    {item.submenu ? (
                      <>
                        <div 
                          className={`nav-link ${activeMenu === item.label ? 'active' : ''}`}
                          onClick={() => toggleSubmenu(item.label)}
                        >
                          {item.label} <span className="dropdown-arrow">▼</span>
                        </div>
                        {activeMenu === item.label && (
                          <ul className="submenu">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.label} className="submenu-item">
                                <Link to={subItem.path} className="submenu-link">
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link to={item.path || '#'} className="nav-link">
                        {item.label}
                      </Link>
                    )}
                  </li>
                </SignedIn>
              );
            } else {
              // Non-protected items are always visible
              return (
                <li key={item.label} className="nav-item">
                  {item.submenu ? (
                    <>
                      <div 
                        className={`nav-link ${activeMenu === item.label ? 'active' : ''}`}
                        onClick={() => toggleSubmenu(item.label)}
                      >
                        {item.label} <span className="dropdown-arrow">▼</span>
                      </div>
                      {activeMenu === item.label && (
                        <ul className="submenu">
                          {item.submenu.map((subItem) => {
                            // For protected subitems, only show when signed in
                            if (subItem.protected) {
                              return (
                                <SignedIn key={subItem.label}>
                                  <li className="submenu-item">
                                    <Link to={subItem.path} className="submenu-link">
                                      {subItem.label}
                                    </Link>
                                  </li>
                                </SignedIn>
                              );
                            } else {
                              return (
                                <li key={subItem.label} className="submenu-item">
                                  <Link to={subItem.path} className="submenu-link">
                                    {subItem.label}
                                  </Link>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link to={item.path || '#'} className="nav-link">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            }
          })}
        </ul>

        <div className="auth-section">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <AuthButtons />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;