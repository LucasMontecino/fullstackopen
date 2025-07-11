import type { IHeader } from '../types';

const Header = ({ text, variant }: IHeader) => {
  if (variant === 'h1') return <h1>{text}</h1>;
  if (variant === 'h2') return <h2>{text}</h2>;
  if (variant === 'h3') return <h3 style={{ margin: '0' }}>{text}</h3>;
};

export default Header;
