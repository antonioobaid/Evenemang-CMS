import Navbar from '@/components/ui/navbar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@clerk/nextjs', () => ({
  ...jest.requireActual('@clerk/nextjs'),
  SignedIn: ({ children }) => <div>{children}</div>,
  SignedOut: ({ children }) => <div>{children}</div>,
  UserButton: () => <button>UserButton</button>,
}));

describe('Navbar', () => {
  it('should render the text "Events"', () => {
    render(<Navbar />);  // ARRANGE
    const eventsLink = screen.getByText(/Events/i); // ACT
    expect(eventsLink).toBeInTheDocument(); // ASSERT
  });

  it('should render the image with src containing "/events.jpg"', () => {
    render(<Navbar />);  // ARRANGE
    const image = screen.getByAltText(''); // ACT
    expect(image).toHaveAttribute('src', expect.stringContaining('/_next/image?url=%2Fevents.jpg')); // ASSERT
  });

  it('should render the text "Dashboard" when signed in', () => {
    render(<Navbar />);  // ARRANGE
    const dashboardLink = screen.getByText(/Dashboard/i); // ACT
    expect(dashboardLink).toBeInTheDocument(); // ASSERT
  });

  it('should render the text "Logga In" when signed out', () => {
    render(<Navbar />);  // ARRANGE
    const loginLink = screen.getByText(/Logga In/i); // ACT
    expect(loginLink).toBeInTheDocument(); // ASSERT
  });

  it('should render the text "Registrera" when signed out', () => {
    render(<Navbar />);  // ARRANGE
    const registerLink = screen.getByText(/Registrera/i); // ACT
    expect(registerLink).toBeInTheDocument(); // ASSERT
  });
});
