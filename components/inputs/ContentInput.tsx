import { Textarea, TextareaProps } from '@chakra-ui/react';
import theme from '@/styles/theme';

export type CustomTextareaProps = {
  textarea?: TextareaProps;
  placeholder?: string;
  height?: number;
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
};

const ContentInput = ({ textarea, ...props }: CustomTextareaProps) => {
  const { height, placeholder, handleInputChange, isDisabled } = props;
  return (
    <Textarea
      {...textarea}
      {...props}
      onChange={handleInputChange}
      placeholder={placeholder ? placeholder : '설명을 입력하세요 (선택)'}
      height={height ? height : 92}
      style={TextareaStyle}
      resize={'none'}
      isDisabled={isDisabled}
      textStyle={'body1'}
      _focusVisible={{ outline: 'none' }}
      _hover={{ border: `1px solid ${theme.semanticTokens.colors.divider}` }}
    />
  );
};

const TextareaStyle = {
  overflow: 'hidden',
  border: `1px solid ${theme.semanticTokens.colors.divider}`,
  borderRadius: '6px',
  padding: '10px',
};

export default ContentInput;
