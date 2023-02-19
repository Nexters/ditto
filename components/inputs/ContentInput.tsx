import { HTMLChakraProps, Textarea, TextareaProps } from '@chakra-ui/react';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

export interface CustomTextareaProps extends HTMLChakraProps<'textarea'> {
  textarea?: TextareaProps;
  placeholder?: string;
  height?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
}

const ContentInput = ({ textarea, ...props }: CustomTextareaProps) => {
  const { height, placeholder, onChange, isDisabled } = props;
  return (
    <StyledTextarea
      {...textarea}
      {...props}
      onChange={onChange}
      placeholder={placeholder || '설명을 입력하세요 (선택)'}
      height={height ? height : 92}
      resize={'none'}
      isDisabled={isDisabled}
      textStyle={'body1'}
      _focusVisible={{ outline: 'none' }}
      _hover={{ border: `1px solid ${theme.semanticTokens.colors.divider}` }}
    />
  );
};

const StyledTextarea = styled(Textarea)`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.grey[2]};
  border-radius: 6px;
  padding: 10px;
`;

export default ContentInput;
