import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'
import * as CartContext from '@/contexts/CartContext'

// Mock the cart context
jest.mock('@/contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
  }),
}))

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  price: 29.99,
  images: ['/test-image.jpg'],
  category: 'T-Shirts',
  inStock: true,
  featured: true,
  sizes: ['S', 'M', 'L'],
  colors: ['Red', 'Blue'],
  description: 'A test product',
  stockQuantity: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('T-Shirts')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('shows out of stock when product is not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false }
    render(<ProductCard product={outOfStockProduct} />)
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('calls addToCart when add to cart button is clicked', () => {
    const mockAddToCart = jest.fn();
    // Override the mock implementation for this test
    const returnVal: ReturnType<typeof CartContext.useCart> = { addToCart: mockAddToCart } as unknown as ReturnType<typeof CartContext.useCart>;
    jest.spyOn(CartContext, 'useCart').mockReturnValue(returnVal);

    render(<ProductCard product={mockProduct} />);
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 'S', 'Red', 1);
  });
})
