import { render, screen } from '@testing-library/react';
import List from '.';


describe('List Posts component', () => {
    it('Should render component correctly', () => {
      render(<List setPostId={() => console.log()}/>)
  
      const component = screen.getByTestId(`posts-title`)
  
      expect(component).toBeInTheDocument()
    })
  })