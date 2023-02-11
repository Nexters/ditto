import { Textarea, TextareaProps } from '@chakra-ui/react';
import theme from '@/styles/theme';

export type CustomTextareaProps = {
  textarea?: TextareaProps;
  placeholder?: string;
  height?: number;
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
};

const TitleInput = ({ textarea, ...props }: CustomTextareaProps) => {
  const { height, placeholder, handleInputChange, isDisabled } = props;
  return (
    <Textarea
      {...textarea}
      {...props}
      onChange={handleInputChange}
      placeholder={placeholder ? placeholder : '제목을 입력하세요'}
      height={height ? height : 86}
      isDisabled={isDisabled}
      variant={'unstyled'}
      textStyle={'h3'}
      style={TextareaStyle}
      resize={'none'}
      _focusVisible={{ outline: 'none' }}
      _hover={{ border: `1px solid ${theme.semanticTokens.colors.divider}` }}
    />
  );
};

const TextareaStyle = {
  overflow: 'hidden',
  border: `1px solid ${theme.semanticTokens.colors.divider}`,
  borderRadius: '6px',
  padding: '20px 20px',
  caretColor: theme.colors.primary,
};

export default TitleInput;
