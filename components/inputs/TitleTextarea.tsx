import { Textarea, TextareaProps } from '@chakra-ui/react';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

const TitleTextarea = (props: TextareaProps) => {
  const { value, height, placeholder, onChange, isDisabled } = props;
  return (
    <StyledTextarea
      {...props}
      onChange={onChange}
      placeholder={placeholder ? placeholder : '제목을 입력하세요'}
      height={height ? height : 86}
      isDisabled={isDisabled}
      value={value}
      variant={'unstyled'}
      textStyle={'h3'}
      resize={'none'}
      _focusVisible={{ outline: 'none' }}
      _hover={{ border: `1px solid ${theme.colors.grey[2]}` }}
    />
  );
};

const StyledTextarea = styled(Textarea)`
  overflow: hidden;
  border: 1px solid ${theme.colors.grey[2]};
  border-radius: 6px;
  padding: 16px 20px;
  caret-color: ${theme.colors.primary};
`;

export default TitleTextarea;
