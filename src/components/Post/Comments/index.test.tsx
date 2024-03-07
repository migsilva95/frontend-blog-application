import { render, screen } from '@testing-library/react';
import Comments from '.';

describe('List Comments component', () => {
    it('Should render component correctly', () => {
      render(<Comments postId={1}/>)
  
      const component = screen.getByTestId(`comments-title`)
  
      expect(component).toBeInTheDocument()
    })
  })