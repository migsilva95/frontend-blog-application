import { render, screen } from '@testing-library/react';
import Post from '.';

describe('Post component', () => {
    it('Should render component correctly', () => {
      render(<Post postId={1} setPostId={() => console.log()} />)
  
      const component = screen.getByTestId(`go-back-button`)
  
      expect(component).toBeInTheDocument()
    })
  })