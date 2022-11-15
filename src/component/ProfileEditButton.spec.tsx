import { render, screen } from '@testing-library/react';
import ProfileEditButton from './ProfileEditButton';

// describeで処理をまとめる
describe('ProfileEditButton', () => {
  // それぞれのテストケース前にコンポーネントを描画し、renderResultにセットする
  it('「編集する」の文字が含まれていること', () => {
    render(<ProfileEditButton />);
    const text = screen.getByText('編集する');
    expect(text).toBeInTheDocument();
  });
});
